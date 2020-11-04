<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <div
        style="
          border: 1px solid black;
          line-height: 32px;
          text-align: left;
          padding-left: 10px;
          border-top: none;
          border-bottom: none;
        "
      >
        检测项目：{{ data.valueData.testProjectChineseName
        }}{{ data.valueData.detectionLimitPieces }} &nbsp;&nbsp;&nbsp;&nbsp;
        检测依据:{{ data.valueData.xcStandardNum }} &nbsp;&nbsp;{{
          data.valueData.standardUseTerms
        }}
      </div>
      <table class="myTable">
        <tr>
          <td class="___relative tc" style="width: 100px">
            <span>样品编号</span>
          </td>
          <td class="___relative tc" style="width: 160px">
            <span>检测地点</span>
          </td>
          <td class="___relative tc" style="width: 90px">
            <span>仪表附温t(℃)</span>
          </td>
          <td class="___relative tc" style="width: 80px; line-height: 16px">
            <span>仪表示值<br />Ps(hPa)</span>
          </td>
          <td class="___relative tc" style="width: 80px; line-height: 16px">
            <span>刻度订正值<br />P₁(hPa)</span>
          </td>
          <td class="___relative tc" style="width: 90px; line-height: 16px">
            <span>刻温度系数<br />hPa/℃</span>
          </td>
          <td class="___relative tc" style="width: 100px; line-height: 16px">
            <span>补充订正值P3<br />(hPa)</span>
          </td>
          <td class="___relative tc" style="width: 100px; line-height: 16px">
            <span>检测结果P<br />(hPa)</span>
          </td>
          <td class="___relative tc" style="width: 100px; line-height: 16px">
            <span>检测结果<br />平均值</span>
          </td>
          <td class="___relative tc" style="width: 80px">
            <span>检测时间</span>
          </td>
          <td class="___relative tc" style="width: 100px">
            <span>仪器编号</span>
          </td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td @click="generateSampleNum(data.valueData.point)">
            <span>{{ item.sampleNum + "" + item.sampleNumIndex }}</span>
          </td>
          <td class="___relative tc">
            <selectModel
              @returnVal="returnVal"
              :single="true"
              :rows="false"
              :disabled="task.docPass === 1 || target != 0"
              :special="index"
              :Judge="true"
              :input="false"
              :receive="'SampleAddress'"
              :factor="true"
              :watchTransmitText="true"
              :transmitText="item.SampleAddress"
              :list="myggcspoint"
              :Obj="''"
            >
            </selectModel>
          </td>
          <td>
            <myInput
              v-model="item.temperature"
              @change.native="changeNum(index)"
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="item.meterVal"
              @change.native="changeNum(index)"
            ></myInput>
          </td>
          <td>
            {{ item.scaleVal }}
          </td>
          <td>
            <myInput
              v-model="item.temperatureCoefficient"
              @change.native="changeNum(index)"
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="item.supplementVal"
              @change.native="changeNum(index)"
            ></myInput>
          </td>
          <td>
            {{ item.result }}
          </td>
          <td v-if="item.first" :rowspan="item.size">
            {{ item.resultAverage }}
          </td>
          <td class="___relative">
            <timePickerModel
              :data="item"
              :showTime="item.time"
              @setTime="(time) => (item.time = time)"
            />
          </td>
          <td class="___relative tc">
            <querySelect
              v-model="item.deviceNum"
              v-if="target === '0'"
              ref="querySelect"
              :num="index"
              :list="deviceData"
              @reset="reset"
              :defaultValue="item.deviceNum"
              @getSelectItem="returnVal2"
              :name="'deviceNum'"
            >
            </querySelect>
            <div v-else>
              {{ item.deviceNum }}
            </div>
            <div
              class="___absolute toolBar"
              style="left: 157px; top: 0; width: 180px"
            >
              <div
                title="往指定行后面增加一行"
                class="___absolute tc"
                @click="addRow(index)"
              >
                +
              </div>
              <div
                title="删除当前行"
                class="___absolute tc"
                style="left: 30px"
                @click="deleteRow(index, item)"
              >
                -
              </div>
              <div
                title="复制部分数据"
                class="___absolute tc"
                style="left: 60px"
                @click="copyRow(index, 'copy')"
              >
                c
              </div>
              <div
                title="复制全部数据"
                class="___absolute tc"
                style="left: 90px"
                @click="copyRow(index, 'copyAll')"
              >
                C
              </div>
              <div
                title="粘贴数据"
                class="___absolute tc"
                style="left: 120px"
                @click="pasteRow(index)"
              >
                p
              </div>
              <div
                title="生成平行样"
                class="___absolute tc"
                style="left: 150px"
                @click="addSample(index)"
              >
                r
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog
      :visible.sync="sampleOption"
      width="60%"
      :modal="false"
      :title="'操作'"
    >
      <el-form :inline="true">
        <el-row>
          <el-col :span="12">
            <el-form-item label="采样布点">
              <el-select
                v-model="myCaiSample"
                placeholder="请选择采样布点"
                @change="getSampleQuantity"
              >
                <el-option
                  :label="item"
                  :value="item"
                  v-for="item in factorList"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="样品数量">
              <el-input
                placeholder="请输入样品数量"
                @keyup.native="
                  myCaiSampleNum = myCaiSampleNum.replace(/[^\d]/g, '')
                "
                :disabled="myCaiSample !== '其它' && myCaiSample !== '均匀布点'"
                v-model="myCaiSampleNum"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: right; margin-right: 50px">
        <el-button
          style="margin-top: 15px; margin-left: 470px"
          type="primary"
          @click="sureSampleNum"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
      sampleOption: false,
      myCaiSample: "",
      myCaiSampleNum: "",
      factorList: [
        "中央布点",
        "对称布点",
        "对角线布点",
        "梅花布点",
        "均匀布点",
        "其它",
      ],
      myggcspoint: [],
    };
  },
  computed: {},
  watch: {
    "data.valueData.point": function () {
      this.merge();
    },
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
    "task",
    "target",
    "deviceData",
  ],
  filters: {},
  methods: {
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    decompose(data, Judge) {
      let arr = [];
      data.forEach((item, index) => {
        let obj = {};
        if (Judge === 1) {
          obj.value = item.measure1 + "/" + item.Amendment;
        } else {
          obj.value = item.Amendment;
          obj.key = [item.measure1, item.measure2];
        }
        arr.push(obj);
      });
      return arr;
    },
    getResultAverageArr(sampleNum) {
      if (sampleNum) {
        let dataArr = [];
        this.jsonString.forEach((item, index) => {
          if (
            item.data.name === "project_jc_dqy" &&
            this.data.valueData.multipleId === item.data.valueData.multipleId
          ) {
            dataArr.push(
              ...item.data.valueData.point.filter(
                (val, num) =>
                  val.sampleNum.split("-")[0] === sampleNum.split("-")[0]
              )
            );
          }
        });
        let resultAverageArr = [];
        dataArr.forEach((item, index) => {
          if (item.sampleNum) {
            if (
              item.sampleNum.split("-")[0] === sampleNum.split("-")[0] &&
              this.isNumber(item.result)
            ) {
              resultAverageArr.push(item.result);
            }
          }
        });
        dataArr.forEach((item, index) => {
          if (
            item.sampleNum &&
            item.sampleNum.split("-")[0] === sampleNum.split("-")[0] &&
            this.isNumber(item.result)
          ) {
            let average = this.average(resultAverageArr);
            if (this.isNumber(average)) {
              dataArr[index].resultAverage = average.toFixed46(
                this.sizeMin(resultAverageArr),
                false,
                true
              );
            }
          }
        });
      }
    },
    changeNum(index) {
      // temperature
      // meterVal
      // scaleVal
      // temperatureCoefficient
      // supplementVal
      // result
      let temperature = parseFloat(
        this.data.valueData.point[index].temperature
      );
      let meterVal = parseFloat(this.data.valueData.point[index].meterVal);
      let temperatureCoefficient = parseFloat(
        this.data.valueData.point[index].temperatureCoefficient
      );
      let supplementVal = parseFloat(
        this.data.valueData.point[index].supplementVal
      );
      if (
        this.data.valueData.point[index].factorArr !== "" &&
        this.data.valueData.point[index].method !== "" &&
        this.isNumber(meterVal)
      ) {
        let factorArr = this.decompose(
          this.data.valueData.point[index].factorArr,
          this.data.valueData.point[index].method
        );
        let correction = "";
        if (this.data.valueData.point[index].method === 1) {
          correction = this.getFactor(
            this.data.valueData.point[index].meterVal,
            factorArr
          );
        } else {
          correction = this.getRange(
            this.data.valueData.point[index].meterVal,
            factorArr
          );
        }
        this.data.valueData.point[index].scaleVal = correction;
        let scaleVal = parseFloat(correction);
        if (
          this.isNumber(temperature) &&
          this.isNumber(meterVal) &&
          this.isNumber(temperatureCoefficient) &&
          this.isNumber(supplementVal)
        ) {
          let P2 = temperatureCoefficient * temperature;
          this.data.valueData.point[index].result = parseFloat(
            meterVal + scaleVal + P2 + supplementVal
          ).toFixed46(1, false, true);
          this.getResultAverageArr(this.data.valueData.point[index].sampleNum);
        }
      } else {
        this.data.valueData.point[index].scaleVal = "";
        this.data.valueData.point[index].result = "";
        this.getResultAverageArr(this.data.valueData.point[index].sampleNum);
      }
    },
    returnVal(showText, receive, special, selectedObj) {
      this.data.valueData.point[special][receive] = showText;
    },
    returnVal2(index, val) {
      if (val.deviceFactor != null && val.calibrationMethod != null) {
        if (
          val.calibrationMethod === "测量值/修正值" ||
          val.calibrationMethod === "测量值/修正因子"
        ) {
          this.data.valueData.point[index].method = 1;
        } else if (
          val.calibrationMethod === "测量范围/修正值" ||
          val.calibrationMethod === "测量范围/修正因子"
        ) {
          this.data.valueData.point[index].method = 2;
        }
        if (
          val.calibrationMethod === "测量值/修正因子" ||
          val.calibrationMethod === "测量范围/修正因子"
        ) {
          this.data.valueData.point[index].algorithm = 1;
        } else if (
          val.calibrationMethod === "测量值/修正值" ||
          val.calibrationMethod === "测量范围/修正值"
        ) {
          this.data.valueData.point[index].algorithm = 2;
        }
        this.data.valueData.point[index].SampleTools = val.id;
        this.data.valueData.point[index].factorArr = val.deviceFactor;
        this.data.valueData.point[index].deviceNum = val.deviceNum;
      }
    },
    reset() {
      this.data.valueData.point.forEach((item, index) => {
        this.changeNum(index);
      });
    },
    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item,
        this.data.valueData.multipleId
      );
    },
    addRow(index) {
      let row = JSON.parse(JSON.stringify(this.data.modelRow));
      row.pointId = window.uuid();
      row.foreverId = window.uuid();
      row.SampleAddress = this.data.valueData.point[index].SampleAddress;
      this.data.valueData.point.splice(index + 1, 0, row);
      this.$emit("redefinition");
    },
    deleteRow(index, item) {
      if (this.data.valueData.point.length > 1) {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false,
        }).then(({}) => {
          this.data.valueData.point.splice(index, 1);
          this.$emit("deleteSample", item);
        });
      } else {
        this.$message.warning(
          "当页本项目只有一行时不可删除，如下页还有本项目，请在上方其他项目增加行后方可删除"
        );
      }
    },
    copyRow(index, copyName) {
      let obj = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
      sessionStorage.setItem("copy", copyName);
      sessionStorage.setItem("cyhjRowData", JSON.stringify(obj));
    },
    pasteRow(index) {
      let newObjData = JSON.myParse(sessionStorage.getItem("cyhjRowData"));
      newObjData.pointId = window.uuid();
      newObjData.foreverId = window.uuid();
      let keys = Object.keys(this.data.valueData.point[index]);
      let copy = sessionStorage.getItem("copy");
       if (copy === "copyAll") {
        let now = this.jsonString
          .filter(
            (item) =>
              item.data.valueData.testProjectId ===
              this.data.valueData.testProjectId
          )
          .map((item) => item.data.valueData.point)
          .flat()
          .map((item) => item.sampleNum + item.sampleNumIndex);
        if (now.includes(newObjData.sampleNum + newObjData.sampleNumIndex)) {
          this.$message.warning("不能在同一项目下生成两个同样的样品编号");
          return;
        }
      }
      keys.forEach((item) => {
        if (copy === "copyAll") {
          this.data.valueData.point[index][item] = newObjData[item];
        } else {
          let noCopy = this.data.noCopyArr;
          let result = noCopy.some((key) => key === item);
          if (newObjData[item] && result === false) {
            this.data.valueData.point[index][item] = newObjData[item];
          }
        }
      });
      setTimeout(() => {
        this.$eventBus.$emit("showText");
      }, 10);
    },
    addSample(index) {
      this.selectItem = this.data.valueData.point[index];
      this.selectItemIndex = index;
      this.sampleOption = true;
    },

    getSampleQuantity(value) {
      if (value === "中央布点") {
        this.myCaiSampleNum = 1;
      } else if (value === "对称布点") {
        this.myCaiSampleNum = 2;
      } else if (value === "对角线布点") {
        this.myCaiSampleNum = 3;
      } else if (value === "梅花布点") {
        this.myCaiSampleNum = 5;
      } else {
        this.myCaiSampleNum = "";
      }
    },
    clearPingXing() {
      this.jsonString.forEach((item) => {
        if (
          item.data.valueData.testProjectId ===
          this.data.valueData.testProjectId
        ) {
          let result = item.data.valueData.point.some(
            (item2) => item2.foreverId === this.selectItem.foreverId
          );
          if (result) {
            let arr = item.data.valueData.point.filter(
              (item3) => item3.foreverId !== this.selectItem.foreverId
            );
            item.data.valueData.point = arr;
          }
        }
      });
    },
    sureSampleNum() {
      if (this.selectItem.sampleNum == "") {
        this.$notify({
          type: "warning",
          message: "样品编号为空",
        });
        return;
      }
      if (this.myCaiSample === "" || this.myCaiSampleNum === "") {
        return;
      }
      this.selectItem.SamplePoint = this.myCaiSample;
      this.selectItem.sampleQuantity = this.myCaiSampleNum;
      this.sampleOption = false;
      this.myCaiSample = "";
      this.myCaiSampleNum = "";

      let arr = [];
      if (this.selectItem.sampleQuantity == 1) {
        this.clearPingXing();
        let obj = JSON.parse(JSON.stringify(this.selectItem));
        obj.sampleNumIndex = "";
        this.data.valueData.point.splice(this.selectItemIndex, 0, obj);
      } else {
        this.clearPingXing();
        for (let i = 0; i < this.selectItem.sampleQuantity; i++) {
          let obj = JSON.myParse(JSON.stringify(this.selectItem));
          obj.pointId = window.uuid();
          let num = i + 1;
          obj.sampleNumIndex = "-" + num;

          if (num !== 1) {
            obj.isPrototype = false;
          }
          arr.push(obj);
        }

        this.data.valueData.point.splice(this.selectItemIndex, 0, ...arr);
      }

      this.$emit("redefinition");
    },
    merge() {
      this.data.valueData.point.forEach((item, index) => {
        item.size =
          item.sampleNum === ""
            ? 1
            : this.data.valueData.point.filter(
                (a) => a.sampleNum === item.sampleNum
              ).length;
        item.first =
          this.data.valueData.point.findIndex(
            (a) => a.sampleNum === item.sampleNum
          ) === index || item.sampleNum === "";
      });
       this.$forceUpdate()
    },
  },
  mounted() {
    this.merge();
    this.$eventBus.$on("getSampleAddres", (address) => {
      this.myggcspoint = address;
      this.data.valueData.point.forEach((item) => {
        if (item.SampleAddress == "") {
          item.SampleAddress = this.myggcspoint[0];
        }
      });
    });
  },
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
.btn2 {
  width: 50px;
  height: 32px;
  line-height: 32px;
  background: gray;
  cursor: pointer;
  user-select: none;
  color: white;
  border-radius: 2px;
}
</style>
