<template>
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
      检测依据:{{ data.valueData.sysStandardName
      }}{{ data.valueData.sysStandardNum }}
    </div>
    <table class="myTable ___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <tr class="delLine">
        <td>
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
                style="top: -30px; left: 55px"
                @click="computeObj.pasteAllSample(data.valueData)"
              >
                <span>p</span>
              </div>
            </div>
          </div>
        </td>
        <td style="width: 150px">采样地点</td>
        <td style="width: 90px" v-if="data.valueData.isSampleName">样品名称</td>
        <td style="width: 100px">采样流量(L/min)</td>
        <td style="width: 95px">采样时长(min)</td>
        <td style="width: 90px">采样体积(L)</td>
        <td style="width: 90px">采样点位</td>
        <td style="width: 90px">温度(℃)</td>
        <td style="width: 100px">采样时间(时:分)</td>
        <td>仪器编号</td>
        <td>备注</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="item.pointId">
        <td @click="generateSampleNum(data.valueData.point)">
          {{ item.sampleNum + "" + item.sampleNumIndex }}
        </td>
        <td @click="getDetailData">
          <selectModel
            @returnVal="returnVal"
            :single="true"
            :rows="false"
            style="line-height: 30px"
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
        <td v-if="data.valueData.isSampleName">
          <myInput v-model="item.sampleName"></myInput>
        </td>
        <td>
          <myInput :reg="'[^0-9./]'" v-model="item.flow"></myInput>
        </td>
        <td>
          <myInput :reg="'[^0-9./]'" v-model="item.flowTime"></myInput>
        </td>
        <td>
          <myInput :reg="'[^0-9./]'" v-model="item.volume"></myInput>
        </td>
        <td>
          <myInput v-model="item.samplingDianWei"></myInput>
        </td>
        <td>
          <myInput :reg="'[^0-9./]'" v-model="item.temperature"></myInput>
        </td>
        <td>
          <div class="___relative">
            <div
              @click="toShowTimeBox(index)"
              style="text-align: center; line-height: 32px; height: 30px"
            >
              {{ computeObj.myTime(item) }}
            </div>

            <div class="___absolute">
              <div class="timeBox" v-show="nowShowTimeBox === index">
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
            v-if="target == 0"
            v-model="item.deviceNum"
            ref="querySelect"
            style="width: 90px"
            :num="index"
            :list="devices"
            :defaultValue="item.deviceNum"
            @getSelectItem="returnVal2"
            :name="'deviceNum'"
          ></querySelect>
          <span v-else>{{ item.deviceNum }}</span>
        </td>
        <td>
          <myInput v-model="item.Remarks"></myInput>
          <div class="___relative" v-if="target == 0 && ableInput">
            <utilBar
              :data="data"
              :index="index"
              :barNum="[
                ((!item.isPrototype || !item.sampleNumIndex) &&
                  (!data.valueData.point[index + 1]
                    ? true
                    : data.valueData.point[index + 1].sampleNum !==
                      item.sampleNum)) ||
                item.sampleNum == ''
                  ? 0
                  : '',
                !item.sampleNumIndex ? 1 : '',
                3,
                4,
                5,
                item.isPrototype ? 6 : '',
              ]"
              :jsonString="jsonString"
              :whiteList="['sampleName', 'flow', 'samplingDianWei']"
              class="___absolute leftBtn"
              style="left: 143px; top: -28px"
            ></utilBar>
          </div>
        </td>
      </tr>
    </table>

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
  name: "project_cy_kqlhcy",
  props: ["data", "jsonString", "target", "task", "deviceData", "ableInput"],
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
      ggcspoint: [],
      nowShowTimeBox: "",
    };
  },
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
    returnVal(showText, receive, special) {
      this.data.valueData.point[special][receive] = showText;
    },

    returnVal2(index, val) {
      this.data.valueData.point[index]["SampleTools"] = val.id;
      this.data.valueData.point[index].deviceNum = val.deviceNum;
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
    getDetailData() {
      let ggcs = this.jsonString.find((item) => item.to == "head_ggcs");
      if (ggcs) {
        this.ggcspoint = ggcs.data.valueData.point;
      }
    },
    toShowTimeBox(index) {
      if (this.target === "0" && this.task.docPass !== 1) {
        if (this.nowShowTimeBox === index) {
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
    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item,
        this.data.valueData.multipleId
      );
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
  },
  mounted() {
    this.getDetailData();
  },
};
</script>

<style scoped>
</style>
