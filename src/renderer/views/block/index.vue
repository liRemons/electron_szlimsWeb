<template>
  <div class="bg">
    <div class="satff">登录人：{{ name }}</div>
    <div class="quit" @click="toLogout">
      <i class="el-icon-switch-button"></i>
    </div>
    <div class="left" @click="toggleScene(0)">
      <div class="img"><img src="@/assets/img/scene.png" alt="" /></div>
      <div class="title">
        <p class="ch">现场</p>
        <p>Scene</p>
      </div>
    </div>
    <div class="right" @click="toggleScene(1)">
      <div class="img">
        <img src="@/assets/img/laboratory.png" alt="" />
      </div>
      <div class="title">
        <p class="ch">实验室</p>
        <p>Laboratory</p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { setToken, getToken } from "@/utils/auth";

export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    // 切换场景
    toggleScene(scene) {
      let power =
        JSON.parse(getToken()).modList &&
        JSON.parse(getToken()).modList.split(",");

      if (scene == 0) {
        if (JSON.parse(getToken()).staffType == null) {
          this.$message.warning("当前登录人下没有任务");
          return;
        }
        // 现场
        if (JSON.parse(getToken()).staffType === 1) {
          sessionStorage.setItem("TolocalNo", 1);
          sessionStorage.setItem("ToggleBlock", "local");
          sessionStorage.setItem("nowRouter", "entering");
          this.$router.push(`/local`);
        } else {
          this.$message.warning("非组长无权限进入");
        }
      } else {
        // 实验室
        sessionStorage.setItem("ToggleBlock", "laboratory");
        sessionStorage.setItem("nowRouter", "pickUp");
        this.$router.push(`/laboratory`);
        if (power) {
          if (power.includes("接样人")) {
            this.$router.push(`/laboratory/pickUp`);
            return;
          }
          if (power.includes("理化检验员")) {
            this.$router.push(`/laboratory/curve`);
            return;
          }
          if (power.includes("微生物检验员")) {
            this.$router.push(`/laboratory/analysisItem`);
            return;
          }
          if (power.includes("放射检验员")) {
            this.$router.push(`/laboratory/analysis`);
            return;
          }
          if (power.includes("实验室审核员")) {
            this.$router.push(`/laboratory/upload`);
            return;
          }
          this.$message.warning("您无权限访问此页面，请联系管理员添加");
        }
      }
    },
    toLogout() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          setToken("");
          this.$router.push(`/login`);
        })
        .catch(() => {});
    },
    // 判断用户是否登录
    userIsLogin() {
      // 已经登录
      let _this = this;
      let token = getToken();
      let local = window.location.href;
      if (
        (token === "" || token === undefined) &&
        local.indexOf("/showFlatTemplate") === -1
      ) {
        _this.$router.push("/login");
      } else {
        this.name = JSON.myParse(token).staffName;
      }
    },
  },
  mounted() {
    this.userIsLogin();
  },
};
</script>

<style lang="scss" scoped>
.bg {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url("../../assets/icon/login_bg.png");
  display: flex;
  justify-content: space-around;
  align-items: center;
  .satff {
    position: absolute;
    top: 50px;
    color: rgb(217, 222, 251);
    left: 50px;
    font-size: 18px;
  }
  .quit {
    transition: 0.3s;
    position: absolute;
    right: 50px;
    top: 50px;
    color: #fff;
    font-size: 30px;
    cursor: pointer;
  }
  .quit:hover {
    text-shadow: 0px 0px 6px rgb(216, 212, 212);
  }
  .left,
  .right {
    transition: 0.5s;
    cursor: pointer;
    text-align: center !important;
    width: 450px;
    height: 450px;
    background: #fff;
    border-radius: 10px;
    .img {
      height: 200px;
      margin-top: 100px;
      img {
        height: 100%;
      }
    }
    .title {
      font-size: 20px;
      margin-top: 50px;
      .ch {
        font-size: 24px;
        letter-spacing: 4px;
        margin-bottom: 10px;
      }
    }
  }
  .left {
    margin-left: 150px;
  }
  .right {
    margin-right: 150px;
  }

  .right:hover {
    box-shadow: 0px 0px 15px #cfcfcf;
  }
  .left:hover {
    box-shadow: 0px 0px 15px #cfcfcf;
  }
}
@media screen and (max-width: 1200px) {
  .bg {
    .left,
    .right {
      width: 300px;
      height: 300px;
      .img {
        height: 140px;
        margin-top: 50px;
      }
      .title {
        font-size: 18px;
        margin-top: 20px;
        .ch {
          font-size: 20px;
          letter-spacing: 4px;
          margin-bottom: 10px;
        }
      }
    }
    .left {
      margin-left: 50px;
    }
    .right {
      margin-right: 50px;
    }
  }
}
@media screen and (max-width: 800px) {
  .bg {
    .left,
    .right {
      width: 250px;
      height: 250px;
      .img {
        height: 100px;
        margin-top: 50px;
      }
      .title {
        font-size: 18px;
        margin-top: 20px;
        .ch {
          font-size: 20px;
          letter-spacing: 4px;
          margin-bottom: 10px;
        }
      }
    }
    .left {
      margin-left: 50px;
    }
    .right {
      margin-right: 50px;
    }
  }
}
</style>