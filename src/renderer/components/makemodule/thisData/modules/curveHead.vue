<template>
  <div class="___relative">
    <div id="Layer1" class="eventCover" v-if="isCopy"></div>
    <table class="tb" style="width: 1192px" border="1">
      <tr style="line-height: 30px;">
        <td>标准物质</td>
        <td>标准值</td>
        <td>国标号(或批号)</td>
        <td>实验室编号</td>
        <td>生产日期</td>
        <td>失效效期</td>
        <td style="width: 104px;">基体</td>
        <td class="hiddenBorder" style="width: 50px;"></td>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        :key="Math.random()"
        style="height: 32px;"
      >
        <td width="110">
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
        <td width="110">
          <div>{{ item.standardValue }}</div>
        </td>
        <td width="110">
          <div>{{ item.batchNum }}</div>
        </td>
        <td width="110">
          <div>{{ item.laboratoryNum }}</div>
        </td>
        <td width="210">
          <div>{{ item.productionTime | getTime }}</div>
        </td>
        <td width="210">
          <div>{{ item.invalidTime | getTime }}</div>
        </td>
        <td width="210">
          <div>{{ item.matrix }}</div>
        </td>
        <td class="hiddenBorder" v-if="!isCopy">
          <div class="___relative" style="width: 100px; height: 30px;">
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
import { queryAllMaterial } from "@/api/laboratory";

export default {
  name: "curveHead",
  props: ["data", "target", "jsonString"],
  data() {
    return {
      materialList: [],
      canEdit: false
    };
  },
  filters: {
    getTime(val) {
      if (!val) return;
      let timeArr = val.split(" ");
      return timeArr[0];
    }
  },
  computed: {
    isCopy() {
      if (this.$route.query.copy) {
        return true;
      } else {
        return false;
      }
    }
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
        }
      });
      // console.log(head,'head')
      let data = head.map((item, index) => {
        return {
          id: item.id,
          materialName: item.materialName,
          Dosage: foot[index].Dosage,
          constantVolume: foot[index].constantVolume,
          concentration: foot[index].concentration,
          count: foot[index].count,
          numbering: foot[index].numbering,
          validityPeriod: foot[index].validityPeriod,
          noUse: true
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
      bus.$emit("reset");
    },
    getMaterialSel() {
      queryAllMaterial().then(res => {
        if (res.success) {
          this.materialList = res.datas;
        } else {
          this.$notify({
            type: "warning",
            message: res.msg
          });
        }
      });
    },
    returnVal(index, item) {
      this.data.valueData.point[index] = JSON.myParse(JSON.stringify(item));
      this.addDownTable();
      this.$forceUpdate();
    }
  },
  created() {
    this.getMaterialSel();
  },
  mounted() {}
};
</script>

<style scoped>
</style>
