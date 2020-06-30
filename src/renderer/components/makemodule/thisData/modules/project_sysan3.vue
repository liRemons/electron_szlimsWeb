<template>
	<div>
		<div :class="{eventCover:!ableInput}"></div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<table border="1" style="width:100%" class="myTable">
			<tr>
				<td style="width: 98px;">样品编号</td>
				<td style="width: 90px;">采样体积V(L)</td>
				<td style="width: 120px;">采样点温度t（℃）</td>
				<td style="width: 110px;">采样点气压p（kPa）</td>
				<td style="width: 110px;">样品溶液稀释倍数（kPa）</td>
				<td style="width: 120px;">样品空白吸光度A0</td>
				<td style="width: 94px;">样品吸光度A</td>
				<td style="width: 110px;">样品浓度ρ（mg/m3）</td>
				<td style="width: 120px;">报告值ρ（mg/m3）</td>
				<td style="width: 110px;">相对相差（%）</td>
			</tr>
			<tr v-for="(item,index) in data.valueData.point" :key="index">
				<td>
					{{item.sampleNum}}{{item.sampleNumIndex ? item.sampleNumIndex: ''}}<!--样品编号-->
				</td>
				<td>
					{{item.volume}}<!--采样体积-->
				</td>
				<td>
					{{item.temperature}}<!--采样点温度-->
				</td>
				<td>
					{{item.atmosphericPressure}}<!--采样点气压-->
				</td>
				<td>
					<divModel v-model="item.sysSolutionMultiple" :edit="target != '4'" :is-num-box="true"></divModel>
					<!--样品溶液稀释倍数-->
				</td>
				<td>
					<divModel v-model="item.sysBlankAbsorbance" :edit="target != 4" :is-num-box="true"></divModel>  <!--空白吸光度-->
				</td>
				<td>
					<divModel v-model="item.sysAbsorbance" :edit="target != 4" :is-num-box="true"></divModel>  <!--吸光度-->
				</td>
				<td v-if="target != 4">
					<divModel :is-computer="true"
										:computerFormula="'gs1'"
										:computers="[item.volume, item.temperature, item.atmosphericPressure, item.sysBlankAbsorbance,item.sysSolutionMultiple, item.sysAbsorbance, bs, item,3]"
										v-model="item.sysConcentration"
										:edit="false">
					</divModel> <!--浓度-->
				</td>
				<td v-else>
					{{item.sysConcentration}}
				</td>

				<td v-if="toRowspan(item, index) && target != 4" rowspan="2">
					<!--报告值-->
					<div>{{showReport(item, data.valueData.point[index+1].sysConcentration)}}</div>
				</td>

				<td v-if="toRowspan2(item) && target != 4">
					<!--报告值-->
					<div>
						{{showReport2(item)}}
					</div>
				</td>


				<td v-if="toRowspan(item, index) && target != 4" rowspan="2">
					{{getDifference(item, data.valueData.point[index + 1])}} <!--相对相差-->
				</td>
				<td v-if="toRowspan2(item) && target != 4">
					<div>/</div><!--相对相差-->
				</td>


				<td v-if="toRowspan(item, index) && target == 4" rowspan="2">
					{{item.sysReport}}
				</td>
				<td v-if="toRowspan2(item) && target == 4">
					<!--报告值-->
					{{item.sysReport}}
				</td>

				<td v-if="toRowspan(item, index) && target == 4" rowspan="2">
					{{item.sysDifference}}
				</td>

				<td v-if="toRowspan2(item) && target == 4">
					/
				</td>

			</tr>
		</table>

	</div>
</template>

<script>
  import {queryByPurpose} from "@/api/laboratory";
  import projectHead from "../project_head";

  export default {
    data() {
      return {
        index_jsonString: function () {             // 获取当前模块在jsonString中的索引
          let result = this.thisPageIndex;
          for (let i = 0; i < this.pageNumber; i++) {
            result += this.showing[i].length;
          }
          return result;
        },
        devices: '',
        showTime: '',
        checked: false,
        testTiem: ""
      }
    },
    components: {
      projectHead
    },
    props: ['ipdTemplate', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'bs', 'target', 'detectionLimitObj'],
    computed: {
      canEdit() {
        if (this.data.valueData.samples) {
          return false;
        } else {
          return true;
        }
      },
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
      getDifference(item, nextItem) {
        let sysConcentration1 = Number(item.sysConcentrationCount);
        let sysConcentration2 = Number(nextItem.sysConcentrationCount);
        let resultArr = this.computeObj.difference(sysConcentration1, sysConcentration2, this.detectionLimitObj);
        item.sysDifference = resultArr[0];
        item.sysDifferenceCount = resultArr[1];
        nextItem.sysDifference = resultArr[0];
        nextItem.sysDifferenceCount = resultArr[1];

        return item.sysDifference;
      },
      showNoPingXing(item) {
        if (item.isParallel || item.isParallel2) {
          return false;
        } else {
          return true;
        }
      },
      toHigh() {
        this.data.height._normal.carried = true;
        this.data.height._short.carried = false;
        this.watchSign._high += 1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toShort() {
        this.data.height._normal.carried = false;
        this.data.height._short.carried = true;
        this.watchSign._short += 1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toUpModule() {
        let index = this.index_jsonString();
        if (index != 0) {
          _transposition(this.jsonString, index, index - 1);
          this.$emit('update:jsonString');
          this.watchSign._down += 1;
          this.$emit('update:watchSign');
        }
      },
      toDownModule() {
        let index = this.index_jsonString();
        if (index != this.jsonString.length - 1) {
          _transposition(this.jsonString, index, index + 1);
          this.$emit('update:jsonString');
          this.watchSign._down += 1;
          this.$emit('update:watchSign');
        }
      },
      toDeleteModule() {
        let index = this.index_jsonString();
        this.jsonString.splice(index, 1);
        this.$emit('update:jsonString');
        this.watchSign._delete += 1;
        this.$emit('update:watchSign');
      },
      isSelected(index, result) {
        if (result) {
          return this.data.valueData.checkBox2[index];
        } else {
          return this.data.valueData.checkBox[index].isSel;
        }
      },
      increase() {
        let obj = {
          windowLength: "",
          windowWidth: "",
          windowNum: ""
        };
        this.jsonString[this.index_jsonString()].data.valueData.point.push(obj);
        this.$emit('update:jsonString');
        this.$emit('restart');
      },
      toShowTimeBox() {
        if (this.target != 4) {
          this.showTime = !this.showTime;
        }
      },
      checkBoxChange(val) {
        console.log(val);
      },
      checkIsParallel(sampleNum) {
        console.log('编号', sampleNum);
      },
      changeTime(data) {
        console.log("changeTime", data);
        this.data.valueData.sysTestingTime = data[0] + " -- " + data[1];
      },
      showReport(item, sysConcentration) {
        let sysConcentration1 = Number(item.sysConcentration);
        let sysConcentration2 = Number(sysConcentration);
        let sysConcentration3 = (sysConcentration1 + sysConcentration2) / 2;
        if (isNaN(sysConcentration3)) {
          sysConcentration3 = 0;
        } else {
          try {
            sysConcentration3 = sysConcentration3.toFixed46(2);
          } catch (e) {
          }
        }
        if (sysConcentration3 < Number(this.detectionLimitObj.detectionLimit)) {
          item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
          return `< ${this.detectionLimitObj.detectionLimit}`;
        } else {
          item.sysReport = sysConcentration3;
          return sysConcentration3;
        }

      },
      showReport2(item) {
        let sysReport;
        try {
          sysReport = Number(item.sysConcentration).toFixed46(2);
        } catch (e) {
          sysReport = 0;
        }
        if (sysReport < Number(this.detectionLimitObj.detectionLimit)) {
          item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
          return `< ${this.detectionLimitObj.detectionLimit}`;
        } else {
          item.sysReport = sysReport;
          return sysReport;
        }

      },
      toRowspan(row, index) {
        let nextRow = this.data.valueData.point[index + 1];
        if (!nextRow) {
          return false;
        }
        let result1 = row.sampleNum.indexOf('-1');
        let result2 = nextRow.sampleNum.indexOf('-2');
        if (result1 != -1 && result2 != -1) {
          return true;
        } else {
          return false;
        }
      },
      toRowspan2(row) {
        let result1 = row.sampleNum.indexOf('-1');
        let result2 = row.sampleNum.indexOf('-2');
        if (result1 == -1 && result2 == -1) {
          return true;
        } else {
          return false;
        }
      },
      changeState(val) {
        if (val === '正常') {
          this.data.valueData.sysSampleStateDetail = '';
        }
      },
      returnVal(a, b, c, d, valueArr) {
        this.data.valueData.testDeviceCheckBox = valueArr.map(item => item.id);
      }
    },
    mounted: function () {
      queryByPurpose('实验室').then(res => {
        if (res.success) {
          this.devices = res.data;
          this.devices.forEach(item => {
            item.showName = item.deviceName + ' ' + item.deviceModel + ' ' + item.deviceNum;
          })
        }
      });
      let inp = document.getElementsByClassName('inp');
      let that = this;
      console.log('模板里的数据', this.data);
      for (let i = 0; i < inp.length; i++) {
        inp[i].onclick = function (e) {
          let index = e.target.getAttribute('index');
          let result = e.target.checked;
          let isCheckBox = e.target.isCheckBox;
          that.$emit('selectedBox', {isCheckBox, index, result});
        }
      }
    }
  };
</script>

<style>
	/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
