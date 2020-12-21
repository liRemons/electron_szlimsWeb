<template>
  <div
    :class="{
      _normalHeight_: data.height._normal.carried,
      _shortHeight_: !data.height._normal.carried,
    }"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <projectHead
      v-if="headShow()"
      :data="data"
      :target="target"
      :col="10"
    ></projectHead>
    <table style="width:100%" class="myTable">
      <tr class="delLine" style="line-height:20px">
        <td>样品编号</td>
        <td>体积Vt(L)</td>
        <td>温度t(℃)</td>
        <td>气压p(kPa)</td>
        <td>采样时吸收液<br />体积V1(mL)</td>
        <td>分析时取样品<br />体积V2(mL)</td>
        <td>样品溶液<br />稀释倍数</td>
        <td>空白样品编号</td>
        <td>样品空白<br />吸光度A0</td>
        <td>样品吸光度A</td>
        <td>样品浓度<br />ρ(mg/m3)</td>
        <td>报告值<br />ρ(mg/m3)</td>
        <td>相对相差(%)</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index">
        <td>
          {{ name(item) }}
        </td>
        <td>
          <divModel
            v-model="item.volume"
            :edit="false"
            :is-num-box="true"
          ></divModel>
          <!--采样体积-->
        </td>
        <td>
          <divModel
            v-model="item.temperature"
            :edit="false"
            :is-num-box="true"
          ></divModel>
          <!--采样点温度-->
        </td>
        <td>
          <divModel
            v-model="item.atmosphericPressure"
            :edit="false"
            :is-num-box="true"
          ></divModel>
          <!--采样点气压-->
        </td>
        <td>
          <divModel
            v-model="item.sysSamplingVolume"
            :edit="target != '4'"
            :is-num-box="true"
          ></divModel>
          <!--采样时吸收液-->
        </td>
        <td>
          <divModel
            v-model="item.sysAnalysisVolume"
            :edit="target != '4'"
            :is-num-box="true"
          ></divModel>
          <!--分析时取样品-->
        </td>
        <td>
          <divModel
            v-model="item.sysSolutionMultiple"
            :edit="target != '4'"
            :is-num-box="true"
          ></divModel>
          <!--样品溶液稀释倍数-->
        </td>
        <td>
          <div>
            {{
              item.myBlankSample && item.myBlankSample.length > 0
                ? item.myBlankSample[0].labSampleNum
                : ""
            }}
          </div>
          <!--空白样品编号-->
        </td>
        <td>
          <divModel
            v-model="item.sysBlankAbsorbance"
            :edit="target != '4'"
            :is-num-box="true"
          ></divModel>
          <!--空白吸光度-->
        </td>
        <td>
          <divModel
            v-model="item.sysAbsorbance"
            :edit="target != '4'"
            :is-num-box="true"
          ></divModel>
          <!--吸光度-->
        </td>
        <td v-if="target != 4">
          <divModel
            :is-computer="true"
            :computerFormula="'gs1'"
            :computers="[
              item.volume,
              item.temperature,
              item.atmosphericPressure,
              item.sysBlankAbsorbance,
              item.sysAbsorbance,
              item.sysSolutionMultiple,
              bs,
              item,
              3,
            ]"
            v-model="item.sysConcentration"
            :edit="false"
          >
          </divModel>
          <!--浓度-->
        </td>

        <td v-if="target == 4">
          {{ item.sysConcentration }}
        </td>

        <td
          v-if="computeObj.toRowspan(item, index, data) && target != 4"
          rowspan="2"
        >
          <!--报告值-->
          <div>
            {{
              showReport(item, data.valueData.point[index + 1].sysConcentration)
            }}
          </div>
        </td>
        <td v-if="computeObj.toRowspan2(item) && target != 4">
          <!--报告值-->
          <div>{{ showReport2(item) }}</div>
        </td>
        <td
          v-if="computeObj.toRowspan(item, index, data) && target != 4"
          rowspan="2"
        >
          {{ getDifference(item, data.valueData.point[index + 1]) }}
        </td>
        <td v-if="computeObj.toRowspan2(item) && target != 4">
          <div>/</div>
          <!--相对相差-->
        </td>

        <td
          v-if="computeObj.toRowspan(item, index, data) && target == 4"
          rowspan="2"
        >
          <!--报告值-->
          {{ item.sysReport }}
        </td>
        <td
          v-if="computeObj.toRowspan(item, index, data) && target == 4"
          rowspan="2"
        >
          <!--报告值-->
          {{ item.sysDifference }}
        </td>
        <td v-if="computeObj.toRowspan2(item, index) && target == 4">
          <!--报告值-->
          {{ item.sysReport }}
        </td>
        <td v-if="computeObj.toRowspan2(item, index) && target == 4">
          <!--报告值-->
          /
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { queryByPurpose } from "@/api/laboratory";
import projectHead from "../project_head";

export default {
  data() {
    return {
      index_jsonString: function() {
        // 获取当前模块在jsonString中的索引
        let result = this.thisPageIndex;
        for (let i = 0; i < this.pageNumber; i++) {
          result += this.showing[i].length;
        }
        return result;
      },
      devices: "",
      showTime: "",
      testTiem: "",
      checked: false,
    };
  },
  components: {
    projectHead,
  },
  computed: {
    testDeviceCheckBoxMsg() {
      let str = "";
      this.data.valueData.testDeviceCheckBox.forEach((item, index) => {
        if (index !== this.data.valueData.testDeviceCheckBox.length - 1) {
          str +=
            item.deviceName +
            " " +
            item.deviceModel +
            " " +
            item.deviceNum +
            ",";
        } else {
          str +=
            item.deviceName + " " + item.deviceModel + " " + item.deviceNum;
        }
      });
      return str;
    },
  },
  props: [
    "ipdTemplate",
    "data",
    "pageNumber",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "bs",
    "target",
    "detectionLimitObj",
  ],
  methods: {
    headShow() {
      if (this.pageNumber > 0) {
        if (this.thisPageIndex == 0) {
          let showlLen = this.showing[this.pageNumber - 1].length - 1;
          if (
            this.showing[this.pageNumber - 1][showlLen].to !==
            this.data.valueData.testProject
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            this.showing[this.pageNumber][this.thisPageIndex - 1].to !==
            this.data.valueData.testProject
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
    },
    show(item) {
      if (item.isParallel) {
        return true;
      } else {
        return false;
      }
    },
    name(item) {
      let name = `${item.sampleNum}${
        item.sampleNumIndex ? item.sampleNumIndex : ""
      }${item.parallelLetter ? item.parallelLetter : ""}`;
      return name.replace(/\s*/g, "");
    },

    getDifference(item, nextItem) {
      let sysConcentration1 = Number(item.sysConcentrationCount);
      let sysConcentration2 = Number(nextItem.sysConcentrationCount);
      let resultArr = this.computeObj.difference(
        sysConcentration1,
        sysConcentration2,
        item.lessReport
      );
      item.sysDifference = resultArr[0];
      item.sysDifferenceCount = resultArr[1];
      nextItem.sysDifference = resultArr[0];
      nextItem.sysDifferenceCount = resultArr[1];
      return item.sysDifference;
    },
    showNoPingXing(item) {
      if (item.isParallel || item.isParallel2) {
        return false;
      } else {
        return true;
      }
    },

    toHigh() {
      this.data.height._normal.carried = true;
      this.data.height._short.carried = false;
      this.watchSign._high += 1;
      this.$emit("update:jsonString");
      this.$emit("update:watchSign");
    },

    toShort() {
      this.data.height._normal.carried = false;
      this.data.height._short.carried = true;
      this.watchSign._short += 1;
      this.$emit("update:jsonString");
      this.$emit("update:watchSign");
    },

    toUpModule() {
      let index = this.index_jsonString();
      if (index != 0) {
        _transposition(this.jsonString, index, index - 1);
        this.$emit("update:jsonString");
        this.watchSign._down += 1;
        this.$emit("update:watchSign");
      }
    },
    toDownModule() {
      let index = this.index_jsonString();
      if (index != this.jsonString.length - 1) {
        _transposition(this.jsonString, index, index + 1);
        this.$emit("update:jsonString");
        this.watchSign._down += 1;
        this.$emit("update:watchSign");
      }
    },
    toDeleteModule() {
      let index = this.index_jsonString();
      this.jsonString.splice(index, 1);
      this.$emit("update:jsonString");
      this.watchSign._delete += 1;
      this.$emit("update:watchSign");
    },
    isSelected(index, result) {
      if (result) {
        return this.data.valueData.checkBox2[index];
      } else {
        return this.data.valueData.checkBox[index].isSel;
      }
    },
    increase() {
      let obj = {
        windowLength: "",
        windowWidth: "",
        windowNum: "",
      };
      this.jsonString[this.index_jsonString()].data.valueData.point.push(obj);
      this.$emit("update:jsonString");
      this.$emit("restart");
    },
    toShowTimeBox() {
      if (this.target != 4) {
        this.showTime = !this.showTime;
      }
    },
    checkBoxChange(val) {},
    checkIsParallel(sampleNum) {},
    changeTime(data) {
      this.data.valueData.sysTestingTime = data[0] + " -- " + data[1];
    },
    showReport(item, sysConcentration) {
      let sysConcentration1 = Number(item.sysConcentration);
      let sysConcentration2 = Number(sysConcentration);
      let sysConcentration3 = (sysConcentration1 + sysConcentration2) / 2;
      if (isNaN(sysConcentration3)) {
        sysConcentration3 = 0;
      } else {
        try {
          sysConcentration3 = sysConcentration3.toFixed46(2, true, true);
        } catch (e) {}
      }
      item.sysReportCount = sysConcentration3;
      if (sysConcentration3 < Number(this.detectionLimitObj.detectionLimit)) {
        item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
        item.lessReport = true;
        return `< ${this.detectionLimitObj.detectionLimit}`;
      } else {
        item.sysReport = sysConcentration3;
        item.lessReport = false;
        return sysConcentration3;
      }
    },
    showReport2(item) {
      let sysReport;
      try {
        sysReport = Number(item.sysConcentration).toFixed46(2, true, true);
      } catch (e) {
        sysReport = 0;
      }
      if (sysReport < Number(this.detectionLimitObj.detectionLimit)) {
        item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
        return `< ${this.detectionLimitObj.detectionLimit}`;
      } else {
        if (this.isNumber(sysReport)) {
          item.sysReport = sysReport;
          return sysReport;
        } else {
          item.sysReport = item.sysConcentration;
          return item.sysConcentration;
        }
      }
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeState(val) {
      console.log(1, val);
      if (val === "正常") {
        this.data.valueData.sysSampleStateDetail = "";
      }
    },
    returnVal(a, b, c, d, valueArr) {
      this.data.valueData.testDeviceCheckBox = valueArr.map((item) => item.id);
    },
  },
  mounted() {
    queryByPurpose("实验室").then((res) => {
      if (res.success) {
        this.devices = res.data;
        this.devices.forEach((item) => {
          item.showName =
            item.deviceName + " " + item.deviceModel + " " + item.deviceNum;
        });
        console.log("获取设备成功2");
      } else {
        console.log("获取设备失败");
      }
    });
    let inp = document.getElementsByClassName("inp");
    let that = this;
    for (let i = 0; i < inp.length; i++) {
      inp[i].onclick = function(e) {
        let index = e.target.getAttribute("index");
        let result = e.target.checked;
        let isCheckBox = e.target.isCheckBox;
        that.$emit("selectedBox", { isCheckBox, index, result });
      };
    }
  },
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
