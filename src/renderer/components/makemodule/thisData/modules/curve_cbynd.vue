<template>
  <div>
    <div
      class="tl05"
      style="
        border: 1px solid gray;
        line-height: 32px;
        width: 1138px;
        border-bottom: none;
      "
    >
      标准储备液浓度
    </div>
    <table style="width: 1140px" border="1" class="curveTable">
      <tr>
        <td colspan="2">标准储备液各组分浓度</td>
        <td
          v-for="(item, index) in num"
          :colspan="(10 - 2) / num.length"
          :key="index + 'index'"
        >
          {{ item.numbering }}
        </td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index">
        <td colspan="2">{{ item.materialName }}</td>
        <td
          v-for="(a, b) in item.rows"
          :colspan="(10 - 2) / item.rows.length"
          :key="b + 'index'"
        >
          {{ a }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "jsonString", "onlyRead"],
  data() {
    return {
      num: [],
    };
  },
  watch: {
    "data.valueData.point": function () {
      this.num = this.data.valueData.point[0].num;
      if (!this.num) {
        return;
      }
      this.data.valueData.point.forEach((item, index) => {
        item.rows = [];
        item.num.forEach((a, b) => {
          item.rows.push(
            this.significantFigure3(
              (
                (item.concentration * a.Dosage) /
                a.constantVolume /
                1000
              ).toFixed46(3)
            )
          );
        });
      });
    },
  },
  methods: {},
  mounted() {},
};
</script>