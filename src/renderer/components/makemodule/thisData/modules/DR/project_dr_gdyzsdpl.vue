<template>
	<div style="line-height: 30px;" class="___relative">
		<div :class="{eventCover: target !== '0'}"></div>
		<div style="text-align: center;">
			<div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;">
				管电压指示的偏离
			</div>
			<div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
				标准要求
			</div>
			<div style="border: 1px solid black; border-top: none; min-height: 30px;" class="tl">{{getContent(0)}}</div>
			<div style="border: 1px solid black;font-weight: bolder; border-top: none;">
				检测及计算方法
			</div>
			<div style="border: 1px solid black; border-top: none; padding: 5px; min-height: 20px;">{{getContent(1)}}</div>
			<div style="border: 1px solid black;font-weight: bolder; border-top: none;">
				检测结果
			</div>
			<table class="myTable">
				<tr class="delLine">
					<td :colspan="focus ? 2 : 1">检测条件</td>
					<td colspan="2">测量值</td>
					<td rowspan="2">校准平均值/kV</td>
					<td rowspan="2" v-if="deviation">偏差/kV</td>
					<td rowspan="2" v-if="relativeDeviation">相对偏差/%</td>
				</tr>
				<tr class="delLine">
					<td v-if="focus">焦点</td>
					<td>预设管电压</td>
					<td>测量值/kV</td>
					<td>校准因子</td>
				</tr>
			</table>
			<table class="myTable">
				<tr v-for="(item, index) of data.valueData.bigFocus" :class="{delLine: index === 0}">
					<td rowspan="12" v-if="index === 0&&focus">大焦点</td>
					<td rowspan="3" v-if="item.toRow3">
						<myInput @change.native="changeNum(index,'bigFocus',item.getIndex)" v-model="item.rows[0]"></myInput>
					</td>
					<td>
						<myInput @change.native="changeNum(index,'bigFocus',item.getIndex)" v-model="item.rows[1]"></myInput>
					</td>
					<td>
						<span>{{item.rows[2]}}</span>
					</td>
					<td rowspan="3" v-if="item.toRow3">
						<span>{{item.rows[4]}}</span>
					</td>
					<td rowspan="3" v-if="item.toRow3&&deviation">
						<span>{{item.rows[5]}}</span>
					</td>
					<td rowspan="3" v-if="item.toRow3&&relativeDeviation">
						<span>{{item.rows[6]}}</span>
					</td>
				</tr>
			</table>
			<table class="myTable">
				<tr v-for="(item, index) of data.valueData.smallFocus" :class="{delLine: index === 0}">
					<td rowspan="12" v-if="index === 0&&focus">大焦点</td>
					<td rowspan="3" v-if="item.toRow3">
						<myInput @change.native="changeNum(index,'smallFocus',item.getIndex)" v-model="item.rows[0]"></myInput>
					</td>
					<td>
						<myInput @change.native="changeNum(index,'smallFocus',item.getIndex)" v-model="item.rows[1]"></myInput>
					</td>
					<td>
						<span>{{item.rows[2]}}</span>
					</td>
					<td rowspan="3" v-if="item.toRow3">
						<span>{{item.rows[4]}}</span>
					</td>
					<td rowspan="3" v-if="item.toRow3&&deviation">
						<span>{{item.rows[5]}}</span>
					</td>
					<td rowspan="3" v-if="item.toRow3&&relativeDeviation">
						<span>{{item.rows[6]}}</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "project_dr_gdyzsdpl",
    data() {
      return {
        content1: "验收检测时应分别对大小焦点进行测量，状态检测时只测量大焦点即可，管电压测量60kV、80kV、100kV、120kV或电压接近这些值的档位，管电流应设置为允许的最大管电流的50%或多一些。对于加载条件的选择应结合设备实际情况以用户实际需要为准。校准值=测量值×校准因子（校准因子依计量部门证书按线性内插法求得），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压，相对偏差=（偏差/预设管电压）×100%。",
        content2: "校准值=测量值×校准因子（校准因子依计量部门证书按线性内插法求得），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压，相对偏差=（偏差/预设管电压）×100%。",
        content3: "将管电压探测器置于支撑台胸壁侧内4cm处X射线束轴上，光野大于测量探头面积。选定管电压，曝光选用的靶/滤过、有无压迫器及附加滤过应与测试仪器相对应，设置约30mAs，进行曝光，读取管电压测量值，每种焦点需要至少测三档（25～32kV）。管电压偏差=管电压测量值-管电压设置值。校准值=测量值×校准因子（校准因子为1），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压。 ",
        content4: "将管电压探测器置于支撑台胸壁侧内4cm处X射线束轴上，光野大于测量探头面积。选定管电压，曝光选用的靶/滤过、有无压迫器及附加滤过应与测试仪器相对应，设置约30mAs，进行曝光，读取管电压测量值，对双焦点设备，验收检测时必须测量双焦点，小焦点只测28kV档，大焦点应至少测四档（25～32kV）。状态应至少测四个不同档管电压。管电压偏差=管电压测量值-管电压设置值。校准值=测量值×校准因子（校准因子为1），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压。 ",
        focus: true,
        deviation: true,
        relativeDeviation: true,
      }
    },
    props: ['data', 'jsonString', 'target'],
    computed: {
      ...mapState({
        deviceFactor: state => state.StomatologyLinkage.deviceFactor,
      }),
      mode() {
        return this.jsonString.find(item => item.to === 'project_jcxcxx').data.valueData.point.map(item => item.exposureMode);
      }
    },
    watch: {
      deviceFactor(val) {
        if (val instanceof Array && val.length > 0) {
          this.data.valueData.factorArr = val;
          this.reset();
        }
      },
    },
    methods: {
      reset() {
        this.data.valueData.bigFocus.forEach((item, index) => {
          this.changeNum(index, 'bigFocus', item.getIndex);
          this.changeNum(index, 'smallFocus', item.getIndex)
        })
      },
      isNumber(val) {
        if (parseFloat(val).toString() == "NaN") {
          return false;
        } else {
          return true;
        }
      },
      changeNum(index, key, getIndex) {
        let B = parseFloat(this.data.valueData[key][index].rows[1]);
        if (this.isNumber(B) && this.data.valueData.factorArr instanceof Array && this.data.valueData.factorArr.length > 0 && this.isNumber(this.data.valueData[key][getIndex].rows[0])) {
          let C = this.getFactor(B, this.data.valueData.factorArr);
          this.$set(this.data.valueData[key][index].rows, 2, C);
          if (this.isNumber(C)) {
            this.$set(this.data.valueData[key][index].rows, 3, B * C)
          } else {
            this.$set(this.data.valueData[key][index].rows, 3, '')
          }
        } else {
          this.$set(this.data.valueData[key][index].rows, 2, '')
        }
        let num1 = parseFloat(this.data.valueData[key][getIndex].rows[3]);
        let num2 = parseFloat(this.data.valueData[key][getIndex + 1].rows[3]);
        let num3 = parseFloat(this.data.valueData[key][getIndex + 2].rows[3]);

        let val1 = parseFloat(this.data.valueData[key][getIndex].rows[1]);
        let val2 = parseFloat(this.data.valueData[key][getIndex + 1].rows[1]);
        let val3 = parseFloat(this.data.valueData[key][getIndex + 2].rows[1]);
        if (this.isNumber(val1) && this.isNumber(val2) && this.isNumber(val3)) {
          this.$set(this.data.valueData[key][getIndex].rows, 4, ((num1 + num2 + num3) / 3).toFixed46(this.sizeMin([val1, val2, val3]), false, true))
        } else {
          this.$set(this.data.valueData[key][getIndex].rows, 4, '')
        }

        if (this.isNumber(this.data.valueData[key][getIndex].rows[0]) && this.isNumber(this.data.valueData[key][getIndex].rows[4])) {
          let A = parseFloat(this.data.valueData[key][getIndex].rows[0]);
          let E = parseFloat(this.data.valueData[key][getIndex].rows[4]);
          this.$set(this.data.valueData[key][getIndex].rows, 5, (E - A).toFixed46(2, false, true))
        } else {
          this.$set(this.data.valueData[key][getIndex].rows, 5, '')
        }

        if (this.isNumber(this.data.valueData[key][getIndex].rows[0]) && this.isNumber(this.data.valueData[key][getIndex].rows[5])) {
          let A = parseFloat(this.data.valueData[key][getIndex].rows[0]);
          let F = parseFloat(this.data.valueData[key][getIndex].rows[5]);
          this.$set(this.data.valueData[key][getIndex].rows, 6, ((F / A) * 100).toFixed46(2, false, true))
        } else {
          this.$set(this.data.valueData[key][getIndex].rows, 6, '')
        }
      },
      init() {
        let detectionObjects = this.jsonString.find((item, index) => item.to === 'project_jbxx').data.valueData.detectionObjects;
        let focusArr = ['口内牙片机', '牙科全景机', '口腔CT'];
        let deviationArr = ['乳腺DR', '乳腺CR', '乳腺屏片摄影设备'];
        let relativeDeviationArr = ['DR', 'CR', '屏片X射线摄影设备', '胃肠机', '乳腺DR', '乳腺CR', '乳腺屏片摄影设备'];
        this.focus = !focusArr.includes(detectionObjects);
        this.deviation = !deviationArr.includes(detectionObjects);
        this.relativeDeviation = relativeDeviationArr.includes(detectionObjects)
      },
      getContent(flag) {
        if (flag === 0) {
          return this.getDetailContent();
        } else {
          return this.getDetailContent2();
        }
      },
      getDetailContent() {
        let myarr = this.mode;
        let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
        let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影"];
        let arr3 = ["口腔三维扫描"];
        let arr4 = ["乳腺DR摄影", "乳腺CR摄影", "乳腺屏片摄影"];
        if (this.computeObj.intersect(myarr, arr1).length > 0) {
          return "验收&状态：±5.0%或±5.0kV内，以较大者控制。"
        } else if (this.computeObj.intersect(myarr, arr2).length > 0) {
          return "验收&状态：±10%内。"
        } else if (this.computeObj.intersect(myarr, arr3).length > 0) {
          return "验收&状态：±≤10%。"
        } else if (this.computeObj.intersect(myarr, arr4).length > 0) {
          return "验收&状态：±1.0kV内。"
        } else {
          return ""
        }
      },
      getDetailContent2() {
        let myarr = this.mode;

        let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
        let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];
        let arr3 = ["乳腺DR摄影", "乳腺CR摄影"];
        let arr4 = ["乳腺屏片摄影"];
        if (this.computeObj.intersect(myarr, arr1).length > 0) {
          return this.content1;
        } else if (this.computeObj.intersect(myarr, arr2).length > 0) {
          return this.content2;
        } else if (this.computeObj.intersect(myarr, arr3).length > 0) {
          return this.content3;
        } else if (this.computeObj.intersect(myarr, arr4).length > 0) {
          return this.content4;
        } else {
          return ""
        }
      }
    },

    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
