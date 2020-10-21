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
          <td class="___relative tc" style="width: 70px">
            <span>检测地点</span>
          </td>
          <td class="___relative tc" style="width: 160px">
            <span>检测风管/风口</span>
          </td>
          <td class="___relative tc" style="width: 345px">
            <span>测点风速（m/s）</span>
          </td>
          <td class="___relative tc" style="width: 50px">
            <span>修正值</span>
          </td>
          <td class="___relative tc" style="width: 50px; line-height: 16px">
            <span>
              新风
              <br />温度
            </span>
          </td>
          <td class="___relative tc" style="width: 50px; line-height: 16px">
            <span>
              服务区
              <br />人数
            </span>
          </td>
          <td class="___relative tc" style="width: 80px">
            <span>新风量</span>
          </td>
          <td style="width: 70px">检测时间</td>
          <td class="___relative tc" style="width: 110px">
            <span>仪器编号</span>
          </td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td @click="generateSampleNum(data.valueData.point)">
            {{ item.sampleNum + "" + item.sampleNumIndex }}
          </td>
          <td>
            <selectModel
              @returnVal="returnVal1"
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
            ></selectModel>
          </td>
          <td class="___relative">
            <div class="___relative tl" style="line-height: 16px">
              <span class="ml5">位置：</span>
              <myInput
                style="text-align: center; width: 110px; height: 16px"
                v-model="item.position"
              ></myInput>
            </div>
            <div class="___relative tl" style="line-height: 16px">
              <span class="ml5">形状：</span>
              <div
                class="___absolute"
                style="width: 110px; left: 45px; top: 1px"
              >
                <selectModel
                  @returnVal="returnVal5"
                  style="height: 16px"
                  :Judge="true"
                  :special="index"
                  :transmitText="item.shape"
                  :multi-select="false"
                  :receive="'id'"
                  :single="true"
                  :rows="false"
                  :list="['矩形', '圆形']"
                  :Obj="''"
                ></selectModel>
              </div>
            </div>
            <div class="___relative tl" style="line-height: 16px; height: 16px">
              <div v-if="item.shape === '矩形'" class="___relative">
                <span class="ml5">边长：</span>
                <myInput
                  class="___relative"
                  style="
                    width: 45px;
                    text-align: center;
                    height: 16px;
                    top: 1px;
                  "
                  v-model="item.formula[0]"
                  @change.native="getMeasureArea(index)"
                  :defaultValue="item.formula[0]"
                ></myInput>
                <span>x</span>
                <myInput
                  class="___relative"
                  style="
                    width: 45px;
                    text-align: center;
                    height: 16px;
                    top: 1px;
                  "
                  v-model="item.formula[1]"
                  @change.native="getMeasureArea(index)"
                  :defaultValue="item.formula[1]"
                ></myInput>
                <span>m</span>
              </div>
              <div v-if="item.shape === '圆形'" class="___relative">
                <span class="ml5">直径：</span>
                <myInput
                  class="___relative"
                  style="
                    width: 80px;
                    text-align: center;
                    height: 16px;
                    top: 1px;
                  "
                  v-model="item.formula[0]"
                  @change.native="getMeasureArea(index)"
                  :defaultValue="item.formula[0]"
                ></myInput>
                <span>m</span>
              </div>
            </div>
            <div class="___relative tl" style="line-height: 16px">
              <span class="ml5" style="margin-right: 95px">面积：</span>
              <div style="width: 95px; left: 40px" class="___absolute t0 tc">
                {{ item.measureArea }}
              </div>
              <span>m²</span>
            </div>
          </td>
          <td class="___relative">
            <div
              class="___relative"
              v-for="(val, num) in 4"
              :class="val !== 4 ? 'borderBottom' : ''"
            >
              <div
                v-for="(v, i) in 4"
                :class="v !== 4 ? '___absolute borderRight' : '___relative'"
                :style="{ left: 86 * i + 'px' }"
                style="width: 86px; line-height: 16px"
              >
                <div class="___relative borderRight" style="width: 30px">
                  <span>{{ i + 1 + num * 4 }}</span>
                </div>
                <div
                  class="___absolute t0"
                  style="width: 56px; left: 30px; line-height: 16px"
                >
                  <myInput
                    style="text-align: center; width: 54px; height: 16px"
                    v-model="item.windSpeed[i + num * 4]"
                    :defaultValue="item.windSpeed[i + num * 4]"
                    @change.native="changeNum(index)"
                  ></myInput>
                </div>
              </div>
            </div>
          </td>
          <td>
            {{ item.correction }}
          </td>
          <td>
            <myInput v-model="item.temperature"></myInput>
          </td>
          <td>
            <myInput
              v-model="item.number"
              :defaultValue="item.number"
              @change.native="changePeople(index, item.number, item.heBingId)"
            ></myInput>
          </td>
          <td>
            {{ item.airVolume }}
          </td>
          <td class="___relative">
            <timePickerModel
              :data="item"
              :showTime="item.time"
              @setTime="(time) => (item.time = time)"
            />
          </td>
          <td class="___relative tc">
            <div class="___relative">
              <div class="___relative" style="line-height: 16px">
                <span>风口面积测量</span>
              </div>
              <div class="___relative" style="line-height: 16px">
                <querySelect
                  v-model="item.tuyereNum"
                  style="height: 16px"
                  v-if="target === '0'"
                  ref="querySelect"
                  :num="index"
                  :list="deviceData"
                  :defaultValue="item.tuyereNum"
                  @getSelectItem="returnVal3"
                  :name="'deviceNum'"
                ></querySelect>
                <div v-else>{{ item.tuyereNum }}</div>
              </div>
              <div class="___relative" style="line-height: 16px">
                <span>风速测量</span>
              </div>
              <div class="___relative" style="line-height: 16px">
                <querySelect
                  v-model="item.windSpeedNum"
                  style="height: 16px"
                  v-if="target === '0'"
                  ref="querySelect"
                  :num="index"
                  :list="deviceData"
                  :defaultValue="item.windSpeedNum"
                  @reset="reset"
                  @getSelectItem="returnVal2"
                  :name="'deviceNum'"
                ></querySelect>
                <div v-else>{{ item.windSpeedNum }}</div>
              </div>
            </div>
            <div
              class="___absolute toolBar"
              style="left: 230px; top: 0; width: 180px"
            >
              <div
                title="往指定行后面增加一行"
                class="___absolute tc"
                @click="addRow(index, 2, item.heBingId)"
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
                title="生成重复样"
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
          >确定
        </el-button>
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
    getIdPoint(keyArr, id) {
      this.jsonString.forEach((item, index) => {
        if (
          item.data.name === "project_jc_xflrs" &&
          this.data.valueData.multipleId === item.data.valueData.multipleId
        ) {
          item.data.valueData.point.forEach((val, num) => {
            if (val.heBingId === id) {
              keyArr.forEach((v, i) => {
                item.data.valueData.point[num][v.key] = v.value;
              });
            }
          });
        }
      });
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changePeople(index, number, heBingId) {
      this.getIdPoint([{ key: "number", value: number }], heBingId);
      this.detectionResult(heBingId);
    },
    detectionResult(heBingId) {
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (
          item.data.name === "project_jc_xflrs" &&
          this.data.valueData.multipleId === item.data.valueData.multipleId
        ) {
          dataArr.push(
            ...item.data.valueData.point.filter(
              (val, num) => val.heBingId === heBingId
            )
          );
        }
      });
      let num = dataArr.length;
      let algorithm = dataArr[0].algorithm;
      let cumulative = 0;
      dataArr.forEach((item, index) => {
        let average = this.average(item.windSpeed);
        if (
          this.isNumber(average) &&
          this.isNumber(item.correction) &&
          this.isNumber(item.measureArea)
        ) {
          let reading = parseFloat(average);
          let correction = parseFloat(item.correction);
          let measureArea = parseFloat(item.measureArea);
          let value = measureArea * (reading + correction);
          cumulative += value;
        } else {
          num--;
        }
      });
      cumulative = num > 0 ? cumulative : "";
      let number = this.data.valueData.point[0].number;
      if (this.isNumber(cumulative) && this.isNumber(number)) {
        let lastNum = (3600 * cumulative) / number;
        dataArr.forEach((item, index) => {
          if (item.heBingId === heBingId) {
            dataArr[index].airVolume = lastNum.toFixed46(1);
          }
        });
      }
    },
    getMeasureArea(index) {
      let val1 = this.data.valueData.point[index].formula[0];
      let val2 = this.data.valueData.point[index].formula[1];
      if (this.isNumber(val1)) {
        if (this.isNumber(val2)) {
          if (this.data.valueData.point[index].shape === "矩形") {
            this.data.valueData.point[index].measureArea = (
              val1 * val2
            ).toFixed46(3);
          }
        }
        if (this.data.valueData.point[index].shape === "圆形") {
          let radius = val1 / 2;
          this.data.valueData.point[index].measureArea = (
            Math.PI *
            (radius * radius)
          ).toFixed46(3);
        }
      } else {
        this.data.valueData.point[index].measureArea = "";
      }
      this.detectionResult(this.data.valueData.point[index].heBingId);
    },
    reset() {
      this.data.valueData.point.forEach((item, index) => {
        this.changeNum(index);
      });
    },
    changeNum(index) {
      let average = this.average(this.data.valueData.point[index].windSpeed);
      if (
        this.data.valueData.point[index].factorArr !== "" &&
        this.data.valueData.point[index].method !== "" &&
        this.isNumber(average)
      ) {
        let factorArr = this.decompose(
          this.data.valueData.point[index].factorArr,
          this.data.valueData.point[index].method
        );
        let correction = "";
        if (this.data.valueData.point[index].method === 1) {
          correction = this.getFactor(average, factorArr);
        } else {
          correction = this.getRange(average, factorArr);
        }
        correction = this.isNumber(correction) ? correction : "/";
        this.data.valueData.point[index].correction = correction;
      } else {
        this.data.valueData.point[index].correction = "/";
      }
      this.detectionResult(this.data.valueData.point[index].heBingId);
    },
    returnVal1(val, obj, special) {
      this.data.valueData.point[special].SampleAddress = val;
      this.getMeasureArea(special);
    },
    returnVal2(index, val) {
      if (val.deviceFactor != null && val.calibrationMethod != null) {
        let method = "";
        let SampleTools = "";
        let deviceNum = "";
        let algorithm = "";
        if (
          val.calibrationMethod === "测量值/修正值" ||
          val.calibrationMethod === "测量值/修正因子"
        ) {
          method = 1;
        } else if (
          val.calibrationMethod === "测量范围/修正值" ||
          val.calibrationMethod === "测量范围/修正因子"
        ) {
          method = 2;
        }
        if (
          val.calibrationMethod === "测量值/修正因子" ||
          val.calibrationMethod === "测量范围/修正因子"
        ) {
          algorithm = 1;
        } else if (
          val.calibrationMethod === "测量值/修正值" ||
          val.calibrationMethod === "测量范围/修正值"
        ) {
          algorithm = 2;
        }
        SampleTools = val.id;
        deviceNum = val.deviceNum;
        let keyArr = [
          {
            key: "method",
            value: method,
          },
          {
            key: "windSpeedId",
            value: SampleTools,
          },
          {
            key: "windSpeedNum",
            value: deviceNum,
          },
          {
            key: "algorithm",
            value: algorithm,
          },
          {
            key: "factorArr",
            value: val.deviceFactor,
          },
        ];
        this.getIdPoint(keyArr, this.data.valueData.point[index].heBingId);
      }
    },
    returnVal3(index, val) {
      let SampleTools = val.id;
      let deviceNum = val.deviceNum;
      let keyArr = [
        {
          key: "tuyereId",
          value: SampleTools,
        },
        {
          key: "tuyereNum",
          value: deviceNum,
        },
      ];
      this.getIdPoint(keyArr, this.data.valueData.point[index].heBingId);
    },
    returnVal5(val, obj, special) {
      this.data.valueData.point[special].shape = val;
      this.getMeasureArea(special);
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

    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item,
        this.data.valueData.multipleId
      );
    },
    addRow(index, Judge, heBingId) {
      let row = {};
      if (Judge === 1) {
        row = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
        row.formula = ["", ""];
        row.shape = "";
        row.correction = "";
        row.measureArea = "";
        row.windSpeed = [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ];
        let id =
          "project_jc_xflrs-" +
          this.pageNumber +
          "-" +
          this.thisPageIndex +
          "-" +
          index;
        this.data.valueData.point.splice(index + 1, 0, row);
        if (this.data.valueData.point[index].heBingId !== "") {
          this.data.valueData.point[
            index + 1
          ].heBingId = this.data.valueData.point[index].heBingId;
        } else {
          this.data.valueData.point[index + 1].heBingId = id;
        }
      } else if (Judge === 2) {
        let id =
          "project_jc_xflrs-" + this.pageNumber + "-" + this.thisPageIndex;
        let subscript = parseFloat(heBingId.split("-")[3]);
        let num = "";
        this.data.valueData.point.forEach((v, n) => {
          if (v.heBingId === id + "-" + subscript) {
            num = n + 1;
          }
        });
        num = num !== "" ? num : this.data.valueData.point.length;
        if (this.data.valueData.point.length === num) {
          row = JSON.parse(JSON.stringify(this.data.modelRow));
        } else {
          row = JSON.parse(JSON.stringify(this.data.valueData.point[num]));
          row.formula = ["", ""];
          row.shape = "";
          row.correction = "";
          row.measureArea = "";
          row.windSpeed = [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ];
        }
        row.pointId = window.uuid();
        row.foreverId = window.uuid();
        row.SampleAddress = this.data.valueData.point[index].SampleAddress;
        this.data.valueData.point.splice(num, 0, row);
        this.data.valueData.point[num].heBingId =
          id + "-" + (subscript + window.uuid());
      }
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
        let obj = JSON.parse(JSON.stringify(this.selectItem));
        let index = this.data.valueData.point.findIndex(
          (item, index) => item.foreverId === obj.foreverId
        );
        this.clearPingXing();
        obj.foreverId = window.uuid();
        obj.sampleNumIndex = "";
        let id = obj.heBingId.split("-");
        obj.heBingId = id[0] + "-" + id[1] + "-" + id[2] + "-" + index;
        this.data.valueData.point.splice(index, 0, obj);
      } else {
        this.clearPingXing();
        for (let i = 0; i < this.selectItem.sampleQuantity; i++) {
          let obj = JSON.myParse(JSON.stringify(this.selectItem));
          let id =
            "project_jc_xflrs-" +
            this.pageNumber +
            "-" +
            this.thisPageIndex +
            "-" +
            (this.data.valueData.point.length + i);
          obj.pointId = window.uuid();
          obj.heBingId = id + "-" + obj.foreverId;
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
  },
  watch: {},
  mounted() {
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
