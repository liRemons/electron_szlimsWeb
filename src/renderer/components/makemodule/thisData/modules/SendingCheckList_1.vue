<template>
  <div class="page" style="margin:0 auto;padding-top:1px;">
    <div class="___head_titleBox" style="margin-top:20px;">
      深圳市瑞达检测技术有限公司
      <br>样品送检单（1）
    </div>
    <div class="SendingCheckList">
      <div style="margin-top:10px;height:16px;">
        <span class="fl">送检部门：</span>
        <span class="fr">送样日期: 年 月 日</span>
      </div>
      <div class="head_1_tableBox _normalHeight_ ___relative" style="margin-top:10px;">
        <div class="___relative borderBottom">
          <div class="borderRight tc" style="width: 100px;">
            <span>样品编号</span>
          </div>
          <div class="borderRight tc Full" style="width: 145px;left:100px;">
            <span>样品名称/检测领域</span>
          </div>
          <div class="borderRight tc Full" style="width: 250px;left:245px;">
            <span>检测项目</span>
          </div>
          <div class="borderRight tc Full" style="width: 110px;left:495px;line-height: 16px;">
            采样量
            <br>暴露时间
          </div>
          <div class="borderRight tc Full" style="width: 255px;left:605px;">
            <span>检测依据</span>
          </div>
          <div class="borderRight tc Full" style="width: 100px;left:860px;">
            <span>数量</span>
          </div>
          <div class="tc Full" style="width: 150px;right:0;">
            <span>备注</span>
          </div>
        </div>
        <div v-for="(item,index) in samplearr" :class="index!=samplearr.length-1 ? 'borderBottom':''" class="___relative">
          <div class="borderRight tc" style="width: 100px;">
            <span>{{item.sampleNum}}</span>&nbsp;
          </div>
          <div class="borderRight tc Full" style="width: 145px;left:100px;">
            <span>{{item.sampleName}}</span>
          </div>
          <div class="borderRight tc Full" style="width: 250px;left:245px;">
            <span>{{item.testItems}}</span>
          </div>
          <div class="borderRight tc Full" style="width: 110px;left:495px;">
            <span>{{item.samplingTime}}</span>
          </div>
          <div class="borderRight tc Full" style="width: 255px;left:605px;">
            <span>{{item.sampleNum}}</span>
          </div>
          <div class="borderRight tc Full" style="width: 100px;left:860px;">
            <span>{{item.sampleQuantity}}</span>
          </div>
          <div class="tc Full" style="width: 150px;right:0;">
            <span>{{item.remarks}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    samplearr: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      list: []
    };
  },
  filters: {},
  methods: {},
  components: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
@import "../../../../assets/css/Css.css";
</style>
