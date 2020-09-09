<template>
  <div
    id="showTemplateBox"
    class="showTemplateBox"
    :class="ipdTemplate == 'ipdTemplate' ? 'box_warpper' : ''"
  >
    <div id="pageBox2">
      <!-- 打印区域 -->

      <div class="filler _noprint"></div>
      <!-- 间隔 -->
      <el-row>
        <el-col :span="4">
          <el-upload
            :action="hostUrl + '/upload_sysAtlas'"
            :on-success="uploadTuPuSuccess"
            :show-file-list="false"
            :on-error="uploadTuPuError"
          >
            <el-button
              v-if="target == 1"
              style="margin-bottom: 10px; margin-left: 10px; margin-top: 40px;"
              >上传检测样品图谱
            </el-button>
          </el-upload>
        </el-col>
        <el-col :span="5" v-if="target == 1 && testProjectTitle == '甲苯'">
          <div>
            <el-form>
              <el-form-item required label="空白总峰面积：">
                <el-input
                  v-model="allFeng"
                  @input="changeAllFeng"
                  placeholder="请输入空白总峰面积"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="5" v-if="target == 1 && showCurve()">
          <el-form style="margin-left: 35px;">
            <el-form-item required :label="testProjectTitle">
              <!-- <el-select
                @change="curveNameChange"
                v-model="curveName"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in curveOptions"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                  
                >
                </el-option>
              </el-select> -->
              <el-autocomplete
                v-model="nowSel"
                :clearable="true"
                :fetch-suggestions="
                  (data, cb) => querySearchAsync(data, cb, testProjectTitle)
                "
                placeholder="请选择"
                @select="changeCurve"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
          <!-- <div style="margin-left: 35px; margin-top: 2px;">
            {{ testProjectTitle }}：
            
          </div> -->
        </el-col>
        <el-col
          :span="4"
          v-if="target == 1 && sample.modelName === 'project_systvoc'"
        >
          <div style="margin-top: 40px; margin-left: 35px;">
            <el-popover placement="bottom-end" trigger="click">
              <div
                style="
                  height: 370px;
                  width: 370px;
                  text-align: right;
                  padding-top: 20px;
                "
              >
                <el-row>
                  <span>乙苯：</span>
                  <el-autocomplete
                    v-model="nowCur1"
                    :clearable="true"
                    :fetch-suggestions="
                      (data, cb) => querySearchAsync(data, cb, '乙苯')
                    "
                    placeholder="请选择"
                    @select="
                      (val) => {
                        changeMyCurve(val, '乙苯', 0);
                      }
                    "
                  ></el-autocomplete>
                </el-row>
                <el-row>
                  乙酸丁酯：
                  <el-autocomplete
                    v-model="nowCur2"
                    style="margin-top: 10px;"
                    :clearable="true"
                    :fetch-suggestions="
                      (data, cb) => querySearchAsync(data, cb, '乙酸丁酯')
                    "
                    placeholder="请选择"
                    @select="
                      (val) => {
                        changeMyCurve(val, '乙酸丁酯', 1);
                      }
                    "
                  ></el-autocomplete>
                </el-row>

                <el-row>
                  对二甲苯+间二甲苯：
                  <el-autocomplete
                    v-model="nowCur3"
                    style="margin-top: 10px;"
                    :clearable="true"
                    :fetch-suggestions="
                      (data, cb) =>
                        querySearchAsync(data, cb, '对二甲苯+间二甲苯')
                    "
                    placeholder="请选择"
                    @select="
                      (val) => {
                        changeMyCurve(val, '对二甲苯+间二甲苯', 2);
                      }
                    "
                  ></el-autocomplete>
                </el-row>
                <el-row>
                  正十一烷：
                  <el-autocomplete
                    v-model="nowCur4"
                    :clearable="true"
                    style="margin-top: 10px;"
                    :fetch-suggestions="
                      (data, cb) => querySearchAsync(data, cb, '正十一烷')
                    "
                    placeholder="请选择"
                    @select="
                      (val) => {
                        changeMyCurve(val, '正十一烷', 3);
                      }
                    "
                  ></el-autocomplete>
                </el-row>
                <el-row>
                  苯：
                  <el-autocomplete
                    v-model="nowCur5"
                    :clearable="true"
                    style="margin-top: 10px;"
                    :fetch-suggestions="
                      (data, cb) => querySearchAsync(data, cb, '苯')
                    "
                    placeholder="请选择"
                    @select="
                      (val) => {
                        changeMyCurve(val, '苯', 4);
                      }
                    "
                  ></el-autocomplete>
                </el-row>
                <el-row>
                  苯乙烯：
                  <el-autocomplete
                    v-model="nowCur6"
                    :clearable="true"
                    style="margin-top: 10px;"
                    :fetch-suggestions="
                      (data, cb) => querySearchAsync(data, cb, '苯乙烯')
                    "
                    placeholder="请选择"
                    @select="
                      (val) => {
                        changeMyCurve(val, '苯乙烯', 5);
                      }
                    "
                  ></el-autocomplete>
                </el-row>
                <el-row>
                  邻二甲苯：
                  <el-autocomplete
                    v-model="nowCur7"
                    :clearable="true"
                    style="margin-top: 10px;"
                    :fetch-suggestions="
                      (data, cb) => querySearchAsync(data, cb, '邻二甲苯')
                    "
                    placeholder="请选择"
                    @select="
                      (val) => {
                        changeMyCurve(val, '邻二甲苯', 6);
                      }
                    "
                  ></el-autocomplete>
                </el-row>
              </div>
              <el-button slot="reference">其它曲线</el-button>
            </el-popover>
          </div>
        </el-col>
      </el-row>
      <div
        v-for="(pageDataArray, pageNumber) in sampleData.showing"
        :key="pageNumber"
      >
        <div
          id="myPageBox"
          v-if="pageDataArray.length > 0"
          :class="{ page: true, _print: true, ableInput: ableInput }"
        >
          <!-- 真打印区域 -->
          <div class="projectName">检测项目：{{projectName}}</div>
          <div class="pageCode">
            第 {{ pageNumber + 1 }} 页 / 共 {{ sampleData.showing.length }} 页
          </div>

          <div class="hr_top" v-show="!pageDataArray[0].data.isHead"></div>

          <div :class="{ mainContentBox: true, mainContentBox_debug: debug }">
            <!-- 正文总高度: 700px -->
            <component
              :is="moduleJson.to"
              :data="moduleJson.data"
              :bs="bs"
              :xieLv="xieLv"
              :regressionEquationValue1="regressionEquationValue1"
              :regressionEquationValue2="regressionEquationValue2"
              :regressionEquationValue3="regressionEquationValue3"
              :allFeng="allFeng"
              :pageNumber="pageNumber"
              :thisPageIndex="index"
              :jsonString="jsonString"
              :showing="sampleData.showing"
              :watchSign="watchSign"
              :isTemplate="isTemplate"
              :ableInput="ableInput"
              :auxiliaryArr="auxiliaryArr"
              :mainArr="mainArr"
              :headInput="headInput"
              :key="moduleJson.id"
              :ipdTemplate="ipdTemplate"
              :target="target"
              :detectionLimitObj="detectionLimitObj"
              @restart="Reset"
              @redefinition="redefinition"
              @selectedBox="toSelectedBox"
              v-for="(moduleJson, index) in pageDataArray"
            ></component>
            <!-- --------------------------------------------------- 正文区域 --------------------------------------------------- -->
          </div>
          <div class="pageFoot_1">
            检测 :
            <div :class="{ nameContainer1: true, mainContentBox_debug: debug }">
              <img v-if="refre" class="jianceImg" :src="imgSrc" alt />
            </div>
          </div>

          <!-- 检测签名图片容器 -->
          <div class="pageFoot_2">
            复核 :
            <div :class="{ nameContainer2: true, mainContentBox_debug: debug }">
              <img v-if="refre" class="jianceImg" :src="imgSrc2" alt />
            </div>
          </div>

          <!-- 复核签名图片容器 -->
          <div class="pageFoot_3" v-if="target !== '4' && target !== '1'">
            受检单位(签字) :
            <div
              v-if="refre"
              :class="{ nameContainer3: true, mainContentBox_debug: debug }"
            ></div>
          </div>
          <!-- 受检单位签名图片容器 -->
          <div class="pageFoot_4">{{ todayDate }}</div>
        </div>

        <div class="filler _noprint"></div>
        <!-- 间隔 -->
      </div>
    </div>
  </div>
</template>

<script>
import Methods from "../methods.js"; //  尼玛 babel版本太低, 无法解析 import {Adaptive, dataRefresh} from './methods.js'
import newPoint from "@/utils/newPoint.js";
import bus from "@/utils/bus.js";

let { newtvoc } = newPoint;

let { Adaptive } = Methods;
import modules from "@/components/makemodule/thisData/dataJs/modules.js";
import heads from "@/components/makemodule/thisData/dataJs/heads.js";
import {
  queryAllCurve,
  querySysDeviceData,
  querySysSampleData,
  toQuerySysSampleTemporaryStorageData,
  queryTestProjectAnalysisItemData,
} from "@/api/laboratory";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      curveName: "",
      curveOptions: [],
      ipdTemplate: "ipdTemplate",
      ipdEdit: "ipdEdit",
      heads,
      modules,
      showing: [],
      showOtherCurve: false,
      jsonString: [],
      isSelect: "",
      auxiliaryArr: [],
      mainArr: [],
      bs: 1,
      state: "",
      xieLv: "",
      regressionEquationValue3: "",
      regressionEquationValue1: 1,
      regressionEquationValue2: 1,
      detectionLimitObj: {},
      oneSampleData: [],
      allFeng: "",
      fileNumber: "SZRD/LY424-01", //文件编号
      todayDate: _dateFormat("now", "Y 年 M 月 D 日"), //当前日期
      debug: false, //是否开启页面主要区域背景色调试, 如果开启, 则将页面主要区域的背景色变成灰色(原来是白色), 方便调试
      toShowTable: "", //控制本页面的子组件显示情况
      isTemplate: false, //是否是实例页面(实例页面背景颜色不是白色)
      headInput: false, //头表格是否可以被输入
      ableInput: false, //表格是否可以被输入
      curveArr: [],
      watchSign: {
        //被监听标记, 在app页面监听'watchSign'的值, 当其变化时, 执行重渲染
        _high: 0,
        _short: 0,
        _up: 0,
        _down: 0,
        _delete: 0,
      },
      refre: false,
      myCurveArr: ["", "", "", "", "", "", ""],
      nowCurve: "",
      nowSel: "",
      devices: [],
      nowCur1: "",
      nowCur2: "",
      nowCur3: "",
      nowCur4: "",
      nowCur5: "",
      nowCur6: "",
      nowCur7: "",
      projectName:""
    };
  },
  props: {
    sample: Object,
    sampleData: Object,
    testProject: Object,
    android: String,
    target: [Number, String],
    AllFengFlag: Object,
  },
  computed: {
    ...mapState({
      labtemplate:state=>state.laboratory.labtemplate
    }),
    testProjectTitle() {
      switch (this.sample.modelName) {
        case "project_systvoc":
          return "甲苯";
          break;
        case "project_sysan":
          return "氨";
          break;
        case "project_sysben":
          return "苯";
          break;
        default:
          return this.sample.name;
      }
    },

    hasReviewData() {
      return this.$store.getters.hasReviewData;
    },

    imgSrc() {
      return (
        this.imgUrl +
        this.sampleData.showing[0][0]["data"]["valueData"].recordStaffUrl
      );
    },

    imgSrc2() {
      return (
        this.imgUrl +
        this.sampleData.showing[0][0]["data"]["valueData"].checkStaffUrl
      );
    },
  },
  methods: {
    // 显示这个示例
    showExample() {
      this.projectName=this.labtemplate[0].name
      this.$store.dispatch(
        "ChangeInspectionTime",
        this.testProject.inspectionTime
      );
      let _that = this;
      //检出限和检出限单位
      this.detectionLimitObj.detectionLimit = this.testProject.value[0].detectionLimit;
      this.detectionLimitObj.detectionLimitPieces = this.testProject.value[0].detectionLimitPieces;

      sessionStorage.setItem(
        "detectionLimitObj",
        JSON.stringify(this.detectionLimitObj)
      );
      _that.sampleData.id = _that.testProject.id;
      _that.sampleData.showing = [];
      // 4是实验室已接样，5是实验室已上传
      if (_that.android == "hide") {
        _that.ableInput = true;
        _that.headInput = true;
        _that.isTemplate = false;
      } else {
        _that.ipdEdit = "ipdEdit";
      }
      // 获取到模块名
      let content = [{ name: _that.testProject.modelName }];
      // 只判断了tvoc
      if (content[0].name == "project_systvoc" && this.target != "4") {
        content = [{ name: "project_systvoc1" }];
        let height = 125;
        _that.testProject.value.forEach((item) => {
          if (item.isParallel) {
            let dataLength = "";
            let dataStart = 0;
            height += 661;
            if (height > 670) {
              //如果加了该模块高度,超过了670
              height -= 661; //求没加之前高度;
              height += 41; //该模块表头
              dataLength = Math.floor((670 - height) / 32); //求能放多少行

              content.push({
                name: "project_systvoc2",
                labSampleNum: item.labSampleNum,
                isParallel: item.isParallel,
                dataLength,
                item: item,
                dataStart,
                hasAll: false,
              });
              height = 0; //跳到第二页
              dataStart = dataLength;
              content.push({
                name: "project_systvoc2",
                labSampleNum: item.labSampleNum,
                isParallel: item.isParallel,
                item: item,
                dataLength: 20 - dataLength,
                dataStart,
                hasAll: true,
              });
              height = (20 - dataLength) * 31; //第二页行高
            } else {
              content.push({
                name: "project_systvoc2",
                labSampleNum: item.labSampleNum,
                isParallel: item.isParallel,
                dataLength: 20,
                item: item,
                dataStart,
                hasAll: true,
              });
            }
          } else {
            height += 361;
            let dataLength = "";
            let dataStart = 0;
            if (height > 670) {
              height -= 361;
              height += 41;
              dataLength = Math.floor((670 - height) / 32);
              content.push({
                name: "project_systvoc3",
                labSampleNum: item.labSampleNum,
                isParallel: item.isParallel,
                dataLength: dataLength,
                item: item,
                dataStart,
                hasAll: false,
              });
              dataStart = dataLength; //数据开始位置
              height = 0;
              content.push({
                name: "project_systvoc3",
                labSampleNum: item.labSampleNum,
                isParallel: item.isParallel,
                dataLength: 10 - dataLength,
                item: item,
                dataStart,
                hasAll: true,
              });
            } else {
              content.push({
                name: "project_systvoc3",
                labSampleNum: item.labSampleNum,
                isParallel: item.isParallel,
                item: item,
                dataLength: 10,
                dataStart,
                hasAll: true,
              });
            }
          }
        });
        let sampleNum = [];
        this.testProject.value.forEach((item) => {
          let sampleObj = {
            sampleNum: item.labSampleNum,
            sampleNumIndex: item.sampleNumIndex,
          };
          if (item.isParallel) {
            sampleObj.isParallelSample = 1;
            sampleObj.parallelWindArea1 = item.parallelWindArea1;
            sampleObj.parallelWindArea2 = item.parallelWindArea2;
          } else {
            sampleObj.isParallelSample = 0;
            sampleObj.parallelWindArea = item.parallelWindArea;
          }
          sampleNum.push(sampleObj);
        });

        querySysDeviceData(sampleNum).then((res) => {
          this.SampleDataArr = [];
          let arr = [];
          sampleNum.forEach((item) => {
            let arr2 = res.data.filter((item2) => {
              return (
                item2.labSampleNum === item.sampleNum &&
                item2.sampleNumIndex === item.sampleNumIndex
              );
            });
            arr.push(arr2);
          });

          let sampleNum2 = sampleNum.map((item) => item.sampleNum);
          let sampleNumIndexs = sampleNum.map((item) => item.sampleNumIndex);
          sampleNum2.forEach((item, index) => {
            let oneSampleData = [];
            res.data.forEach((item2, index2) => {
              if (
                item2.sysSampleNum.indexOf(item) != -1 &&
                item2.sampleNumIndex === sampleNumIndexs[index]
              ) {
                oneSampleData.push(item2);
              }
            });

            oneSampleData.forEach((item) => {
              let nameArr = item.sysSampleNum.split("-");
              item.parallelWindArea = sampleNum[index].parallelWindArea;
              item.parallelWindArea1 = sampleNum[index].parallelWindArea1;
              item.parallelWindArea2 = sampleNum[index].parallelWindArea2;
              if (nameArr.length >= 2) {
                item.testProject = item.testProject + "-" + nameArr[1];
              }
            });

            let obj = {
              testProject: "",
              volume: oneSampleData[0].volume,
              temperature: oneSampleData[0].temperature,
              atmosphericPressure: oneSampleData[0].atmosphericPressure,
              peakArea: oneSampleData[0].peakArea,
              sysSampleNum: oneSampleData[0].sysSampleNum,
              sysSampleId: oneSampleData[0].sysSampleId,
              suckConcentration: "",
              blankConcentration: "",
              blankPeakArea: "",
            };

            let name = oneSampleData[0].parallelLetter;
            if (name.includes("-")) {
              let newObj = JSON.myParse(JSON.stringify(obj));
              newObj.testProject = "其他（以甲苯计）-A";
              oneSampleData.push(newObj);
              newObj = JSON.myParse(JSON.stringify(obj));
              newObj.testProject = "其他（以甲苯计）-B";
              oneSampleData.push(newObj);
              newObj = JSON.myParse(JSON.stringify(obj));
              newObj.testProject = "TVOC总计-A";
              oneSampleData.push(newObj);
              newObj = JSON.myParse(JSON.stringify(obj));
              newObj.testProject = "TVOC总计-B";
              oneSampleData.push(newObj);
            } else {
              let newObj = JSON.myParse(JSON.stringify(obj));
              newObj.testProject = "其他（以甲苯计）";
              oneSampleData.push(newObj);
              newObj = JSON.myParse(JSON.stringify(obj));
              newObj.testProject = "TVOC总计";
              oneSampleData.push(newObj);
            }

            this.SampleDataArr.push(oneSampleData);
          });
          this.getModelObj(content);
        });
      } else if (
        content[1] &&
        content[1].name == "project_systvoc" &&
        this.target == "4"
      ) {
        content[1] = { name: "project_systvoc4" };
        content.push({ name: "project_systvoc4" });
        this.getModelObj(content);
      } else if (this.target == 4) {
        let sampleNums = this.testProject.value.map((item) => item.sysSampleId);
        querySysSampleData(sampleNums).then((res) => {
          content = [];
          content.unshift({ name: _that.testProject.value[0].headModelName });
          for (let i = 0; i < res.standards.length; i++) {
            content.push({ name: "project_sysjq_standard", index: i });
          }
          let sampleNums = [];
          this.testProject.value.forEach((item) => {
            if (item.blankSample === 0) {
              sampleNums.push(item.labSampleNum);
            }
          });
          if (_that.testProject.modelName == "project_systvoc") {
            content.push({ name: "project_systvoc5" });
            sampleNums.forEach((item) => {
              content.push({ name: "project_systvoc4", sampleNum: item });
            });
          } else {
            content.push({ name: _that.testProject.modelName });
          }

          let analysis = sessionStorage.getItem("analysis");
          let flag = false;
          if (analysis === "已分析") {
            flag = true;
          }
          this.getModelObj(content, flag);
        });
      } else {
        this.getModelObj(content, false);
      }
     
    },

    uploadTuPuSuccess(res) {
      if (res.success) {
        bus.$emit("getTuPuUrl", res.url);
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
    },
    uploadTuPuError() {
      console.log(arguments);
    },
    showCurve() {
      let modelName = this.testProject.modelName;
      let allowArr = ["project_sysdong"];
      let wswArr = [
        "project_wsw_ypjcxx",
        "project_wsw_dx",
        "project_wsw_jl_kqcyqf",
        "project_wsw_jl_kqcjf",
        "project_wsw_jl_kqcjf5min",
        "project_wsw_jl_kqcjf15min",
        "project_wsw_jl_kqcjfm3",
        "project_wsw_jl_ejxscm2",
        "project_wsw_jl_ejxs25cm2",
        "project_wsw_jl_sjxs50cm2",
        "project_wsw_jl_mbpjsf",
      ];
      allowArr = allowArr.concat(wswArr);

      let index = allowArr.findIndex((item) => item === modelName);

      if (index !== -1) {
        return false;
      } else {
        return true;
      }
    },

    querySearchAsync(queryString, cb, title) {
      let arr = [];
      console.log(this.curveArr,title)
      this.curveArr.map((item) => {
        if (item.materialCurveName == title) {
          arr = item.curves;
          // this.curveName=item.materialName
        }
      });
      let restaurants = arr;
      // console.log(restaurants,'restaurants')
      let results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;
      cb(results);
    },

    createStateFilter(queryString) {
      return (state) => {
        console.log(state,'state')
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    // 复制一个对象
    clone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    },

    Reset() {
      let arr = Adaptive(
        this.jsonString,
        this.jsonString[0].data.switch ? 1010 : 670
      );
      this.sampleData.showing = arr[0].length > 0 ? arr : arr.slice(1);
      // console.log(this.sampleData.showing);
    },

    redefinition(needPorjectName) {
      let redefinitionArr = [];
      this.jsonString.forEach((item, index) => {
        let obj = {};
        let findIndex = redefinitionArr.findIndex((val) => {
          return (
            val.to === item.to &&
            val.data.valueData.multipleId === item.data.valueData.multipleId
          );
        });

        if (findIndex == -1) {
          obj = JSON.myParse(JSON.stringify(item));
          obj.data.height = this.jsonString[index].data.height;
          redefinitionArr.push(obj);
        } else {
          let point = JSON.myParse(JSON.stringify(item.data.valueData.point));
          redefinitionArr[findIndex].data.valueData.point = [
            ...redefinitionArr[findIndex].data.valueData.point,
            ...point,
          ];
        }
      });
      let decompose = [];
      let height = redefinitionArr[0].data.switch ? 1010 : 670;
      redefinitionArr.forEach((item, index) => {
        let projcet = {
          to: item.to,
          type: null,
          data: JSON.myParse(JSON.stringify(item.data)),
        };

        let surplusPoint = [];
        projcet.data.valueData.point = [];
        let point = [];
        if (needPorjectName != "" && needPorjectName === item.to) {
          point = this.syntheticData;
        } else {
          point = item.data.valueData.point;
        }
        let lastProject = Adaptive(decompose, height);
        let surplusHiehgt = 0;
        if (lastProject.length > 0) {
          lastProject[lastProject.length - 1].forEach((v, i) => {
            let num = 0;
            if (v.data.height._normal.confirm) {
              num = v.data.height._normal.fixed;
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
        if (item.data.height._normal.confirm) {
          if (point)
            projcet.data.valueData.point = JSON.myParse(JSON.stringify(point));
          decompose.push(projcet);
          decompose[decompose.length - 1].data.height = item.data.height;
        } else if (surplusHiehgt >= projcet.data.height._normal.fixed + 32) {
          // Waiting for someone who is destined
          let testResultsNum = "";
          if (projcet.data.valueData.hasOwnProperty("testResults")) {
            testResultsNum =
              projcet.data.valueData.testResults.length * 32 + 32;
          }
          testResultsNum = testResultsNum > 0 ? testResultsNum : 0;
          let several = Math.floor(
            (surplusHiehgt -
              projcet.data.height._normal.fixed -
              testResultsNum) /
              32
          );
          // if (several > 2) {
          //     several -= 2
          // }
          if (point.length > several) {
            projcet.data.valueData.point = JSON.myParse(
              JSON.stringify(point.slice(0, several))
            );
            decompose.push(projcet);
            decompose[decompose.length - 1].data.height = item.data.height;
            surplusPoint = JSON.myParse(JSON.stringify(point.slice(several)));
          } else {
            projcet.data.valueData.point = JSON.myParse(JSON.stringify(point));
            decompose.push(projcet);
            decompose[decompose.length - 1].data.height = item.data.height;
          }
        } else {
          surplusPoint = JSON.myParse(JSON.stringify(point));
        }
        let totalSubsidiary = Math.ceil(
          (height - projcet.data.height._normal.fixed) / 32
        );
        // if (totalSubsidiary > 2) {
        //     totalSubsidiary -= 2
        // }
        let fatherData = [];
        let sonData = [];
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
        let multipleId = projcet.data.valueData.multipleId;
        fatherData.forEach((val, num) => {
          let projcetSubsidiary = JSON.myParse(JSON.stringify(projcet));
          projcetSubsidiary.data.valueData.point = val;
          decompose.push(projcetSubsidiary);
          decompose[decompose.length - 1].data.height = item.data.height;
        });
      });
      decompose.forEach((item, index) => {
        if (
          (item.to === "project_systvoc2" || item.to === "project_systvoc2") &&
          item.data.valueData.point.length <= 0
        ) {
          decompose.splice(index, 1);
        }
      });
      this.jsonString = decompose;
      this.Reset();
    },

    deepCopy(target) {
      let copyed_objs = []; //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
      function _deepCopy(target) {
        if (typeof target !== "object" || !target) {
          return target;
        }
        for (let i = 0; i < copyed_objs.length; i++) {
          if (copyed_objs[i].target === target) {
            return copyed_objs[i].copyTarget;
          }
        }
        let obj = {};
        if (Array.isArray(target)) {
          obj = []; //处理target是数组的情况
        }
        copyed_objs.push({ target: target, copyTarget: obj });
        Object.keys(target).forEach((key) => {
          if (obj[key]) {
            return;
          }
          obj[key] = _deepCopy(target[key]);
        });
        return obj;
      }

      return _deepCopy(target);
    },

    mapData(
      data,
      name,
      labSampleNum,
      dataLength,
      dataStart,
      hasAll,
      contentItem
    ) {
      data = JSON.myParse(JSON.stringify(data));
      let objData = {};
      let valData = this.modules.find((mod) => mod.name == name);

      let valueObj = data.value;

      let valueLength = valueObj.length;
      if (
        name != "project_systvoc1" &&
        name != "project_systvoc2" &&
        name != "project_systvoc3"
      ) {
        for (let i = 0; i < valueLength; i++) {
          if (valueObj[i].isParallel) {
            let itemCopy = JSON.myParse(JSON.stringify(valueObj[i]));
            itemCopy.pointId = uuid();
            valueObj[i].parallelLetter = "-A";
            itemCopy.parallelLetter = "-B";
            itemCopy.isParallel = null;
            itemCopy.isParallel2 = true;
            itemCopy.noReportDifference = true;
            valueObj.splice(i + 1, 0, itemCopy);
            valueLength = valueObj.length;
          } else {
            if (typeof valueObj[i].parallelLetter === "undefined") {
              valueObj[i].parallelLetter = "";
            }
          }
        }
      }

      valData = this.deepCopy(valData);

      if (name.indexOf("project_systvoc") != -1) {
        let myBlankSample = data.value[0].myBlankSample;
        if (name == "project_systvoc1") {
          let keys = Object.keys(valData.valueData);
          keys.forEach((item) => {
            if (data.value[0][item]) {
              valData.valueData[item] = data.value[0][item];
            }
          });
        }

        if (name == "project_systvoc2") {
          valData.valueData.myBlankSample = myBlankSample;
          this.SampleDataArr.forEach((item, index) => {
            if (
              item[0].labSampleNum.indexOf(labSampleNum) != -1 &&
              item[0].sampleNumIndex === contentItem.item.sampleNumIndex
            ) {
              if (dataStart != 0) {
                valData.valueData.allPoint = this.SampleDataArr[index]; //将完整的数据存进去, 计算要用到
                valData.valueData.point = this.SampleDataArr[index].slice(
                  dataStart,
                  this.SampleDataArr[index].length
                );
                valData.valueData.hasAll = hasAll;
              } else {
                valData.valueData.allPoint = this.SampleDataArr[index]; //将完整的数据存进去, 计算要用到
                valData.valueData.point = this.SampleDataArr[index].slice(
                  dataStart,
                  dataLength
                );
                valData.valueData.hasAll = hasAll;
              }
            }
          });
        }

        if (name == "project_systvoc3") {
          valData.valueData.myBlankSample = myBlankSample;
          this.SampleDataArr.forEach((item, index) => {
            if (
              item[0].labSampleNum.indexOf(labSampleNum) != -1 &&
              item[0].sampleNumIndex === contentItem.item.sampleNumIndex
            ) {
              if (dataStart != 0) {
                valData.valueData.allPoint = this.SampleDataArr[index]; //将完整的数据存进去, 计算要用到
                valData.valueData.point = this.SampleDataArr[index].slice(
                  dataStart,
                  this.SampleDataArr[index].length
                );
                valData.valueData.hasAll = hasAll;
              } else {
                valData.valueData.allPoint = this.SampleDataArr[index]; //将完整的数据存进去, 计算要用到
                valData.valueData.point = this.SampleDataArr[index].slice(
                  dataStart,
                  dataLength
                );
                valData.valueData.hasAll = hasAll;
              }
            }
          });
        }
      }

      let allowArr = ["project_systvoc"];
      let index = allowArr.findIndex((item) => name.indexOf(item) !== -1);
      if (index === -1) {
        let data2 = this.$store.getters.analysisData;
        // if (data2 === "" || data2 === null) {
        if (data2 === "" || data2 === null) {
          let arr = JSON.parse(JSON.stringify(data.value));
          let arr2 = JSON.parse(JSON.stringify(valData.valueData.point));

          for (let i = 0; i < arr.length; i++) {
            let item = arr2[0];
            let keys = Object.keys(item);

            keys.forEach((key) => {
              if (arr[i].hasOwnProperty(key) === false) {
                arr[i][key] = item[key];
              }
            });
          }

          valData.valueData.point = arr;

          valData.valueData.point.forEach((item) => {
            item.modelName = valData.valueData.testProject;
            item.testProjectName = valData.projectName;
          });
        } else {
          valData.valueData.point = this.$store.getters.analysisData.filter(
            (item) => item.sampleNum.indexOf("KB") == -1
          );
          valData.valueData.point.forEach((item) => {
            item.item1 = item.sysItem1;
            item.item2 = item.sysItem2;
            item.item3 = item.sysItem3;
            item.item4 = item.sysItem4;
            item.item5 = item.sysItem5;
            item.item6 = item.sysItem6;
            item.modelName = valData.valueData.testProject;
            item.testProjectName = valData.projectName;
          });
        }
      }
      objData = valData.valueData;
      return objData;
    },
    curveNameChange(data) {
      this.nowSel = "";
      // this.curveArr = this.curveOptions.filter(
      //   item => item.id == data
      // )[0].curves;
    },
    //查询曲线
    toQueryAllCurve() {
      queryAllCurve(this.testProject.testProjectId).then((res) => {
        if (res.success) {
          res.datas.forEach((item) => {
            item.curves.map((a) => {
              a.createtime = a.createtime.replace(/\s+/g, "-");
              a.value = a.curveNum;
            });
          });
          let arr = JSON.parse(JSON.stringify(res.datas));
          this.curveArr = JSON.parse(JSON.stringify(res.datas));
          arr.map((item) => {
            if (item.materialCurveName == this.testProjectTitle) {
              this.curveOptions = item.curves;
              // this.curveName=item.materialName
            }
          });
        } else {
          this.$notify({
            type: "warning",
            message: "曲线获取失败",
          });
        }
      });
    },

    //曲线改变
    changeCurve(curve) {
      console.log("曲线", curve);
      this.bs = 1 / curve.regressionEquationValue1;
      this.xieLv = curve.regressionEquationValue1;
      this.regressionEquationValue1 = curve.regressionEquationValue1;
      this.regressionEquationValue2 = curve.regressionEquationValue2;
      this.regressionEquationValue3 = curve.regressionEquationValue3;
      this.nowCurve = curve.id;
      this.$emit("selectedCurve", this.nowCurve);
    },
    changeAllFeng(data) {
      this.$emit(
        "changeAllFeng",
        data,
        this.target == 1 && this.testProjectTitle == "甲苯"
      );
    },
    toSelectedBox(item) {
      this.$emit("selectedBox", item);
    },

    dataFormat(templateName, modelResult, index, nowObj, flag = true) {
      modelResult.valueData.multipleId = templateName.name + Math.random();
      /*如果isDeviceData这个字段是true， 自动使用仪器数据*/
      //给需要使用仪器数据的模板isDeviceData设为true
      if (modelResult.isDeviceData && this.target === "1") {
        let sampleNum = [];

        this.testProject.value.forEach((item) => {
          let sampleObj = {
            sampleNum: item.labSampleNum,
            sampleNumIndex: item.sampleNumIndex,
          };
          if (item.isParallel) {
            sampleObj.isParallelSample = 1;
          } else {
            sampleObj.isParallelSample = 0;
          }
          sampleNum.push(sampleObj);
        });
        querySysDeviceData(sampleNum).then((res) => {
          if (res.success) {
            let benData = res.data.filter(
              (item) => item.testProject.trim() == modelResult.projectName
            );
            this.jsonString.forEach((item2) => {
              item2.data.valueData.point.forEach((item3) => {
                let obj = benData.find((item) => {
                  return (
                    item.sysSampleNum == item3.labSampleNum &&
                    item.parallelLetter == item3.parallelLetter &&
                    item.sampleNumIndex == item3.sampleNumIndex
                  );
                });
                if (obj) {
                  obj = JSON.myParse(JSON.stringify(obj));
                }
                item3.sysArea = obj && obj.peakArea;
                item3.sysBlankConcentration = obj && obj.blankConcentration;
                item3.sysBlankArea = obj && obj.blankPeakArea;
                item3.sysSuckConcentration = obj && obj.suckConcentration;
              });
            });
          }
        });
      }
      if (modelResult.name === "project_wsw_dx" && this.target === "1") {
        let id = modelResult.valueData.point[0].testProjectId
          ? modelResult.valueData.point[0].testProjectId
          : this.testProject.testProjectId;
        queryTestProjectAnalysisItemData(
          modelResult.valueData.point[0].testProjectId
        )
          .then((res) => {
            this.jsonString.forEach((item2) => {
              if (item2.to === "project_wsw_dx") {
                let point = [];
                item2.data.valueData.point.forEach((item3) => {
                  let analysisItems = res.data;
                  let itemId = uuid();
                  analysisItems.forEach((item4, index) => {
                    let obj = JSON.parse(JSON.stringify(item3));
                    let resultIndex = 0;
                    if (index === 0) {
                      // obj.analysisResult = [];
                      // obj.analysisResult.length = analysisItems.length;
                      obj.resultIndex = resultIndex;
                      obj.analysisItems = analysisItems;
                    } else {
                      resultIndex++;
                      obj.resultIndex = resultIndex;
                    }
                    let newItem = JSON.parse(JSON.stringify(item4));
                    newItem.analysisResultArr = JSON.parse(
                      newItem.analysisResultArr
                    );
                    newItem.itemId = itemId;
                    obj.sysAnalysisItem = newItem.analysisItem;
                    obj.analysisItem = newItem;
                    obj.itemId = itemId;
                    if (newItem.analysisResultArr.length > 0) {
                      obj.sysAnalysisResult =
                        newItem.analysisResultArr[0].result;
                    }
                    point.push(obj);
                  });
                });

                if (point.length) {
                  item2.data.valueData.point = point;
                } else {
                  //  item2.data.valueData.point= modelResult.valueData.point
                }
              }
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    changeTvoc2() {
      let tvoc2s = this.jsonString.filter(
        (item) =>
          item.to === "project_systvoc2" || item.to === "project_systvoc3"
      );
      tvoc2s.forEach((item) => {
        let sysSampleNum = item.data.valueData.point[0].sysSampleNum;
        let sampleNumIndex = item.data.valueData.point[0].sampleNumIndex;
        let multipleId = item.data.valueData.multipleId;

        let mytvoc2s = tvoc2s.filter(
          (item2) =>
            item2.data.valueData.point[0].sysSampleNum === sysSampleNum &&
            item2.data.valueData.allPoint[0].sampleNumIndex === sampleNumIndex
        );
        mytvoc2s.forEach((item) => {
          item.data.valueData.multipleId = multipleId;
        });
      });

      this.redefinition("");
    },
    getModelObj(content, flag = true) {
      let _that = this;
      let obj = [];
      _that.jsonString = [];
      let analysis = sessionStorage.getItem("analysis");
      content.forEach((item, index) => {
        let modelResult = _that.modules.find((mod) => mod.name == item.name);
        if (modelResult) {
          modelResult.valueData.modelName = modelResult.valueData.testProject;
          modelResult = _that.deepCopy(modelResult);
          if (_that.testProject.value[0].data != null) {
            let sampleValueDataStr = _that.testProject.value[0]["data"];
            let sampleValueData = JSON.myParse(sampleValueDataStr);
            modelResult.valueData = sampleValueData;
          } else {
            if (this.target == 1) {
              modelResult.valueData = _that.mapData(
                _that.testProject,
                item.name,
                item.labSampleNum,
                item.dataLength,
                item.dataStart,
                item.hasAll,
                item
              );
              if (_that.$store.getters.analysisData) {
                let arr = _that.$store.getters.analysisData.filter(
                  (item) => item.sampleNum.indexOf("KB") !== -1
                );
                arr.forEach((item) => {
                  if (modelResult.valueData.testResults)
                    modelResult.valueData.testResults.push({
                      noEdit: true,
                      sampleNum: item.sampleNum,
                      testResult: item.testResult,
                    });
                });
              }
              this.dataFormat(item, modelResult, item.index, item, flag);
            }
            //请求格式化数据
          }
          if (_that.target === "4" && item.hasOwnProperty("sampleNum")) {
            modelResult.valueData.divisionNum = item.sampleNum;
          }
          obj.push(modelResult);
        } else {
          let modelResult = _that.heads.find((mod) => mod.name == item.name);
          if (modelResult) {
            modelResult.valueData.modelName = modelResult.valueData.testProject;
            modelResult = _that.deepCopy(modelResult);
            if (_that.testProject.value[0].data != null) {
              let sampleValueDataStr = _that.testProject.value[0]["data"];
              let sampleValueData = JSON.myParse(sampleValueDataStr);
              modelResult.valueData = sampleValueData;
            } else {
              this.dataFormat(item, modelResult);
            }
            obj.push(modelResult);
          } else {
            console.log("模块名字有误!");
          }
        }
      });
      let middleArr = JSON.myParse(JSON.stringify(obj)); //深拷贝
      middleArr.forEach((val, i) => {
        val.height._normal.value = obj[i].height._normal.value;
        if (obj[i].height._short)
          val.height._short.value = obj[i].height._short.value;
        let json = {
          to: val.name,
          type: null,
          data: val,
        };
        _that.jsonString.push(json);
      });
      this.Reset();
      //已分析使用
      if (this.target === "4") {
        //审核使用
        this.toSetValue();
      }
    },

    toSetValue() {
      let headModelName = this.testProject.value[0].headModelName;
      let standardArr = [];
      this.jsonString.forEach((item, index) => {
        if (item.to == "project_sysjq_standard") {
          standardArr.push(item);
        } else if (item.to === headModelName) {
          if (this.hasReviewData != null) {
            item.data.valueData = this.hasReviewData;
          }
        } else {
          let keys = Object.keys(item.data.valueData);
          keys.forEach((key) => {
            if (key === "point") {
              if (item.to.includes("tvoc")) {
                item.data.valueData["point"] = this.hasReviewData[
                  "samples"
                ].filter(
                  (val, num) =>
                    item.data.valueData.divisionNum === val.labSampleNum
                );
              } else {
                item.data.valueData["point"] = this.hasReviewData["samples"];
              }
              item.data.valueData.multipleId = index;
            } else if (key === "kbSampleNum") {
              let KB = this.hasReviewData["sampleNum"]
                .split(",")
                .find((item, index) => item.includes("KB"));
              KB = KB !== undefined ? KB : "";
              item.data.valueData.kbSampleNum = KB.includes("null")
                ? KB.split("null")[0]
                : KB;
            } else if (this.hasReviewData[key]) {
              item.data.valueData[key] = this.hasReviewData[key];
            }
          });
        }
        if (
          item.to.includes("project_systvoc") &&
          item.data.valueData.point.length > 0
        ) {
          item.data.valueData.sysSolutionMultiple =
            item.data.valueData.point[0].sysSolutionMultiple;
        }
      });
      standardArr.forEach((item, index) => {
        item.data.valueData = this.hasReviewData.standards[index];
        if (typeof item.data.valueData.series == "string") {
          item.data.valueData.series = JSON.myParse(item.data.valueData.series);
          item.data.valueData.point = item.data.valueData.series;
        }
        item.data.valueData.multipleId = "project_sysjq_standard_" + index;
      });
    },

    getSysSampleData(sampleNums, modelResult) {
      querySysSampleData(sampleNums).then((res) => {
        this.sampleData.showing[0][0].data.valueData = res;
        this.sampleData.showing[0][0].data.valueData.point = [""];
        this.sampleData.showing[0][0].data.valueData.getSysSampleData = 0;
        let imgUrl = this.imgUrl + res.recordStaffUrl;
        this.getBase64(
          imgUrl,
          this.sampleData.showing[0][0].data.valueData,
          "shiYanJianCe"
        );
      });
    },

    changeMyCurve(val, name, index) {
      this.myCurveArr[index] = { name, id: val["id"] };
      this.$emit("changeMyCurve", this.myCurveArr);
    },

    getBase64(img, obj, name) {
      //传入图片路径，返回base64
      function getBase64Image(img, width, height) {
        let canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width;
        canvas.height = height ? height : img.height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        let dataURL = canvas.toDataURL("image/jpeg", 0.5);
        return dataURL;
      }

      let image = new Image();
      image.src = img;
      image.setAttribute("crossOrigin", "Anonymous");
      if (img) {
        image.onload = function () {
          obj[name] = getBase64Image(image);
        };
      }
    },
  },

  created() {
    // console.log("组件传过来的数据sample", this.sample);
    // console.log("组件传过来的数据sampleData", this.sampleData);
    // console.log("组件传过来的数据testProject", this.testProject);
    // console.log("组件传过来的数据android", this.android);
    // console.log("组件传过来的数据target", this.target);
  },
  mounted() {
    this.$nextTick(() => {
      this.target == 1 && this.testProjectTitle == "甲苯"
        ? (this.AllFengFlag.flag = true)
        : "";
    });
    // 视口高度
    let viewportH = window.innerHeight || document.documentElement.clientHeight;

    // 查询曲线
    this.toQueryAllCurve();

    // 设置高度
    let showTemplateBoxs = document.getElementsByClassName("showTemplateBox");
    for (let i = 0; i < showTemplateBoxs.length; i++) {
      // showTemplateBoxs[i].style.height = viewportH - 164 + "px";
    }
    this.isTemplate = true;
    this.ipdTemplate = "ipdTemplate";
    this.refre = true;
    this.showExample();

    // 还原数据啥的   设置数据，模块名，检测项目名
    bus.$on("reductionData", (data) => {
      this.jsonString[0].data.valueData.point = data;
      this.jsonString[0].data.valueData.point.forEach((item) => {
        item.modelName = this.jsonString[0].data.valueData.testProject;
        item.testProjectName = this.jsonString[0].data.projectName;
      });
    });

    setTimeout(() => {
      this.changeTvoc2();
    }, 500);
  },
};
</script>

<style>
#showTemplateBox {
  position: relative !important;
  text-align: left;
  overflow-y: scroll;
}
.jianceImg {
  width: 120px;
}
.pageFoot_1 {
  margin-left: 20px;
}
</style>
