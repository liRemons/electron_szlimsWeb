<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr :class="thisPageIndex === 0 ? '' : 'delLine'">
          <td rowspan="2" style="width: 80px">索引</td>
          <td rowspan="2" style="width: 120px">服务</td>
          <td rowspan="2" style="width: 160px">频段</td>
          <td colspan="5" style="width: 340px">电场强度</td>
        </tr>
        <tr>
          <td>E₁</td>
          <td>E₂</td>
          <td>E₃</td>
          <td>E₄</td>
          <td>E₅</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td>{{ item.v1 }}</td>
          <td>{{ item.v2 }}</td>
          <td>{{ item.v3 }}</td>
          <td style="line-height: 16px">
            {{ item.v4 }}<br>
            {{ item.v9 }}
          </td>
          <td style="line-height: 16px">
            {{ item.v5 }}<br>
            {{ item.v9 }}
          </td>
          <td style="line-height: 16px">
            {{ item.v6 }}<br>
            {{ item.v9 }}
          </td>
          <td style="line-height: 16px">
            {{ item.v7 }}<br>
            {{ item.v9 }}
          </td>
          <td style="line-height: 16px">
            {{ item.v8 }}<br>
            {{ item.v9 }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
      sampleOption: "",
    };
  },
  computed: {},
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
  mounted() {
    this.$nextTick(() => {
      this.$emit("redefinition");
    });
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
