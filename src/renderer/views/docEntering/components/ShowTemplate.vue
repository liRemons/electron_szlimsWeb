<template>
  <div
    id="showTemplateBox"
    class="showTemplateBox"
    :class="ipdTemplate == 'ipdTemplate' ? 'box_warpper' : ''"
  >
    <div class="contents" v-if="showBookValue" style="background: transparent">
      <span class="closeContent" @click="showBookValue = false">X</span>
      <p
        v-for="(item, index) in aObjects"
        :key="index"
        style="padding-bottom: 10px; padding-left: 20px"
      >
        {{ index + 1 }}、
        <a
          :href="'#' + item.id"
          @click="aObjectsIndex = index"
          :style="aObjectsIndex === index ? { color: 'red' } : {}"
          style="text-decoration: none"
          >{{ item.name }}</a
        >
      </p>
    </div>

    <div
      class="contents2"
      v-if="showModuleOption"
      style="padding-left: 20px; background: transparent"
    >
      <span class="closeContent" @click="showModuleOption = false">X</span>
      <div
        v-for="(item, index) in testContentArray"
        :key="index"
        style="margin-bottom: 20px"
      >
        <el-checkbox
          v-model="control[index]"
          @change="changeModule(item, index)"
        >
          {{ item.testProjectChineseName }}
        </el-checkbox>
      </div>
    </div>

    <div v-if="pageBox" :id="getId(taskData.showing[0][0].data.switch)">
      <!-- 打印区域 -->
      <div class="filler _noprint"></div>
      <!-- 间隔 -->

      <div
        v-for="(pageDataArray, pageNumber) in taskData.showing"
        :key="pageNumber + 'taskDataShowing'"
      >
        <div
          style="margin: 0 auto"
          v-if="pageDataArray.length > 0"
          :class="{
            page: !pageDataArray[0].data.switch,
            page2: pageDataArray[0].data.switch,
            _print: true,
            ableInput: ableInput,
          }"
        >
          <!-- 真打印区域 -->
          <div class="pageHead">文件编号 : {{ fileNumber }}</div>
          <div class="pageCode">
            第 {{ pageNumber + 1 }} 页 / 共 {{ taskData.showing.length }} 页
          </div>
          <div class="hr_top" v-show="!pageDataArray[0].data.isHead"></div>

          <div
            :class="{
              mainContentBox: !pageDataArray[0].data.switch,
              mainContentBox2: pageDataArray[0].data.switch,
              mainContentBox_debug: debug,
            }"
          >
            <!-- 正文总高度: 700px -->
            <!-- ableInput-->
            <div
              v-for="(moduleJson, index) in pageDataArray"
              :key="index + 'pageDataArray'"
            >
              <div v-if="findFirstXn(moduleJson)" style="margin-top: 10px">
                3.2、性能检测结果
              </div>
              <div v-if="componentFlag">
                <component
                  :is="moduleJson.to"
                  :id="moduleJson.data.valueData.positionId"
                  :data="moduleJson.data"
                  v-if="moduleJson.data.height._normal.carried"
                  :pageNumber="pageNumber"
                  :thisPageIndex="index"
                  :jsonString="jsonString"
                  :target="target"
                  :deviceData="moduleJson.data.valueData.deviceData"
                  :deviceData2="moduleJson.data.valueData.deviceData2"
                  :task="task"
                  :showing="taskData.showing"
                  :watchSign="watchSign"
                  :isTemplate="isTemplate"
                  :ableInput="ableInput"
                  :auxiliaryArr="auxiliaryArr"
                  :mainArr="mainArr"
                  :headInput="headInput"
                  :key="moduleJson.id"
                  :ipdTemplate="ipdTemplate"
                  :purposeDetection="purposeDetection"
                  @restart="Reset"
                  @deleteSample="deleteSample"
                  @redefinition="redefinition"
                  @refre="showExample"
                  @changeJson="changeJson"
                  :importData="importData"
                  :btnFlag="btnFlag"
                ></component>
              </div>
            </div>
            <!----------------------------------------------------- 正文区域 --------------------------------------------------- -->
          </div>

          <div class="pageFoot_1">
            检测 :
            <div :class="{ nameContainer1: true, mainContentBox_debug: debug }">
              <div
                style="display: inline-block"
                v-if="
                  taskData.showing[0][0]['data']['valueData'][
                    'imgBase64'
                  ] instanceof Array
                "
              >
                <img
                  class="jianceImg"
                  :key="item + index"
                  v-for="(item, index) in taskData.showing[0][0]['data'][
                    'valueData'
                  ]['imgBase64']"
                  :src="item"
                />
              </div>
              <div style="display: inline-block" v-else>
                <img
                  class="jianceImg"
                  :src="
                    taskData.showing[0][0]['data']['valueData']['imgBase64']
                  "
                  alt
                />
              </div>
            </div>
          </div>

          <!-- 检测签名图片容器 -->
          <div class="pageFoot_2">
            复核 :
            <div :class="{ nameContainer2: true, mainContentBox_debug: debug }">
              <img
                class="jianceImg"
                :src="
                  taskData.showing[0][0]['data']['valueData']['imgBase64Two']
                "
                alt
              />
            </div>
          </div>
          <!-- 复核签名图片容器 -->
          <div class="pageFoot_3">
            受检单位(签字) :
            <div :class="{ nameContainer3: true, mainContentBox_debug: debug }">
              <img
                v-if="
                  taskData.showing[0][0]['data']['valueData']['imgBase64Three']
                "
                class="jianceImg"
                :src="
                  taskData.showing[0][0]['data']['valueData']['imgBase64Three']
                "
                alt
              />
            </div>
          </div>

          <!-- 受检单位签名图片容器 -->
          <div class="pageFoot_4">{{ time }}</div>
        </div>

        <div class="filler _noprint"></div>
        <!-- 间隔 -->
      </div>
    </div>

    <el-dialog
      :modal="false"
      title="请输入删除原因"
      @close="cancelDeleteTestProject"
      :visible.sync="testProjectMsgBox"
    >
      <el-input
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 20 }"
        placeholder="请输入删除原因"
        v-model="reasonMsg"
      ></el-input>
      <el-row>
        <div class="btnBox">
          <el-button @click="cancelDeleteTestProject">取消</el-button>
          <el-button @click="changeTestProject" type="primary">确认</el-button>
        </div>
      </el-row>
    </el-dialog>
    <div class="anchor_dc" v-if="pointDCAnchorArr.length">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="点位" name="1">
          <div
            class="tc"
            style="margin-top: 5px"
            v-for="item in pointDCAnchorArr"
          >
            <el-tag type="success">
              <a :href="'#point' + item.split('#')[0]">{{ item }}</a></el-tag
            >
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import Methods from "../methods.js"; //  尼玛 babel版本太低, 无法解析 import {Adaptive, dataRefresh} from './methods.js'
let { Adaptive } = Methods;
import { getToken } from "@/utils/auth";
import heads from "@/components/makemodule/thisData/dataJs/heads.js";
import modules from "@/components/makemodule/thisData/dataJs/modules.js";
import dcmodules from "@/components/makemodule/thisData/dataJs/sonModules/dc.js";
import bus from "@/utils/bus.js";
import { getInstrumentList } from "@/api/entering";
import {
  updateTaskData,
  fsUpdateTaskData,
  querySampleNum,
  addSampleNumDelete,
} from "@/api/local";
import { mapState } from "vuex";
export default {
  data() {
    return {
      purposeDetection: "",
      pointDCAnchorArr: [],
      time: "",
      activeNames: [],
      heads,
      pageBox: false,
      staffId: "",
      btnFlag: true,
      modules,
      aObjectsIndex: "",
      testProjectMsgBox: false,
      ipdTemplate: "ipdTemplate",
      ipdEdit: "ipdEdit",
      deleteObj: "",
      showing: [],
      testArr: [],
      numObj: "",
      deviceData: [],
      componentFlag: false,
      oldTestArr: [],
      oldTestArr2: [],
      delRowReasonArr: [],
      jsonString: [],
      showBookValue: false,
      showModuleOption: false,
      timeId: "",
      nowYear: "",
      timeId2: "",
      auxiliaryArr: [],
      testContentArray: [],
      control: [],
      isDelete: false,
      testProjectArray: [],
      reasonMsg: "", //删除原因
      mainArr: [],
      aObjects: [],
      fileNumber: "SZRD/LY424-01", //文件编号
      todayDate: _dateFormat("now", "Y年M月D日  h时m分"), //当前日期
      debug: false, //是否开启页面主要区域背景色调试, 如果开启, 则将页面主要区域的背景色变成灰色(原来是白色), 方便调试
      isTemplate: false, //是否是实例页面(实例页面背景颜色不是白色)
      headInput: false, //头表格是否可以被输入
      ableInput: false, //表格是否可以被输入
      watchSign: {
        //被监听标记, 在app页面监听'watchSign'的值, 当其变化时, 执行重渲染
        _high: 0,
        _short: 0,
        _up: 0,
        _down: 0,
        _delete: 0,
      },
      refre: false,
      reasonMsgArr: [],
      contentArray: [],
      SampleNumJudge: true,
      requestNo: 0,
      docPass: 0,
      pointUrl: "",
    };
  },
  props: {
    task: Object,
    taskData: Object,
    android: String,
    imgBase64: String,
    imgBase64Two: String,
    target: String,
    importData: Object,
    unitUrl: Array,
    unitTime: String,
  },
  methods: {
    classification(data) {
      let idArr = [];
      data.data.valueData.point.forEach((item, index) => {
        if (item.heBingId !== "") {
          idArr.push(item.heBingId);
        }
      });

      let setIdArr = Array.from(new Set(idArr));
      let emptyArr = new Array(setIdArr.length).fill([]);

      setIdArr.forEach((item, index) => {
        emptyArr[index] = data.data.valueData.point.filter(
          (val, num) => val.heBingId === item
        );
      });
      data.data.valueData.point = emptyArr.flat();
      return data;
    },
    redefinition(needPorjectName) {
      let redefinitionArr = [];
      let detectionObjects;
      if (this.jsonString.filter((item) => item.to == "project_jbxx").length) {
        detectionObjects = this.jsonString.filter(
          (item) => item.to == "project_jbxx"
        )[0].data.valueData.detectionObjects;
      }

      let NumberOfDetectors;
      let createdDetector = [];
      // 当 DR 探测器数量 选择 2 时，以下项目为2个---- START-------------------------------
      let createdDetectorName = [
        "project_dr_xhcttx", //信号传递特性（STP）
        "project_dr_kszs", //DR暗噪声
        "project_dr_tcqjlzs", //探测器剂量指示（DDI）
        "project_dr_xyjyx", //响应均匀性
        "project_dr_cjwc", //测距误差
        "project_dr_aeclmd", //AEC灵敏度
        "project_dr_aecdlszjyzx", //AEC电离室之间一致性
        "project_dr_aecgdyzjyzx", //AEC管电压之间一致性
        "project_dr_ddbdxjjc", //DR低对比度细节检测
        "project_dr_cy", //DR残影
        "project_dr_wy", //DR伪影
        "project_dr_jxkjfbl", //极限空间分辨力
      ];
      this.jsonString.forEach((val, index) => {
        if (val.to == "project_dr_tcq") {
          NumberOfDetectors = Number(val.data.valueData.NumberOfDetectors);
        }
        if (createdDetectorName.includes(val.to)) {
          if (detectionObjects == "乳腺DR" && val.to == "project_dr_jxkjfbl") {
          } else {
            createdDetector.push({
              [val.to]: this.deepCopy(val),
              index: index + 1,
              title: "探测器2",
              drIdNum2: val.data.valueData.drIdNum2 + "create",
              testProject: val.to,
            });
          }
        }
        this.$set(val.data.valueData, "NumberOfDetectors", NumberOfDetectors);
      });
      if (NumberOfDetectors == 2) {
        let obj = {};
        let peon = createdDetector.reduce((cur, next) => {
          obj[next.testProject]
            ? ""
            : (obj[next.testProject] = true && cur.push(next));
          return cur;
        }, []); //设置cur默认类型为数组，并且初始值为空的数组
        createdDetector = peon;
        createdDetector.forEach((item) => {
          item[item.testProject].data.valueData.drIdNum2 = item.drIdNum2;
          item[item.testProject].data.valueData.title = item.title;
          item[item.testProject].data.valueData.del = true;
          if (
            this.jsonString.filter((a) => a.to == item.testProject).length < 2
          ) {
            this.jsonString.splice(
              this.jsonString.findIndex((a) => a.to == item.testProject) + 1,
              0,
              item[item.testProject]
            );
          }
        });
      } else {
        this.jsonString.forEach((item) => {
          if (
            createdDetectorName.includes(item.to) &&
            item.data.valueData.del
          ) {
            for (let key in item) {
              delete item[key];
            }
          }
        });
        this.jsonString = this.jsonString.filter(
          (value) => Object.keys(value).length !== 0
        );
      }
      // ---------------------------END----------------------------
      this.jsonString.forEach((item, index) => {
        let obj = {};
        let findIndex = redefinitionArr.findIndex((val) => {
          return (
            val.to === item.to &&
            val.data.valueData.multipleId === item.data.valueData.multipleId &&
            val.data.valueData.drIdNum2 === item.data.valueData.drIdNum2
          );
        });
        if (item.data.valueData.heBingJudge) {
          item.data.valueData.heBingChange = !item.data.valueData.heBingChange;
        }
        let classificationIndex = "";
        if (findIndex == -1) {
          obj = this.deepCopy(item);
          obj.data.height = this.jsonString[index].data.height;
          redefinitionArr.push(obj);
          classificationIndex = redefinitionArr.length - 1;
        } else {
          let point = this.deepCopy(item.data.valueData.point);

          redefinitionArr[findIndex].data.valueData.point = [
            ...redefinitionArr[findIndex].data.valueData.point,
            ...point,
          ];
          classificationIndex = findIndex;
        }
        if (item.data.valueData.hasOwnProperty("heBingChange")) {
          redefinitionArr[classificationIndex] = this.classification(
            redefinitionArr[classificationIndex]
          );
        }
      });

      let decompose = [];
      let height = redefinitionArr[0].data.switch ? 1010 : 670;
      redefinitionArr.forEach((item, index) => {
        let projcet = {
          to: item.to,
          type: null,
          data: this.deepCopy(item.data),
        };

        let surplusPoint = [];
        projcet.data.valueData.point = [];
        let point = [];
        if (needPorjectName != "" && needPorjectName === item.to) {
          let arr = [...item.data.valueData.point];
          let result = false;
          if (arr.length > 0) {
            let firstRow = item.data.valueData.point[0].rows;
            let keys = Object.keys(firstRow);
            keys.forEach((key) => {
              if (firstRow[key] !== "") {
                result = true;
              } //如果第一行有一列有数据
            });
          }
          if (result && arr.length >= 1) {
            for (let i = 0; i < this.syntheticData.length; i++) {
              let nowRows = this.syntheticData[i].rows;
              let myId = nowRows[nowRows.length - 1];
              let index = arr.findIndex((v) => {
                return v.rows[v.rows.length - 1] === myId;
              });
              if (
                index !== -1 &&
                this.syntheticData[i].rows[0] === arr[index].rows[0]
              ) {
                this.syntheticData[i] = arr[index];
              }
            }
            point =
              this.syntheticData.length > 0
                ? this.syntheticData
                : [{ rows: [] }];
          } else {
            point = this.syntheticData;
          }
        } else {
          point = item.data.valueData.point;
        }
        point.forEach((po, i) => {
          if (po !== "") {
            po.index = i + 1;
            if (item.to === "project_dc_dchjcl") {
              po.rows[0] = i + 1 + "#";
            }
            if (item.to === "project_dc_gpjcjg") {
              po.pointNum = i + 1 + "#";
            }
          }
        });
        let lastProject = Adaptive(decompose, height);
        let surplusHiehgt = 0;
        if (lastProject.length > 0) {
          lastProject[lastProject.length - 1].forEach((v, i) => {
            let num = 0;
            if (v.data.height._normal.confirm) {
              num = v.data.height._normal.carried
                ? v.data.height._normal.fixed
                : 0;
              v.data.setHeight = num;
            } else {
              num = v.data.height._normal.carried
                ? v.data.height._normal.value(v.data.valueData)
                : 0;
              v.data.setHeight = num;
            }
            surplusHiehgt += num;
          });
          surplusHiehgt = surplusHiehgt > 0 ? height - surplusHiehgt : height;
        } else {
          surplusHiehgt = height;
        }
        let itemHeight = 32;
        if (item.data.height._normal.hasOwnProperty("itemHeight")) {
          itemHeight = item.data.height._normal.itemHeight;
        }
        if (item.data.height._normal.confirm) {
          projcet.data.valueData.point = this.deepCopy(point);
          decompose.push(projcet);
          decompose[decompose.length - 1].data.height = item.data.height;
        } else if (
          surplusHiehgt >=
          projcet.data.height._normal.fixed + itemHeight
        ) {
          let several = Math.floor(
            (surplusHiehgt - projcet.data.height._normal.fixed) / itemHeight
          );
          if (several > 2) {
            several -= 2;
          }
          if (point.length > several) {
            projcet.data.valueData.point = this.deepCopy(
              point.slice(0, several)
            );
            decompose.push(projcet);
            decompose[decompose.length - 1].data.height = item.data.height;
            surplusPoint = this.deepCopy(point.slice(several));
            surplusPoint[0].multi = true;
            surplusPoint[0].multiIndex = several;
          } else {
            projcet.data.valueData.point = this.deepCopy(point);
            decompose.push(projcet);
            decompose[decompose.length - 1].data.height = item.data.height;
          }
        } else {
          surplusPoint = this.deepCopy(point);
        }
        let totalSubsidiary = Math.ceil(
          (height - projcet.data.height._normal.fixed) / itemHeight
        );
        if (totalSubsidiary > 2) {
          totalSubsidiary -= 2;
        }

        let fatherData = [];
        let sonData = [];
        if (surplusPoint.length) {
          surplusPoint.forEach((val, num) => {
            sonData.push(val);
            if (
              sonData.length == totalSubsidiary ||
              surplusPoint.length - 1 == num
            ) {
              fatherData.push(sonData);
              sonData = [];
            }
          });
        }
        if (fatherData.length) {
          fatherData.forEach((val, num) => {
            let projcetSubsidiary = this.deepCopy(projcet);
            projcetSubsidiary.data.valueData.point = this.deepCopy(val);
            decompose.push(projcetSubsidiary);
            decompose[decompose.length - 1].data.height = item.data.height;
          });
        }
      });
      this.jsonString = decompose;
      // 获取检测类型-------START
      let project_jbxxData = this.jsonString.find(
        (item) => item.to === "project_jbxx"
      );
      if (project_jbxxData) {
        this.purposeDetection = this.detectionType(
          project_jbxxData.data.valueData.purposeDetection
        );
      }

      // ----------------END
      // =================电磁点位跳转
      let pointDCAnchorArr = [];
      let dc_dchjcl = this.jsonString.filter(
        (item) => item.to === "project_dc_dchjcl"
      );
      pointDCAnchorArr = dc_dchjcl
        .map((item) => item.data.valueData.point)
        .filter((item) => item)
        .flat();
      this.pointDCAnchorArr = pointDCAnchorArr.map((item) => item.rows[0]);
      this.$forceUpdate();
      this.Reset();

      //给组件设置index
      // let templateArr = ['projcet_szwjcjlmknr', 'projcet_gzwyzwtgxdk', 'projcet_jfcsl', 'projcet_jcjg', 'projcet_szpbt', 'projcet_jflslxgzdqk', 'projcet_jgysnr', 'projcet_jcbnr'];
      // this.setPointIndex(templateArr);

      //索引
      setTimeout(() => {
        this.generateTestprojectId();
        this.getContents();
      }, 100);

      this.jsonString.forEach((item) => {
        if (this.target != 0 && item.data.toBeShow) {
          setTimeout(() => {
            item.data.height._normal.carried = true;
          }, 100);
        }
      });
    },
    success(msg) {
      this.$notify({
        title: "成功",
        message: msg,
        type: "success",
      });
    },

    err(msg) {
      this.$notify({
        title: "错误",
        message: msg,
      });
    },

    // 修改历史记录
    getHistoryInit() {
      this.$nextTick(() => {
        const dispalyNone = (className) => {
          document.querySelectorAll(`.${className}`).forEach((item) => {
            item.style.display = "none";
          });
        };
        if (this.docPass == 1) {
          let displayNoneArr = [
            "__functionBox",
            "leftBtn",
            "emptyBtn",
            "el-icon-arrow-down",
          ];
          setTimeout(() => {
            displayNoneArr.forEach((item) => {
              dispalyNone(item);
            });
          }, 500);

          this.readFile(JSON.parse(getToken()), "noPass");
          this.readFileEvent().then((reson) => {
            let noPass = JSON.parse(reson);
            noPass.list.forEach((item) => {
              if (item.taskId == this.task.id && !item.history) {
                item.history = this.getHistory();
              }
            });
            let dataList = {
              taskId: "noPass",
              list: noPass.list,
            };
            this.whrite(dataList, JSON.parse(getToken()));
          });
        }
      });
    },
    // 仪器查询    单位ID
    InstrumentQuery(taskId, subCompanyId) {
      if (this.$route.params.target == 0) {
        let res = this.importData.device;
        new Promise((resolve) => {
          resolve();
        }).then((r) => {
          dataInit(res, this);
        });
      } else {
        getInstrumentList(taskId, subCompanyId).then((res) => {
          dataInit(res, this);
        });
      }
      function dataInit(res, that) {
        if (res.success) {
          that.taskData.showing.flat().forEach((item) => {
            that.$set(
              item.data.valueData,
              "deviceData",
              that.$utils.removeArrRepeat(
                res.data.filter(
                  (a) => a.testProjectId == item.data.valueData.testProjectId
                ),
                "id"
              )
            );
            that.$set(
              item.data.valueData,
              "deviceData2",
              that.$utils.removeArrRepeat(res.data, "id")
            );
          });
          that.componentFlag = true;
          that.getHistoryInit();
          let data = res.data;
          let data_fz = res.data_fz;
          that.deviceData = data;
          for (let i = 0; i < data.length; i++) {
            let obj = {
              id: data[i].id,
              name: data[i].deviceName,
            };
            that.mainArr.push(obj);
          }
          for (let i = 0; i < data_fz.length; i++) {
            let obj = {
              id: data_fz[i].id,
              name: data_fz[i].deviceName,
            };
            that.auxiliaryArr.push(obj);
          }
        }
      }
    },
    // 显示这个示例
    showExample() {
      //0 不可修改 1 只能修改头数据 3可以修改所有数据
      this.pointUrl = this.task.pointUrl;

      this.InstrumentQuery(this.task.id, this.task.subCompanyId);
      this.pass = this.task.pass;
      this.docPass = this.task.docPass;
      this.taskData.disWs = this.task.deviceMainId;
      this.taskData.id = this.task.id;
      if (this.pass == 1 || this.pass == 3) {
        // 0是未审核，1是未通过，2是通过，3是未上传
        if (this.pass == 1 && this.docPass == 1) {
          if (this.android == "hide") {
            this.headInput = true;
            this.isTemplate = false;
            this.ableInput = false;
          } else {
            this.ipdEdit = "ipdEdit";
          }
        } else {
          if (this.android == "hide") {
            this.ableInput = true;
            this.headInput = true;
            this.isTemplate = false;
          } else {
            this.ipdEdit = "ipdEdit";
          }
        }
      }

      let projectLength = "";
      let projectData = "";
      let contentArray = [];
      this.$store.dispatch("actionsClear");
      if (this.task.data != null) {
        projectLength = JSON.myParse(this.task.data).length;
        projectData = JSON.myParse(this.task.data);
        let projcet_jgysnrPoint = [];
        let projcet_jcbnrPoint = [];
        let work, window, door, wall, building;
        projectData.forEach((item) => {
          if (item.testProject == "projcet_jgysnr") {
            projcet_jgysnrPoint.push(...item.point);
            window = projcet_jgysnrPoint.filter((a) => a.type == "window");
            work = projcet_jgysnrPoint.filter((a) => a.type == "work");
            door = projcet_jgysnrPoint.filter((a) => a.type == "door");
            wall = projcet_jgysnrPoint.filter((a) => a.type == "wall");
            building = projcet_jgysnrPoint.filter((a) => a.type == "building");
          } else if (item.testProject == "projcet_jcbnr") {
            projcet_jcbnrPoint.push(...item.point);
            window = projcet_jcbnrPoint.filter((a) => a.type == "window");
            work = projcet_jcbnrPoint.filter((a) => a.type == "work");
            door = projcet_jcbnrPoint.filter((a) => a.type == "door");
            wall = projcet_jcbnrPoint.filter((a) => a.type == "wall");
            building = projcet_jcbnrPoint.filter((a) => a.type == "building");
          }
          if (
            item.testProject == "projcet_jgysnr" ||
            item.testProject == "projcet_jcbnr"
          ) {
            work.length && this.$store.commit("saveWorkArr", work);
            window.length && this.$store.commit("saveWindowArr", window);
            door.length && this.$store.commit("saveDoorArr", door);
            wall.length && this.$store.commit("saveWallArr", wall);
            building.length && this.$store.commit("savebuildingArr", building);
          }
        });
        for (let i = 0; i < projectLength; i++) {
          contentArray.push(projectData[i].testProject);
        }
      } else {
        let arr = [
          "project_dc_dchjxpcl",
          "project_dc_dchjxpclbg",
          "project_dc_dctj",
          "project_dc_yysmc",
        ];
        contentArray = JSON.myParse(this.task.testProjectList).filter(
          (item) => !arr.includes(item.testProjectName)
        );
        contentArray.forEach((item, index) => {
          if (
            item.testProjectArr != null &&
            item.testProjectArr &&
            item.testProjectArr.length > 0 &&
            item.name !== "project_fs_fh"
          ) {
            let preservationArr = [];
            item.testProjectArr.forEach((val) => {
              if (!arr.includes(val.name)) {
                let newObj = Object.assign(this.deepCopy(item), val);
                preservationArr.push(newObj);
              }
            });
            contentArray.splice(index, 1, preservationArr);
          } else {
            item.name = item.testProjectName;
          }
        });
        contentArray = contentArray.flat();
        contentArray.splice(0, 0, { name: this.task.headTestProjectName });
        if (this.task.deviceMainId == 1) {
          contentArray.splice(0, 0, { name: "project_jbxx" });
          // contentArray.splice(2, 0, { name: "project_fh_bd" });
          let index = contentArray.findIndex(
            (item) => item.name === "project_fs_fh"
          );
          if (index !== -1) {
            let obj = this.deepCopy(contentArray[index]);
            let testProjectArr = contentArray[index].testProjectArr;
            contentArray.splice(index, 1);
            let index2 = index;
            testProjectArr.forEach((item) => {
              //给防护设置一个组名, 因为是一个检测项目
              item.groundName = "project_fs_fh";
              item.showName = "防护";
              if (
                item.name !== "project_jbxx" ||
                item.name !== "project_jcxcxx"
              ) {
                let newObj = Object.assign(this.deepCopy(obj), item);
                contentArray.splice(index2, 0, newObj);
                index2 += 1;
              }
            });
            index2 = 0;
          }
        }
        if (this.task.deviceMainId == 4) {
          contentArray = this.addBlankComponet(contentArray);
        }
        contentArray.push({ name: "project_deleteReason" });
        if (this.task.specifications === "工频") {
          let photoNameArr = [
            "点位示意图",
            "东侧围墙外5米",
            "南侧围墙外5米",
            "西侧围墙外5米",
            "北侧围墙外5米",
          ];
          modules.forEach((item) => {
            if (item.name === "project_dc_yqsb") {
              item.valueData.point[2].rows[0] = "工频电场";
              item.valueData.deviceList[3] = "工频电场";
              item.valueData.deviceList.forEach((a,b)=>{
                if(a==='电场强度'){
                  item.valueData.deviceList.splice(b,1)
                } 
              })
            }
            if (item.name === "project_dc_xcdc") {
              item.valueData.photoNameArr = photoNameArr;
              item.valueData.point = photoNameArr.map((a) => {
                return {
                  pointId: window.uuid(),
                  foreverId: window.uuid(),
                  title: a,
                  state: 0,
                  img: "",
                };
              });
            }
          });
        }
      }
      if (this.pointUrl) {
        contentArray.push("project_point");
      }

      let obj = [];
      this.taskData.showing = [];
      // contentArray = [
      //   { testProjectName: "project_dc_gpjcxx", name: "project_dc_gpjcxx" },
      //   { testProjectName: "project_dc_yqsb", name: "project_dc_yqsb" },
      //   { testProjectName: "project_dc_hjtj", name: "project_dc_hjtj" },
      //   { testProjectName: "project_dc_jcgk", name: "project_dc_jcgk" },
      //   { testProjectName: "project_dc_xcdc", name: "project_dc_xcdc" },
      //   { testProjectName: "project_dc_gpspjcdxxx", name: "project_dc_gpspjcdxxx" },
      //   { testProjectName: "project_dc_gpjcjg", name: "project_dc_gpjcjg" },
      // ];
      this.jsonString = [];
      for (let i = 0; i < contentArray.length; i++) {
        // 获取模块
        let result1 = this.modules.find(
          (mod) =>
            mod.name ==
            (this.task.data != null ? contentArray[i] : contentArray[i].name)
        );
        if (result1) {
          // 获取到模块了
          result1 = this.deepCopy(result1);
          if (this.task.data != null) {
            result1.valueData = projectData[i];
          } else {
            result1.valueData.testProjectId = contentArray[i].testProjectId;
            result1.valueData.testProjectType = contentArray[i].testProjectType;
            result1.valueData.sysTestProjectName =
              contentArray[i].sysTestProjectName;
            if (contentArray[i].testProjectChineseName)
              result1.valueData.testProjectChineseName =
                contentArray[i].testProjectChineseName;
            if (contentArray[i].detectionLimitPieces)
              result1.valueData.detectionLimitPieces =
                contentArray[i].detectionLimitPieces;

            if (contentArray[i].sysStandardName)
              result1.valueData.sysStandardName =
                contentArray[i].sysStandardName;

            if (contentArray[i].sysStandardNum)
              result1.valueData.sysStandardNum = contentArray[i].sysStandardNum;

            if (contentArray[i].xcStandardName)
              result1.valueData.xcStandardName = contentArray[i].xcStandardName;

            if (contentArray[i].xcStandardNum)
              result1.valueData.xcStandardNum = contentArray[i].xcStandardNum;
            if (contentArray[i].standardUseTerms)
              result1.valueData.standardUseTerms =
                contentArray[i].standardUseTerms;

            result1.valueData.multipleId =
              Math.random() + "init" + Math.random();
            result1.groundName = contentArray[i].groundName;
            result1.showName = contentArray[i].showName;
            this.dataFormat(result1, contentArray[i], this.task);
          }
          obj.push(result1);
        } else {
          //头模块
          let result2 = this.heads.find(
            (mod) =>
              mod.name ==
              (this.task.data != null ? contentArray[i] : contentArray[i].name)
          );
          if (result2) {
            result2 = this.deepCopy(result2);
            if (this.task.data != null) {
              result2.valueData = projectData[i];
            } else {
              result2.valueData = this.headData(
                this.task,
                contentArray[i].name
              );
              this.dataFormat(result2, contentArray[i], this.task);
            }
            obj.push(result2);
          } else {
            console.log("实例中的模块名字有误!!!");
          }
        }
      }

      obj.forEach((item) => {
        if (item.name == "project_point") {
          item.switch = obj[0].switch;
          item.valueData = {
            testProject: "project_point",
            testProjectChineseName: "点位图",
            pointUrl: this.pointUrl,
            point: [],
          };
        }
      });
      let middleArr = this.deepCopy(obj);

      middleArr.forEach((val, i) => {
        val.height._normal.value = obj[i].height._normal.value;
        if (obj[i].height._short)
          val.height._short.value = obj[i].height._short.value;
        if (obj[i].valueData.hasOwnProperty("carried")) {
          val.height._normal.carried = obj[i].valueData.carried;
        }
        let json = {
          to: val.name,
          type: null,
          data: val,
        };
        this.jsonString.push(json);
      });
      if (!this.jsonString[0].data.valueData.hasOwnProperty("todayDate")) {
        this.jsonString[0].data.valueData.todayDate = _dateFormat(
          "now",
          "Y年M月D日  h时m分"
        );
      }

      this.jsonString.forEach((item) => {
        if (
          !item.data.valueData.title &&
          item.to.includes("_dr_") &&
          !item.data.valueData.drIdNum2
        ) {
          this.$set(item.data.valueData, "title", "探测器1");
          this.$set(item.data.valueData, "drIdNum2", uuid());
          this.$set(item.data.valueData, "del", false);
        }
      });
      this.todayDate = this.jsonString[0].data.valueData.todayDate;

      this.operation();
      this.redefinition();
      this.$nextTick(() => {
        this.pageBox = true;
      });
      // 是否应该显示样品名称————————————————
      let projectNameIsFlag = [
        "空气理化采样",
        "六级筛孔采样器",
        "空气微生物采样",
      ];
      this.jsonString.forEach((item) => {
        if (projectNameIsFlag.includes(item.data.projectName)) {
          item.data.valueData.isSampleName = false;
        } else {
          item.data.valueData.isSampleName = true;
        }
      });
      this.jsonString.forEach((item, index) => {
        item.data.valueData.specifications = this.task.specifications;
        if (
          item.to == "projcet_jcbt" &&
          item.data.valueData.exposureMode == "头颅摄影"
        ) {
          this.jsonString.splice();
        }
        JSON.parse(this.task.testProjectList).forEach((a) => {
          if (a.testProjectName === item.to) {
            item.data.valueData.correct = a.correct;
          }
        });
      });
      // ————————————————————————————————————
      // this.Reset();
    },
    getId(data) {
      if (data) {
        return "pageBox";
      } else {
        return "pageBox2";
      }
    },
    changeJson(data) {
      this.jsonString = data;
      // this.Reset();
      // this.redefinition();
    },
    Reset() {
      let arr = Adaptive(
        this.jsonString,
        this.jsonString[0].data.switch ? 1010 : 670
      );
      arr[0].length == 0 ? (arr = arr.slice(1)) : "";
      this.taskData.showing = arr;
    },
    operation() {
      this.testContentArray = JSON.myParse(this.task.testProjectList);
      this.control = new Array(this.testContentArray.length).fill(false);
      this.testContentArray.forEach((item, index) => {
        if (item.name && item.name.includes("_dr_") && !item.title) {
          this.$set(item, "title", "探测器1");
        }
        let subNum = this.jsonString.findIndex(
          (val) => val.data.valueData.testProjectId === item.testProjectId
        );

        if (item.testProjectName === "project_dc") {
          subNum = this.jsonString.findIndex(
            (val) => val.to === "project_dc_dchjcl"
          );
        }
        if (
          subNum !== -1 ||
          item.testProjectChineseName === "功率密度" ||
          item.testProjectName === "project_dc_gp"
        ) {
          this.control[index] = true;
        }
      });
    },

    //添加空白样组件
    addBlankComponet(contentArray) {
      let blankTestProjects = contentArray.filter(
        (item) => item.testProjectType === 2
      );
      if (blankTestProjects.length > 0) {
        contentArray.splice(1, 0, { name: "project_blankSample" });
      }
      return contentArray;
    },

    changeModule(obj, index) {
      this.reasonMsgArr = this.getIdPoint("project_deleteReason");
      let cancel = [
        "project_dc_dchjcl",
        "project_dc_dchjxpcl",
        "project_dc_dchjxpclbg",
        "project_dc_dctj",
        "project_dc_yysmc",
      ];
      if (this.control[index] === false) {
        this.$prompt("请输入取消检测原因", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false,
          inputType: "textarea",
        })
          .then(({ value }) => {
            if (this.task.deviceMainId == 4) {
              let reason = `取消对${obj.testProjectChineseName}的检测, 原因是${value}。`;
              this.reasonMsgArr.push({
                staffId: JSON.parse(getToken()).id,
                createTime: this.$utils.dateFormat(),
                testprojectName: obj.testProjectChineseName,
                reason,
                testProjectId: obj.testProjectId,
              });
              this.reasonMsg = "";
              bus.$emit("getDeleteArr", this.reasonMsgArr);
              this.jsonString = this.jsonString.filter(
                (item, index) =>
                  item.data.valueData.testProjectId !== obj.testProjectId
              );
            } else {
              let reason = `取消对${obj.testProjectChineseName}的检测, 原因是${value}。`;
              this.reasonMsgArr.push({
                staffId: JSON.parse(getToken()).id,
                createTime: this.$utils.dateFormat(),
                testprojectName: obj.testProjectChineseName,
                reason,
                testProjectId: obj.testProjectId,
              });
              this.reasonMsg = "";
              bus.$emit("getDeleteArr", this.reasonMsgArr);

              let modelName = [];
              if (obj.testProjectArr && obj.testProjectArr.length > 0) {
                modelName = obj.testProjectArr.map((item) => item.name);
              } else {
                modelName = [obj.name];
              }
              if (obj.testProjectName === "project_dc") {
                modelName = modelName.filter((item) => {
                  return cancel.includes(item);
                });
              }
              modelName.forEach((item) => {
                this.jsonString = this.jsonString.filter(
                  (val, index) => val.to !== item
                );
              });
            }
            this.setReasonToModule();
            // this.Reset();
            this.redefinition();
          })
          .catch(() => {
            this.control.splice(index, 1, true);
            this.Reset();
            this.$forceUpdate();
          });
      } else {
        let modelName = [];
        if (obj.testProjectArr && obj.testProjectArr.length > 0) {
          modelName = obj.testProjectArr.map((item) => item.name);
        } else {
          modelName = [obj.name];
        }
        // 如果是电磁========START
        if (obj.testProjectName === "project_dc") {
          let NewDcmodules = this.deepCopy(dcmodules);
          let createArr = [];
          NewDcmodules.forEach((item) => {
            cancel.forEach((a) => {
              if (item.name === a) {
                let id = window.uuid();
                item.valueData.foreverId = id;
                item.valueData.pointId = id;
                item.valueData.multipleId = id;
                createArr.push({
                  type: item.type,
                  to: item.name,
                  data: this.deepCopy(item),
                });
              }
            });
          });
          this.reasonMsgArr = [];
          this.jsonString.push(...createArr);
          bus.$emit("getDeleteArr", this.reasonMsgArr);
          this.setReasonToModule();
          this.redefinition();
          return;
        }
        // =====================END
        let modelObj = [];

        modelName.forEach((item) => {
          let result = this.modules.find((mod) => mod.name === item);
          if (result) {
            result.valueData.testProjectId = obj.testProjectId;
            result.valueData.testProjectType = obj.testProjectType;
            result.valueData.title = obj.title;
            result.valueData.sysTestProjectName = obj.sysTestProjectName;
            if (obj.testProjectChineseName)
              result.valueData.testProjectChineseName =
                obj.testProjectChineseName;
            if (obj.sysStandardName)
              result.valueData.sysStandardName = obj.sysStandardName;
            if (obj.sysStandardNum)
              result.valueData.sysStandardNum = obj.sysStandardNum;
            result.valueData.multipleId =
              Math.random() + "init" + Math.random();
            result.groundName = modelObj.groundName;
            result.showName = modelObj.showName;
            this.dataFormat(result, obj, this.task);
            modelObj.push(result);
          }
        });
        let middleArr = this.deepCopy(modelObj);
        middleArr.forEach((val, i) => {
          val.height._normal.value = modelObj[i].height._normal.value;
          if (modelObj[i].height._short)
            val.height._short.value = modelObj[i].height._short.value;
          let json = {
            to: val.name,
            type: null,
            data: val,
          };
          let pushIndex = null;
          this.jsonString.forEach((item, index) => {
            if (item.to === "project_deleteReason") {
              pushIndex = index;
            }
          });
          this.jsonString.splice(pushIndex, 0, json);
        });
        let testprojectId = obj.testProjectId;
        let myindex = this.reasonMsgArr.findIndex(
          (item) => item.testProjectId === testprojectId
        );
        if (myindex != -1) {
          this.reasonMsgArr.splice(myindex, 1);
        }
        bus.$emit("getDeleteArr", this.reasonMsgArr);
        this.setReasonToModule();
        this.redefinition();
        this.$forceUpdate();
      }
      this.getContents();
    },
    getIdPoint(name) {
      let point = [];
      this.jsonString.forEach((item, index) => {
        if (item.data.name === name) {
          point.push(...item.data.valueData.point);
        }
      });
      return point;
    },

    //将原因设置上原因模块
    setReasonToModule() {
      this.jsonString.forEach((item, index) => {
        if (item.data.name === "project_deleteReason") {
          item.data.valueData.point = [];
        }
      });
      let deleteModule = this.jsonString.find(
        (item) => item.to === "project_deleteReason"
      );
      if (deleteModule) {
        deleteModule.data.valueData.point = this.deepCopy(this.reasonMsgArr);
      }

      this.redefinition();
    },
    headData(data, name) {
      let objData = {};
      let valData = this.heads.find((mod) => mod.name == name);
      let valLength = Object.keys(valData.valueData).length,
        dataEntriesLength = Object.keys(data).length;
      let valKeysArr = Object.keys(valData.valueData),
        dataEntriesArr = Object.entries(data);
      for (let i = 0; i < valLength; i++) {
        for (let k = 0; k < dataEntriesLength; k++) {
          if (valKeysArr[i] == dataEntriesArr[k][0]) {
            if (dataEntriesArr[k][1]) {
              valData.valueData[valKeysArr[i]] = dataEntriesArr[k][1];
            }
          }
        }
      }
      objData = valData.valueData;
      return objData;
    },

    //找到第一个性能模块

    findFirstXn(item) {
      let firstXn = this.jsonString.find(
        (item) =>
          item.data.name.indexOf("_xn_") !== -1 ||
          item.data.name.indexOf("_dr_") !== -1 ||
          item.data.name.indexOf("_ts_") !== -1 ||
          item.data.name.indexOf("_ct_") !== -1
      );
      if (firstXn) {
        if (
          item.data.valueData.testProjectId ===
            firstXn.data.valueData.testProjectId &&
          item.data.name === firstXn.data.name
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    dataFormat(template, content, task) {
      let name = template.name;
      switch (name) {
        case "project_jbxx":
          {
            let keyArr = [
              "clientUnitName",
              "checkUnitName",
              "clientUnitAddress",
              "deviceTypeName",
              "testingPurpose",
              "mechanismName",
              "subCompanyAddress",
              "businessLicenseNum",
              "metrologicalCertificate",
              "staffName",
              "standard",
              // "staffName",
            ];
            let localArr = [
              "entrustedUnitName",
              "UnitExaminationName",
              "UnitExaminationAddress",
              "detectionObjects",
              "purposeDetection",
              "organizationName",
              "institutionalAddress",
              "licenseNumber",
              "metrologyCertificate",
              "detectionTime",
              "samplingPersonnel",
              // "detectionBasis",
            ];
            keyArr.forEach((item, index) => {
              if (task[item] != null && task[item] != undefined) {
                template.valueData[localArr[index]] = task[item];
              }
            });
            template.valueData.detectionTime = this.taskData.startTime;
            try {
              template.valueData.assessArr = JSON.myParse(task["assessArr"])
                .map((item) => item.evaluateName)
                .toString();
            } catch (e) {
              template.valueData.assessArr = "";
            }
          }
          break;
        case "project_dc_jcxx":
          let newKey = [
            "clientUnitName",
            "checkUnitName",
            "clientUnitAddress",
            "checkUnitAddress",
            "detectionTime",
            "deviceTypeName",
            "testingPurpose",
            "mechanismName",
            "subCompanyAddress",
            "businessLicenseNum",
            "metrologicalCertificate",
            "staffName",
            "standard",
            "staffName",
            "monitorObjectName",
            "monitorObjectAddress",
            "endTime",
          ];
          newKey.forEach((item) => {
            template.valueData[item] = task[item];
          });

          template.valueData.detectionTime = this.taskData.startTime;

          break;
        case "project_dc_gpjcxx":
          let gpjcxx_keys = [
            "clientUnitName",
            "checkUnitName",
            "clientUnitAddress",
            "checkUnitAddress",
            "detectionTime",
            "deviceTypeName",
            "testingPurpose",
            "mechanismName",
            "subCompanyAddress",
            "businessLicenseNum",
            "metrologicalCertificate",
            "staffName",
            "standard",
            "staffName",
            "monitorObjectName",
            "monitorObjectAddress",
            "endTime",
            "entrustTime",
            "clientUnitContact",
            "clientUnitPhone",
          ];
          gpjcxx_keys.forEach((item) => {
            template.valueData[item] = task[item];
          });
          template.valueData.detectionTime = this.taskData.startTime;
          break;
        case "project_dc_jcdxxx":
          let newDCjcdxxx = ["antennaHeight", "lat", "lng", "latLngType"];
          newDCjcdxxx.forEach((item) => {
            template.valueData[item] = task[item];
          });
          break;
        case "project_jcxcxx": {
          let localArr = [
            "deviceName",
            "deviceModel",
            "deviceNum",
            "manufacturer",
            "mainParameterkV",
            "mainParametermA",
            "location",
          ];
          let keyArr = [
            "checkDeviceName",
            "checkDeviceModel",
            "checkDeviceNum",
            "checkDeviceVender",
            "nominalCapacity",
            "nominalCapacity1",
            "place",
          ];
          keyArr.forEach((item, index) => {
            if (task[item] != null && task[item] != undefined) {
              template.valueData[localArr[index]] = task[item];
            }
          });
        }

        case "project_cyhj":
          {
            template.valueData.point.forEach((item, index) => {
              item.flow = content.flow;
              item.flowTime = content.flowTime;
              item.sampleLabel = content.sampleLabel;
            });
          }
          break;
        case "head_ggcs":
          {
            let assessArr = task.assessArr
              ? JSON.myParse(task.assessArr).map((item) => item.evaluateName)
              : [];
            let str = "";
            assessArr.forEach((item, index) => {
              if (index != assessArr.length - 1) {
                str += item + ",";
              } else {
                str += item;
              }
            });
            template.valueData.assess = str;
          }
          break;
        /*default: {
														let keys = Object.keys(template.valueData);
														keys.forEach(key => {
																if(task[key]){
																		template.valueData[key] = task[key];
																}
														});
												}*/
      }
    },

    //取消删除检测项目
    cancelDeleteTestProject() {
      if (this.isDelete === false) {
        this.deleteObj.data.height._normal.carried = true;
        this.reasonMsg = "";
        this.testProjectMsgBox = false;
      } else {
        this.isDelete = false;
      }
    },

    //给检测项目生成id
    generateTestprojectId() {
      this.taskData.showing.forEach((item) => {
        item.forEach((a) => {
          if (!a.data.valueData.positionId) {
            a.data.valueData.positionId = uuid();
          }
          if (!a.data.valueData.testProjectChineseName) {
            a.data.valueData.testProjectChineseName = a.data.projectName;
          }
          if (!a.data.valueData.testProjectId) {
            a.data.valueData.testProjectId = Math.random() + "" + Math.random();
          }

          if (!a.data.isHead) {
            this.testProjectArray.push(a.data);
          }
        });
      });
    },

    changeTestProject() {
      if (this.deleteObj) {
        if (this.deleteObj.data.isGroup) {
          let arr2 = this.jsonString.filter(
            (item) => item.data.groundName === this.deleteObj.data.groundName
          );

          arr2.forEach((item2) => {
            item2.data.height._normal.carried = false;
          });
        }

        let reason = `取消对${this.deleteObj.data.valueData.testProjectChineseName}的检测, 原因是${this.reasonMsg}。`;
        this.reasonMsgArr.push({
          staffId: JSON.parse(getToken()).id,
          createTime: this.$utils.dateFormat(),
          testprojectName: this.deleteObj.data.valueData.testProjectChineseName,
          reason,
        });
        this.reasonMsg = "";
        this.isDelete = true;
        this.testProjectMsgBox = false;
        bus.$emit("getDeleteArr", this.reasonMsgArr);
        // this.Reset();
        this.redefinition();
      }
    },

    getContents() {
      let filterArr = this.jsonString.filter(
        (item) =>
          item.data.height._normal.carried === true &&
          item.to !== "project_deleteReason"
      );

      this.aObjects = filterArr.map((item) => {
        if (this.task.deviceMainId === "4") {
          return {
            name: item.data.valueData.testProjectChineseName,
            id: item.data.valueData.positionId,
          };
        } else {
          //return {name: item.data.projectName, id: item.data.valueData.testProjectId}
          return {
            name: item.data.projectName,
            id: item.data.valueData.positionId,
          };
        }
      });
      let obj = {};
      let peon = this.aObjects.reduce((cur, next) => {
        obj[next.name] ? "" : (obj[next.name] = true && cur.push(next));
        return cur;
      }, []); //设置cur默认类型为数组，并且初始值为空的数组
      this.aObjects = peon;
    },
    temporary() {
      const data = {
        id: this.task.id,
        data: this.saveData,
      };
      // return
      this.requestNo++;
      if (this.saveData !== "") {
        let data = this.deepCopy(this.importData);
        data.tasks.tasks[0].data = this.saveData;
        this.whrite(data, JSON.parse(getToken()));
        this.writeFileEvent().then((res) => {
          if (res) {
            this.$message.success("暂存成功");
          }
        });
      }
    },

    deleteSample(item) {
      let pointArr = [];
      this.jsonString.forEach((item, index) => {
        pointArr.push(
          ...item.data.valueData.point.filter(
            (val, num) => val.sampleNum === item.sampleNum
          )
        );
      });
      if (
        item &&
        item.sampleNum !== "" &&
        item.sampleNum !== undefined &&
        pointArr.length === 1
      ) {
        let that = this;
        addSampleNumDelete(item.sampleNum).then((res) => {
          if (res.success) {
            if (item.hasOwnProperty("noShow")) {
              let projectName = item.heBingId.split("-")[0];
              that.jsonString.forEach((val, num) => {
                if (val.to === projectName) {
                  let point = val.data.valueData.point.filter(
                    (v, n) => v.sampleNum !== item.sampleNum
                  );
                  point = this.deepCopy(point);
                  if (point.length) {
                    val.data.valueData.point = [...point];
                  }
                }
              });
            }
            this.redefinition();
          }
        });
      } else {
        this.redefinition();
      }
    },

    generateSampleNum(point, id) {
      if (this.SampleNumJudge) {
        if (
          point.every((item, index) => {
            return item.sampleNum != "";
          })
        )
          return;
        let num = 0;
        let heBingIds = [];
        if (point[0].hasOwnProperty("noShow")) {
          point.forEach((item, index) => {
            if (item.sampleNum === "") {
              heBingIds.push(item.heBingId);
            }
          });
          heBingIds = Array.from(new Set(heBingIds));
          num = heBingIds.length;
        } else {
          point.forEach((item, index) => {
            if (item.sampleNum === "") {
              num++;
            }
          });
        }
        if (num > 0) {
          this.SampleNumJudge = false;
          let data = {
            sampleNumType:
              point[0].sampleLabel !== "" && point[0].sampleLabel !== undefined
                ? point[0].sampleLabel
                : 3,
            sampleNumSize: num,
          };
          let that = this;
          querySampleNum(data)
            .then((res) => {
              if (res.success) {
                let sampleNums = res.sampleNums;
                if (point[0].hasOwnProperty("noShow")) {
                  let projectName = heBingIds[0].split("-")[0];
                  that.taskData.showing.forEach((item, index) => {
                    item.forEach((item2, index2) => {
                      if (
                        item2.to === projectName &&
                        item2.data.valueData.multipleId === id
                      ) {
                        item2.data.valueData.point.forEach((item3, index3) => {
                          if (item3.sampleNum === "") {
                            let i = heBingIds.findIndex(
                              (val, num) => item3.heBingId === val
                            );
                            item3.sampleNum = i >= 0 ? sampleNums[i] : "";
                          }
                        });
                      }
                    });
                  });
                } else {
                  point
                    .filter((item, index) => item.sampleNum === "")
                    .forEach((item, index) => {
                      item.sampleNum = sampleNums[index];
                    });
                }
              }
            })
            .finally(() => {
              that.SampleNumJudge = true;
            });
        }
      }
    },
  },
  destroyed() {
    this.$store.dispatch("actionsPurposeDetection", "");
  },
  computed: {
    ...mapState({
      syntheticData: (state) => state.StomatologyLinkage.syntheticData,
      needPorjectName: (state) => state.StomatologyLinkage.needPorjectName,
      changeNum: (state) => state.StomatologyLinkage.changeNum,
      testprojectId: (state) => state.StomatologyLinkage.testprojectId,
    }),
    saveData() {
      let templateArr = [];
      this.taskData.showing.forEach((item) => {
        item.forEach((a) => {
          if (a.data.isHead) {
            a.data.valueData.delRowReasonArr = this.delRowReasonArr;
            a.data.valueData.deleteArr = this.reasonMsgArr;
            a.data.valueData.sampleNum = window.sampleNum;
            a.data.valueData.sampleNum2 = window.sampleNum2;
            a.data.valueData.sampleNum3 = window.sampleNum3;
          } else {
            a.data.valueData.carried = a.data.height._normal.carried;
          }
          if (a.data.height._normal.carried) {
            templateArr.push(a.data.valueData);
          }
        });
      });
      return JSON.stringify(templateArr);
    },
  },
  watch: {
    changeNum() {
      this.redefinition(this.needPorjectName);
    },
    testprojectId(val) {
      if (val) {
        this.$store.dispatch("actionsSetTestprojectId", false);
        this.generateTestprojectId();
        this.getContents();
      }
    },
  },
  mounted() {
    if (this.unitTime) {
      this.time = this.$utils.dateFormat(
        new Date(this.unitTime).getTime(),
        "yyyy年MM月dd日 HH时mm分ss秒"
      );
      this.time = this.time.substring(0, this.time.length - 3);
    }

    if (this.$route.params.target == 3) {
      this.btnFlag = false;
    } else {
      this.btnFlag = true;
    }
    function getImageBase64Data(imgSrc) {
      function getBase64(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL("image/jpeg");
        return dataURL;
      }
      var p = new Promise((resolve, reject) => {
        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = imgSrc;
        image.onload = function() {
          var imageBase64Data = getBase64(image);
          resolve(imageBase64Data);
        };
      });
      return p;
    }
    //this.$store.dispatch("actionsTimeExposure", this.data.valueData.valueD);

    this.nowYear = new Date()
      .getFullYear()
      .toString()
      .substring(2, 4);
    this.numObj = JSON.myParse(sessionStorage.getItem("numObj"));
    bus.$on("showBook", () => {
      this.showBookValue = !this.showBookValue;
    });

    bus.$on("showModuleOption", () => {
      this.showModuleOption = !this.showModuleOption;
    });

    bus.$on("getReason", (data) => {
      this.delRowReasonArr.push(data);
    });
    this.$eventBus.$off("generateSamplenum");
    this.$eventBus.$on("generateSamplenum", (item, id) => {
      this.generateSampleNum(item, id);
    });

    this.$eventBus.$off("temporaryData");
    this.$eventBus.$on("temporaryData", () => {
      this.temporary();
    });
    this.$eventBus.$on("redefinition", () => {
      this.redefinition("");
    });
    this.$eventBus.$off("jcxcxxEvent");

    this.isTemplate = true;
    this.ipdTemplate = "ipdTemplate";
    this.showExample();
    if (this.unitUrl) {
      this.$set(
        this.taskData,
        "unitUrl",
        this.unitUrl.filter((item) => this.taskData.id == item.id)[0].unitUrl
      );
      getImageBase64Data(this.hostUrl + this.taskData.unitUrl).then((res) => {
        this.taskData.showing[0][0]["data"]["valueData"][
          "imgBase64Three"
        ] = res;
      });
    }
    // try {
    //   this.taskData.showing[0][0]["data"]["valueData"][
    //     "imgBase64Three"
    //   ] = sessionStorage.getItem("uploadBase64");
    // } catch (e) {}

    if (this.target == 0) {
      this.generateTestprojectId();
      this.getContents();

      this.taskData.showing[0][0]["data"]["valueData"]["imgBase64"] = "";
      this.taskData.showing[0][0]["data"]["valueData"]["imgBase64Two"] = "";
      this.taskData.showing[0][0]["data"]["valueData"]["imgBase64Three"] = "";
    }
    if (this.task.deviceMainId == 4) {
      try {
        if (
          this.taskData.showing[0][0]["data"]["valueData"]["deleteArr"].length >
          0
        ) {
          this.reasonMsgArr = this.taskData.showing[0][0]["data"]["valueData"][
            "deleteArr"
          ];
        }

        if (
          this.taskData.showing[0][0]["data"]["valueData"]["delRowReasonArr"]
            .length > 0
        ) {
          this.delRowReasonArr = this.taskData.showing[0][0]["data"][
            "valueData"
          ]["delRowReasonArr"];
        }
      } catch (e) {}
    }

    this.testProjectArray.forEach((item) => {
      if (item.height._normal.carried && !item.isHead) {
        this.testArr.push(item.valueData.testProjectId);
        this.oldTestArr.push(item.valueData.testProjectId);
        this.oldTestArr2.push(item.valueData.testProjectId);
      }
    });

    // if (this.taskData.showing[0].length <= 0) {
    //     let arr = [];
    //     this.taskData.showing.forEach((item, index) => {
    //         if (index !== 0) {
    //             arr.push(this.taskData.showing[index]);
    //         }
    //     });
    //     this.taskData.showing = arr;
    // }

    setTimeout(() => {
      if (this.target != 0) {
        this.jsonString.forEach((item) => {
          item.data.height._normal.carried = true;
        });
        this.redefinition();
      }
    }, 100);
    if (this.target == 0 && window.location.href.indexOf("localhost") === -1) {
      this.timeId = setInterval(() => {
        if (this.saveData !== "") {
          let arr = this.deepCopy(this.importData);
          arr.taskId = this.task.id;
          arr.tasks.tasks[0].data = this.saveData;
          this.whrite(arr, JSON.parse(getToken()));
          this.writeFileEvent().then((res) => {
            bus.$emit("showSave", true);
            this.timeId2 = setTimeout(() => {
              bus.$emit("showSave", false);
            }, 1500);
          });
        }
      }, 8500);
    }

    if (!this.testprojectId) {
      this.getContents();
    }
  },

  beforeMount() {
    this.refre = true;
    //获取任务开始录入时间
    if (this.task.startTime == null) {
      let entryStartTime = _dateFormat("now", "Y-M-D h:m:s");
      this.task.startTime = entryStartTime;
      this.importData.tasks.tasks[0].startTime = entryStartTime;
    }
    this.taskData.startTime = this.task.startTime;
  },

  beforeDestroy() {
    if (window.location.href.indexOf("localhost") === -1) {
      if (this.saveData !== "" && Number(this.target)) {
        fsUpdateTaskData(this.task.id, this.saveData);
      }

      if (this.timeId) clearInterval(this.timeId);
      if (this.timeId2) clearInterval(this.timeId2);
    }
  },
};
</script>

<style lang="less">
#showTemplateBox {
  position: relative !important;
  text-align: left;
}

#showTemplateBox .__functionBox {
  width: 56px;
  height: 27px;
  user-select: none;
  box-shadow: 1px 1px black;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  right: -109px;
  bottom: 1px;
}

#showTemplateBox .__functionBox2 {
  width: 98px;
  height: 27px;
  user-select: none;
  box-shadow: 1px 1px black;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  right: -148px;
  bottom: 1px;
}

#showTemplateBox .box_warpper {
  bottom: 0;
  right: 0;
  z-index: 9999;
  // overflow: auto;
}

#showTemplateBox .isTemplate {
  background: #fffff4;
}

#showTemplateBox .ableInput {
  background: #f9ffff;
}

#showTemplateBox .returnBtn {
  width: 50px;
  height: 25px;
  line-height: 25px;
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid #dfe6ec;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  position: fixed;
  right: 60px;
  top: 90px;
  z-index: 100;
}

#showTemplateBox .returnBtn:hover {
  border: 1px solid #20a0ff;
  color: red;
}

#showTemplateBox .uploadBtn {
  width: 100px;
  height: 40px;
  line-height: 40px;
  color: white;
  background: #20a0ff;
  border: 1px solid #dfe6ec;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  position: fixed;
  right: 60px;
  bottom: 80px;
  z-index: 100;
}

#showTemplateBox .uploadBtn:hover {
  background: #0656ff;
}

#showTemplateBox .confirmUploadCover {
  width: 100px;
  height: 40px;
  line-height: 40px;
  color: #dbdbdb;
  background: gray;
  border: 1px solid #dfe6ec;
  border-radius: 5px;
  text-align: center;
  cursor: not-allowed;
  position: fixed;
  right: 60px;
  bottom: 30px;
  z-index: 200;
}

#showTemplateBox .confirmUpload {
  width: 100px;
  height: 40px;
  line-height: 40px;
  color: white;
  background: #20a0ff;
  border: 1px solid #dfe6ec;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  position: fixed;
  right: 60px;
  bottom: 30px;
  z-index: 100;
}

#showTemplateBox .confirmUpload:hover {
  background: #0656ff;
}

#showTemplateBox .pageFoot_1 {
  margin-left: 20px;
}

#showTemplateBox .jianceImg {
  width: 70px;
  height: 30px;
}

#showTemplateBox .btnBox {
  margin-top: 3%;
  text-align: right;
}

#showTemplateBox .delClass {
  margin-top: 10px;
}

#showTemplateBox .contents2 {
  position: fixed;
  font-size: 16px;
  width: 20vw;
  z-index: 99999;
  height: 27vw;
  padding-top: 15px;
  left: 5vw;
  background: gainsboro;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 5px 0px;
  top: 30vh;
  overflow-y: auto;
}

#showTemplateBox .contents {
  position: fixed;
  font-size: 16px;
  width: 20vw;
  z-index: 99999;
  height: 27vw;
  padding-top: 15px;
  left: 75vw;
  background: gainsboro;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 5px 0px;
  top: 30vh;
  overflow-y: auto;
}

#showTemplateBox .closeContent {
  margin-left: 18.5vw;
  font-size: 18px;
  cursor: pointer;
}

#showTemplateBox .closeContent:hover {
  color: red;
}

.anchor_dc {
  position: fixed;
  top: 25vh;
  left: 200px;
  .el-collapse {
    border: none;
  }
  .el-collapse-item__wrap {
    margin-top: 10px;
    border-radius: 10px;
    max-height: 200px;
    overflow: auto;
  }
  .el-collapse-item__header {
    border-radius: 40px;
    height: 20px;
    background: #409eff;
    color: #fff;
    line-height: 20px;
    padding: 5px 10px;
    border: none;
  }
  .el-collapse-item__content {
    padding-bottom: 5px;
  }
  .el-tag {
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    cursor: pointer;
  }
}
</style>
