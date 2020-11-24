<template >
  <div>
    <table class="myTable">
      <tr>
        <th colspan="8">本底测量</th>
      </tr>
      <tr>
        <th colspan="5" class="___relative">
          测量读数
          <selectModel
            class="___absolute Full"
            style="width: 50px; right: 140px; top: 5px"
            @returnVal="changeTestNum"
            :Judge="true"
            :special="1"
            :receive="''"
            :single="true"
            :rows="false"
            :transmitText="data.valueData.unit"
            :list="['μSv/h', 'nSv/h']"
            :Obj="''"
          ></selectModel>
        </th>
        <th colspan="3">计算结果 {{ data.valueData.unit }}</th>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        :key="index + 'project_fh_bd'"
      >
        <td
          v-for="(i, a) in item.row"
          :colspan="a === 6 ? 2 : 1"
          :key="a + 'project_fh_bd_2'"
          style="line-height: 30px"
          class="___relative tc"
        >
          <span v-if="index === 0 || index == 2 || a == 6 || a == 5">{{
            i
          }}</span>
          <divModel
            @change="changeModel"
            v-else
            v-model="item.row[a]"
            style="width: 100%"
            class="Full warp2 rowsInput2 hide focusBg tc"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="2">校准因子</td>
        <td colspan="6">{{ data.valueData.factor }}</td>
      </tr>
      <tr>
        <td colspan="2">备注</td>
        <td colspan="6">本底范围: 最小值*校准因子 ~ 最大值*校准因子</td>
      </tr>
    </table>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      deviceFactor: (state) => state.StomatologyLinkage.deviceFactorObj2,
    }),
  },
  props: ["data", "target", "purposeDetection"],
  mounted() {
    this.$nextTick(() => {
      this.data.valueData.purposeDetection = this.purposeDetection;
    });
  },
  methods: {
    changeTestNum(unit) {
      this.data.valueData.unit = unit;
    },
    calculate(data) {
      let factor = [];
      if (this.deviceFactor) {
        factor = this.deviceFactor.factor;
      }
      if (factor.length) {
        let newFactor = factor.map((item) => {
          let scope, γ;
          if (item.measure1.split("/").length) {
            scope = item.measure1.split("/")[0];
            γ = item.measure1.split("/")[1];
          }
          return {
            scope: scope,
            γ: γ,
          };
        });
        newFactor.sort((a, b) => {
          return Number(a.scope) > Number(b.scope) ? 1 : -1;
        });
        if (data <= newFactor[0].scope) {
          return newFactor[0].γ;
        }
        if (data >= newFactor.slice(-1)) {
          return newFactor.slice(-1)[0].γ;
        }
        return newFactor.find((item) => item.scope >= data).γ;
      }
    },
    changeModel(a) {
      let val = a.split(".");
      if (val) {
        if (val.length == 1 || val[1].length !== 2) {
          this.$message.warning("请输入两位小数");
          return;
        }
      }

      let point = [];
      this.data.valueData.point.forEach((item, index) => {
        if ([1, 3].includes(index)) {
          item.row.forEach((el, i) => {
            if (i >= 0 && i <= 4) {
              point.push(el);
            }
          });
        }
      });
      if (point.every((item) => item)) {
        let newPoint = JSON.parse(JSON.stringify(point));
        newPoint.forEach((item) => (item = Number(item)));
        let min = Math.min(...newPoint),
          sum = eval(newPoint.join("+")) / newPoint.length,
          max = Math.max(...newPoint);
        this.data.valueData.point[0].row[6] = min;
        this.data.valueData.point[1].row[6] = sum.toFixed46(2);
        this.data.valueData.point[2].row[6] = max;

        let minScope = this.IntegerAdd2(
            (this.calculate(min) * min).toFixed46(2)
          ),
          maxScope = this.IntegerAdd2((this.calculate(max) * max).toFixed46(2));
        this.data.valueData.point[3].row[6] = minScope + " ~ " + maxScope;
        if (this.calculate(min) === this.calculate(max)) {
          this.data.valueData.factor = this.calculate(min);
        } else {
          this.data.valueData.factor =
            this.calculate(min) + " ~ " + this.calculate(max);
        }
      }
    },
  },
};
</script>