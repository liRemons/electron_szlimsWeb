<template>
  <div :class="{___module_frame_Box:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>

    <div class="modules_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="___relative">
          <div class="boxs block head_1_title Full" style="width:90px;">
            <span class="heightCenter3">检测项目</span>
          </div>
          <div class="boxs block head_1_title Full" style="width:85px;left:90px;">
            <span class="heightCenter3">检测地点</span>
          </div>
          <div class="block ___relative" style="width:265px;left:175px;">
            <div style="width: 265px;">
              <div style="width: 265px;" class="tc borderBottom borderRight">
                <span>仪器示值（瞬时A声级值）</span>
              </div>
              <div style="width: 265px;" class="___relative borderRight">
                <div style="width: 53px;" class="tc borderRight">
                  <span>L</span>
                </div>
                <div style="width: 53px;left:53px;" class="Full tc borderRight">
                  <span>L</span>
                </div>
                <div style="width: 53px;left:106px;" class="Full tc borderRight">
                  <span>L</span>
                </div>
                <div style="width: 53px;left:159px;" class="Full tc borderRight">
                  <span>L</span>
                </div>
                <div style="width: 53px;right:0;" class="Full tc">
                  <span>L</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:440px;">
          <span class="heightCenter3">{{data.valueData.correct}}</span>
          <div @click="show(0)" style="width:90px;border-right:none" class="head_1_model Full">
            <div v-if="correctJudge" style="width:88px;top:65px;left:1px;" class="tc instrumentSelcet2">
              <div v-for="(item,index) in correctArr" @click.stop="statr(index,0)">{{item}}</div>
            </div>
          </div>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:530px;">
          <span class="heightCenter3" style="line-height:16px;">检测结果 <br>（LAeq）</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:620px;">
          <span class="heightCenter3">检测时间</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:290px;left:710px;">
          <span class="heightCenter3">检测仪器</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:100px;right:0;border-right:none">
          <span class="heightCenter3">备注</span>
        </div>
      </div>
      <div class="___relative">
        <div style="width: 89px;" class="Full borderRight">
          <div class="___relative heightCenter4" style="height:32px;">
            <divModel v-model="data.valueData.TestingItems" style="width: 89px;text-align: center;line-height:16px;" class="Full warp2 rowsInput2 hide focusBg"></divModel>
          </div>
        </div>
        <div style="width: 85px;left:89px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.LocationDetection" style="width: 85px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div v-for="(item,index) in data.valueData.point" style="width: 265px;margin-left:175px;" :class="index!=(data.valueData.point.length-1) ? 'borderBottom':''" class=" ___relative borderRight">
          <divModel v-model="item.L1" style="width: 53px;" class="moduleInput Full hide borderRight focusBg"></divModel>
          <divModel v-model="item.L2" style="width: 53px;left:53px;" class="moduleInput Full hide borderRight focusBg"></divModel>
          <divModel v-model="item.L3" style="width: 53px;left:106px;" class="moduleInput Full hide borderRight focusBg"></divModel>
          <divModel v-model="item.L4" style="width: 53px;left:159px;" class="moduleInput Full hide borderRight focusBg"></divModel>
          <divModel v-model="item.L5" style="width: 53px;right: 0" class="moduleInput Full hide focusBg"></divModel>&nbsp;
        </div>

        <div style="width: 89px;left:440px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.CorrectionValue" style="width: 89px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div style="width: 89px;left:530px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.detectionResult" style="width: 89px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div style="width: 89px;left:620px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.DetectionTime" style="width: 89px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div style="width: 289px;left:710px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.TestingInstrument" style="width: 290px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div style="width: 90px;right:0;" class="Full">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.Remarks" style="width: 100px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
      </div>
    </div>


    <div class="__functionBox" v-show="!isTemplate">   <!-- ******** 功能模块 ********** -->
      <div v-if="ipdTemplate!='ipdTemplate'">
        <div class="__functionCover1"></div>
        <div class="__functionCover2"></div>
        <div class="__functionCover3" v-show="index_jsonString()==0"></div>
        <div class="__functionCover4" v-show="data.isHead || index_jsonString()==jsonString.length-1"></div>
        <!--      <div class="__functionButton1" @dblclick="toHigh"></div>              &lt;!&ndash; 放大行高 &ndash;&gt;-->
        <!--      <div class="__functionButton2" @dblclick="toShort"></div>              &lt;!&ndash; 缩小行高 &ndash;&gt;-->
        <div class="__functionButton3" @dblclick="toUpModule"></div>           <!-- 提高一行 -->
        <div class="__functionButton4" @dblclick="toDownModule"></div>         <!-- 下降行高 -->
        <div class="__functionButton5" @dblclick="toDeleteModule"></div>       <!-- 删除模块 -->
      </div>
      <div v-if="ipdTemplate=='ipdTemplate'" class="__functionButton6" @dblclick="increase">
        <span>+</span>
      </div>       <!--增加一行 -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        correctArr:['修正系数','修正值'],
        correctJudge:false,
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
      show(index){
        if(index==0){
          this.correctJudge=!this.correctJudge
        }
      },
      statr(index,Judge){
        if(Judge==0){
          this.correctJudge=false;
          this.data.valueData.correct=this.correctArr[index];
        }
      },
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
        let obj={
          L1:"",
          L2:"",
          L3:"",
          L4:"",
          L5:"",
        };
        this.jsonString[this.index_jsonString()].data.valueData.point.push(obj);
        this.$emit('update:jsonString');
        this.$emit('restart');
      }
    },
    mounted: function () {
      _('.__functionBox').choosable();
    }
  };
</script>

<style>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
