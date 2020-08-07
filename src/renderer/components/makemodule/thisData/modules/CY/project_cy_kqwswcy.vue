<template>
  <div class="___relative">
    <div
      style="border: 1px solid black; line-height: 32px; text-align: left; padding-left: 10px; border-top: none;"
    >
      检测项目：{{ data.valueData.testProjectChineseName
      }}{{ data.valueData.detectionLimitPieces }} &nbsp;&nbsp;&nbsp;&nbsp;
      检测依据:{{ data.valueData.sysStandardNum }}
    </div>
    <table class="myTable ___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <tr class="delLine">
        <td style="width: 150px;">
          样品编号
          <div>
            <div
              title="复制该检测项目下所有样品"
              class="myBtn"
              style="margin-bottom: 2px; margin-left: 30px;"
              @click="computeObj.copyAllSample(data.valueData)"
            >
              <span>c</span>
            </div>
            <div class="___relative">
              <div
                title="粘贴样品"
                class="___absolute myBtn"
                style="top: -30px; left: 90px;"
                @click="computeObj.pasteAllSample(data.valueData)"
              >
                <span>p</span>
              </div>
            </div>
          </div>
        </td>
        <td style="width: 200px;">采样地点</td>
        <td style="width: 180px;">样品名称</td>
        <td style="width: 150px;">暴露时间(min)</td>
        <td style="width: 150px;">样品数量</td>
        <td style="width: 150px;">采样点位</td>
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
            style="line-height: 30px;"
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
          <myInput v-model="item.sampleName"></myInput>
        </td>
        <td>
          <!-- <span>{{ item.time }}</span> -->
          <myInput v-model="item.time" :reg="'[^0-9./]'"></myInput>
        </td>
        <td>
          <myInput v-model="item.sampleQuantity" :reg="'[^0-9./]'"></myInput>
        </td>
        <td>
          <myInput v-model="item.samplingDianWei"></myInput>
        </td>
        <td>
          <myInput v-model="item.Remarks"></myInput>
          <div class="___relative" v-if="target ==0&&ableInput">
            <utilBar
              :data="data"
              :index="index"
              :barNum="[
                0,
                item.isPrototype ? 1 : '',
                3,
                4,
                item.isPrototype ? 5 : '',
                item.isPrototype ? 6 : ''
              ]"
              :jsonString="jsonString"
              :whiteList="['sampleName', 'flow', 'Remarks']"
              class="___absolute"
              style="left: 162px;top: -28px;"
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
      <div style="text-align: right; margin-right: 50px;">
        <el-button
          style="margin-top: 15px; margin-left:470px;"
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
  name: "project_cy_kqwswcy",
  props: ["data", "jsonString", "target", "task","ableInput"],
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
        "其它"
      ],
      ggcspoint: [],
      nowShowTimeBox: "",
      devices: []
    };
  },
  computed: {
    myggcspoint() {
      if (this.ggcspoint.length > 0) {
        return this.ggcspoint.map(item => item.sampleAddress);
      } else {
        return [];
      }
    }
  },
  watch: {
    myggcspoint() {
      this.data.valueData.point.forEach(item => {
        if (item.SampleAddress == "") {
          item.SampleAddress = this.myggcspoint[0];
        }
      });
    }
  },
  methods: {
    addRow(index) {
      let row = JSON.parse(JSON.stringify(this.data.modelRow));
      row.pointId = window.uuid();
      row.foreverId = window.uuid();
      this.data.valueData.point.splice(index + 1, 0, row);
      this.$emit("redefinition");


      
    },
    returnVal(showText, receive, special) {
      this.data.valueData.point[special][receive] = showText;
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
    deleteRow(index, item) {
      if (this.data.valueData.point.length > 1) {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false
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
      keys.forEach(item => {
        if (copy === "copyAll") {
          this.data.valueData.point[index][item] = newObjData[item];
        } else {
          let noCopy = this.data.noCopyArr;
          let result = noCopy.some(key => key === item);
          if (newObjData[item] && result === false) {
            this.data.valueData.point[index][item] = newObjData[item];
          }
        }
      });

      setTimeout(() => {
        this.$eventBus.$emit("showText");
      }, 10);
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

    addSample(index) {
      this.selectItem = this.data.valueData.point[index];
      this.selectItemIndex = index;
      this.sampleOption = true;
    },

    clearPingXing() {
      this.jsonString.forEach(item => {
        if (
          item.data.valueData.testProjectId ===
          this.data.valueData.testProjectId
        ) {
          let result = item.data.valueData.point.some(
            item2 => item2.foreverId === this.selectItem.foreverId
          );
          if (result) {
            let arr = item.data.valueData.point.filter(
              item3 => item3.foreverId !== this.selectItem.foreverId
            );
            item.data.valueData.point = arr;
          }
        }
      });
    },
    getDetailData() {
      let ggcs = this.jsonString.find(item => item.to == "head_ggcs");
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
      item.exposureTime = new Date().format("yyyy-MM-dd") + " " + item.time;
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
          message: "样品编号为空"
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
    }
  },
  mounted() {
    this.getDetailData();

    this.$eventBus.$on("getDevice", device => {
      this.devices = device;
    });
  }
};
</script>

<style scoped>
</style>
