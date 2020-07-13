<template>
  <div>
    <el-select
      v-model="selectIndex"
      @change="change"
      :multiple-limit="limit || 1"
      value-key="id"
      multiple
      placeholder="请选择人员"
    >
      <el-option
        v-for="(item, index) in person"
        :key="item.id"
        :label="item.staffName"
        :value="index"
        :disabled="item.disabled"
      >
      </el-option>
    </el-select>
    <h2 style="margin-bottom: 10px; margin-top: 6vh;">录入指纹</h2>

    <div class="flex">
      <div
        class="card"
        :style="{ background: bg }"
        v-for="(item, index) in fingerBox"
        :key="item.id + 'finger'"
      >
        <div
          class="card_hover"
          @click="getcheckFingerprint(item, index)"
          v-if="!item.result"
        >
          点击录入
        </div>
        <div v-if="item.result" style="color:#67c23a">
          <i class="el-icon-success"></i>匹配成功
        </div>
        <div v-else>
          <img src="../../../assets/img/fingerprint2.png" v-if="item.flagImg" />
          <img src="../../../assets/img/fingerprint1.png" v-else />
        </div>

        <el-tag class="___absolute" style="bottom:-40px">{{
          item.staffName
        }}</el-tag>
      </div>
    </div>
    <div style="margin-top: 20px; text-align: right;">
      <!-- <el-button class="btn" @click="getcheckFingerprint">录入指纹</el-button> -->
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
    "target",
    "button",
    "person",
    "showFingerprintFlag",
    "tasksArrCheck",
    "limit"
  ],
  data() {
    return {
      message: "",
      selectIndex: "",
      nowMan: {},
      fingerprint: {},
      staffFingerprints: "",
      flag: false,
      fingerprintMsg: "",
      bg: "#f0f9eb",
      fingerBox: [],
      boxIndex: ""
    };
  },
  watch: {
    getFingerprintCode() {
      if (!this.flag) {
        return;
      }
      let code = this.fingerprint.fingerprintCode;
      let msg = this.fingerprint.fingerprintMsg;
      switch (code) {
        case 2:
          this.$set(this.fingerBox[this.boxIndex], "flagImg", true);
          break;
        case 3:
          this.$set(this.fingerBox[this.boxIndex], "flagImg", false);
      }
      this.$forceUpdate();
      if (code == -1 || code == 2 || code == 3) {
        this.$message(msg);
        this.fingerprintMsg = msg;
      } else if (code == 8) {
        this.showFingerprintFlag ? this.finger(this.staffFingerprints[0]) : "";
      } else if (code >= 100) {
        this.$message.success("匹配成功");
        this.$set(this.fingerBox[this.boxIndex], "result", true);
        this.fingerprintMsg = msg;
        let submitFlag = this.fingerBox.filter(item => item.result);
        if (submitFlag.length == this.fingerBox.length) {
          let id = this.fingerBox.map(item => item.id);
          let checkStaffName = this.fingerBox.map(item => item.staffName);
          this.$emit("fingerResult", true, id, checkStaffName);
        }
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
    change(a) {
      this.fingerBox = [];
      a.forEach(item => {
        this.fingerBox.push(this.person[item]);
      });
      this.fingerBox.forEach(item => {
        item.flagImg = true;
      });
      this.flag = false;
    },
    finger(a) {
      this.$ipcRenderer.send("getUser", a);
    },
    getcheckFingerprint(data, index) {
      this.boxIndex = index;
      this.flag = true;
      this.staffFingerprints = data.staffFingerprint.split(",");
      this.finger(this.staffFingerprints[0]);
    },
    // getcheckFingerprint() {
    //   this.flagImg = true;
    //   if (this.selectIndex !== 0 && this.selectIndex == "") {
    //     this.$message.warning("请选择");
    //     return;
    //   }
    //   this.staffFingerprints = this.person[0].staffFingerprint.split(",");
    //   this.finger(this.staffFingerprints[0]);
    // },

    //确定按钮
    matchFingerprint() {
      if (this.selectIndex !== "") {
        let id = [];
        let name = [];
        this.selectIndex.forEach(item => {
          id.push(this.person[item].id);
          name.push(this.person[item].staffName);
        });
        this.$emit("fingerResult", true, id, name);
      } else {
        this.$emit("fingerResult", true, this.nowMan.id);
      }
    }
  },
  mounted() {
    this.person.forEach(item => {
      item["flagImg"] = true;
      if (this.target == 0 || this.target == 2) {
        if (this.tasksArrCheck[0].tasks[0].recordStaffId) {
          let recordStaffId = this.tasksArrCheck[0].tasks[0].recordStaffId.split(
            ","
          );
          if (recordStaffId.includes(item.id)) {
            item["disabled"] = true;
          }
        }
      }
    });
    //获取所有检测员
    getMan(0).then(res => {
      let nowManId = JSON.myParse(getToken()).id;
      let mans = res.data;
      this.nowMan = mans.find(item => item.id === nowManId);
    });
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
.card {
  width: 150px;
  height: 150px;
  color: #fff;
  border-radius: 50%;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
}

.card img {
  width: 90%;
}

.card:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card:hover .card_hover {
  transition: all 0.5s;
  display: block;
}

.card_hover {
  display: none;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  line-height: 150px;
  cursor: pointer;
}

.flex {
  display: flex;
  margin-bottom: 50px;
  justify-content: space-around;
}
</style>

