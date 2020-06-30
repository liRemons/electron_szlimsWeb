<template>
  <div id="project_bzc" :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      <div style="position: relative">
        <um-radio :radio="radio_0" :Judge="data.valueData.project" index="0" :baseImg="base" style="position: absolute;top:7px;" :selectedImg="selectedImg" class="project_xpczsyzz_cb_0 nodule_1_name"></um-radio>
        特定辐射输出量
      </div>
      <div style="position: relative">
        <um-radio :radio="radio_1" :Judge="data.valueData.project1" index="0" :baseImg="base" style="position: absolute;top:7px;" :selectedImg="selectedImg" class="project_xpczsyzz_cb_0 nodule_1_name"></um-radio>
        输出量重复性
      </div>
      <div>
        <span>测量值K(<divModel style="width:40px;height:20px;position: relative;top:3px;" class="inputBlock" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.item1"></divModel>)</span>
      </div>
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="project_bzc_box" style="text-align:left">
        &nbsp;&nbsp;&nbsp;
        检测条件:<divModel style="height:20px;" class="project_bzc_smollInput ___smollInput inputBlock" v-model="data.valueData.item2"></divModel>kV
        <divModel style="height:20px;" class="inputBlock project_bzc_smollInput ___smollInput" v-model="data.valueData.item3"></divModel>mAs,
        焦点距探测器厚度有效点的距离h:<divModel style="height:20px;" class="inputBlock project_bzc_smollInput ___smollInput" v-model="data.valueData.item4"></divModel>cm
      </div>
      <div class="project_bzc_box">
        <div class="project_scl_cellBox1">靶/滤过</div>
        <div class="project_scl_cellBox2" style="left:10%">1</div>
        <div class="project_scl_cellBox2" style="left:20%">2</div>
        <div class="project_scl_cellBox2" style="left:30%">3</div>
        <div class="project_scl_cellBox2" style="left:40%">4</div>
        <div class="project_scl_cellBox2" style="left:50%">5</div>
        <div class="project_scl_cellBox2" style="width:20%;left:60%">&nbsp;X100（μGy/mAs）</div>
        <div class="project_scl_cellBox2" style="left:80%">基线值</div>
        <div class="project_scl_cellBox2 rightBottom" style="right:0">相对偏差</div>
      </div>
      <div class="project_bzc_box hideBottom">
        <!--<input type="text" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item7" @focus="noPress($event)">-->
        <div class="___relative ___shadowBottom" v-for="(val, index) in data.valueData.point">
          <div class="project_scl_cellBox1">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item1"></divModel>
          </div>
          <div class="project_scl_cellBox2" style="left:10%">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item2"></divModel>
          </div>
          <div class="project_scl_cellBox2" style="left:20%">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item3"></divModel>
          </div>
          <div class="project_scl_cellBox2" style="left:30%">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item4"></divModel>
          </div>
          <div class="project_scl_cellBox2" style="left:40%">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item5"></divModel>
          </div>
          <div class="project_scl_cellBox2" style="left:50%">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item6"></divModel>
          </div>
          <div class="project_scl_cellBox2" style="left:60%;width: 20%">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item7"></divModel>
          </div>
          <div class="project_scl_cellBox2" style="left:80%">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item8"></divModel>
          </div>
          <div class="project_scl_cellBox2 rightBottom" style="right:0;">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[index].item9"></divModel>
          </div>
        </div>
      </div>
    </div>
    <div class="___nodule_frame_grid_right ___table-cell">
      <div style="margin-left:20px;">
        <div style="position: absolute;top:5px;">
          <img style="display: inline-block" src="../../../../assets/icon/scl.png" height="30" width="130"/>
          <divModel style="height:27px;" class="project_bzc_smollInput ___smollInput inputBlock" v-model="data.valueData.item5"></divModel>%
        </div>
        <p style="position: absolute;top:25px;">注：1.计算CV值时使用第一行数据；</p>
        <p style="position: absolute;top:50px;">2.计算X100时，K的单位需换算成μGy</p>
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
          signs:[0],              //定义单选框结果值的序号
          values:[1]        //定义单选框结果值     ***结果值绝对不能有重复
        },
        radio_1:{
          result:{      //单选框结果json
            sign:null,           //结果值的序号
            value:null           //结果值
          },
          signs:[0,1],              //定义单选框结果值的序号
          values:[1, 2]        //定义单选框结果值     ***结果值绝对不能有重复
        }
      }
    },
    props:['data', 'ipdTemplate' , 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
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
          this.data.valueData.project1=1;
        }else{
          this.data.valueData.project1=0;
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
        // let num1=parseFloat(this.data.valueData.point[index].item2);
        // let num2=parseFloat(this.data.valueData.point[index].item3);
        // let num3=parseFloat(this.data.valueData.point[index].item4);
        //
        // if(!isNaN(num1) && !isNaN(num2) && !isNaN(num3)){
        //   let result=parseInt((num1+num2+num3)/3*100)/100;
        //   this.data.valueData.point[index].item5=result;
        // }else{
        //   this.data.valueData.point[index].item5='';
        // };
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
