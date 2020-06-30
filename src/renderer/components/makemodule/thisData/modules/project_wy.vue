<template>
  <div id="module_5"
       :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      <um-radio :radio="radio_0" :Judge="data.valueData.project" :baseImg="base" :selectedImg="selectedImg" class="module_5_radio"></um-radio>
      伪影&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="module_5_box hideBottom" style="text-align:left">
        &nbsp;&nbsp;&nbsp;
        检测条件:<divModel style="width:30px;height: 20px;" class="inputBlock module_5_smollInput ___smollInput" v-model="data.valueData.item1"></divModel> kV
        <divModel style="width:30px;height: 20px;" class="inputBlock module_5_smollInput ___smollInput" v-model="data.valueData.item2"></divModel>mAs,(常用)
        靶/滤过:<divModel style="width:30px;height: 20px;" class="inputBlock module_5_smollInput ___smollInput" v-model="data.valueData.item3"></divModel>,
        (常用)
        <div style="display: inline-block;position: relative;margin:0 30px 0 40px;">
          <um-radio style="top:7px;left:-18px;" :Judge="data.valueData.item4" :radio="radio_1" index="0" :baseImg="base" :selectedImg="selectedImg"
                    class="module_5_radio"></um-radio>
          自动曝光
        </div>
        <div style="display: inline-block;position: relative">
          <um-radio style="top:7px;left:-18px;" :Judge="data.valueData.item5" :radio="radio_2" index="0" :baseImg="base" :selectedImg="selectedImg"
                    class="module_5_radio"></um-radio>
          手动曝光
        </div>
      </div>
    </div>
    <div class="___module_frame_grid_relative_right ___table-cell">
      <div style="text-align: left;margin-left:20px;">
        <div v-for="(item,index) in radio_3.values" style="display: inline-block;position: relative;margin:0 30px 0 40px;">
          <um-optionalbox style="top:7px;left:-18px;" :optionalbox="radio_3" :Judge="data.valueData.item6" :index="index" :baseImg="base"
                       :selectedImg="selectedImg" class="module_5_radio"></um-optionalbox>
          {{item}}
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
        radio_0: {
          result: {
            sign: null,
            value: null
          },
          signs: [1],
          values: ['1']
        },
        radio_1: {
          result: {
            sign: null,
            value: null
          },
          signs: [1],
          values: ['1']
        },
        radio_2: {
          result: {
            sign: null,
            value: null
          },
          signs: [1],
          values: ['1']
        },
        radio_3: {
          result: {
            sign: 0,
            value: 0
          },
          signs: [0, 1],
          values: ['否','是']
        }
      }
    },
    props: ['ipdTemplate' , 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
    watch: {
      'radio_0.result.value': function (val) {
        if(val==1){
          this.data.valueData.project=1;
        }else{
          this.data.valueData.project=0;
        }
        this.$emit('update:data');
      },
      'radio_1.result.value': function (val) {
        if(val==1){
          this.data.valueData.item4=1;
        }else{
          this.data.valueData.item4=0;
        }
        this.$emit('update:data');
      },
      'radio_2.result.value': function (val) {
        if(val==1){
          this.data.valueData.item5=1;
        }else{
          this.data.valueData.item5=0;
        }
        this.$emit('update:data');
      },
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
      },
      filteLetter(event) {
        if ((event.keyCode < 48 && event.keyCode != 8) || (event.keyCode > 57 && event.keyCode < 96) || event.keyCode > 105) {
          _preventDefault(event);
        }
      },
      toCompute(index) {
        let num1 = parseFloat(this.data.valueData.point[index].item2);
        let num2 = parseFloat(this.data.valueData.point[index].item5);

        if (!isNaN(num1) && !isNaN(num2)) {
          let result = ((num1 - num2) / num2 * 100).toFixed(2) + '%';
          this.data.valueData.point[index].item6 = result;
        } else {
          this.data.valueData.point[index].item6 = '';
        }
        ;
      }
    },
    mounted: function () {
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
