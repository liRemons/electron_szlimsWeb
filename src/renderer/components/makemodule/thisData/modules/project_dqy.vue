<template>
  <div :class="{___module_frame_Box:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>

    <div class="modules_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:90px;">
          <span>检测项目</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:90px;">
          <span class="heightCenter3">检测地点</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:175px;">
          <span class="heightCenter3">仪表附温t℃</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:260px;">
          <span class="heightCenter3" style="line-height:16px;">仪表示值Ps<br>hPa</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:345px;">
          <span class="heightCenter3" style="line-height:16px;">刻度修正值<br>P1hPa</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:430px;">
          <span class="heightCenter3" style="line-height:16px;">温度订正值<br>P2hPa</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:515px;">
          <span class="heightCenter3" style="line-height:16px;">补充修正值<br>P3hPa</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:600px;">
          <span class="heightCenter3" style="line-height:16px;">检测结果<br>PhPa</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:85px;left:685px;">
          <span class="heightCenter3">检测时间</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:230px;left:770px;">
          <span class="heightCenter3">检测仪器</span>
        </div>
        <div class="boxs block tc Full" style="width:100px;right:0;">
          <span class="heightCenter3">备注</span>
        </div>
      </div>
      <div class="___relative">
        <div style="width: 89px;" class="borderRight">
          <div style="height:32px;">
            <divModel v-model="data.valueData.TestingItems" style="width: 89px;text-align: center;line-height:16px;" class="Full warp2 rowsInput2 hide focusBg"></divModel>
          </div>
        </div>
        <div style="width: 84px;left:90px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.LocationDetection" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 84px;left:175px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.AttachedTemperature" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 84px;left:260px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.IndicationValue" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 84px;left:345px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.scale" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 84px;left:430px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.temperature" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 84px;left:515px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.supplement" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 84px;left:600px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.detectionresult" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 84px;left:685px;" class="Full borderRight">
          <divModel style="width: 84px;" v-model="data.valueData.DetectionTime" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
        <div style="width: 229px;left:770px;" class="Full borderRight">
          <div style="height:32px;">
            <divModel v-model="data.valueData.TestingInstrument" style="width: 229px;text-align: center;line-height:16px;" class="Full warp2 rowsInput2 hide focusBg"></divModel>
          </div>
        </div>
        <div style="width: 99px;right:0;" class="Full">
          <divModel v-model="data.valueData.Remarks" style="width: 99px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>
      </div>
    </div>


    <div class="__functionBox" v-if="ipdTemplate!='ipdTemplate'" v-show="!isTemplate">   <!-- ******** 功能模块 ********** -->
      <div class="__functionCover1"></div>
      <div class="__functionCover2"></div>
      <div class="__functionCover3" v-show="index_jsonString()==0"></div>
      <div class="__functionCover4" v-show="data.isHead || index_jsonString()==jsonString.length-1"></div>
      <!--      <div class="__functionButton1" @click="toHigh"></div>              &lt;!&ndash; 放大行高 &ndash;&gt;-->
      <!--      <div class="__functionButton2" @click="toShort"></div>              &lt;!&ndash; 缩小行高 &ndash;&gt;-->
      <div class="__functionButton3" @click="toUpModule"></div>           <!-- 提高一行 -->
      <div class="__functionButton4" @click="toDownModule"></div>         <!-- 下降行高 -->
      <div class="__functionButton5" @click="toDeleteModule"></div>       <!-- 删除模块 -->
      <!--      <div class="__functionButton6" @click="increase">-->
      <!--        <span>+</span>-->
      <!--      </div>       &lt;!&ndash;增加一行 &ndash;&gt;-->
    </div>
  </div>
</template>

<script>
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
    props: ['ipdTemplate' , 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
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
      },
      increase(){
        // let obj={};
        // this.data.valueData.point.push(obj);
        this.$emit('update:data');
      }
    },
    mounted: function () {
      if(this.$route.query.Judge!='ipdTemplate'){
        _('.__functionBox').choosable();
      }
    }
  };
</script>

<style>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
