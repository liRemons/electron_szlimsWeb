<template>
  <div
    :class="{ _normalHeight_: true }"
    class="___relative"
    style="padding-top: 20px;"
    :id="data.valueData.testProjectId"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative">
      <p style="line-height: 16px;" class="mt10">竣工验收（环保）</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;"
      >
        <div class="___relative borderBottom">
          <div class="___absolute Full tc borderRight" style="width: 170px;">
            <span class="heightCenter3">检测条件</span>
          </div>
          <div class="___relative" style="width: 540px;left:170px;">
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>设备状态</span>
              </div>
              <div
                class="___absolute tc t0 Full"
                style="width: 355px;left:185px;"
              >
                <div
                  style="width:100%;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                >
                  {{ data.valueData.deviceState }}
                </div>
              </div>
            </div>
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>曝光模式</span>
              </div>
              <div
                class="___absolute tc t0 Full"
                style="width: 355px;left:185px;"
              >
                <div
                  style="width:100%;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                >
                  {{ data.valueData.exposureMode }}
                </div>
              </div>
            </div>
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>有用线束方向</span>
              </div>
              <div
                class="___absolute tc t0 Full"
                style="width: 355px;left:185px;"
              >
                <div
                  style="width:100%;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                >
                  {{ data.valueData.harnessDirection }}
                </div>
              </div>
            </div>
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="___absolute Full borderRight tc w100"
                style="width: 185px;"
              >
                <span class="heightCenter3">曝光参数</span>
              </div>
              <div class="___relative" style="width: 355px;left:185px;">
                <div class="___relative">
                  &nbsp;
                  <div class="inputBlock ___absolute Full" style="width: 80px;">
                    <divModel
                      v-model="data.valueData.exposureParameterkV1"
                      style="width:50px;text-align: center; border-bottom: 1px solid black; height: 30px;"
                      class="Full warp2 rowsInput2 hide focusBg"
                    ></divModel>
                    <span class="___absolute t0 right0">kV，</span>
                  </div>

                  <div class="___absolute Full" style="width: 100px;left:80px;">
                    <divModel
                      v-model="data.valueData.exposureParametermA"
                      style="width:60px;text-align: center; border-bottom: 1px solid black; height: 30px;"
                      class="Full warp2 rowsInput2 hide focusBg"
                    ></divModel>
                    <selectModel
                      @returnVal="returnVal"
                      :Judge="true"
                      :multi-select="false"
                      style="left: 50px; width: 30px;"
                      :receive="'unit1'"
                      :single="true"
                      :rows="false"
                      :transmitText="data.valueData.unit1"
                      :list="['mA', 'mAs']"
                      :Obj="''"
                    >
                    </selectModel>
                  </div>
                  <div
                    class="___absolute Full"
                    style="width: 120px;left:190px;"
                  >
                    <myInput
                      style="width: 50px; border-bottom: 1px solid black; height: 30px;"
                      class="___absolute"
                      v-model="data.valueData.exposureParameterms"
                      v-if="data.valueData.unit2 != '/'"
                    ></myInput>
                    <div
                      v-else
                      style="width:70px;text-align: center;"
                      class="Full warp2 rowsInput2 hide focusBg"
                    ></div>
                    <selectModel
                      @returnVal="returnVal"
                      :Judge="true"
                      :multi-select="false"
                      style="left: 45px; width: 30px;"
                      :receive="'unit2'"
                      :single="true"
                      :rows="false"
                      :transmitText="data.valueData.unit2"
                      :list="['ms', 's', '/']"
                      :Obj="''"
                    >
                    </selectModel>
                  </div>
                </div>
                <div class="___relative">
                  <el-radio
                    v-model="data.valueData.exposureParameterState"
                    style="margin-left:10px;"
                    label="自动"
                  ></el-radio>
                  <el-radio
                    v-model="data.valueData.exposureParameterState"
                    label="手动"
                  ></el-radio>
                </div>
              </div>
            </div>
            <div class="___relative" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>{{ data.valueData.Judge ? "准直宽度" : "照射野" }}</span>
              </div>
              <div
                class="___absolute t0 Full"
                style="width: 355px;left:185px; "
              >
                <div class="___relative" style="width:80px;left:20px;">
                  <el-radio v-model="data.valueData.radio" label="1"
                    >有</el-radio
                  >
                  <el-radio v-model="data.valueData.radio" label="2"
                    >无</el-radio
                  >
                </div>
                <div v-if="data.valueData.radio === '1'">
                  <div
                    class="inputBlock ___absolute Full"
                    style="width: 80px;padding-left: 5px;left:130px;"
                  >
                    <divModel
                      v-model="data.valueData.irradiationField1"
											:computers="isInteger(data.valueData.irradiationField1,'irradiationField1')"
                      style="width:50px;text-align: center; border-bottom: 1px solid black; height: 28px;"
                      class="Full warp2 rowsInput2 hide focusBg"
                    ></divModel>
                    <span class="___absolute t0 right0">mm*</span>
                  </div>
                  <div
                    v-if="!data.valueData.Judge"
                    class="inputBlock ___absolute Full"
                    style="width: 82px;left:210px;"
                  >
                    <divModel
										:computers="isInteger(data.valueData.irradiationField2,'irradiationField2')"
                      v-model="data.valueData.irradiationField2"
                      style="width:60px;text-align: center; border-bottom: 1px solid black; height: 28px;"
                      class="Full warp2 rowsInput2 hide focusBg"
                    ></divModel>
                    <span class="___absolute t0 right0">mm</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="___relative">
          <div class="___relative tc borderRight" style="width: 170px;">
            <span>校准因子</span>
          </div>
          <div class="___absolute Full" style="width: 540px;left:170px;">
            <divModel
              v-model="data.valueData.calibrationFactor"
              style="width:100%;text-align: center;"
              class="Full warp2 rowsInput2 hide focusBg"
              :edit="false"
              :is-computer="true"
              :computers="changeNum(data.valueData.exposureParameterkV1)"
              :computerFormula="'gs11'"
            >
            </divModel>
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
    "ableInput",
    "target"
  ],
  methods: {
		isInteger(val,type){
			if(val%1!==0){
				this.$message.warning('请输入整数')
				this.$nextTick(()=>{
					this.data.valueData[type]=''
					this.$forceUpdate()
				})
			}
		},
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeNum(kv) {
      try {
        if (this.isNumber(kv)) {
          this.data.valueData.calibrationFactor = this.getFactor(
            kv,
            this.deviceFactor
          );
        }
      } catch (e) {}
    },
    modularShow() {
      if (
        this.purposeDetection === "豁免检测" ||
        this.purposeDetection === "环保验收"
      ) {
        this.data.height._normal.carried = true;
        this.data.valueData.isObtain = true;
        return true;
      } else {
        this.data.height._normal.carried = false;
        this.data.valueData.isObtain = false;
        return false;
      }
    },
    returnVal(val, name) {
      this.data.valueData[name] = val;

      if (this.data.valueData.unit2 === "/") {
        this.data.valueData.exposureParameterms = "";
      }
      this.$forceUpdate();
    },
    judgeDevice() {
      if (this.target === "0") {
        if (
          this.jsonString.some((item, index) => {
            return item.to.includes("_ct_");
          })
        ) {
          this.data.valueData.Judge = true;
        }
      }
    }
  },
  computed: {
    ...mapState({
      purposeDetection: state => state.StomatologyLinkage.purposeDetection,
      redefinitionJudge: state => state.StomatologyLinkage.redefinitionJudge,
      deviceFactor: state => state.StomatologyLinkage.deviceFactor2
    })
  },
  watch: {
    purposeDetection() {
      this.modularShow();
    }
  },
  mounted() {
    this.judgeDevice();
  }
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
