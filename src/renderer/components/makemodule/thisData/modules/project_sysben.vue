<template>
	<div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<table class="myTable" ref="ben">
			<tr class="delLine">
				<td>样品编号</td>
				<td style="width: 75px;">体积V(L)</td>
				<td style="width: 70px;">温度t(℃)</td>
				<td style="width: 70px;">气压p(kPa)</td>
				<td style="width: 80px;">空白样品编号</td>
				<td style="width: 60px;">峰面积</td>
				<td style="width:60px;">稀释倍数</td>
				<td>空白气浓度(μg/mL)</td>
				<td>解吸气浓度(μg/mL)</td>
				<td>样品浓度ρ(mg/m3)</td>
				<td>报告值ρ(mg/m3)</td>
				<td style="width: 90px;">相对相差(%)</td>
			</tr>
			<tr v-for="(item, index) in data.valueData.point" :key="index">
				<td>
					{{name(item)}}
				</td>   <!--样品编号-->
				<td>
					{{item.volume}}
				</td>   <!--采样体积V（L）-->
				<td>
					{{item.temperature}}
				</td>   <!--采样点温度t（℃）-->
				<td>
					{{item.atmosphericPressure}}
				</td>   <!--采样点气压p（kPa）-->
				<td>{{item.myBlankSample && item.myBlankSample.length > 0 ? item.myBlankSample[0].labSampleNum : ""}}</td>
				<td>{{item.sysArea}}</td>   <!--峰面积-->
				<td>
					<divModel @change="showNongDu(item)" v-model="item.sysSolutionMultiple" :edit="target != '4'"
										:is-num-box="true"></divModel>
				</td>
				<td>
					{{item.sysBlankConcentration}}
				</td>   <!--空白气浓度（μg/mL）-->
				<td>
					<divModel v-model="item.sysSuckConcentration" :edit="false"></divModel>
				</td>   <!--解吸气浓度（μg/mL）-->
				<!--样品浓度ρ（mg/m3）-->
				<td v-if="target != 4">{{showNongDu(item)}}</td>
				<td v-else>{{item.sysConcentration}}</td>

				<td v-if="computeObj.toRowspan(item, index, data) && target != 4" rowspan="2">
					<div>{{showReport(item, data.valueData.point[index+1].sysConcentrationCount)}}</div>
				</td>   <!--报告值ρ（mg/m3）-->

				<td v-if="computeObj.toRowspan(item, index, data) && target != 4" rowspan="2">
					{{getDifference(item, data.valueData.point[index + 1])}}
				</td>   <!--相对相差（%）-->


				<td v-if="computeObj.toRowspan2(item) && target != 4">
					<div>{{showReport2(item)}}</div>
				</td>
				<td v-if="computeObj.toRowspan2(item) && target != 4">
					<div>/</div>
				</td>


				<td v-if="computeObj.toRowspan(item, index, data) && target == 4" rowspan="2">
					<div>{{item.sysReport}}</div>
				</td>

				<td v-if="computeObj.toRowspan(item, index, data) && target == 4" rowspan="2">
					<div>{{item.sysDifference}}</div>
				</td>

				<td v-if="computeObj.toRowspan2(item) && target == 4">
					<div>{{item.sysReport}}</div>
				</td>
				<td v-if="computeObj.toRowspan2(item) && target == 4">
					<div>/</div>
				</td>

			</tr>
		</table>
	</div>
</template>

<script>
  import {queryByPurpose} from "@/api/laboratory";
  import projectHead from "../project_head";

  export default {
    name: "project_ben.vue",
    data() {
      return {
        showTime: false,
        devices: [],
        testTiem: ""
      }
    },
    components: {
      projectHead
    },
    props: ['ipdTemplate', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'target', 'detectionLimitObj'],
    methods: {
      headShow() {
        if (this.pageNumber > 0) {
          if (this.thisPageIndex == 0) {
            let showlLen = this.showing[this.pageNumber - 1].length - 1;
            if (this.showing[this.pageNumber - 1][showlLen].to !== this.data.valueData.testProject) {
              return true
            } else {
              return false
            }
          } else {
            if (this.showing[this.pageNumber][this.thisPageIndex - 1].to !== this.data.valueData.testProject) {
              return true
            } else {
              return false
            }
          }
        } else {
          return true;
        }
      },
      show(item) {
        if (item.isParallel) {
          return true;
        } else {
          return false;
        }
      },
      name(item) {
        let name = `${item.sampleNum}${item.sampleNumIndex ? item.sampleNumIndex : ''}${item.parallelLetter}`;
        return name.replace(/\s*/g, "");
      },
      showNoPingXing(item) {
        if (item.isParallel || item.isParallel2) {
          return false;
        } else {
          return true;
        }
      },
      toShowTimeBox() {
        if (this.target != 4) {
          this.showTime = !this.showTime;
        }
      },

      changeTime(data) {
        this.data.valueData.sysTestingTime = data[0] + " -- " + data[1];
      },
      getDifference(item, nextItem) {
        let sysConcentration1 = Number(item.sysConcentrationCount);
        let sysConcentration2 = Number(nextItem.sysConcentrationCount);
        let resultArr = this.computeObj.difference(sysConcentration1, sysConcentration2, item.lessReport);
        item.sysDifference = resultArr[0];
        item.sysDifferenceCount = resultArr[1];
        nextItem.sysDifference = resultArr[0];
        nextItem.sysDifferenceCount = resultArr[1];

        return item.sysDifference;
      },

      xiangCha(point, index) {
        let obj = point[index];
        let obj2 = point[index + 1];
        let sysConcentration1 = obj.sysConcentrationCount;
        let sysConcentration2 = obj2.sysConcentrationCount;
        let resultArr = this.computeObj.difference(sysConcentration1, sysConcentration2, this.detectionLimitObj);
        obj.sysDifference = resultArr[0];
        obj.sysDifferenceCount = resultArr[1];
        return obj.sysDifference;
      },

      showReport(item, sysConcentration) {
        try {
          let sysConcentration1 = Number(item.sysConcentrationCount);
          let sysConcentration2 = Number(sysConcentration);
          let sysConcentration3 = (sysConcentration1 + sysConcentration2) / 2;
          if (isNaN(sysConcentration3)) {
            sysConcentration3 = 0;
          } else {
            try {
              sysConcentration3 = sysConcentration3.toFixed46(2, true, true);
            } catch (e) {
            }
          }
          item.sysReportCount = sysConcentration3;

          if (sysConcentration3 < Number(this.detectionLimitObj.detectionLimit)) {
            item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
            item.lessReport = true;
          } else {
            item.sysReport = sysConcentration3;
            item.lessReport = false;
          }

          return item.sysReport;
        } catch (e) {
          return '';
        }

      },
      showReport2(item) {
        let sysReport;
        try {
          sysReport = Number(item.sysConcentrationCount).toFixed46(2, true, true);
        } catch (e) {
          sysReport = 0;
        }
        item.sysReportCount = sysReport;
        if (parseFloat(sysReport) < Number(this.detectionLimitObj.detectionLimit)) {
          item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
        } else {
          item.sysReport = sysReport;
        }
        return item.sysReport;
      },
      showNongDu(item) {
        try {
          let V1 = Number(item.volume);
          let t1 = Number(item.temperature);
          let p1 = Number(item.atmosphericPressure);
          let blankNong = Number(item.sysBlankConcentration);
          let jieNong = Number(item.sysSuckConcentration);
          let x = Number(item.sysSolutionMultiple);
          let result2 = (((jieNong - blankNong) * 100) / (Number(V1) * (273 / (273 + t1)) * (p1 / 101))) * x;
          if (isNaN(result2)) {
            item.sysConcentration = 0;
            return 0
          } else {
            if (result2 < Number(this.detectionLimitObj.detectionLimit)) {
              item.sysConcentrationCount = Number(result2.toFixed46(3, true, true));
              item.sysConcentration = `< ${this.detectionLimitObj.detectionLimit}`
            } else {
              item.sysConcentration = Number(result2.toFixed46(3, true, true));
              item.sysConcentrationCount = Number(result2.toFixed46(3, true, true))
            }
            return item.sysConcentration;
          }
        } catch (e) {
          return 0;
        }
      },
      changeState(val) {
        console.log(1, val);
        if (val === '正常') {
          this.data.valueData.sysSampleStateDetail = '';
        }
      },
      returnVal(a, b, c, d, valueArr) {
        this.data.valueData.testDeviceCheckBox = valueArr.map(item => item.id);
      }

    },
    computed: {
      testDeviceCheckBoxMsg() {
        let str = "";
        this.data.valueData.testDeviceCheckBox.forEach((item, index) => {
          if (index !== this.data.valueData.testDeviceCheckBox.length - 1) {
            str += item.deviceName + ' ' + item.deviceModel + ' ' + item.deviceNum + ','
          } else {
            str += item.deviceName + ' ' + item.deviceModel + ' ' + item.deviceNum
          }
        });
        return str
      }
    },
    mounted() {
      queryByPurpose('实验室').then(res => {
        if (res.success) {
          this.devices = res.data;
          this.devices.forEach(item => {
            item.showName = item.deviceName + ' ' + item.deviceModel + ' ' + item.deviceNum;
          })
        }
      });
      setTimeout(() => {
        this.$forceUpdate();
      }, 300)

    }
  }
</script>

<style scoped>

</style>
