<template>
  <div
    :class="{ _normalHeight_: true }"
    v-if="modularShow()"
    class="___relative"
    :id="data.valueData.testProjectId"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <table class="myTable" style="width: 712px;">
      <tr>
        <td width="170">
          重复测量次数
        </td>
        <td>
          <selectModel
            @returnVal="changeTestNum"
            :Judge="true"
            class="___absolute"
            style="top: 0px; left: 20px;"
            :special="1"
            :receive="''"
            :single="true"
            :rows="false"
            v-if="data.valueData.testNum !== ''"
            :transmitText="data.valueData.testNum"
            :list="[1, 3]"
            :Obj="''"
          >
          </selectModel>
        </td>
      </tr>
    </table>

    <table class="myTable" style="width: 712px;">
      <tr class="delLine">
        <td rowspan="2">序号</td>
        <td rowspan="2" width="200">检测点位置</td>
        <td
          :colspan="data.valueData.testPoinrNum.filter((item) => item).length"
          style="width: 250px;"
        >
          <div class="___relative">
            <span class="___absolute" style="left: 30px;">测量值（单位:</span>
            <selectModel
              @returnVal="changeCompany"
              class="___relative"
              :Judge="true"
              style="left: 20px;"
              :special="1"
              :receive="''"
              :single="true"
              :rows="false"
              :transmitText="data.valueData.company"
              :list="company"
              :Obj="''"
            >
            </selectModel>
            <span class="___absolute" style="left: 165px; top: 0px;">)</span>
          </div>
        </td>
        <td rowspan="2">
          <span style="line-height: 16px;"
            >*报告值(单<br />位：{{ data.valueData.company }})</span
          >
        </td>
        <td rowspan="2">标准差</td>
      </tr>
      <tr>
        <td v-if="data.valueData.testPoinrNum[0]">1</td>
        <td v-if="data.valueData.testPoinrNum[1]">2</td>
        <td v-if="data.valueData.testPoinrNum[2]">3</td>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        style="text-align: center;"
      >
        <td>
          <span>{{ item.index }}</span>
        </td>
        <td>
          {{ item.rows[0] }}
        </td>
        <td v-if="data.valueData.testPoinrNum[0]">
          <divModel v-model="item.rows[1]"></divModel>
        </td>
        <td v-if="data.valueData.testPoinrNum[1]">
          <divModel v-model="item.rows[2]"></divModel>
        </td>
        <td v-if="data.valueData.testPoinrNum[2]">
          <divModel v-model="item.rows[3]"></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[4]"
            :edit="false"
            :is-computer="true"
            :computers="
              changeNum(item.rows[1], item.rows[2], item.rows[3], index)
            "
            :computerFormula="'gs11'"
          >
          </divModel>
        </td>
        <td>
          {{ item.rows[5] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      company: ["μSv/h", "nSv/h"],
    };
  },
  props: [
    "ipdTemplate",
    "pageNumber",
    "data",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "target",
  ],
  methods: {
    modularShow() {
      if (this.surgeon || this.target != 0) {
        this.data.height._normal.carried = true;
        this.data.valueData.isObtain = true;
        return true;
      } else {
        this.data.height._normal.carried = false;
        this.data.valueData.isObtain = false;
        return false;
      }
    },
    changeNum(num1, num2, num3, index) {
      try {
        let arr = [num1, num2, num3];
        let average = this.average(arr);
        let calibration = this.jsonString.find(
          (item, index) => item.to === "projcet_szwjcjlmkt"
        ).data.valueData.calibrationFactor;
        if (this.isNumber(calibration) && this.isNumber(average)) {
          this.data.valueData.point[index].rows[4] = this.IntegerAdd2((
            average * parseFloat(calibration)
          ).toFixed(2));
        }
        if (this.isNumber(average)) {
          let total = 0;
          let judgeNum = this.judgeNum(arr);
          judgeNum.forEach((item, index) => {
            total += Math.pow(item - average, 2);
          });
          this.data.valueData.point[index].rows[5] = this.IntegerAdd2(Math.sqrt(
            total / judgeNum.length
          ).toFixed(2));
        }
        if (num1 == "" && num2 == "" && num3 == "") {
          this.data.valueData.point[index].rows[4] = "";
          this.data.valueData.point[index].rows[5] = "";
        }
      } catch (e) {}
    },
    judgeNum(arr) {
      let calculation = [];
      arr.forEach((item, index) => {
        if (this.isNumber(item)) {
          calculation.push(item);
        }
      });
      return calculation;
    },
    changeCompany(val) {
      this.data.valueData.company = val;
    },
    average(arr) {
      let calculation = this.judgeNum(arr);
      let total = 0;
      calculation.forEach((item, index) => {
        total += parseFloat(item);
      });
      return total / calculation.length;
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },

    beNumber(item, itemIndex, index) {
      if (index === 0) {
        item.index = itemIndex + 1;
      } else {
        item.index = this.data.valueData.point[index - 1].index + 1;
      }
      return item.index;
    },

    changeTestNum(value) {
      this.showing.forEach((item, index) => {
        item.forEach((val, num) => {
          if (
            val.to === this.data.valueData.testProject &&
            val.data.valueData.multipleId === this.data.valueData.multipleId
          ) {
            val.data.valueData.testNum = "";
            setTimeout(() => {
              val.data.valueData.testNum = value;
            });
          }
        });
      });
    },
  },
  computed: {
    ...mapState({
      surgeon: (state) => state.StomatologyLinkage.surgeon,
    }),
  },
  watch: {
    surgeon() {
      this.modularShow();
    },
    "data.valueData.testNum": function (val) {
      if (val === "1") {
        this.data.valueData.testPoinrNum = [true, false, false];
      } else if (val === "3") {
        this.data.valueData.testPoinrNum = [true, true, true];
      }
    },
    "data.valueData.testPoinrNum": function (arr) {
      if (this.target === "0") {
        arr.forEach((item, index) => {
          if (item === false) {
            this.data.valueData.point.forEach((item2) => {
              item2.rows[index + 1] = "";
            });
          }
        });
      }
    },
  },
  mounted() {},
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
