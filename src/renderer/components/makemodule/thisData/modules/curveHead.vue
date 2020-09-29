<template>
  <div class="___relative">
    <div id="Layer1" class="eventCover" v-if="isCopy"></div>
    <table
      class="curveTable"
      style="width: 1140px; line-height: 30px"
      border="1"
    >
      <tr>
        <td colspan="2">标准物质</td>
        <td>标准值</td>
        <td colspan="2">国标号(或批号)</td>
        <td colspan="2">实验室编号</td>
        <td>生产日期</td>
        <td>失效效期</td>
        <td>基体</td>
        <!-- <td class="hiddenBorder" style="width: 50px"></td> -->
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        :key="index + 'point'"
        style="height: 32px"
      >
        <td colspan="2">
          <querySelect
            v-model="item.materialName"
            :num="index"
            :key="Math.random()"
            :list="materialList"
            :defaultValue="item.materialName"
            @getSelectItem="returnVal"
            :name="'materialName'"
          >
          </querySelect>
        </td>
        <td>{{ item.standardValue }}</td>
        <td colspan="2">{{ item.batchNum }}</td>
        <td colspan="2">{{ item.laboratoryNum }}</td>
        <td>{{ item.productionTime | getTime }}</td>
        <td>{{ item.invalidTime | getTime }}</td>
        <td class="___relative">
          {{ item.matrix }}
          <div class="___absolute" style="top: 0; right: -46px" v-if="!onlyRead">
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
      </tr>
    </table>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
import { queryAllMaterial } from "@/api/laboratory";

export default {
  name: "curveHead",
  props: ["data", "target", "jsonString",'onlyRead'],
  data() {
    return {
      materialList: [],
      canEdit: false,
    };
  },
  filters: {
    getTime(val) {
      if (!val) return;
      let timeArr = val.split(" ");
      return timeArr[0];
    },
  },
  computed: {
    isCopy() {
      if (this.$route.query.copy) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    addRow(index) {
      this.data.valueData.point.push({});
      this.addDownTable();
      this.$forceUpdate();
    },
    delRow(index) {
      this.data.valueData.point.splice(index, 1);
      this.addDownTable();
      this.$forceUpdate();
    },
    addDownTable() {
      let head = [];
      let foot = [];
      this.jsonString.forEach((item, index) => {
        if (item.to === "curve_head") {
          head.push(...item.data.valueData.point);
        } else if (item.to === "curve_foot") {
          foot.push(...item.data.valueData.point);
          item.data.valueData.point = [];
        } else if (item.to === "curve_cbynd") {
          item.data.valueData.point = [];
        }
      });
      let data = head.map((item, index) => {
        return {
          id: item.id,
          materialName: item.materialName,
          Dosage: foot[index] && foot[index].Dosage,
          standardValue: item.standardValue,
          constantVolume: foot[index] && foot[index].constantVolume,
          concentration: foot[index] && foot[index].concentration,
          count: foot[index] && foot[index].count,
          numbering: foot[index] && foot[index].numbering,
          validityPeriod: foot[index] && foot[index].validityPeriod,
          noUse: true,
        };
      });
      data.forEach((item, index) => {
        let obj = foot.find((val, num) => item.id === val.id && val.noUse);
        if (obj) {
          item = obj;
        }
      });
      let footFilter = foot.filter((item, index) => !item.noUse);
      this.jsonString.find(
        (item, index) => item.to === "curve_foot"
      ).data.valueData.point = [...data, ...footFilter];
      this.jsonString.find(
        (item, index) => item.to === "curve_cbynd"
      ).data.valueData.point = [...data, ...footFilter];
      bus.$emit("reset");
    },
    getMaterialSel() {
      queryAllMaterial().then((res) => {
        if (res.success) {
          this.materialList = res.datas;
        } else {
          this.$notify({
            type: "warning",
            message: res.msg,
          });
        }
      });
    },
    returnVal(index, item) {
      let data = this.jsonString
        .filter((item) => item.to == "curve_head")
        .map((item) => item.data.valueData.point)
        .flat()
        .map((item) => item.id);
      if (data.includes(item.id)) {
        this.$message.warning("不可重复勾选");
        let point = JSON.parse(JSON.stringify(this.data.valueData.point));
        this.data.valueData.point = this.$utils.removeArrRepeat(point, "id");
        this.$forceUpdate();
        return;
      }

      this.data.valueData.point[index] = JSON.myParse(JSON.stringify(item));
      this.addDownTable();
      this.$forceUpdate();
    },
  },
  created() {
    this.getMaterialSel();
  },
  mounted() {},
};
</script>

<style scoped>
</style>
