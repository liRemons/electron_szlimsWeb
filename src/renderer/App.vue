<template>
  <div id="app" @contextmenu="showRightClickMenu">
    <Layout
      @mini="mini"
      @max="max"
      @minisize="miniSize"
      @close="close"
      @clean="clean"
      @update="getUpdateVersion"
      :isMax="isMax"
      :version="version"
      :staffName="staffName"
    ></Layout>
    <update
      @close="updateflag = false"
      v-if="updateflag"
      :apkUrl="apkUrl"
      :updateMain="updateMain"
      :updateVersion="updateVersion"
      @download="download"
    ></update>
    <el-dialog
      class="tc"
      :visible.sync="dialogVisible"
      width="400px"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <p style="margin-bottom: 10px" v-if="!downloadState">
        {{ downloadText }}
        <i class="el-icon-loading"></i>
      </p>
      <el-progress
        type="circle"
        :percentage="percentage"
        :status="downloadState"
        :stroke-width="10"
      ></el-progress>
      <div v-if="downloadState" style="margin-top: 20px">
        {{ downloadText }}
        <i class="el-icon-check"></i><br />
        <p style="margin-top: 20px">
          <span>文件保存在：</span
          ><el-tag class="el_tag" type="success">{{ filePath }}</el-tag
          ><br />
          <el-tag type="danger" class="el_tag"
            ><i class="el-icon-warning"></i>
            重要提醒：安装包已下载完成，请在安装前务必将本地数据同步上传，否则数据有丢失风险！！！</el-tag
          >
          <el-button type="primary" round @click="dialogVisible = false"
            >我知道了</el-button
          >
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import Vue from "vue";

import update from "./components/update";
import { getToken } from "@/utils/auth";
import { updateStaffOnlineTime } from "@/api/login";
import Layout from "./views/layout";
export default {
  name: "App",
  components: { update, Layout },
  data() {
    return {
      isMax: true,
      updateflag: false,
      dialogVisible: false,
      updateMain: "",
      apkUrl: "",
      updateVersion: "",
      percentage: 0,
      downloadState: "",
      downloadText: "正在下载，请稍后",
      filePath: "",
      staffName: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.getUpdateVersion();
    }, 1000);

    setInterval(() => {
      if (window.navigator.onLine) this.getStaffState();
    }, 10000);
  },
  methods: {
    // 更新用户在线状态
    getStaffState() {
      if (this.$route.path == "/login") {
        return;
      }

      if (getToken()) {
        updateStaffOnlineTime(JSON.parse(getToken()).id).then((res) => {
          if (!res.success) {
            this.$message.error("登录信息已失效或已在其它设备登录");
            this.$router.replace("/login");
          }
        });
      } else {
        this.$router.replace("/login");
        this.$message.error("登录信息已失效或已在其它设备登录");
      }
    },
    // 下载安装包
    download() {
      this.downloadState = "";
      this.downloadText = "正在下载，请稍后";
      this.updateflag = false;
      this.dialogVisible = true;
      let this_ = this;
      this.$ipcRenderer.on("getScheduleEvent", (event, arg) => {
        if (arg[0] == "取消下载") {
          this_.$message.warning("您已取消下载");
          this_.dialogVisible = false;
          return;
        }
        if (arg[0] == "下载成功") {
          this_.downloadState = "success";
          this_.downloadText = "下载完成";
          this_.filePath = arg[1];
          return;
        }
        this_.percentage = Number(arg[0]);
        if (this_.percentage >= 100) {
          this_.downloadText = "正在解析文件，请稍后";
        }
      });
    },
    getUpdateVersion() {
      if (!this.$isUpdate) {
        return;
      }
      let data = { projectName: "SZ_LIMS_RD" };
      const loading = this.$loading({
        lock: true,
        text: "检查更新中，请稍后......",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$updateAxios
        .post("/getOnlineApk", data)
        .then((res) => {
          loading.close();
          let apkVersion = JSON.parse(res.data.data[0].apkVersion);
          this.updateMain = apkVersion.update;
          this.updateVersion = apkVersion.code;
          sessionStorage.setItem("version", {
            updateVersion: this.updateVersion,
            version: this.version,
          });

          if (Number(this.updateVersion) > Number(this.version)) {
            this.updateflag = true;
            this.apkUrl = res.data.data[0].apkUrl;
          } else {
            this.$message.warning("暂无最新版本");
          }
        })
        .catch((err) => {
          loading.close();
        });
    },
    clean() {
      this.$confirm(
        "此操作将永久删除应用中所有的数据且无法恢复，请确认所有离线任务数据已上传?",
        "清理缓存",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(() => {
        this.delDir();
        const loading = this.$loading({
          lock: true,
          text: "清理中，请稍后...",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          loading.close();
          this.$message.success("清理完成");
        }, 2000);
      });
    },
    mini() {
      console.log(1);
      this.$ipcRenderer.send("mini", true);
    },
    max() {
      this.$ipcRenderer.send("max", true);
    },
    miniSize() {
      this.$ipcRenderer.send("unmaximize", true);
    },
    close() {
      this.$ipcRenderer.send("close", true);
    },
    showRightClickMenu() {
      this.$ipcRenderer.send("sigShowRightClickMenu", this.$route.name);
    },
  },
  watch: {
    $route() {
      if (getToken()) {
        this.staffName = JSON.parse(getToken()).staffName;
      }
      sessionStorage.setItem("routerPath", this.$route.path);
    },
  },
  computed: {
    taskId() {
      return this.$store.state.app.taskId;
    },
  },
  created() {
    // 读取指纹信息
    this.$ipcRenderer.on("Finger_MSG", (event, arg) => {
      this.$store.dispatch("CHANGE_FINGER_MUTATIONS", arg);
    });
    this.$ipcRenderer.on("isMaximized", (event, arg) => {
      this.isMax = arg;
    });
    Vue.prototype.mkdir = function (data) {
      this.$ipcRenderer.send("mkdir", data);
    };
    // 写入文件
    Vue.prototype.whrite = function (arr, staff) {
      arr.staff = staff;
      this.$ipcRenderer.send("writeFile", arr);
    };
    // 接收写入文件信息状态
    Vue.prototype.writeFileEvent = function () {
      return new Promise((reslove) => {
        this.$ipcRenderer.on("writeFileEvent", function (event, arg) {
          reslove(arg);
        });
      });
    };
    // 读取文件
    Vue.prototype.readFile = function (staff, id) {
      this.$ipcRenderer.send("readFile", {
        taskId: id,
        staffPhone: staff.staffPhone,
      });
    };
    // 接收读取文件信息状态
    Vue.prototype.readFileEvent = function () {
      return new Promise((resolve) => {
        this.$ipcRenderer.on("readFileEvent", function (event, arg) {
          resolve(arg);
        });
      });
    };
    // 读取文件夹
    Vue.prototype.readDir = function (staff) {
      this.$ipcRenderer.send("readDir", { staffPhone: staff.staffPhone });
    };
    // 接收读取文件夹状态
    Vue.prototype.readDirEvent = function () {
      return new Promise((resolve) => {
        this.$ipcRenderer.on("readDirEvent", function (event, arg) {
          resolve(arg);
        });
      });
    };
    Vue.prototype.delDir = function () {
      this.$ipcRenderer.send("delDir");
    };
    // 删除文件
    Vue.prototype.delFile = function (id, staff) {
      this.$ipcRenderer.send("delFile", {
        taskId: id,
        staffPhone: staff.staffPhone,
      });
    };

    let _this = this;
    // _this.userIsLogin();
    Array.prototype.flat = function () {
      let arr = [];

      //定义hanle函数方便递归
      function hanle(s) {
        for (let i = 0, j = s.length; i < j; i++) {
          //历遍数组
          if (Object.prototype.toString.call(s[i]) == "[object Array]") {
            //判断是否为数组
            hanle(s[i]); //递归调用
          } else {
            arr.push(s[i]); //添加进新数组
          }
        }
      }

      hanle(this); //this指向Array
      return arr;
    };
    // 重写sessionStorage，localStorage  START================
    sessionStorage: {
      setItem: (key, value) => {
        let data = {
          key: key,
          value: value,
        };
        this.$store.commit("SESSIONSTORAGE_SET", data);
      };
      getItem: (key) => {
        return this.$store.state.app.shareObject[key];
      };
      removeItem: (key) => {
        this.$store.commit("SESSIONSTORAGE_REMOVE", key);
      };
    }
    localStorage.setItem = (key, value) => {
      let staffPhone = getToken() && JSON.parse(getToken()).staffPhone;
      if (staffPhone) {
        this.$ipcRenderer.send("getStorage", staffPhone);
        this.readFileEvent().then((res) => {
          let data = JSON.parse(res);
          data[key] = value;
          this.$ipcRenderer.send("setStorage", {
            staffPhone,
            data,
          });
        });
      }
    };
    let this_ = this;
    async function get() {
      let staffPhone = getToken() && JSON.parse(getToken()).staffPhone;
      if (staffPhone) {
        this_.$ipcRenderer.send("getStorage", staffPhone);
        let data = await this_.readFileEvent();
        return data;
      }
    }

    //=============================END

    Number.prototype.toFixed46 = function (
      decimalPlaces,
      Judge = false,
      revision = false
    ) {
      let num = this; //将调用该方法的数字转为字符串
      let numStr = this + "";
      if (numStr.includes(".")) {
        let splitArr = numStr.split(".");
        if (Judge) {
          if ([...splitArr[0]][0] > 0) {
            if (splitArr[0].length >= decimalPlaces) {
              decimalPlaces = 0;
            } else if (splitArr[0].length < decimalPlaces) {
              decimalPlaces = decimalPlaces - splitArr[0].length;
            }
          } else {
            let index = [...splitArr[1]].findIndex((item, index) => item > 0);
            decimalPlaces = decimalPlaces + index;
          }
          decimalPlaces = decimalPlaces >= 0 ? decimalPlaces : 0;
        }
      }
      let d = decimalPlaces || 0;
      let m = Math.pow(10, d);
      let n = +(d ? num * m : num).toFixed(8); // Avoid rounding errors
      let i = Math.floor(n),
        f = n - i;
      let e = 1e-8; // Allow for rounding errors in f
      let r =
        f > 0.5 - e && f < 0.5 + e ? (i % 2 == 0 ? i : i + 1) : Math.round(n);
      let result = d ? r / m : r;

      if (revision) {
        let surplus = 0;
        let resultArr = (result + "").split(".");
        if (resultArr.length > 1 && resultArr[1].length < d) {
          surplus = d - resultArr[1].length;
          for (let k = 0; k < surplus; k++) {
            result = result + "" + 0;
          }
        } else if (resultArr.length === 1) {
          surplus = d;
          let zero = "";
          if (surplus > 0) {
            for (let k = 0; k < surplus; k++) {
              zero += "0";
            }
            result = result + "." + zero;
          }
        }
      }
      return result;
    };

    // 100 以上转科学计数法
    Number.prototype.num2e = function () {
      let p = Math.floor(Math.log(this) / Math.LN10);
      let n = this * Math.pow(10, -p);
      let subArr = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
      return (
        (Math.round(n.toFixed46(1)) === n.toFixed46(1)
          ? n.toFixed46(1) + ".0"
          : n.toFixed46(1)) +
        " x 10" +
        subArr[p]
      );
    };

    // 微生物使用，小于检出值
    Number.prototype.checkValue = function (value) {
      console.log("微生物使用，小于检出值", this, value);
      return this < value ? "<" + value : this;
    };

    Date.prototype.format = function (fmt) {
      //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    };

    window.sampleNum = "";
    window.sampleNum2 = "";
    window.sampleNum3 = "";
    window.sampleNum4 = "";
    JSON.myParse = function (value) {
     
      //  console.log(value)
      // .replace(/\\/g, "/");
      try {
         value = value.replace(/[\r\n]/g, "")
        let obj = this.parse(value);
        // if (typeof obj === "string") {
        //   JSON.myParse(obj);
        // }
        return obj;
      } catch (e) {
        let obj = this.parse(value);
        return obj;
      }
    };
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  overflow: hidden;
  height: 100%;
}

.el_tag {
  white-space: normal !important;
  line-height: 20px !important;
  height: auto !important;
  text-align: left !important;
  margin: 10px 0 !important;
}
</style>

<style >
.viewer-button {
  right: 50px;
  top: 50px;
}
.viewer-button::before {
  content: " ";
  display: block;
  height: 40px;
  width: 40px;
  background: url("./assets/icon/closeV.png");
  background-size: 100%;
  bottom: 20px;
  left: 20px;
}
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  /*滚动条里面小方块*/

  background: rgba(166, 212, 255, 0.568);
  transition: all 0.5s;
}
::-webkit-scrollbar-thumb:hover {
  background: #a2cfff;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 5px;
  border: none;
  background: transparent;
}
</style>
