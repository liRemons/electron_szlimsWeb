<template>
  <table class="myTable" border="1">
    <tr>
      <td>样品编号</td>
      <td colspan="6">
        {{data.valueData.sampleNum}}
      </td>
    </tr>
    <tr>
      <td>样品名称</td>
      <td colspan="6">
        {{data.valueData.sampleName}}
      </td>
    </tr>
    <tr>
      <td>收样日期</td>
      <td colspan="6">
        {{data.valueData.labPickSampleTime}}
      </td>
    </tr>
    <tr>
      <td>检测项目</td>
      <td colspan="6">
        {{data.valueData.testProjectName}}
      </td>
    </tr>
    <tr>
      <td>检测依据</td>
      <td colspan="6">
        {{data.valueData.standardName}}
      </td>
    </tr>
    <tr>
      <td>样品处理</td>
      <td colspan="6">
        {{data.valueData.sampleHandle}}
      </td>
    </tr>
    <tr>
      <td style="height: 65px">计算公式</td>
      <td colspan="6">
        <img :src="data.valueData.formulas" alt="">
      </td>
    </tr>
    <tr>
      <td>检出限</td>
      <td colspan="6">
        {{data.valueData.detectionLimit}}{{data.valueData.detectionLimitPieces}}
      </td>
    </tr>
  </table>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    components:{
    },
    props: ['ipdTemplate' , 'mainArr', 'auxiliaryArr', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'headInput'],
    methods: {

    },
    mounted: function () {

    }
  };
</script>

<style lang="less" scoped>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
