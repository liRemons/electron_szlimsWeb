<template>
  <div :id="data.valueData.testProjectId">
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <el-button
        class="emptyBtn"
        size="mini"
        style="position: absolute; top: 0; right: -100px"
        @click="empty"
        v-if="target == 0"
      >
        清空
      </el-button>
      <table class="myTable" style="width: 710px">
        <tr>
          <td width="202">重复测量次数</td>
          <td>
            <selectModel
              @returnVal="changeTestNum"
              :Judge="true"
              class="___absolute"
              style="top: 0px"
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

      <table class="myTable" style="table-layout: auto !important">
        <tr class="delLine">
          <td rowspan="2" width="50">序号</td>
          <td rowspan="2" colspan="2" width="80">检测点位置</td>
          <!-- <td rowspan="2">毗邻场所</td> -->
          <td rowspan="2" v-if="JudgePhotography">居留因子</td>
          <td
            :colspan="data.valueData.testPoinrNum.filter((item) => item).length"
            width="150"
          >
            <div class="___relative">
              <div style="display: inline-block; margin-right: 20px">
                测量值(单位:
              </div>
              <selectModel
                style="
                  display: inline-block;
                  width: 60px;
                  position: absolute !important;
                  right: -10px;
                "
                @returnVal="changeCompany"
                :Judge="true"
                class="___absolute"
                :special="1"
                :receive="''"
                :single="true"
                :rows="false"
                :transmitText="data.valueData.company"
                :list="company"
                :Obj="''"
              >
              </selectModel>

              <span class="___absolute" style="right: 0">)</span>
            </div>
          </td>
          <td rowspan="2" style="font-size: 12px;line-height:20px">
            *扣除本底值<br />(单位：{{ data.valueData.company }})
          </td>
          <td rowspan="2" style="font-size: 12px" v-if="JudgePhotography">
            *年剂量<br />(单位：{{ data.valueData.company }})
          </td>
          <td rowspan="2" style="font-size: 12px;line-height:20px">
            *不扣除本底值<br />(单位：{{ data.valueData.company }})
          </td>
          <td rowspan="2" :colspan="!JudgePhotography ? 2 : 1" width="60">
            备注
          </td>
        </tr>
        <tr>
          <td v-if="data.valueData.testPoinrNum[1]">1</td>
          <td v-if="data.valueData.testPoinrNum[1]">2</td>
          <td v-if="data.valueData.testPoinrNum[2]">3</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td>
            {{ item.index }}
          </td>
          <td width="100">
            <div v-if="!item.isSzpbt || target !== '0'">
              <!-- {{ item.rows[0] }} -->
              {{ item.name }}
            </div>
            <myInput v-else v-model="item.name"></myInput>
          </td>
          <td width="50">
            <divModel v-model="item.rows[1]"></divModel>
          </td>
          <td v-if="JudgePhotography">
            <div>
              <divModel :isNumBox="true" v-model="item.rows[2]"></divModel>
            </div>
          </td>
          <td v-if="data.valueData.testPoinrNum[0]">
            <divModel
              isNumBox
              v-if="item.rows[3] !== '/'"
              v-model="item.rows[3]"
            ></divModel>
            <span v-else>/</span>
          </td>
          <td v-if="data.valueData.testPoinrNum[1]">
            <divModel
              isNumBox
              v-model="item.rows[4]"
              v-if="item.rows[4] !== '/'"
            ></divModel>
            <span v-else>/</span>
          </td>
          <td v-if="data.valueData.testPoinrNum[2]">
            <divModel
              isNumBox
              v-model="item.rows[5]"
              v-if="item.rows[5] !== '/'"
            ></divModel>
            <span v-else>/</span>
          </td>
           <td>{{item.bd}}</td>
          <td>
            <divModel
              v-model="item.rows[6]"
              :edit="false"
              :is-computer="true"
              :computers="
                changeNum(item.rows[3], item.rows[4], item.rows[5], index)
              "
              :computerFormula="'gs11'"
            >
            </divModel>
          </td>
          
          <td v-if="JudgePhotography">
            <span>{{ item.rows[7] }}</span>
          </td>
          <td :colspan="!JudgePhotography ? 2 : 1">
            <selectModel
              v-if="flag"
              @returnVal="changeRemark($event, index)"
              :Judge="true"
              class="___absolute"
              style="top: 0px"
              :special="1"
              :receive="''"
              :single="true"
              :rows="false"
              :transmitText="item.rows[8]"
              :list="remark"
              :Obj="''"
            >
            </selectModel>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td colspan="8">检测结果未扣除本底值</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      company: ["μSv/h", "nSv/h"],
      remark: ["无法到达", "不适用", "/"],
      flag: true,
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
  updated() {
    // this.init(this.data.valueData.point);
  },
  methods: {
    empty() {
      this.$confirm("清空后不可恢复!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.flag = false;
          this.$nextTick(() => {
            let point = this.data.valueData.point;
            point.forEach((item, index) => {
              item.rows.forEach((a, b) => {
                if (b == 0 || b == 1 || b == 9) {
                } else {
                  item.rows[b] = "";
                }
              });
            });
            this.flag = true;
            this.$forceUpdate();
          });
        })
        .catch(() => {});
    },
    init(arr) {
      let arr1 = ["工作人员操作位", "管线洞口", "观察窗"];
      arr.forEach((item) => {
        if (arr1.includes(item.rows[0])) {
          item.rows[1] = "/";
        }
        let name = JSON.parse(JSON.stringify(item.rows[0]));
        this.$set(item, "name", name);
        if (item.rows[1]) {
        } else {
          if (item.name) {
            item.rows[1] = item.name.split("(")[1]
              ? item.name.split("(")[1].split(")")[0]
              : "";
          }
        }
        item.name = item.rows[0].split("(")[0];
      });
      this.$forceUpdate();
    },
    modularShow() {
      if (
        this.purposeDetection === "豁免检测" ||
        this.purposeDetection === "环保验收"
      ) {
        this.data.height._normal.carried = false;
        this.data.valueData.isObtain = false;
        return false;
      } else {
        this.data.height._normal.carried = true;
        this.data.valueData.isObtain = true;
        return true;
      }
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
    average(arr) {
      let calculation = this.judgeNum(arr);
      let total = 0;
      calculation.forEach((item, index) => {
        total += parseFloat(item);
      });
      return total / calculation.length;
    },
    changeNum(num1, num2, num3, index) {
      try {
        let arr = [num1, num2, num3];
        let average = this.average(arr);
        let multipleId = this.data.valueData.multipleId;
        let calibration = this.jsonString.find(
          (item, index) =>
            item.to === "projcet_jcbt" &&
            multipleId == item.data.valueData.multipleId
        ).data.valueData.calibrationFactor;
        if (this.isNumber(calibration) && this.isNumber(average)) {
          this.data.valueData.point[index].rows[6] = this.IntegerAdd2(
            (average * parseFloat(calibration)).toFixed46(2)
          );
        }
        if (this.isNumber(this.timeExposure)) {
          this.data.valueData.point[index].rows[7] = this.IntegerAdd2(
            (
              this.data.valueData.point[index].rows[6] *
              (this.timeExposure / 1000)
            ).toFixed46(2)
          );
        }
        if (this.isNumber(average)) {
          let total = 0;
          let judgeNum = this.judgeNum(arr);
          judgeNum.forEach((item, index) => {
            total += Math.pow(item - average, 2);
          });
          // this.data.valueData.point[index].rows[8] = Math.sqrt(
          //   total / judgeNum.length
          // ).toFixed(2);
        }
        if (num1 == "" && num2 == "" && num3 == "") {
          this.data.valueData.point[index].rows[6] = "";
          this.data.valueData.point[index].rows[7] = "";
        }
      } catch (e) {}
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeCompany(val) {
      this.data.valueData.company = val;
      this.$forceUpdate();
    },
    changeRemark(val, b) {
      if (val == "/") {
        this.data.valueData.point[b].rows.forEach((item, index) => {
          if (index > 2 && index < 7) {
            this.data.valueData.point[b].rows[index] =
              this.data.valueData.point[b].rows[index] == "/"
                ? ""
                : this.data.valueData.point[b].rows[index];
          } else if (index == 8) {
            this.data.valueData.point[b].rows[8] = val;
          }
        });
      } else {
        this.data.valueData.point[b].rows.forEach((item, index) => {
          if (index > 2 && index < 6) {
            this.data.valueData.point[b].rows[index] = "/";
          } else if (index == 8 || index == 6) {
            this.data.valueData.point[b].rows[index] = val;
          }
        });
      }
      this.$forceUpdate();
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
      JudgePhotography: (state) => state.StomatologyLinkage.JudgePhotography,
      purposeDetection: (state) => state.StomatologyLinkage.purposeDetection,
      timeExposure: (state) => state.StomatologyLinkage.timeExposure,
    }),
  },
  watch: {
    purposeDetection() {
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
              item2.rows[index + 3] = "";
            });
          }
        });
      }
    },
    "data.valueData.point": function (arr) {
      this.init(arr);
    },
  },
  mounted() {
    this.init(this.data.valueData.point);
  },
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
