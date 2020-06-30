<template>
  <div id="project_bzc"
       :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      <div style="position: relative">
        <um-radio :radio="radio_0" :Judge="data.valueData.project" index="0" :baseImg="base" style="position: absolute;top:7px;"
                  :selectedImg="selectedImg" class="project_xpczsyzz_cb_0 nodule_1_name"></um-radio>
        &nbsp;&nbsp;&nbsp;
        自动曝光控制重复性
      </div>
    </div>

    <div class="___module_frame_grid_relative_middle">
      <div class="project_bzc_box" style="text-align:left">
        &nbsp;&nbsp;&nbsp;
        选择AEC条件曝光，检测条件:<divModel style="height:20px;" class="inputBlock project_bzc_smollInput ___smollInput" v-model="data.valueData.item1"></divModel> kV
        （常用），靶/滤过<divModel style="height:20px;" class="inputBlock project_bzc_smollInput ___smollInput" v-model="data.valueData.item3"></divModel>(常用)
      </div>


      <div class="project_zdbgkzcfx_box">
        <div class="project_zdbgkzcfx_cellBox1">序号</div>
        <div class="project_zdbgkzcfx_cellBox2" style="left:16%">1</div>
        <div class="project_zdbgkzcfx_cellBox2" style="left:30%">2</div>
        <div class="project_zdbgkzcfx_cellBox2" style="left:44%">3</div>
        <div class="project_zdbgkzcfx_cellBox2" style="left:58%">4</div>
        <div class="project_zdbgkzcfx_cellBox2" style="left:72%">5</div>
        <div class="project_zdbgkzcfx_cellBox2 rightBottom" style="right:0;text-align: center;">平均值</div>
      </div>


      <div class="project_bzc_box">
        <div class="project_zdbgkzcfx_box hideBottom">
          <div class="___relative">
            <div class="project_zdbgkzcfx_cellBox1">
              {{data.valueData.point[0].item1}}
            </div>
            <div style="left:16%" class="project_zdbgkzcfx_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[0].item2" @keydown="filteLetter" @input="toCompute(0)"></divModel>
            </div>
            <div style="left:30%" class="project_zdbgkzcfx_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[0].item3" @keydown="filteLetter" @input="toCompute(0)"></divModel>
            </div>
            <div style="left:44%" class="project_zdbgkzcfx_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[0].item4" @keydown="filteLetter" @input="toCompute(0)"></divModel>
            </div>
            <div style="left:58%" class="project_zdbgkzcfx_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[0].item5" @keydown="filteLetter" @input="toCompute(0)"></divModel>
            </div>
            <div style="left:72%" class="project_zdbgkzcfx_cellBox2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[0].item6" @keydown="filteLetter" @input="toCompute(0)"></divModel>
            </div>
            <div style="right:0;" class="rightBottom project_zdbgkzcfx_cellBox2">
              {{data.valueData.point[0].item7}}
            </div>
          </div>
        </div>
      </div>
      <div class="project_bzc_box hideBottom">
        <div class="project_zdbgkzcfx_box hideBottom">
          <div class="___relative">
            <div class="project_zdbgkzcfx_cellBox1">
              {{data.valueData.point[1].item1}}&nbsp;
            </div>
            <div style="left:16%" class="project_zdbgkzcfx_cellBox2">
              {{data.valueData.point[1].item2}}&nbsp;
            </div>
            <div style="left:30%" class="project_zdbgkzcfx_cellBox2">
              {{data.valueData.point[1].item3}}&nbsp;
            </div>
            <div style="left:44%" class="project_zdbgkzcfx_cellBox2">
              {{data.valueData.point[1].item4}}&nbsp;
            </div>
            <div style="left:58%" class="project_zdbgkzcfx_cellBox2">
              {{data.valueData.point[1].item5}}&nbsp;
            </div>
            <div style="left:72%" class="project_zdbgkzcfx_cellBox2">
              {{data.valueData.point[1].item6}}&nbsp;
            </div>
            <div style="right:0;" class="rightBottom project_zdbgkzcfx_cellBox2">
              {{data.valueData.point[1].item7}}&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="___nodule_frame_grid_right ___table-cell">
      <div style="text-align: left;margin-left:20px;">
        <div>
          自动曝光控制重复性<divModel class="project_bzc_smollInput ___smollInput inputBlock" style="height:25px;" v-model="data.valueData.item2"></divModel> %
        </div>
        注：结果取与平均值偏差最大值
        <br>
        <img src="../../../../assets/icon/cfx.png" height="41" width="203"/>
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
          signs: [0, 1],              //定义单选框结果值的序号
          values: [1, 2]        //定义单选框结果值     ***结果值绝对不能有重复
        },
      }
    },
    props: ['ipdTemplate' , 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
    watch: {
      'radio_0.result.value': function (val) {
        if (val == 1) {
          this.data.valueData.project = 1;
        } else {
          this.data.valueData.project = 0;
        }
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
      noPress(event) {
        event.target.blur();
      },
      filteLetter(event) {
        if ((event.keyCode < 48 && event.keyCode != 8) || (event.keyCode > 57 && event.keyCode < 96) || event.keyCode > 105) {
          _preventDefault(event);
        }
      },
      toCompute(index) {
        let num1 = parseFloat(this.data.valueData.point[index].item2);
        let num2 = parseFloat(this.data.valueData.point[index].item3);
        let num3 = parseFloat(this.data.valueData.point[index].item4);
        let num4 = parseFloat(this.data.valueData.point[index].item5);
        let num5 = parseFloat(this.data.valueData.point[index].item6);

        if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3) && !isNaN(num4) && !isNaN(num5)) {
          this.data.valueData.point[index].item7 = ((num1 + num2 + num3 + num4 + num5) / 5).toFixed(2);
          let average=this.data.valueData.point[index].item7;
          this.data.valueData.point[1].item2=(((num1-average)/average)*100).toFixed(2);
          this.data.valueData.point[1].item3=(((num2-average)/average)*100).toFixed(2);
          this.data.valueData.point[1].item4=(((num3-average)/average)*100).toFixed(2);
          this.data.valueData.point[1].item5=(((num4-average)/average)*100).toFixed(2);
          this.data.valueData.point[1].item6=(((num5-average)/average)*100).toFixed(2);
          this.data.valueData.point[1].item7="0.00";
          this.data.valueData.item2=Math.max(this.data.valueData.point[1].item2,this.data.valueData.point[1].item3,this.data.valueData.point[1].item4,this.data.valueData.point[1].item5,this.data.valueData.point[1].item6)
        }
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
