<template>
  <div
    id="project_gdyzsdpl"
    :class="{
      ___module_frame_Box: true,
      ___table: true,
      _normalHeight_: data.height._normal.carried,
      _shortHeight_: !data.height._normal.carried
    }"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <div
      class="___nodule_frame_grid_left ___table-cell"
      :id="data.valueData.testProjectId"
    >
      管电压指示的偏离
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="project_gdyzsdpl_box">
        <div class="project_gdyzsdpl_cellBox1" style="border-top: none;">
          标称值 ( kV )
        </div>
        <div class="project_gdyzsdpl_cellBox2" style="border-top: none;">
          测量值 ( kV )
        </div>
        <div class="project_gdyzsdpl_cellBox3" style="border-top: none;">
          校准平均值 ( kV )
        </div>
        <div class="project_gdyzsdpl_cellBox4" style="border-top: none;">
          偏差 ( kV )
        </div>
      </div>

      <div class="project_gdyzsdpl_box">
        <div class="project_gdyzsdpl_cellBox1 ___table">
          <div class="molule3_tableSign_left ___table-cell">
            <um-radio
              :radio="radio_0"
              :Judge="data.valueData.point[0].project"
              index="0"
              :baseImg="base"
              :selectedImg="selectedImg"
              class="project_gdyzsdpl_radio"
            ></um-radio>
            &nbsp;&nbsp;大焦点
          </div>
          <div
            class="___shadowBottom"
            v-for="(val, index) in data.valueData.point[0].pointdata"
          >
            <divModel
              style="width:54px;"
              class="hide"
              :class="{
                _normalInput_: data.height._normal.carried,
                _shortInput_: !data.height._normal.carried
              }"
              v-model="data.valueData.point[0].pointdata[index].item1"
              @input="toCompute(0, index)"
            ></divModel>
          </div>
        </div>
        <div class="project_gdyzsdpl_cellBox2">
          <div
            class="___shadowBottom ___relative"
            v-for="(val, index) in data.valueData.point[0].pointdata"
          >
            <div class="module_position1 hide">
              <divModel
                :class="{
                  _normalInput_: data.height._normal.carried,
                  _shortInput_: !data.height._normal.carried
                }"
                v-model="data.valueData.point[0].pointdata[index].item2"
                @input="toCompute(0, index)"
              ></divModel>
            </div>
            <div class="module_position2 hide">
              <divModel
                :class="{
                  _normalInput_: data.height._normal.carried,
                  _shortInput_: !data.height._normal.carried
                }"
                v-model="data.valueData.point[0].pointdata[index].item3"
                @input="toCompute(0, index)"
              ></divModel>
            </div>
            <div class="module_position3 hide">
              <divModel
                :class="{
                  _normalInput_: data.height._normal.carried,
                  _shortInput_: !data.height._normal.carried
                }"
                v-model="data.valueData.point[0].pointdata[index].item4"
                @input="toCompute(0, index)"
              ></divModel>
            </div>
          </div>
        </div>
        <div class="project_gdyzsdpl_cellBox3">
          <div
            class="___shadowBottom"
            v-for="(val, index) in data.valueData.point[0].pointdata"
          >
            {{ data.valueData.point[0].pointdata[index].item5 }}&nbsp;
          </div>
        </div>
        <div class="project_gdyzsdpl_cellBox4">
          <div
            class="___shadowBottom"
            v-for="(val, index) in data.valueData.point[0].pointdata"
          >
            {{ data.valueData.point[0].pointdata[index].item6 }}&nbsp;
          </div>
        </div>
      </div>

      <div class="project_gdyzsdpl_box">
        <div class="project_gdyzsdpl_cellBox1 ___table">
          <div class="molule3_tableSign_left ___table-cell">
            <um-radio
              :radio="radio_1"
              :Judge="data.valueData.point[1].project"
              index="0"
              :baseImg="base"
              :selectedImg="selectedImg"
              class="project_gdyzsdpl_radio"
            ></um-radio>
            &nbsp;&nbsp;小焦点
          </div>
          <div
            class="___shadowBottom"
            v-for="(val, index) in data.valueData.point[1].pointdata"
          >
            <divModel
              style="width:54px;"
              class="hide"
              :class="{
                _normalInput_: data.height._normal.carried,
                _shortInput_: !data.height._normal.carried
              }"
              v-model="data.valueData.point[1].pointdata[index].item1"
              @input="toCompute(1, index)"
            ></divModel>
          </div>
        </div>
        <div class="project_gdyzsdpl_cellBox2">
          <div
            class="___shadowBottom ___relative"
            v-for="(val, index) in data.valueData.point[1].pointdata"
          >
            <div class="module_position1">
              <divModel
                :class="{
                  _normalInput_: data.height._normal.carried,
                  _shortInput_: !data.height._normal.carried
                }"
                v-model="data.valueData.point[1].pointdata[index].item2"
                @input="toCompute(1, index)"
              ></divModel>
            </div>
            <div class="module_position2">
              <divModel
                :class="{
                  _normalInput_: data.height._normal.carried,
                  _shortInput_: !data.height._normal.carried
                }"
                v-model="data.valueData.point[1].pointdata[index].item3"
                @input="toCompute(1, index)"
              ></divModel>
            </div>
            <div class="module_position3">
              <divModel
                :class="{
                  _normalInput_: data.height._normal.carried,
                  _shortInput_: !data.height._normal.carried
                }"
                v-model="data.valueData.point[1].pointdata[index].item4"
                @input="toCompute(1, index)"
              ></divModel>
            </div>
          </div>
        </div>
        <div class="project_gdyzsdpl_cellBox3">
          <div
            class="___shadowBottom"
            v-for="(val, index) in data.valueData.point[1].pointdata"
          >
            {{ data.valueData.point[1].pointdata[index].item5 }}&nbsp;
          </div>
        </div>
        <div class="project_gdyzsdpl_cellBox4">
          <div
            class="___shadowBottom"
            v-for="(val, index) in data.valueData.point[1].pointdata"
          >
            {{ data.valueData.point[1].pointdata[index].item6 }}&nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="___nodule_frame_grid_right ___table-cell">
      {{ data.valueData["计算结果"] }}
    </div>

    <div
      class="__functionBox"
      v-if="ipdTemplate != 'ipdTemplate'"
      v-show="!isTemplate"
    >
      <!-- ******** 功能模块 ********** -->
      <div
        class="__functionCover1"
        v-show="data.height._normal.carried || data.isHead"
      ></div>
      <div
        class="__functionCover2"
        v-show="!data.height._normal.carried || data.isHead"
      ></div>
      <div class="__functionCover3" v-show="index_jsonString() == 0"></div>
      <div
        class="__functionCover4"
        v-show="data.isHead || index_jsonString() == jsonString.length - 1"
      ></div>
      <div class="__functionButton1" @dblclick="toHigh"></div>
      <!-- 放大行高 -->
      <div class="__functionButton2" @dblclick="toShort"></div>
      <!-- 缩小行高 -->
      <div class="__functionButton3" @dblclick="toUpModule"></div>
      <!-- 提高一行 -->
      <div class="__functionButton4" @dblclick="toDownModule"></div>
      <!-- 下降行高 -->
      <div class="__functionButton5" @dblclick="toDeleteModule"></div>
      <!-- 删除模块 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index_jsonString: function() {
        // 获取当前模块在jsonString中的索引
        let result = this.thisPageIndex;
        for (let i = 0; i < this.pageNumber; i++) {
          result += this.showing[i].length;
        }
        return result;
      },
      selectedImg: require("../../../../assets/icon/sign_choosed.png"),
      base: require("../../../../assets/icon/checkbox_back.png"),
      radio_0: {
        result: {
          //单选框结果json
          sign: null, //结果值的序号
          value: null //结果值
        },
        signs: [0], //定义单选框结果值的序号
        values: [1] //定义单选框结果值     ***结果值绝对不能有重复
      },
      radio_1: {
        result: {
          //单选框结果json
          sign: null, //结果值的序号
          value: null //结果值
        },
        signs: [0], //定义单选框结果值的序号
        values: [1] //定义单选框结果值     ***结果值绝对不能有重复
      }
    };
  },
  props: [
    "ipdTemplate",
    "data",
    "pageNumber",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput"
  ],
  watch: {
    "radio_0.result.value": function(val) {
      if (val == 1) {
        this.data.valueData.point[0].project = 1;
      } else {
        this.data.valueData.point[0].project = 0;
      }
      this.$emit("update:data");
    },
    "radio_1.result.value": function(val) {
      if (val == 1) {
        this.data.valueData.point[1].project = 1;
      } else {
        this.data.valueData.point[1].project = 0;
      }
      this.$emit("update:data");
    }
  },
  methods: {
    toHigh() {
      this.data.height._normal.carried = true;
      this.data.height._short.carried = false;
      this.watchSign._high += 1;
      this.$emit("update:jsonString");
      this.$emit("update:watchSign");
    },
    toShort() {
      this.data.height._normal.carried = false;
      this.data.height._short.carried = true;
      this.watchSign._short += 1;
      this.$emit("update:jsonString");
      this.$emit("update:watchSign");
    },
    toUpModule() {
      let index = this.index_jsonString();
      if (index != 0) {
        _transposition(this.jsonString, index, index - 1);
        this.$emit("update:jsonString");
        this.watchSign._down += 1;
        this.$emit("update:watchSign");
      }
    },
    toDownModule() {
      let index = this.index_jsonString();
      if (index != this.jsonString.length - 1) {
        _transposition(this.jsonString, index, index + 1);
        this.$emit("update:jsonString");
        this.watchSign._down += 1;
        this.$emit("update:watchSign");
      }
    },
    toDeleteModule() {
      let index = this.index_jsonString();

      this.jsonString.splice(index, 1);
      this.$emit("update:jsonString");
      this.watchSign._delete += 1;
      this.$emit("update:watchSign");
    },
    noPress(event) {
      event.target.blur();
    },
    toCompute(key, index) {
      let num1 = parseFloat(
        this.data.valueData.point[key].pointdata[index].item2
      );
      let num2 = parseFloat(
        this.data.valueData.point[key].pointdata[index].item3
      );
      let num3 = parseFloat(
        this.data.valueData.point[key].pointdata[index].item4
      );

      if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)) {
        let result = parseInt(((num1 + num2 + num3) / 3) * 100) / 100;
        this.data.valueData.point[key].pointdata[index].item5 = result;
        let numSign = parseFloat(
          this.data.valueData.point[key].pointdata[index].item1
        );
        if (!isNaN(numSign)) {
          this.data.valueData.point[key].pointdata[index].item6 = (
            result - numSign
          ).toFixed(2);
        }
      } else {
        this.data.valueData.point[key].pointdata[index].item5 = "";
        this.data.valueData.point[key].pointdata[index].item6 = "";
      }
    }
  },
  mounted: function() {
    _(".project_gdyzsdpl_radio").center("h");
    if (this.$route.query.Judge != "ipdTemplate") {
      _(".__functionBox").choosable();
    }
  }
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
