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
      检测依据:{{ data.valueData.sysStandardNum }}
    </div>
    <table class="myTable ___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <tr class="delLine">
        <td style="width: 150px">
          样品编号
          <div>
            <div
              title="复制该检测项目下所有样品"
              class="myBtn"
              style="margin-bottom: 2px; margin-left: 30px"
              @click="computeObj.copyAllSample(data.valueData)"
            >
              <span>c</span>
            </div>
            <div class="___relative">
              <div
                title="粘贴样品"
                class="___absolute myBtn"
                style="top: -30px; left: 90px"
                @click="computeObj.pasteAllSample(data.valueData)"
              >
                <span>p</span>
              </div>
            </div>
          </div>
        </td>
        <td style="width: 250px">采样地点</td>
        <td style="width: 250px" v-if="data.valueData.isSampleName">
          样品名称
        </td>
        <td style="width: 250px">样品采样（体积mL）</td>
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
          <myInput v-model="item.volume" :reg="'[^0-9./]'"></myInput>
        </td>
        <td>
          <myInput v-model="item.Remarkvs"></myInput>
          <div class="___relative" v-if="target == 0">
            <utilBar
              v-if="ableInput"
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
              class="___absolute"
              style="left: 245px; top: -28px"
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
  name: "project_cy_ypcytjml",
  props: ["data", "jsonString", "target", "task", "ableInput"],
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
      devices: [],
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

    this.$eventBus.$on("getDevice", (device) => {
      this.devices = device;
    });
  },
};
</script>

<style scoped>
</style>
