// 诊断床定位精度
<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable" style="margin-bottom: 10px;">
        <tr class="tl">
          <td colspan="5">
            <span class="ml10">{{
              data.valueData.testProjectChineseName
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: left;padding-left: 10px;">
            <span>验收&状态&稳定性：±2mm内。</span>
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
            style="padding-left:10px;line-height: 20px;text-indent: 2em;"
          >
            <span style="white-space: normal;"
              >将直尺靠近诊断床的移动床面固定，使尺子与床面的运动方向平行，然后在床面上作一个能够指示直尺刻度的标记指针（或者直接利用内定位光），保证检测时床面负重70kg左右，分别对诊断床给出“进300mm”和“退300mm”的指令，记录进、退起始点和终止点在直尺上的示值，测出定位误差和归位误差。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td>类型</td>
          <td>诊断床指令</td>
          <td>直尺起始点示值/mm</td>
          <td>直尺终止点示值/mm</td>
          <td>误差/mm</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point" :key="index">
          <td>{{ item.type }}</td>
          <td>{{ item.instruct }}</td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.startValue"
              @change.native="changeNum(item)"
              :defaultValue="item.startValue"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.endValue"
              @change.native="changeNum(item)"
              :defaultValue="item.endValue"
            ></myInput>
          </td>
          <td>{{ item.errorValue }}</td>
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
  methods: {
    returnVal(val, name, index) {},
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.data.valueData.deviceType = val;
      if (val === "") {
        this.showInput = false;
      }
      this.$forceUpdate();
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeNum(item) {
      if (this.isNumber(item.endValue) && this.isNumber(item.startValue)) {
        item.errorValue = (
          Math.abs(item.endValue - item.startValue) - 300
        ).toFixed46(1, false, true);
      } else {
        item.errorValue = "";
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>
