<template>
  <div id="head_1" class="_normalHeight_">
    <div :class="{eventCover:!headInput}"></div>
    <div class="___head_titleBox">{{data.unit}}<br>{{data.title}}</div>
    <div class="___head_sampleNumberBox">&nbsp;&nbsp;项目编号 : {{data.projectNum}}</div>
    <div class="head_1_tableBox">
      <div class="head_1_row_1">
        <div class="head_1_row1_key1">受检单位名称</div>
        <div class="head_1_row1_val1">
          <divModel class="_normalInput_" v-model="data.valueData.checkUnitName"></divModel>
        </div>
        <div class="head_1_row1_key2">检测类型</div>
        <div class="head_1_row1_val2">
          <divModel class="_normalInput_" v-model="data.valueData.monitorType"></divModel>
        </div>
        <div class="head_1_row1_key3">测量时间</div>
        <div class="head_1_row1_val3">{{data.valueData.measuretime}}</div>
      </div>
      <div class="head_1_row_1">
        <div class="head_1_row1_key1">受检单位地址</div>
        <div class="head_1_row1_val1">
          <divModel class="_normalInput_" v-model="data.valueData.checkUnitAddress"></divModel>
        </div>
        <div class="head_1_row1_key2">受检设备名称</div>
        <div class="head_1_row1_val2">
          <divModel class="_normalInput_" v-model="data.valueData.checkDeviceName"></divModel>
        </div>
        <div class="head_1_row1_key3">受检设备型号</div>
        <div class="head_1_row1_val3">
          <divModel class="_normalInput_" v-model="data.valueData.checkDeviceModel"></divModel>
        </div>
      </div>
      <div class="head_1_row_1">
        <div class="head_1_row1_key1">检测地点</div>
        <div class="head_1_row1_val1">
          <divModel class="_normalInput_" v-model="data.valueData.address"></divModel>
        </div>
        <div class="head_1_row1_key2">受检设备编号</div>
        <div class="head_1_row1_val2">
          <divModel class="_normalInput_" v-model="data.valueData.checkDeviceNum"></divModel>
        </div>
        <div class="head_1_row1_key3">X射线管编号</div>
        <div class="head_1_row1_val3">
          <divModel class="_normalInput_" v-model="data.valueData.xRayNum"></divModel>
        </div>
      </div>
      <div class="head_1_row_2 ___table">
        <div class="head_1_row2_key1 ___table-cell">主要检测仪器</div>
        <div @click="show(0)" class="head_1_row2_val1 ___table-cell ___relative" style="line-height:18px;width: 158px;">
          <div class="warp">{{data.valueData.devices[0].name}}</div>
          <div v-if="mainJudge" class="instrumentSelcet">
            <div v-for="(item,index) in mainArr" @click.stop="statr(index,0)">{{item.name}}</div>
          </div>
        </div>
        <div class="head_1_row2_key1 ___table-cell">辅助检测仪器</div>
        <div @click="show(1)" class="head_1_row2_val1 ___table-cell ___relative" style="line-height:18px;width: 159px;">
          <div class="warp">{{data.valueData.devices[1].name}}</div>
          <div v-if="auxiliaryJudge" class="instrumentSelcet">
            <div v-for="(item,index) in auxiliaryArr" @click.stop="statr(index,1)">{{item.name}}</div>
          </div>
        </div>

        <div class="head_1_row2_key2" style="width: 99px;">
          <div class="head_1_bottomLine">受检设备厂家</div>
          <div>检测场所</div>
        </div>
        <div class="head_1_row2_val2">
          <div class="head_1_bottomLine">
            <divModel class="_normalInput_" v-model="data.valueData.checkDeviceVender"></divModel>
          </div>
          <div>
            <divModel class="_normalInput_" v-model="data.valueData.place"></divModel>
          </div>
        </div>
        <div class="head_1_row2_key3">
          <div class="head_1_bottomLine">额定容量</div>
          <div>环境温/湿度</div>
        </div>
        <div class="head_1_row2_val3">
          <div class="head_1_bottomLine">
            <!-- <input type="text" class="_normalInput_" v-model="data.valueData['额定容量']"> -->
            <divModel style="height:20px;" class="head_1_smollInput ___smollInput inputBlock"
                      v-model="data.valueData.nominalCapacity"></divModel>
            kV&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;<divModel style="height:20px;" class="inputBlock head_1_smollInput ___smollInput inputFloat"
                                                       v-model="data.valueData.nominalCapacity1"></divModel>
            >mA
          </div>
          <div>
            <divModel class="head_1_smollInput ___smollInput inputBlock"
                      v-model="data.valueData.temperature"></divModel>
            ℃&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;<divModel class="head_1_smollInput ___smollInput inputBlock"
                                                      v-model="data.valueData.humidity"></divModel>
          </div>
        </div>
      </div>
      <div class="head_1_row_1">
        <div class="head_1_row1_key1">检测依据</div>
        <div class="head_1_row1_val1">
          <divModel class="_normalInput_" v-model="data.valueData.standard"></divModel>

        </div>
        <div class="head_1_row1_key2">自照曝光控制</div>
        <div class="head_1_row1_val4">
          <divModel class="_normalInput_" v-model="data.valueData.exposureControl"></divModel>
        </div>
      </div>
      <div class="___module_frame_Box" style="font-weight:900; font-size:16px;border:none;">
        <div class="___nodule_frame_grid_left">检测项目</div>
        <div class="___nodule_frame_grid_middle ___absolute">检测结果</div>
        <div class="___nodule_frame_grid_right ___absolute">计算结果</div>
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
        index_jsonString: function () {             // 获取当前模块在jsonString中的索引
          let result = this.thisPageIndex;
          for (let i = 0; i < this.pageNumber; i++) {
            result += this.showing[i].length;
          }
          return result;
        },
        selectedImg: require('../../../../assets/icon/sign_choosed.png'),
        base: require('../../../../assets/icon/checkbox_back.png'),
        mainId:"",
        auxiliaryid:"",
        mainJudge:false,
        auxiliaryJudge:false
      }
    },
    props: [ 'ipdTemplate' , 'mainArr','auxiliaryArr','data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'headInput'],
    methods: {
      show(index){
        if(index==0){
          this.mainJudge=!this.mainJudge
        }else{
          this.auxiliaryJudge=!this.auxiliaryJudge
        }
      },
      statr(index,Judge){
        let _that = this;
        let id="",id2="";
        if(Judge==0){
          if(_that.data.valueData.devices[0].name!=_that.mainArr[index].name){
            _that.data.valueData.devices[0].name=_that.mainArr[index].name;
            _that.data.valueData.devices[0].id=_that.mainArr[index].id;
            _that.mainJudge=!_that.mainJudge;
            id=_that.mainArr[index].id;
            id2=_that.mainId;
          }else{
            _that.data.valueData.devices[0].name="";
            _that.data.valueData.devices[0].id="";
            _that.mainJudge=!_that.mainJudge;
            id="";
            id2=_that.mainId;
          }
        }else{
          if(_that.data.valueData.devices[1].name!=_that.auxiliaryArr[index].name){
            _that.data.valueData.devices[1].name=_that.auxiliaryArr[index].name;
            _that.data.valueData.devices[1].id=_that.auxiliaryArr[index].id;
            _that.auxiliaryJudge=!_that.auxiliaryJudge;
            id=_that.auxiliaryArr[index].id;
            id2=_that.auxiliaryid;
          }else{
            _that.data.valueData.devices[1].name="";
            _that.data.valueData.devices[1].id="";
            _that.auxiliaryJudge=!_that.auxiliaryJudge;
            id="";
            id2=_that.auxiliaryid;
          }
        }
        _that.$http.post('http://xtroms.com:2222/updateUseStateTwoDeviceId', {
          deviceId: id2,
          deviceId1: id,
        }).then(function (res) {
          if (res.status == 200) {
            if(Judge==0){
              _that.mainId=id;
            }else{
              _that.auxiliaryid=id;
            }
            _that.$emit('update:data');
          }
        }).catch(function (error) {
          console.log(error);
        });
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

<style>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
