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
        <td style="width: 108px">溶剂解吸效率</td>
        <td
          colspan="1"
          align="left"
          style="
            padding-left: 20px;
            border-right: 1px solid white;
            text-align: center;
          "
        >
          <divModel
            :is-num-box="true"
            :edit="edit"
            v-model="data.valueData.sysSolventDesorption"
          ></divModel>
        </td>
        <td colspan="7" style="text-align: left">%</td>
      </tr>
    </table>
    <table class="myTable" ref="ben">
      <tr class="delLine">
        <td style="width: 108px">样品编号</td>
        <td style="width: 80px">体积V（L）</td>
        <td style="width: 80px">温度t（℃）</td>
        <td style="width: 110px">气压p（kPa）</td>
        <td style="width: 110px">空白样品编号</td>
        <td>稀释倍数</td>
        <td>空白峰面积</td>
        <td>样品峰面积</td>
        <td style="width: 130px">样品浓度ρ（mg/m3）</td>
        <td style="width: 130px">报告值ρ（mg/m3）</td>
        <td style="width: 130px">相对相差（%）</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index">
        <td>
          {{ name(item) }}
        </td>
        <!--样品编号-->
        <td>{{ item.volume }}</td>
        <!--采样体积V（L）-->
        <td>{{ item.temperature }}</td>
        <!--采样点温度t（℃）-->
        <td>{{ item.atmosphericPressure }}</td>
        <!--采样点气压p（kPa）-->
        <td style="width: 140px">
          {{
            item.myBlankSample && item.myBlankSample.length > 0
              ? item.myBlankSample[0].labSampleNum
              : ""
          }}
        </td>
        <td>
          <divModel
            @change="showNongDu(item)"
            v-model="item.sysSolutionMultiple"
            :edit="target != '4'"
            :is-num-box="true"
          ></divModel>
        </td>
        <!--稀释倍数-->
        <td>{{ item.sysBlankArea }}</td>
        <!--空白峰面积-->
        <td>{{ item.sysArea }}</td>
        <!--样品峰面积-->

        <td v-if="target != 4">{{ showNongDu(item) }}</td>
        <td v-else>{{ item.sysConcentration }}</td>
        <!--样品浓度-->

        <td
          v-if="computeObj.toRowspan(item, index, data) && target != 4"
          rowspan="2"
        >
          <div>
            {{
              showReport(
                item,
                data.valueData.point[index + 1].sysConcentrationCount
              )
            }}
          </div>
        </td>
        <!--报告值ρ（mg/m3）-->

        <td v-if="computeObj.toRowspan2(item) && target != 4">
          <div>{{ showReport2(item) }}</div>
        </td>

        <td
          v-if="computeObj.toRowspan(item, index, data) && target != 4"
          rowspan="2"
        >
          {{ getSysDifference(item, data.valueData.point[index + 1]) }}
        </td>
        <!--相对相差（%）-->
        <td v-if="computeObj.toRowspan2(item) && target != 4">
          <div>/</div>
        </td>

        <!--审核显示使用-->
        <td
          v-if="computeObj.toRowspan(item, index, data) && target == 4"
          rowspan="2"
        >
          <div>{{ item.sysReport }}</div>
        </td>

        <td
          v-if="computeObj.toRowspan(item, index, data) && target == 4"
          rowspan="2"
        >
          <div>{{ item.sysDifference }}</div>
        </td>

        <td v-if="computeObj.toRowspan2(item) && target == 4">
          <div>{{ item.sysReport }}</div>
        </td>
        <td v-if="computeObj.toRowspan2(item) && target == 4">
          <div>/</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import projectHead from "../project_head";

export default {
  name: "project_ben_two.vue",
  data() {
    return {
      showTime: false,
      devices: [],
      testTiem: "",
    };
  },
  components: {
    projectHead,
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
    "target",
    "detectionLimitObj",
    "bs",
    "xieLv",
  ],
  computed: {
    edit() {
      if (this.target != 4) {
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
    name(item) {
      let name = `${item.sampleNum}${
        item.sampleNumIndex ? item.sampleNumIndex : ""
      }${item.parallelLetter}`;
      return name.replace(/\s*/g, "");
    },
    show(item) {
      if (item.isParallel) {
        return true;
      } else {
        return false;
      }
    },
    showNoPingXing(item) {
      if (item.isParallel || item.isParallel2) {
        return false;
      } else {
        return true;
      }
    },
    toShowTimeBox() {
      if (this.target != 4) {
        this.showTime = !this.showTime;
      }
    },

    changeTime(data) {
      this.data.valueData.sysTestingTime = data[0] + " -- " + data[1];
    },
    showReport(item, sysConcentration) {
      let sysConcentration1 = Number(item.sysConcentrationCount);
      let sysConcentration2 = Number(sysConcentration);
      let sysConcentration3 = (sysConcentration1 + sysConcentration2) / 2;
      if (isNaN(sysConcentration3)) {
        sysConcentration3 = 0;
      } else {
        sysConcentration3 = sysConcentration3.toFixed46(2, true, true);
      }
      item.sysReportCount = sysConcentration3;
      if (sysConcentration3 < Number(this.detectionLimitObj.detectionLimit)) {
        item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
        item.lessReport = true;
        return `< ${this.detectionLimitObj.detectionLimit}`;
      } else {
        item.sysReport = sysConcentration3;
        item.lessReport = false;
        return item.sysReport;
      }
    },
    showReport2(item) {
      let sysReport;
      try {
        sysReport = Number(item.sysConcentrationCount).toFixed46(2, true, true);
      } catch (e) {
        sysReport = 0;
      }

      item.sysReportCount = sysReport;
      if (sysReport < Number(this.detectionLimitObj.detectionLimit)) {
        item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
        return `< ${this.detectionLimitObj.detectionLimit}`;
      } else {
        item.sysReport = sysReport;
        return sysReport;
      }
    },
    returnVal(a, b, c, d, valueArr) {
      this.data.valueData.testDeviceCheckBox = valueArr.map((item) => item.id);
    },
    showNongDu(item) {
      const init = (data) => {
        return data || 0;
      };
      try {
        let sysBlankArea = Number(init(item.sysBlankArea));
        let sysArea = Number(init(item.sysArea));
        let xieLv = Number(init(this.xieLv));
        let v = Number(init(item.volume));
        let t = Number(init(item.temperature));
        let p = Number(init(item.atmosphericPressure));
        let x = Number(init(item.sysSolutionMultiple));
        let sysSolventDesorption = Number(
          init(this.data.valueData.sysSolventDesorption)
        );
        if (sysSolventDesorption == "") sysSolventDesorption = 0;
        if (sysSolventDesorption !== 0)
          sysSolventDesorption = sysSolventDesorption / 100;
        let result2 =
          ((sysArea - sysBlankArea) /
            (Number(xieLv) *
              v *
              (273 / (273 + t)) *
              (p / 101.3) *
              sysSolventDesorption)) *
          x;
        result2 = isNaN(result2) ? 0 : result2.toFixed46(3, true, true);
        let limi = Number(this.detectionLimitObj.detectionLimit);
        item.sysConcentrationCount = result2;
        if (result2 < limi) {
          result2 = "< " + limi;
        }
        item.sysConcentration = result2;
        return item.sysConcentration;
      } catch (e) {
        console.log(e);
      }
    },
    changeState(val) {
      if (val === "正常") {
        this.data.valueData.sysSampleStateDetail = "";
      }
    },
    getSysDifference(item, nextItem) {
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
  },
  mounted() {
    setTimeout(() => {
      this.$forceUpdate();
    }, 1100);
  },
};
</script>

<style scoped>
</style>
