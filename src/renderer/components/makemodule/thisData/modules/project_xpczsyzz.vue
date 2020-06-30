<template>
  <div id="project_xpczsyzz"
       :class="{___module_frame_Box:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left">
      <um-radio :radio="radio_0" :Judge="data.valueData.project" index="0" :baseImg="base" :selectedImg="selectedImg"
                class="project_xpczsyzz_cb_0 nodule_1_name"></um-radio>
      胸壁侧照射野准直
    </div>
    <div class="___nodule_frame_grid_middle ___absolute">
      <um-radio :radio="radio_1" :Judge="data.valueData.item1" index="0" :baseImg="base" :selectedImg="selectedImg"
                class="project_xpczsyzz_cb_1 nodule_1_name"></um-radio>
      <div class="project_xpczsyzz_text1">
        超出台边, 超出距离
        <divModel class="project_xpczsyzz_smollInput ___smollInput inputBlock" style="height:21px;"
                  v-model="data.valueData.item2"></divModel>
        mm
      </div>
      <um-radio :radio="radio_2" :Judge="data.valueData.item3" index="1" :baseImg="base" :selectedImg="selectedImg"
                class="project_xpczsyzz_cb_2 nodule_1_name"></um-radio>
      <div class="project_xpczsyzz_text2">未超出台边</div>
    </div>
    <div class="___nodule_frame_grid_right ___absolute"></div>

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
          result: {      //单选框结果json
            sign: null,           //结果值的序号
            value: null           //结果值
          },
          signs: [0],              //定义单选框结果值的序号
          values: [1]        //定义单选框结果值     ***结果值绝对不能有重复
        },
        radio_1: {
          result: {      //单选框结果json
            sign: null,           //结果值的序号
            value: null           //结果值
          },
          signs: [0, 1],              //定义单选框结果值的序号
          values: [1, 2]        //定义单选框结果值     ***结果值绝对不能有重复
        },
        radio_2: {
          result: {      //单选框结果json
            sign: null,           //结果值的序号
            value: null           //结果值
          },
          signs: [0, 1],              //定义单选框结果值的序号
          values: [1, 2]        //定义单选框结果值     ***结果值绝对不能有重复
        }
      }
    },
    props: ['ipdTemplate' , 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
    watch: {
      'radio_0.result.value': function (val) {
        if (!val) {
          this.data.valueData.project = 0;
        } else {
          this.data.valueData.project = 1;
        }
        this.$emit('update:data');
      },
      'radio_1.result.value': function (val) {
        if (val == 1) {
          this.data.valueData.item1 = 1;
          this.data.valueData.item3 = 0;
        } else if (val == 0) {
          this.data.valueData.item1 = 0;
          this.data.valueData.item3 = 1;
        } else {
          this.data.valueData.item1 = 0;
          this.data.valueData.item3 = 0;
        }
        this.$emit('update:data');
      },
      'radio_2.result.value': function (val) {
        console.log(val)
        if (val == 1) {
          this.data.valueData.item3 = 1;
          this.data.valueData.item1 = 0;
        } else if (val == 0) {
          this.data.valueData.item3 = 0;
          this.data.valueData.item1 = 1;
        } else {
          this.data.valueData.item3 = 0;
          this.data.valueData.item1 = 0;
        }
        this.$emit('update:data');
      },
      // 'data.valueData.检测结果.超出台边.value':function(val){
      // 	this.$emit('update:data');
      // }
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
      _('.nodule_1_name').center('h');
      if(this.$route.query.Judge!='ipdTemplate'){
        _('.__functionBox').choosable();
      }
    }
  };
</script>

<style>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
