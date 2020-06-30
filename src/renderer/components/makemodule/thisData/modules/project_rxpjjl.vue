<template>
  <div id="project_bzc" :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      <div style="position: relative">
        <um-radio :radio="radio_0" index="0" :baseImg="base" style="position: absolute;top:7px;" :selectedImg="selectedImg" class="project_xpczsyzz_cb_0 nodule_1_name"></um-radio>
        乳腺平均剂量
        &nbsp;&nbsp;&nbsp;
      </div>
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="project_rxpjjl_box" style="text-align:left;border-bottom:none;">
        &nbsp;&nbsp;&nbsp;
        检测条件：手动，<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:20px;" v-model="data.valueData.item1"></divModel> kV
        ,<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:20px;" v-model="data.valueData.item2"></divModel>mAs,
        HVL<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:20px;" v-model="data.valueData.item3"></divModel>mmAl (记录4cmPMMA，
      </div>
      <div class="project_bzc_box" style="text-align:left;">
        &nbsp;&nbsp;&nbsp;
        自动曝光下数值)曝光模式
        <div v-for="(item,index) in radio_1.values" style="display: inline-block;position: relative;margin:0 10px 0 20px;">
          <um-threebox style="top:7px;left:-18px;" :optionalbox="radio_1" :Judge="data.valueData.project1" :index="index+1" :baseImg="base"
                          :selectedImg="selectedImg" class="module_5_radio"></um-threebox>
          {{item}}
        </div>
        ，靶/滤过：
        <divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:20px;" v-model="data.valueData.item5"></divModel>
      </div>


      <div class="project_rxpjjl_box">
        <div class="project_rxpjjl_cellBox1">序号</div>
        <div class="project_rxpjjl_cellBox2" style="left:18%">1</div>
        <div class="project_rxpjjl_cellBox2" style="left:28%">2</div>
        <div class="project_rxpjjl_cellBox2" style="left:38%">3</div>
        <div class="project_rxpjjl_cellBox2" style="left:48%">4</div>
        <div class="project_rxpjjl_cellBox2" style="left:58%">5</div>
        <div class="project_rxpjjl_cellBox3" style="left:68%">校准平均值X</div>
        <div class="project_rxpjjl_cellBox3 rightBottom" style="right:0;text-align:center">模体表面剂量</div>
      </div>


      <div class="project_bzc_box">
        <div class="project_zdbgkzcfx_box hideBottom">
          <div class="___relative">
            <div class="project_rxpjjl_cellBox1">
              测量值K(<divModel style="width: 20px;height:20px;position:relative;top:5px;" class="inputBlock" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.item11"></divModel>)
            </div>
            <div style="left:18%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item2" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:28%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item3" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:38%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item4" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:48%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item5" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:58%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item6" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:68%" class="project_rxpjjl_cellBox3">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item7" @keydown="filteLetter"></divModel>
            </div>
            <div style="right:0;" class="project_rxpjjl_cellBox3 rightBottom">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[0].item8" @keydown="filteLetter"></divModel>
            </div>
          </div>
        </div>
      </div>
      <div class="project_bzc_box hideBottom">
        <div class="project_zdbgkzcfx_box hideBottom">
            <div class="project_rxpjjl_cellBox1" >
              <um-radio :radio="radio_2" index="0" :baseImg="base" style="position: absolute;top:7px;" :selectedImg="selectedImg" class="project_xpczsyzz_cb_0 nodule_1_name"></um-radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              3D测量值(<divModel style="width: 20px;height:20px;position:relative;top:5px;" class="inputBlock" :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.item13"></divModel>)
            </div>
            <div style="left:18%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item2" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:28%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item3" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:38%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item4" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:48%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item5" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:58%" class="project_rxpjjl_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item6" @keydown="filteLetter"></divModel>
            </div>
            <div style="left:68%" class="project_rxpjjl_cellBox3">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item7" @keydown="filteLetter"></divModel>
            </div>
            <div style="right:0;" class="project_rxpjjl_cellBox3 rightBottom">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}" v-model="data.valueData.point[1].item8" @keydown="filteLetter"></divModel>
            </div>
        </div>
      </div>
    </div>
    <div class="___nodule_frame_grid_right ___table-cell">
      <div style="margin-left:5px;">
        <p style="position: absolute;top:-15px;">
          转换因子g:<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:23px;" v-model="data.valueData.item6"></divModel>
        </p>
        <p style="position: absolute;top:10px;">
          不同乳房成分修正因子c:<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:23px;" v-model="data.valueData.item7"></divModel>
        </p>
        <p style="position: absolute;top:30px;">
          不同靶/滤过修正因子s:<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:23px;" v-model="data.valueData.item8"></divModel>
        </p>
        <p style="position: absolute;top:50px;">
          投照角度修正因子T:<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:23px;" v-model="data.valueData.item9"></divModel>
        </p>
        <p style="position: absolute;top:70px;">
          乳腺平均剂量AGD=<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:23px;" v-model="data.valueData.item10"></divModel>mGy
        </p>
        <p style="position: absolute;top:90px;">
          注：AGD=K*g*c*s*T（2D摄影模式时T
        </p>
        <p style="position: absolute;top:110px;">
          为1，3D模式时根据投照角度数值不同）
        </p>
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
          signs:[0],              //定义单选框结果值的序号
          values:[1]        //定义单选框结果值     ***结果值绝对不能有重复
        },
        radio_1: {
          result: {
            sign: 0,
            value: 0
          },
          signs: [0, 1],
          values: ['2D曝光模式','3D 0°曝光模式']
        },
        radio_2:{
          result:{      //单选框结果json
            sign:null,           //结果值的序号
            value:null           //结果值
          },
          signs:[0,1],              //定义单选框结果值的序号
          values:[1, 2]        //定义单选框结果值     ***结果值绝对不能有重复
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
      'radio_1.result.value':function(val){
        if(val==2){
          this.data.valueData.project1=2;
        }else if(val==1){
          this.data.valueData.project1=1;
        }else if(val==0){
          this.data.valueData.project1=0;
        }
        this.$emit('update:data');
      },
      'radio_2.result.value':function(val){
        if(val==1){
          this.data.valueData.item12=1;
        }else{
          this.data.valueData.item12=0;
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
        //   // let result=parseInt((num1+num2+num3)/3*100)/100;
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
