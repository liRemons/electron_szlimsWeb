<template>
  <div class="___relative" style="padding-top: 20px;">
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
        <td class="p20 tl" colspan="7">
          验收&状态&稳定性：±10%内。
        </td>
      </tr>
      <tr>
        <th class="p20 tc" colspan="7">检测及计算方法</th>
      </tr>
      <tr>
        <td class="p20 tl" colspan="7" style="line-height: 16px;">
          对于口内牙片机，将探测器置于靠近限束筒出口的位置；对于全景摄影功能的口外机，将探测器置于影像接收器外壳表面；
          对于头颅摄影功能的口外机，将探测器置于次级光阑外侧，
          确保探测器位于主射束中心轴并使探测器表面与主射束中心轴 垂直。
          校准平均值=管电压测量值平均值×a1-a0，a1=，a0=
          ，a0和a1依有效的计量部门证书按线性回归拟合方程求
          得；相对偏差=（校准平均值-管电压预设值）/管电压预设值×100%。
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
        <td class="___relative">
          <divModel
            v-model="item.rows[4]"
            style="width: 100%; text-align: center;"
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
            style="width: 100%; text-align: center;"
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
        <th colspan="7" class="tc">备注说明</th>
      </tr>
      <tr>
        <td colspan="7" class="p20">
          <divModel
            v-model="data.valueData.remarks"
            style="width: 100%; text-align: center;"
            class="warp2 rowsInput2 hide focusBg"
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
      setTimeout(() => {
        try {
          let arr = [num1, num2, num3];
          arr.forEach((item, index) => {
            if (
              this.isNumber(item) &&
              this.deviceFactorObj.deviceFactor_gdy instanceof Array &&
              this.deviceFactorObj.deviceFactor_gdy.length > 0
            ) {
              this.confirmFactor[index] = this.getFactor(
                item,
                this.deviceFactorObj.deviceFactor_gdy
              );
            }
          });
          if (
            arr.some((item, index, array) => {
              return this.isNumber(item);
            })
          ) {
            let result = [];
            let retain = [];
            this.confirmFactor.forEach((item, num) => {
              if (this.isNumber(item)) {
                result.push(item * arr[num]);
                retain.push(
                  arr[num].split(".").length > 1
                    ? arr[num].split(".")[1].length
                    : 0
                );
              }
            });
            let min = Math.min(...retain);
            this.data.valueData.point[index].rows[4] = this.average(
              result
            ).toFixed46(min);
            if (
              String(this.data.valueData.point[index].rows[4]).split(".")
                .length == 1
            ) {
              this.data.valueData.point[index].rows[4] =
                this.data.valueData.point[index].rows[4] + ".0";
            }
          }
          if (
            this.isNumber(num0) &&
            this.isNumber(this.data.valueData.point[index].rows[4])
          ) {
            this.data.valueData.point[index].rows[5] = (
              ((this.data.valueData.point[index].rows[4] - num0) / num0) *
              100
            ).toFixed46(1);
          }

          if (
            String(this.data.valueData.point[index].rows[5]).split(".")
              .length == 1
          ) {
            this.data.valueData.point[index].rows[5] =
              this.data.valueData.point[index].rows[5] + ".0";
          }
        } catch (e) {
          console.log(e);
        }
      }, 100);
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
