<template>
  <div>
    <el-select v-model="selectIndex" @change="change" placeholder="请选择人员">
      <el-option
        v-for="(item, index) in person"
        :key="item.id"
        :label="item.staffName"
        :value="index"
        :disabled="
          fingerprintBox == 3 || fingerprintBox == 2 || fingerprintBox == 0
            ? false
            : item.id == tasksArrCheck[0].tasks[0].recordStaffId
        "
      >
      </el-option>
    </el-select>
    <h2 style="margin-bottom: 10px; margin-top: 6vh;">录入指纹</h2>
    <!-- <object
      classid="clsid:059059BE-8F4C-49AC-B2A9-5649F02A4FC6"
      class="checkFingerprint"
      id="checkFingerprintBox"
      data="DATA:application/x-oleobject;BASE64,汶六啂偹䕲祭噱䩚䌸偰杸䩁䅁奄睅䅁䈲䅍䅁㴽"
    >
    </object> -->
    <img src="../../../assets/img/fingerprint2.png" alt="" v-show="flagImg" />
    <img src="../../../assets/img/fingerprint1.png" alt="" v-show="!flagImg" />
    <p>
      <el-tag v-show="fingerprintMsg">{{ fingerprintMsg }}</el-tag>
    </p>
    <div style="margin-top: 20px; text-align: right;">
      <el-button class="btn" @click="getcheckFingerprint">录入指纹</el-button>
      <el-button @click="matchFingerprint" type="primary">确定</el-button>
    </div>
  </div>
</template>
<script>
import { getMan } from "@/api/local";
import { setTimeout } from "timers";
import { getToken } from "@/utils/auth";

export default {
  name: "upload",
  props: [
    "multipleSelection",
    "now",
    "sampleIds",
    "fingerprintBox",
    "button",
    "person",
    "showFingerprintFlag",
    "tasksArrCheck"
  ],
  data() {
    return {
      detectMan: [], //检测员
      checkMan: [], //校核员
      checkFingerprint: "", //录入的检测员的指纹
      DetectFingerprint: [], //录入的校核员指纹
      matcheckFingerprint: [], //检测人员在数据库中的指纹数组
      matDetectFingerprint: [], //校核人员在数据库中的指纹数组
      detectFinger: [],
      checkFinger: [],
      detectId: [],
      detectSelected: [],
      checkId: "",
      taskIds: "",
      message: "",
      num: 0,
      allPerson: [],
      selectIndex: "",
      isEntry: false,
      matFingerprintArr: [],
      nowMan: {},
      timer: "",
      fingerprint: {},
      staffFingerprints: "",
      flag: false,
      flagImg: true,
      fingerprintMsg: ""
    };
  },
  watch: {
    getFingerprintCode() {
      this.flagImg = true;
      if (!this.flag) {
        return;
      }
      let code = this.fingerprint.fingerprintCode;
      let msg = this.fingerprint.fingerprintMsg;

      switch (code) {
        case 2:
          this.flagImg = true;
          break;
        case 3:
          this.flagImg = false;
      }
      if (code == -1 || code == 2 || code == 3) {
        this.$message(msg);
        this.fingerprintMsg = msg;
      } else if (code == 8) {
        this.showFingerprintFlag ? this.finger(this.staffFingerprints[0]) : "";
      } else if (code >= 100) {
        this.$message.success("匹配成功");
        this.fingerprintMsg = msg;
        this.$emit("fingerResult", true, this.person[this.selectIndex].id);
      } else if (
        code < 100 &&
        code !== 4 &&
        code !== 5 &&
        code !== 6 &&
        code !== 7 &&
        code !== 9
      ) {
        this.$message.error("匹配失败");
        this.showFingerprintFlag ? this.finger(this.staffFingerprints[0]) : "";
      }
    }
  },

  computed: {
    getFingerprintCode() {
      this.fingerprint = this.$store.state.fingerprint;
      return this.fingerprint.fingerprintCode;
    }
  },
  methods: {
    change() {
      this.flag = false;
    },
    finger(a) {
      this.$ipcRenderer.send("getUser", a);
    },
    //点击录入校核员指纹按钮 触发这个函数 进入指纹准备获取状态
    getcheckFingerprint() {
      this.flag = true;
      if (this.selectIndex !== 0 && this.selectIndex == "") {
        this.$message.warning("请选择");
        return;
      }
      this.staffFingerprints = this.person[
        this.selectIndex
      ].staffFingerprint.split(",");
      this.finger(this.staffFingerprints[0]);
      return;
      if (checkFingerprintBox.OpenDevice(0, 0, 0) == 1) {
        if (checkFingerprintBox.LinkDevice() == 1) {
          checkFingerprintBox.GenCharEx();
          this.checkTransaction();
        } else {
          alert("连接USB指纹仪失败");
        }
      } else {
        alert("打开USB指纹仪失败");
      }
    },

    //根据校核员状态, 执行相应操作
    checkTransaction() {
      var istatus = checkFingerprintBox.GetWorkMsg();
      var _this = this;
      switch (istatus) {
        case 1:
          this.$notify({
            message: "设备未连接",
            type: "error"
          });
          break;
        case 5:
          this.checkFingerprint = checkFingerprintBox.GetCharEx();
          return;
          break;
      }
      timer = setTimeout(_this.checkTransaction, 500);
    },

    //将以获取的指纹进行匹配
    matchFingerprint() {
      //跳过指纹
      if (this.selectIndex !== "") {
        this.$emit("fingerResult", true, this.person[this.selectIndex].id);
      } else {
        this.$emit("fingerResult", true, this.nowMan.id);
      }
      return;

      if (this.checkFingerprint === "") {
        this.$notify({
          message: "请录入指纹",
          type: "warning"
        });
        return;
      }
      console.log(
        this.selectIndex,
        this.person[this.selectIndex].staffFingerprint
      );
      try {
        this.matFingerprintArr = this.person[
          this.selectIndex
        ].staffFingerprint.split(",");
      } catch (e) {
        this.matFingerprintArr = [];
      }

      if (this.matFingerprintArr.length <= 0) {
        this.$notify({
          message: "未获取到指纹",
          type: "warning"
        });
        return;
      }

      let detectResult = false;
      for (let i = 0; i <= this.matFingerprintArr.length; i++) {
        let num = checkFingerprintBox.MatchTemplateEx(
          this.checkFingerprint,
          this.matFingerprintArr[i]
        );
        if (num > 100) {
          detectResult = true; //只要和 检测员指纹数组中的一个指纹匹配成功 结束循环
          break;
        }
      }

      console.log("指纹验证结果", detectResult);

      if (false && !detectResult) {
        this.$notify({
          message: "指纹验证失败",
          type: "warning"
        });
        return;
      } else {
        this.$notify({
          message: "指纹验证成功",
          type: "success"
        });
      }

      this.$emit(
        "fingerResult",
        detectResult,
        this.person[this.selectIndex].id
      );
    }
  },
  mounted() {
    console.log(this.tasksArrCheck[0]);
    //获取所有检测员
    getMan(0)
      .then(res => {
        //this.detectMan = res.data.filter(item => item.staffFingerprint != null);
        let nowManId = JSON.myParse(getToken()).id;
        let mans = res.data;
        this.nowMan = mans.find(item => item.id === nowManId);
      })
      .catch(error => {
        console.log(error);
      });
  },
  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
};
</script>
<style scoped>
.detectFingerprint {
  width: 100%;
  height: 40vh;
  margin-top: 30vh;
  background: gray;
  cursor: pointer;
}

.checkFingerprint {
  width: 100%;
  height: 40vh;
  background: gray;
  cursor: pointer;
}
</style>

