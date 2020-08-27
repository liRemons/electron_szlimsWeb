<template>
  <div class="entering-container">
    <div class="___absolute" style="width: 30px; top: 86px; left: 140px;">
      <i class="el-icon-loading" v-show="showSaveLog"></i>
    </div>

    <!--存放按钮的div-->
    <div style="text-align: right; padding-right: 10vw;" class="floatMybar">
      <el-button
        @click="back()"
        size="mini"
        style="margin-left: 160px;"
        type="danger"
        >返回</el-button
      >
      <el-button
        @click="TemporaryStorage(false)"
        size="mini"
        type="primary"
        v-if="
          target == 1 &&
          (nowAnalysis === '待分析' || nowAnalysis === '正在分析')
        "
      >
        保存
      </el-button>

      <el-button
        @click="showFingerprintNopass = true"
        size="mini"
        type="danger"
        v-if="target == 2 || (target == 3 && nowTask.pass !== 4)"
        >不通过
      </el-button>

      <el-button
        @click="showModuleOption"
        style="position: fixed; left: 4.2vw; top: 25vh;"
        size="mini"
        type="primary"
        round
        v-if="target == 0"
        >模块
      </el-button>

      <el-button
        @click="showBook"
        style="position: fixed; right: 4.1vw; top: 25vh;"
        size="mini"
        type="primary"
        round
        v-if="target == 0 || target == 2 || target == 3"
        >索引
      </el-button>

      <el-button
        @click="temporaryData"
        size="mini"
        type="primary"
        v-if="tempalteAction == 'update' && target == 0"
        >暂存
      </el-button>

      <el-button
        @click="submitSongshen"
        size="mini"
        type="primary"
        v-if="tempalteAction == 'update' && target == 0"
        >送审
      </el-button>

      <!--0 现场录入  1 实验室分析  2 现场审核  3 现场上传-->

      <el-button
        @click="toShowSongShen"
        size="mini"
        type="primary"
        v-else-if="
          target == 1 &&
          (nowAnalysis === '待分析' || nowAnalysis === '正在分析')
        "
      >
        送审
      </el-button>

      <el-button
        @click="showFingerprintTwo = true"
        size="mini"
        type="primary"
        v-else-if="target == 2"
        >通过
      </el-button>
      <el-button
        @click="toUpload"
        size="mini"
        type="primary"
        v-else-if="target == 3 && nowTask.pass !== 4"
        >上传
      </el-button>
      <el-button
        @click="signatureTimeDialog = true"
        size="mini"
        type="primary"
        v-if="target == 3 && nowTask.pass !== 4"
        >远程签名
      </el-button>

      <el-button
        @click="entryYuanShi"
        size="mini"
        type="primary"
        v-else-if="target == 5 && showSave"
        >保存</el-button
      >

      <el-button
        @click="reviewBack"
        size="mini"
        type="danger"
        v-if="target == 4 && isSelect === '0'"
        >不通过</el-button
      >
      <el-button
        size="mini"
        type="danger"
        v-if="target == 0 && (tasks[0] ? tasks[0].docPass !== 1 : true)"
        @click="end"
        >检测结束</el-button
      >

      <el-button
        @click="lookConfig"
        size="mini"
        type="primary"
        v-if="target == 4"
        >查看配制记录</el-button
      >

      <el-button
        @click="showFingerprintFour = true"
        size="mini"
        type="primary"
        v-if="target == 4 && isSelect === '0'"
      >
        通过
      </el-button>
    </div>

    <!--渲染组件-->
    <div>
      <el-row>
        <el-col :span="14">
          <div class="task-tabs">
            <div
              :class="setTabClore(tabkey)"
              @click="switchTab(tabkey)"
              class="tab"
              v-bind:key="tabkey"
              v-for="(i, tabkey) in tabArray"
            >
              任务 {{ tabkey + 1 }}
            </div>
          </div>
        </el-col>
      </el-row>

      <div v-if="target == 0 && inputFlag">
        <div :key="key" v-for="(item, key) in tasks" v-show="key == currentTab">
          <show-template
            :android="android"
            :target="target"
            :task="item"
            :taskData="taskDatas[key]"
            :importData="importData"
          />
        </div>
      </div>

      <div v-if="target == 1 && inputFlag">
        <div
          v-bind:key="key"
          v-for="(item, key) in labtemplate"
          v-show="key == currentTab"
        >
          <show-laboratory-template
            :android="android"
            :sample="item"
            :sampleData.sync="sampleDatas[key]"
            :target="target"
            :testProject="item"
            @changeMyCurve="getChangeMyCurve"
            @selectedBox="toSelectedBox"
            @selectedCurve="toSelectedCurve"
            @changeAllFeng="changeAllFeng"
            :AllFengFlag="AllFengFlag"
          />
        </div>
      </div>

      <div v-if="target == 4 && inputFlag">
        <div v-bind:key="key" v-for="(item, key) in labtemplate">
          <show-laboratory-template
            v-if="key == currentTab"
            :android="android"
            :sample="item"
            :sampleData.sync="sampleDatas[key]"
            :target="target"
            :testProject="item"
          />
        </div>
      </div>

      <div v-if="target == 5 && inputFlag">
        <show-curve-template
          :templateContent="templateContent"
          :target="target"
          ref="curveTemplate"
        />
      </div>
      <div v-if="target == 6 && inputFlag">
        <showReviewTemplate></showReviewTemplate>
      </div>
      <div v-if="target == 2 && inputFlag">
        <div
          v-bind:key="key"
          v-for="(item, key) in tasks"
          v-if="key == currentTab"
        >
          <show-template
            :target="target"
            :task="item"
            :taskData="taskDatas[key]"
            android="false"
          />
        </div>
      </div>

      <div v-if="target == 3 && inputFlag">
        <div
          v-bind:key="key"
          v-for="(item, key) in tasks"
          v-show="key == currentTab"
        >
          <show-template
            ref="templateHTML"
            :imgBase64Two="imgBase64Two"
            :task="item"
            :taskData="taskDatas[key]"
            android="false"
            :unitUrl="unitUrl"
          />
        </div>
      </div>
    </div>

    <!--存放dialog的div-->
    <div>
      <!-- 现场检测员指纹验证 -->
      <el-dialog :visible.sync="showFingerprint">
        <fingerprint
          @fingerResult="toEntry"
          :person="allPerson"
          :target="target"
          :limit="3"
          v-if="showFingerprint"
          :showFingerprintFlag="showFingerprint"
          :tasksArrCheck="tasksArrCheck"
        ></fingerprint>
      </el-dialog>

      <!-- 实验室分析指纹验证 -->
      <el-dialog :visible.sync="showFingerprintThree">
        <fingerprint
          @fingerResult="toSongshen"
          :person="allPerson"
          :target="target"
          v-if="showFingerprintThree"
          :showFingerprintFlag="showFingerprintThree"
        ></fingerprint>
      </el-dialog>

      <!-- 现场校核员指纹验证 -->
      <el-dialog :visible.sync="showFingerprintTwo">
        <fingerprint
          v-if="showFingerprintTwo"
          @fingerResult="toReview"
          :person="allPerson"
          :target="target"
          :tasksArrCheck="tasksArrCheck"
          :showFingerprintFlag="showFingerprintTwo"
        ></fingerprint>
      </el-dialog>

      <!-- 受检单位陪同人签名 -->
      <!--        <el-dialog :visible.sync="showSignature">-->
      <!--            <signature @download="toUpload"></signature>-->
      <!--        </el-dialog>-->

      <!-- 实验室审核 -->
      <el-dialog :visible.sync="showFingerprintFour">
        <fingerprint
          v-if="showFingerprintFour"
          @fingerResult="toShiYanReview"
          :person="allPerson"
          :target="target"
          :tasksArrCheck="tasksArrCheck"
          :showFingerprintFlag="showFingerprintFour"
        ></fingerprint>
      </el-dialog>

      <!-- 审核不通过 -->
      <el-dialog :visible.sync="showFingerprintNopass">
        <fingerprint
          :button="'确定'"
          v-if="showFingerprintNopass"
          @fingerResult="toNoPass"
          :person="allPerson"
          :tasksArrCheck="tasksArrCheck"
          :showFingerprintFlag="showFingerprintNopass"
          :target="target"
        ></fingerprint>
      </el-dialog>

      <!-- 现场审核不通过 -->
      <el-dialog
        :title="'不通过原因'"
        :visible.sync="notPassedBox"
        class="noPassBox"
      >
        <el-input
          :rows="10"
          placeholder="请输入内容"
          show-word-limit
          type="textarea"
          v-model="reason"
        >
        </el-input>
        <div style="text-align: right;">
          <el-button
            @click="decideNoPass"
            type="primary"
            style="margin-top: 50px;"
            >确定</el-button
          >
        </div>
      </el-dialog>

      <!--查看配置记录-->
      <el-dialog
        :title="'标准溶液配制原始记录'"
        :visible.sync="showConfigPage"
        class="noPassBox"
        :modal="false"
        width="90%"
      >
        <div style="min-height: 700px; padding-left: 2vw;">
          <show-curve-template
            :templateContent="templateContent"
            style="width: 800px;"
            ref="curveTemplate"
          />
        </div>
      </el-dialog>
    </div>
    <!-- 取消原因提醒框 -->
    <el-dialog
      title="以下项目您取消了检测，请确认"
      :visible.sync="deleteDialog"
    >
      <el-table :data="deleteData" style="width: 100%;">
        <el-table-column prop="testprojectName" label="项目"> </el-table-column>
        <el-table-column prop="reason" label="原因"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">继续送审</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="copyDialog">
      <el-input id="copy" placeholder="请输入内容" v-model="copyText">
        <template slot="append">
          <el-button type="primary" @click="copy">复制</el-button>
        </template>
      </el-input>
    </el-dialog>
    <el-dialog
      width="400px"
      title="设置远程签名失效时间（小时）"
      :visible.sync="signatureTimeDialog"
      v-if="signatureTimeDialog"
    >
      <el-input-number
        v-model="unitInvalidDuration"
        :min="0.1"
        :step="0.5"
      ></el-input-number>
      <div style="margin-top: 30px;">
        <el-button round @click="signatureTimeDialog = false">取消</el-button>
        <el-button type="primary" round @click="longSignature">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
import store from "@/store";
import ShowTemplate from "./components/ShowTemplate";
import ShowLaboratoryTemplate from "./components/ShowLaboratoryTemplate.vue";
import ShowCurveTemplate from "./components/ShowCurveTemplate";
import showReviewTemplate from "./components/showReviewTemplate.vue";
import fingerprint from "../components/upload/Upload";
import signature from "../components/signature/index";
import { getTaskById } from "@/api/entering";
import {
  addGwCyTaskData,
  updateTask,
  uploadImage,
  winUpdateTaskState,
  updateTaskData,
  getStaffImg,
  getStaffImg_x,
  updateIsDone,
  updateTaskUpload,
  getMan,
  getAllMan,
  generateMeasure,
  updateUnitGenerateTime,
} from "@/api/local";
import {
  updateSampleData,
  toTemporaryStorageSampleData,
  updateSolution,
  querySysSampleData,
} from "@/api/laboratory";
import {
  receiveSample,
  toSongShen,
  updateCurveSolutionPreparationData,
  copySolution,
  updateSampleStateFinger,
  updateSampleStaffCheck,
  updateSampleStaff,
} from "@/api/laboratory";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      inputFlag: true,
      tasksArrCheck: [],
      copyText: "",
      copyDialog: false,
      signatureTimeDialog: "",
      tasks: [],
      currentTab: 0,
      tabArray: [],
      ids: [],
      taskDatas: [],
      showFingerprint: false,
      isSelect: "",
      android: "hide",
      target: 0, //0是现场
      samples: [],
      allPerson: [],
      nowAnalysis: "",
      showConfigPage: false,
      sampleDatas: [],
      templateContent: "",
      showSaveLog: false,
      templateArr: [],
      showSignature: false,
      showFingerprintTwo: false,
      showFingerprintNopass: false,
      imgBase64: "",
      imgBase64Two: "",
      nowTask: [],
      entryId: "",
      reason: "",
      sysAtlasUrl: "",
      deleteArr: [],
      notPassedBox: false,
      checkId: "",
      showBookValue: false,
      numObj: {},
      imgBase64Three: "",
      delRowReasonText: "",
      sampleObj: {},
      showFingerprintThree: false,
      showFingerprintFour: false,
      imgData: "",
      timerId: "",
      addYuanShiObj: {},
      solutionPreparationData: {},
      selectedCurve: "",
      selectedResult: "",
      selectedResults: [],
      selectedResults2: [],
      entryStartTime: "",
      entryEndTime: "",
      checkTime: "",
      uploadTime: "",
      curveArr: [],
      taskState: [],
      delRowReason: false,
      delRowReasonArr: [],
      AllFeng: "",
      AllFengFlag: {
        flag: false,
      },
      importData: {},
      unitUrl: [],
      deleteData: [],
      historyEdit: [],
      deleteDialog: false,
      staffName: "",
      unitInvalidDuration: 0.5,
    };
  },

  components: {
    fingerprint,
    ShowTemplate,
    signature,
    ShowLaboratoryTemplate,
    ShowCurveTemplate,
    showReviewTemplate,
  },
  methods: {
    end() {
      const time = () => {
        this.entryEndTime = this.MethodsRe.dateFormat();
        this.$nextTick(() => {
          this.importData.tasks.tasks[0].endTime = this.entryEndTime;
          this.taskDatas[0].showing.forEach((item) => {
            item.forEach((a) => {
              if (a.to == "project_jbxx") {
                a.data.valueData.endTime = this.entryEndTime;
              }
            });
          });
          this.$message.success("结束时间生成成功");
        });
      };
      if (this.entryEndTime) {
        this.$confirm("已有结束时间，确认结束?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          time();
        });
      } else {
        this.$confirm("确认结束?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          time();
        });
      }
    },
    getHistoryEdit() {
      this.readFile(JSON.parse(getToken()), "noPass");
      this.readFileEvent().then((res) => {
        let data;
        let staffId = JSON.parse(res).staff.id;
        JSON.parse(res).list.forEach((item) => {
          if (item.taskId == this.$route.params.ids) {
            data = item;
          }
        });
        let historyEdit = [];
        // 判断是否修改过值
        data &&
          this.getHistory().forEach((item, index) => {
            data.history.forEach((a) => {
              if (item.project == a.project) {
                a.values.forEach((b, index) => {
                  if (b.value !== item.values[index].value) {
                    historyEdit.push({
                      project: a.project,
                      title: b.title,
                      value: b.value,
                      staffId: staffId,
                      editValue: item.values[index].value,
                    });
                  }
                });
              }
            });
          });
        historyEdit.forEach((item) => {
          item.taskId = this.$route.params.ids;
          item.createTime = this.MethodsRe.dateFormat();
          item.explain = `将 ${item.project} 模块中的 ${item.title} 的值由 ${item.value} 更改为 ${item.editValue}`;
        });
        this.historyEdit = historyEdit;
      });
    },
    submitSongshen() {
      if (this.tasks[0].docPass == 1) {
        this.getHistoryEdit();
      }
      this.$confirm(
        "请确认未录入数据的检测参数，现场检测条件不适用时，必须选择删除模块！！！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          if (!this.entryEndTime) {
            this.$message.error("请点击检测结束");
            return;
          }
          let data = this.taskDatas[0].showing
            .flat()
            .filter((item) => item.to == "project_deleteReason");
          if (data.length) {
            this.deleteData = data[0].data.valueData.point;
          } else {
            this.deleteData = [];
          }

          if (this.deleteData.length > 0) {
            this.deleteDialog = true;
          } else {
            this.confirmDelete();
          }
        })
        .catch(() => {});
    },
    confirmDelete() {
      this.deleteDialog = false;
      this.showFingerprint = true;
      this.getTaskPerson();
    },
    goBack() {
      this.$confirm("点击此处返回可能会导致数据丢失, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          window.history.back();
          // sessionStorage.clear();
        })
        .catch(() => {
          history.pushState(null, null, document.URL);
        });
    },
    // 离线录入
    enteringData(arg, ids, target) {
      let promiseArr = [];
      if (target == 0) {
        this.importData = JSON.parse(arg);
        this.entryEndTime = this.importData.tasks.tasks[0].endTime;
        let p1 = new Promise((resolve, reject) => {
          resolve();
        }).then((res) => JSON.parse(arg).tasks);
        promiseArr = [p1];
      } else {
        for (let i = 0; i < ids.length; i++) {
          promiseArr.push(getTaskById(ids[i]));
          updateIsDone(ids[i]);
        }
      }
      Promise.all(promiseArr).then((values) => {
        this.tasksArrCheck = values;
        this.numObj.sampleNum_lh = values[0].sampleNum_lh;
        this.numObj.sampleNum_wsw = values[0].sampleNum_wsw;
        this.numObj.sampleNum_xczd = values[0].sampleNum_xczd;
        this.numObj.sampleNum_kb = values[0].sampleNum_kb;
        sessionStorage.setItem("numObj", JSON.stringify(this.numObj));
        sessionStorage.setItem("projectNum", values[0].tasks[0].projectNum);
        sessionStorage.setItem(
          "checkUnitName",
          values[0].tasks[0].checkUnitName
        );
        values.forEach((resItem) => {
          this.unitUrl.push({
            id: resItem.tasks[0].id,
            unitUrl: resItem.tasks[0].unitUrl,
          });
          this.tasks.push(resItem.tasks[0]);
          this.taskDatas.push({
            id: "",
            disWs: "",
            showing: [],
          });
        });
        let taskState = this.tasks.map((item) => {
          if (item.monitorType === "验收检测") {
            return 1;
          } else if (item.monitorType === "状态检测") {
            return 2;
          } else {
            return "";
          }
        });
        this.nowTask = this.tasks[0];
        if (Number(target)) {
          this.getTaskPerson();
        }
        this.taskState = taskState;
        this.$store.dispatch("actionsTestingState", this.taskState[0]);
      });
    },
    // 获取现场模板数据
    initTasks(ids) {
      if (this.$route.params.target == 0) {
        this.readFile(JSON.parse(getToken()), this.$route.params.ids);
        this.readFileEvent().then((res) => {
          this.enteringData(res, ids, this.$route.params.target);
        });
      } else {
        this.enteringData("", ids, this.$route.params.target);
      }
    },

    temporaryData() {
      this.$eventBus.$emit("temporaryData");
    },

    //查看配置记录
    lookConfig() {
      if (this.changeHasReviewData) {
        this.templateContent = this.changeHasReviewData.map(
          (item) => item.testProject
        );

        this.showConfigPage = true;
        setTimeout(() => {
          bus.$emit("changOnlyRead", this.changeHasReviewData, true);
        }, 50);
      } else {
        this.$notify({
          message: "没有该配置记录！",
          type: "warning",
        });
      }
    },

    showModuleOption() {
      bus.$emit("showModuleOption");
    },

    // 获取实验室模板数据
    initSamples() {
      for (let i = 0; i < this.labtemplate.length; i++) {
        this.sampleDatas.push({
          id: "",
          showing: [],
        });
      }
    },

    // 切换tab 选项卡
    switchTab(key) {
      if (this.target == 4) {
        let sampleNums = this.tasks[key].value.map((item) => item.sysSampleId);
        querySysSampleData(sampleNums).then((res) => {
          if (res.success) {
            store.dispatch("TemplateAction", "update");
            store.dispatch("ChangeHasReviewData", res);
            store.dispatch("UpdateLabTemplate", this.template);
          }
          res.samples.forEach((item) => {
            try {
              item.myBlankSample = JSON.parse(item.blankSampleArr);
            } catch (e) {
              item.myBlankSample = [];
            }
          });
          this.sampleDatas = [];
          this.initSamples();
          this.nowTask = this.tasks[key];
          this.currentTab = key;
          this.getTaskPerson();
          this.$store.dispatch("actionsTestingState", this.taskState[key]);
        });
      } else {
        this.nowTask = this.tasks[key];
        this.currentTab = key;
        this.getTaskPerson();
        this.$store.dispatch("actionsTestingState", this.taskState[key]);
      }
    },

    // 切换背景色显示
    setTabClore(key) {
      return key == this.currentTab ? "current-tab" : "";
    },

    getTaskPerson() {
      getAllMan(this.nowTask.id).then((res) => {
        if (res.success) {
          this.allPerson = res.data;
        } else {
          this.$notify({
            type: "warning",
            message: "查询该任务绑定人员失败！",
          });
        }
      });
    },
    // 返回录入列表页面
    back() {
      this.templateArr = [];
      if (this.target == 5 && !this.showSave) {
        this.$router.push("/laboratory/curve");
        return;
      }
      if (this.target == 3) {
        this.$router.push("/local/upload");
        return;
      }
      if (this.target == 2) {
        this.$router.push("/local/review");
        return;
      }
      if (this.target == 4) {
        let now = sessionStorage.getItem("analysis");
        if (now !== "已分析") {
          this.$router.push("/laboratory/upload");
        } else {
          this.$router.push("/laboratory/analysis");
        }
        return;
      }
      this.$confirm("确定退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let taskLen = this.taskDatas.length;
        let taskArr = [];
        let arr = {};
        let that = this;
        if (that.target == 1) {
          this.TemporaryStorage(true);

          return;
        }
        if (that.target == 2) {
          that.$router.push("/local/review");
          return;
        }
        if (that.target == 3) {
          that.$router.push("/local/upload");
          return;
        }
        if (that.target == 4) {
          if (this.nowAnalysis !== "已分析") {
            that.$router.push("/laboratory/upload");
            return;
          } else {
            that.$router.push("/laboratory/analysis");
            return;
          }
        }
        if (that.target == 5) {
          that.$router.push("/laboratory/curve");
          return;
        }
        arr = JSON.parse(JSON.stringify(this.importData));
        for (let i = 0; i < taskLen; i++) {
          this.taskDatas[i].showing.flat().forEach((item, index) => {
            this.templateArr.push(item.data.valueData);
          });
          arr.tasks.tasks[0].data = JSON.stringify(this.templateArr);
          this.readFile(JSON.parse(getToken()), "enteringList");
          this.readFileEvent().then((res) => {
            let arrList = JSON.parse(res);
            arrList.list.map((item) => {
              item.taskId == arr.taskId
                ? (item.data = JSON.stringify(this.templateArr))
                : "";
            });
            this.whrite(arrList, JSON.parse(getToken()));
          });
          this.whrite(arr, JSON.parse(getToken()));
          this.writeFileEvent().then((res) => {
            if (res) {
              if (that.target == 0) {
                that.entryStartTime = "";
                that.$router.push("/local/entering");
              }
            }
          });

          // taskArr.push(
          //   updateTaskData(
          //     this.taskDatas[i].id,
          //     JSON.stringify(this.templateArr)
          //   )
          // );
        }
        // let that = this;
        // return;
        // Promise.all(taskArr)
        //   .then(resultsArr => {
        //     console.log(resultsArr);
        //   })
        //   .catch(() => {});
      });
    },

    // 录入
    toEntry(result, id, staffName) {
      if (result) {
        this.entryId = id;
        this.staffName = staffName;
        getStaffImg_x(id).then((res) => {
          this.imgBase64 = res.staffImgs;
          this.taskDatas.forEach((item) => {
            this.uploadTemplate(item, 3);
          });
        });
      } else {
        this.$notify({
          message: "指纹匹配失败",
          type: "warning",
        });
      }
    },

    // 现场审核
    toReview(result, checkId, staffName) {
      this.staffName = staffName;
      if (result) {
        getStaffImg(checkId).then((res) => {
          this.imgBase64Two = res;
          this.showFingerprintTwo = false;
          this.taskDatas.forEach((item) => {
            this.toUpdateTaskData(item, 2);
          });
          this.$notify({
            type: "success",
            message: "审核成功",
          });
          this.$router.push("/local/review");
        });
        winUpdateTaskState(
          this.ids.toString(),
          2,
          checkId,
          false,
          this.reason,
          this.staffName,
          JSON.myParse(getToken()).id
        ).then((res) => {
          this.$notify({
            message: "审核成功",
            type: "success",
          });
          updateSampleStaffCheck(this.ids.toString(), checkId, 2).then(
            (response) => {
              if (response.success) {
                this.$notify({
                  message: response.msg,
                  duration: 1000,
                  type: "success",
                });
              } else {
                this.$notify({
                  message: response.msg,
                  duration: 1000,
                  type: error,
                });
              }
            }
          );
          this.showFingerprintTwo = false;
        });
      } else {
        this.$notify({
          message: "指纹匹配失败",
          type: "warning",
        });
      }
    },
    //实验室审核
    toShiYanReview(result, id) {
      let labPickSampleStaffId = JSON.myParse(getToken()).id;
      updateSampleStateFinger(
        this.ids.toString(),
        7,
        labPickSampleStaffId
      ).then((res) => {
        if (res.success) {
          this.$notify({
            type: "success",
            message: res.msg,
          });
        } else {
          this.$notify({
            type: "error",
            message: res.msg,
          });
        }
      });
      getStaffImg(id[0])
        .then((res) => {
          this.imgBase64 = res;
          this.showFingerprintFour = false;
          this.$router.push("/laboratory/upload");
        })
        .catch((error) => {
          console.log("进入了错误", error);
        });
    },

    //送审
    toSongshen(result, id) {
      let that = this;
      if (that.timerId) {
        clearInterval(that.timerId);
      }
      if (result) {
        getStaffImg(id[0]).then((res) => {
          this.imgBase64 = res;
          this.toUpdateSampleData(false, id[0]);
        });
      } else {
        this.$notify({
          message: "指纹匹配失败",
          duration: 1000,
          type: error,
        });
      }
    },
    longSignature() {
      generateMeasure(
        this.ids[0],
        this.$refs.templateHTML[0].$el.innerHTML
      ).then((res) => {
        this.signatureTimeDialog = false;
        this.copyText = encodeURI(
          this.hostUrl + "/signature?url=" + res.url + "&id=" + this.tasks[0].id
        );
        this.copyDialog = true;

        updateUnitGenerateTime(
          this.tasks[0].id,
          parseInt(1000 * 60 * 60 * this.unitInvalidDuration)
        ).then((response) => {
          if (response.success) {
            this.$message.success(
              `链接生成成功，有效时间 ${this.unitInvalidDuration} 小时`
            );
          } else {
            this.$message.error(response.msg);
          }
        });
      });
    },
    copy() {
      document.getElementById("copy").select();
      document.execCommand("Copy");
      this.$message.success("复制成功");
      this.copyDialog = false;
    },
    //上传
    toUpload(signature) {
      // return
      let flag = false;
      // 点位图
      let result = this.tasks.some((item) => {
        if (item.deviceMainId == 4) {
          return false;
        } else {
          return item.pointUrl;
        }
      });
      // 签名
      let result2 = this.tasks.some((item) => item.unitUrl);
      // console.log(result, result2);
      this.tasks.forEach((item) => {
        // isDocImg   0是报告不需要图，1是报告需要图，2是报告需要现场上传的图
        item.isDocImg ? (flag = true) : "";
      });
      if (!result2) {
        this.$message.warning("请上传受检单位签名照");
        return;
      }
      if (flag) {
        if (!result) {
          this.$message.warning("请上传点位图");
          return;
        }
      }
      let uploadStaffId = JSON.myParse(getToken()).id;
      generateMeasure(
        this.ids[0],
        this.$refs.templateHTML[0].$el.innerHTML
      ).then((response) => {
        updateTaskUpload(this.ids.toString(), uploadStaffId).then(
          (response) => {
            if (response.success) {
              this.$notify({
                type: "success",
                message: response.msg,
              });
              // 平台打回的历史记录
              if (this.tasks[0].docPass == 1) {
                this.readFile(JSON.parse(getToken()), "noPass");
                this.readFileEvent().then((reson) => {
                  let noPass = JSON.parse(reson);
                  if (noPass) {
                    noPass.list.forEach((item, index) => {
                      if (item.taskId == this.ids[0]) {
                        noPass.list.splice(index, 1);
                      }
                    });
                    let dataList = {
                      taskId: "noPass",
                      list: noPass.list,
                    };
                    this.whrite(dataList, JSON.parse(getToken()));
                  }
                });
              }

              this.delFile(JSON.parse(getToken()), this.ids.toString());
              this.$router.push("/local/upload");
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          }
        );
      });

      this.showSignature = false;
      this.taskDatas.forEach((item) => {
        this.toUpdateTaskData(item, 1);
      });
    },

    //获取签名图片的formdata
    uploadImg(taskid, type, blob) {
      const formData = new FormData();
      formData.append("taskId", taskid);
      formData.append("type", type);
      formData.append("file", blob);
      return formData;
    },

    //上传现场数据模板
    uploadTemplate(tasktemp, flag) {
      let showing = tasktemp.showing;
      this.templateArr = [];
      showing.forEach((item) => {
        item.forEach((a) => {
          if (a.to == "project_ct_cjcgpc") {
            a.data.valueData.remark = "";
            let remark = [];
            let point = a.data.valueData.point;
            let s1 = point.filter((b) => b.scope == "s<1").length;
            let s2 = point.filter((b) => b.scope == "2mm≥s≥1m").length;
            let s3 = point.filter((b) => b.scope == "s＞2mm").length;
            s1 == 0 && remark.push(" 无 s<1 的层厚范围 ");
            s2 == 0 && remark.push(" 无 2mm≥s≥1m 的层厚范围 ");
            s3 == 0 && remark.push(" 无 s＞2mm 的层厚范围 ");
            a.data.valueData.remark = remark.join(",");
          }
          if (a.data.height._normal.carried === true) {
            if (a.data.isHead) {
              //签名存在头模块里面
              a.data.valueData.delRowReasonArr = this.delRowReasonArr;
              a.data.valueData.deleteArr = this.deleteArr;
              if (flag == 2) {
                a.data.valueData.imgBase64Two = this.imgBase64Two;
              } else if (flag == 1) {
              } else {
                a.data.valueData.imgBase64 = this.imgBase64;
              }
            }
            this.templateArr.push(a.data.valueData);
          }
        });
      });
      // 平台打回修改的历史记录
      if (this.tasks[0].docPass == 1) {
        let historyEdit = this.templateArr.filter(
          (item) => item.testProject == "historyEdit"
        );
        if (historyEdit.length == 0 && this.historyEdit.length) {
          this.templateArr.push({
            testProject: "historyEdit",
            data: this.historyEdit,
          });
        }
      }

      if (tasktemp.disWs == "4") {
        addGwCyTaskData(
          tasktemp.id,
          tasktemp.startTime,
          this.entryEndTime,
          JSON.stringify(this.templateArr)
        )
          .then((res) => {
            if (res.success) {
              this.readFile(JSON.parse(getToken()), "enteringList");
              this.readFileEvent().then((a) => {
                let arr = JSON.parse(a);
                arr.list.map((item, index) => {
                  item.taskId == tasktemp.id ? arr.list.splice(index, 1) : "";
                });
                this.whrite(arr, JSON.parse(getToken()));
              });
              this.$notify({
                message: res.msg,
                type: "success",
              });
              this.toChangeState();
            } else {
              this.$notify({
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((error) => {});
      } else {
        updateTask(
          tasktemp.id,
          tasktemp.startTime,
          this.entryEndTime,
          JSON.stringify(this.templateArr)
        )
          .then((res) => {
            if (res.success) {
              this.readFile(JSON.parse(getToken()), "enteringList");
              this.readFileEvent().then((a) => {
                let arr = JSON.parse(a);
                arr.list.map((item, index) => {
                  item.taskId == tasktemp.id ? arr.list.splice(index, 1) : "";
                });
                this.whrite(arr, JSON.parse(getToken()));
              });
              this.$notify({
                message: res.msg,
                type: "success",
              });
              this.toChangeState();
            } else {
              this.$notify({
                message: res.msg,
                type: "error",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    //实验室更新data数据
    toUpdateSampleData(isReview = false, id) {
      let valueDatas = [];
      this.sampleDatas.forEach((item) => {
        let showing = item.showing;
        if (this.imgBase64 != "" && isReview == false) {
          item.showing[0][0].data.valueData.shiYanJianCe = this.imgBase64;
        }
        if (this.imgBase64 != "" && isReview == true) {
          item.showing[0][0].data.valueData.shiShenHe = this.imgBase64;
        }
        showing.forEach((item) => {
          item.forEach((item, index) => {
            this.selectedResults.forEach((sel) => {
              item.data.valueData.checkBox2[sel.index] = sel.result;
            });
            this.selectedResults2.forEach((sel) => {
              item.data.valueData.checkBox[sel.index] = sel.result;
            });
            valueDatas.push(item.data.valueData); //遍历出sampleDatas中所有的valueData,放在valueDatas中
          });
        });
      });
      let result = this.checkMustWriter(valueDatas);
      if (!result) {
        this.$notify({
          message: "有必填项未填写",
          type: "warning",
        });
        return;
      }

      if (valueDatas[0].testProject == "project_systvoc") {
        valueDatas[0].point = [];

        valueDatas.forEach((item, index) => {
          if (index != 0) {
            valueDatas[0].point.push(item);
            valueDatas = valueDatas.slice(0, 1);
          }

          if (item.hasAll) {
            if (item.allPoint.length > 10) {
              item.sysReport =
                item.allPoint[item.allPoint.length - 2].sysReport;
              item.sysDifference =
                item.allPoint[item.allPoint.length - 2].sysDifference;
            } else {
              item.sysReport =
                item.allPoint[item.allPoint.length - 1].sysReport;
              item.sysDifference = "";
            }
          } else {
            item.sysReport = "";
            item.sysDifference = "";
          }
        });
      }
      // console.log("送审上传的模板数据", valueDatas);
      // console.log("序列化后", JSON.myParse(JSON.stringify(valueDatas)));
      updateSampleData(
        JSON.stringify(valueDatas),
        this.selectedCurve,
        this.curveArr,
        this.sysAtlasUrl
      )
        .then((res) => {
          if (res.success) {
            this.$notify({
              message: res.msg,
              type: "success",
            });
            let labPickSampleStaffId = JSON.myParse(getToken()).id;
            updateSampleStaff(this.ids.toString(), id, 1).then((res) => {
              if (res.success) {
                this.$notify({
                  message: res.msg,
                  duration: 1000,
                  type: "success",
                });
              } else {
                this.$notify({
                  message: res.msg,
                  duration: 1000,
                  type: error,
                });
              }
            });
            toSongShen(labPickSampleStaffId, this.ids.toString())
              .then((res) => {
                if (res.success) {
                  this.$notify({
                    message: res.msg,
                    duration: 1000,
                    type: "success",
                  });
                  this.showFingerprintThree = false;
                  this.$router.push("/laboratory/analysis");
                } else {
                  this.$notify({
                    message: res.msg,
                    duration: 1000,
                    type: error,
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.$notify({
              message: res.msg,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addRow(index) {
      this.solutionPreparationData.biaoZhunArr.splice(index + 1, 0, {});
    },

    //分析还原上次暂存数据
    reductionData() {
      bus.$emit("reductionData", this.$store.getters.analysisData);
    },

    showBook() {
      this.showBookValue = !this.showBookValue;
      bus.$emit("showBook", this.showBookValue);
    },

    delRow(index) {
      let length = this.solutionPreparationData.biaoZhunArr;
      if (length <= 0) {
        this.$notify({
          type: "warning",
          message: "没有可删除行",
        });
        return;
      }

      let id = this.solutionPreparationData.biaoZhunArr[index].id;
      let delIndex = this.solutionPreparationData.biaoZhunDownArr.findIndex(
        (item) => {
          return item.materialNameId == id;
        }
      );

      if (delIndex != -1) {
        this.solutionPreparationData.biaoZhunDownArr.splice(delIndex, 1);
      } else {
        console.log("没找到删除的id");
      }
      this.solutionPreparationData.biaoZhunArr.splice(index, 1);
    },

    //检查是否有必填项未填
    checkMustWriter(valueDatas) {
      let result = true;
      valueDatas.forEach((item) => {
        let mustWrite = item.mustWrite;
        if (mustWrite) {
          mustWrite.forEach((fieldName) => {
            if (item.hasOwnProperty(fieldName)) {
              if (item[fieldName] === "" || item[fieldName] === null) {
                result = false;
              } else if (
                [fieldName] instanceof Array &&
                item[fieldName].length <= 0
              ) {
                result = false;
              }
            } else if (item["point"][0].hasOwnProperty(fieldName)) {
              item["point"].forEach((item) => {
                if (item[fieldName] === "" || item[fieldName] === null) {
                  result = false;
                } else if (
                  [fieldName] instanceof Array &&
                  item[fieldName].length <= 0
                ) {
                  result = false;
                }
              });
            }
          });
        }
      });
      return result;
    },

    addRowTemplateDwon(index) {
      this.solutionPreparationData.biaoZhunDownArr.splice(index + 1, 0, {
        materialName: "",
      });
    },

    delRowTemplateDown(index) {
      let length = this.solutionPreparationData.biaoZhunDownArr.length;
      if (length <= 0) {
        this.$notify({
          type: "warning",
          message: "没有可删除行",
        });
        return;
      }
      let id = this.solutionPreparationData.biaoZhunDownArr[index]
        .materialNameId;

      let delIndex = this.solutionPreparationData.biaoZhunArr.findIndex(
        (item) => {
          return item.id == id;
        }
      );
      if (delIndex != -1) {
        this.$notify({
          type: "warning",
          message: "该行为自动生成,无法删除!",
        });
      } else {
        this.solutionPreparationData.biaoZhunDownArr.splice(index, 1);
      }
    },

    selectChange(arr) {
      let name = arr[0];
      let index = arr[1];
      let materialList = this.solutionPreparationData.materialList;
      let selectedMater = "";
      materialList.forEach((item) => {
        if (item.id == name) {
          item = JSON.myParse(JSON.stringify(item));
          selectedMater = item;
        }
      });
      if (selectedMater == "") {
        return;
      }
      this.solutionPreparationData.biaoZhunArr[index] = selectedMater;
      if (this.solutionPreparationData.biaoZhunDownArr.length - 1 < index) {
        index = this.solutionPreparationData.biaoZhunDownArr.length;
      }
      if (
        this.solutionPreparationData.biaoZhunDownArr[index] &&
        this.solutionPreparationData.biaoZhunDownArr[index].materialNameId &&
        this.solutionPreparationData.biaoZhunDownArr[index].materialNameId ==
          selectedMater.id
      ) {
        return;
      }
      this.solutionPreparationData.biaoZhunDownArr[index] = {
        materialName: selectedMater.materialName,
        materialNameId: selectedMater.id,
      };
    },

    entryYuanShi() {
      let jsonString = this.$refs["curveTemplate"].jsonString;
      let valueData = jsonString.map((item) => item.data.valueData);
      let labPickSampleStaffId = JSON.myParse(getToken()).id;
      if (this.$route.query.isEdit === "true") {
        if (this.$route.query.copy) {
          this.copyCurve(
            labPickSampleStaffId,
            this.$route.query.solutionId,
            valueData
          );
        } else {
          let solutionId = this.$route.query.solutionId;
          updateSolution(
            labPickSampleStaffId,
            JSON.stringify(valueData),
            solutionId
          ).then((res) => {
            if (res.success) {
              this.$notify({
                type: "success",
                message: res.msg,
              });
              this.$router.push("/laboratory/curve");
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          });
        }
      } else {
        this.updateCurve(labPickSampleStaffId, valueData);
      }
    },

    updateCurve(labPickSampleStaffId, valueData) {
      updateCurveSolutionPreparationData(
        labPickSampleStaffId,
        JSON.stringify(valueData)
      ).then((res) => {
        if (res.success) {
          this.$notify({
            type: "success",
            message: res.msg,
          });
          this.$router.push("/laboratory/curve");
        } else {
          this.$notify({
            type: "error",
            message: res.msg,
          });
        }
      });
    },

    copyCurve(labPickSampleStaffId, beCopySolutionId, valueData) {
      copySolution(
        labPickSampleStaffId,
        beCopySolutionId,
        JSON.stringify(valueData)
      ).then((res) => {
        if (res.success) {
          this.$notify({
            type: "success",
            message: res.msg,
          });
          this.$router.push("/laboratory/curve");
        } else {
          this.$notify({
            type: "error",
            message: res.msg,
          });
        }
      });
    },

    //暂存数据
    TemporaryStorage(isbut = false, isReview) {
      let valueDatas = [];
      this.sampleDatas.forEach((item) => {
        let showing = item.showing;
        if (this.imgBase64 != "" && isReview == false) {
          item.showing[0][0].data.valueData.shiYanJianCe = this.imgBase64;
        }
        if (this.imgBase64 != "" && isReview == true) {
          item.showing[0][0].data.valueData.shiShenHe = this.imgBase64;
        }
        showing.forEach((item) => {
          item.forEach((item, index) => {
            this.selectedResults.forEach((sel) => {
              item.data.valueData.checkBox2[sel.index] = sel.result;
            });
            this.selectedResults2.forEach((sel) => {
              item.data.valueData.checkBox[sel.index] = sel.result;
            });
            valueDatas.push(item.data.valueData); //遍历出sampleDatas中所有的valueData,放在valueDatas中
          });
        });
      });
      if (valueDatas.length <= 0) {
        return;
      }
      if (valueDatas[0].testProject == "project_systvoc") {
        valueDatas[0].point = [];

        valueDatas.forEach((item, index) => {
          if (index != 0) {
            valueDatas[0].point.push(item);
            valueDatas = valueDatas.slice(0, 1);
          }

          if (item.hasAll) {
            if (item.allPoint.length > 10) {
              item.sysReport =
                item.allPoint[item.allPoint.length - 2].sysReport;
              item.sysDifference =
                item.allPoint[item.allPoint.length - 2].sysDifference;
            } else {
              item.sysReport =
                item.allPoint[item.allPoint.length - 1].sysReport;
              item.sysDifference = "";
            }
          } else {
            item.sysReport = "";
            item.sysDifference = "";
          }
        });
      }
      toTemporaryStorageSampleData(JSON.stringify(valueDatas))
        .then((res) => {
          if (res.success) {
            if (isbut) {
              this.$router.push("/laboratory/analysis");
            }
            this.$notify({
              type: "success",
              message: res.msg,
            });
          } else {
            this.$notify({
              type: "warning",
              message: res.msg,
            });
          }
        })
        .catch((error) => {});
    },

    toSelectedBox(item) {
      if (item.isCheckBox) {
        this.selectedResults2.push(item);
      } else {
        this.selectedResults.push(item);
      }
    },

    toSelectedCurve(item) {
      this.selectedCurve = item;
    },
    changeAllFeng(data, boolean) {
      this.AllFeng = data;
      this.AllFengFlag.flag = boolean;
    },
    reviewBack() {
      this.$prompt("请输入不通过原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        modal: false,
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "请填写原因",
        inputType: "textarea",
      })
        .then(({ value }) => {
          let reason = value;
          let labPickSampleStaffId = JSON.myParse(getToken()).id;
          updateSampleStateFinger(
            this.ids.toString(),
            6,
            labPickSampleStaffId,
            reason
          ).then((res) => {
            if (res.success) {
              this.$notify({
                type: "success",
                message: res.msg,
              });
              this.$router.push("/laboratory/upload");
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {});
    },

    toCheckBox(resultObj) {
      let isCheckBox = resultObj.isCheckBox;
      let index = resultObj.index;
      let result = resultObj.result;
      this.solutionPreparationData.checkBoxArr[index] = result;
    },

    toShowSongShen() {
      let meetTime = [];
      this.labtemplate.forEach((item, index) => {
        item.value.forEach((val, num) => {
          if (val.labPickSampleTime) {
            let date = new Date(val.labPickSampleTime.replace("-", "/"));
            meetTime.push(date.getTime());
          }
        });
      });
      let sysTestingTime = this.sampleDatas[0].showing[0][0].data.valueData.sysTestingTime.replace(
        "-",
        "/"
      );
      let sysTestingEndTime = this.sampleDatas[0].showing[0][0].data.valueData.sysTestingEndTime.replace(
        "-",
        "/"
      );
      if (sysTestingTime) {
        if (Math.max(...meetTime) < new Date(sysTestingTime).getTime()) {
          if (
            new Date(sysTestingTime).getTime() <
            new Date(sysTestingEndTime).getTime()
          ) {
            let allow = [
              "project_sysjq",
              "project_sysben_two",
              "project_systvoc",
            ];
            let modelName = this.labtemplate[0].modelName;
            let index = allow.findIndex((item) => item === modelName);
            if (this.AllFengFlag.flag) {
              if (!this.AllFeng) {
                this.$notify({
                  type: "warning",
                  message: "请填写空白峰面积",
                });
                return;
              }
            }
            if (!this.selectedCurve && index != -1) {
              this.$notify({
                type: "warning",
                message: "请选择曲线",
              });
              return;
            }
            this.showFingerprintThree = true;
          } else {
            this.$notify({
              type: "error",
              message: "结束时间必须大于开始时间",
            });
          }
        } else {
          let date = new Date(Math.max(...meetTime));
          let Y = date.getFullYear() + "-";
          let M =
            (date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1) + "-";
          let D = date.getDate() + " ";
          let h = date.getHours() + ":";
          let m = date.getMinutes() + ":";
          let s = date.getSeconds();
          this.$notify({
            type: "error",
            message: "开始时间需大于接样时间 " + Y + M + D + h + m + s,
          });
        }
      } else {
        this.$notify({
          type: "error",
          message: "请选择检测时间",
        });
      }
    },

    toNoPass(result, id, staffName) {
      this.staffName = staffName;
      if (result) {
        this.checkId = id;
        this.showFingerprintNopass = false;
        this.notPassedBox = true;
      }
    },

    decideNoPass() {
      if (!this.reason) {
        this.$message.warning("请输入原因");
        return;
      }
      winUpdateTaskState(
        this.ids.toString(),
        1,
        this.checkId[0],
        false,
        this.reason,
        this.staffName[0],
        JSON.myParse(getToken()).id
      ).then((res) => {
        if (res.success) {
          this.$notify({
            type: "success",
            message: res.msg,
          });
          this.notPassedBox = false;

          if (this.target == 2) {
            this.$router.push("/local/review");
          } else {
            this.$router.push("/local/upload");
          }
        } else {
          this.$notify({
            type: "error",
            message: res.msg,
          });
        }
      });
    },

    getChangeMyCurve(curveArr) {
      this.curveArr = JSON.stringify(curveArr);
    },

    //现场更新签名
    toUpdateTaskData(tasktemp, flag) {
      let showing = tasktemp.showing;
      this.templateArr = [];
      showing.forEach((item) => {
        item.forEach((item) => {
          if (item.data.isHead) {
            if (flag == 2) {
              item.data.valueData.imgBase64Two = this.imgBase64Two;
            } else if (flag == 1) {
            } else {
              item.data.valueData.imgBase64 = this.imgBase64;
            }
          }
          this.templateArr.push(item.data.valueData);
        });
      });
      updateTaskData(tasktemp.id, JSON.stringify(this.templateArr))
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    },

    toChangeState() {
      winUpdateTaskState(
        this.ids.toString(),
        0,
        this.entryId,
        true,
        this.reason,
        this.staffName,
        JSON.myParse(getToken()).id
      )
        .then((res) => {
          this.showFingerprint = false;
          this.$router.push("/local/entering");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.isSelect = sessionStorage.getItem("isSelect");
    this.nowAnalysis = sessionStorage.getItem("analysis");

    let _this = this;

    // console.log('实验室选择的样品吧：', this.labtemplate)

    _this.target = this.$route.params.target;
    /* 0 2 3 属于现场 */
    if (_this.target == 0 || _this.target == 2 || _this.target == 3) {
      if (this.$route.params.ids) {
        _this.ids = this.$route.params.ids.split(",");
        // 获取任务数据
        _this.initTasks(_this.ids);
      }
      // 给tab 选项卡赋值
      _this.tabArray = _this.tasks;
    }

    /* 1 属于实验室分析 */
    if (_this.target == 1) {
      this.checkTime = _dateFormat("now", "Y-M-D h:m:s");
      let labtemplate = this.labtemplate;
      for (let i = 0; i < labtemplate.length; i++) {
        _this.samples = _this.samples.concat(labtemplate[i].value);
      }
      _this.initSamples();
      this.ids = _this.samples.map((item) => item.id);
      // 给tab 选项卡赋值
      _this.tabArray = _this.labtemplate;

      getMan(2)
        .then((res) => {
          this.allPerson = res.data;
        })
        .catch((error) => {
          console.log(error);
        });

      /*有些检测项目数据是仪器导入的, 不需要暂存*/
      let modelName = labtemplate[0].modelName;
      let forbidArr = [
        "project_systvoc",
        "project_sysben",
        "project_sysben_two",
      ];
      let index = forbidArr.findIndex((item) => item === modelName);
      if (index === -1 && window.location.href.indexOf("localhost") === -1) {
        this.timerId = setInterval(() => {
          _this.TemporaryStorage();
        }, 10000);
      }
    }

    /* 实验室审核 */
    if (_this.target == 4) {
      let labtemplate = this.labtemplate;
      for (let i = 0; i < labtemplate.length; i++) {
        _this.samples = _this.samples.concat(labtemplate[i].value);
      }

      _this.initSamples();
      getMan(2)
        .then((res) => {
          this.allPerson = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.ids = _this.samples.map((item) => item.id);
      _this.tabArray = _this.labtemplate;
      this.tasks = this.tabArray;
    }

    if (_this.target == 5) {
      this.templateContent = JSON.myParse(
        sessionStorage.getItem("templateContent")
      );
    }
  },

  computed: {
    tempalteAction() {
      let action = this.$store.state.app.templateAction;
      if (action == "update") {
        this.android = "hide";
      } else {
        this.android = "show";
      }
      return action;
    },
    labtemplate() {
      if (this.$store.state.laboratory.labtemplate) {
        sessionStorage.setItem(
          "labtemplate",
          JSON.stringify(this.$store.state.laboratory.labtemplate)
        );
        return this.$store.state.laboratory.labtemplate;
      } else {
        return JSON.parse(sessionStorage.getItem("labtemplate"));
      }
    },

    showSave() {
      return this.$route.query.solutionPass === "1" ? false : true;
    },

    changeHasReviewData() {
      if (this.$store.getters.hasReviewData.solutionPreparationData) {
        return JSON.myParse(
          this.$store.getters.hasReviewData.solutionPreparationData
        );
      } else {
        return;
      }
    },
  },

  mounted() {
    // if (window.history && window.history.pushState) {
    //   // 向历史记录中插入了当前页
    //   history.pushState(null, null, document.URL);
    //   window.addEventListener("popstate", this.goBack, false);
    // }
    bus.$on("getReason", (data) => {
      this.delRowReason = true;
      this.delRowReasonArr.push(data);
    });
    bus.$on("showSave", (data) => {
      this.showSaveLog = data;
    });
    bus.$on("getDeleteArr", (data) => {
      this.deleteArr = data;
    });
    bus.$on("getTuPuUrl", (val) => {
      this.sysAtlasUrl = val;
    });
  },

  destroyed() {
    let that = this;
    if (that.timerId) {
      clearInterval(that.timerId);
    }
    // window.removeEventListener("popstate", this.goBack, false);
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.floatMybar {
  position: fixed;
  right: 10px;
  z-index: 1000;
}
.btnFile {
  height: 50px;
  width: 100%;
  overflow: hidden;
  position: relative;
  .inputFile,
  .btn {
    position: absolute;
    left: 0;
  }
  .inputFile {
    z-index: 2;
    width: 80px;
    height: 40px;
    filter: alpha(opacity=0); /* IE */
    -moz-opacity: 0; /* 老版Mozilla */
    -khtml-opacity: 0; /* 老版Safari */
    opacity: 0; /* 支持opacity的浏览器*/
  }
  .btn {
    z-index: 1;
    width: 80px;
    height: 40px;
    color: #fff;
    line-height: 40px;
    border-radius: 5px;
    background: #409eff;
    cursor: pointer;
  }
}

.entering {
  &-container {
    margin: 1.2%;
    margin-top: 0;

    .task-tabs {
      padding: 0 12%;
      width: 100%;
      text-align: left;
      margin-bottom: 20px;

      .tab {
        display: inline-block;
        width: 100px;
        background-color: #545c64;
        color: #fff;
        border: 1px solid #fff;
        line-height: 2.3;
        text-align: center;
        cursor: pointer;
      }

      .current-tab {
        background: black;
        color: burlywood;
      }
    }
  }
}
</style>
