<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative mt20">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr class="tl">
          <td colspan="5">
            <span class="ml10">透视受检者入射体表空气比释动能率最大值</span>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr class="tl">
          <td colspan="5">
            <span>验收：≤100 mGy/min。</span>
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
              >在透视受检者入射体表空气比释动能率典型值的检测条件下，在水模体上加一块2mm厚的铅板（或关闭影像<br />接收器），调节照射野小于铅板的尺寸，在最大剂量透视模式下测试透视受检者入射体表空气比释动能率最大值。<br />计算公式：检测结果=(∑k)/3×f</span
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
                @returnVal="returnVal"
                v-if="data.valueData.isEdit"
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
      this.data.valueData.sizeJudge = arr.length;
      this.$store.dispatch("actionsSizeList2", arr.toString());
    },
    assignment(value) {
      this.showing.forEach((item, index) => {
        item.forEach((val, num) => {
          if (val.to === "project_ts_tssjzrstbkqbsdnlzdz2") {
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
