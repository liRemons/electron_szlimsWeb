<template>
  <div :class="{___module_frame_Box:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>

    <div class="modules_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="boxs block head_1_title" style="width:90px;">
          <span>检测项目</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:90px;">
          <span class="heightCenter3" style="line-height:16px;">地面长度A<br>(m)</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:180px;">
          <span class="heightCenter3" style="line-height:16px;">地面宽度B<br>(m)</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:270px;">
          <span class="heightCenter3" style="line-height:16px;">窗户长度a<br>(m)</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:360px;">
          <span class="heightCenter3" style="line-height:16px;">窗户宽度a<br>(m)</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:450px;">
          <span class="heightCenter3" style="line-height:16px;">窗户个数<br>(n)</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:540px;">
          <span class="heightCenter3" style="line-height:16px;">检测结果<br>(k)</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:90px;left:630px;">
          <span>检测时间</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:280px;left:720px;">
          <span>检测仪器(编号)</span>
        </div>
        <div class="boxs block tc Full" style="width:100px;right:0;">
          <span>备注</span>
        </div>
      </div>
      <div class="___relative">
        <div style="width: 89px;" class="Full borderRight">
          <div class="___relative heightCenter4" style="height:32px;">
            <divModel v-model="data.valueData.TestingItems" style="width: 89px;text-align: center;line-height:16px;"
                      class="Full warp2 rowsInput2 hide focusBg"></divModel>
          </div>
        </div>
        <divModel v-model="data.valueData.LengthGround" style="width: 89px;left:90px;" class="moduleInput Full hide borderRight focusBg"></divModel>
        <divModel v-model="data.valueData.GroundWidth" style="width: 89px;left:180px;" class="moduleInput Full hide borderRight focusBg"></divModel>
        <div v-for="(item,index) in data.valueData.point" style="width: 270px;margin-left:270px;" :class="index!=(data.valueData.point.length-1) ? 'borderBottom':''" class=" ___relative">
          <divModel v-model="item.windowLength" style="width: 89px;" class="moduleInput Full hide borderRight focusBg"></divModel>
          <divModel v-model="item.windowWidth" style="width: 89px;left:90px;" class="moduleInput Full hide borderRight focusBg"></divModel>
          <divModel v-model="item.windowNum" style="width: 89px;right:0;" class="moduleInput Full hide borderRight focusBg"></divModel>
          &nbsp;
        </div>
        <divModel v-model="data.valueData.detectionResult" style="width: 89px;left:540px;" class="moduleInput Full hide borderRight focusBg"></divModel>
        <divModel v-model="data.valueData.DetectionEvent" style="width: 89px;left:630px;" class="moduleInput Full hide borderRight focusBg"></divModel>
        <div style="width: 279px;left:720px;" class="Full borderRight">
          <div class="___relative heightCenter4" style="height:32px;">
            <divModel v-model="data.valueData.TestingInstrument" style="width: 279px;text-align: center;line-height:16px;"
                      class="Full warp2 rowsInput2 hide focusBg"></divModel>
          </div>
        </div>
        <divModel v-model="data.valueData.Remarks" style="width: 99px;right:0;" class="moduleInput Full hide focusBg"></divModel>
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
      increase() {
        let obj = {
          windowLength:"",
          windowWidth:"",
          windowNum:""
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
