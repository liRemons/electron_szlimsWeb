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
          <div class="boxs block head_1_title Full" style="width:120px;left:175px;">
            <div style="width:100%;line-height:15px;" class="borderBottom">
              <span>风管(口)</span>
            </div>
            <div class="___relative">
              <div style="width: 55px;line-height:17px;" class="borderRight">
                <span>形状</span>
              </div>
              <div style="width: 65px;line-height:17px;right:0;" class="Full">
                <span>面积Sm2</span>
              </div>
            </div>
          </div>
          <div style="width: 250px;margin-left:295px;" class="tc borderRight">
            <span>测点风速Vm/s</span>
          </div>
        </div>
        <div class="boxs block head_1_title Full" style="width:55px;left:545px;">
          <span class="heightCenter3">修正值</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:45px;left:600px;">
          <span class="heightCenter3" style="line-height:16px;">新风温<br>度/℃</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:55px;left:645px;">
          <span class="heightCenter3" style="line-height:16px;">服务区人<br>数P/人</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:60px;left:700px;">
          <span class="heightCenter3" style="line-height:16px;">新风量Q<br>m3/(人•h)</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:60px;left:760px;">
          <span class="heightCenter3">检测时间</span>
        </div>
        <div class="boxs block head_1_title Full" style="width:180px;left:820px;">
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
        <div v-for="(item,index) in data.valueData.point" style="width: 555px;margin-left:89px;" :class="index!=(data.valueData.point.length-1) ? 'borderBottom':''" class=" ___relative borderRight">
          <div style="width: 85px;" class="Full borderRight">
            <div class="___relative heightCenter4" style="height:32px;">
              <divModel v-model="item.LocationDetection" style="width: 85px;text-align: center;line-height:16px;" class="Full warp2 rowsInput2 hide focusBg"></divModel>
            </div>
          </div>
          <div style="width: 55px;left:86px;" class="Full borderRight">
            <div class="___relative heightCenter4">
              <divModel v-model="item.shape" style="width: 55px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
            </div>
          </div>
          <div style="width: 60px;left:145px;" class="Full borderRight">
            <div class="___relative heightCenter4">
              <divModel style="width: 60px;" v-model="item.area" class="moduleInput Full borderRight hide focusBg"></divModel>&nbsp;
            </div>
          </div>
          <div style="width: 251px;margin-left:205px;" class="___relative borderRight">
            <div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>1</span>
                </div>
                <divModel v-model="item.val.v1" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>2</span>
                </div>
                <divModel v-model="item.val.v2" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>3</span>
                </div>
                <divModel v-model="item.val.v3" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative">
                <div style="width:20px;" class="borderRight tc">
                  <span>4</span>
                </div>
                <divModel v-model="item.val.v4" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
            </div>
            <div class="Full" style="left:63px">
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>5</span>
                </div>
                <divModel v-model="item.val.v5" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>6</span>
                </div>
                <divModel v-model="item.val.v6" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>7</span>
                </div>
                <divModel v-model="item.val.v7" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative">
                <div style="width:20px;" class="borderRight tc">
                  <span>8</span>
                </div>
                <divModel v-model="item.val.v8" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
            </div>
            <div class="Full" style="left:126px">
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>9</span>
                </div>
                <divModel v-model="item.val.v9" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>10</span>
                </div>
                <divModel v-model="item.val.v10" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>11</span>
                </div>
                <divModel v-model="item.val.v11" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative">
                <div style="width:20px;" class="borderRight tc">
                  <span>12</span>
                </div>
                <divModel v-model="item.val.v12" style="width: 40px;right: 0" class="moduleInput Full hide borderRight focusBg"></divModel>
              </div>
            </div>
            <div class="Full" style="right: 0">
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>13</span>
                </div>
                <divModel v-model="item.val.v13" style="width: 40px;right: 0" class="moduleInput Full hide focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>14</span>
                </div>
                <divModel v-model="item.val.v14" style="width: 40px;right: 0" class="moduleInput Full hide focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative borderBottom">
                <div style="width:20px;" class="borderRight tc">
                  <span>15</span>
                </div>
                <divModel v-model="item.val.v15" style="width: 40px;right: 0" class="moduleInput Full hide focusBg"></divModel>
              </div>
              <div style="width: 62px;" class="___relative">
                <div style="width:20px;" class="borderRight tc">
                  <span>16</span>
                </div>
                <divModel v-model="item.val.v16" style="width: 40px;right: 0" class="moduleInput Full hide focusBg"></divModel>
              </div>
            </div>
          </div>
          <div style="width: 55px;left:455px;" class="Full borderRight">
            <div class="___relative heightCenter4">
              <divModel v-model="data.valueData.TestingItems" style="width: 55px;text-align: center;" class="Full moduleInput hide focusBg"></divModel>&nbsp;
            </div>
          </div>
        </div>
        <div style="width: 55px;left:644px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.LocationDetection" style="width: 55px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div style="width: 60px;left:699px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.LocationDetection" style="width: 60px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div style="width: 60px;left:759px;" class="Full borderRight">
          <div class="___relative heightCenter4">
            <divModel v-model="data.valueData.LocationDetection" style="width: 60px;" class="moduleInput Full hide focusBg"></divModel>&nbsp;
          </div>
        </div>
        <div style="width:179px;left:820px;" class="Full borderRight">
          <div class="___relative heightCenter4" style="height:32px;">
            <divModel v-model="data.valueData.TestingItems" style="width: 179px;text-align: center;line-height:16px;" class="Full warp2 rowsInput2 hide focusBg"></divModel>
          </div>
        </div>
        <div style="width: 100px;right: 0" class="Full">
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
      increase(){
        let obj={
          LocationDetection:"",
          shape:"",
          area:"",
          val:{
            v1:"",
            v2:"",
            v3:"",
            v4:"",
            v5:"",
            v6:"",
            v7:"",
            v8:"",
            v9:"",
            v10:"",
            v11:"",
            v12:"",
            v13:"",
            v14:"",
            v15:"",
            v16:"",
          }
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
