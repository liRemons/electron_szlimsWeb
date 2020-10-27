<template>
  <div class="login">
    <div class="login_box">
      <div class="img">
        <div class="title">深圳瑞达智能检测系统用户端</div>
        <img src="@/assets/icon/login_box.png" alt="" />
        <!-- @click="$router.replace('/camera')" -->
      </div>
      <div class="right">
        <el-form class="form_right" ref="form" label-position="top">
          <el-form-item label="手机号码：" required>
            <el-input
              v-model="phone"
              @keyup.native="phone = phone.replace(/[^\d]/g, '')"
              placeholder="请输入手机号码"
            ></el-input>
            <!-- 下面input没用，为了阻止回车页面刷新事件 -->
            <el-input v-show="false"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" style="width: 100%" @click="winGetUserInfo"
          >登 录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { winGetUserInfo } from "@/api/login";
import { setToken, getToken } from "@/utils/auth";
export default {
  name: "login",
  data() {
    return {
      phone: "",
      staffFingerprints: "", //数据库中的参考指纹
      staff: null,
      fingerprint: {},
    };
  },
  methods: {
    finger(a) {
      this.$ipcRenderer.send("getUser", a);
    },
    //根据手机号查询这个人的参考指纹
    winGetUserInfo() {
      if (this.phone === "") {
        this.$notify({
          type: "warning",
          message: "请填写手机号！",
        });
        return;
      }
      winGetUserInfo(this.phone).then((res) => {
        let staffFingerprint = res.staff.staffFingerprint; //返回的是该人员的多个指纹 以逗号分隔
        this.staff = res.staff;
        if (staffFingerprint == "" || staffFingerprint == null) {
          this.$message.warning("该人员没有录入指纹");
        } else {
          this.$message.success("获取指纹信息成功, 请录入指纹");
          this.staffFingerprints = staffFingerprint.split(",");
          setToken(this.staff);
          // 创建本人的文件夹
          this.mkdir(this.staff);
          setTimeout(() => {
            this.$router.replace("/");
          }, 100);
          // this.GetMatTemplate();//指纹
        }
      });
    },

    //获取匹配指纹
    GetMatTemplate() {
      this.finger(this.staffFingerprints[0]);
    },
  },
  mounted() {
    //回车登录
    window.onkeydown = (key) => {
      if (key.keyCode == 13) {
        this.winGetUserInfo();
      }
    };
  },
  watch: {
    getFingerprintCode() {
      let code = this.fingerprint.fingerprintCode;
      let msg = this.fingerprint.fingerprintMsg;
      if (code == -1 || code == 2 || code == 3) {
        this.$message(msg);
      } else if (code == 8) {
        this.finger(this.staffFingerprints[0]);
      } else if (code >= 100) {
        this.$message.success("匹配成功");
        let staff = this.staff;
        delete staff.staffFingerprint;
        setToken(staff);
        this.$router.push("/");
      } else if (
        code < 100 &&
        code !== 4 &&
        code !== 5 &&
        code !== 6 &&
        code !== 7 &&
        code !== 9
      ) {
        this.$message.error("匹配失败");
        this.finger(this.staffFingerprints[0]);
      }
    },
  },
  computed: {
    getFingerprintCode() {
      this.fingerprint = this.$store.state.fingerprint;
      return this.fingerprint.fingerprintCode;
    },
  },
  created() {
    // this.$ipcRenderer.send("getUser");
  },

  beforeDestroy() {
    window.onkeydown = null;
  },
};
</script>


<style lang="scss" scoped>
.login {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url("../../assets/icon/login_bg.png");
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    transition: 0.3s;
    background: url("../../assets/icon/loginbox_bg.png") no-repeat;
    background-size: contain;
    width: 1000px;
    height: 620px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    .img {
      width: 50%;
      img {
        width: 400px;
      }
      .title {
        line-height: 30px;
        margin: 60px 0;
        font-size: 20px;
        font-weight: 600;
        font-family: Arial, Helvetica, sans-serif;
        letter-spacing: 8px;
        color: #fff;
      }
    }
    .right {
      text-align: left;
      width: 40%;
      padding: 0 5%;
      .form_right {
        margin-top: 150px;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .login {
    .login_box {
      width: 800px;
      height: 500px;
    }
  }
}
@media screen and (max-width: 800px) {
  .login {
    .login_box {
      width: 600px;
      height: 400px;
      .img {
        width: 50%;
        img {
          width: 300px;
        }
        .title {
          line-height: 20px;
          margin: 30px 0;
          font-size: 16px;
          font-weight: 400;
          font-family: Arial, Helvetica, sans-serif;
          letter-spacing: 3px;
          color: #fff;
        }
      }
      .right {
        text-align: left;
        width: 40%;
        padding: 0 5%;
        .form_right {
          margin-top: 100px;
        }
      }
    }
  }
}
</style>

