<template>
  <div>
    <table class="biaoZhunTable" border="1" style="width: 1140px">
      <tr>
        <td colspan="12" class="tl05">标准储备液配置记录</td>
      </tr>
      <tr>
        <td colspan="3">标准物质</td>
        <td>
          取用量
          <CurveUnit
            :unit="data.valueData.DosageUnit"
            :type="2"
            @change="
              (val) => {
                data.valueData.DosageUnit = val;
              }
            "
          ></CurveUnit>
        </td>
        <td>
          定容体积
          <CurveUnit
            :unit="data.valueData.volUnit"
            :type="3"
            @change="
              (val) => {
                data.valueData.volUnit = val;
              }
            "
          ></CurveUnit>
        </td>
        <td>单位转换系数</td>
        <td colspan="2">
          标准溶液浓度
          <CurveUnit
            :unit="data.valueData.concentrationUnit"
            :type="1"
            @change="
              (val) => {
                data.valueData.concentrationUnit = val;
              }
            "
          ></CurveUnit>
        </td>
        <td colspan="3">标液编号</td>
        <td>有效期</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index + 'point'">
        <td colspan="3">
          <span v-if="item.noUse">{{ item.materialName }}</span>
          <divModel v-else v-model="item.materialName"></divModel>
        </td>
        <td>
          <divModel v-model="item.Dosage"></divModel>
        </td>
        <td>
          <divModel v-model="item.constantVolume"></divModel>
        </td>
        <td>
          <divModel :isNumBox="true" v-model="item.count"></divModel>
        </td>
        <td colspan="2" @click="calculate(item, index)">
          {{ item.concentration }}
        </td>
        <td colspan="3">
          <divModel v-model="item.numbering"></divModel>
        </td>
        <td class="___relative">
          <divModel v-model="item.validityPeriod"></divModel>
          <div class="___absolute" style="top: 0; right: -20px">
            <el-tooltip
              :open-delay="500"
              v-if="item.noUse && !item.materialName.includes('TVOC')"
              effect="dark"
              content="生成储备液"
            >
              <div class="rowOption" @click="createStockSolution(item, index)">
                +
              </div>
            </el-tooltip>
            <div
              class="rowOption"
              v-if="!item.noUse && !item.materialName.includes('TVOC')"
              @click="del(item, index)"
            >
              -
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
export default {
  props: ["data", "jsonString", "onlyRead"],
  name: "curve_foot",
  watch: {},
  data() {
    return {};
  },
  methods: {
    // 生成储备液
    createStockSolution(data, index) {
      data.isStockSolution = true;
      let point = this.__getPoint("curve_foot");
      if (
        point.filter((item) => item.id === data.id && data.noUse).length > 1
      ) {
        this.$message.warning("储备液只能生成一个");
      } else {
        let stockSolution = Object.assign({}, data);
        stockSolution.materialName = stockSolution.materialName.replace(
          "溶液",
          "储备液"
        );
        stockSolution.isStockSolution = false;
        stockSolution.noUse = false;
        this.data.valueData.point.splice(index + 1, 0, stockSolution);
        bus.$emit("reset");
      }
    },
    del(data, index) {
      this.data.valueData.point.splice(index, 1);
      this.jsonString.forEach((item) => {
        if (item.to === "curve_foot") {
          item.data.valueData.point.forEach((a) => {
            if (a.id === data.id) {
              data.isStockSolution = false;
            }
          });
        }
      });
      bus.$emit("reset");
    },
    calculate(data, index) {
      let point = this.__getPoint("curve_foot").filter(
        (item) => item.id === data.id && item.noUse
      );
      // 标液
      if (!data.id) {
        return;
      }

      // Dosage  取用量
      // constantVolume 定容体积
      // count 次数
      // standardValue 标准值
      // concentration  标液浓度
      let Dosage = Number(data.Dosage);
      let count = Number(data.count);
      let standardValue = Number(data.standardValue);
      let constantVolume = Number(data.constantVolume);
      // 如果是储备液且有溶液
      if (!data.noUse && point.length) {
        data.concentration = this.calculateNum(
          Dosage,
          point[0].concentration,
          constantVolume,
          count
        );
      } else {
        data.concentration = this.calculateNum(
          Dosage,
          standardValue,
          constantVolume,
          count
        );
      }
      this.$forceUpdate();
    },
    calculateNum(Dosage, standardValue, constantVolume, count) {
      return this.IntegerAdd0(
        (((standardValue * Dosage) / constantVolume) * count).toFixed46(1)
      );
    },
  },
};
</script>

<style scoped>
</style>
