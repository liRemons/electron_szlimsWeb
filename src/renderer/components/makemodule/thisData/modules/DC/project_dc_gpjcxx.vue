<template>
  <div>
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="___relative tc mt20">
      <p style="font-size: 24px">深圳市瑞达检测技术有限公司</p>
      <p style="font-size: 24px">工频电磁场现场检测原始记录</p>
    </div>
    <p>{{ data.valueData.correct }}:</p>
    <table class="myTable">
      <tr>
        <td colspan="2">委托单位</td>
        <td colspan="6">{{ valueData.clientUnitName }}</td>
      </tr>
      <tr>
        <td colspan="2">委托单位地址</td>
        <td colspan="6">{{ valueData.clientUnitAddress }}</td>
      </tr>
      <tr>
        <td colspan="2">委托日期</td>
        <td colspan="6">{{ valueData.entrustTime }}</td>
      </tr>
      <tr>
        <td colspan="2">联系人</td>
        <td colspan="6">{{ valueData.clientUnitContact }}</td>
      </tr>
      <tr>
        <td colspan="2">联系电话</td>
        <td colspan="6">{{ valueData.clientUnitPhone }}</td>
      </tr>
      <tr>
        <td colspan="2">受检单位</td>
        <td colspan="6">{{ valueData.monitorObjectName }}</td>
      </tr>
      <tr>
        <td colspan="2">检测地址</td>
        <td colspan="6">{{ valueData.monitorObjectAddress }}</td>
      </tr>
      <tr>
        <td colspan="2">检测时间</td>
        <td colspan="6">
          {{valueData.detectionTime }} - {{valueData.endTime }}
        </td>
      </tr>
      <tr style="height:64px">
        <td colspan="2">检测依据</td>
        <td
          colspan="6"
          style="word-wrap:break-word !important;white-space: normal;line-height:20px"
        >
          {{ valueData.standard }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["ableInput", "data",'target'],
  data() {
    return {
      valueData: {},
    };
  },
  watch: {
    "data.valueData.endTime": function() {
      this.target == 0
        ? (this.data.valueData.endTime = this.dateCH(
            this.data.valueData.endTime
          ))
        : "";
    },
  },
  methods: {
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
    this.valueData = this.data.valueData;
  },
};
</script>
