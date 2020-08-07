<template>
  <div>
    <table class="myTable" border="1">
      <tr>
        <td>检测日期</td>
        <td colspan="9">
          <div>
            <divModel
              v-model="data.valueData.sysTestingTime"
              @click.native="toShowTimeBox"
              style="height: 30px; line-height: 30px;"
              :edit="false"
            ></divModel>
            <div class="timeBox" v-show="showTime">
              <el-date-picker
                v-model="data.valueData.sysTestingTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td style="width: 100px;">检测环境</td>
        <td>
          <divModel></divModel>
        </td>
        <td>℃；</td>
        <td>
          <divModel></divModel>
        </td>
        <td style="padding-left: 10px;" align="left" colspan="6">%RH</td>
      </tr>
      <tr>
        <td>检测仪器</td>
        <td colspan="3">
          <div>
            <el-checkbox-group v-model="data.valueData.testDeviceCheckBox">
              <el-checkbox :label="item.id" v-for="item of devices">{{
                item.deviceName
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </td>
        <td>仪器型号</td>
        <td colspan="2">
          <divModel></divModel>
        </td>
        <td>仪器编号</td>
        <td colspan="2">
          <divModel></divModel>
        </td>
      </tr>
      <tr>
        <td>样品状态</td>
        <td colspan="9" align="left" style="padding-left: 20px;">
          <el-radio-group v-model="data.valueData.sysSampleState">
            <el-radio :label="'正常'">正常</el-radio>
            <el-radio :label="'其他'">其他</el-radio>
          </el-radio-group>
        </td>
      </tr>
    </table>
    <div v-for="(item, index) in data.valueData.point" :key="index">
      <table class="myTable" border="1" v-if="!item.isParallel">
        <tr>
          <th style="width: 150px;">样品编号:{{ item.labSampleNum }}</th>
          <th>采样体积V（L）</th>
          <th>采样点温度t（℃）</th>
          <th>采样点气压p（kPa）</th>
          <th>峰面积</th>
          <th>解吸气浓度（μg/mL）</th>
          <th>空白气浓度（μg/mL）</th>
          <th>样品浓度ρ（mg/m3）</th>
          <th>报告值ρ（mg/m3）</th>
          <th>相对相差（%）</th>
        </tr>
        <tr v-for="(item2, index2) in item.arr" :key="index2">
          <td>{{ item2.name }}</td>
          <td>
            <divModel v-model="item.volume"></divModel>
          </td>
          <!--采样体积-->
          <td>
            <divModel v-model="item.temperature"></divModel>
          </td>
          <!--采样点温度-->
          <td>
            <divModel v-model="item.atmosphericPressure"></divModel>
          </td>
          <!--采样点气压-->

          <!--峰面积-->
          <td v-if="index2 == 8">
            <divModel
              v-model="item2.peakArea"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs6'"
              :computers="[
                item.parallelWindArea,
                item.arr[0].peakArea,
                item.arr[1].peakArea,
                item.arr[2].peakArea,
                item.arr[3].peakArea,
                item.arr[4].peakArea,
                item.arr[5].peakArea,
                item.arr[6].peakArea,
                item.arr[7].peakArea,
              ]"
            >
            </divModel>
          </td>
          <td v-else-if="index2 > 8">
            <div>/</div>
          </td>
          <td v-else>
            <divModel v-model="item2.peakArea" :edit="false"></divModel>
          </td>

          <!--解吸气浓度-->
          <td v-if="index2 == 8">
            <divModel
              v-model="item2.suckConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs7'"
              :computers="[
                regressionEquationValue1,
                regressionEquationValue2,
                regressionEquationValue3,
                item2.peakArea,
              ]"
            >
            </divModel>
          </td>
          <td v-else-if="index2 > 8">
            <div>/</div>
          </td>
          <td v-else>
            <divModel
              v-model="item2.suckConcentration"
              :edit="false"
            ></divModel>
          </td>

          <!--空白气浓度-->
          <td v-if="index2 == 8">
            <divModel
              v-model="item2.blankConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs7'"
              :computers="[
                regressionEquationValue1,
                regressionEquationValue2,
                regressionEquationValue3,
                item2.peakArea,
              ]"
            ></divModel>
          </td>
          <td v-else-if="index2 > 8">
            <div>/</div>
          </td>
          <td v-else>
            <divModel
              v-model="item2.blankConcentration"
              :edit="false"
            ></divModel>
          </td>

          <!--样品浓度-->
          <td v-if="index2 == 9">
            <divModel
              v-model="item2.sysConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs8'"
              :computers="[item.arr]"
            >
            </divModel>
          </td>
          <td v-else>
            <div>/</div>
          </td>

          <!--报告值-->
          <td v-if="index2 == 9">
            <divModel
              v-model="item2.sysReport"
              :edit="false"
              :is-computer="true"
              :computers="[
                '42128',
                item.arr[0].peakArea,
                item.arr[1].peakArea,
                item.arr[2].peakArea,
                item.arr[3].peakArea,
                item.arr[4].peakArea,
                item.arr[5].peakArea,
                item.arr[6].peakArea,
                item.arr[7].peakArea,
                item.arr[8].peakArea,
              ]"
              :computerFormula="'gs2'"
            ></divModel>
          </td>
          <td v-else>
            <div>/</div>
          </td>
          <td>
            <div>/</div>
          </td>
        </tr>
      </table>
      <table class="myTable" border="1" v-else>
        <tr>
          <th style="width: 150px;">样品编号:{{ item.labSampleNum }}</th>
          <th>采样体积V（L）</th>
          <th>采样点温度t（℃）</th>
          <th>采样点气压p（kPa）</th>
          <th>峰面积</th>
          <th>解吸气浓度（μg/mL）</th>
          <th>空白气浓度（μg/mL）</th>
          <th>样品浓度ρ（mg/m3）</th>
          <th>报告值ρ（mg/m3）</th>
          <th>相对相差（%）</th>
        </tr>
        <tr v-for="(item2, index2) in item.arr" :key="index2">
          <td>{{ item2.name }}</td>
          <td>
            <divModel v-model="item.volume"></divModel>
          </td>
          <!--采样体积-->
          <td>
            <divModel v-model="item.temperature"></divModel>
          </td>
          <!--采样点温度-->
          <td>
            <divModel v-model="item.atmosphericPressure"></divModel>
          </td>
          <!--采样点气压-->

          <!--峰面积-->
          <td v-if="index2 == 16">
            <divModel
              v-model="item2.peakArea"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs10'"
              :computers="fengMianJi2(item.parallelWindArea1, item.arr)"
            >
            </divModel>
          </td>
          <td v-else-if="index2 == 17">
            <divModel
              v-model="item2.peakArea"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs10'"
              :computers="fengMianJi(item.parallelWindArea2, item.arr)"
            >
            </divModel>
          </td>

          <td v-else="index2 > 17">
            <div>/</div>
          </td>
          <td v-else>
            <divModel v-model="item2.peakArea" :edit="false"> </divModel>
          </td>

          <!--解吸气浓度-->
          <td v-if="index2 == 17 || index2 == 16">
            <divModel
              v-model="item2.suckConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs12'"
              :computers="pingXingJieXi(item2.peakArea)"
            ></divModel>
          </td>

          <td v-else-if="index2 > 17">
            <div>/</div>
          </td>
          <td v-else>
            <divModel v-model="item2.suckConcentration" :edit="false">
            </divModel>
          </td>

          <!--空白气浓度-->
          <td v-if="index2 == 16">
            <divModel
              v-model="item2.blankConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs7'"
              :computers="pingXingFeng(item.arr)"
            >
            </divModel>
          </td>
          <td v-else-if="index2 == 17">
            <divModel
              v-model="item2.blankConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs7'"
              :computers="pingXingFeng2(item.arr)"
            >
            </divModel>
          </td>
          <td v-else-if="index2 > 17">
            <div>/</div>
          </td>
          <td v-else>
            <divModel v-model="item2.blankConcentration" :edit="false">
            </divModel>
          </td>

          <!--样品浓度-->
          <td v-if="index2 == 18">
            <divModel
              v-model="item2.sysConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs12'"
              :computers="dataFactory1(item.arr, item)"
            >
            </divModel>
          </td>
          <td v-else-if="index2 == 19">
            <divModel
              v-model="item2.sysConcentration"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs12'"
              :computers="dataFactory2(item.arr, item)"
            >
            </divModel>
          </td>
          <td v-else>
            <div>/</div>
          </td>

          <!--报告值-->
          <td v-if="index2 == 18" rowspan="2">
            <divModel
              v-model="item2.sysReport"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs11'"
              :computers="baoGaoAvg(item.arr)"
            >
            </divModel>
          </td>
          <td v-else-if="index2 !== 19">
            <div>/</div>
          </td>

          <!--相对相差-->
          <td v-if="index2 == 18" rowspan="2">
            <divModel
              v-model="item2.sysDifference"
              :edit="false"
              :is-computer="true"
              :computerFormula="'gs13'"
              :computers="xiangCha(item.arr)"
            ></divModel>
          </td>
          <td v-else-if="index2 !== 19">
            <div>/</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { queryByPurpose, querySysDeviceData } from "@/api/laboratory";

export default {
  name: "project_systvoc.vue",
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
  ],
  methods: {
    toShowTimeBox() {
      this.showTime = !this.showTime;
    },
    /*峰面积*/
    fengMianJi(val, computers) {
      let sysAreaArrResult = 0;
      computers.forEach((item, index) => {
        let re = index % 2;
        if (index <= 15 && re == 1) {
          sysAreaArrResult += Number(item.peakArea);
        }
      });
      let result = Number(val) - sysAreaArrResult;
      return [result];
    },

    fengMianJi2(val, computers) {
      let sysAreaArrResult = 0;
      computers.forEach((item, index) => {
        let re = index % 2;
        if (index <= 15 && re == 0) {
          sysAreaArrResult += Number(item.peakArea);
        }
      });
      let result = Number(val) - sysAreaArrResult;
      return [result];
    },

    /*浓度*/
    dataFactory2(computers, item) {
      try {
        let sysSuckConcentration = [];
        computers.forEach((item, index) => {
          if (index <= 17 && index % 2 == 0) {
            sysSuckConcentration.push(item.suckConcentration);
          }
        });
        let sysBlankConcentration = [];
        computers.forEach((item, index) => {
          if (index <= 17 && index % 2 == 0) {
            sysBlankConcentration.push(item.blankConcentration);
          }
        });
        let v8 = Number(item.volume);
        let t8 = Number(item.sysTemperature);
        let p8 = Number(item.atmosphericPressure);
        let sysSuckConcentrationResult = 0;
        let val = 0;
        sysSuckConcentration.forEach((item, index) => {
          sysSuckConcentrationResult +=
            Number(item) - Number(sysBlankConcentration[index]);
          let computered = this.nongDuComputer(
            item,
            sysBlankConcentration[index],
            v8,
            t8,
            p8
          );
          val += computered;
        });
        let result =
          (Number(sysSuckConcentrationResult) * 100) /
          (v8 * (273 / (273 + t8)) * (p8 / 101));
        if (isNaN(result)) result = 0;
        return [result];
      } catch (e) {
        console.log("浓度异常", e);
        return [0];
      }
    },

    /*浓度*/
    dataFactory1(computers, item) {
      try {
        let sysSuckConcentration = [];
        computers.forEach((item, index) => {
          if (index <= 17 && index % 2 == 1) {
            sysSuckConcentration.push(item.suckConcentration);
          }
        });
        let sysBlankConcentration = [];
        computers.forEach((item, index) => {
          if (index <= 17 && index % 2 == 1) {
            sysBlankConcentration.push(item.blankConcentration);
          }
        });
        let v8 = Number(item.volume);
        let t8 = Number(item.sysTemperature);
        let p8 = Number(item.atmosphericPressure);
        let sysSuckConcentrationResult = 0;
        let val = 0;
        sysSuckConcentration.forEach((item, index) => {
          sysSuckConcentrationResult +=
            Number(item) - Number(sysBlankConcentration[index]);
          let computered = this.nongDuComputer(
            item,
            sysBlankConcentration[index],
            v8,
            t8,
            p8
          );
          val += computered;
        });
        let result =
          (Number(sysSuckConcentrationResult) * 100) /
          (v8 * (273 / (273 + t8)) * (p8 / 101));
        if (isNaN(result)) result = 0;
        return [result];
      } catch (e) {
        console.log("浓度异常", e);
        return [0];
      }
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
        shizi += regressionEquationValue3 + ")/" + regressionEquationValue1;
        let nongResult = eval(shizi);
        if (isNaN(nongResult)) nongResult = 0;
        let result = nongResult;
        result = (sysArea - 481.029) / 875426; //测试代码可删除
        return [result];
      } catch (e) {
        console.log("异常", e);
        return [0];
      }
    },

    nongDuComputer(jie, blank, v, t, p) {
      if (Number(jie) - Number(blank) < 0) {
        return 0;
      }
      let result =
        ((Number(jie) - Number(blank)) * 100) /
        (v * (273 / (273 + t)) * (p / 101));
      result = eval(result);
      return result;
    },

    changeYiQiData(sampleNum, data) {
      querySysDeviceData(sampleNum).then((res) => {
        let tvocData = res.data;
        data.forEach((item) => {
          if (item.isParallel) {
            let labNum = item.labSampleNum + "-1";
            let labNum2 = item.labSampleNum + "-2";
            let labDataArr = [];
            tvocData.forEach((item) => {
              if (item.sysSampleNum == labNum || item.sysSampleNum == labNum2) {
                let name = item.testProject.trim();
                let num = item.sysSampleNum
                  .substr(item.sysSampleNum.length - 2, 2)
                  .trim();
                name = name + num;
                item.testProject = name;
                labDataArr.push(item);
              }
            });
            let arr = item.arr;
            arr.forEach((item) => {
              let name = item.name;
              let itemData = labDataArr.find((item2) => {
                let name2 = item2.testProject;
                return name2 == name;
              });
              if (itemData && Object.getOwnPropertyNames(itemData).length > 0) {
                let keys = Object.keys(itemData);
                keys.forEach((item3) => {
                  item[item3] = itemData[item3];
                });
              }
            });
          } else {
            let labNum = item.labSampleNum;
            let labDataArr = [];
            tvocData.forEach((item) => {
              if (item.sysSampleNum == labNum) {
                labDataArr.push(item);
              }
            });
            let arr = item.arr;
            arr.forEach((item) => {
              let name = item.name;

              let itemData = labDataArr.find((item2) => {
                name = name.trim();
                item2.testProject = item2.testProject.trim();
                return item2.testProject == name;
              });

              if (itemData && Object.getOwnPropertyNames(itemData).length > 0) {
                let keys = Object.keys(itemData);
                keys.forEach((item3) => {
                  item[item3] = itemData[item3];
                });
              }
            });
          }
        });
      }); //isParallel
    },

    pingXingFeng(arr) {
      try {
        let result = 0;
        arr.forEach((item, index) => {
          if (index <= 15 && index % 2 == 0) {
            result += Number(item.blankPeakArea);
          }
        });
        let allFeng = 0;
        if (this.allFeng !== "") allFeng = this.allFeng;
        let result2 = Number(allFeng) - result;
        return [
          this.regressionEquationValue1,
          this.regressionEquationValue2,
          this.regressionEquationValue3,
          result2,
        ];
      } catch (e) {
        return [
          this.regressionEquationValue1,
          this.regressionEquationValue2,
          this.regressionEquationValue3,
          0,
        ];
      }
    },

    pingXingFeng2(arr) {
      try {
        let result = 0;
        arr.forEach((item, index) => {
          if (index <= 15 && index % 2 == 1) {
            result += Number(item.blankPeakArea);
          }
        });
        let allFeng = 0;
        if (this.allFeng !== "") allFeng = this.allFeng;
        let result2 = Number(allFeng) - result;
        return [
          this.regressionEquationValue1,
          this.regressionEquationValue2,
          this.regressionEquationValue3,
          result2,
        ];
      } catch (e) {
        return [
          this.regressionEquationValue1,
          this.regressionEquationValue2,
          this.regressionEquationValue3,
          0,
        ];
      }
    },

    baoGaoAvg(item) {
      let nong1 = Number(item[18].sysConcentration);
      let nong2 = Number(item[19].sysConcentration);
      let nong3 = (nong2 + nong1) / 2;
      return [nong3];
    },

    xiangCha(item) {
      let nong1 = Number(item[18].sysConcentration);
      let nong2 = Number(item[19].sysConcentration);
      let nong3 = Math.abs(nong1 - nong2);
      let nong4 = (nong1 + nong2) / 2;
      let nong5 = (nong3 / nong4) * 100;
      return [nong5];
    },
  },

  mounted() {
    queryByPurpose("实验室").then((res) => {
      if (res.success) {
        this.devices = res.data;
      }
    });
    let sampleNum = this.data.valueData.point.map((item) => item.labSampleNum);
    this.changeYiQiData(sampleNum, this.data.valueData.point);
  },
};
</script>

<style scoped>
</style>
