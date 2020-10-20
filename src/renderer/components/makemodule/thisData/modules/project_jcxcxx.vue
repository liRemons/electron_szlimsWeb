<template>
  <div
    :class="{ _normalHeight_: true }"
    class="___relative editHistory"
    :id="data.valueData.testProjectId"
  >
    <div :class="{ eventCover: !headInput }"></div>
    <div class="modules_1_tableBox ___relative mt10">
      <p style="line-height: 16px" class="editHistoryProject">
        二、检测现场信息
      </p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black"
      >
        <div class="___relative borderBottom">
          <div style="width: 140px" class="borderRight">
            <div style="height: 32px">
              <div class="tc editHistoryTitle">设备名称</div>
            </div>
          </div>
          <div
            style="width: 190px; left: 141px"
            class="___absolute t0 Full borderRight"
          >
            <divModel
              v-model="data.valueData.deviceName"
              ref="deviceName"
              style="width: 100%; text-align: center; font-size: 12px"
              class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
            ></divModel>
          </div>
          <div
            style="width: 140px; left: 331px"
            class="___absolute t0 Full borderRight"
          >
            <div class="tc editHistoryTitle">设备型号</div>
          </div>
          <div style="width: 238px; right: 0" class="___absolute t0 Full">
            <divModel
              v-model="data.valueData.deviceModel"
              style="width: 100%; text-align: center"
              class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 140px" class="borderRight">
            <div style="height: 32px">
              <div class="tc editHistoryTitle">设备编号</div>
            </div>
          </div>
          <div
            style="width: 190px; left: 141px"
            class="___absolute t0 Full borderRight"
          >
            <divModel
              v-model="data.valueData.deviceNum"
              style="width: 100%; text-align: center"
              class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
            ></divModel>
          </div>
          <div
            style="width: 140px; left: 331px"
            class="___absolute t0 Full borderRight"
          >
            <div class="tc editHistoryTitle">生产厂家</div>
          </div>
          <div style="width: 238px; right: 0" class="___absolute t0 Full">
            <divModel
              v-model="data.valueData.manufacturer"
              style="width: 100%; text-align: center"
              class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 140px" class="borderRight">
            <div style="height: 35px">
              <div class="tc editHistoryTitle">主要参数</div>
            </div>
          </div>
          <div
            style="width: 190px; left: 141px"
            class="___absolute t0 Full borderRight editHistoryValue"
          >
            <div class="___absolute Full" style="width: 50%">
              <divModel
                v-model="data.valueData.mainParameterkV"
                :computers="
                  isInteger(data.valueData.mainParameterkV, 'mainParameterkV')
                "
                style="
                  width: 60%;
                  text-align: center;
                  height: 30px;
                  border-bottom: 1px solid black;
                "
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
              <span style="margin-left: 70%">kV</span>
            </div>
            <div class="___absolute Full" style="width: 50%; left: 50%">
              <divModel
                :computers="
                  isInteger(data.valueData.mainParametermA, 'mainParametermA')
                "
                v-model="data.valueData.mainParametermA"
                style="
                  width: 60%;
                  text-align: center;
                  border-bottom: 1px solid black;
                  height: 30px;
                "
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
              <div style="margin-left: 50%">
                <!-- 为了取到innerText值，留修改记录 -->
                <span v-show="false">{{
                  data.valueData.mainParametermAutil
                }}</span>
                <selectModel
                  @returnVal="changeMainParametermAutil"
                  :Judge="true"
                  :special="1"
                  :receive="''"
                  :single="true"
                  :rows="false"
                  :transmitText="data.valueData.mainParametermAutil"
                  :list="['mA', 'mAs']"
                  :Obj="''"
                ></selectModel>
              </div>
            </div>
          </div>
          <div
            style="width: 140px; left: 331px"
            class="___absolute t0 Full borderRight"
          >
            <div class="tc editHistoryTitle">所在场所</div>
          </div>
          <div style="width: 238px; right: 0" class="___absolute t0 Full">
            <divModel
              v-model="data.valueData.location"
              style="width: 100%; text-align: center"
              class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 140px" class="___absolute t0 Full borderRight">
            <div style="height: 32px">
              <div class="tc heightCenter3">球管编号</div>
            </div>
          </div>
          <div
            style="width: 190px; left: 141px"
            class="___absolute t0 Full borderRight"
          >
            <div class="heightCenter3">
              <divModel
                v-if="ableInput"
                v-model="data.valueData.ballNum"
                style="width: 100%; text-align: center; height: 32px"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
              <div style="width: 100%; text-align: center" v-else>
                {{ data.valueData.ballNum }}
              </div>
            </div>
          </div>
          <div
            style="width: 140px; left: 331px"
            class="___absolute t0 Full borderRight"
          >
            <div class="tc heightCenter3">设备类型</div>
          </div>
          <div
            style="width: 238px; left: 471px; min-height: 32px"
            class="___relative"
          >
            <div v-for="(item, index) in deviceType" class="___relative ml5">
              <el-radio
                :disabled="!ableInput"
                @change="radio"
                v-model="data.valueData.deviceType"
                :label="item"
              ></el-radio>
            </div>
          </div>
        </div>
        <div v-for="(item, index) in data.valueData.point">
          <div class="___relative borderBottom">
            <div :class="{ eventCover: !ableInput }"></div>
            <div style="width: 140px" class="borderRight">
              <div style="height: 32px">
                <div class="tc">曝光模式</div>
              </div>
            </div>
            <div
              style="width: 190px; left: 141px"
              class="___absolute t0 Full borderRight"
            >
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="1 + '-' + index"
                :receive="'exposureMode'"
                :single="true"
                :rows="false"
                :transmitText="item.exposureMode"
                :list="exposureModeList"
                :Obj="'name'"
              ></selectModel>
            </div>
            <div
              style="width: 140px; left: 331px"
              class="___absolute t0 Full borderRight"
            >
              <div class="tc">有用线束方向</div>
            </div>
            <div style="width: 238px; right: 0" class="___absolute t0 Full">
              <divModel
                v-model="item.harnessDirection"
                style="width: 100%; text-align: center"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>

            <div
              class="__functionBox"
              v-if="
                index != data.valueData.point.length - 1 &&
                ipdTemplate == 'ipdTemplate' &&
                target == 0
              "
              style="top: 0px; right: -70px; width: 20px; z-index: 100"
            >
              <div
                class="__functionButton6"
                @dblclick.stop="reduce(index)"
                style="right: 0"
              >
                <span>-</span>
              </div>
              <div class="___absolute" style="right: -200px">
                <el-checkbox v-model="data.valueData.point[index].checked"
                  >机房屏蔽体现场调查</el-checkbox
                >
              </div>
            </div>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div :class="{ eventCover: !ableInput }"></div>
          <div style="width: 140px" class="___absolute t0 Full borderRight">
            <div class="tc heightCenter3">设备状态</div>
          </div>
          <div
            style="width: 190px; left: 141px"
            class="___absolute t0 Full borderRight"
          >
            <div
              class="tc heightCenter3"
              v-if="data.valueData.deviceStatus != ''"
            >
              {{ data.valueData.deviceStatus }}
            </div>
          </div>
          <div
            style="width: 140px; left: 331px"
            class="___absolute t0 Full borderRight"
          >
            <div class="tc heightCenter3">设备操作方式</div>
          </div>
          <div style="width: 238px; left: 472px" class="___relative">
            <div style="height: 170px; margin-left: 10px">
              <div>
                <el-checkbox
                  label="隔室操作"
                  v-model="data.valueData.operationMode[0]"
                  :disabled="data.valueData.operationMode[1] ? true : false"
                ></el-checkbox>
              </div>
              <div>
                <el-checkbox
                  @change="show"
                  label="同室操作"
                  :disabled="data.valueData.operationMode[0] ? true : false"
                  v-model="data.valueData.operationMode[1]"
                ></el-checkbox>
              </div>
              <div style="margin-left: 10px">
                <div class="___relative">
                  <el-radio
                    :disabled="!data.valueData.operationMode[1]"
                    v-model="data.valueData.sonOperation"
                    label="介入操作"
                  ></el-radio>
                  <div
                    class="___absolute t0"
                    :style="{
                      left: '120px',
                      color:
                        data.valueData.sonOperation === '介入操作'
                          ? ''
                          : '#C0C4CC',
                    }"
                  >
                    <span>术者数量(</span>
                    <divModel
                      v-model="data.valueData.surgeonNum"
                      v-if="data.valueData.sonOperation === '介入操作'"
                      style="
                        width: 30px;
                        height: 32px;
                        text-align: center;
                        left: 56px;
                      "
                      class="warp2 rowsInput2 hide focusBg ___absolute t0"
                    ></divModel>
                    <span class="___relative" style="left: 30px">)</span>
                  </div>
                </div>
                <div class="___relative">
                  <el-radio
                    v-model="data.valueData.sonOperation"
                    :disabled="!data.valueData.operationMode[1]"
                    label="近台同室操作"
                  ></el-radio>
                  <div
                    class="___absolute t0"
                    :style="{
                      left: '120px',
                      color:
                        data.valueData.sonOperation === '近台同室操作'
                          ? ''
                          : '#C0C4CC',
                    }"
                  >
                    <span>术者数量(</span>
                    <divModel
                      v-model="data.valueData.surgeonNum"
                      v-if="data.valueData.sonOperation === '近台同室操作'"
                      style="
                        width: 30px;
                        height: 32px;
                        text-align: center;
                        left: 56px;
                      "
                      class="warp2 rowsInput2 hide focusBg ___absolute t0"
                    ></divModel>
                    <span class="___relative" style="left: 30px">)</span>
                  </div>
                </div>
                <div>
                  <el-radio
                    v-model="data.valueData.sonOperation"
                    :disabled="!data.valueData.operationMode[1]"
                    label="非近台同室操作"
                  ></el-radio>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="___relative">
          <div style="width: 140px" class="borderRight">
            <div style="height: 32px">
              <div class="tc">现场环境</div>
            </div>
          </div>
          <div style="width: 100px; left: 141px" class="___absolute t0 Full">
            <divModel
              :computers="
                Fixed1(data.valueData.siteEnvironment, 'siteEnvironment')
              "
              v-model="data.valueData.siteEnvironment"
              style="
                width: 100%;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
                margin-left: 5px;
              "
              class="Full warp2 rowsInput2 hide focusBg"
            ></divModel>
          </div>
          <div style="width: 50px; left: 241px" class="___absolute t0 Full">
            °C
          </div>

          <div style="width: 100px; left: 291px" class="___absolute t0 Full">
            <divModel
              :computers="
                Fixed1(data.valueData.siteEnvironment2, 'siteEnvironment2')
              "
              v-model="data.valueData.siteEnvironment2"
              style="
                width: 100%;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
                margin-left: 5px;
              "
              class="Full warp2 rowsInput2 hide focusBg"
            ></divModel>
          </div>
          <div style="width: 50px; left: 391px" class="___absolute t0 Full">
            ％Rh
          </div>

          <div style="width: 100px; left: 441px" class="___absolute t0 Full">
            <divModel
              :computers="
                Fixed1(data.valueData.siteEnvironment3, 'siteEnvironment3')
              "
              v-model="data.valueData.siteEnvironment3"
              style="
                width: 100%;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
                margin-left: 5px;
              "
              class="Full warp2 rowsInput2 hide focusBg"
            ></divModel>
          </div>
          <div style="width: 50px; left: 551px" class="___absolute t0 Full">
            kPa
          </div>
        </div>
      </div>

      <div
        class="__functionBox"
        :style="{
          right: '-95px',
          width: '53px',
          top: data.valueData.point.length * 33 + 140 + 'px',
        }"
        v-if="ipdTemplate == 'ipdTemplate' && target == 0"
      >
        <!-- ******** 功能模块 ********** -->
        <div
          class="__functionButton6"
          @dblclick="reduce(data.valueData.point.length - 1)"
          style="right: 30px"
        >
          <span>-</span>
        </div>

        <div class="__functionButton6" @click="increase">
          <span>+</span>
        </div>
        <div class="___absolute" style="right: -177px">
          <el-checkbox
            v-model="
              data.valueData.point[data.valueData.point.length - 1].checked
            "
            >机房屏蔽体现场调查</el-checkbox
          >
        </div>
      </div>
      <div
        class="__functionBox tc"
        style="right: -75px; width: 30px"
        v-if="ipdTemplate == 'ipdTemplate' && target == 0"
      >
        <div
          class="__functionButton6"
          @click="sure(true)"
          style="right: 5px; font-size: 14px"
        >
          <span class="el-icon-search"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQueryByDeviceTypeName } from "@/api/local";
import { mapState } from "vuex";
import modules from "@/components/makemodule/thisData/dataJs/modules.js";

export default {
  data() {
    return {
      deviceData: "",
      patternIndex: "",
      deviceType: [],
      exposureModeList: [],
      modules: modules,
      testing: "",
      checked: true,
    };
  },
  props: [
    "ipdTemplate",
    "data",
    "pageNumber",
    "thisPageIndex",
    "importData",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "task",
    "target",
    "headInput",
  ],
  methods: {
    // 是不是整数
    isInteger(val, type) {
      // if (val % 1 !== 0) {
      //   this.$nextTick(() => {
      //     this.data.valueData[type] = "";
      //     this.$message.warning("请输入整数");
      //   });
      // }
    },
    // 保留一位小数，不足补0
    Fixed1(val, type) {
      if (this.data.valueData[type]) {
        this.data.valueData[type] = this.IntegerAdd0(
          Number(this.data.valueData[type]).toFixed46(1)
        );
      }
    },
    increase() {
      let obj = {
        exposureMode: "",
        harnessDirection: "",
        checked: true,
      };
      this.data.valueData.point.push(obj);
      this.$emit("redefinition");
    },
    reduce() {
      if (this.data.valueData.point.length > 1) {
        this.data.valueData.point.splice(
          this.data.valueData.point.length - 1,
          1
        );
        this.$emit("redefinition");
      }
      let result = this.data.valueData.point.findIndex(
        (v) =>
          v.exposureMode === "DR摄影" ||
          v.exposureMode === "CR摄影" ||
          v.exposureMode === "屏片摄影" ||
          v.exposureMode === "点片摄影"
      );
      if (result !== -1) {
        this.$store.dispatch("actionsJudgePhotography", true);
      } else {
        this.$store.dispatch("actionsJudgePhotography", false);
      }
    },

    checkField(Judge) {
      let arr = this.data.checkField;
      let arr2 = [];
      arr.forEach((item) => {
        let key = Object.keys(item);
        let mykey = key[0];
        if (this.data.valueData.hasOwnProperty(mykey)) {
          if (this.data.valueData[mykey] === "") {
            arr2.push(item[mykey]);
          } else if (this.data.valueData[mykey] instanceof Array) {
            let result = this.data.valueData[mykey].every(
              (item) => item === "" || item === false
            );
            if (result) {
              arr2.push(item[mykey]);
            }
          }
        } else if (this.data.valueData["point"][0].hasOwnProperty(mykey)) {
          this.data.valueData["point"].forEach((item2) => {
            if (item2[mykey] === "") {
              arr2.push(item[mykey]);
            }
          });
        }
      });
      if (arr2.length <= 0) {
        return true;
      } else {
        if (Judge) {
          this.$notify({
            type: "warning",
            message: `${arr2.toString()}未填写！`,
          });
        }
        return false;
      }
    },
    getList() {
      if (this.$route.params.target == 0) {
        let res = this.importData.getQueryByDeviceTypeName;
        dataInit(res, this);
      } else {
        getQueryByDeviceTypeName({ deviceTypeName: this.deviceTypeName }).then(
          (res) => {
            dataInit(res, this);
          }
        );
      }
      function dataInit(res, that) {
        if (res.success) {
          if (res.datas.length > 0) {
            that.deviceData = res.datas[0];
            that.deviceType = [...res.datas[0].types.map((x) => x.name)];
            if (that.data.valueData.deviceType != "") {
              that.radio();
            }
          }
        } else {
          console.log("失败 /queryWhereMaterial", res.msg);
        }
      }
    },
    radio() {
      this.exposureModeList = this.deviceData.types.find(
        (v) => v.name === this.data.valueData.deviceType
      ).exposures;
      // if (this.data.valueData.point.length > this.exposureModeList.length) {
      if (this.exposureModeList.length == 0) {
        let obj = {
          exposureMode: "",
          harnessDirection: "",
          checked: true,
        };
        this.data.valueData.point = [obj];
      }
      this.$store.commit("UPDATE_DEVICETYPE", this.data.valueData.deviceType);
      this.$forceUpdate();
    },
    returnVal(val, obj, special) {
      if (special.split("-")[0] == 1) {
        this.data.valueData.point[special.split("-")[1]][obj] = val;
      } else {
        this.data.valueData[obj] = val;
      }
      if (obj === "exposureMode") {
        this.setGzltj();
      }
    },
    sure(Judge) {
      let result = this.checkField(Judge);
      if (!result) {
        return;
      }
      let StomatologyLinkage = this.$store.state.StomatologyLinkage;
      if (
        StomatologyLinkage.deviceFactor ||
        StomatologyLinkage.deviceFactor2 ||
        StomatologyLinkage.deviceFactorObj
      ) {
      } else {
        this.$message.error("您未选择仪器");
        return;
      }
      if (StomatologyLinkage.purposeFH == "") {
        this.$message.error("您未选择防护仪器");
        return;
      }
      // this.$store.commit('saveClear')
      if (this.data.valueData.surgeonNum != "") {
        if (this.data.valueData.surgeonNum <= 10) {
          let dataArr = [];
          let indexStr = [
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
            "七",
            "八",
            "九",
            "十",
          ];
          this.jsonString.forEach((item, index) => {
            if (item.data.name === "projcet_szwjcjlmknr") {
              item.data.height._normal.carried = true;
              item.data.valueData.point.forEach((val, num) => {
                if (val.rows[0] != "") {
                  dataArr.push(val);
                }
              });
            }
            if (item.data.name === "projcet_szwjcjlmkt") {
              item.data.height._normal.carried = true;
            }
          });
          let existing = dataArr.length / 5;
          let needNum = 0;
          let completeArr = [];

          if (existing < this.data.valueData.surgeonNum) {
            completeArr = [...dataArr];
            needNum = this.data.valueData.surgeonNum - existing;
            for (let i = 0; i < needNum; i++) {
              let num = indexStr[i];
              let rows = [
                {
                  rows: [
                    "第" + num + "术者位距地面20cm（足部）",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ],
                },
                {
                  rows: [
                    "第" + num + "术者位距地面80cm（下肢）",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ],
                },
                {
                  rows: [
                    "第" + num + "术者位距地面105cm（腹部）",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ],
                },
                {
                  rows: [
                    "第" + num + "术者位距地面125cm（胸部）",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ],
                },
                {
                  rows: [
                    "第" + num + "术者位距地面155cm（头部）",
                    "",
                    "",
                    "",
                    "",
                    "",
                  ],
                },
              ];
              completeArr.push(...rows);
            }
          } else {
            let needNum = this.data.valueData.surgeonNum * 5;
            completeArr = JSON.myParse(
              JSON.stringify(dataArr.slice(0, needNum))
            );
          }
          this.projectSure(completeArr);
        } else {
          this.err("术者不能大于十位");
        }
      } else {
        this.projectSure([]);
      }
      this.setResolvingPower();
    },
    setResolvingPower() {
      let data = [];
      this.data.valueData.point.forEach((item, index) => {
        if (item.exposureMode != "") {
          if (
            item.exposureMode === "全景扫描" ||
            item.exposureMode === "头颅摄影"
          ) {
            if (item.exposureMode === "全景扫描") {
              data.push("全景摄影");
            } else {
              data.push(item.exposureMode);
            }
          }
        }
      });

      data = Array.from(new Set(data));

      if (this.task.deviceTypeName.indexOf("口内牙片") !== -1) {
        data.unshift("口内牙片摄影");
      }
      setTimeout(() => {
        this.$store.dispatch("actionsResolvingPower", data);
      }, 1500);
    },

    setGzltj() {
      let result = this.data.valueData.point.findIndex(
        (v) =>
          v.exposureMode === "DR摄影" ||
          v.exposureMode === "CR摄影" ||
          v.exposureMode === "屏片摄影" ||
          v.exposureMode === "点片摄影"
      );
      if (result !== -1) {
        this.$store.dispatch("actionsJudgePhotography", true);
      } else {
        this.$store.dispatch("actionsJudgePhotography", false);
      }
      let gzltjs = this.jsonString.filter(
        (item) => item.to === "projcet_gzltj"
      );
      if (result !== -1) {
        gzltjs.forEach((item) => {
          item.data.height._normal.carried = true;
        });
      } else {
        gzltjs.forEach((item) => {
          item.data.height._normal.carried = false;
        });
      }
      this.$forceUpdate();
      this.$emit("redefinition");
    },
    projectSure(completeArr, flag) {
      let dataArr = [];
      let usedData = [];
      let newData = [];
      let lastData = this.jsonString.filter(
        (item, index) =>
          item.to === "projcet_jcbt" ||
          item.to === "projcet_jcbnr" ||
          item.to === "projcet_jgyst" ||
          item.to === "projcet_jgysnr"
      );
      this.jsonString.forEach((item, index) => {
        if (item.data.name === "project_jcxcxx") {
          // dataArr.push(...item.data.valueData.point.filter((a) => a.checked));
          dataArr = item.data.valueData.point;
        }
        if (
          item.to === "projcet_jcbt" ||
          item.to === "projcet_jcbnr" ||
          item.to === "projcet_jgyst" ||
          item.to === "projcet_jgysnr"
        ) {
          // this.jsonString.splice(index, 1);
        } else {
          usedData.push(item);
        }
      });
      let pointNum = dataArr.length;
      let projcetName = [
        "projcet_jcbt",
        "projcet_jcbnr",
        "projcet_jgyst",
        "projcet_jgysnr",
      ];
      let projcetArr = [];
      projcetName.forEach((item, index) => {
        let result = this.modules.find((mod) => mod.name === item);
        projcetArr.push(JSON.myParse(JSON.stringify(result)));
        projcetArr[index].height = result.height;
      });
      let double = false;
      if (
        this.purposeDetection === "豁免检测" ||
        this.purposeDetection === "环保验收"
      ) {
        double = true;
        projcetArr[0].height._normal.carried = false;
        projcetArr[1].height._normal.carried = false;
        projcetArr[2].height._normal.carried = true;
        projcetArr[3].height._normal.carried = true;

        projcetArr[0].height._normal.disable = true;
        projcetArr[1].height._normal.disable = true;
        projcetArr[2].height._normal.disable = false;
        projcetArr[3].height._normal.disable = false;
      } else {
        double = false;
        projcetArr[0].height._normal.carried = true;
        projcetArr[1].height._normal.carried = true;
        projcetArr[2].height._normal.carried = false;
        projcetArr[3].height._normal.carried = false;
        projcetArr[0].height._normal.disable = false;
        projcetArr[1].height._normal.disable = false;
        projcetArr[2].height._normal.disable = true;
        projcetArr[3].height._normal.disable = true;
      }
      if (flag === 1) {
        setTimeout(() => {
          this.$emit("refre");
        }, 10);
      }
      for (let i = 0; i < pointNum; i++) {
        projcetArr[0].valueData.deviceState = "开机";
        projcetArr[0].valueData.exposureMode = dataArr[i].exposureMode;
        projcetArr[1].valueData.exposureMode = dataArr[i].exposureMode;
        projcetArr[2].valueData.exposureMode = dataArr[i].exposureMode;
        projcetArr[3].valueData.exposureMode = dataArr[i].exposureMode;
        projcetArr[0].valueData.harnessDirection = dataArr[i].harnessDirection;
        projcetArr[0].valueData.checked = dataArr[i].checked;
        let jcbt = JSON.myParse(
          JSON.stringify({
            to: projcetArr[0].name,
            type: null,
            data: projcetArr[0],
          })
        );
        let jcbnr = JSON.myParse(
          JSON.stringify({
            to: projcetArr[1].name,
            type: null,
            data: projcetArr[1],
          })
        );

        let completed = [];
        projcetArr[2].valueData.exposureMode = dataArr[i].exposureMode;
        projcetArr[2].valueData.harnessDirection = dataArr[i].harnessDirection;
        projcetArr[2].valueData.checked = dataArr[i].checked;
        let jgyst = JSON.myParse(
          JSON.stringify({
            to: projcetArr[2].name,
            type: null,
            data: projcetArr[2],
          })
        );
        let jgysnr = JSON.myParse(
          JSON.stringify({
            to: projcetArr[3].name,
            type: null,
            data: projcetArr[3],
          })
        );

        jcbt.data.valueData.multipleId = i;
        jcbnr.data.valueData.multipleId = i;
        if (double) {
          completed = JSON.myParse(
            JSON.stringify([jgyst, jgysnr, jgyst, jgysnr])
          );
          completed[0].data.valueData.multipleId = i;
          completed[0].data.valueData.deviceState = "开机";
          completed[2].data.valueData.deviceState = "关机";
        } else {
          completed = JSON.myParse(JSON.stringify([jgyst, jgysnr]));
          completed[0].data.valueData.deviceState = "开机";
        }
        newData.push(jcbt, jcbnr, ...completed);
      }
      newData.forEach((item, index) => {
        if (item.to === "projcet_jgyst") {
          item.data.valueData.multipleId = index;
          if (
            newData[index + 1] &&
            newData[index + 1].to === "projcet_jgysnr"
          ) {
            newData[index + 1].data.valueData.multipleId = index;
          }
        }
        item.data.height = projcetArr.find(
          (val, num) => val.name === item.to
        ).height;
      });
      let insertIndex = usedData.findIndex(
        (item, index) =>
          item.to === "projcet_gzltj" || item.to === "projcet_szpbt"
      );
      if (lastData.length > 0) {
        lastData.forEach((item, index) => {
          let obj = newData.find(
            (val, num) =>
              val.to === item.to &&
              val.data.valueData.multipleId === item.data.valueData.multipleId
          );
          if (
            obj &&
            (item.to === "projcet_jcbt" || item.to === "projcet_jgyst")
          ) {
            obj.data.valueData = item.data.valueData;
          }
        });

        newData.forEach((item, index) => {
          let obj = lastData.filter(
            (val, num) =>
              val.to === item.to &&
              val.data.valueData.multipleId === item.data.valueData.multipleId
          );
          if (
            obj.length > 0 &&
            obj[0].data.valueData.multipleId ===
              item.data.valueData.multipleId &&
            (item.to === "projcet_jcbnr" || item.to === "projcet_jgysnr")
          ) {
            item.data.valueData = obj[0].data.valueData;
            item.data.valueData.point = JSON.parse(
              JSON.stringify(
                [
                  ...obj.map((v, i) =>
                    v.data.valueData.point.filter((k, l) => k.rows[0] !== "")
                  ),
                ].flat()
              )
            );
          }
          if (
            item.data.valueData.point.length === 0 &&
            (item.to === "projcet_jcbnr" || item.to === "projcet_jgysnr")
          ) {
            let data = JSON.parse(
              JSON.stringify({ rows: ["", "", "", "", "", "", "", "", ""] })
            );
            item.data.valueData.point.push(data);
          }
        });
      }
      if (insertIndex !== -1) {
        usedData.splice(insertIndex + 1, 0, ...newData);
      }
      let delarr = [];
      dataArr.forEach((item, index) => {
        usedData.forEach((a, b) => {
          if (
            !item.checked &&
            item.exposureMode == a.data.valueData.exposureMode
          ) {
            delarr.push(b);
          }
          // console.log(item.data.valueData.multipleId)
        });
      });
      if (delarr.length) {
        let maxdel = Math.max(...delarr);
        let mindel = Math.min(...delarr);
        let dellength = maxdel - mindel + 1;
        usedData.splice(mindel, dellength);
      }
      this.$emit("changeJson", [...usedData]);

      // this.$store.dispatch("actionsClear", completeArr);
      this.$store.dispatch("actionsSetTestprojectId", true);
      this.$store.dispatch("actionsSurgeon");
      if (completeArr.length > 0) {
        this.$store.dispatch("actionsSurgeonArr", completeArr);
      }

      if (flag !== 1) {
        this.importData.isCreate = true;

        this.$notify({
          type: "success",
          message: "生成成功",
        });
      }
      this.$emit("redefinition");
    },
    err(msg) {
      this.$message({
        type: "error",
        message: msg,
      });
    },
    getIndex(index) {
      this.patternIndex = index;
    },
    show() {
      this.data.valueData.sonOperation = "";
      this.$emit("redefinition");
    },

    changeMainParametermAutil(val) {
      this.data.valueData.mainParametermAutil = val;
    },
    deviceNameInit(val) {
      val.length >= 15
        ? (this.$refs.deviceName.$el.style.lineHeight = "16px")
        : (this.$refs.deviceName.$el.style.lineHeight = "32px");
    },
  },
  computed: {
    ...mapState({
      purposeDetection: (state) => state.StomatologyLinkage.purposeDetection,
    }),
    deviceTypeName() {
      return this.jsonString.find((item) => item.to === "project_jbxx").data
        .valueData.detectionObjects;
    },
  },
  watch: {
    purposeDetection(val) {
      if (this.target == 0) {
        console.log(val)
        let deviceStatus = "";
        if (val === "豁免检测" || val === "环保验收") {
          deviceStatus = "开机，关机";
        } else {
          deviceStatus = "开机";
        }
        this.$set(this.data.valueData, "deviceStatus", deviceStatus);
        this.sure(false);
      }
    },
    "data.valueData.sonOperation": function (val) {
      if (this.target == 0) {
        this.data.valueData.surgeonNum = "";
      }
    },
    "data.valueData.operationMode": function (val) {
      if (!val[1]) {
        this.data.valueData.surgeonNum = "";

        this.jsonString.forEach((item, index) => {
          if (item.data.name === "projcet_szwjcjlmknr") {
            item.data.height._normal.carried = false;
          }
          if (item.data.name === "projcet_szwjcjlmkt") {
            item.data.height._normal.carried = false;
          }
        });
      }
    },
    "data.valueData.deviceName": function (val) {
      this.deviceNameInit(val);
    },
  },
  mounted() {
    this.deviceNameInit(this.data.valueData.deviceName);
    this.getList();
    this.setGzltj();
    setTimeout(() => {
      if (this.deviceType.length == 1) {
        this.data.valueData.deviceType = this.deviceType[0];
        this.exposureModeList = this.deviceData.types.find(
          (v) => v.name === this.data.valueData.deviceType
        ).exposures;
        // if (this.data.valueData.point.length > this.exposureModeList.length) {
        if (this.exposureModeList.length == 0) {
          let obj = {
            exposureMode: "",
            harnessDirection: "",
            checked: true,
          };
          this.data.valueData.point = [obj];
        }
      }
    }, 1000);
  },
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
