<template>
  <div class="___relative">
    <div>
      <div
        style="
          border: 1px solid black;
          line-height: 32px;
          text-align: left;
          padding-left: 10px;
          border-top: none;
        "
      >
        检测项目：{{ data.valueData.testProjectChineseName
        }}{{ data.valueData.detectionLimitPieces }} &nbsp;&nbsp;&nbsp;&nbsp;
        检测依据:{{ data.valueData.sysStandardNum }}
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 98px">
            样品编号
            <div>
              <div
                title="复制该检测项目下所有样品"
                class="myBtn"
                style="margin-bottom: 2px; margin-left: 10px"
                @click="computeObj.copyAllSample(data.valueData)"
              >
                <span>c</span>
              </div>
              <div class="___relative">
                <div
                  title="粘贴样品"
                  class="___absolute myBtn"
                  style="top: -30px; left: 60px"
                  @click="computeObj.pasteAllSample(data.valueData)"
                >
                  <span>p</span>
                </div>
              </div>
            </div>
          </td>

          <td style="width: 150px">采样地点</td>
          <td style="width: 100px">样品名称</td>
          <td width="130">采样流量(L/min)</td>
          <td width="110">采样时长（min）</td>
          <td style="width: 90px">采样体积（L）</td>
          <td width="130">采样时间（时:分）</td>
          <td width="130">仪器编号</td>
          <td>备注</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point" :key="index">
          <td @click="generateSampleNum(data.valueData.point)">
            {{ item.sampleNum + "" + item.sampleNumIndex }}
          </td>
          <td style="line-height: 30px" @mouseover="getDetailData">
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
            ></selectModel>
          </td>
          <td>
            <myInput
              v-model="item.sampleName"
              style="text-align: center"
            ></myInput>
          </td>
          <td>
            <divModel
              v-model="item.flow"
              :is-num-box="true"
              :edit="target == 0 && task.docPass !== 1"
            ></divModel>
          </td>
          <td>
            <!--<divModel
																v-model="item.flowTime"
																	:is-num-box="true"
																	:edit="target === '0' && task.docPass !== 1">
						</divModel>-->

            <myInput v-model="item.flowTime" :reg="'[^0-9./]'"></myInput>
          </td>
          <td>
            <divModel
              v-model="item.volume"
              :edit="target === '0' && task.docPass !== 1"
            ></divModel>
          </td>
          <td>
            <div class="___relative">
              <div
                @click="toShowTimeBox(index)"
                style="text-align: center; line-height: 32px; height: 30px"
              >
                {{ myTime(item) }}
              </div>
              <div class="___absolute">
                <div class="timeBox" v-show="nowShowTimeBox == index">
                  <el-time-picker
                    v-model="item.time"
                    value-format="HH:mm:ss"
                    @change="changeTime(item)"
                  ></el-time-picker>
                </div>
              </div>
            </div>
          </td>
          <td>
            <querySelect
              v-model="item.deviceNum"
              v-if="target === '0'"
              ref="querySelect"
              :num="index"
              :list="devices"
              :defaultValue="item.deviceNum"
              @getSelectItem="returnVal2"
              :name="'deviceNum'"
            ></querySelect>
            <div v-else>{{ item.deviceNum }}</div>
          </td>
          <td>
            <myInput
              v-model="item.Remarks"
              style="text-align: center"
              v-if="target === '0'"
            ></myInput>
            <div v-else>{{ item.Remarks }}</div>
            <div class="___relative" v-if="target == 0">
              <utilBar
                :data="data"
                :index="index"
                :barNum="[
                  0,
                  item.isPrototype ? 1 : '',
                  3,
                  4,
                  item.isPrototype ? 5 : '',
                  item.isPrototype ? 6 : '',
                ]"
                :jsonString="jsonString"
                :whiteList="['sampleName', 'Remarks']"
                class="___absolute"
                style="left: 202px; top: -28px"
              ></utilBar>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog
      :visible.sync="delRowReason"
      width="50%"
      :modal="false"
      :title="'删除原因'"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 20 }"
        placeholder="请输入内容"
        v-model="delRowReasonText"
        maxlength="300"
        show-word-limit
      ></el-input>
      <el-button
        style="margin-top: 15px; margin-left: 470px"
        type="primary"
        @click="addDelRowReason"
        >确定
      </el-button>
    </el-dialog>

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
import bus from "@/utils/bus.js";

export default {
  data() {
    return {
      correctArr: ["修正系数", "修正值"],
      factorList: [
        "中央布点",
        "对称布点",
        "对角线布点",
        "梅花布点",
        "均匀布点",
        "其它",
      ],
      time: new Date(),
      nowShowTimeBox: null,
      numObj: "",
      showTime: false,
      selectItem: {},
      selectItemIndex: "",
      copy: "",
      myCaiSample: "",
      myCaiSampleNum: "",
      rowData: {},
      sampleOption: false,
      nowItem: "",
      editSampleQuantity: false,
      content: "测试",
      nowRow: "",
      delRowReason: false,
      nowRowIndex: "",
      delRowReasonText: "",
      ggcspoint: [],
      correctJudge: false,
      index_jsonString: function () {
        // 获取当前模块在jsonString中的索引
        let result = this.thisPageIndex;
        for (let i = 0; i < this.pageNumber; i++) {
          result += this.showing[i].length;
        }
        return result;
      },
    };
  },
  props: [
    "data",
    "ipdTemplate",
    "pageNumber",
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
  computed: {
    myggcspoint() {
      if (this.ggcspoint.length > 0) {
        return this.ggcspoint.map((item) => item.sampleAddress);
      } else {
        return [];
      }
    },
    devices() {
      return this.deviceData;
    },
  },
  watch: {
    myggcspoint() {
      this.data.valueData.point.forEach((item) => {
        if (item.SampleAddress == "") {
          item.SampleAddress = this.myggcspoint[0];
        }
      });
    },
  },
  methods: {
    show(index) {
      if (index == 0) {
        this.correctJudge = !this.correctJudge;
      }
    },
    copyAll(index) {
      let obj = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
      obj.id = Math.random();
      obj.pointId = uuid();
      obj.foreverId = uuid();
      obj.multipleId = "project_cyhj" + Math.random();
      sessionStorage.setItem("copy", "copyAll");
      sessionStorage.setItem("cyhjRowData", JSON.stringify(obj));
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
          let num = i + 1;
          obj.sampleNumIndex = "-" + num;
          obj.pointId = uuid();

          if (num !== 1) {
            obj.isPrototype = false;
          }
          arr.push(obj);
        }

        this.data.valueData.point.splice(this.selectItemIndex, 0, ...arr);
      }

      this.$emit("redefinition");
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

    toolHeight() {
      return 360 + this.data.valueData.point.length * 32;
    },

    addRow(index) {
      let row = JSON.parse(JSON.stringify(this.data.modelRow));
      row.pointId = window.uuid();
      row.foreverId = window.uuid();
      row.editSampleQuantity = false;
      row.isPrototype = true;
      row.blankSample = 0;
      row.sampleLabel = this.data.valueData.point[0].sampleLabel;
      this.data.valueData.point.splice(index + 1, 0, row);
      this.$emit("redefinition");
    },

    reduce(index) {
      if (this.data.valueData.point.length === 1) {
        this.$notify({
          type: "warning",
          message: "如需移除该检测项目, 请在顶部下拉框中移除.",
        });
        return;
      }
      this.nowRow = this.data.valueData.point[index];
      this.nowRowIndex = index;
      if (this.nowRow.volume !== "" && this.nowRow.SamplingTime !== "") {
        this.delRowReason = true;
      } else {
        this.realReduce();
      }
      this.$emit("redefinition");
    },
    toShowTimeBox(index) {
      if (this.target === "0" && this.task.docPass !== 1) {
        if (this.nowShowTimeBox == index) {
          this.nowShowTimeBox = null;
          return;
        }
        this.nowShowTimeBox = index;
      }
    },
    changeTime(item) {
      item.SamplingTime = new Date().format("yyyy-MM-dd") + " " + item.time;
      this.nowShowTimeBox = null;
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

    myTime(row) {
      try {
        let arr = row.time.split(":");

        if (arr.length && arr.length > 1) {
          return arr[0] + ":" + arr[1];
        } else {
          return "";
        }
      } catch (e) {
        return " ";
      }
    },
    getDetailData() {
      let ggcs = this.jsonString.find((item) => item.to == "head_ggcs");
      if (ggcs) {
        this.ggcspoint = ggcs.data.valueData.point;
      }
    },
    addSample(index) {
      this.selectItem = this.data.valueData.point[index];
      this.selectItemIndex = index;
      this.sampleOption = true;
    },

    returnVal(showText, receive, special, selectedObj) {
      this.data.valueData.point[special][receive] = showText;
    },

    returnVal2(index, val) {
      this.data.valueData.point[index]["SampleTools"] = val.id;
      this.data.valueData.point[index].deviceNum = val.deviceNum;
    },

    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item,
        this.data.valueData.multipleId
      );
    },

    realReduce() {
      this.data.valueData.point.splice(this.nowRowIndex, 1);
      this.$emit("update:jsonString");
      this.$emit("restart");
    },

    addDelRowReason() {
      this.delRowReason = false;
      bus.$emit("getReason", {
        sampleNum: this.nowRow.sampleNum,
        delRowReasonText: this.delRowReasonText,
      });
      this.realReduce();
      this.delRowReasonText = "";
      this.$forceUpdate();
    },
  },
  mounted: function () {
    this.getDetailData();
  },

  beforeDestroy() {},
};
</script>

<style scoped>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
