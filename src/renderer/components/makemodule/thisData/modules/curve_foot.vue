<template>
  <div>
    <table class="biaoZhunTable" border="1" style="width: 1140px" v-if="show">
      <tr>
        <td colspan="10" class="tl05">标准溶液配置记录</td>
      </tr>
      <tr>
        <td colspan="3">标准物质</td>
        <td colspan="1">取用量</td>
        <td colspan="1">定容体积（mL)</td>
        <td colspan="1">配制次数</td>
        <td colspan="1">标准溶液浓度</td>
        <td colspan="2">标液编号</td>
        <td colspan="1">有效期</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index + 'point'">
        <td colspan="3">
          <!-- <span v-if="item.noUse">{{ item.materialName }}</span> -->
          <divModel v-model="item.materialName"></divModel>
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
          {{ item.concentration }}
        </td>
        <td
          colspan="2"
          v-if="index == 0"
          :rowspan="data.valueData.point.length"
        >
          <divModel @change="changeNum" v-model="item.numbering"></divModel>
        </td>
        <td
          class="___relative"
          v-if="index == 0"
          :rowspan="data.valueData.point.length"
        >
          <divModel
            v-model="item.validityPeriod"
            @change="changeDate"
          ></divModel>
          <!-- <div class="___absolute hiddenBorder" style="right: -110px; top: 0">
            <div class="___relative" style="width: 100px; height: 30px">
              <div class="___absolute">
                <el-tooltip
                  content="增加表格"
                  :open-delay="1000"
                  placement="top"
                >
                  <div class="rowOption add" @click="addRow(index)">+</div>
                </el-tooltip>
              </div>
              <div class="___absolute" style="left: 23px; top: 0px">
                <el-tooltip
                  content="删除表格"
                  :open-delay="1000"
                  placement="top"
                >
                  <div class="rowOption" @click="delRow(index)">-</div>
                </el-tooltip>
              </div>
            </div>
          </div> -->
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
  watch: {
    "data.valueData.point": function () {
      if (this.isUpdate) {
        this.updateUI();
      }
    },
  },
  data() {
    return {
      show: true,
      count: 0, //次数
      num: null,
      isUpdate: false,
    };
  },
  methods: {
    updateUI(e) {
      this.$nextTick(() => {
        this.isUpdate = false;
        let num = "",
          validityPeriod = "";
        let foot = this.jsonString.filter((item) => item.to == "curve_foot");

        if (foot.length) {
          num = this.data.valueData.point[0].numbering;
          validityPeriod = this.data.valueData.point[0].validityPeriod;
        }
        this.jsonString.forEach((item) => {
          if (item.to == "curve_cby") {
            item.data.valueData.point.forEach((a) => {
              a.materialNum = num;
            });
          }
          if (item.to == "curve_foot") {
            item.data.valueData.point.forEach((a) => {
              a.validityPeriod = validityPeriod;
              a.numbering = num;
            });
          }
        });
        bus.$emit("reset");
        this.$forceUpdate();
      });
    },
    changeNum(e) {
      this.data.valueData.point.forEach((item) => {
        item.numbering = e;
      });

      this.isUpdate = true;
      this.updateUI();
    },
    changeDate(e) {
      this.isUpdate = true;
      this.data.valueData.point.forEach((item) => {
        item.validityPeriod = e;
      });
      this.updateUI();
    },
    calculate(data, index) {
      // 标液
      if (!data.id) {
        return;
      }

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
      let standardValue = Number(data.standardValue);
      let constantVolume = Number(data.constantVolume);
      data.concentration = this.calculateNum(
        Dosage,
        standardValue,
        constantVolume,
        count
      );
      this.$forceUpdate();
    },
    calculateNum(Dosage, standardValue, constantVolume, count) {
      this.count++;
      this.num = ((Dosage * standardValue) / constantVolume).toFixed46(1);
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
        noUse: false,
      };
      this.data.valueData.point.push(obj);
      // this.$forceUpdate();
      // bus.$emit("reset");
    },
    delRow(index) {
      let arr = this.jsonString.filter((item) => item.to == "curve_foot");
      let point = [];
      arr.forEach((item) => {
        point.push(item.data.valueData.point);
      });
      point = point.flat();
      let newArr = point.filter((item) => !item.noUse);
      if (newArr.length == 1) {
        this.$message.warning("已经是最后一个了");
        return;
      }
      this.data.valueData.point.splice(index, 1);
      // this.$forceUpdate();
      // bus.$emit("reset");
    },
  },
  mounted() {
    this.isUpdate = true;
  },
};
</script>

<style scoped>
</style>
