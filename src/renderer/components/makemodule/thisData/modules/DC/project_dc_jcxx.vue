<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <div class="___relative tc mt20">
        <p style="font-size: 24px">深圳市瑞达检测技术有限公司</p>
        <p style="font-size: 24px">检测原始记录</p>
      </div>
      <p>{{ data.valueData.correct }}:</p>
      <table class="myTable">
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>检测对象名称</span>
          </td>
          <td class="___relative tc" style="width: 560px">
            <myInput
              style="text-align: center"
              v-model="data.valueData.detectionObjName"
              :defaultValue="data.valueData.detectionObjName"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>检测时间</span>
          </td>
          <td class="___relative tc" style="width: 560px">
            <myInput
              style="text-align: center"
              v-model="data.valueData.detectionTime"
              :defaultValue="data.valueData.detectionTime"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>检测编号</span>
          </td>
          <td
            class="___relative tc"
            style="width: 560px"
            @click="generateSampleNum(data.valueData)"
          >
            <span>{{
              data.valueData.sampleNum + "" + data.valueData.sampleNumIndex
            }}</span>
          </td>
        </tr>
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>检测对象地址</span>
          </td>
          <td class="___relative tc" style="width: 560px">
            <myInput
              style="text-align: center"
              v-model="data.valueData.detectionObjAddress"
              :defaultValue="data.valueData.detectionObjAddress"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>检测地址</span>
          </td>
          <td class="___relative tc" style="width: 560px">
            <myInput
              style="text-align: center"
              v-model="data.valueData.detectionAddress"
              :defaultValue="data.valueData.detectionAddress"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>检测依据</span>
          </td>
          <td class="___relative tc" style="width: 560px">
            <myInput
              style="text-align: center"
              v-model="data.valueData.DetectionBasis"
              :defaultValue="data.valueData.DetectionBasis"
            ></myInput>
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
  methods: {
    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item,
        this.data.valueData.multipleId
      );
    },
  },
  mounted() {
		// console.log(this.data)
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
</style>
