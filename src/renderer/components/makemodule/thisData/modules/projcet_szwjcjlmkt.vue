<template>
  <div
    :class="{ _normalHeight_: true }"
    v-if="modularShow()"
    class="___relative"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative">
      <p style="line-height: 16px;" class="mt10">术者位检测记录模块</p>
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
                <divModel
                  v-model="data.valueData.deviceState"
                  :edit="false"
                  style="width:100%;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
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
                <span style="margin-right:10px;">透视模式</span>
                <el-radio
                  v-model="data.valueData.exposureMode"
                  label="自动"
                ></el-radio>
                <el-radio
                  v-model="data.valueData.exposureMode"
                  label="手动"
                ></el-radio>
              </div>
            </div>
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="  ___absolute tc t0 Full borderRight w100"
                style="width: 185px;"
              >
                <span class="heightCenter3">有用线束方向</span>
              </div>
              <div class="___relative tc" style="width: 355px;left:185px;">
                <div class="___relative">
                  <el-radio
                    v-model="data.valueData.harnessDirection"
                    label="射线垂直从床下向床上照射"
                  ></el-radio>
                </div>
                <div class="___relative">
                  <el-radio
                    v-model="data.valueData.harnessDirection"
                    label="射线垂直从床上向床下照射"
                  ></el-radio>
                </div>
              </div>
            </div>
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>选择器官曝光程序 </span>
              </div>
              <div
                class="___absolute tc t0 Full"
                style="width: 355px;left:185px;"
              >
                <divModel
                  v-model="data.valueData.exposureProcedure"
                  style="width:100%;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
              </div>
            </div>
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>管电压</span>
              </div>
              <div class="___absolute t0 Full" style="width: 355px;left:185px;">
                <divModel
                  v-model="data.valueData.tubeVoltage"
                  style="width:60px;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
                <span class="___relative" style="left:60px;">kV</span>
              </div>
            </div>
            <div class="___relative borderBottom" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>管电流</span>
              </div>
              <div class="___absolute t0 Full" style="width: 355px;left:185px;">
                <divModel
                  v-model="data.valueData.tubeCurrent"
                  style="width:60px;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
                <span class="___relative" style="left:60px;">mA</span>
              </div>
            </div>
            <div class="___relative" style="width: 540px;">
              <div
                class="___relative borderRight tc w100"
                style="width: 185px;"
              >
                <span>{{ data.valueData.Judge ? "准直宽度" : "照射野" }}</span>
              </div>
              <div class="___absolute t0 Full" style="width: 355px;left:185px;">
                <el-radio
                  v-model="data.valueData.irradiationFieldChoice"
                  class="___absolute t0"
                  style="left:220px;top:10px"
                  label="250mm*200mm"
                ></el-radio>
                <el-radio
                  v-model="data.valueData.irradiationFieldChoice"
                  class="___absolute t0"
                  style="left:0px;top:10px"
                  label="自动调节"
                ></el-radio>
                <div
                  class="___relative"
                  style="width: 60px;display:inline-block;left:80px;"
                >
                  &nbsp;
                  <divModel
                    v-model="data.valueData.irradiationFieldM1"
                    style="width:30px;text-align: center;"
                    class="Full warp2 rowsInput2 Full hide focusBg"
                  ></divModel>
                  <span class="___absolute right0">mm*</span>
                </div>
                <div
                  v-if="!data.valueData.Judge"
                  class="___relative"
                  style="width: 55px;display:inline-block;left:80px;"
                >
                  &nbsp;
                  <divModel
                    v-model="data.valueData.irradiationFieldM2"
                    style="width:30px;text-align: center;"
                    class="Full warp2 rowsInput2 Full hide focusBg"
                  ></divModel>
                  <span class="___absolute right0">mm</span>
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
              :computers="changeNum(data.valueData.tubeVoltage)"
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
      if (this.surgeon || this.target != 0) {
        this.data.height._normal.carried = true;
        this.data.valueData.isObtain = true;
        return true;
      } else {
        this.data.height._normal.carried = false;
        this.data.valueData.isObtain = false;
        return false;
      }
    },

    //给同一组的projcet_szwjcjlmknr设置id
    setMultipleId() {
      let multipleId = this.data.valueData.multipleId;
      let index = this.jsonString.findIndex(
        item =>
          item.data.valueData.multipleId === multipleId &&
          item.to === "projcet_szwjcjlmkt"
      );
      for (let i = index + 1; i < this.jsonString.length; i++) {
        if (this.jsonString[i].to === "projcet_szwjcjlmknr") {
          this.jsonString[i].data.valueData.multipleId = multipleId;
        } else {
          break;
        }
      }
    },
    judgeDevice() {
      if (this.target == 0) {
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
      surgeon: state => state.StomatologyLinkage.surgeon,
      deviceFactor: state => state.StomatologyLinkage.deviceFactor2
    })
  },
  watch: {
    surgeon() {
      this.modularShow();
    }
  },
  mounted() {
    this.modularShow();
    this.setMultipleId();
    this.judgeDevice();
  }
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
