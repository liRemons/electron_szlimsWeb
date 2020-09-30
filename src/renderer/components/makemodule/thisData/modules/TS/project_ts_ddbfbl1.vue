<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative mt20">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr class="tl">
          <td colspan="5">
            <span class="ml10">低对比分辨力</span>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="5" style="padding-left: 10px; line-height: 16px">
            <span>验收：2%，≤7mm；状态&稳定性：4%，≤7mm。</span>
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
            style="padding-left: 10px; line-height: 24px; text-indent: 25px"
          >
            <span
              >将低对比度分辨力测试板在X射线管与影像接收器之间，尽量靠近影像接收器。调整显示器的亮度对比度，<br />使测试板的影像最佳，记录最小的孔直径，检测时照射野应设置为10cm×10cm，在状态检测时如果不能分辨直径<br />为7mm的孔时，可使用一块厚铝板加带孔的薄铝板再重复测量一次，这时圆孔与其周围的对比度从2%变为4%。</span
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
      showInput: false,
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
  mounted() {},
};
</script>

<style>
</style>
