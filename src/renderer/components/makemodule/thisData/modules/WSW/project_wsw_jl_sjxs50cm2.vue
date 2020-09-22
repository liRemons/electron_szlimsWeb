<template>
	<!-- 空气采样器法  17列 -->
	<div class="___relative">
		<div :class="{eventCover: target !== '1'}"></div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<project_wsw_blank :data="data"></project_wsw_blank>
		<table class="myTable">
			<tr class="delLine">
				<td rowspan="2">样品编号</td>
				<td rowspan="2" colspan="2">样品名称</td>
				<td rowspan="2">
					采样面积
					<br/>（cm²）
				</td>
				<td colspan="6">
					<div style="width:60px;display: inline-block;vertical-align:middle;">
						<div v-if="target == 1" style="line-height:32px;">
							<selectModel @returnVal="returnVal"
													 :Judge="true"
													 :special="0"
													 v-if="!showInput"
													 :transmitText="data.valueData.sysDilutionDegree"
													 :multi-select="false"
													 :receive="'id'"
													 :single="true"
													 :rows="false"
													 :list="['37','28','25','44','42','56','/','自定义']"
													 :Obj="''">
							</selectModel>
							<myInput style="text-align: center" v-else v-model="data.valueData.sysDilutionDegree"
											 @change.native="(el) => {noShowInput(el,0)}"></myInput>
						</div>
						<div v-else>{{data.valueData.sysDilutionDegree}}</div>
					</div>
					<span>℃培养</span>
					<div style="width:60px;display: inline-block;vertical-align:middle;">
						<!-- <div v-if="target == 1" style="line-height:32px;">
							<selectModel @returnVal="returnVal"
													 :Judge="true"
													 :special="1"
													 v-if="!showInput2"
													 :transmitText="data.valueData.sysDilutionHour"
													 :multi-select="false"
													 :receive="'id'"
													 :single="true"
													 :rows="false"
													 :list="['24h','45h','3d','5d','7d','/','自定义']"
													 :Obj="''">
							</selectModel>
							<myInput style="text-align: center" v-else v-model="data.valueData.sysDilutionHour"
											 @change.native="(el) => {noShowInput(el,1)}"></myInput>
						</div> -->
						<div >{{data.valueData.sysDilutionHour}}</div>
					</div>
					h后各稀释度平皿计数（CFU）
				</td>
				<td rowspan="2">
					报告值
					<br/>（CFU/50cm²）
				</td>
			</tr>
			<tr>
				<td colspan="2">1:10</td>
				<td colspan="2">1:100</td>
				<td colspan="2">1:1000</td>
			</tr>
			<tr v-for="(item,index) in data.valueData.point" :key="item.pointId">
				<td>{{name(item)}}</td>
				<td colspan="2">
					<span>{{item.sampleName}}</span>
				</td>
				<td>
					<myInput v-model="item.volume"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item1"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item2"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item3"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item4"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item5"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item6"></myInput>
				</td>
				<td>
					<div style="height:100%">{{item.sysReport}}</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
  import {queryByPurpose} from "@/api/laboratory";
  import projectHead from "./project_head";
import { mapState } from "vuex";
  export default {
    name: "project_wsw_jl_sjxs50cm2",
    props: [
      "ipdTemplate",
      "data",
      "pageNumber",
      "thisPageIndex",
      "jsonString",
      "showing",
      "watchSign",
      "isTemplate",
      "ableInput",
      "bs",
      "target",
      "detectionLimitObj"
    ],

    data() {
      return {
        index_jsonString: function () {
          // 获取当前模块在jsonString中的索引
          let result = this.thisPageIndex;
          for (let i = 0; i < this.pageNumber; i++) {
            result += this.showing[i].length;
          }
          return result;
        },
        devices: "",
        showTime: "",
        testTiem: "",
        checked: false,
        showInput: false,
        showInput2: false,
      };
    },
    components: {
      projectHead
    },
    computed: {
    ...mapState({
      cultureTime: (state) => state.laboratory.cultureTime,
    }),
  },
  watch: {
    cultureTime() {
      this.showInput2 = true;
      if (this.cultureTime <= 45) {
        this.data.valueData.sysDilutionHour = Math.ceil(this.cultureTime) + "h";
      } else {
        this.data.valueData.sysDilutionHour =
          Math.ceil(this.cultureTime / 24) + "d";
      }
    },
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
      returnVal(val, name, index) {
        if (val !== '自定义') {
          let keyArr = ['sysDilutionDegree', 'sysDilutionHour'];
          this.data.valueData[keyArr[index]] = val;
        } else {
          let showInputArr = ['showInput', 'showInput2'];
          let keyArr = ['sysDilutionDegree', 'sysDilutionHour'];
          this[showInputArr[index]] = true;
          this.data.valueData[keyArr[index]] = ' ';
          this.$forceUpdate();
        }
      },
      noShowInput(el, index) {
        el.target.value = el.target.value.replace(' ', '');
        let val = el.target.value;
        this.data.valueData.antenna = val;
        if (val === '') {
          let showInputArr = ['showInput', 'showInput2'];
          this[showInputArr[index]] = false;
        }
        this.$forceUpdate();
      },
      show(item) {
        if (item.isParallel) {
          return true;
        } else {
          return false;
        }
      },

      // 判断两个数是否在30~300之间
      is30And300(one, two) {
        if (one >= 30 && one <= 300 && two >= 30 && two <= 300) {
          return true;
        } else {
          return false;
        }
      },
      is0(arr) {
        let result = true;
        for (let a = 0; a < arr.length; a++) {
          if (arr[a] != 0) result = false;
        }

        return result;
      },
      getLimit(num1, num2) {
        if (num1 > num2) {
          return num1 - num2;
        } else {
          return num2 - num1;
        }
      },
      report(item) {
        let item1 = Number(item.item1 == "/" ? 0 : item.item1);
        let item2 = Number(item.item2 == "/" ? 0 : item.item2);
        let item3 = Number(item.item3 == "/" ? 0 : item.item3);
        let item4 = Number(item.item4 == "/" ? 0 : item.item4);
        let item5 = Number(item.item5 == "/" ? 0 : item.item5);
        let item6 = Number(item.item6 == "/" ? 0 : item.item6);
        let volume = Number(item.volume);
        let is30And300 = this.is30And300;

        let dl = this.detectionLimitObj.detectionLimit;
        console.log("dl这玩意是检出值", dl);

        if (!Number.isNaN(volume) && volume != 0) {
          if (
                  item1 != 0 ||
                  item2 != 0 ||
                  item3 != 0 ||
                  item4 != 0 ||
                  item5 != 0 ||
                  item6 != 0
          ) {
            if (
                    !(
                            is30And300(item1, item2) &&
                            is30And300(item3, item4) &&
                            is30And300(item5, item6)
                    )
            ) {
              if (is30And300(item1, item2) && is30And300(item3, item4)) {
                // 判断是否满足 10 稀释度的 两组
                console.log("判断是否满足 10 稀释度的 两组");
                item.sysReport = (
                        (((item1 + item2 + item3 + item4) /
                                ((2 + 0.1 * 2) * Math.pow(10, -1))) *
                                50) /
                        volume
                ).toFixed46(0);
                if (item.sysReport > 100)
                  item.sysReport = Number(item.sysReport).num2e();
              } else if (
                      (this.computeObj.sum(item1, item2) / 2 < 30 ||
                              this.computeObj.sum(item1, item2) / 2 > 300) &&
                      (this.computeObj.sum(item3, item4) / 2 < 30 ||
                              this.computeObj.sum(item3, item4) / 2 > 300) &&
                      (this.computeObj.sum(item5, item6) / 2 < 30 ||
                              this.computeObj.sum(item5, item6) / 2 > 300)
              ) {
                let result0 = this.getLimit(
                        this.computeObj.sum(item1, item2) / 2,
                        300
                );
                let result1 = this.getLimit(
                        this.computeObj.sum(item3, item4) / 2,
                        300
                );
                let result2 = this.getLimit(
                        this.computeObj.sum(item5, item6) / 2,
                        300
                );
                let result0_2 = this.getLimit(
                        this.computeObj.sum(item1, item2) / 2,
                        30
                );
                let result1_2 = this.getLimit(
                        this.computeObj.sum(item3, item4) / 2,
                        30
                );
                let result2_2 = this.getLimit(
                        this.computeObj.sum(item5, item6) / 2,
                        30
                );

                let result3 = Math.min(
                        result0,
                        result1,
                        result2,
                        result0_2,
                        result1_2,
                        result2_2
                );

                let result5 = 0;
                let flag = 0;
                if (result0 === result3 || result0_2 === result3) {
                  flag = 10;
                  result5 = this.computeObj.sum(item1, item2) / 2;
                } else if (result1 === result3 || result1_2 === result3) {
                  flag = 100;
                  result5 = this.computeObj.sum(item3, item4) / 2;
                } else if (result2 === result3 || result2_2 === result3) {
                  flag = 1000;
                  result5 = this.computeObj.sum(item5, item6) / 2;
                }
                let result4 = (result5 * flag * 50) / volume;
                if (result4 > 100) {
                  console.log("这个？");
                  item.sysReport = Number(result4).num2e();
                } else {
                  console.log("还是这个？");
                  let report = Number(result4).toFixed46(0);
                  item.sysReport = report < dl ? "<" + dl : report;
                }
                console.log("result5", result5, "flag", flag, "volume", volume);
              } else if (is30And300(item3, item4) && is30And300(item5, item6)) {
                // 判断是否满足 100 稀释度的 两组
                console.log("判断是否满足 100 稀释度的 两组");
                item.sysReport = (
                        (((item3 + item4 + item5 + item6) /
                                ((2 + 0.1 * 2) * Math.pow(10, -2))) *
                                50) /
                        volume
                ).toFixed46(0);
                if (item.sysReport > 100)
                  item.sysReport = Number(item.sysReport).num2e();
              } else if (is30And300(item1, item2)) {
                // 满足10的
                console.log("满足10的");
                item.sysReport = (
                        (((item1 + item2) / 2) * 10 * 50) /
                        volume
                ).toFixed46(0);
                if (item.sysReport > 100)
                  item.sysReport = Number(item.sysReport).num2e();
              } else if (is30And300(item3, item4)) {
                console.log("满足100的");
                item.sysReport = (
                        (((item3 + item4) / 2) * 100 * 50) /
                        volume
                ).toFixed46(0);
                if (item.sysReport > 100)
                  item.sysReport = Number(item.sysReport).num2e();
              } else if (
                      item1 != 0 &&
                      item2 != 0 &&
                      item3 != 0 &&
                      item4 != 0 &&
                      ((item1 > 300 && item2 > 300 && item3 > 300 && item4 > 300) ||
                              (item1 < 30 && item2 < 30 && item3 < 30 && item4 < 30))
              ) {
                //10 的 前两个大于或都小于30~300范围时，选择最接近30或300的稀释度进行计算
                console.log(
                        "10 的 前两个大于或都小于30~300范围时，选择最接近30或300的稀释度进行计算"
                );
                if (item1 > 300) {
                  if (item1 - 300 < item3 - 300) {
                    item.sysReport = (
                            (((item1 + item2) / 2) * 10 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  } else {
                    item.sysReport = (
                            (((item3 + item4) / 2) * 100 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  }
                } else {
                  // 小于30
                  if (30 - item1 < 30 - item3) {
                    item.sysReport = (
                            (((item1 + item2) / 2) * 10 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  } else {
                    item.sysReport = (
                            (((item3 + item4) / 2) * 100 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  }
                }
              } else if (
                      item3 != 0 &&
                      item4 != 0 &&
                      item5 != 0 &&
                      item6 != 0 &&
                      ((item3 > 300 && item4 > 300 && item5 > 300 && item6 > 300) ||
                              (item3 < 30 && item4 < 30 && item5 < 30 && item6 < 30))
              ) {
                // 100 的大于或都小于30~300范围时，选择最接近30或300的稀释度进行计算
                console.log(
                        "100 的大于或都小于30~300范围时，选择最接近30或300的稀释度进行计算"
                );
                if (item3 > 300) {
                  if (item3 - 300 < item5 - 300) {
                    item.sysReport = (
                            (((item3 + item4) / 2) * 100 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  } else {
                    item.sysReport = (
                            (((item5 + item6) / 2) * 1000 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  }
                } else {
                  // 小于30
                  if (30 - item3 < 30 - item5) {
                    item.sysReport = (
                            (((item3 + item4) / 2) * 100 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  } else {
                    item.sysReport = (
                            (((item5 + item6) / 2) * 1000 * 50) /
                            volume
                    ).toFixed46(0);
                    if (item.sysReport > 100)
                      item.sysReport = Number(item.sysReport).num2e();
                  }
                }
              } else if (
                      (item1 > 300 && item2 > 300 && item3 < 30 && item4 < 30) ||
                      (item1 < 30 && item2 < 30 && item3 > 300 && item4 > 300)
              ) {
                console.log(
                        "前两个满足 若两个连续稀释度的平均值其中一个大于300，一个小于30，选择最小稀释度进行计算"
                );
                // 前两个满足 若两个连续稀释度的平均值其中一个大于300，一个小于30，选择最小稀释度进行计算
                item.sysReport = (
                        (((item1 + item2) / 2) * 10 * 50) /
                        volume
                ).toFixed46(0);
                if (item.sysReport > 100)
                  item.sysReport = Number(item.sysReport).num2e();
              } else if (
                      (item3 > 300 && item4 > 300 && item5 < 30 && item6 < 30) ||
                      (item3 < 30 && item4 < 30 && item5 > 300 && item6 > 300)
              ) {
                // 后两个满足 若两个连续稀释度的平均值其中一个大于300，一个小于30，选择最小稀释度进行计算
                console.log(
                        "后两个满足 若两个连续稀释度的平均值其中一个大于300，一个小于30，选择最小稀释度进行计算"
                );
                item.sysReport = (
                        (((item3 + item4) / 2) * 100 * 50) /
                        volume
                ).toFixed46(0);
                if (item.sysReport > 100)
                  item.sysReport = Number(item.sysReport).num2e();
              } else {
                item.sysReport = "录入值无效";
              }
            } else {
              item.sysReport = "录入值无效"; // 6项全满足30~300
            }
          } else {
            item.sysReport = "<" + dl;
          }
        } else {
          item.sysReport = "采样面积值无效";
        }
        this.$forceUpdate();
      },
      name(item) {
        let name = `${item.sampleNum}${
                item.sampleNumIndex ? item.sampleNumIndex : ""
                }${item.parallelLetter ? item.parallelLetter : ""}`;
        return name.replace(/\s*/g, "");
      },

      getDifference(item, nextItem) {
        let sysConcentration1 = Number(item.sysConcentrationCount);
        let sysConcentration2 = Number(nextItem.sysConcentrationCount);
        let resultArr = this.computeObj.difference(
                sysConcentration1,
                sysConcentration2,
                item.lessReport
        );
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
        this.$emit("update:jsonString");
        this.$emit("restart");
      },
      toShowTimeBox() {
        if (this.target != 4) {
          this.showTime = !this.showTime;
        }
      },
      checkBoxChange(val) {
      },
      checkIsParallel(sampleNum) {
      },
      changeTime(data) {
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
            sysConcentration3 = sysConcentration3.toFixed46(10);
            sysConcentration3 = Number(sysConcentration3).toPrecision(2);
          } catch (e) {
          }
        }
        item.sysReportCount = sysConcentration3;
        if (sysConcentration3 < Number(this.detectionLimitObj.detectionLimit)) {
          item.sysReport = `< ${this.detectionLimitObj.detectionLimit}`;
          item.lessReport = true;
          return `< ${this.detectionLimitObj.detectionLimit}`;
        } else {
          item.sysReport = sysConcentration3;
          item.lessReport = false;
          return sysConcentration3;
        }
      },
      showReport2(item) {
        let sysReport;
        try {
          sysReport = Number(item.sysConcentration).toFixed46(10);
          sysReport = Number(sysReport).toPrecision(2);
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
      changeState(val) {
        console.log(1, val);
        if (val === "正常") {
          this.data.valueData.sysSampleStateDetail = "";
        }
      },
    },
    mounted() {
      queryByPurpose("实验室").then(res => {
        if (res.success) {
          this.devices = res.data;
          this.devices.forEach(item => {
            item.showName =
                    item.deviceName + " " + item.deviceModel + " " + item.deviceNum;
          });
          console.log("获取设备成功2");
        } else {
          console.log("获取设备失败");
        }
      });
      let inp = document.getElementsByClassName("inp");
      let that = this;
      for (let i = 0; i < inp.length; i++) {
        inp[i].onclick = function (e) {
          let index = e.target.getAttribute("index");
          let result = e.target.checked;
          let isCheckBox = e.target.isCheckBox;
          that.$emit("selectedBox", {isCheckBox, index, result});
        };
      }
      console.log("project_wsw_jl_sjxs50cm2 数据", this.data);
    }
  };
</script>

<style scoped>
</style>
