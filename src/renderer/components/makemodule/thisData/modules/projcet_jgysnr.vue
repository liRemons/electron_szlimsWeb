<template>
  <div
    :class="{ _normalHeight_: true }"
    class="___relative"
    :id="data.valueData.testProjectId"
  >
    <el-button
      class="emptyBtn"
      size="mini"
      style="position: absolute; top: 0; right: -100px"
      @click="empty"
      v-if="target == 0"
    >
      清空
    </el-button>
    <div :class="{ eventCover: !ableInput }"></div>
    <table class="myTable" style="width: 712px">
      <tr>
        <td width="182">重复测量次数</td>
        <td>
          <selectModel
            @returnVal="changeTestNum"
            :Judge="true"
            class="___absolute"
            style="top: 0px; left: 20px"
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

    <table class="myTable" style="width: 712px; table-layout: auto !important">
      <tr class="delLine">
        <td rowspan="2" width="50">序号</td>
        <td rowspan="2" colspan="2" width="100">检测点位置</td>
        <td
          width="200"
          :colspan="data.valueData.testPoinrNum.filter((item) => item).length"
          :rowspan="
            data.valueData.testPoinrNum[1] === false &&
            data.valueData.testPoinrNum[2] === false
              ? 2
              : ''
          "
        >
          <div class="___relative">
            <div class="___absolute" style="top: 0px; left: 20px">
              测量值(单位:
            </div>
            <selectModel
              @returnVal="changeCompany"
              :Judge="true"
              class="___absolute"
              style="width: 100px; top: 0px; left: 80px"
              :special="1"
              :receive="''"
              :single="true"
              :rows="false"
              :transmitText="data.valueData.company"
              :list="company"
              :Obj="''"
            >
            </selectModel>
            <div class="___absolute" style="top: 0px; left: 150px">)</div>
          </div>
        </td>
        <td rowspan="2" style="font-size: 12px">
          最小值
          <br />单位:({{ data.valueData.company }})
        </td>
        <td rowspan="2" style="font-size: 12px">
          最大值
          <br />单位:({{ data.valueData.company }})
        </td>
        <td rowspan="2" style="font-size: 12px;line-height:20px">
          平均值<br>(不含本底)
          <br />单位:({{ data.valueData.company }})
        </td>
        <td rowspan="2" style="font-size: 12px;line-height:20px">
          平均值<br>(含本底)
          <br />单位:({{ data.valueData.company }})
        </td>
        <td rowspan="2" width="80px" style="font-size: 12px">
          <!-- 标准差(单位:
          <br />
          {{ data.valueData.company }}) -->
          备注
        </td>
      </tr>
      <tr>
        <td v-if="data.valueData.testPoinrNum[1]">1</td>
        <td v-if="data.valueData.testPoinrNum[1]">2</td>
        <td v-if="data.valueData.testPoinrNum[2]">3</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point">
        <td>{{ item.index }}</td>
        <td width="80">
          <div v-if="!item.isSzpbt || target !== '0'">
            <!-- {{ item.rows[0] }} -->
            {{ item.name }}
          </div>
          <myInput v-else v-model="item.name"></myInput>
        </td>
        <td width="50">
          <div v-if="!item.isSzpbt || target !== '0'">
            <!-- {{ item.rows[9] }} -->
            {{ item.location }}
          </div>
          <myInput v-else v-model="item.location"></myInput>
        </td>
        <td v-if="data.valueData.testPoinrNum[0]">
          <divModel
            isNumBox
            v-if="item.rows[1] !== '/'"
            v-model="item.rows[1]"
            style="text-align: center"
          ></divModel>
          <span v-else>/</span>
        </td>
        <td v-if="data.valueData.testPoinrNum[1]">
          <divModel
            isNumBox
            v-if="item.rows[2] !== '/'"
            v-model="item.rows[2]"
            style="text-align: center"
          ></divModel>
          <span v-else>/</span>
        </td>
        <td v-if="data.valueData.testPoinrNum[2]">
          <divModel
            isNumBox
            v-if="item.rows[3] !== '/'"
            v-model="item.rows[3]"
            style="text-align: center"
          ></divModel>
          <span v-else>/</span>
        </td>
        <td>
          <divModel
            v-model="item.rows[4]"
            style="width: 100%; text-align: center"
            :edit="false"
            :is-computer="true"
            :computers="
              changeNum(item.rows[1], item.rows[2], item.rows[3], index)
            "
            :computerFormula="'gs11'"
          >
          </divModel>
        </td>
        <td>{{ item.rows[5] }}</td>
        <td>{{ item.rows[6] }}</td>
        <td>{{ item.bd }}</td>
        <td>
          <div style="width: 100%; text-align: center">
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
              :transmitText="item.rows[7]"
              :list="remark"
              :Obj="''"
            >
            </selectModel>
          </div>
        </td>
      </tr>
      <tr>
        <td>备注</td>
        <td colspan="10">检测结果未扣除本底值</td>
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
      remark: ["无法到达", "不适用", "/"],
      flag: true,
      jcxcxxPointLength: "",
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
    emptyEvent() {
      this.flag = false;
      this.$nextTick(() => {
        let point = this.data.valueData.point;
        point.forEach((item, index) => {
          item.rows.forEach((a, b) => {
            if (b == 0 || b == 8) {
            } else {
              item.rows[b] = "";
            }
          });
        });
        this.flag = true;
        this.$forceUpdate();
      });
    },
    empty() {
      this.$confirm("清空后不可恢复!", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.emptyEvent();
      });
    },
    init(arr) {
      let arr1 = ["工作人员操作位", "管线洞口", "观察窗"];
      arr.forEach((item) => {
        let name = JSON.parse(JSON.stringify(item.rows[0]));
        this.$set(item, "name", name);
        if (arr1.includes(item.rows[0])) {
          item.location = "/";
          // item.rows[9] = "/";
        } else {
          item.location
            ? ""
            : (item.location = item.name.split("(")[1]
                ? item.name.split("(")[1].split(")")[0]
                : "");
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
        this.data.height._normal.carried = true;
        this.data.valueData.isObtain = true;
        return true;
      } else {
        this.data.height._normal.carried = false;
        this.data.valueData.isObtain = false;
        return false;
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
      return (total / calculation.length).toFixed(2);
    },
    changeCompany(val) {
      this.data.valueData.company = val;
    },
    changeRemark(val, b) {
      if (val == "/") {
        this.data.valueData.point[b].rows.forEach((item, index) => {
          if (index > 0 && index < 7) {
            this.data.valueData.point[b].rows[index] =
              this.data.valueData.point[b].rows[index] == "/"
                ? ""
                : this.data.valueData.point[b].rows[index];
          } else if (index == 6) {
            this.data.valueData.point[b].rows[7] = val;
          }
        });
      } else {
        this.data.valueData.point[b].rows.forEach((item, index) => {
          if (index > 0 && index < 7) {
            this.data.valueData.point[b].rows[index] = "/";
          } else if (index == 8) {
            this.data.valueData.point[b].rows[7] = val;
          }
          this.data.valueData.point[b].rows[6] = val;
        });
      }
      this.$forceUpdate();
    },
    changeNum(num1, num2, num3, index) {
      let arr = [num1, num2, num3];
      let judgeNum = this.judgeNum(arr);
      let average = this.average(arr);
      if (judgeNum.length > 0) {
        this.data.valueData.point[index].rows[4] = Math.min(...judgeNum);
        this.data.valueData.point[index].rows[5] = Math.max(...judgeNum);
        this.data.valueData.point[index].rows[6] = average;
      }
      if (this.isNumber(average)) {
        let total = 0;
        let judgeNum = this.judgeNum(arr);
        judgeNum.forEach((item, index) => {
          total += Math.pow(item - average, 2);
        });
        // this.data.valueData.point[index].rows[7] = this.IntegerAdd2(
        //   Math.sqrt(total / judgeNum.length).toFixed(2)
        // );
      }
      if (num1 == "" && num2 == "" && num3 == "") {
        this.data.valueData.point[index].rows[4] = "";
        this.data.valueData.point[index].rows[5] = "";
        this.data.valueData.point[index].rows[6] = "";
      }
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
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
      purposeDetection: (state) => state.StomatologyLinkage.purposeDetection,
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
              item2.rows[index + 1] = "";
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
    // this.$nextTick(() => {
    //   this.jsonString.forEach((item) => {
    //     if (item.to == "project_jcxcxx") {
    //       this.jcxcxxPointLength = item.data.valueData.point.length;
    //     }
    //   });
    //   if (this.data.valueData.jcxcxxIndex == this.jcxcxxPointLength - 1) {
    //     this.emptyEvent();
    //   }
    // });
    this.init(this.data.valueData.point);
  },
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
