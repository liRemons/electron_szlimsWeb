<template>
  <!-- 储备液配制记录 -->
  <div class="curve_cby">
    <table style="width: 1140px" border="1" class="curveTable">
      <tr>
        <td class="tl05" colspan="10">标准储备液配制记录</td>
      </tr>
      <tr>
        <td colspan="3">标准储备液名称</td>
        <td>取用量</td>
        <td>定容体积（mL)</td>
        <td>配制次数</td>
        <td>标准溶液浓度</td>
        <td colspan="2">标液编号</td>
        <td>有效期</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index + 'index'">
        <td
          colspan="3"
          style="line-height: 20px"
          v-if="index == 0"
          :rowspan="data.valueData.point.length"
        >
          TVOC标准储备液 <br />
          编号：{{ item.materialNum }}
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
        <td v-if="index == 0" :rowspan="data.valueData.point.length">
          见标准储备液浓度
        </td>
        <td colspan="2" class="___relative">
          <divModel v-model="item.numbering"></divModel>
          <div
            class="___absolute"
            style="top: 0; right: -160px"
            v-if="!onlyRead"
          >
            <div
              class="rowOption"
              style="display: inline-block"
              @click="addRow(index)"
            >
              +
            </div>
            <div
              class="rowOption"
              style="display: inline-block"
              @click="delRow(index)"
            >
              -
            </div>
          </div>
        </td>
        <td
          v-if="index == 0"
          :rowspan="data.valueData.point.length"
          class="___relative"
        >
          <divModel v-model="item.validityPeriod"></divModel>
          <el-button
            v-if="!onlyRead"
            @click="create"
            class="___absolute"
            style="top: 0; right: -100px"
            size="mini"
            icon="el-icon-search"
            circle
          ></el-button>
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
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.create();
    });
  },
  watch: {},
  methods: {
    addRow(index) {
      let json = this.jsonString.filter((item) => item.to == "curve_cby");
      if (json.length) {
        let point = json.map((item) => item.data.valueData.point).flat();
        if (point.length >= 10) {
          this.$message.warning("您最多只能添加10条");
          return;
        }
      }
      let obj = {
        id: "",
        materialNum: "",
        materialName: "",
        Dosage: "",
        constantVolume: "",
        concentration: "",
        numbering: "",
        validityPeriod: "临用现配",
        count: 1,
        noUse: true,
      };
      this.data.valueData.point.splice(index + 1, 0, obj);
      bus.$emit("reset");
    },
    delRow(index) {
      if (index == 0) {
        return;
      }
      this.data.valueData.point.splice(index, 1);
      bus.$emit("reset");
    },
    create() {
      let json = this.jsonString.filter((item) => item.to == "curve_cby");
      if (json.length) {
        let point = json.map((item) => item.data.valueData.point).flat();
        let num = point.map((item) => item.numbering).filter((item) => item);
        let Dosage = point.map((item) => item.Dosage).filter((item) => item);
        let constantVolume = point
          .map((item) => item.constantVolume)
          .filter((item) => item);
        if (point.length == 1 && point[0].numbering == "") {
          return;
        }
        if (num.length !== point.length) {
          this.$message.warning("您有编号未填写");
          return;
        }
        if ([...new Set(num)].length !== num.length) {
          this.$message.warning("您有重复编号");
          return;
        }
        if (Dosage.length !== point.length) {
          this.$message.warning("您有取用量未填写");
          return;
        }
        if (constantVolume.length !== point.length) {
          this.$message.warning("您有定容体积未填写");
          return;
        }
      }
      let foot = this.jsonString.filter((item) => item.to == "curve_foot");
      let point = json.map((item) => item.data.valueData.point).flat();
      let footPoint = foot.map((item) => item.data.valueData.point).flat();
      let standardValueArr = footPoint
        .map((item) => item.standardValue)
        .filter((item) => item);

      if (standardValueArr.length !== footPoint.length) {
        this.$message.warning("您有浓度尚未计算");
        return;
      }
      this.jsonString.forEach((item) => {
        if (item.to == "curve_cbynd") {
          item.data.valueData.point.forEach((a) => {
            a.num = point;
            footPoint.forEach((b) => {
              if (a.id == b.id) {
                a.constantVolume = b.constantVolume;
                a.materialName = b.materialName;
                a.concentration = b.concentration;
              }
            });
          });
        }
      });
      bus.$emit("reset");
    },
  },
};
</script>