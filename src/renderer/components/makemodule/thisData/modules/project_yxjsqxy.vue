<template>
  <div id="module_5" :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      <um-radio :radio="radio_0" :Judge="data.valueData.project" index="0" :baseImg="base" :selectedImg="selectedImg" class="module_5_radio"></um-radio>
      影像接收器响应&nbsp;
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="module_5_box" style="text-align:left">
        &nbsp;&nbsp;&nbsp;
        检测条件:4cmPMMA <divModel style="height:21px;" class="module_5_smollInput ___smollInput inputBlock" v-model="data.valueData.item1"></divModel>kV
        （在10~100mAs之前选取4~6档mAs进行手动曝光）
<!--        <input type="text" class="module_5_smollInput ___smollInput" v-model="data.valueData.item2">mAs,-->
<!--        探测器宽度:<input type="text" class="module_5_smollInput ___smollInput" v-model="data.valueData.item3">,-->
<!--        厂家规定值:<input type="text" class="module_5_smollInput ___smollInput" v-model="data.valueData.item4">-->
      </div>
      <div class="module_5_box ___table">
        <div class="module_5_title1 ___table-cell">{{data.valueData.point[0].item1}}</div>
        <div class="___relative">
          <div class="module_5_content2">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item2" @keydown="filteLetter" @input="toCompute(0)"></divModel>
          </div>
          <div class="module_5_content3">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item3"></divModel>
          </div>
          <div class="module_5_content4">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item4"></divModel>
          </div>
          <div class="module_5_content5">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item5" @keydown="filteLetter" @input="toCompute(0)"></divModel>
          </div>
          <div class="module_5_content6">
            {{data.valueData.point[0].item6}}
          </div>
        </div>
      </div>
      <div class="module_5_box ___table">
        <div class="module_5_title1 ___table-cell">{{data.valueData.point[1].item1}}</div>
        <div class="___relative">
          <div class="module_5_content2">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item2" @keydown="filteLetter" @input="toCompute(1)"></divModel>
          </div>
          <div class="module_5_content3">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item3"></divModel>
          </div>
          <div class="module_5_content4">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item4"></divModel>
          </div>
          <div class="module_5_content5">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item5" @keydown="filteLetter" @input="toCompute(1)"></divModel>
          </div>
          <div class="module_5_content6">
            {{data.valueData.point[1].item6}}
          </div>
        </div>
      </div>
      <div class="module_5_box ___table">
        <div class="module_5_title1 ___table-cell">{{data.valueData.point[2].item1}}</div>
        <div class="___relative">
          <div class="module_5_content2">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[2].item2" @keydown="filteLetter" @input="toCompute(2)"></divModel>
          </div>
          <div class="module_5_content3">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[2].item3"></divModel>
          </div>
          <div class="module_5_content4">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[2].item4"></divModel>
          </div>
          <div class="module_5_content5">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[2].item5" @keydown="filteLetter" @input="toCompute(2)"></divModel>
          </div>
          <div class="module_5_content6">
            {{data.valueData.point[2].item6}}
          </div>
        </div>
      </div>
      <div class="module_5_box ___table hideBottom">
        <div class="module_5_title1 ___table-cell">{{data.valueData.point[3].item1}}</div>
        <div class="___relative">
          <div class="module_5_content2">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[3].item2" @keydown="filteLetter" @input="toCompute(3)"></divModel>
          </div>
          <div class="module_5_content3">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[3].item3"></divModel>
          </div>
          <div class="module_5_content4">
            <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[3].item4"></divModel>
          </div>
          <div class="module_5_content5">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[3].item5" @keydown="filteLetter" @input="toCompute(3)"></divModel>
          </div>
          <div class="module_5_content6">
            {{data.valueData.point[3].item6}}
          </div>
        </div>
      </div>
    </div>
    <div class="___module_frame_grid_relative_right ___table-cell" >
      <div style="text-align:left;margin-left:30px;">
        K和M的拟合结果:<divModel style="height:22px;" class="module_5_smollInput ___smollInput inputBlock" v-model="data.valueData.item2"></divModel>
        <br>
        拟合曲线类型:<divModel style="height:22px;" class="module_5_smollInput ___smollInput inputBlock" v-model="data.valueData.item3"></divModel>
        <br>
        R<sup>2</sup>:<divModel style="height:22px;" class="module_5_smollInput ___smollInput inputBlock" v-model="data.valueData.item4"></divModel>
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
  export default {
    data(){
      return {
        index_jsonString:function(){             // 获取当前模块在jsonString中的索引
          let result=this.thisPageIndex;
          for(let i=0; i<this.pageNumber; i++){
            result+=this.showing[i].length;
          }
          return result;
        },
        selectedImg:require('../../../../assets/icon/sign_choosed.png'),
        base:require('../../../../assets/icon/checkbox_back.png'),
        radio_0:{
          result:{      //单选框结果json
            sign:null,           //结果值的序号
            value:null           //结果值
          },
          signs:[0,1],              //定义单选框结果值的序号
          values:[1, 2]        //定义单选框结果值     ***结果值绝对不能有重复
        }
      }
    },
    props:['ipdTemplate' , 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
    watch:{
      'radio_0.result.value':function(val){
        if(val==1){
          this.data.valueData.project=1;
        }else{
          this.data.valueData.project=0;
        }
        this.$emit('update:data');
      }
    },
    methods:{
      toHigh(){
        this.data.height._normal.carried=true;
        this.data.height._short.carried=false;
        this.watchSign._high+=1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toShort(){
        this.data.height._normal.carried=false;
        this.data.height._short.carried=true;
        this.watchSign._short+=1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toUpModule(){
        let index=this.index_jsonString();
        if(index!=0){
          _transposition(this.jsonString, index, index-1);
          this.$emit('update:jsonString');
          this.watchSign._down+=1;
          this.$emit('update:watchSign');
        }
      },
      toDownModule(){
        let index=this.index_jsonString();
        if(index!=this.jsonString.length-1){
          _transposition(this.jsonString, index, index+1);
          this.$emit('update:jsonString');
          this.watchSign._down+=1;
          this.$emit('update:watchSign');
        }
      },
      toDeleteModule(){
        let index=this.index_jsonString();

        this.jsonString.splice(index, 1);
        this.$emit('update:jsonString');
        this.watchSign._delete+=1;
        this.$emit('update:watchSign');
      },
      noPress(event){
        event.target.blur();
      },
      filteLetter(event){
        if((event.keyCode<48 && event.keyCode!=8) || (event.keyCode>57 && event.keyCode<96) || event.keyCode>105){
          _preventDefault(event);
        }
      },
      toCompute(index){
        let num1=parseFloat(this.data.valueData.point[index].item2);
        let num2=parseFloat(this.data.valueData.point[index].item5);

        if(!isNaN(num1) && !isNaN(num2)){
          let result=((num1-num2)/num2*100).toFixed(2)+'%';
          this.data.valueData.point[index].item6=result;
        }else{
          this.data.valueData.point[index].item6='';
        };
      }
    },
    mounted:function(){
      _('.module_5_radio').center('h');
      if(this.$route.query.Judge!='ipdTemplate'){
        _('.__functionBox').choosable();
      }
    }
  };
</script>

<style>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
