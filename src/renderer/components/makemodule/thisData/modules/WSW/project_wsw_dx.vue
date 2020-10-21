<template>
  <div class="___relative">
    <div :class="{ eventCover: target === '4' }"></div>
    <projectHead
      v-if="headShow()"
      :data="data"
      :target="target"
      :col="10"
    ></projectHead>
    <project_wsw_blank v-if="headShow()" :data="data"></project_wsw_blank>
    <table class="myTable">
      <tr>
        <td>样品编号</td>
        <td :colspan="projectName == '委托送样' && 2">样品名称</td>
        <td :colspan="projectName == '委托送样' && 2">分析项</td>
        <td>观察结果</td>
        <td>{{ projectName == "委托送样" ? "报告结果" : "分析结果" }}</td>
        <td colspan="2" v-if="projectName !== '委托送样'">报告结果</td>
        <td>单位</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point">
        <td
          class="___relative"
          v-if="item.realItem"
          :rowspan="item.analysisItemsLength"
        >
          {{ name(item) }}
          <div
            class="___absolute"
            style="left: -100px; top: 0"
            v-if="target == 0"
          >
            <el-tooltip
              effect="dark"
              content="观察记录"
              :open-delay="500"
              placement="top"
            >
              <el-button
                @click="openRecordDialog(item)"
                type="primary"
                size="mini"
                icon="el-icon-edit"
                circle
              ></el-button>
            </el-tooltip>
          </div>
        </td>
        <td
          :colspan="projectName == '委托送样' && 2"
          v-if="item.realItem"
          :rowspan="item.analysisItemsLength"
        >
          {{ item.sampleName }}
        </td>
        <td :colspan="projectName == '委托送样' && 2">
          {{ item.sysAnalysisItem }}
        </td>
        <td>
          <myInput
            style="text-align: center"
            v-model="item.sysObservationResult"
          ></myInput>
        </td>
        <td style="line-height: 32px">
          <selectModel
            @returnVal="returnVal"
            :Judge="true"
            v-if="!showInput"
            :special="index"
            :transmitText="item.sysAnalysisResult"
            :multi-select="false"
            :receive="item.itemId"
            :single="true"
            :rows="false"
            :watchTransmitText="true"
            :list="
              item.analysisItem
                ? [...item.analysisItem.analysisResultArr, { result: '自定义' }]
                : [{ result: '自定义' }]
            "
            :Obj="'result'"
          >
          </selectModel>
          <myInput
            style="text-align: center"
            v-else
            v-model="item.sysAnalysisResult"
            @change.native="
              (el) => {
                noShowInput(el, index);
              }
            "
          ></myInput>
        </td>
        <td
          v-if="item.realItem && projectName !== '委托送样'"
          :rowspan="item.analysisItemsLength"
          :colspan="
            item.sysReportCount !== null &&
            item.sysReportCount !== '' &&
            item.sysReportCount.includes('自定义')
              ? 1
              : 2
          "
          style="line-height: 32px"
        >
          <selectModel
            @returnVal="returnVal2"
            :single="true"
            :rows="false"
            :special="''"
            :Judge="true"
            :input="false"
            :receive="item.itemId"
            :factor="true"
            :transmitText="item.sysReportCount"
            :list="list"
            :Obj="''"
          >
          </selectModel>
        </td>
        <td
          v-if="
            item.realItem &&
            item.sysReportCount &&
            item.sysReportCount.indexOf('自定义') !== -1
          "
          :rowspan="item.analysisItemsLength"
        >
          <myInput v-model="item.sysReport"></myInput>
        </td>
        <td v-if="item.realItem" :rowspan="item.analysisItemsLength">
          {{ item.detectionLimitPieces }}
        </td>
      </tr>
      <td colspan="8" style="line-height: 32px">
        <div class="___relative">
          <div class="___absolute" style="width: 50px">备注：</div>
          <myInput
            v-model="data.valueData.remarks"
            style="left: 50px; width: 1047px"
          ></myInput>
        </div>
      </td>
    </table>
    <el-dialog
      title="观察记录"
      :visible.sync="dialogVisible"
      width="800px"
      v-if="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
    >
      <project_wsw_dx_recordDialog
        @close="dialogVisible = false"
        @submit="submit"
        :sampleData="sampleData"
      ></project_wsw_dx_recordDialog>
    </el-dialog>
  </div>
</template>

<script>
import projectHead from "./project_head";
import project_wsw_dx_recordDialog from "./project_wsw_dx_recordDialog.vue";
export default {
  name: "project_wsw_dx",
  props: [
    "ipdTemplate",
    "data",
    "pageNumber",
    "projectName",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "bs",
    "target",
    "detectionLimitObj",
  ],
  data() {
    return {
      showInput: false,
      list: ["检出", "不合格自定义输入", "未检出", "合格自定义输入"],
      dialogVisible: false,
      sampleData: "",
    };
  },
  components: {
    projectHead,
    project_wsw_dx_recordDialog,
  },
  methods: {
    openRecordDialog(data) {
      let dxData = this.jsonString
        .filter((item) => item.to === "project_wsw_dx")
        .map((item) => item.data.valueData.point)
        .flat();
      let nowPoint = dxData.filter(
        (item) =>
          data.parallelLetter + data.sampleNum ===
          item.parallelLetter + item.sampleNum
      );
      let sysObservationRecordData = nowPoint.map((item) => {
        return {
          analysisItem: item.sysAnalysisItem,
          result: " ",
        };
      });
      let sysObservationRecordArr = [];
      if (data.sysObservationRecordArr) {
        if (data.sysObservationRecordArr instanceof Array) {
          sysObservationRecordArr = data.sysObservationRecordArr;
        } else {
          data.sysObservationRecordArr !== "undefined" &&
            (sysObservationRecordArr = JSON.parse(
              data.sysObservationRecordArr
            ));
        }
      }

      this.sampleData = {
        sysObservationRecordArr: sysObservationRecordArr,
        id: data.id,
        name: "样品编号: " + data.sampleNum + data.parallelLetter,
        sampleNumAndIndex: data.sampleNum + data.parallelLetter,
        analysisItems: sysObservationRecordData,
      };
      this.dialogVisible = true;
    },
    headShow() {
      if (this.pageNumber > 0) {
        if (this.thisPageIndex == 0) {
          let showlLen = this.showing[this.pageNumber - 1].length - 1;
          if (
            this.showing[this.pageNumber - 1][showlLen].to !==
            this.data.valueData.testProject
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if (
            this.showing[this.pageNumber][this.thisPageIndex - 1].to !==
            this.data.valueData.testProject
          ) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
    },
    name(item) {
      let name = `${item.sampleNum}${
        item.sampleNumIndex ? item.sampleNumIndex : ""
      }${item.parallelLetter ? item.parallelLetter : ""}`;
      return name.replace(/\s*/g, "");
    },
    // returnVal(value, itemId, index, myItem) {
    // this.jsonString.forEach(item => {
    //   if (item.to === "project_wsw_dx") {
    //     item.data.valueData.point.forEach(item2 => {
    //       if (item2.itemId === itemId && item2.realItem) {
    //         this.$set(item2.analysisResult, index, myItem);
    //       }
    //     });
    //   }
    // })
    // this.data.valueData.point[index].analysisResult = myItem.result;
    // console.log(this.data)
    // },

    returnVal(val, itemId, index, myItem) {
      if (val !== "自定义") {
        this.data.valueData.point[index].sysAnalysisResult = myItem.result;
      } else {
        this.showInput = true;
        this.data.valueData.point[index].sysAnalysisResult = " ";
        this.$forceUpdate();
      }
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.data.valueData.point[index].sysAnalysisResult = val;
      if (val === "") {
        this.showInput = false;
      }
      this.$forceUpdate();
    },

    returnVal2(val, itemId) {
      this.jsonString.forEach((item) => {
        if (item.to === "project_wsw_dx") {
          item.data.valueData.point.forEach((item2) => {
            if (item2.itemId === itemId && item2.realItem) {
              this.$set(item2, "sysReportCount", val);
              if (val.indexOf("自定义") === -1) {
                this.$set(item2, "sysReport", val);
              } else {
                item2.sysReport = "";
                //this.$set(item2, 'resultValue', '');
              }
            }
          });
        }
      });
    },
    submit(data) {
      let flag = false;
      this.jsonString.forEach((item) => {
        item.data.valueData.point.forEach((a) => {
          if (a.sampleNum + a.parallelLetter === data.sampleNumAndIndex) {
            if (
              a.sysObservationRecordArr &&
              a.sysObservationRecordArr !== "undefined"
            ) {
              if (a.sysObservationRecordArr instanceof Array) {
              } else {
                a.sysObservationRecordArr = JSON.parse(
                  a.sysObservationRecordArr
                );
              }
            } else {
              a.sysObservationRecordArr = [];
            }
            a.sysObservationRecordArr.forEach((b) => {
              if (b.date === data.date) {
                b.resultArr = data.resultArr;
                flag = true;
              }
            });
            if (flag) return;
            a.sysObservationRecordArr.push({
              date: data.date,
              resultArr: data.resultArr,
            });
            a.sysObservationRecordArr.sort((r, b) => {
              return r.date < b.date ? -1 : r.date > b.date ? 1 : 0;
            });
          }
        });
      });
      this.$emit("redefinition");
      this.dialogVisible = false;
    },
  },
  mounted() {
    let _this = this;
    setTimeout(() => {
      let sampleNumArr = [];
      this.data.valueData.point.forEach((item) => {
        item.realItem = false;
        if (item.sampleNum != "") {
          sampleNumArr.push(this.name(item));
        }
      });

      let resetSampleNumArr = Array.from(new Set(sampleNumArr));
      resetSampleNumArr.forEach((item) => {
        let sum = 0;
        sampleNumArr.forEach((val, num) => {
          if (item === val) {
            sum++;
          }
        });
        this.data.valueData.point
          .filter((val) => this.name(val) === item)
          .forEach((val) => {
            val.analysisItemsLength = sum;
          });
        this.data.valueData.point.find(
          (val) => this.name(val) === item
        ).realItem = true;
      });
      this.$forceUpdate();
    }, 1000);
  },
};
</script>

<style scoped>
</style>
