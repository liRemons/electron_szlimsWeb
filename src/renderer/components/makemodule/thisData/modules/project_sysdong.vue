<template>
  <div>
    <projectHead
      v-if="headShow()"
      :data="data"
      :target="target"
      :col="10"
    ></projectHead>
    <table class="myTable">
      <tr class="delLine">
        <td rowspan="2">刻度系数</td>
        <td>A路刻度系数</td>
        <td colspan="5">
          <divModel
            :edit="canEdit"
            v-model="data.valueData.sysScaleCoefficientA"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>B路刻度系数</td>
        <td colspan="5">
          <divModel
            :edit="canEdit"
            v-model="data.valueData.sysScaleCoefficientB"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td rowspan="2">检查源</td>
        <td>净计数率</td>
        <td colspan="5">
          <divModel
            :edit="canEdit"
            v-model="data.valueData.sysNetCountingRate"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>实测净计数率</td>
        <td colspan="5">
          <divModel
            :edit="canEdit"
            v-model="data.valueData.sysRealNetCountingRate"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>检测结果：</td>
        <td colspan="6">
          <divModel
            :edit="canEdit"
            v-model="data.valueData.sysTestingResult"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>样品编号</td>
        <td colspan="2">氡浓度（Bq/m³）</td>
        <td colspan="2">报告值（Bq/m³）</td>
        <td colspan="2">相对相差（%）</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index">
        <td>
          {{ name(item) }}
        </td>

        <td colspan="2">
          <divModel
            :is-num-box="true"
            :edit="canEdit"
            v-model="item.sysConcentration"
          ></divModel>
        </td>

        <td
          colspan="2"
          v-if="computeObj.toRowspan(item, index, data)"
          rowspan="2"
        >
          {{ getReport2(item, data.valueData.point[index + 1]) }}
        </td>
        <td colspan="2" v-if="computeObj.toRowspan2(item)">
          {{ getReport(item) }}
        </td>

        <td
          colspan="2"
          v-if="computeObj.toRowspan(item, index, data)"
          rowspan="2"
        >
          {{ getDifference(item, data.valueData.point[index + 1]) }}
        </td>
        <td colspan="2" v-if="computeObj.toRowspan2(item)">
          <div>/</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { queryByPurpose } from "@/api/laboratory";
import projectHead from "../project_head";

export default {
  name: "project_sysdong",
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
    "target",
  ],
  data() {
    return {
      showTime: false,
      devices: [],
      testTiem: "",
      detectionLimitObj: "",
    };
  },
  components: {
    projectHead,
  },
  computed: {
    canEdit() {
      if (this.target === "1") {
        return true;
      } else {
        return false;
      }
    },
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
    changeState(val) {
      if (val === "正常") {
        this.data.valueData.sysSampleStateDetail = "";
      }
    },
    name(item) {
      let name = `${item.sampleNum}${
        item.sampleNumIndex ? item.sampleNumIndex : ""
      }${item.parallelLetter}`;
      return item.sampleNum ? name.replace(/\s*/g, "") : "";
    },
    toShowTimeBox() {
      if (this.target != 4) {
        this.showTime = !this.showTime;
      }
    },
    changeTime(data) {
      this.data.valueData.sysTestingTime = data[0] + " -- " + data[1];
    },

    getReport(item) {
      item.sysReport = Number(item.sysConcentration).toFixed46(1);
      item.sysReportCount = Number(item.sysConcentration).toFixed46(1);
      if (
        this.detectionLimitObj &&
        item.sysReport < Number(this.detectionLimitObj.detectionLimit)
      ) {
        item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
      }

      if (isNaN(item.sysReport)) {
        return "";
      } else {
        return item.sysReport;
      }
    },
    getReport2(item, nextItem) {
      let sysConcentration1 = Number(item.sysConcentration);
      let sysConcentration2 = Number(nextItem.sysConcentration);
      let sysConcentrationAv = (
        (sysConcentration1 + sysConcentration2) /
        2
      ).toFixed46(1);
      let sysConcentrationAv2 = sysConcentrationAv;
      if (sysConcentrationAv < Number(this.detectionLimitObj.detectionLimit)) {
        sysConcentrationAv = `< ${this.detectionLimitObj.detectionLimit}`;
        item.lessReport = true;
      } else {
        sysConcentrationAv = sysConcentrationAv;
        item.lessReport = false;
      }
      item.sysReport = sysConcentrationAv;
      item.sysReportCount = sysConcentrationAv2;

      nextItem.sysReport = sysConcentrationAv;
      nextItem.sysReportCount = sysConcentrationAv2;
      if (sysConcentrationAv == NaN) {
        return;
      }
      if (isNaN(sysConcentrationAv) && sysConcentrationAv.indexOf("<") === -1) {
        return "";
      } else {
        return sysConcentrationAv;
      }
    },
    getDifference(item, nextItem) {
      let sysConcentration1 = Number(item.sysConcentration);
      let sysConcentration2 = Number(nextItem.sysConcentration);
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
      } else {
      }
    });
    this.detectionLimitObj = JSON.myParse(
      sessionStorage.getItem("detectionLimitObj")
    );
    setTimeout(() => {
      this.$forceUpdate();
    }, 200);
  },
};
</script>

<style scoped>
</style>
