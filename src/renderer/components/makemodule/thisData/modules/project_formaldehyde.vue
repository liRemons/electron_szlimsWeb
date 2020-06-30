<template>
  <div
    :class="{___module_frame_Box:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}"
  >
    <div :class="{eventCover:!ableInput}"></div>

    <div class="modules_1_tableBox ___relative">
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">样品编号</span>
        </div>
        <divModel
          v-model="data.valueData.labSampleNum"
          style="width: 360px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;left:550px;">
          <span class="heightCenter3">收样日期</span>
        </div>
        <divModel
          v-model="data.valueData.createtime"
          style="width: 360px;left:740px;"
          class="moduleInput Full hide focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">检测项目</span>
        </div>
        <divModel
          v-model="data.valueData.testingItems"
          style="width: 360px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;left:550px;">
          <span class="heightCenter3">检测依据</span>
        </div>
        <divModel
          v-model="data.valueData.testStandard"
          style="width: 360px;left:740px;"
          class="moduleInput Full hide focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">任务批号</span>
        </div>
        <divModel
          v-model="data.valueData.taskBatchNumber"
          style="width: 910px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">检测日期</span>
        </div>
        <divModel
          v-model="data.valueData.testDate"
          style="width: 360px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;left:550px;">
          <span class="heightCenter3">检测环境</span>
        </div>
        <divModel
          v-model="data.valueData.testEnvironment"
          style="width: 360px;left:740px;"
          class="moduleInput Full hide focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">样品前处理</span>
        </div>
        <divModel
          v-model="data.valueData.samplePreProcess"
          style="width: 910px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:64px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">标准物质信息</span>
        </div>
        <div class="block ___relative" style="width:910px;left:190px;">
          <div class="___relative borderBottom" style="height:32px">
            <div class="boxs block head_1_title ___absolute Full" style="width:100px;">
              <span class="heightCenter3">国标编号</span>
            </div>
            <divModel
              style="width: 200px;left:100px;"
              class="moduleInput Full hide borderRight focusBg"
            ></divModel>
            <div class="boxs block head_1_title ___absolute Full" style="width:100px;left:300px;">
              <span class="heightCenter3">批号</span>
            </div>
            <divModel
              style="width: 200px;left:400px;"
              class="moduleInput Full hide borderRight focusBg"
            ></divModel>
            <div class="boxs block head_1_title ___absolute Full" style="width:100px;left:600px;">
              <span class="heightCenter3">有效期</span>
            </div>
            <divModel style="width: 210px;left:700px;" class="moduleInput Full hide focusBg"></divModel>
          </div>
          <div class="___relative" style="height:32px">
            <div class="boxs block head_1_title ___absolute Full" style="width:160px;">
              <span class="heightCenter3">应用液实验室编号</span>
            </div>
            <divModel
              style="width: 440px;left:160px;"
              class="moduleInput Full hide borderRight focusBg"
            ></divModel>
            <div class="boxs block head_1_title ___absolute Full" style="width:100px;left:600px;">
              <span class="heightCenter3">有效期</span>
            </div>
            <divModel
              style="width: 210px;left:700px;"
              class="moduleInput Full hide borderRight focusBg"
            ></divModel>
          </div>
        </div>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">检测仪器</span>
        </div>
        <divModel
          style="width: 910px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">仪器参数</span>
        </div>

        <div class="boxs block head_1_title ___absolute Full" style="width:100px; left:190px">
          <span class="heightCenter3">波长</span>
        </div>
        <divModel
          style="width: 200px;left:290px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
        <div class="boxs block head_1_title ___absolute Full" style="width:100px;left:490px;">
          <span class="heightCenter3">比色皿光程</span>
        </div>
        <divModel
          style="width: 200px;left:590px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
        <div class="boxs block head_1_title ___absolute Full" style="width:100px;left:790px;">
          <span class="heightCenter3">校准证书</span>
        </div>
        <divModel style="width: 210px;left:890px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">回归方程</span>
        </div>
        <divModel
          style="width: 360px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;left:550px;">
          <span class="heightCenter3">相关系数</span>
        </div>
        <divModel style="width: 360px;left:740px;" class="moduleInput Full hide focusBg"></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">计算公式</span>
        </div>
        <divModel
          style="width: 910px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">检出限（μg）</span>
        </div>
        <divModel
          style="width: 910px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">最低检测质量（mg/ m3）</span>
        </div>
        <divModel
          style="width: 910px;left:190px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;">
          <span class="heightCenter3">标准图谱</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:190px;left:190px;">
          <span class="heightCenter3">图谱编号</span>
        </div>
        <divModel
          style="width: 360px;left:380px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
        <divModel
          style="width: 360px;left:740px;"
          class="moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:220px;">
          <span class="heightCenter3">样品编号</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:220px;left:220px;">
          <span class="heightCenter3">吸光率</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:220px;left:440px">
          <span class="heightCenter3">空气中甲醛质量浓度，mg/ m3</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:220px;left:660px;">
          <span class="heightCenter3">报告值，mg/ m3</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:220px;left:880px;">
          <span class="heightCenter3">相对相差%</span>
        </div>
      </div>
      <div class="___relative">
        <div
          v-for="(item,index) in data.valueData.point"
          style="width: 1100px; height:32px"
          class="___relative borderBottom"
        >
          <divModel
            v-model="item.temperature"
            style="width: 220px;"
            class="boxs moduleInput Full hide borderRight focusBg"
          ></divModel>
          <divModel
            v-model="item.Absorbance"
            style="width:220px;left:220px;"
            class="boxs moduleInput Full hide borderRight focusBg"
          ></divModel>
          <divModel
            v-model="item.AtmosphericPressure"
            style="width: 220px;left:440px;"
            class="boxs moduleInput Full hide borderRight focusBg"
          ></divModel>
          <divModel
            v-model="item.Reportvalue"
            style="width: 220px;left:660px;"
            class="boxs moduleInput Full hide borderRight focusBg"
          ></divModel>
          <divModel
            v-model="item.AtmosphericPressure2"
            style="width: 220px;left:880px;"
            class="boxs moduleInput Full hide borderRight focusBg"
          ></divModel>
        </div>
      </div>
      <div class="___relative borderBottom" style="height:32px">
        <div class="boxs block head_1_title ___absolute Full" style="width:150px;">
          <span class="heightCenter3">检测日期</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:150px;left:150px;">
          <span class="heightCenter3">温度</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:150px;left:300px">
          <span class="heightCenter3">湿度</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:150px;left:450px;">
          <span class="heightCenter3">回归方程</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:150px;left:600px;">
          <span class="heightCenter3">吸光度A</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:150px;left:750px;">
          <span class="heightCenter3">计算公司</span>
        </div>
        <div class="boxs block head_1_title ___absolute Full" style="width:200px;left:900px;">
          <span class="heightCenter3">检测结果（单位）</span>
        </div>
      </div>

      <div style="width: 1100px; height:32px" class="___relative">
        <divModel style="width: 150px;" class="boxs moduleInput Full hide borderRight focusBg"></divModel>
        <divModel
          style="width:150px;left:150px;"
          class="boxs moduleInput Full hide borderRight focusBg"
        ></divModel>
        <divModel
          style="width:150px;left:300px;"
          class="boxs moduleInput Full hide borderRight focusBg"
        ></divModel>
        <divModel
          style="width:150px;left:450px;"
          class="boxs moduleInput Full hide borderRight focusBg"
        ></divModel>
        <divModel
          style="width:150px;left:600px;"
          class="boxs moduleInput Full hide borderRight focusBg"
        ></divModel>
        <divModel
          style="width:150px;left:750px;"
          class="boxs moduleInput Full hide borderRight focusBg"
        ></divModel>
        <divModel
          style="width:200px;left:900px;"
          class="boxs moduleInput Full hide borderRight focusBg"
        ></divModel>
      </div>
    </div>

    <div class="__functionBox" v-show="!isTemplate">
      <!-- ******** 功能模块 ********** -->
      <div v-if="ipdTemplate!='ipdTemplate'">
        <div class="__functionCover1"></div>
        <div class="__functionCover2"></div>
        <div class="__functionCover3" v-show="index_jsonString()==0"></div>
        <div
          class="__functionCover4"
          v-show="data.isHead || index_jsonString()==jsonString.length-1"
        ></div>
        <!--      <div class="__functionButton1" @dblclick="toHigh"></div>              &lt;!&ndash; 放大行高 &ndash;&gt;-->
        <!--      <div class="__functionButton2" @dblclick="toShort"></div>              &lt;!&ndash; 缩小行高 &ndash;&gt;-->
        <div class="__functionButton3" @dblclick="toUpModule"></div>
        <!-- 提高一行 -->
        <div class="__functionButton4" @dblclick="toDownModule"></div>
        <!-- 下降行高 -->
        <div class="__functionButton5" @dblclick="toDeleteModule"></div>
        <!-- 删除模块 -->
      </div>
      <div v-if="ipdTemplate=='ipdTemplate'" class="__functionButton6" @dblclick="increase">
        <span>+</span>
      </div>
      <!--增加一行 -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correctArr: ["修正系数", "修正值"],
      correctJudge: false,
      index_jsonString: function() {
        // 获取当前模块在jsonString中的索引
        let result = this.thisPageIndex;
        for (let i = 0; i < this.pageNumber; i++) {
          result += this.showing[i].length;
        }
        return result;
      }
    };
  },
  props: [
    "data",
    "ipdTemplate",
    "pageNumber",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput"
  ],
  methods: {
    show(index) {
      if (index == 0) {
        this.correctJudge = !this.correctJudge;
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
    increase() {
      let obj = {
        SampleNumber: "",
        SampleName: "",
        SampleCarrier: "",
        sampling: "",
        SampleQuantity: "",
        temperature: "",
        relativeHumidity: "",
        AtmosphericPressure: "",
        SamplingTime: "",
        SamplingInstrument: "",
        Remarks: ""
      };
      this.jsonString[this.index_jsonString()].data.valueData.point.push(obj);
      this.$emit("update:jsonString");
      this.$emit("restart");
    }
  },
  mounted: function() {
    _(".__functionBox").choosable();
  }
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
