<template>
  <div id="head_1" class="_normalHeight_">
        <div :class="{eventCover:!headInput}"></div>
    <div class="___head_titleBox">{{data.unit}}<br>{{data.title}}</div>
    <div class="___head_sampleNumberBox">&nbsp;&nbsp;项目编号 : {{data.projectNum}}</div>
    <div class="head_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:550px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>委托单位</span>
          </div>
          <divModel v-model="data.valueData.clientUnitName" style="width: 460px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:550px;right:0">
          <div class="boxs block head_1_title" style="width:110px;">
            <span>委托单位地址</span>
          </div>
          <divModel v-model="data.valueData.clientUnitAddress" style="width: 440px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:550px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>受检单位</span>
          </div>
          <divModel v-model="data.valueData.checkUnitName" style="width: 460px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:550px;right:0">
          <div class="boxs block head_1_title" style="width:110px;">
            <span>受检单位地址</span>
          </div>
          <divModel v-model="data.valueData.checkUnitAddress" style="width: 440px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative borderRight" style="width:690px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>场所检测领域</span>
          </div>
          <divModel v-model="data.valueData.PlaceClassification"
                    style="width: 590px;text-align:left;padding-left:10px;left:90px;"
                    class="moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full borderRight" style="width:205px;right:205px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>检测类型</span>
          </div>
          <divModel v-model="data.valueData.monitorType" style="width: 115px;border-right:none"
                    :pulldown="['状态检测','验收检测']"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:205px;left:895px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>联系电话</span>
          </div>
          <divModel v-model="data.valueData.checkUnitPhone" style="width: 115px;border-right:none"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative borderRight" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>采样依据</span>
          </div>
          <divModel v-model="data.valueData.SamplingBasis"
                    style="width: 1000px;text-align:left;padding-left:10px;left:90px;"
                    class="moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;line-height:64px;">
            <span>检测依据</span>
          </div>
          <divModel v-model="data.valueData.standard" style="width: 1000px;padding-left:10px;right:0;"
                    class="rowsInput Full hide focusBg"></divModel>
        </div>
      </div>
    </div>

    <div class="__functionBox" v-if="ipdTemplate!='ipdTemplate'" v-show="!isTemplate">   <!-- ******** 功能模块 ********** -->
      <div class="__functionCover1" v-show="data.height._normal.carried || data.isHead"></div>
      <div class="__functionCover2" v-show="!data.height._normal.carried || data.isHead"></div>
      <div class="__functionCover3" v-show="index_jsonString()==0"></div>
      <div class="__functionCover4" v-show="data.isHead || index_jsonString()==jsonString.length-1"></div>
      <div class="__functionButton1" @dblclick="toHigh"></div>              <!-- 放大行高 -->
      <div class="__functionButton2" @dblclick="toShort"></div>              <!-- 缩小行高 -->
      <div class="__functionButton3" @dblclick="toUpModule"></div>           <!-- 提高一行 -->
      <div class="__functionButton4" @dblclick="toDownModule"></div>         <!-- 下降行高 -->
      <div class="__functionButton5" @dblclick="toDeleteModule"></div>       <!-- 删除模块 -->
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
        _('.__functionBox').choosable();
      }
      var that = this;
     
    }
  };
</script>

<style lang="less" scoped>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
