<template>
  <div id="module_5" :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      <um-radio :radio="radio_0" :Judge="data.valueData.project" index="0" :baseImg="base" :selectedImg="selectedImg" class="module_5_radio"></um-radio>
      &nbsp;&nbsp;&nbsp;影像接收器均匀性
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="module_5_box" style="text-align:left">
        &nbsp;&nbsp;&nbsp;
        检测条件:<divModel style="width:30px;height:21px;" class="module_5_smollInput ___smollInput inputBlock" v-model="data.valueData.item1"></divModel>kV
        <divModel style="width:30px;height:21px;" class="module_5_smollInput ___smollInput inputBlock" v-model="data.valueData.item2"></divModel>mAs,(常用)
        靶/滤过:<divModel style="height:21px;" class="module_5_smollInput ___smollInput inputBlock" v-model="data.valueData.item3"></divModel>,
        (常用)
        <div style="display: inline-block;position: relative;margin:0 30px 0 40px;">
          <um-radio style="top:7px;left:-18px;" :radio="radio_1" index="0" :baseImg="base" :selectedImg="selectedImg" class="module_5_radio"></um-radio>
          自动曝光
        </div>
        <div style="display: inline-block;position: relative">
          <um-radio style="top:7px;left:-18px;" :radio="radio_2" index="0" :baseImg="base" :selectedImg="selectedImg" class="module_5_radio"></um-radio>
          手动曝光
        </div>
      </div>
      <div class="module_5_box">
        <div class="module_5_title1">选取位置</div>
        <div class="module_5_title2">中央区域</div>
        <div class="module_5_title3">第一象限</div>
        <div class="module_5_title4">第二象限</div>
        <div class="module_5_title5">第三象限</div>
        <div class="module_5_title6">第四象限</div>
      </div>
      <div class="module_5_box ___table">
        <div class="module_5_title1 ___table-cell">{{data.valueData.point[0].item1}}</div>
        <div class="___relative">
          <div class="module_5_content2">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item2" @keydown="filteLetter" @input="toCompute(2,data.valueData.point[0].item2)"></divModel>
          </div>
          <div class="module_5_content3">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item3" @keydown="filteLetter" @input="toCompute(3,data.valueData.point[0].item3)"></divModel>
          </div>
          <div class="module_5_content4">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item4" @keydown="filteLetter" @input="toCompute(4,data.valueData.point[0].item4)"></divModel>
          </div>
          <div class="module_5_content5">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item5" @keydown="filteLetter" @input="toCompute(5,data.valueData.point[0].item5)"></divModel>
          </div>
          <div class="module_5_content6">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item6" @keydown="filteLetter" @input="toCompute(6,data.valueData.point[0].item6)"></divModel>
          </div>
        </div>
      </div>
      <div class="module_5_box ___table hideBottom">
        <div class="module_5_title1 ___table-cell">{{data.valueData.point[1].item1}}</div>
        <div class="___relative" style="width:100%">
          <div class="module_5_content2">
            {{data.valueData.point[1].item2}}&nbsp;
          </div>
          <div class="module_5_content3">
            {{data.valueData.point[1].item3}}&nbsp;
          </div>
          <div class="module_5_content4">
            {{data.valueData.point[1].item4}}&nbsp;
          </div>
          <div class="module_5_content5">
            {{data.valueData.point[1].item5}}&nbsp;
          </div>
          <div class="module_5_content6">
            {{data.valueData.point[1].item6}}&nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="___module_frame_grid_relative_right ___table-cell">
      <div style="text-align: left;margin-left:20px;">
        影像接收器均匀性<input type="text" class="module_5_smollInput ___smollInput" v-model="data.valueData.item6" @focus="noPress($event)">%
        <br>
        注：结果取四角与中心区域偏差最大值
        <!--      <img :src="data.computeResult" class="module_5_img">-->
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
          signs:[1],              //定义单选框结果值的序号
          values:['1']        //定义单选框结果值     ***结果值绝对不能有重复
        },
        radio_1:{
          result:{      //单选框结果json
            sign:null,           //结果值的序号
            value:null           //结果值
          },
          signs:[1],              //定义单选框结果值的序号
          values:['1']        //定义单选框结果值     ***结果值绝对不能有重复
        },
        radio_2:{
          result:{      //单选框结果json
            sign:null,           //结果值的序号
            value:null           //结果值
          },
          signs:[1],              //定义单选框结果值的序号
          values:['1']        //定义单选框结果值     ***结果值绝对不能有重复
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
      },
      'radio_1.result.value':function(val){
        if(val==1){
          this.data.valueData.item4=1;
        }else{
          this.data.valueData.item4=0;
        }
        this.$emit('update:data');
      },
      'radio_2.result.value':function(val){
        if(val==1){
          this.data.valueData.item5=1;
        }else{
          this.data.valueData.item5=0;
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
      toCompute(index,num){
        let numFloat=parseFloat(num);
        let Central=parseFloat(this.data.valueData.point[0].item2);
        if(!isNaN(numFloat)&&!isNaN(Central)){
          let sum=(((Central-numFloat)/Central)*100).toFixed(2);
          switch (index) {
            case 2:
              this.data.valueData.point[1].item2=num;
              let num3=parseFloat(this.data.valueData.point[1].item3);
              let num4=parseFloat(this.data.valueData.point[1].item4);
              let num5=parseFloat(this.data.valueData.point[1].item5);
              let num6=parseFloat(this.data.valueData.point[1].item6);
              if(!isNaN(num3)){
                this.data.valueData.point[1].item3=(((Central-this.data.valueData.point[0].item3)/Central)*100).toFixed(2);
              }
              if(!isNaN(num4)){
                this.data.valueData.point[1].item4=(((Central-this.data.valueData.point[0].item4)/Central)*100).toFixed(2);
              }
              if(!isNaN(num5)){
                this.data.valueData.point[1].item5=(((Central-this.data.valueData.point[0].item5)/Central)*100).toFixed(2);
              }
              if(!isNaN(num6)){
                this.data.valueData.point[1].item6=(((Central-this.data.valueData.point[0].item6)/Central)*100).toFixed(2);
              }
              break;
            case 3:
              this.data.valueData.point[1].item3=sum;
              break;
            case 4:
              this.data.valueData.point[1].item4=sum;
              break;
            case 5:
              this.data.valueData.point[1].item5=sum;
              break;
            case 6:
              this.data.valueData.point[1].item6=sum;
              break;
          }
        }else{
          switch (index) {
            case 2:
              this.data.valueData.point[1].item3="";
              this.data.valueData.point[1].item4="";
              this.data.valueData.point[1].item5="";
              this.data.valueData.point[1].item6="";
              break;
            case 3:
              this.data.valueData.point[1].item3="";
              break;
            case 4:
              this.data.valueData.point[1].item4="";
              break;
            case 5:
              this.data.valueData.point[1].item5="";
              break;
            case 6:
              this.data.valueData.point[1].item6="";
              break;
          }
        }

        if(!isNaN(this.data.valueData.point[1].item3)&&!isNaN(this.data.valueData.point[1].item4)&&!isNaN(this.data.valueData.point[1].item5)&&!isNaN(this.data.valueData.point[1].item6)){
          this.data.valueData.item6=Math.max(this.data.valueData.point[1].item3,this.data.valueData.point[1].item4,this.data.valueData.point[1].item5,this.data.valueData.point[1].item6)
        }

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
