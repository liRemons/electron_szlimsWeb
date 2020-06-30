<template>
  <div>
    <table class="biaoZhunTable" border="1" style="width: 1140px;" v-if="show">
      <tr>
        <td width="200">标准物质</td>
        <td width="150">取用量</td>
        <td width="100">定容体积（mL)</td>
        <td width="100">配制次数</td>
        <td width="140">标准溶液浓度</td>
        <td width="200">标液编号</td>
        <td width="240">有效期</td>
        <td class="hiddenBorder" style="width: 50px;"></td>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        style="line-height:30px;"
        :key="index + 'point'"
      >
        <td>
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
        <td @click="calculate(item, index)">
          <span v-if="item.id">{{ item.concentration }}</span>
          <divModel v-else v-model="item.concentration"></divModel>
        </td>
        <td>
          <divModel v-model="item.numbering"></divModel>
        </td>
        <td>
          <divModel v-model="item.validityPeriod"></divModel>
        </td>
        <td class="hiddenBorder">
          <div
            class="___relative"
            v-if="!item.noUse"
            style="width: 100px; height: 30px;"
          >
            <div class="___absolute">
              <div class="rowOption" @click="addRow(index)">+</div>
            </div>
            <div class="___absolute" style="left: 23px;top: 0px;">
              <div class="rowOption" @click="delRow(index)">-</div>
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
  props: ["data", "jsonString"],
  name: "curve_foot",
  data() {
    return {
      show: true,
      count: 0, //次数
      num: null
    };
  },
  methods: {
    calculate(data, index) {
      // 标液
      if (data.id == "") {
        return;
      }
      if (this.jsonString[0].data.valueData.point[index].standardValue == "") {
        this.$message.warning("请选择标准物质");
        return;
      }
      let standardValue = Number(
        this.jsonString[0].data.valueData.point[index].standardValue
      );
      // Dosage  取用量
      // constantVolume 定容体积
      // count 次数
      // standardValue 标准值
      // concentration  标液浓度
      // 公式：取用量*标准值/定容体积（1次）——————————
      // 公式：取用量*上次标液浓度/定容体积（多次）——————————
      this.count = 0;
      this.num = 0;
      data.count == 0 ? (data.count = 1) : "";
      let Dosage = Number(data.Dosage);
      let count = Number(data.count);
      let constantVolume = Number(data.constantVolume);
      data.concentration = this.calculateNum(
        Dosage,
        standardValue,
        constantVolume,
        count
      );
    },
    calculateNum(Dosage, standardValue, constantVolume, count) {
      this.count++;
      this.num = ((Dosage * standardValue) / constantVolume).toPrecision(3);
      if (count !== 1) {
        if (this.count < count) {
          this.calculateNum(Dosage, this.num, constantVolume, count);
        }
      }
      return this.num;
    },
    addRow(index) {
      let obj = {
        id: "",
        materialName: "",
        Dosage: "",
        constantVolume: "",
        concentration: "",
        numbering: "",
        validityPeriod: "",
        noUse: false
      };
      this.data.valueData.point.push(obj);
      this.$forceUpdate();
      bus.$emit("reset");
    },
    delRow(index) {
      let arr = this.jsonString.filter(item => item.to == "curve_foot");
      let point = [];
      arr.forEach(item => {
        point.push(item.data.valueData.point);
      });
      point = point.flat();
      let newArr = point.filter(item => !item.noUse);
      if (newArr.length == 1) {
        this.$message.warning("已经是最后一个了");
        return;
      }
      this.data.valueData.point.splice(index, 1);
      this.$forceUpdate();
      bus.$emit("reset");
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
