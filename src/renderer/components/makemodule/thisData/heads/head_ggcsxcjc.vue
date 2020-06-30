<template>
  <div id="head_1" class="_normalHeight_">
    <div :class="{eventCover:!headInput}"></div>
    <div class="___head_titleBox">{{data.unit}}<br>{{data.title}}</div>
    <div class="___head_sampleNumberBox">&nbsp;&nbsp;项目编号 : {{data.projectNum}}</div>
    <div class="head_1_tableBox ___relative">
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:350px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>委托单位</span>
          </div>
          <divModel v-model="data.valueData.clientUnitName" style="width: 260px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:550px;left:350px;">
          <div class="boxs block head_1_title" style="width:110px;">
            <span>委托单位地址</span>
          </div>
          <divModel v-model="data.valueData.clientUnitAddress" style="width: 440px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:205px;left:895px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>检测类型</span>
          </div>
          <divModel v-model="data.valueData.monitorType" style="width: 115px;border-right:none"
                    :Pulldown="['状态检测', '验收检测']"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:350px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>受检单位</span>
          </div>
          <divModel v-model="data.valueData.checkUnitName" style="width: 260px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:550px;left:350px;">
          <div class="boxs block head_1_title" style="width:110px;">
            <span>受检单位地址</span>
          </div>
          <divModel v-model="data.valueData.checkUnitAddress" style="width: 440px;"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
        <div class="block Full" style="width:205px;left:895px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>联系电话</span>
          </div>
          <divModel v-model="data.valueData.checkUnitPhone" style="width: 115px;border-right:none"
                    class="head_1_model moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;">
            <span>场所检测领域</span>
          </div>
          <divModel v-model="data.valueData.PlaceClassification"
                    style="width: 1000px;text-align:left;padding-left:10px;right:0;"
                    class="moduleInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative borderBottom">
        <div class="block ___relative" style="width:1100px;">
          <div class="boxs block head_1_title" style="width:90px;line-height:64px;">
            <span>检测依据</span>
          </div>
          <divModel v-model="data.valueData.standard" style="width: 1000px;padding-left:10px;right:0;"
                    class="rowsInput Full hide focusBg"></divModel>
        </div>
      </div>
      <div class="___relative">
        <div class="___relative borderBottom" style="width:985px;">
          <div class="block ___relative" style="width:175px;">
            <div class="boxs block head_1_title" style="width:90px;">
              <span>检测编号</span>
            </div>
            <divModel v-model="data.valueData.DetectionNumber" style="width: 84px;"
                      class="head_1_model moduleInput Full hide focusBg"></divModel>
          </div>
          <div class="block Full" style="width:350px;left:175px;">
            <div class="boxs block head_1_title" style="width:85px;">
              <span>检测对象</span>
            </div>
            <divModel v-model="data.valueData.objectWork" style="width: 275px;"
                      class="head_1_model moduleInput Full hide focusBg"></divModel>
          </div>
          <div class="block Full" style="width:460px;left:525px;">
            <div class="boxs block head_1_title" style="width:85px;">
              <span>检测环境</span>
            </div>
            <div class="Full borderRight" style="left:85px;width: 375px;">
              <span class="___relative" style="margin-left:10px;top:-3px;">温度</span>
              <divModel v-model="data.valueData.temperature1" style="width: 30px;height:25px;"
                        class="moduleInput hide borderBottom block focusBg"></divModel>
              <span class="___relative" style="top:-3px;">℃；&nbsp;湿度</span>
              <divModel v-model="data.valueData.humidity1" style="width: 30px;height:25px;"
                        class="moduleInput hide borderBottom block focusBg"></divModel>
              <span class="___relative" style="top:-3px;">%(RH）；大气压</span>
              <divModel v-model="data.valueData.pressure" style="width: 30px;height:25px;"
                        class="moduleInput hide borderBottom block focusBg"></divModel>
              <span class="___relative" style="top:-3px;">hPa</span>
            </div>
          </div>
        </div>
        <div class="___relative" style="width:985px;">
          <div class="block ___relative" style="width:175px;">
            <div class="boxs block head_1_title" style="width:90px;">
              <span>场所状态</span>
            </div>
            <div @click="show(0)" style="width:84px;" class="head_1_model Full">
              <div class="tc">{{data.valueData.SituationPlace}}</div>
              <div v-if="placeJudge" style="width:84px;top:32px;" class="tc instrumentSelcet2">
                <div v-for="(item,index) in optArr1" @click.stop="statr(index,0)">{{item}}</div>
              </div>
            </div>
          </div>
          <div class="block Full" style="width:175px;left:175px;">
            <div class="boxs block head_1_title" style="width:85px;">
              <span>门窗状态</span>
            </div>
            <div @click="show(1)" style="width:89px;" class="head_1_model Full">
              <div class="tc">{{data.valueData.windows}}</div>
              <div v-if="windowJudge" style="width:89px;top:32px;" class="tc instrumentSelcet2">
                <div v-for="(item,index) in optArr2" @click.stop="statr(index,1)">{{item}}</div>
              </div>
            </div>
          </div>
          <div class="block Full" style="width:175px;left:350px;">
            <div class="boxs block head_1_title" style="width:80px;">
              <span>通风情况</span>
            </div>
            <div @click="show(2)" style="width:95px;" class="head_1_model Full">
              <div class="tc">{{data.valueData.aeration}}</div>
              <div v-if="aerationJudge" style="width:95px;top:32px;" class="tc instrumentSelcet2">
                <div v-for="(item,index) in optArr3" @click.stop="statr(index,2)">{{item}}</div>
              </div>
            </div>
          </div>
          <div class="block Full" style="width:165px;left:525px;">
            <div class="boxs block head_1_title" style="width:85px;">
              <span>照明情况</span>
            </div>
            <div @click="show(3)" style="width:80px;" class="head_1_model Full">
              <div class="tc">{{data.valueData.lighting}}</div>
              <div v-if="lightingJudge" style="width:80px;top:32px;" class="tc instrumentSelcet2">
                <div v-for="(item,index) in optArr4" @click.stop="statr(index,3)">{{item}}</div>
              </div>
            </div>
          </div>
          <div class="block Full" style="width:135px;left:690px;">
            <div class="boxs block head_1_title" style="width:85px;">
              <span>区域面积</span>
            </div>
            <divModel v-model="data.valueData.region" style="width: 55px;"
                      class="head_1_model moduleInput Full hide focusBg"></divModel>
          </div>
          <div class="block Full" style="width:161px;left:825px;">
            <div class="boxs block head_1_title" style="width:85px;">
              <span>检测布点</span>
            </div>
            <div @click="show(4)" style="width:75px;" class="head_1_model Full">
              <div class="tc">{{data.valueData.DetectionPoints}}</div>
              <div v-if="LayoutJudge" style="width:75px;top:32px;" class="tc instrumentSelcet2">
                <div v-for="(item,index) in optArr5" @click.stop="statr(index,4)">{{item}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="Layout Full">
          <span class="Vertical block">布点图</span>
          <div class="___absolute" style="top:4px;left:30px;">
            <img v-if="data.valueData.DetectionPoints=='中央布点'" src="../../../../assets/icon/Layout1.png" height="55" width="80"/>
            <img v-if="data.valueData.DetectionPoints=='对称布点'" src="../../../../assets/icon/Layout2.png" height="55" width="80"/>
            <img v-if="data.valueData.DetectionPoints=='对角线布点'" src="../../../../assets/icon/Layout3.png" height="55" width="80"/>
            <img v-if="data.valueData.DetectionPoints=='梅花布点'" src="../../../../assets/icon/Layout4.png" height="55" width="80"/>
            <img v-if="data.valueData.DetectionPoints=='无'" src="../../../../assets/icon/Layout5.png" height="55" width="80"/>
          </div>
        </div>
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
  let head_1_oud = [];
  export default {
    data() {
      return {
        optArr1:['空态','静态','动态'],
        optArr2:['全部打开','部分打开','全部关闭'],
        optArr3:['自然通风','机械通风'],
        optArr4:['自然采光','人工照明'],
        optArr5:['中央布点','对称布点','对角线布点','梅花布点','无'],
        placeJudge:false,
        windowJudge:false,
        aerationJudge:false,
        lightingJudge:false,
        LayoutJudge:false,
        index_jsonString: function () {             // 获取当前模块在jsonString中的索引
          let result = this.thisPageIndex;
          for (let i = 0; i < this.pageNumber; i++) {
            result += this.showing[i].length;
          }
          return result;
        },
      }
    },
    props: ['ipdTemplate' , 'mainArr', 'auxiliaryArr', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'headInput'],
    methods: {
      show(index){
        if(index==0){
          this.placeJudge=!this.placeJudge
        }else if(index==1){
          this.windowJudge=!this.windowJudge
        }else if(index==2){
          this.aerationJudge=!this.aerationJudge;
        }else if(index==3){
          this.lightingJudge=!this.lightingJudge;
        }else if(index==4){
          this.LayoutJudge=!this.LayoutJudge;
        }
      },
      statr(index,Judge){
        if(Judge==0){
          this.placeJudge=false;
          this.data.valueData.SituationPlace=this.optArr1[index];
        }else if(Judge==1){
          this.windowJudge=false;
          this.data.valueData.windows=this.optArr2[index];
        }else if(Judge==2){
          this.aerationJudge=false;
          this.data.valueData.aeration=this.optArr3[index];
        }else if(Judge==3){
          this.lightingJudge=false;
          this.data.valueData.lighting=this.optArr4[index];
        }else if(Judge==4){
          this.LayoutJudge=false;
          this.data.valueData.DetectionPoints=this.optArr5[index];
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
      }
    },
    mounted: function () {
      if(this.$route.query.Judge!='ipdTemplate'){
        _('.__functionBox').choosable();
      }
    }
  };
</script>

<style lang="less" scoped>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
