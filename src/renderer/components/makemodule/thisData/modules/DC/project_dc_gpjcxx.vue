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
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">委托单位地址</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">委托日期</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">联系人</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">联系电话</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">受检单位</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">检测地址</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">检测时间</td>
        <td colspan="6"></td>
      </tr>
      <tr>
        <td colspan="2">检测编号</td>
        <td colspan="6"></td>
      </tr>
      <tr style="height:64px">
        <td colspan="2">检测依据</td>
        <td colspan="6" style="word-wrap:break-word !important;white-space: normal;line-height:20px"></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["ableInput", "data"],
  mounted() {
    console.log(this.data)
  },
};
</script>
