<template>
  <div id="project_bzc" :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      <div style="position: relative">
        <um-radio :radio="radio_0" :Judge="data.valueData.project" index="0"  :baseImg="base" style="position: absolute;top:7px;" :selectedImg="selectedImg" class="project_xpczsyzz_cb_0 nodule_1_name"></um-radio>
        对比度细节阈值
      </div>
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="project_bzc_box" style="text-align:left">
        &nbsp;&nbsp;&nbsp;
        检测条件:<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:20px;" v-model="data.valueData.item1"></divModel> kV
        <divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:20px;" v-model="data.valueData.item2"></divModel>mAs
      </div>
      <div class="project_bzc_box">
        <div class="project_bzc_cellBox1">细节直径(mm)</div>
        <div class="project_bzc_cellBox2">可观察到的细节物最大厚度(mm)</div>
        <div class="project_bzc_cellBox3">对比度(%)</div>
      </div>
      <div class="project_bzc_box hideBottom">
        <div class="project_bzc_cellBox1">
          <div class="___shadowBottom" v-for="(val, index) in data.valueData.point">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item1" @input="toCompute(index)"></divModel>
          </div>
        </div>
        <div class="project_bzc_cellBox2">
          <div class="___relative ___shadowBottom" v-for="(val, index) in data.valueData.point">
            <div class="project_dbdxjfz_option1">
              <divModel type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item2" @keydown="filteLetter"></divModel>
            </div>
          </div>
        </div>
        <div class="project_bzc_cellBox3">
          <div class="___shadowBottom" v-for="(val, index) in data.valueData.point">
            {{data.valueData.point[index].item3}} &nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="___nodule_frame_grid_right ___table-cell">{{data.valueData['计算结果']}}</div>

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
          signs:[0],              //定义单选框结果值的序号
          values:[1]        //定义单选框结果值     ***结果值绝对不能有重复
        },
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
        let details=this.data.valueData.point[index].item1;
        if(details==0.03){
          this.data.valueData.point[index].item3='0.52';
        }else if(details==0.04){
          this.data.valueData.point[index].item3='0.70';
        }else if(details==0.05){
          this.data.valueData.point[index].item3='0.87';
        }else if(details==0.06){
          this.data.valueData.point[index].item3='1.04';
        }else if(details==0.08){
          this.data.valueData.point[index].item3='1.39';
        }else if(details==0.10){
          this.data.valueData.point[index].item3='1.73';
        }else if(details==0.13){
          this.data.valueData.point[index].item3='2.25';
        }else if(details==0.16){
          this.data.valueData.point[index].item3='2.76';
        }else if(details==0.20){
          this.data.valueData.point[index].item3='Layout3.png.44';
        }else if(details==0.25){
          this.data.valueData.point[index].item3='4.28';
        }else if(details==0.36){
          this.data.valueData.point[index].item3='6.11';
        }else if(details==0.50){
          this.data.valueData.point[index].item3='8.38';
        }else if(details==0.70){
          this.data.valueData.point[index].item3='11.68';
        }else if(details==1.00){
          this.data.valueData.point[index].item3='16.05';
        }else if(details==1.42){
          this.data.valueData.point[index].item3='22.00';
        }else if(details==2.00){
          this.data.valueData.point[index].item3='29.53';
        }else if(details==0.1){
          this.data.valueData.point[index].item3='1.73';
        }else if(details==0.2){
          this.data.valueData.point[index].item3='Layout3.png.44';
        }else if(details==0.5){
          this.data.valueData.point[index].item3='8.38';
        }else if(details==0.7){
          this.data.valueData.point[index].item3='11.68';
        }else if(details==1){
          this.data.valueData.point[index].item3='16.05';
        }else if(details==2){
          this.data.valueData.point[index].item3='29.53';
        }else{
          this.data.valueData.point[index].item3='';
        }
        this.$emit('update:data');
      }
    },
    mounted:function(){
      if(this.$route.query.Judge!='ipdTemplate'){
        _('.__functionBox').choosable();
      }
    }
  };
</script>

<style>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
