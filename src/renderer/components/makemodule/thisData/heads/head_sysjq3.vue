<template>
  <div id="head_1" class="_normalHeight_">
        <div :class="{eventCover:true}"></div>
    <div class="___head_titleBox">{{data.unit}}<br>{{data.title}}</div>
    <div class="___head_sampleNumberBox">&nbsp;&nbsp;项目编号 : {{data.projectNum}}</div>
    <div class="head_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>样品名称11</span>
        </div>
        <divModel readonly v-model="data.valueData.sysTestingTime" style="width: 910px; left:190px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>收样日期</span>
        </div>
        <divModel v-model="data.valueData.labPickSampleTime" style="width: 910px; left:190px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>检测项目</span>
        </div>
        <divModel v-model="data.valueData.sysTestingTime" style="width: 910px; left:190px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>检测依据</span>
        </div>
        <divModel v-model="data.valueData.sysTestingTime" style="width: 910px; left:190px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>样品处理</span>
        </div>
        <divModel v-model="data.valueData.sysTestingTime" style="width: 910px; left:190px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>计算公式</span>
        </div>
        <divModel v-model="data.valueData.sysTestingTime" style="width: 910px; left:190px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>检出限</span>
        </div>
        <divModel v-model="data.valueData.sysTestingTime" style="width: 910px; left:190px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom">
          <div class="boxs block head_1_title Full" style="width:190px;">
            <span class="heightCenter3">标准物质</span>
          </div>
          <div class="block ___relative" style="width:350px;left:190px;">
            <div style="width: 910px;">
              <div style="width: 200px;" class="tc borderRight">
                <span>标准物质编号</span>
              </div>
              <div class="___relative borderBottom" style="z-index:200;">
                <divModel v-model="data.valueData.sysTestingTime" style="width: 610px; left:200px;" class="moduleInput Full hide focusBg"></divModel>
              </div>
              <div style="width: 910px;" class="___relative borderBottom borderRight">
                <div style="width: 200px;" class="tc borderRight">
                  <span>标准实验室编号</span>
                </div>
                <divModel v-model="data.valueData.sysTestingTime" style="width: 300px; left:200px;" class="moduleInput Full hide focusBg borderRight"></divModel>
                <div style="width: 150px;left:500px;" class="Full tc borderRight">
                  <span>有效期</span>
                </div>
                <divModel v-model="data.valueData.sysTestingTime" style="width: 260px; left:650px;" class="moduleInput Full hide focusBg"></divModel>
              </div>
              <div style="width: 910px;" class="___relative borderRight">
                <div style="width: 200px;" class="tc borderRight">
                  <span>标准实验室编号</span>
                </div>
                <divModel v-model="data.valueData.sysTestingTime" style="width: 300px; left:200px;" class="moduleInput Full hide focusBg borderRight"></divModel>
                <div style="width: 150px;left:500px; " class="Full tc borderRight">
                  <span>有效期</span>
                </div>
                <divModel v-model="data.valueData.sysTestingTime" style="width: 260px; left:650px;" class="moduleInput Full hide focusBg"></divModel>
              </div>
            </div>
          </div>
      </div>
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:190px;">
          <span>回归方程</span>
        </div>
        <divModel v-model="data.valueData.sysTestingTime" style="width: 410px; left:190px;" class="moduleInput Full hide focusBg borderRight"></divModel>
        <div class="boxs block Full head_1_title" style="width:201px; left: 600px;">
          <span>相关系数</span>
        </div>
        <divModel v-model="data.valueData.sysTestingTime" style="width: 300px; left:801px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative">
          <div class="boxs block head_1_title Full" style="width:190px;">
            <span class="heightCenter3">标准系列</span>
          </div>
          <div class="block ___relative" style="width:350px;left:190px;">
            <div style="width: 910px;">
              <div style="width: 910px;" class="___relative borderBottom">
                <div style="width: 450px;" class="tc borderRight">
                  <span>甲醛</span>
                </div>
                <div style="width: 450px;left:460px;" class="Full tc">
                  <span>响应值</span>
                </div>
              </div>
              <div style="width: 910px;" class="___relative">
                <divModel v-model="data.valueData.sysTestingTime" style="width: 450px;" class="moduleInput hide focusBg borderRight"></divModel>
                <divModel v-model="data.valueData.sysTestingTime" style="width: 460px; left:450px;" class="moduleInput Full hide focusBg"></divModel>
              </div>
            </div>
          </div>
      </div>
    </div>

    <div class="__functionBox" v-if="ipdTemplate!='ipdTemplate'" v-show="!isTemplate">   <!-- ******** 功能模块 ********** -->
      <div class="__functionCover1" v-show="data.height._normal.carried || data.isHead"></div>
      <div class="__functionCover2" v-show="!data.height._normal.carried || data.isHead"></div>
      <div class="__functionCover3" v-show="index_jsonString()==0"></div>
      <div class="__functionCover4" v-show="data.isHead || index_jsonString()==jsonString.length-1"></div>
      <div class="__functionButton1" @click="toHigh"></div>              <!-- 放大行高 -->
      <div class="__functionButton2" @click="toShort"></div>              <!-- 缩小行高 -->
      <div class="__functionButton3" @click="toUpModule"></div>           <!-- 提高一行 -->
      <div class="__functionButton4" @click="toDownModule"></div>         <!-- 下降行高 -->
      <div class="__functionButton5" @click="toDeleteModule"></div>       <!-- 删除模块 -->
    </div>
  </div>
</template>

<script>
  let head_1_oud = [];
  export default {
    data() {
      return {
        index_jsonString: function () {             // 获取当前模块在jsonString中的索引
          let result = this.thisPageIndex;
          for (let i = 0; i < this.pageNumber; i++) {
            result += this.showing[i].length;
          }
          return result;
        },
      }
    },
    props: ['ipdTemplate' , 'mainArr', 'auxiliaryArr', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'headInput'],
    methods: {
      toHigh() {
        this.data.height._normal.carried = true;
        this.data.height._short.carried = false;
        this.watchSign._high += 1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toShort() {
        this.data.height._normal.carried = false;
        this.data.height._short.carried = true;
        this.watchSign._short += 1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toUpModule() {
        let index = this.index_jsonString();
        if (index != 0) {
          _transposition(this.jsonString, index, index - 1);
          this.$emit('update:jsonString');
          this.watchSign._down += 1;
          this.$emit('update:watchSign');
        }
      },
      toDownModule() {
        let index = this.index_jsonString();
        if (index != this.jsonString.length - 1) {
          _transposition(this.jsonString, index, index + 1);
          this.$emit('update:jsonString');
          this.watchSign._down += 1;
          this.$emit('update:watchSign');
        }
      },
      toDeleteModule() {
        let index = this.index_jsonString();
        this.jsonString.splice(index, 1);
        this.$emit('update:jsonString');
        this.watchSign._delete += 1;
        this.$emit('update:watchSign');
      }
    },
    mounted: function () {
      if(this.$route.query.Judge!='ipdTemplate'){
        // _('.__functionBox').choosable();
      }
      var that = this;

    }
  };
</script>

<style lang="less" scoped>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
