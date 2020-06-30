<template>
  <div class="login-container" style="font-family: SimSun; position: relative">
    <img
      src="@/assets/img/myba.jpg"
      style="width: 100vw; height: 100vh; position: absolute; left: 0; top: 0;"
      alt=""
    />

    <div class="title">
      深圳市瑞达智能检测系统用户端
    </div>
    <div style="margin-top: 20vh; margin-left: 3.5vw;">
      <el-input
        v-model="phone"
        style="width: 30vw;"
        @keyup.native="phone = phone.replace(/[^\d]/g, '')"
        placeholder="请输入您的手机号"
      ></el-input>
    </div>
    <div>
      <el-button
        type="danger"
        style="margin-top: 10px; width: 30vw; height: 40px; position: relative; margin-left: 3.5vw;"
        @click="winGetUserInfo"
        >登录
      </el-button>
    </div>
    <div class="login-box">
      <el-row>
        <el-col :offset="10" :span="5">
          <object
            v-show="!imgShow"
            classid="clsid:059059BE-8F4C-49AC-B2A9-5649F02A4FC6"
            class="login-fingerprintBox"
            id="FPEngineEx1"
            data="DATA:application/x-oleobject;BASE64,汶六啂偹䕲祭噱䩚䌸偰杸䩁䅁奄睅䅁䈲䅍䅁㴽"
          ></object>
          <div v-show="imgShow" class="login-fingerprintBox-img"></div>
        </el-col>
      </el-row>
      <!-- <div class="foot">
        该系统建议在360安全浏览器11.0版兼容模式或ie11以上使用
      </div> -->
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
      matFingerprint: "", //该人员录入的指纹
      staff: null,
      imgShow: true,
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
          message: "请填写手机号！"
        });
        return;
      }
      winGetUserInfo(this.phone)
        .then(res => {
          let staffFingerprint = res.staff.staffFingerprint; //返回的是该人员的多个指纹 以逗号分隔
          this.staff = res.staff;
          if (staffFingerprint == "" || staffFingerprint == null) {
            this.$notify({
              message: "该人员没有录入指纹",
              type: "error"
            });
          } else {
            this.$notify({
              message: "获取指纹信息成功, 请录入指纹.",
              type: "success"
            });
            this.staffFingerprints = staffFingerprint.split(",");
            setToken(this.staff);
            this.$router.push("/");
            // this.GetMatTemplate();//指纹
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //获取匹配指纹
    GetMatTemplate() {
      this.finger(this.staffFingerprints[0]);
    },
  },
  mounted() {
    //回车登录
    window.onkeydown = key => {
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
    }
  },
  computed: {
    getFingerprintCode() {
      this.fingerprint = this.$store.state.fingerprint;
      return this.fingerprint.fingerprintCode;
    }
  },
  created() {
    // this.$ipcRenderer.send("getUser");
  },

  beforeDestroy() {
    window.onkeydown = null;
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  padding-top: 8%;
  padding-left: 3%;
  font-size: 2.5vw;
  height: 30px;
  text-align: center;
  letter-spacing: 12px;
  position: relative;
}

.login {
  &-container {
    /* background-image: url('../../assets/img/myba.jpg');*/
    background-size: 100vw 100vh;
    background-repeat: no-repeat;
    width: 100vw;
    height: 100vh;
  }

  &-box {
    position: relative;
    top: 5%;
  }

  &-fingerprint {
    margin-top: 10px;
    width: 50%;
    height: 200px;
    background-color: #fff;
  }

  &-fingerprintBox {
    margin-top: 2vh;
    width: 15vw;
    height: 30vh;
    background-color: gray;
  }

  &-fingerprintBox-img {
    background-image: url("../../assets/img/fingerprint.jpg");
    background-size: cover;
    width: 15vw;
    height: 22vh;
    margin: 0 auto;
    margin-top: 20%;
  }
}

.foot {
  margin-top: 5vh;
  margin-left: 3.5vw;
  font-size: 20px;
  color: black;
  text-align: center;
  font-weight: bolder;
}
</style>
