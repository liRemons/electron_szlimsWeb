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
          <td class="___relative tc" style="width: 85px">
            <span>样品编号</span>
          </td>
          <td class="___relative tc" style="width: 210px">
            <span>检测地点</span>
          </td>
          <td class="___relative tc" style="width: 70px">
            <span>地面长度A(m)</span>
          </td>
          <td class="___relative tc" style="width: 70px">
            <span>地面宽度B(m)</span>
          </td>
          <td class="___relative tc" style="width: 70px">
            <span>窗户长度(m)</span>
          </td>
          <td class="___relative tc" style="width: 70px">
            <span>窗户宽度(m)</span>
          </td>
          <td class="___relative tc" style="width: 70px">
            <span>窗户个数n</span>
          </td>
          <td class="___relative tc" style="width: 80px">
            <span>检测结果</span>
          </td>
          <td class="___relative tc" style="width: 80px">
            <span>检测时间</span>
          </td>
          <td class="___relative tc" style="width: 90px">
            <span>仪器编号</span>
          </td>
        </tr>
        <!-- v-if="item.noShow"
            :rowspan="item.heBingLength" -->
        <tr v-for="(item, index) in data.valueData.point">
          <td @click="generateSampleNum(data.valueData.point)">
            {{ item.sampleNum + "" + item.sampleNumIndex }}
          </td>
          <td>
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
              v-model="item.lengthGroundA"
              :defaultValue="item.lengthGroundA"
              @change.native="
                changeVal(
                  index,
                  'lengthGroundA',
                  item.lengthGroundA,
                  item.heBingId
                )
              "
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="item.lengthGroundB"
              :defaultValue="item.lengthGroundB"
              @change.native="
                changeVal(
                  index,
                  'lengthGroundB',
                  item.lengthGroundB,
                  item.heBingId
                )
              "
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="item.windowLengthA"
              :defaultValue="item.windowLengthA"
              @change.native="changeNum(index)"
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="item.windowLengthB"
              :defaultValue="item.windowLengthB"
              @change.native="changeNum(index)"
            ></myInput>
          </td>
          <td class="___relative tc">
            <myInput
              style="text-align: center"
              v-model="item.windowNum"
              :defaultValue="item.windowNum"
              @change.native="changeNum(index)"
            ></myInput>
          </td>
          <td>
            {{ item.result }}
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
              :defaultValue="item.deviceNum"
              @reset="reset"
              @getSelectItem="returnVal2"
              :name="'deviceNum'"
            >
            </querySelect>
            <div v-else>
              {{ item.deviceNum }}
            </div>
            <div
              class="___absolute toolBar"
              style="left: 230px; top: 0; width: 180px"
              v-if="target == 0"
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
          item.data.name === "project_jc_cgxs" &&
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
    returnVal(showText, receive, special, selectedObj) {
      this.data.valueData.point[special][receive] = showText;
    },
    changeVal(index, key, value, id) {
      this.getIdPoint([{ key: key, value: value }], id);
      this.detectionResult(id);
    },
    detectionResult(heBingId) {
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (
          item.data.name === "project_jc_cgxs" &&
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
      let cumulative = 0;
      dataArr.forEach((item, index) => {
        let windowLengthA = item.windowLengthA;
        let windowLengthB = item.windowLengthB;
        let windowNum = this.isNumber(item.windowNum) ? item.windowNum : 1;
        if (this.isNumber(windowLengthA) && this.isNumber(windowLengthB)) {
          let value = windowLengthA * windowLengthB * windowNum;
          cumulative += value;
        } else {
          num--;
        }
      });
      cumulative = num > 0 ? cumulative : "";
      let lengthGroundA = this.data.valueData.point[0].lengthGroundA;
      let lengthGroundB = this.data.valueData.point[0].lengthGroundB;
      if (
        this.isNumber(cumulative) &&
        this.isNumber(lengthGroundA) &&
        this.isNumber(lengthGroundB)
      ) {
        let lastNum = (cumulative * 0.8) / (lengthGroundA * lengthGroundB);
        dataArr.forEach((item, index) => {
          if (item.heBingId === heBingId) {
            dataArr[index].result = lastNum.toFixed46(2);
          }
        });
      }
    },
    reset() {
      this.data.valueData.point.forEach((item, index) => {
        this.changeNum(index);
      });
    },
    changeNum(index) {
      this.detectionResult(this.data.valueData.point[index].heBingId);
    },
    returnVal2(index, val) {
      let SampleTools = "";
      let deviceNum = "";
      SampleTools = val.id;
      deviceNum = val.deviceNum;
      let keyArr = [
        {
          key: "SampleTools",
          value: SampleTools,
        },
        {
          key: "deviceNum",
          value: deviceNum,
        },
      ];
      this.getIdPoint(keyArr, this.data.valueData.point[index].heBingId);
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
        row.windowLengthA = "";
        row.windowLengthB = "";
        row.windowNum = "";
        let id =
          "project_jc_cgxs-" +
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
          "project_jc_cgxs-" + this.pageNumber + "-" + this.thisPageIndex;
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
          row.windowLengthA = "";
          row.windowLengthB = "";
          row.windowNum = "";
        }
        row.SampleAddress = this.data.valueData.point[index].SampleAddress;
        row.pointId = window.uuid();
        row.foreverId = window.uuid();
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
            "project_jc_cgxs-" +
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
