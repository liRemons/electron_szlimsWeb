<template>
  <div
    :class="{ _normalHeight_: true }"
    v-if="modularShow()"
    class="___relative"
    :id="data.valueData.testProjectId"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <!--<div class="modules_1_tableBox ___relative">
				<div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
						<div class="___relative borderBottom">
								<div class="___absolute Full tc borderRight" style="width: 80px;">
										<span class="heightCenter3">序号</span>
								</div>
								<div class="___absolute Full tc borderRight" style="width: 180px;left:80px;">
										<span class="heightCenter3">检测点位置</span>
								</div>
								<div class="___relative" style="left:260px;">
										<div style="width: 200px;" class="___relative borderRight">
												<div style="width: 200px;" class="___relative borderBottom">
														<div class="tc" style="height:32px;">
																<div class="___relative">
																		<span class="___absolute" style="left: 30px;">测量值（单位:</span>
																		<selectModel @returnVal="changeCompany"
																								 class="___relative"
																								 :Judge="true"
																								 style="left: 45px;"
																								 :special="1"
																								 :receive="''"
																								 :single="true"
																								 :rows="false"
																								 :transmitText="data.valueData.company"
																								 :list="company" :Obj="''">
																		</selectModel>
																		<span class="___absolute" style="left:165px; top: 0px;">)</span>
																</div>
														</div>
												</div>
												<div style="width: 200px;" class="___relative">&nbsp;
														<div style="width: 33.333%;" :class="index!=2 ? 'borderRight':''"
																 :style="{left:(index*33.333)+'%'}" v-for="(item,index) in 3"
																 class="___absolute tc t0 Full">
																<div>{{index+1}}</div>
														</div>
												</div>
										</div>
								</div>
								<div class="___absolute Full tc borderRight" style="width: 150px;left:460px;">
										<span class="heightCenter3" style="line-height: 16px;">*报告值(单<br>位：{{data.valueData.company}})</span>
								</div>
								<div class="___absolute Full tc" style="width: 100px;right: 0">
										<span class="heightCenter3">标准差</span>
								</div>
						</div>
						<div class="___relative" :class="index!=data.valueData.point.length-1 ? 'borderBottom':''"
								 v-for="(item,index) in data.valueData.point">
								<div class="___relative tc borderRight" style="width: 80px;">
										<div class="___relative w100">
												<div class="tc" style="height:32px;">
														<span>{{item.index}}</span>
												</div>
										</div>
								</div>
								<div class="___absolute Full tc borderRight" style="width: 180px;left:80px;">
										<div style="width:100%;text-align: center;" class="Full warp2 rowsInput2 hide focusBg">
												{{item.rows[0]}}
										</div>
								</div>
								<div class="___absolute Full tc borderRight" style="width: 200px;left:260px;">&nbsp;
										<div style="width: 33.333%;" class="___absolute borderRight tc t0 Full">
												<divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
																	class="Full warp2 rowsInput2 hide focusBg"></divModel>
										</div>
										<div style="width: 33.333%;left:33.333%" class="___absolute borderRight tc t0 Full">
												<divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
																	class="Full warp2 rowsInput2 hide focusBg"></divModel>
										</div>
										<div style="width: 33.333%;left:66.666%" class="___absolute tc t0 Full">
												<divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
																	class="Full warp2 rowsInput2 hide focusBg"></divModel>
										</div>
								</div>
								<div class="___absolute Full tc borderRight" style="width: 150px;left:460px;">
										<divModel v-model="item.rows[4]"
															style="width:100%;text-align: center;"
															class="Full warp2 rowsInput2 hide focusBg"
															:edit="false"
															:is-computer="true"
															:computers="changeNum(item.rows[1],item.rows[2],item.rows[3],index)"
															:computerFormula="'gs11'">
										</divModel>
								</div>
								<div class="___absolute Full tc" style="width: 100px;right: 0">
										<div style="width:100%;text-align: center;" class="Full warp2 rowsInput2 hide focusBg">
												{{item.rows[5]}}
										</div>
								</div>
						</div>
				</div>
		</div>-->
    <table class="myTable" style="width: 712px">
      <tr>
        <td width="170">
          重复测量次数
        </td>
        <td>
          <selectModel
            @returnVal="changeTestNum"
            :Judge="true"
            class="___absolute"
            style="top: 0px; left: 20px;"
            :special="1"
            :receive="''"
            :single="true"
            :rows="false"
            v-if="data.valueData.testNum !== ''"
            :transmitText="data.valueData.testNum"
            :list="[1, 3]"
            :Obj="''"
          >
          </selectModel>
        </td>
      </tr>
    </table>

    <table class="myTable" style="width: 712px">
      <tr class="delLine">
        <td rowspan="2">序号</td>
        <td rowspan="2" width="200">检测点位置</td>
        <td
          :colspan="data.valueData.testPoinrNum.filter(item => item).length"
          style="width: 250px;"
        >
          <div class="___relative">
            <span class="___absolute" style="left: 30px;">测量值（单位:</span>
            <selectModel
              @returnVal="changeCompany"
              class="___relative"
              :Judge="true"
              style="left: 20px;"
              :special="1"
              :receive="''"
              :single="true"
              :rows="false"
              :transmitText="data.valueData.company"
              :list="company"
              :Obj="''"
            >
            </selectModel>
            <span class="___absolute" style="left:165px; top: 0px;">)</span>
          </div>
        </td>
        <td rowspan="2">
          <span style="line-height: 16px;"
            >*报告值(单<br />位：{{ data.valueData.company }})</span
          >
        </td>
        <td rowspan="2">标准差</td>
      </tr>
      <tr>
        <td v-if="data.valueData.testPoinrNum[0]">1</td>
        <td v-if="data.valueData.testPoinrNum[1]">2</td>
        <td v-if="data.valueData.testPoinrNum[2]">3</td>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        style="text-align: center;"
      >
        <td>
          <span>{{ item.index }}</span>
        </td>
        <td>
          {{ item.rows[0] }}
        </td>
        <td v-if="data.valueData.testPoinrNum[0]">
          <divModel v-model="item.rows[1]"></divModel>
        </td>
        <td v-if="data.valueData.testPoinrNum[1]">
          <divModel v-model="item.rows[2]"></divModel>
        </td>
        <td v-if="data.valueData.testPoinrNum[2]">
          <divModel v-model="item.rows[3]"></divModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[4]"
            :edit="false"
            :is-computer="true"
            :computers="
              changeNum(item.rows[1], item.rows[2], item.rows[3], index)
            "
            :computerFormula="'gs11'"
          >
          </divModel>
        </td>
        <td>
          {{ item.rows[5] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      company: ["μSv/h", "nSv/h"]
    };
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
    changeNum(num1, num2, num3, index) {
      try {
        let arr = [num1, num2, num3];
        let average = this.average(arr);
        let calibration = this.jsonString.find(
          (item, index) => item.to === "projcet_szwjcjlmkt"
        ).data.valueData.calibrationFactor;
        if (this.isNumber(calibration) && this.isNumber(average)) {
          this.data.valueData.point[index].rows[4] = (
            average * parseFloat(calibration)
          ).toFixed(2);
        }
        if (this.isNumber(average)) {
          let total = 0;
          let judgeNum = this.judgeNum(arr);
          judgeNum.forEach((item, index) => {
            total += Math.pow(item - average, 2);
          });
          this.data.valueData.point[index].rows[5] = Math.sqrt(
            total / judgeNum.length
          ).toFixed(2);
        }
      } catch (e) {}
    },
    judgeNum(arr) {
      let calculation = [];
      arr.forEach((item, index) => {
        if (this.isNumber(item)) {
          calculation.push(item);
        }
      });
      return calculation;
    },
    changeCompany(val) {
      this.data.valueData.company = val;
    },
    average(arr) {
      let calculation = this.judgeNum(arr);
      let total = 0;
      calculation.forEach((item, index) => {
        total += parseFloat(item);
      });
      return total / calculation.length;
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },

    beNumber(item, itemIndex, index) {
      if (index === 0) {
        item.index = itemIndex + 1;
      } else {
        item.index = this.data.valueData.point[index - 1].index + 1;
      }
      return item.index;
    },

    changeTestNum(value) {
      this.showing.forEach((item, index) => {
        item.forEach((val, num) => {
          if (
            val.to === this.data.valueData.testProject &&
            val.data.valueData.multipleId === this.data.valueData.multipleId
          ) {
            val.data.valueData.testNum = "";
            setTimeout(() => {
              val.data.valueData.testNum = value;
            });
          }
        });
      });
    }
  },
  computed: {
    ...mapState({
      surgeon: state => state.StomatologyLinkage.surgeon
    })
  },
  watch: {
    surgeon() {
      this.modularShow();
    },
    "data.valueData.testNum": function(val) {
      if (val === "1") {
        this.data.valueData.testPoinrNum = [true, false, false];
      } else if (val === "3") {
        this.data.valueData.testPoinrNum = [true, true, true];
      }
    },
    "data.valueData.testPoinrNum": function(arr) {
      if (this.target === "0") {
        arr.forEach((item, index) => {
          if (item === false) {
            this.data.valueData.point.forEach(item2 => {
              item2.rows[index + 1] = "";
            });
          }
        });
      }
    }
  },
  mounted() {}
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
