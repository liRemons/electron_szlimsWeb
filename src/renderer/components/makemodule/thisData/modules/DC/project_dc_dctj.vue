<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr :class="thisPageIndex === 0 ? '' : 'delLine'">
          <td>统计</td>
          <td>电场强度E(V/m)</td>
          <td>综合场强值Eₛ(V/m)</td>
        </tr>
        <tr>
          <td>其他场强值</td>
          <td>{{ data.valueData.Other[0] }}</td>
          <td>{{ data.valueData.Other[1] }}</td>
        </tr>
        <tr>
          <td>总场强值</td>
          <td>{{ data.valueData.total[0] }}</td>
          <td>{{ data.valueData.total[1] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      dchjbgPoint: (state) => state.laboratory.dchjbgPoint,
    }),
  },
  watch: {
    dchjbgPoint() {
      this.createPoint();
    },
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
    //  let arr = [
    //     { title: "其他场强值", key: "Other" },
    //     { title: "总场强值", key: "total" },
    //   ];
    //   arr.forEach((item, index) => {
    //     let obj = data.find((val, num) => item.title === val.v1);
    //     if (obj) {
    //       let average = this.average([obj.v4, obj.v5, obj.v6, obj.v7, obj.v8]);
    //       this.data.valueData[item.key][0] = average;
    //       this.data.valueData[item.key][1] = Math.sqrt(average * average);
    //     }
    //   });
    createPoint() {
      let nowIndex = [],
        data;
      this.jsonString.forEach((item, index) => {
        if (
          item.to === "project_dc_dchjxpclbg" &&
          item.data.valueData.pointId === this.dchjbgPoint.pointId
        ) {
          nowIndex.push(index);
          data = item;
        }
      });
      if (nowIndex.length === 1) {
        this.jsonString.splice(nowIndex[0], 1);
      } else {
        let count = Math.max(...nowIndex) - Math.min(...nowIndex);
        this.jsonString.splice(nowIndex[0], count + 1);
      }
      this.jsonString.splice(nowIndex[0], 0, data);
      this.jsonString.forEach((item) => {
        if (
          item.to === "project_dc_dchjxpclbg" &&
          item.data.valueData.pointId === this.dchjbgPoint.pointId
        ) {
          item.data.valueData.point = this.dchjbgPoint.point;
        }
      });
      this.data.valueData.pointId === this.dchjbgPoint.pointId &&
        this.calculate(this.dchjbgPoint.point);
      this.$emit("redefinition");
    },
    calculate(data) {
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
  },
  mounted() {},
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
