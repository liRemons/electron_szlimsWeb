<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative mt20">
      <div :class="{ eventCover: !ableInput ||purposeDetection=='状态检测'}"></div>
      <table class="myTable">
        <tr class="tl">
          <td colspan="5">
            <span class="ml10">影像接收器入射屏前空气比释动能率</span>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr class="tl">
          <td colspan="5">
            <span class="ml10">验收&状态：非透视荧光屏设备：见下表：</span>
          </td>
        </tr>
      </table>

      <table class="myTable">
        <tr>
          <td style="width: 210px">影像增强器入射屏直径/mm</td>
          <td>350</td>
          <td>310</td>
          <td>230</td>
          <td>150</td>
        </tr>
        <tr>
          <td style="width: 210px">平板探测器长边尺寸/mm</td>
          <td>400</td>
          <td>300</td>
          <td>250</td>
          <td>200</td>
        </tr>
        <tr>
          <td style="width: 210px">入射屏前空气比释动能率(μGy/min)</td>
          <td>≤30.0</td>
          <td>≤48.0</td>
          <td>≤60.0</td>
          <td>≤134.0</td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="5"
            style="padding-left: 10px; line-height: 24px; text-indent: 25px"
          >
            <span
              >在X射线管出线口放1.5mm铜板，照射野设为最大，影像接收器距焦点最近（影像接收器位于床上时则调节至<br />床面上方30cm），探测器紧贴在影像接收器入射面，在自动亮度控制条件下测量空气比释动能率。如无自动亮度<br />控制功能，则在70kV，1mA条件下测量。如果设备有滤线栅，则检测应该应除以2。<br />计算公式：检测结果=A×f×k，有滤线栅时A=0.5，无滤线栅时A=1</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span>探测器设备类型</span>
          </td>
          <td colspan="2">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="'0'"
                :transmitText="data.valueData.deviceType"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="['平板探测器', '影像增强器']"
                :Obj="''"
              >
              </selectModel>
            </div>
            <div v-else>{{ data.valueData.deviceType }}</div>
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
    };
  },
  computed: {},
  props: [
    "ipdTemplate",
    "pageNumber",
    "purposeDetection",
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
    assignment(value) {
      this.showing.forEach((item, index) => {
        item.forEach((val, num) => {
          if (val.to === "project_ts_tssjzrstbkqbsdnldxz2") {
            val.data.valueData.deviceType = value;
          }
        });
      });
      console.log(this.showing);
    },
    returnVal(val, name, index) {
      this.data.valueData.deviceType = val;
      // this.assignment(this.data.valueData.deviceType)
    },
  },
  mounted() {
    
  },
};
</script>

<style>
</style>
