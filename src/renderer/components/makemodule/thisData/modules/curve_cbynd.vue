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
      标准工作液浓度
      <CurveUnit
        :unit="data.valueData.unit"
        :type="1"
        @change="
          (val) => {
            data.valueData.unit = val;
          }
        "
      ></CurveUnit>
    </div>
    <table style="width: 1140px" border="1" class="curveTable">
      <tr>
        <td colspan="2">标准工作液浓度</td>
        <td
          v-for="(item, index) in num"
          :colspan="(10 - 2) / num.length"
          :key="index + 'index'"
        >
          {{ item.numbering }}
        </td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index">
        <td colspan="2" class="___relative">
          <divModel v-model="item.materialName"></divModel>
          <div class="___absolute" style="top: 0; right: -955px">
            <el-tooltip :open-delay="500" effect="dark" content="复制一行">
              <div class="rowOption" @click="add(item, index)">+</div>
            </el-tooltip>
            <el-tooltip :open-delay="500" effect="dark" content="删除一行">
              <div class="rowOption" @click="del(item, index)">-</div>
            </el-tooltip>
          </div>
        </td>
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
import bus from "@/utils/bus.js";
export default {
  props: ["data", "jsonString", "onlyRead"],
  data() {
    return {
      num: [],
    };
  },
  watch: {
    "data.valueData.point": function () {
      this.init();
    },
  },
  methods: {
    init() {
      let headPoint = this.__getPoint("curve_head");
      this.num = this.data.valueData.point[0].num;
      if (!this.num) {
        return;
      }
      this.data.valueData.point.forEach((item, index) => {
        item.rows = [];
        item.num.forEach((a, b) => {
          item.rows.push(
            this.IntegerAdd2(
              a.materialNum.includes("TVOC") &&
                a.materialNum === headPoint[0].materialName
                ? (
                    ((item.standardValue * a.Dosage) / a.constantVolume) *
                    a.count
                  ).toFixed46(2)
                : (
                    ((item.concentration * a.Dosage) / a.constantVolume) *
                    a.count
                  ).toFixed46(2)
            )
          );
        });
      });
    },
    add(data, index) {
      this.data.valueData.point.push(data);
      bus.$emit("reset");
    },
    del(data, index) {
      let cbyndPoint = this.__getPoint("curve_cbynd");
      if (cbyndPoint.length <= 1) {
        this.$message.error("再删除就没有了");
        return;
      }
      this.data.valueData.point.splice(index, 1);
      bus.$emit("reset");
    },
  },
  mounted() {
    this.init();
  },
};
</script>