<template>
  <div class="box" style="font-family: SimSun;">
    <el-row>
      <el-col :span="3">
        <h2 class="logout" @click="toLogout" style="font-size: 20px;">
          退出登录
        </h2>
      </el-col>
      <el-col :span="21">
        <div style="margin-top: 20px; margin-left: 65vw; color: gray;">
          <h2 style="font-size: 20px;">当前登录人：{{ name }}</h2>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7" :offset="4">
        <div @click="toggleScene(0)">
          <div class="blockLeft">现场</div>
        </div>
      </el-col>
      <el-col :span="7" :offset="2">
        <div @click="toggleScene(1)">
          <div class="blockRight">实验室</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import store from "@/store";
import { setToken, getToken } from "@/utils/auth";

export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    // 切换场景
    toggleScene(scene) {
      if (scene == 0) {
        // 现场
        sessionStorage.setItem('TolocalNo',0)
        sessionStorage.setItem("ToggleBlock", "local");
        sessionStorage.setItem("nowRouter", "entering");
        this.$router.push(`/local`);
      } else {
        // 实验室
        sessionStorage.setItem("ToggleBlock", "laboratory");
        sessionStorage.setItem("nowRouter", "pickUp");
        this.$router.push(`/laboratory`);
      }
    },
    toLogout() {
      setToken("");
      this.$router.push(`/login`);
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
    }
  },
  mounted() {
    this.userIsLogin();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.block {
  &Left {
    width: 100%;
    height: 40vh;
    background-color: #fff;
    margin-top: 40%;
    margin-bottom: 47%;
    padding-left: 10%;
    cursor: pointer;
    font-size: 4vw;
    line-height: 40vh;
    letter-spacing: 3vw;
    border-radius: 5px;
    user-select: none;
    text-align: center;
    box-shadow: 0px 0px 20px 10px;
    transition: box-shadow 0.5s;
  }

  &Left:hover {
    box-shadow: 0px 0px 20px 10px #c2ccd0;
  }

  &Right {
    width: 100%;
    height: 40vh;
    background-color: #fff;
    margin-top: 40%;
    margin-bottom: 47%;
    padding-left: 10%;
    cursor: pointer;
    font-size: 4vw;
    line-height: 40vh;
    text-align: center;
    letter-spacing: 3vw;
    border-radius: 5px;
    user-select: none;
    box-shadow: 0px 0px 20px 10px;
    transition: box-shadow 0.5s;
  }

  &Right:hover {
    box-shadow: 0px 0px 20px 10px #c2ccd0;
  }
}

.box {
  height: 100%;
  overflow: hidden;
  background-image: url("../../assets/img/bg6.jpg");
  background-size: cover;
}

.logout {
  color: gray;
  cursor: pointer;
  margin-top: 20px;
  font-weight: 800;
}

.logout:hover {
  color: #19caad;
}
</style>
