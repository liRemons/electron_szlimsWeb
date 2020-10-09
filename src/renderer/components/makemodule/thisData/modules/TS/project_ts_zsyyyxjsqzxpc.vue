<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative mt20">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr class="tl">
          <td colspan="3">
            <span class="ml10">照射野与影像接收器中心偏差</span>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr class="tl">
          <td colspan="3" style="padding-left: 10px; line-height: 16px">
            <span>验收：≤2%SID@非透视荧光屏设备。</span>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="3"
            style="padding-left: 10px; line-height: 24px; text-indent: 25px"
          >
            <span
              >调节焦点至影像接收器之间距离最近，照射野设置为最大，将准直测试板放置在影像接收器上使影像接收器<br />中心与测试板中心对准，在透视条件下从显示器中观察并记录照射野中心到影像接收器中心距离，记录焦点至<br />影像接收器之间的距离SID，计算公式为：中心偏差=照射野中心到影像接收器中心距离/SID×100%。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td>照射野中心到影像接收器中心距离(cm)</td>
          <td>SID(cm)</td>
          <td>中心偏差(%)</td>
        </tr>
        <tr>
          <td>
            <myInput
						v-if="purposeDetection !== '状态检测'"
              @change.native="changeNum()"
              style="text-align: center"
              v-model="data.valueData.view"
              :defaultValue="data.valueData.view"
            ></myInput>
          </td>
          <td>
            <myInput
						v-if="purposeDetection !== '状态检测'"
              @change.native="changeNum()"
              style="text-align: center"
              v-model="data.valueData.SID"
              :defaultValue="data.valueData.SID"
            ></myInput>
          </td>
          <td>
            <span>{{ data.valueData.deviation }}</span>
          </td>
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
		"purposeDetection",
    "target",
    "deviceData",
  ],
  filters: {},
  methods: {
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeNum() {
      let view = this.data.valueData.view;
      let SID = this.data.valueData.SID;
      if (this.isNumber(view) && this.isNumber(SID)) {
        this.data.valueData.deviation = ((view * 100) / SID).toFixed46(1);
      } else {
        this.data.valueData.deviation = "";
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>
