<template>
  <div
    :class="{___module_frame_Box:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="modules_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:366px;">
          <span>样品号/样品名称</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:366px;left:366px;">
          <span class="heightCenter3">分析项</span>
        </div>
        <div class="boxs block tc ___absolute Full" style="width:366px;right:0;">
          <span class="heightCenter3">报告结果</span>
        </div>
      </div>
      <div class="___relative" :class="index!=(data.valueData.point.length-1) ? 'borderBottom':''" v-for="(item,index) in data.valueData.point">
        <divModel v-model="item.item1" style="width:365px;"
                  class="borderRight moduleInput Full hide focusBg"></divModel>
        <divModel v-model="item.item2" style="width:365px;left:366px;"
                  class="borderRight moduleInput Full hide focusBg"></divModel>
        <divModel v-model="item.item3" style="width:366px;right:0;"
                  class="moduleInput Full hide focusBg"></divModel>
        &nbsp;
      </div>
    </div>


    <div class="__functionBox" v-show="!isTemplate">   <!-- ******** 功能模块 ********** -->
      <div v-if="ipdTemplate!='ipdTemplate'">
        <div class="__functionCover1"></div>
        <div class="__functionCover2"></div>
        <div class="__functionCover3" v-show="index_jsonString()==0"></div>
        <div class="__functionCover4" v-show="data.isHead || index_jsonString()==jsonString.length-1"></div>
        <!--      <div class="__functionButton1" @click="toHigh"></div>              &lt;!&ndash; 放大行高 &ndash;&gt;-->
        <!--      <div class="__functionButton2" @click="toShort"></div>              &lt;!&ndash; 缩小行高 &ndash;&gt;-->
        <div class="__functionButton3" @click="toUpModule"></div>           <!-- 提高一行 -->
        <div class="__functionButton4" @click="toDownModule"></div>         <!-- 下降行高 -->
        <div class="__functionButton5" @click="toDeleteModule"></div>       <!-- 删除模块 -->
      </div>
      <div v-if="ipdTemplate=='ipdTemplate'" class="__functionButton6" @click="increase">
        <span>+</span>
      </div>       <!--增加一行 -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        correctArr: ['修正系数', '修正值'],
        correctJudge: false,
        index_jsonString: function () {             // 获取当前模块在jsonString中的索引
          let result = this.thisPageIndex;
          for (let i = 0; i < this.pageNumber; i++) {
            result += this.showing[i].length;
          }
          return result;
        },
      }
    },
    props: ['data', 'ipdTemplate' , 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
    methods: {
      show(index) {
        if (index == 0) {
          this.correctJudge = !this.correctJudge
        }
      },
      statr(index, Judge) {
        if (Judge == 0) {
          this.correctJudge = false;
          this.data.valueData.correct = this.correctArr[index];
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
      increase() {
        let obj = {
          item1:"",
          item2:"",
          item3:"",
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
