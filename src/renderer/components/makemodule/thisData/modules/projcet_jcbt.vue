<template>
  <div>
    <div
      :class="{ _normalHeight_: true }"
      class="___relative"
      style="padding-top: 20px;"
    >
      <div :class="{ eventCover: !ableInput }"></div>

      <table class="myTable" border="1">
        <tr>
          <td colspan="2" rowspan="6">检测条件</td>
          <td>设备状态</td>
          <td colspan="4">
            <div :id="data.valueData.testProjectId">
              {{ data.valueData.deviceState }}
            </div>
          </td>
        </tr>
        <tr>
          <td>曝光模式</td>
          <td colspan="4">
            {{ data.valueData.exposureMode }}
          </td>
        </tr>
        <tr>
          <td>有用线束方向</td>
          <td colspan="4">
            {{ data.valueData.harnessDirection }}
          </td>
        </tr>
        <tr>
          <td rowspan="2">曝光参数</td>
          <td colspan="4">
            <div class="___relative" style="height: 35px;">
              <myInput
                @blur.native="
                  blurNum(
                    data.valueData.exposureParameterkV1,
                    'exposureParameterkV1'
                  )
                "
                v-model="data.valueData.exposureParameterkV1"
                :defaultValue="data.valueData.exposureParameterkV1"
                class="___absolute"
                style="width: 50px; top: 0px;left: 0px; height: 31px; border-bottom: 1px solid black;"
              ></myInput>
              <span
                class="___absolute"
                style="width: 50px; top: 0px;left: 65px;"
                >kV</span
              >
              <myInput
                v-model="data.valueData.exposureParametermA"
                @blur.native="
                  blurNum(
                    data.valueData.exposureParametermA,
                    'exposureParametermA'
                  )
                "
                :defaultValue="data.valueData.exposureParametermA"
                class="___absolute"
                style="width: 50px; top: 0px;left: 115px; height: 31px; border-bottom: 1px solid black;"
              ></myInput>
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                class="___absolute"
                style="width: 60px; top: 0px;left: 175px; height: 31px;"
                :multi-select="false"
                :receive="'unit1'"
                :single="true"
                :rows="false"
                :transmitText="data.valueData.unit1"
                :list="['mA', 'mAs']"
                :Obj="''"
              >
              </selectModel>
              <myInput
                v-model="data.valueData.exposureParameterms"
                @blur.native="
                  blurNum(
                    data.valueData.exposureParameterms,
                    'exposureParameterms'
                  )
                "
                v-if="data.valueData.unit2 != '/'"
                :defaultValue="data.valueData.exposureParameterms"
                class="___absolute"
                style="width: 50px; top: 0px;left: 225px; height: 31px; border-bottom: 1px solid black;"
              ></myInput>
              <div
                v-else
                class="___absolute"
                style="width: 50px; top: 0px;left: 225px; height: 31px;"
              ></div>
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                class="___absolute"
                style="width: 50px; top: -32px;left: 287px; height: 31px;"
                :multi-select="false"
                :receive="'unit2'"
                :single="true"
                :rows="false"
                :transmitText="data.valueData.unit2"
                :list="['ms', 's', '/']"
                :Obj="''"
              >
              </selectModel>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="4" style="text-align: left;">
            <el-radio
              v-model="data.valueData.exposureParameterState"
              style="margin-left:10px;"
              label="自动"
            ></el-radio>
            <el-radio
              v-model="data.valueData.exposureParameterState"
              label="手动"
            ></el-radio>
          </td>
        </tr>
        <tr style="height: 38px">
          <td>{{ data.valueData.Judge ? "准直宽度" : "照射野" }}</td>
          <td colspan="4" class="___relative">
            <div class="___relative" style="width:80px;left:20px;">
              <el-radio v-model="data.valueData.radio" label="1">有</el-radio>
              <el-radio v-model="data.valueData.radio" label="2">无</el-radio>
            </div>
            <div
              class="___absolute"
              v-if="data.valueData.radio === '1'"
              style="height:32px;top:15px;left:140px;"
            >
              <myInput
                class="___absolute"
                v-model="data.valueData.irradiationField1"
                @blur.native="
                  blurNum(data.valueData.irradiationField1, 'irradiationField1')
                "
                :defaultValue="data.valueData.irradiationField1"
                style="width: 50px; top: -15px;left: 0px; height: 31px; border-bottom: 1px solid black;"
              ></myInput>
              <span
                class="___absolute"
                style="width: 50px; top: -15px;left: 65px;"
                >mm*</span
              >
              <myInput
                v-if="!data.valueData.Judge"
                class="___absolute"
                @blur.native="
                  blurNum(data.valueData.irradiationField2, 'irradiationField2')
                "
                :defaultValue="data.valueData.irradiationField2"
                v-model="data.valueData.irradiationField2"
                style="width: 50px; top: -15px;left: 115px; height: 31px; border-bottom: 1px solid black;"
              ></myInput>
              <span
                v-if="!data.valueData.Judge"
                class="___absolute"
                style="width: 50px; top: -15px;left: 175px; height: 31px;"
                >mm</span
              >
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2">校准因子</td>
          <td colspan="5">
            <divModel
              v-model="data.valueData.calibrationFactor"
              @click.native="changeNum(data.valueData.exposureParameterkV1)"
              :edit="false"
              :is-computer="true"
              :computers="changeNum(data.valueData.exposureParameterkV1)"
              :computerFormula="'gs11'"
            >
            </divModel>
          </td>
        </tr>
      </table>
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
    // 判断是否整数
    blurNum(val, type) {
      if (Number(val) % 1 !== 0) {
        // this.$message.warning("请输入整数");
        // this.data.valueData[type] = "";
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
        let length, digit;
        if (this.deviceFactor[0].value) {
          length = this.deviceFactor[0].value.split(".").length;
          digit = this.deviceFactor[0].value.split(".")[length - 1].length;
        }

        if (this.isNumber(kv)) {
          this.data.valueData.calibrationFactor = this.getFactor(
            kv,
            this.deviceFactor
          ).toFixed46(digit !== "" ? digit : 2);
        }
      } catch (e) {
        this.data.valueData.calibrationFactor = "";
      }
    },
    modularShow() {
      if (
        this.purposeDetection === "豁免检测" ||
        this.purposeDetection === "环保验收"
      ) {
        this.data.height._normal.carried = false;
        this.data.valueData.isObtain = false;
        return false;
      } else {
        this.data.height._normal.carried = true;
        this.data.valueData.isObtain = true;
        return true;
      }
    },
    returnVal(val, name) {
      this.data.valueData[name] = val;
      if (this.data.valueData.unit2 === "/") {
        this.data.valueData.exposureParameterms = "";
      }
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
