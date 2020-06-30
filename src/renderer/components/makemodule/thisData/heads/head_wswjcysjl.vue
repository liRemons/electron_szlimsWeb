<template>
  <div id="head_1" class="_normalHeight_">
    <div :class="{eventCover:!headInput}"></div>
    <div class="___head_titleBox">{{data.unit}}<br>{{data.title}}</div>
    <div class="head_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:550px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>样品编号</span>
          </div>
          <divModel v-model="data.valueData.sampleNum" style="width: 460px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:550px;right:0;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>收样日期</span>
          </div>
          <divModel v-model="data.valueData.SampleCollectionTime" style="width: 460px;right:0;"
                    class="moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:550px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>检测日期</span>
          </div>
          <divModel v-model="data.valueData.measuretime" style="width: 460px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:550px;right:0;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>检测环境</span>
          </div>
          <div class="Full boxs" style="width: 460px;right:0;padding-left:20px;">
            <divModel v-model="data.valueData.temperature1" style="width: 60px;height:22px;"
                      class="moduleInput focusBg borderBottom inputBlock"></divModel>
            <span style="margin:0 10px;">℃</span>
            <divModel v-model="data.valueData.humidity1" style="width: 60px;height:22px;"
                      class="moduleInput focusBg borderBottom inputBlock"></divModel>
            <span style="margin-left:10px;">%RH</span>
          </div>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:550px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>样品状态</span>
          </div>
          <div class="Full" style="width:460px;right:0;">
            <div style="text-align: left;margin-left:20px;">
              <div v-for="(item,index) in radio_3.values" style="display: inline-block;position: relative;margin:0 30px 0 40px;">
                <um-optionalbox style="top:7px;left:-18px;" :optionalbox="radio_3" :Judge="data.valueData.item" :index="index" :baseImg="base"
                                :selectedImg="selectedImg" class="module_5_radio"></um-optionalbox>
                {{item}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>检测项目</span>
          </div>
          <divModel v-model="data.valueData.TestingItems" style="width: 1010px;right:0;text-align: left;padding-left: 20px;"
                    class="moduleInput Full hide focusBg boxs"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>检测依据</span>
          </div>
          <divModel v-model="data.valueData.standard" style="width: 1010px;right:0;text-align: left;padding-left: 20px;"
                    class="moduleInput Full hide focusBg boxs"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>检测仪器</span>
          </div>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>实验操作</span>
          </div>
          <divModel v-model="data.valueData.ExperimentalOperation" style="width: 1010px;right:0;text-align: left;padding-left: 20px;"
                    class="moduleInput Full hide focusBg boxs"></divModel>
        </div>
      </div>
      <div class="___relative">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>样品分析结果:</span>
          </div>
          <divModel v-model="data.valueData.SampleAnalysis" style="width: 1010px;right:0;text-align: left;padding-left: 20px;"
                    class="moduleInput Full hide focusBg boxs"></divModel>
        </div>
      </div>
    </div>

    <div class="__functionBox" v-if="ipdTemplate!='ipdTemplate'" v-show="!isTemplate">
      <!-- ******** 功能模块 ********** -->
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
        selectedImg: require('../../../../assets/icon/sign_choosed.png'),
        base: require('../../../../assets/icon/checkbox_back.png'),
        radio_3: {
          result: {
            sign: 0,
            value: 0
          },
          signs: [0, 1],
          values: ['正常','其他']
        }
      }
    },
    props: ['ipdTemplate', 'mainArr', 'auxiliaryArr', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'headInput'],
    watch:{
      'radio_3.result.value': function (val) {
        this.data.valueData.item6=val;
        this.$emit('update:data');
      }
    },
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
    }
  };
</script>

<style lang="less" scoped>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
