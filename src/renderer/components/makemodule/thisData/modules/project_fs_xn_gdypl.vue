<template>
  <div class="___relative" style="padding-top: 20px">
    <div :class="{ eventCover: target != 0 }"></div>
    <table border="1" class="myTableReset _normalHeight_">
      <tr>
        <th align="left" colspan="7" class="p20">
          {{ data.valueData.testProjectChineseName }}
        </th>
      </tr>
      <tr>
        <th class="p20 tc" colspan="7">标准要求</th>
      </tr>
      <tr>
        <td class="p20 tl" colspan="7">验收&状态&稳定性：±10%内。</td>
      </tr>
      <tr>
        <th class="p20 tc" colspan="7">检测及计算方法</th>
      </tr>
      <tr>
        <td class="p20 tl" colspan="7" style="line-height: 16px">
          校准平均值等于3次管电压测量值求平均值后，平均值依有效的计量部门检定/校准证书的校准结果进行校准后的结果。公式如下：依校准证书可知电压档为A1（送计量院校准仪器的读数）时，相应的校准值为B1（计量部门标准器的读数）。电压档为A2（送计量院校准仪器的读数）时，相应的校准值为B2（计量部门标准器的读数），现在管电压3次测量的平均值An位于A1和A2之间，则管电压校准平均值Bn
          =（An- A1）*（B2 - B1 ）/（A2 - A1 ）+ B1。
          相对偏差=（校准平均值-管电压预设值）/管电压预设值×100%。
        </td>
      </tr>

      <tr>
        <th colspan="7" class="tc">检测结果</th>
      </tr>
      <tr>
        <td rowspan="2" align="center" colspan="2">预设电压/kV</td>
        <td colspan="3" align="center">管电压测量值/kV</td>
        <td rowspan="2" align="center">校准平均值 /kV</td>
        <td rowspan="2" align="center">相对偏差/%</td>
      </tr>
      <tr>
        <td align="center">1</td>
        <td align="center">2</td>
        <td align="center">3</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point">
        <td colspan="2">
          <divModel
            v-model="item.rows[0]"
            style="width: 100%; text-align: center"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[1]"
            style="width: 100%; text-align: center"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[2]"
            style="width: 100%; text-align: center"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[3]"
            style="width: 100%; text-align: center"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td class="___relative">
          <divModel
            v-model="item.rows[4]"
            style="width: 100%; text-align: center"
            class="moduleInput hide focusBg"
            :edit="false"
            :is-computer="true"
            :computers="
              changeNum(
                index,
                item.rows[0],
                item.rows[1],
                item.rows[2],
                item.rows[3]
              )
            "
            :computerFormula="'gs11'"
          >
          </divModel>
        </td>
        <td class="___relative">
          <divModel
            v-model="item.rows[5]"
            style="width: 100%; text-align: center"
            class="moduleInput hide focusBg"
            :edit="false"
            :is-computer="true"
            :computers="
              changeNum(
                index,
                item.rows[0],
                item.rows[1],
                item.rows[2],
                item.rows[3]
              )
            "
            :computerFormula="'gs11'"
          >
          </divModel>

          <div
            class="__functionBox"
            v-if="
              index != data.valueData.point.length - 1 &&
              ipdTemplate == 'ipdTemplate'
            "
            style="right: -70px; width: 20px; z-index: 100"
          >
            <div
              class="__functionButton6"
              @dblclick="reduce(index)"
              style="right: 0"
            >
              <span>-</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <th colspan="7" class="tc">备注说明</th>
      </tr>
      <tr>
        <td colspan="7" class="p20">
          <divModel
            v-model="data.valueData.remarks"
            style="width: 100%; text-align: center"
            class="warp2 rowsInput2 hide focusBg"
          ></divModel>
        </td>
      </tr>
    </table>

    <div
      class="__functionBox"
      style="bottom: 69px"
      v-if="ipdTemplate == 'ipdTemplate' && target == 0"
    >
      <div
        class="__functionButton6"
        @dblclick="reduce(data.valueData.point.length - 1)"
        style="right: 30px"
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      confirmFactor: ["", "", ""],
    };
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

    changeNum(index, num0, num1, num2, num3) {
      if (num0 == "" || num1 == "" || num2 == "" || num3 == "") {
        return;
      }
      let deviceFactor_gdy = [];
      this.deviceFactorObj &&
        this.deviceFactorObj.deviceFactor_gdy.forEach((item, index) => {
          deviceFactor_gdy[index] = {
            value1: item.value.split("/")[0],
            value2: item.value.split("/")[1],
          };
        });
      deviceFactor_gdy.sort((a, b) => a.value1 - b.value1);
      let min, max;
      const fn = (data) => {
        let An = Number(data);
        min = [...deviceFactor_gdy].reverse().find((item) => An > item.value2);

        max = deviceFactor_gdy.find((item) => An < item.value2);
        if (!min) {
          // 如果输入的值比最小值还小
          let mini = deviceFactor_gdy[0];
          return (+mini.value1 / +mini.value2) * +data;
        }

        if (!max) {
          // 如果输入的值比最大值还大
          let big = deviceFactor_gdy[deviceFactor_gdy.length - 1];
          return (+big.value1 / +big.value2) * +data;
        }
        let A1 = +min.value2;
        let B2 = +max.value1;
        let B1 = +min.value1;
        let A2 = +max.value2;
        let Bn = ((An - A1) * (B2 - B1)) / (A2 - A1) + B1;
        return Bn;
      };
      let a1 = fn(num1);
      let a2 = fn(num2);
      let a3 = fn(num3);
      let average = (a1 + a2 + a3) / 3;
      // if (!min || !max) {
      //   average = (Number(num1) + Number(num2) + Number(num3)) / 3;
      // }
      this.data.valueData.point[index].rows[4] = this.IntegerAdd2(
        average.toFixed46(2)
      );
      this.data.valueData.point[index].rows[5] = this.IntegerAdd2(
        (
          ((this.data.valueData.point[index].rows[4] - num0) / num0) *
          100
        ).toFixed46(2)
      );
    },
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
  },
  computed: {
    ...mapState({
      deviceFactor: (state) => state.StomatologyLinkage.deviceFactor,
      deviceFactorObj: (state) => state.StomatologyLinkage.deviceFactorObj,
    }),
  },
  components: {},
  mounted() {},
};
</script>


<style scoped>
</style>
