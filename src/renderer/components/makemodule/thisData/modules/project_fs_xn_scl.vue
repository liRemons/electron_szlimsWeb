<template>
  <div class="___relative" style="padding-top: 20px;">
    <div :class="{ eventCover: !ableInput }"></div>
    <table border="1" class="myTableReset _normalHeight_">
      <tr>
        <th align="left" colspan="6" class="p20">
          {{ data.valueData.testProjectChineseName }}
        </th>
      </tr>
      <tr>
        <th class="p20 tc" colspan="6">标准要求</th>
      </tr>
      <tr>
        <td class="p20 tl" colspan="6">
          验收&状态&稳定性：≤5@口内机。
        </td>
      </tr>
      <tr>
        <th class="p20 tc" colspan="6">检测及计算方法</th>
      </tr>
      <tr>
        <td class="p20 tl" colspan="6">
          将探测器置于靠近限束筒出口的位置，确保探测器位于主射束中心轴并使探测器表面与主射
          束中心轴垂直。以设备常用成人曝光条件下曝光，连续曝光5次，记录每一次的剂量值，计
          算重复性，计算公式为:
          <img
            src="../../../../assets/img/formula_1.png"
            height="32"
            width="130"
          />
        </td>
      </tr>

      <tr>
        <th colspan="6" align="center">检测结果</th>
      </tr>
      <tr>
        <td class="___relative" colspan="6" align="center">
          <span>检测条件：管电压：</span>
          <div
            class="___absolute t0"
            style="width: 70px; height: 36px; left: 270px;"
          >
            <divModel
              v-model="data.valueData.tubeVoltage"
              style="
                width: 50px;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
              "
              class="Full moduleInput hide focusBg"
            ></divModel>
            <span class="___absolute right0">kV</span>
          </div>
          <span style="margin-left: 70px;">，管电流：</span>
          <div
            class="___absolute t0"
            style="width: 70px; height: 32px; left: 400px;"
          >
            <divModel
              v-model="data.valueData.tubeCurrent"
              style="
                width: 50px;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
              "
              class="Full moduleInput hide focusBg"
            ></divModel>
            <span class="___absolute right0">mA</span>
          </div>
          <span style="margin-left: 70px;">，曝光时间：</span>
          <div
            class="___absolute t0"
            style="width: 70px; height: 32px; left: 550px;"
          >
            <divModel
              v-model="data.valueData.timeExposure"
              style="
                width: 50px;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
              "
              class="Full moduleInput hide focusBg"
            ></divModel>
            <span class="___absolute right0">s。</span>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="5" align="center">空气比释动能测量值K/μGy</td>
        <td rowspan="2" align="center">重复性CV/%</td>
      </tr>
      <tr>
        <td align="center">1</td>
        <td align="center">2</td>
        <td align="center">3</td>
        <td align="center">4</td>
        <td align="center">5</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point">
        <td>
          <divModel
            v-model="item.rows[0]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[1]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[2]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[3]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[4]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td class="___relative">
          <divModel
            v-model="item.rows[5]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
            :edit="false"
            :is-computer="true"
            :computers="
              changeNum(
                item.rows[0],
                item.rows[1],
                item.rows[2],
                item.rows[3],
                item.rows[4],
                index
              )
            "
            :computerFormula="'gs11'"
          >
          </divModel>
          <div
            class="__functionBox"
            v-if="
              (index != data.valueData.point.length - 1 &&
              ipdTemplate == 'ipdTemplate')&& target == 0
            "
            style="right: -70px; width: 20px; z-index: 100;"
          >
            <div
              class="__functionButton6"
              @dblclick="reduce(index)"
              style="right: 0;"
            >
              <span>-</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th colspan="6" class="tc">备注说明</th>
      </tr>
      <tr>
        <td colspan="6" class="tc">
          <divModel
            v-model="data.valueData.remarks"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
      </tr>
    </table>
    <div
      class="__functionBox"
      style="bottom: 69px;"
      v-if="ipdTemplate == 'ipdTemplate' && target == 0"
    >
      <div
        class="__functionButton6"
        @dblclick="reduce(data.valueData.point.length - 1)"
        style="right: 30px;"
      >
        <span>-</span>
      </div>
      <div class="__functionButton6" @click="increase">
        <span>+</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  ],
  methods: {
    reduce(index) {
      if (this.data.valueData.point.length > 1) {
        this.data.valueData.point.splice(index, 1);
        this.$emit("redefinition");
      }
    },
    increase() {
      let obj = {
        rows: ["", "", "", "", "", ""],
      };
      this.data.valueData.point.push(obj);
      this.$emit("redefinition");
    },

    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
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
    changeNum(num1, num2, num3, num4, num5, index) {
      let arr = [num1, num2, num3, num4, num5];
      let calculation = this.judgeNum(arr);
      if (calculation.length == 5) {
        let average = this.average(calculation);
        let total = 0;
        calculation.forEach((item, index) => {
          total += Math.pow(item - average, 2);
        });
        this.data.valueData.point[index].rows[5] = (
          (Math.sqrt(total / 4) / average) *
          100
        ).toFixed(1);
      }
    },
  },
  components: {},
  mounted() {},
};
</script>


<style scoped>
</style>
