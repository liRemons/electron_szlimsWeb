<template>
	<div>
		<div class="___relative" style="border:1px solid black;border-bottom:none">
			<div class="___relative tc" style="width:80px;line-height:32px;">
				<span>稀释倍数</span>
			</div>
			<div class="___absolute t0" style="width:100px;left:80px;line-height:32px;">
				<divModel @change='synchronizationId' v-model="data.valueData.sysSolutionMultiple" :edit="target != '4'" :is-num-box="true"></divModel>
			</div>
		</div>
		<table border="1" class="myTable">
			<tr>
				<th style="width: 155px; text-align: left; padding-left: 5px;">
					样品编号：{{mySample}}
					<br/>
					空白编号：{{data.valueData.myBlankSample && data.valueData.myBlankSample.length > 0 ?
					data.valueData.myBlankSample[0].labSampleNum : ""}}
				</th>
				<th>采样体积V(L)</th>
				<th>采样点温度t(℃)</th>
				<th style="width: 110px;">采样点气压p(kPa)</th>
				<th style="width: 80px;">峰面积</th>
				<th style="width: 120px;">解吸气浓度(μg/mL)</th>
				<th style="width: 120px;">空白气浓度(μg/mL)</th>
				<th style="width: 120px;">样品浓度ρ(mg/m3)</th>
				<th style="width: 110px;">报告值ρ(mg/m3)</th>
				<th>相对相差(%)</th>
			</tr>

			<tr v-for="(item, index) in data.valueData.point" :key="index">
				<td>{{item.testProject}}</td>   <!--样品编号-->

				<td><!--采样体积-->
					<divModel v-model="item.volume" :edit="false"></divModel>
				</td>

				<td><!--采样点温度-->
					<divModel v-model="item.temperature" :edit="false"></divModel>
				</td>

				<td> <!--采样点气压-->
					<divModel v-model="item.atmosphericPressure" :edit="false"></divModel>
				</td>

				<td v-if="showXieGan2(item) == 0"><!--峰面积-->
					<divModel :edit="false"
										v-model="item.peakArea"
										:is-computer="true"
										:computerFormula="'gs10'"
										:computers="fen(data.valueData.allPoint, item)"
					></divModel>
				</td>
				<td v-else-if="showXieGan2(item) == 1">    <!--峰面积-->
					<divModel v-model="item.peakArea"
										:edit="false"
					></divModel>
				</td>
				<td v-else>
					<div>/</div>
				</td>

				<td v-if="showXieGan(item) == 0">    <!--解吸气浓度-->
					<divModel
									v-model="item.suckConcentration"
									:edit="false"
									:is-computer="true"
									:computerFormula="'gs12'"
									:computers="pingXingJieXi(item.peakArea)">
					</divModel>
				</td>
				<td v-else-if="showXieGan(item) == 1">
					<divModel v-model="item.suckConcentration"
										:edit="false"
					></divModel>
				</td>
				<td v-else>
					<div>/</div>
				</td>

				<td v-if="showXieGan2(item) == 0">    <!--空白气浓度-->
					<divModel v-model="item.blankConcentration"
										:edit="false"
										:is-computer="true"
										:computerFormula="'gs7'"
										:computers="pingXingFeng(data.valueData.allPoint)">
					</divModel>
				</td>
				<td v-else-if="showXieGan2(item) == 1">
					<divModel v-model="item.blankConcentration" :edit="false"></divModel>
				</td>
				<td v-else>
					<div>/</div>
				</td>

				<td v-if="showXieGan3(item)">    <!--样品浓度-->
					<div>/</div>
				</td>
				<td v-else>
					<divModel v-model="item.sysConcentration"
										:edit="false"
										:is-computer="true"
										:computerFormula="'gs8'"
										:computers="changeNum([data.valueData.allPoint, item,data.valueData.sysSolutionMultiple])"></divModel>
				</td>

				<td v-if="showXieGan3(item)">    <!--报告值-->
					<div>/</div>
				</td>
				<td v-else>
					<div>{{showBaoGao(item)}}</div>

				</td>

				<td>    <!--相对相差-->
					<div>/</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
  export default {
    name: "project_systvoc3.vue",
    data() {
      return {
        showTime: false,
        devices: []
      }
    },
    computed: {
      mySample() {
        let name = this.data.valueData.point[0].sysSampleNum || this.data.valueData.allPoint[0].sampleNum;
        let nameArr = name.split('-');
        return nameArr[0] + this.data.valueData.point[0].sampleNumIndex;
      }
    },
    props: ['ipdTemplate', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'regressionEquationValue1', 'regressionEquationValue2', 'regressionEquationValue3', 'allFeng', 'detectionLimitObj', 'target'],
    methods: {
      synchronizationId() {
        this.jsonString.forEach((item, index) => {
          if (item.data.valueData.multipleId === this.data.valueData.multipleId) {
            item.data.valueData.sysSolutionMultiple = this.data.valueData.sysSolutionMultiple
          }
        })
      },
      changeNum(arr) {
        let modulesArr = this.jsonString.filter((item, index) => item.data.valueData.multipleId === this.data.valueData.multipleId);
        let point = modulesArr[modulesArr.length - 1].data.valueData.point;
        let data = point.find((item, index) => item.testProject.includes('其他'));
        if (data !== undefined) {
          let index = arr[0].findIndex((item, index) => item.testProject.includes('其他'));
          arr[0][index].suckConcentration = data.suckConcentration;
          arr[0][index].blankConcentration = data.blankConcentration;
        }
        return arr
      },
      pingXingJieXi(fenMianJi) {
        try {
          if (isNaN(fenMianJi)) fenMianJi = 1;
          let regressionEquationValue1 = this.regressionEquationValue1;
          let regressionEquationValue2 = this.regressionEquationValue2;
          let regressionEquationValue3 = this.regressionEquationValue3;
          let sysArea = fenMianJi;
          let shizi = "(" + sysArea;
          switch (regressionEquationValue2) {
            case "+":
              shizi += "-";
              break;
            case "-":
              shizi += "+";
              break;
          }
          if (this.isNumber(regressionEquationValue3) && this.isNumber(regressionEquationValue1)) {
            shizi += regressionEquationValue3 + ')/' + regressionEquationValue1;
            let nongResult = eval(shizi);
            if (isNaN(nongResult)) nongResult = 0;
            let result = nongResult;
            return [result]
          } else {
            return [0]
          }
        } catch (e) {
          console.log("异常", e);
          return [0]
        }
      },
      fen(computers, item) {
        let computers2 = computers.map(item => item.peakArea);
        let allValue = 0;
        computers2.forEach((item, index) => {
          if (index <= 7) {
            allValue += Number(item);
          }
        });
        let allValueTwo = Number(computers[0].parallelWindArea) - allValue;
        if (isNaN(allValueTwo)) allValueTwo = 0;
        return [allValueTwo]
      },
      showXieGan(item) {
        let name = item.testProject;
        if (name.indexOf("其他") != -1) {
          return 0;
        } else if (name.indexOf("总计") != -1) {
          return 2;
        } else {
          return 1;
        }
      },
      showXieGan2(item) {
        let name = item.testProject;
        if (name.indexOf("其他") != -1) {
          return 0;
        } else if (name.indexOf("总计") != -1) {
          return 2;
        } else {
          return 1;
        }
      },
      showXieGan3(item) {
        let name = item.testProject;
        if (name.indexOf("总计") != -1) {
          return false;
        } else {
          return true;
        }
      },
      pingXingFeng(arr) {
        try {
          let result = 0;
          arr.forEach((item, index) => {
            if (index <= 7) {
              result += Number(item.blankPeakArea);
            }
          });
          let allFeng = '';
          if (this.allFeng !== "") allFeng = this.allFeng;
          if (this.isNumber(allFeng) && this.isNumber(result)) {
            let result2 = Number(allFeng) - result;
            return [this.regressionEquationValue1, this.regressionEquationValue2, this.regressionEquationValue3, result2];
          } else {
            return [this.regressionEquationValue1, this.regressionEquationValue2, this.regressionEquationValue3, 0];
          }
        } catch (e) {
          return [this.regressionEquationValue1, this.regressionEquationValue2, this.regressionEquationValue3, 0];
        }
      },
      showBaoGao(item) {
        let sysReport = Number(item.sysConcentration).toFixed46(3);
        if (sysReport < Number(this.detectionLimitObj.detectionLimit)) {
          item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
          item.sysReportCount = Number(Number(item.sysConcentration).toFixed46(3)).toPrecision(2);
          return `< ${this.detectionLimitObj.detectionLimit}`;
        } else {
          item.sysReport = Number(Number(item.sysConcentration).toFixed46(3)).toPrecision(2);
          item.sysReportCount = item.sysReport;
          return item.sysReport;
        }
      }

    },

    mounted() {
      this.data.valueData.sampleNum = this.mySample;
      this.data.valueData.pageNumber = this.pageNumber;
      this.data.valueData.sysSampleId = this.data.valueData.allPoint[0].sysSampleId;
      this.data.valueData.mySample = this.mySample;

      this.data.valueData.point.forEach(item => {
        let rowIndex = this.data.valueData.allPoint.findIndex(item2 => item2.testProject == item.testProject);
        this.data.valueData.allPoint[rowIndex] = item;
      });

      this.data.valueData.allPoint.forEach((item, index) => {
        if (index <= 9) {
          item.sysConcentration = "";
        }
      });
      console.log(this.data)
    }
  }
</script>

<style scoped>

</style>
