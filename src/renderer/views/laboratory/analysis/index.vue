<template>
  <div id="myBox">
    <div class="toggleNowPage">
      <el-radio-group
        v-model="nowPage"
        @change="getNewData"
        style="width: 400px; text-align: left"
      >
        <el-radio-button label="待分析"></el-radio-button>
        <el-radio-button label="正在分析"></el-radio-button>
        <el-radio-button label="已分析"></el-radio-button>
      </el-radio-group>
    </div>
    <div>
      <el-carousel
        trigger="click"
        indicator-position="outside"
        :autoplay="false"
        @change="changeCarousel"
        :initial-index="analysisInitial_index"
      >
        <el-carousel-item :key="1" label="理化">
          <div style="margin-bottom: 10px; height: 100%; overflow-y: auto">
            <my-table
              ref="myt"
              style="min-height: 66vh"
              :data="dataLihua"
              :title="'理化'"
            ></my-table>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="2" label="放射">
          <div style="margin-bottom: 20px; height: 100%; overflow-y: auto">
            <my-table
              :data="dataFangshe"
              style="min-height: 65vh"
              :title="'放射'"
            ></my-table>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="3" label="微生物">
          <div style="margin-bottom: 20px; height: 100%; overflow-y: auto">
            <my-table
              :data="dataWeishenghu"
              style="min-height: 65vh"
              :title="'微生物'"
            ></my-table>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="position: fixed; right: 5vw; top: 90vh; z-index: 2001">
      <el-button @click="clearSelected">取消选择</el-button>
      <el-button
        v-show="nowPage === '正在分析'"
        type="primary"
        @click="sendBack"
        >退回</el-button
      >
      <el-button type="primary" @click="entry">{{
        nowPage === "待分析" || nowPage === "正在分析" ? "分析" : "查看"
      }}</el-button>
      <el-button
        type="primary"
        v-show="nowPage === '待分析' || nowPage === '正在分析'"
        @click="importFile"
        >导入</el-button
      >
    </div>

    <el-dialog :title="'样品操作'" :visible.sync="selectParallelSample" center>
      <div>
        <el-radio v-model="radio" label="1" border style="width: 150px"
          >新样品</el-radio
        >
        <el-radio v-model="radio" label="2" border style="width: 150px"
          >上次样品</el-radio
        >
      </div>
      <div v-if="radio == 1">
        <div
          class="paralleBoxPingXing"
          v-if="testProjectName == 'project_systvoc'"
        >
          <!-- <div>请勾选平行样</div> -->

          <el-row v-for="item in samplesArr" :key="item.id">
            <el-col :span="12">
              <div>
                <el-checkbox-group
                  v-model="checkedParallelSample"
                  disabled
                  size="mini"
                >
                  <el-checkbox
                    @change="changeCheckBox"
                    :label="item.id"
                    class="oneCheckBox"
                    >{{ item.name }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </el-col>
            <el-col :span="5" v-if="item.isParallel">
              <div class="oneInput">
                <el-input
                  v-model="item.parallelWindArea1"
                  @input="
                    item.parallelWindArea1 = item.parallelWindArea1.replace(
                      /[^\d.]/g,
                      ''
                    )
                  "
                  placeholder="输入平行样1总峰面积"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="5" :offset="1" v-if="item.isParallel">
              <div class="oneInput">
                <el-input
                  v-model="item.parallelWindArea2"
                  @input="
                    item.parallelWindArea2 = item.parallelWindArea2.replace(
                      /[^\d.]/g,
                      ''
                    )
                  "
                  placeholder="输入平行样2总峰面积"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="5" v-if="!item.isParallel">
              <div class="oneInput">
                <el-input
                  v-model="item.parallelWindArea"
                  @input="
                    item.parallelWindArea = item.parallelWindArea.replace(
                      /[^\d.]/g,
                      ''
                    )
                  "
                  placeholder="输入平行样总峰面积"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="paralleBoxPingXing" v-else>
          <div>请勾选平行样</div>
          <div>
            <el-checkbox-group
              :disabled="labelIndex == 2"
              v-model="checkedParallelSample"
              size="mini"
            >
              <el-checkbox
                @change="changeCheckBox"
                v-for="item in samplesArr"
                :key="item.id"
                :label="item.id"
                class="oneCheckBox"
                >{{ item.name }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSelectParallel">取 消</el-button>
        <el-button type="primary" @click="toEntry">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="'导入'" :visible.sync="toImportFile" center>
      <div class="paralleBox">
        <el-upload
          :action="hostUrl + '/upload_sysDeviceData'"
          :on-success="fileSuccess"
          :on-error="fileError"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-row>
        <el-col :span="2" :offset="11">
          <el-button @click="toImportFile = false">取 消</el-button>
        </el-col>
        <el-col :span="1" style="margin-left: 10px">
          <el-button type="primary" @click="toImportFile = false"
            >确 定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  querySubmittedSample,
  toQuerySysSampleTemporaryStorageData,
  querySysSampleData,
  updateSampleAnalysisStaff,
} from "@/api/laboratory";
import store from "@/store";
import myTable from "@/views/components/myTable";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      labelIndex: "",
      analysisInitial_index: 0,
      template: [], //检测项目数组
      samplesArr: [],
      testProjectName: "",
      testProjectChieseName: "",
      dataWeishenghu: [],
      selectSample: [],
      nowPage: "待分析",
      dataFangshe: [],
      dataLihua: [],
      radio: "1",
      dataWeishenghu2: [],
      dataFangshe2: [],
      dataLihua2: [],
      allTestProject: [],

      select: [],
      defaultProps: {
        children: "value",
        label: "name",
      },
      selectParallelSample: false,
      nowTestProject: "",
      checkedParallelSample: [], //被选择的平行样
      toImportFile: false,
      sampleIds: [],
      analysis: "",
    };
  },
  components: {
    myTable,
  },
  created() {
    let analysis = sessionStorage.getItem("analysisLabel");
    sessionStorage.setItem("analysisLabel", analysis ? analysis : "待分析");
  },
  mounted() {
    let analysisInitial_index = sessionStorage.getItem("analysisInitial_index");
    let analysisLabel = sessionStorage.getItem("analysisLabel");
    analysisInitial_index
      ? (this.analysisInitial_index = Number(analysisInitial_index))
      : "";
    analysisLabel ? (this.nowPage = analysisLabel) : "";
    this.nowPage === "待分析"
      ? this.toQuerySubmittedSample(2)
      : this.nowPage === "正在分析"
      ? this.toQuerySubmittedSample(6)
      : this.toQuerySubmittedSample(3);
    this.analysis = sessionStorage.getItem("analysisLabel");
  },
  methods: {
    changeCarousel(index) {
      this.labelIndex = index;
      sessionStorage.setItem("analysisInitial_index", index);
      this.$eventBus.$emit("clearSelect");
    },
    //获取4 是已分析 5是未分析
    toQuerySubmittedSample(state) {
      querySubmittedSample(state, JSON.parse(getToken()).id).then((res) => {
        if (res.dataWeishenghu) {
          this.dataWeishenghu = res.dataWeishenghu;
        }
        if (res.dataFangshe) {
          this.dataFangshe = res.dataFangshe;
        }
        if (res.dataLihua) {
          this.dataLihua = res.dataLihua;
        }
      });
    },

    selected() {
      let arr = ["tree", "tree1", "tree2"];
      this.template = [];
      this.select = [];
      for (let j = 0; j < arr.length; j++) {
        if (
          this.$refs[[arr[j]]] &&
          this.$refs[arr[j]].getCheckedNodes().length > 0
        ) {
          let selectedNodes = this.$refs[arr[j]].getCheckedNodes();
          let select = selectedNodes.filter(
            (item) => item.testProjectId != undefined
          );
          this.select = this.select.concat(select);
          let template = selectedNodes.filter(
            (item) => item.hasOwnProperty("id") && item.hasOwnProperty("value")
          );
          for (let i = 0; i < template.length; i++) {
            this.template.push(template[i]);
          }
        }
      }
    },

    entry() {
      let nowAnaly = this.nowPage;
      sessionStorage.setItem("analysis", nowAnaly);
      this.dataWeishenghu2 = [];
      this.dataFangshe2 = [];
      this.dataLihua2 = [];
      this.template = [];
      let arr = ["dataWeishenghu", "dataFangshe", "dataLihua"];
      arr.forEach((arrItem) => {
        if (this[arrItem] && this[arrItem].length > 0) {
          this[arrItem].forEach((item) => {
            if (item.isSelected) {
              this[arrItem + "2"].push(item);
            }
          });
        }
      });
      this.template = JSON.parse(
        JSON.stringify([
          ...this.dataWeishenghu2,
          ...this.dataFangshe2,
          ...this.dataLihua2,
        ])
      );

      if (this.template <= 0) {
        this.$notify({
          type: "warning",
          message: "请选择检测项目!",
        });
        return;
      }
      console.log(this.template);
      this.sampleNumId = [];
      this.template.forEach((item) => {
        item.value.forEach((a) => {
          this.sampleNumId.push(a.id);
        });
      });
      for (let i = 0; i < this.template.length; i++) {
        let id = this.template[i].testProjectId;
        let result = this.template.every((item) => item.testProjectId === id);
        if (result === false) {
          let msg =
            nowAnaly === "待分析" || nowAnaly === "正在分析"
              ? "请选择相同检测项目分析!"
              : "请选择相同检测项目查看!";
          this.$notify({
            type: "warning",
            message: msg,
          });
          return;
        }
      }
      let flag = true;
      let taskDataStateIdArr = this.template.map(
        (item) => item.taskDataStateId
      );
      let taskDataStateId = taskDataStateIdArr.length
        ? taskDataStateIdArr[0]
        : "";
      taskDataStateIdArr.forEach((item) => {
        item !== taskDataStateId && item && (flag = false);
      });
      if (!flag && taskDataStateIdArr.length >= 1) {
        this.$message.warning("请选择上次一起分析的项目");
        return;
      }
      // sessionStorage.setItem("inspectionTime", this.template[0].inspectionTime);
      this.testProjectName = this.template[0].modelName;
      this.testProjectChieseName = this.template[0].name;
      this.samplesArr = [];
      this.template.forEach((item) => {
        let blankSamples = JSON.parse(
          JSON.stringify(item.value.filter((item) => item.blankSample === 1))
        );
        let publicSamples = JSON.parse(
          JSON.stringify(item.value.filter((item) => item.blankSample === 0))
        );
        publicSamples.forEach((item2) => {
          if (blankSamples instanceof Array) {
            item2.myBlankSample = blankSamples;
          } else {
            item2.myBlankSample = [blankSamples];
          }
        });
        item.value = publicSamples;
      });

      this.template.forEach((item) => {
        let newItem = JSON.myParse(JSON.stringify(item));
        this.samplesArr = this.samplesArr.concat(newItem.value);
      });
      let template2 = [];
      template2[0] = this.template[0];
      template2[0].value = this.samplesArr;
      this.template = template2;
      if (nowAnaly === "待分析" || nowAnaly === "正在分析") {
        this.selectParallelSample = true;
      } else {
        this.selectParallelSample = false;
        let sampleNums = this.template[0].value.map((item) => item.sysSampleId);
        querySysSampleData(sampleNums).then((res) => {
          if (res.success) {
            res.samples.forEach((item) => {
              try {
                item.myBlankSample = JSON.parse(item.blankSampleArr);
              } catch (e) {
                item.myBlankSample = [];
              }
            });
            store.dispatch("TemplateAction", "update");
            store.dispatch("ChangeHasReviewData", res);
            this.$router.push(`/laboratory/doc-entering/4`);
            store.dispatch("UpdateLabTemplate", this.template);
            sessionStorage.setItem("isSelect", "");
            if (this.nowPage === "待审核") {
              sessionStorage.setItem("isSelect", "0");
            } else {
              sessionStorage.setItem("isSelect", "1");
            }
          } else {
            this.$notify({
              type: "warning",
              message: "获取数据失败!",
            });
          }
        });
      }
      this.samplesArr.forEach((item) => {
        item.isParallel = false;
      });
    },

    changeCheckBox() {
      this.template[0].value.forEach((item) => {
        let id = item.id;
        if (this.checkedParallelSample.indexOf(id) !== -1) {
          item.isParallel = true;
        } else {
          item.isParallel = false;
        }
      });
    },
    // 退回任务
    sendBack() {
      this.dataWeishenghu2 = [];
      this.dataFangshe2 = [];
      this.dataLihua2 = [];
      this.template = [];
      let arr = ["dataWeishenghu", "dataFangshe", "dataLihua"];
      arr.forEach((arrItem) => {
        if (this[arrItem] && this[arrItem].length > 0) {
          this[arrItem].forEach((item) => {
            if (item.isSelected) {
              this[arrItem + "2"].push(item);
            }
          });
        }
      });
      this.template = JSON.parse(
        JSON.stringify([
          ...this.dataWeishenghu2,
          ...this.dataFangshe2,
          ...this.dataLihua2,
        ])
      );
      if (this.template.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择分析项目!",
        });
        return;
      }

      this.sampleNumId = [];
      this.template.forEach((item) => {
        item.value.forEach((a) => {
          this.sampleNumId.push(a.id);
        });
      });
      this.$confirm("确定退回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateSampleAnalysisStaff(this.sampleNumId.join(","), 2).then(
            (res) => {
              if (res.success) {
                this.$message.success("退回成功");
                this.toQuerySubmittedSample(6);
              } else {
                this.$message.error("失败");
              }
            }
          );
        })
        .catch(() => {});
    },
    // 去录入
    toEntry() {
      let sysSampleIds = this.template[0].value.map((item) => item.sysSampleId);
      // return
      store.dispatch("ChangeSaveAnalysisData", null);
      // 录入上次样品
      updateSampleAnalysisStaff(
        this.sampleNumId.join(","),
        JSON.parse(getToken()).id,
        1
      ).then((res) => {});
      if (this.radio == 2) {
        let sysSampleIds = this.template[0].value.map(
          (item) => item.sysSampleId
        );
        this.template[0].value.map((item) => {
          item.myBlankSample.map((a) => {
            sysSampleIds.push(a.id);
          });
        });

        // this.sampleNumId
        toQuerySysSampleTemporaryStorageData(sysSampleIds).then((res) => {
          if (!res.data.length) {
            this.$message.error("暂无样品");
            return;
          }
          let testDeviceCheckBox = res.data[0].testDeviceCheckBox;
          let curveArr = res.data[0].curveArr;
          res.data.forEach((item) => {
            item.labSampleNum ? (item.sampleNum = item.labSampleNum) : "";
            item.testResults= JSON.parse(this.template[0].value[0].sysBlankReportArr)
            try {
              item.myBlankSample = JSON.parse(item.blankSampleArr);
            } catch (e) {
              item.myBlankSample = [];
            }
          });
          this.template[0].value.forEach((item) => {
            item.curveArr = curveArr;
            item.testDeviceCheckBox = testDeviceCheckBox;
          });
          if (this.testProjectName == "project_systvoc") {
            let result = true;
            this.template[0].value.forEach((item) => {
              item.parallelWindArea = item.sysSampleTotalArea;
              // if (item.isParallel) {
              //   if (!(item.parallelWindArea1 || item.parallelWindArea1)) {
              //     result = false;
              //   }
              // }
              if (!item.isParallel) {
                if (!item.parallelWindArea) {
                  result = false;
                }
              }
            });
            store.dispatch("TemplateAction", "update");
            store.dispatch("UpdateLabTemplate", this.template);
            store.dispatch("ChangeSaveAnalysisData", res.data);
            this.$router.push(`/laboratory/doc-entering/1`);
          } else {
           
            store.dispatch("TemplateAction", "update");
            store.dispatch("UpdateLabTemplate", this.template);
            store.dispatch("ChangeSaveAnalysisData", res.data);
            this.$router.push(`/laboratory/doc-entering/1`);
          }
        });
      } else {
        // 录入本次样品
        if (this.testProjectName == "project_systvoc") {
          let result = true;
          this.template[0].value.forEach((item) => {
            item.sysBlankTotalArea = "";
            item.sysBlankTargetTotalArea = "";
            if (item.isParallel) {
              if (!(item.parallelWindArea1 || item.parallelWindArea1)) {
                result = false;
              }
            }
            if (!item.isParallel) {
              if (!item.parallelWindArea) {
                result = false;
              }
            }
          });
          if (result) {
            store.dispatch("TemplateAction", "update");
            store.dispatch("UpdateLabTemplate", this.template);
            this.$router.push(`/laboratory/doc-entering/1`);
          } else {
            this.$notify({
              type: "warning",
              message: "请输入总峰面积",
            });
            return;
          }
          store.dispatch("TemplateAction", "update");
          store.dispatch("UpdateLabTemplate", this.template);
          this.$router.push(`/laboratory/doc-entering/1`);
        } else {
          store.dispatch("TemplateAction", "update");
          store.dispatch("UpdateLabTemplate", this.template);
          this.$router.push(`/laboratory/doc-entering/1`);
        }
      }
    },

    closeSelectParallel() {
      this.checkedParallelSample = [];
      this.selectParallelSample = false;
    },

    importFile() {
      this.toImportFile = true;
    },

    fileSuccess(res) {
      console.log(res);
    },

    fileError(res) {
      console.log(res);
    },

    clearSelected() {
      this.$eventBus.$emit("clearSelect");
    },

    getNewData(newVal) {
      sessionStorage.setItem("analysisLabel", newVal);
      if (newVal === "待分析") {
        this.nowPage = "待分析";
        this.$store.dispatch("ClearSelect", true);
        sessionStorage.setItem("analysis", "待分析");
        this.toQuerySubmittedSample(2);
      } else if (newVal === "已分析") {
        this.nowPage = "已分析";
        this.$store.dispatch("ClearSelect", true);
        sessionStorage.setItem("analysis", "已分析");
        this.toQuerySubmittedSample(3);
      } else {
        this.nowPage = "正在分析";
        this.$store.dispatch("ClearSelect", true);
        sessionStorage.setItem("analysis", "正在分析");
        this.toQuerySubmittedSample(6);
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.paralleBox {
  margin-top: 30px;
  min-height: 400px;
  padding-left: 3vw;
}

.paralleBoxPingXing {
  margin-top: 20px;
  min-height: 400px;
  padding-left: 3vw;
}

.oneCheckBox {
  margin-top: 35px;
}

.oneInput {
  margin-top: 25px;
}

.toggleNowPage {
  margin-bottom: 15px;
  padding-right: 85vw;
}
</style>

<style >
.el-carousel__container {
  height: 66vh !important;
}
</style>
