<template>
  <div class="___relative _normalHeight_">
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt10">
      <p style="line-height: 16px;">4.9 探测器剂量指示（DDI）</p>
      <p style="line-height: 16px;">4.9.1 标准要求</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;"
      >
        <p class="ml5 tl">
          验收：DDI（10μGy）计算值与测量值±20.0%，DDI或平均像素值建立基线值；状态：基线值±20.0%。
        </p>
      </div>
      <p style="line-height: 16px;">4.9.2 检测及计算方法</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;line-height: 16px;"
      >
        <p class="ml5">
          有可能的话取出滤线栅，设置SID为180cm，如达不到则调节SID至最大值，70kV，1mmCu滤过，入射空气比释动能约<br />10μGy，实际检测条件参考曝光参数选择，曝光3次，记录DDI值，如果没有DDI值则读取影像中心10cm×10cmROI的平<br />均像素值，并计算三幅影像平均像素值。验收检测结果偏差=（计算值-测量值）/测量值×100%，状态检测结果偏差=（平<br />均值-基线值）/基线值×100%。
        </p>
      </div>
      <p style="line-height: 16px;">4.9.3 检测条件、仪器示值与检测结果</p>
      <div class="___relative" v-for="(item, index) in data.valueData.point">
        <el-checkbox
          v-model="data.valueData.detector"
          @change="reset()"
          :label="'探测器' + (index + 1)"
        ></el-checkbox>
        <div
          class="cover"
          v-if="
            data.valueData.detector.findIndex(
              (val, num) => val == '探测器' + (index + 1)
            ) === -1
          "
        ></div>
        <div
          class="___relative ___module_frame_Box"
          style="border-top: solid 1px black;"
        >
          <div class="___relative tc hide borderBottom" style="height:32px;">
            <el-checkbox-group v-model="item.Choice">
              <el-checkbox label="平均像素值"></el-checkbox>
              <el-checkbox label="DDI值"></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="___relative borderBottom">
            <div class=" ___absolute Full tc borderRight" style="width:150px;">
              <span class="heightCenter3">检测结果</span>
            </div>
            <div class="___relative" style="left:150px;width: 560px;">
              <div class="___relative borderBottom">
                <div class="___relative tc borderRight" style="width: 135px;">
                  <span>1</span>
                </div>
                <div
                  class="___absolute t0 tc borderRight"
                  style="width: 135px;left:135px;"
                >
                  <span>2</span>
                </div>
                <div
                  class="___absolute t0 tc borderRight"
                  style="width: 135px;left:270px;"
                >
                  <span>3</span>
                </div>
                <div class="___absolute t0 tc right0" style="width: 160px;">
                  <span>平均值</span>
                </div>
              </div>
              <div class="___relative">
                <div
                  class="___relative tc borderRight"
                  style="width: 135px;height:32px;"
                >
                  <divModel
                    v-model="item.detectionResult1"
                    style="width:100%;text-align: center;"
                    class="Full heightCenter3 hide focusBg"
                  ></divModel>
                </div>
                <div
                  class="___absolute Full t0 tc borderRight"
                  style="width: 135px;left:135px;"
                >
                  <divModel
                    v-model="item.detectionResult2"
                    style="width:100%;text-align: center;"
                    class="Full heightCenter3 hide focusBg"
                  ></divModel>
                </div>
                <div
                  class="___absolute Full t0 tc borderRight"
                  style="width: 135px;left:270px;"
                >
                  <divModel
                    v-model="item.detectionResult3"
                    style="width:100%;text-align: center;"
                    class="Full heightCenter3 hide focusBg"
                  ></divModel>
                </div>
                <div
                  class="___absolute Full t0 tc right0"
                  style="width: 160px;"
                >
                  <divModel
                    v-model="item.detectionAverage"
                    style="width:100%;text-align: center;"
                    class="Full warp2 heightCenter3 rowsInput2 hide focusBg"
                    :edit="false"
                    :is-computer="true"
                    :computers="
                      changeNum(
                        [
                          item.detectionResult1,
                          item.detectionResult2,
                          item.detectionResult3
                        ],
                        index
                      )
                    "
                    :computerFormula="'gs11'"
                  >
                  </divModel>
                </div>
              </div>
            </div>
          </div>
          <div class="___relative" v-if="testingState === 1">
            <div class=" ___absolute Full tc borderRight" style="width:150px;">
              <div class="heightCenter3">
                <span>验收检测</span>
              </div>
            </div>
            <div class="___relative" style="left:150px;width: 560px;">
              <div class="___relative borderBottom">
                <el-radio v-model="item.DDIval" label="1" class="ml5"
                  >有DDI值及生产厂家计算公式:</el-radio
                >
                <divModel
                  v-if="item.DDIval == 1"
                  v-model="item.formula"
                  style="width:300px;text-align: center;left:230px;"
                  class="Full heightCenter3 hide focusBg"
                ></divModel>
              </div>
              <div class="___relative borderBottom">
                <div class="___relative" style="width: 560px;">
                  <div class="___relative">
                    <div
                      class="___relative tc borderRight"
                      style="width: 225px;"
                    >
                      <span>空气比释动能测量值/μGy</span>
                    </div>
                    <div
                      class="___absolute t0 tc borderRight"
                      style="width: 225px;left:225px;"
                    >
                      <span>空气比释动能计算值/μGy</span>
                    </div>
                    <div class="___absolute t0 tc right0" style="width: 110px;">
                      <span>偏差/%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="___relative borderBottom">
                <div class="___relative" style="width: 560px;">
                  <div class="___relative">
                    <div
                      class="___relative tc borderRight"
                      style="width: 225px;height:32px;"
                    >
                      <span>{{ item.measuredValue }}</span>
                    </div>
                    <div
                      class="___absolute Full t0 tc borderRight"
                      style="width: 225px;left:225px;"
                    >
                      <divModel
                        v-model="item.calculatedValue"
                        style="width:100%;text-align: center;"
                        class="Full heightCenter3 hide focusBg"
                      ></divModel>
                    </div>
                    <div
                      class="___absolute Full t0 tc right0"
                      style="width: 110px;"
                    >
                      <divModel
                        v-model="item.deviation1"
                        style="width:100%;text-align: center;"
                        class="Full heightCenter3 hide focusBg"
                        :edit="false"
                        :is-computer="true"
                        :computers="
                          deviationVal(
                            item.measuredValue,
                            item.calculatedValue,
                            index
                          )
                        "
                        :computerFormula="'gs11'"
                      >
                      </divModel>
                    </div>
                  </div>
                </div>
              </div>
              <div class="___relative">
                <el-radio v-model="item.DDIval" label="2" class="ml5"
                  >无DDI值及生产厂家计算公式：建立基线值=</el-radio
                >
                <divModel
                  v-model="item.nothingBaseline"
                  style="width:60px;text-align: center;left:320px"
                  class="Full heightCenter3 hide focusBg"
                ></divModel>
              </div>
            </div>
          </div>
          <div class="___relative" v-if="testingState === 2">
            <div class=" ___absolute Full tc borderRight" style="width:150px;">
              <div class="heightCenter3">
                <span>状态检测</span>
              </div>
            </div>
            <div class="___relative" style="left:150px;width: 560px;">
              <div class="___relative">
                <div class="___relative" style="width: 560px;">
                  <div class="___relative borderBottom">
                    <div
                      class="___relative tc borderRight"
                      style="width: 280px;"
                    >
                      <span>基线值</span>
                    </div>
                    <div class="___absolute t0 tc right0" style="width: 280px;">
                      <span>偏差</span>
                    </div>
                  </div>
                  <div class="___relative">
                    <div
                      class="___relative tc borderRight"
                      style="width: 280px;height: 32px;"
                    >
                      <span>{{ item.baselineValue }}</span>
                    </div>
                    <div
                      class="___absolute Full tc t0 right0"
                      style="width: 280px;"
                    >
                      <divModel
                        v-if="purposeDetection !== '新标准首次检测'"
                        v-model="item.deviation2"
                        style="width:100%;text-align: center;"
                        class="Full heightCenter3 hide focusBg"
                      ></divModel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  props: [
    "ipdTemplate",
    "pageNumber",
    "data",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput"
  ],
  methods: {
    judgeNum(arr) {
      let calculation = [];
      arr.forEach((item, index) => {
        if (this.isNumber(item)) {
          calculation.push(item);
        }
      });
      return calculation;
    },
    average(arr) {
      let calculation = this.judgeNum(arr);
      let total = 0;
      calculation.forEach((item, index) => {
        total += parseFloat(item);
      });
      return total / calculation.length;
    },
    changeNum(arr, index) {
      let calculation = this.judgeNum(arr);
      let retainArr = [];
      calculation.forEach((val, num) => {
        retainArr.push(
          val.split(".").length > 1 ? val.split(".")[1].length : 0
        );
      });
      if (calculation.length > 1) {
        this.data.valueData.point[index].detectionAverage = this.average(
          calculation
        ).toFixed46(Math.max(...retainArr));
        if (this.data.valueData.point[index].DDIval == 1) {
          this.data.valueData.point[index].nothingBaseline = "";
          this.data.valueData.point[
            index
          ].measuredValue = this.data.valueData.point[index].detectionAverage;
        } else if (this.data.valueData.point[index].DDIval == 2) {
          this.data.valueData.point[
            index
          ].nothingBaseline = this.data.valueData.point[index].detectionAverage;
          this.data.valueData.point[index].measuredValue = "";
        }
        this.data.valueData.point[
          index
        ].baselineValue = this.data.valueData.point[index].detectionAverage;
      }
    },
    deviationVal(measuredValue, calculatedValue, index) {
      if (this.isNumber(measuredValue) && this.isNumber(calculatedValue)) {
        this.data.valueData.point[index].deviation1 = (
          ((measuredValue - calculatedValue) / calculatedValue) *
          100
        ).toFixed46(2);
      } else {
        this.data.valueData.point[index].deviation1 = "";
      }
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    reset() {
      let obj = {
        Choice: [],
        formula: "",
        detectionResult1: "",
        detectionResult2: "",
        detectionResult3: "",
        detectionAverage: "",
        DDIval: "",
        measuredValue: "",
        calculatedValue: "",
        deviation1: "",
        nothingBaseline: "",
        baselineValue: "",
        deviation2: "",
        stateDetection: ""
      };
      this.data.valueData.point.forEach((item, index) => {
        let str = "探测器" + (index + 1);
        if (
          this.data.valueData.detector.findIndex((val, num) => val == str) == -1
        ) {
          this.data.valueData.point.splice(index, 1, obj);
        }
      });
    }
  },
  computed: {
    ...mapState({
      testingState: state => state.StomatologyLinkage.testingState,
      purposeDetection: state => state.StomatologyLinkage.purposeDetection
    })
  },
  watch: {
    purposeDetection() {
      this.data.valueData.detector = [];
      this.reset();
    }
  },
  mounted() {}
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
