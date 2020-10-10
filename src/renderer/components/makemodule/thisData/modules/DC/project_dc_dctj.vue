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
export default {
  data() {
    return {};
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
  methods: {},
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
