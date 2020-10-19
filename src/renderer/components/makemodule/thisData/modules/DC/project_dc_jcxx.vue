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
          <td>检测对象名称</td>
          <td colspan="4">
            <myInput
              style="text-align: center"
              v-model="data.valueData.monitorObjectName"
              :defaultValue="data.valueData.monitorObjectName"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td>检测时间</td>
          <td colspan="4">
            {{ data.valueData.detectionTime }} - {{ data.valueData.endTime }}
          </td>
        </tr>
        <!-- <tr>
          <td>检测编号</td>
          <td colspan="4" @click="generateSampleNum(data.valueData)">
            <span>{{
              data.valueData.sampleNum + "" + data.valueData.sampleNumIndex
            }}</span>
          </td>
        </tr> -->
        <tr>
          <td>检测对象地址</td>
          <td colspan="4">{{ data.valueData.monitorObjectAddress }}</td>
        </tr>
        <tr>
          <td>检测地址</td>
          <td colspan="4">
            <myInput
              style="text-align: center"
              v-model="data.valueData.clientUnitAddress"
              :defaultValue="data.valueData.clientUnitAddress"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td>检测依据</td>
          <td colspan="4" style="word-wrap:break-word !important;white-space: normal;line-height:20px">
            {{ data.valueData.standard }}
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
  watch: {
    "data.valueData.endTime": function () {
      this.target == 0
        ? (this.data.valueData.endTime = this.dateCH(
            this.data.valueData.endTime
          ))
        : "";
    },
  },
  methods: {
    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item.point,
        this.data.valueData.multipleId
      );
    },
    dateCH(val) {
      let time;
      if (val) {
        time = this.$utils.dateFormat(
          new Date(val).getTime(),
          "yyyy年MM月dd日 HH时mm分ss秒"
        );
        time = time.substring(0, time.length - 3);
      } else {
        time = "";
      }

      return time;
    },
  },
  mounted() {
    
    if (this.target == 0 && !this.data.valueData.endTime) {
      this.data.valueData.detectionTime = this.dateCH(
        this.data.valueData.detectionTime
      );
      this.data.valueData.endTime = this.dateCH(this.data.valueData.endTime);
    }
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
