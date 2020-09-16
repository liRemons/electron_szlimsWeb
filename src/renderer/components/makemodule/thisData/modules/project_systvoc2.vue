<template>
  <div>
    <div
      class="___relative"
      style="border: 1px solid black; border-bottom: none"
    >
      <div class="___relative tc" style="width: 80px; line-height: 32px">
        <span>稀释倍数</span>
      </div>
      <div
        class="___absolute t0"
        style="width: 100px; left: 80px; line-height: 32px"
      >
        <divModel
          @change="synchronizationId"
          v-model="data.valueData.sysSolutionMultiple"
          :edit="target != '4'"
          :is-num-box="true"
        ></divModel>
      </div>
    </div>
    <table border="1" class="myTable">
      <tr>
        <th style="width: 155px; text-align: left; padding-left: 5px">
          样品编号：{{ mySample }}
          <br />
          空白编号：{{
            data.valueData.myBlankSample &&
            data.valueData.myBlankSample.length > 0
              ? data.valueData.myBlankSample[0].labSampleNum
              : ""
          }}
        </th>
        <th>采样体积<br>V(L)</th>
        <th>采样点温度<br>t(℃)</th>
        <th style="width: 80px">采样点气压<br>p(kPa)</th>
         <th style="width: 80px">标准体积<br />Vo(L)</th>
        <th style="width: 80px">峰面积</th>
        <th style="width: 100px">样品管组分含量<br>(μg/mL)</th>
        <th style="width: 140px">空白样品管组分含量<br>(μg/mL)</th>
        <th style="width: 120px">样品浓度<br>ρ(mg/m3)</th>
        <th style="width: 110px">报告值<br>ρ(mg/m3)</th>
        <th>相对相差<br>(%)</th>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index">
        <td>{{ item.testProject }}</td>
        <!--样品编号-->

        <td>
          <!--采样体积-->
          <divModel :edit="false" v-model="item.volume"></divModel>
        </td>

        <td>
          <!--采样点温度-->
          <divModel :edit="false" v-model="item.temperature"></divModel>
        </td>

        <td>
          <!--采样点气压-->
          <divModel :edit="false" v-model="item.atmosphericPressure"></divModel>
        </td>
        <td>
          <!--标准体积-->
          <divModel
            v-if="showXieGan3(item)"
            v-model="item.standardVo"
            :edit="false"
          ></divModel>
          <span v-else></span>
        </td>
        <!--峰面积-->
        <td v-if="showXieGan5(item) == 0">
          <divModel
            v-model="item.peakArea"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs10'"
            :computers="
              fengMianJi(data.valueData.allPoint[0].parallelWindArea1, '-A')
            "
          >
          </divModel>
        </td>
        <td v-else-if="showXieGan5(item) == 1">
          <divModel
            v-model="item.peakArea"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs10'"
            :computers="
              fengMianJi(data.valueData.allPoint[0].parallelWindArea2, '-B')
            "
          >
          </divModel>
        </td>
        <td v-else-if="showXieGan5(item) == 3">
          <div>/</div>
        </td>
        <td v-else>
          <!--峰面积-->
          <divModel :edit="false" v-model="item.peakArea"></divModel>
        </td>

        <td v-if="showXieGan(item) == 0">
          <divModel
            v-model="item.suckConcentration"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs12'"
            :computers="pingXingJieXi(item.peakArea)"
          >
          </divModel>
        </td>
        <td v-else-if="showXieGan(item) == 1">
          <div>/</div>
        </td>
        <td v-else>
          <divModel :edit="false" v-model="item.suckConcentration"></divModel>
        </td>

        <!--空白气浓度-->
        <td v-if="showXieGan2(item) == 0">
          <divModel
            v-model="item.blankConcentration"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs7'"
            :computers="pingXingFeng(0)"
          >
          </divModel>
        </td>
        <td v-else-if="showXieGan2(item) == 1">
          <divModel
            v-model="item.blankConcentration"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs7'"
            :computers="pingXingFeng(1)"
          >
          </divModel>
        </td>
        <td v-else-if="showXieGan2(item) == 2">
          <div>/</div>
        </td>
        <td v-else>
          <divModel v-model="item.blankConcentration" :edit="false"></divModel>
        </td>

        <td v-if="showXieGan3(item) == 0">
          <divModel
            v-model="item.sysConcentration"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs15'"
            :computers="
              dataFactory(item, 0, data.valueData.sysSolutionMultiple)
            "
          ></divModel>
        </td>
        <td v-else-if="showXieGan3(item) == 1">
          <divModel
            v-model="item.sysConcentration"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs15'"
            :computers="
              dataFactory(item, 1, data.valueData.sysSolutionMultiple)
            "
          ></divModel>
        </td>
        <td v-else>
          <!--样品浓度-->
          <div>{{item.sysConcentration}}</div>
        </td>

        <td v-if="showXieGan4(item) == 0" rowspan="2">
          <!--报告值-->
          <divModel
            v-model="item.sysReport"
            :edit="false"
            :is-computer="true"
            :computerFormula="'gs15'"
            :computers="baoGaoAvg(data.valueData.point, index)"
          ></divModel>
        </td>

        <td v-if="showXieGan4(item) == 1 && showXieGan4(item) !== 3">
          <!--报告值-->
          <div>/</div>
        </td>

        <td v-if="showXieGan4(item) == 0" rowspan="2">
          <!--相对相差-->
          {{ xiangCha(data.valueData.point, index) }}
        </td>
        <td v-if="showXieGan4(item) == 1 && showXieGan4(item) !== 3">
          <!--相对相差-->
          <div>/</div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "project_systvoc2.vue",
  data() {
    return {
      showTime: false,
      devices: [],
    };
  },
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
    "regressionEquationValue1",
    "regressionEquationValue2",
    "regressionEquationValue3",
    "allFeng",
    "detectionLimitObj",
    "target",
  ],
  computed: {
    mySample() {
      if (this.data.valueData.point[0]) {
        let name =
          this.data.valueData.point[0].sysSampleNum ||
          this.data.valueData.allPoint[0].sampleNum;
        let nameArr = name.split("-");
        return nameArr[0] + this.data.valueData.point[0].sampleNumIndex;
      } else {
        return "";
      }
    },
  },
  methods: {
    synchronizationId() {
      this.jsonString.forEach((item, index) => {
        if (item.data.valueData.multipleId === this.data.valueData.multipleId) {
          item.data.valueData.sysSolutionMultiple = this.data.valueData.sysSolutionMultiple;
        }
      });
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
        if (
          this.isNumber(regressionEquationValue3) &&
          this.isNumber(regressionEquationValue1)
        ) {
          shizi += regressionEquationValue3 + ")/" + regressionEquationValue1;
          let nongResult = eval(shizi);
          if (isNaN(nongResult)) nongResult = 0;
          let result = nongResult;
          return [result];
        } else {
          return [0];
        }
      } catch (e) {
        console.log("异常", e);
        return [0];
      }
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    pingXingFeng(num) {
      let arr = this.data.valueData.allPoint;
      try {
        let result = 0;
        arr.forEach((item, index) => {
          if (index <= 15 && index % 2 === num) {
            result += Number(item.blankPeakArea);
          }
        });
        let allFeng = "";
        if (this.allFeng !== "") allFeng = this.allFeng;
        if (this.isNumber(allFeng) && this.isNumber(result)) {
          let result2 = Number(allFeng) - result;
          return [
            this.regressionEquationValue1,
            this.regressionEquationValue2,
            this.regressionEquationValue3,
            result2,
          ];
        } else {
          return [
            this.regressionEquationValue1,
            this.regressionEquationValue2,
            this.regressionEquationValue3,
            0,
          ];
        }
      } catch (e) {
        return [
          this.regressionEquationValue1,
          this.regressionEquationValue2,
          this.regressionEquationValue3,
          0,
        ];
      }
    },

    fengMianJi(val, str) {
      let sysAreaArrResult = 0;
      this.data.valueData.allPoint.forEach((item, index) => {
        if (index <= 16 && item.parallelLetter === str) {
          sysAreaArrResult += Number(item.peakArea);
        }
      });
      let result = Number(val) - sysAreaArrResult;
      return [result];
    },

    dataFactory(item, num, xs) {
      let computers = this.data.valueData.allPoint;
      try {
        let sysSuckConcentration = [];
        let sysBlankConcentration = [];
        computers.forEach((item, index) => {
          if (index <= 16 && index % 2 === num) {
            sysSuckConcentration.push(item.suckConcentration);
            sysBlankConcentration.push(item.blankConcentration);
          }
        });
        let modulesArr = this.jsonString.filter(
          (item, index) =>
            item.data.valueData.multipleId === this.data.valueData.multipleId
        );
        let point = modulesArr[modulesArr.length - 1].data.valueData.point;
        let surplusData = point.find(
          (item, index) =>
            "其他（以甲苯计）" + (num === 0 ? "-A" : "-B") === item.testProject
        );
        sysSuckConcentration.push(surplusData.suckConcentration);
        sysBlankConcentration.push(surplusData.blankConcentration);
        let v8 = Number(item.volume);
        let t8 = Number(item.temperature);
        let p8 = Number(item.atmosphericPressure);

        let sysSuckConcentrationResult = 0;
        let val = 0;
        sysSuckConcentration.forEach((item, index) => {
          let sysBlankConcentrationValue =
            Number(sysBlankConcentration[index]) > Number(item)
              ? 0
              : Number(sysBlankConcentration[index]);
          sysSuckConcentrationResult +=
            Number(item) - sysBlankConcentrationValue;
          let computered = this.nongDuComputer(
            item,
            sysBlankConcentrationValue,
            v8,
            t8,
            p8
          );
          val += computered;
        });
        let result =
          ((Number(sysSuckConcentrationResult) * 100) /
            (v8 * (273 / (273 + t8)) * (p8 / 101))) *
          xs;
        item.sysConcentrationCount = result;
        if (isNaN(result)) result = 0;

        if (result < Number(this.detectionLimitObj.detectionLimit)) {
          return ["< " + Number(this.detectionLimitObj.detectionLimit)];
        } else {
          result = result.toFixed46(3, true, true);
          return [result];
        }
      } catch (e) {
        console.log("浓度异常", e);
        return [0];
      }
    },

    baoGaoAvg(item, index) {
      let nong1 = Number(item[index].sysConcentration);
      let nong2 = Number(item[index + 1].sysConcentration);
      let nong3 = (nong2 + nong1) / 2;
      item.sysReportCount = nong3;
      if (nong3 < Number(this.detectionLimitObj.detectionLimit)) {
        return [`< ${this.detectionLimitObj.detectionLimit}`];
      } else {
        return [nong3.toFixed46(2)];
      }
    },

    nongDuComputer(jie, blank, v, t, p) {
      if (Number(jie) - Number(blank) < 0) {
        return 0;
      }
      let result =
        ((Number(jie) - Number(blank)) * 100) /
        (v * (273 / (273 + Number(t))) * (p / 101));
      result = eval(result);
      return result;
    },
    xiangCha(point, index) {
      let obj = point[index];
      let obj2 = point[index + 1];
      let sysConcentration1 = Number(obj.sysConcentrationCount).toFixed46(3);
      let sysConcentration2 = Number(obj2.sysConcentrationCount).toFixed46(3);
      // this.detectionLimitObj
      let resultArr = this.computeObj.difference(
        sysConcentration1,
        sysConcentration2
      );
      obj.sysDifference = resultArr[0];
      obj.sysDifferenceCount = resultArr[1];
      obj2.sysDifference = resultArr[0];
      obj2.sysDifferenceCount = resultArr[1];
      return obj.sysDifference;
    },
    showXieGan(item) {
      let name = item.testProject;
      if (name.indexOf("其他") != -1) {
        return 0;
      } else if (name.indexOf("TVOC总计") != -1) {
        return 1;
      } else {
        return 3;
      }
    },
    showXieGan2(item) {
      let name = item.testProject;
      if (name.indexOf("其他") != -1 && name.indexOf("-A") != -1) {
        return 0;
      } else if (name.indexOf("其他") != -1 && name.indexOf("-B") != -1) {
        return 1;
      } else if (name.indexOf("TVOC总计") != -1) {
        return 2;
      } else {
        return 3;
      }
    },
    showXieGan3(item) {
      let name = item.testProject;
      if (name.indexOf("总计") != -1 && name.indexOf("-A") != -1) {
        return 0;
      } else if (name.indexOf("总计") != -1 && name.indexOf("-B") != -1) {
        return 1;
      } else {
        return 2;
      }
    },
    showXieGan4(item) {
      let name = item.testProject;
      if (name.indexOf("TVOC总计-A") != -1) {
        return 0;
      } else if (name.indexOf("TVOC总计-B") != -1) {
        return 3;
      } else {
        return 1;
      }
    },
    showXieGan5(item) {
      let name = item.testProject;
      if (
        name.indexOf("TVOC总计-A") != -1 ||
        name.indexOf("TVOC总计-B") != -1
      ) {
        return 3;
      } else if (name.indexOf("其他") != -1 && name.indexOf("-A") != -1) {
        return 0;
      } else if (name.indexOf("其他") != -1 && name.indexOf("-B") != -1) {
        return 1;
      } else {
        return 2;
      }
    },
  },

  mounted() {
    this.data.valueData.sampleNum = this.mySample;
    this.data.valueData.sysSampleId = this.data.valueData.allPoint[0].sysSampleId;
    this.data.valueData.pageNumber = this.pageNumber;
    this.data.valueData.mySample = this.mySample;
    this.data.valueData.point.forEach(item => {
      // let rowIndex = this.data.valueData.allPoint.findIndex(item2 => item2.testProject == item.testProject);
      // this.data.valueData.allPoint[rowIndex] = item;
      // 标准体积
      item.standardVo = (
        (Number(item.volume) * 273 * Number(item.atmosphericPressure)) /
        (Number(item.temperature) + 273) /
        101.3
      ).toFixed46(3);
      // 样品浓度
      if (this.showXieGan3(item)) {
        item.sysConcentration = (
          (item.suckConcentration - item.blankConcentration) /
          item.standardVo
        ).toFixed46(5);
      }
    });
    this.data.valueData.allPoint.forEach((item, index) => {
      if (index <= 17) {
        item.sysConcentration = "";
      }
    });
  },
};
</script>

<style scoped>
</style>
