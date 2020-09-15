<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr :class="thisPageIndex === 0 ? '' : 'delLine'">
          <td class="___relative tc">
            <span>统计</span>
          </td>
          <td class="___relative tc">
            <span>电场强度E(V/m)</span>
          </td>
          <td class="___relative tc">
            <span>综合场强值Eₛ(V/m)</span>
          </td>
        </tr>
        <tr>
          <td class="___relative tc">
            <span>其他场强值</span>
          </td>
          <td class="___relative tc">
            <div>{{ data.valueData.Other[0] }}</div>
          </td>
          <td class="___relative tc">
            <div>{{ data.valueData.Other[1] }}</div>
          </td>
        </tr>
        <tr>
          <td class="___relative tc">
            <span>总场强值</span>
          </td>
          <td class="___relative tc">
            <div>{{ data.valueData.total[0] }}</div>
          </td>
          <td class="___relative tc">
            <div>{{ data.valueData.total[1] }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
      sampleOption: "",
    };
  },
  watch: {
    dchjbgPoint(){
      this.getElectromagnetismData();
    }
  },
  computed: {
    ...mapState({
      dchjbgPoint: (state) => state.laboratory.dchjbgPoint,
    }),
  },
  props: [
    "ipdTemplate",
    "pageNumber",
    "data",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "task",
    "target",
    "deviceData",
  ],
  filters: {},
  methods: {
    gatThisVal(data) {
      let arr = [
        { title: "其他场强值", key: "Other" },
        { title: "总场强值", key: "total" },
      ];
      arr.forEach((item, index) => {
        let obj = data.find((val, num) => item.title === val.v1);
        if (obj) {
          let average = this.average([obj.v4, obj.v5, obj.v6, obj.v7, obj.v8]);
          this.data.valueData[item.key][0] = average;
          this.data.valueData[item.key][1] = Math.sqrt(average * average);
        }
      });
    },
    getElectromagnetismData() {
      if (this.data.valueData.Judge) {
        this.data.valueData.Judge = false;
        // 方法已经写好data为接口数据
       
        let totalData = this.dchjbgPoint;
        
        let obj = this.jsonString.find(
          (item, index) => item.to === "project_dc_dchjxpclbg"
        );
        if (obj) {
          this.jsonString.forEach((item, index) => {
            if (item.to === "project_dc_dchjxpclbg") {
              item.data.valueData.point = [];
            }
          });
          this.gatThisVal(totalData);
          this.$set(obj.data.valueData, "point", totalData);
          this.$forceUpdate();
          this.$emit('redefinition')
        }
      }
    },
  },
  mounted() {
    
  },
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
.btn2 {
  width: 50px;
  height: 32px;
  line-height: 32px;
  background: gray;
  cursor: pointer;
  user-select: none;
  color: white;
  border-radius: 2px;
}

.red {
  color: red;
}
</style>
