<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr :class="thisPageIndex === 0 ? '' : 'delLine'">
          <td class="___relative tc" rowspan="2" style="width: 80px">
            <span>索引</span>
          </td>
          <td class="___relative tc" rowspan="2" style="width: 120px">
            <span>服务</span>
          </td>
          <td class="___relative tc" rowspan="2" style="width: 160px">
            <span>频段</span>
          </td>
          <td class="___relative tc" colspan="5" style="width: 340px">
            <span>电场强度</span>
          </td>
        </tr>
        <tr>
          <td class="___relative tc">
            <span>E₁</span>
          </td>
          <td class="___relative tc">
            <span>E₂</span>
          </td>
          <td class="___relative tc">
            <span>E₃</span>
          </td>
          <td class="___relative tc">
            <span>E₄</span>
          </td>
          <td class="___relative tc">
            <span>E₅</span>
          </td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td class="___relative tc">
            <span>{{ item.v1 }}</span>
          </td>
          <td class="___relative tc">
            <span>{{ item.v2 }}</span>
          </td>
          <td class="___relative tc">
            <span>{{ item.v3 }}</span>
          </td>
          <td class="___relative tc" style="line-height: 16px">
            <div class="___relative tc" style="height: 16px">{{ item.v4 }}</div>
            <div class="___relative tc" style="height: 16px">{{ item.v9 }}</div>
          </td>
          <td class="___relative tc" style="line-height: 16px">
            <div class="___relative tc" style="height: 16px">{{ item.v5 }}</div>
            <div class="___relative tc" style="height: 16px">{{ item.v9 }}</div>
          </td>
          <td class="___relative tc" style="line-height: 16px">
            <div class="___relative tc" style="height: 16px">{{ item.v6 }}</div>
            <div class="___relative tc" style="height: 16px">{{ item.v9 }}</div>
          </td>
          <td class="___relative tc" style="line-height: 16px">
            <div class="___relative tc" style="height: 16px">{{ item.v7 }}</div>
            <div class="___relative tc" style="height: 16px">{{ item.v9 }}</div>
          </td>
          <td class="___relative tc" style="line-height: 16px">
            <div class="___relative tc" style="height: 16px">{{ item.v8 }}</div>
            <div class="___relative tc" style="height: 16px">{{ item.v9 }}</div>
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
   this.$nextTick(()=>{
		 this.$emit("redefinition");
	 })
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
