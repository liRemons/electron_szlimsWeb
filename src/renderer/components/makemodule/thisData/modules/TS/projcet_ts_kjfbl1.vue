<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative mt20">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr class="tl">
          <td colspan="5">
            <span class="ml10">空间分辨力</span>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="5"
            style="padding-left:10px;line-height: 24px;text-indent:25px;"
          >
            <span
              >验收：≥0.8@透视荧光屏设备，影像增强器透视设备：≥0.8@350mm(15in)，≥1.0@310mm(12in)，<br />≥1.2@230mm(9in)，≥1.4@150mm(6in)；状态：≥0.6；稳定性：基线值±20%内。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="5"
            style="padding-left:10px;line-height: 24px;text-indent:25px;"
          >
            <span
              >对普通荧光屏透视设备，将测试卡紧贴在荧光屏的入射面，以适当条件（如70kV，3mA）进行透视，从荧光<br />屏上观察并记录下能分辨的最大线对数。对于非普通荧光屏透视设备，检测量应将线对卡紧贴在影像接收器的入射<br />屏或放在诊断床上，使显示器中的测试卡的线条影像与扫描线的方向成45°夹角，以自动曝光控制条件或临床常用<br />透视条件进行透视，如果出现影像饱和现象（影像全白），可以在线对卡上放一块20mm厚铝板。从显示器上观察<br />并记下能分辨的最大线对数。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">检测结果</span>
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
      showInput: false
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
    "deviceData"
  ],
  filters: {},
  methods: {},
  mounted() {}
};
</script>

<style>
</style>
