<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative mt20">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr class="tl">
          <td colspan="5">
            <span class="ml10">透视受检者入射体表空气比释动能率典型值</span>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr class="tl">
          <td colspan="5">
            <span
              >验收&状态：≤50@透视荧光屏设备；验收&状态&稳定性：≤25@非透视荧光屏设备。</span
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
            style="padding-left: 10px; line-height: 24px; text-indent: 25px"
          >
            <span
              >将尺寸为30cm×30cm×20cm的水模放置在探测器与影像接收器之间，调节至影像接收器最大照射野尺寸下<br />进行检测，检测条件见下表，计算公式：检测结果=(∑k)/3×f</span
            >
          </td>
        </tr>
        <tr>
          <td>透视设备类型</td>
          <td>探测器位置</td>
          <td>影像接收器位置</td>
          <td>有AERC的透视条件</td>
          <td>无AERC的透视条件</td>
        </tr>
        <tr>
          <td>普通荧光屏透视</td>
          <td>床上</td>
          <td>/</td>
          <td rowspan="4">AERC，水模</td>
          <td>70kV，3mA，水模</td>
        </tr>
        <tr>
          <td>床上管</td>
          <td>床上30cm</td>
          <td>距焦点最近</td>
          <td rowspan="3">70kV，1mA，水模</td>
        </tr>
        <tr>
          <td>床下管</td>
          <td>床上</td>
          <td>距床面30cm</td>
        </tr>
        <tr>
          <td>C形臂</td>
          <td>影像接收器前30cm</td>
          <td>距焦点最近</td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span>所有影像增强输入屏视野尺寸（mm）</span>
          </td>
          <td colspan="2">
            <myInput
              @change.native="changeNum()"
              @focus.native="ready()"
              style="text-align: center"
              v-model="data.valueData.size"
              :defaultValue="data.valueData.size"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <span>X射线透视设备类型</span>
          </td>
          <td colspan="2">
            <div v-if="target == 0">
              <selectModel
                v-if="data.valueData.isEdit"
                @returnVal="returnVal"
                :Judge="true"
                :special="'0'"
                :transmitText="data.valueData.deviceType"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="[
                  '影像增强器床上管',
                  'C形臂',
                  '影像增强器床下管',
                  '普通荧光屏透视',
                  '自定义',
                ]"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="data.valueData.deviceType"
                :defaultValue="data.valueData.deviceType"
              ></myInput>
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
    "target",
    "deviceData",
  ],
  filters: {},
  methods: {
    ready() {
      if (this.data.valueData.sizeJudge > 0) {
        this.$notify({
          title: "错误",
          type: "error",
          message: "尺寸已输入，如果修改可能会造成数据丢失，请谨慎操作！",
        });
      }
    },
    changeNum() {
      let arr = [];
      this.data.valueData.size.split(",").forEach((item, index) => {
        arr.push(...item.split("，"));
      });
      console.log(arr);
      this.data.valueData.sizeJudge = arr.length;
      this.$store.dispatch("actionsSizeList", arr.toString());
    },
    assignment(value) {
      this.showing.forEach((item, index) => {
        item.forEach((val, num) => {
          if (val.to === "project_ts_tssjzrstbkqbsdnldxz2") {
            val.data.valueData.deviceType = value;
          }
        });
      });
    },
    returnVal(val, name, index) {
      this.data.valueData.deviceType = val;
      if (val == "自定义") {
        this.data.valueData.deviceType = "";
        this.data.valueData.isEdit = false;
      }

      // this.assignment(this.data.valueData.deviceType)
    },
  },
  mounted() {
    if (this.data.valueData.isEdit == undefined) {
      this.data.valueData.isEdit = true;
    }
  },
};
</script>

<style>
</style>
