<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !headInput }"></div>
      <div class="modules_1_tableBox ___relative mt20 editHistory">
        <div class="___relative tc">
          <p style="font-size: 24px;">
            深圳市瑞达检测技术有限公司<br />检测原始记录
          </p>
        </div>
        <p style="line-height: 16px;">一、基本信息</p>
        <p style="line-height: 16px;" class="editHistoryProject">
          1.1委托单位信息
        </p>
        <div
          class="___relative ___module_frame_Box"
          style="border-top: solid 1px black;"
        >
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc editHistoryTitle">委托单位名称</div>
              </div>
            </div>
            <div style="width: 619px; left: 91px;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.entrustedUnitName"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
              ></divModel>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc editHistoryTitle">受检单位名称</div>
              </div>
            </div>
            <div style="width: 619px; left: 91px;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.UnitExaminationName"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
              ></divModel>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc editHistoryTitle">受检单位地址</div>
              </div>
            </div>
            <div style="width: 619px; left: 91px;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.UnitExaminationAddress"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg editHistoryValue"
              ></divModel>
            </div>
          </div>
          <div class="___relative">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc">检测对象</div>
              </div>
            </div>
            <div
              style="width: 260px; left: 91px;"
              class="___absolute t0 Full borderRight"
            >
              <divModel
                v-model="data.valueData.detectionObjects"
                :edit="false"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
            <div
              style="width: 140px; left: 351px;"
              class="___absolute t0 Full borderRight"
            >
              <div class="tc">检测目的</div>
            </div>
            <div style="width: 218px; right: 0;" class="___absolute t0 Full">
              <!--<selectModel @returnVal="returnVal"
													 :receive="'purposeDetection'"
													 :single="true"
													 :rows="false"
													 :list="objectiveList"
													 :transmitText="data.valueData.purposeDetection"
													 :Judge="true"
													 :Obj="''"></selectModel>-->
              <!-- <myInput></myInput>-->
              <div style="text-align: center;">
                {{ data.valueData.purposeDetection }}
              </div>
            </div>
          </div>
        </div>
        <p style="line-height: 16px;">1.2检测机构信息</p>
        <div
          class="___relative ___module_frame_Box"
          style="border-top: solid 1px black;"
        >
          <div :class="{ eventCover: !ableInput }"></div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc">机构名称</div>
              </div>
            </div>
            <div style="width: 619px; left: 91px;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.organizationName"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc">机构地址</div>
              </div>
            </div>
            <div style="width: 619px; left: 91px;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.institutionalAddress"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc">营业执照编号</div>
              </div>
            </div>
            <div
              style="width: 260px; left: 91px;"
              class="___absolute t0 Full borderRight"
            >
              <divModel
                v-model="data.valueData.licenseNumber"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
            <div
              style="width: 140px; left: 351px;"
              class="___absolute t0 Full borderRight"
            >
              <div class="tc">计量认证证书</div>
            </div>
            <div style="width: 218px; right: 0;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.metrologyCertificate"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div style="height: 32px;">
                <div class="tc">检测时间</div>
              </div>
            </div>
            <div style="width: 619px; left: 91px;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.detectionTime"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="___absolute t0 Full borderRight">
              <div class="tc" style="line-height: 254px;">检测依据</div>
            </div>
            <div
              style="width: 619px; left: 91px; height: 254px;"
              class="___relative t0"
            >
              <div
                :style="{
                  lineHeight: data.valueData.fontSize + 2 + 'px',
                  wordBreak: 'break-all',
                  whiteSpace: 'pre-wrap',
                  fontSize: data.valueData.fontSize + 'px',
                  paddingLeft: '10px',
                }"
                v-html="
                  getStanard(
                    data.valueData.samplingPersonnel.replace(/\s*/g, '')
                  )
                "
              ></div>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="___absolute t0 Full borderRight">
              <div class="tc" style="line-height: 54px;">评价依据</div>
            </div>
            <div
              style="width: 619px; left: 91px; height: 54px;"
              class="___relative t0"
            >
              <div
                style="
                  line-height: 8px;
                  word-break: break-all;
                  white-space: pre-wrap;
                  font-size: 12px;
                "
              >
                {{ data.valueData.assessArr }}
              </div>
            </div>
          </div>
          <div class="___relative borderBottom">
            <div style="width: 90px;" class="borderRight">
              <div class="tc">检测/采样人员</div>
            </div>
            <div style="width: 619px; left: 91px;" class="___absolute t0 Full">
              <divModel
                v-model="data.valueData.detectionBasis"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
          </div>
          <div class="___relative">
            <div :class="{ eventCover: !ableInput }"></div>
            <div style="width: 90px;" class="borderRight ___absolute t0 Full">
              <div class="tc heightCenter3" style="cursor: pointer;">
                主要检测仪器
              </div>
            </div>
            <div style="width: 621px; left: 90px;" class="___relative">
              <div class="___relative borderBottom">
                <div style="width: 120px;" class="tc borderRight ___relative">
                  <span>名称</span>
                </div>
                <div
                  style="width: 80px; left: 120px;"
                  class="tc borderRight ___absolute t0"
                >
                  <span>型号</span>
                </div>
                <div
                  style="width: 110px; left: 200px;"
                  class="tc borderRight ___absolute t0"
                >
                  <span>编号</span>
                </div>
                <div
                  style="width: 200px; left: 310px;"
                  class="tc borderRight ___absolute t0"
                >
                  <span>检定/校准证书</span>
                </div>
                <div style="width: 110px; right: 0;" class="tc ___absolute t0">
                  <span>检定/校准有效期</span>
                </div>
              </div>
              <div
                class="___relative"
                :class="
                  index != data.valueData.point.length - 1 ? 'borderBottom' : ''
                "
                @click="nowItem = item"
                style="line-height: 14px;"
                v-for="(item, index) in data.valueData.point"
              >
                <div
                  style="
                    width: 120px;
                    word-break: break-all;
                    white-space: pre-wrap;
                  "
                  class="tc borderRight ___relative"
                >
                  <div style="height: 32px;">{{ item.rows[0] }}</div>
                </div>
                <div
                  style="width: 80px; left: 120px;"
                  class="tc Full borderRight ___absolute t0"
                >
                  <div style="word-break: break-all;">
                    {{ item.rows[1] }}
                  </div>
                </div>
                <div
                  style="width: 110px; left: 200px;"
                  class="tc Full borderRight ___absolute t0"
                >
                  <div style="height: 32px;">
                    <p>{{ item.rows[2] && item.rows[2][1] }}</p>
                    <p v-if="item.rows[2][1] !== item.rows[2][0]">
                      {{ item.rows[2] && item.rows[2][0] }}
                    </p>
                  </div>
                </div>
                <div
                  style="width: 200px; left: 310px;"
                  class="tc Full borderRight ___absolute t0"
                >
                  <div style="height: 32px;">
                    <p>{{ item.rows[3] && item.rows[3][0] }}</p>
                    <p v-if="item.rows[3][0] !== item.rows[3][1]">
                      {{ item.rows[3] && item.rows[3][1] }}
                    </p>
                  </div>
                </div>
                <div
                  style="width: 110px; right: 0;"
                  class="tc Full ___absolute t0"
                >
                  <div style="height: 32px;">
                    <p>{{ item.rows[4] && item.rows[4][0] | filterTime }}</p>
                    <p v-if="item.rows[4][1] !== item.rows[4][0]">
                      {{ item.rows[4] && item.rows[4][1] | filterTime }}
                    </p>
                  </div>
                </div>
                <div
                  style="width: 150px; right: -90px;"
                  class="tc Full ___absolute t0"
                >
                  <i
                    v-if="target == 0 && ableInput"
                    class="el-icon-close"
                    style="cursor: pointer;"
                    v-show="showDel(item)"
                    @click="clearRow(item)"
                  ></i>
                </div>
                <div
                  style="width: 150px; right: -200px;"
                  class="tc Full ___absolute t0"
                  v-show="true && target == 0 && ableInput"
                >
                  <el-autocomplete
                    v-model="item.nowDevice"
                    size="mini"
                    @select="changeItemDevice"
                    :fetch-suggestions="getLocalDevice"
                    :trigger-on-focus="true"
                  >
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.deviceNum }}</div>
                    </template>
                  </el-autocomplete>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="target === '0'">
      <div class="___absolute tc" style="left: 760px; top: 400px;">
        <div class="btn2" @click="setFontSize(0)">放大</div>
      </div>
      <div class="___absolute tc" style="left: 820px; top: 400px;">
        <div class="btn2" @click="setFontSize(1)">缩小</div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryListType } from "@/api/local";
import { mapState } from "vuex";
export default {
  data() {
    return {
      index_jsonString: function () {
        // 获取当前模块在jsonString中的索引
        let result = this.thisPageIndex;
        for (let i = 0; i < this.pageNumber; i++) {
          result += this.showing[i].length;
        }
        return result;
      },
      objectiveList: [
        "环保验收",
        "卫生验收",
        "状态",
        "监督",
        "比对",
        "科研",
        "豁免检测",
        "新标准首次检测",
      ],
      devices: [],
      nowItem: "",
      showDevice: false,
    };
  },
  computed: {
    ...mapState({
      StomatologyLinkage: (state) => state.StomatologyLinkage,
    }),
  },
  props: [
    "ipdTemplate",
    "pageNumber",
    "data",
    "thisPageIndex",
    "jsonString",
    "showing",
    "importData",
    "watchSign",
    "isTemplate",
    "ableInput",
    "task",
    "target",
    "headInput",
  ],
  filters: {
    filterTime(time) {
      try {
        return time.split(" ")[0];
      } catch (e) {
        return "";
      }
    },
  },

  methods: {
    increase() {
      // let obj={};
      // this.data.valueData.point.push(obj);
      this.$emit("update:data");
    },
    returnVal(val, obj, special) {
      if (special == 1) {
        this.data.valueData.point[this.patternIndex][obj] = val;
      } else {
        this.data.valueData[obj] = val;
      }
      this.$store.dispatch("actionsPurposeDetection", val);
      this.$emit("redefinition");
    },

    getStanard(string) {
      let arr = string.split(",");
      let str = "";

      for (let i = 0; i < arr.length; i++) {
        str += `<p>${arr[i]}</p>`;
      }
      return str;
    },
    getLocalDevice(queryString, cb) {
      let res = this.importData.device;
      if (this.devices.length >= 0) {
        this.devices = res.data;
        let results = queryString
          ? this.devices.filter(
              (item) => item.deviceNum.indexOf(queryString) !== -1
            )
          : this.devices;
        cb(results);
      } else {
        this.$notify({
          type: "warning",
          message: "未绑定仪器",
        });
      }
    },

    changeItemDevice(rowObj) {
      let purpose = rowObj.purpose;
      if (purpose === "性能" || purpose === "防护") {
        let result = this.data.valueData.point.some((item) => {
          if (item.deviceObj) {
            return item.deviceObj.purpose === purpose;
          } else {
            return false;
          }
        });
        if (result) {
          this.$notify({
            type: "warning",
            message: "只能选择一台" + purpose + "设备！",
          });
          return;
        }

        if (purpose === "性能") {
          this.$store.dispatch("actionsDeviceFactor", rowObj.deviceFactor);
          this.$store.dispatch("actionsDeviceFactorObj", rowObj);
        } else if (purpose === "防护") {
          this.$store.commit("changePurposeFH", "防护");
          this.$store.dispatch("actionsDeviceFactor2", rowObj.deviceFactor);
        }
      }
      this.nowItem.purpose = purpose;
      this.nowItem.rows[0] = rowObj.deviceName;
      this.nowItem.rows[1] = rowObj.deviceModel;
      this.nowItem.rows[2] = [rowObj.probeNum, rowObj.deviceNum];
      this.nowItem.rows[3] = [rowObj.correctNum, rowObj.correctNum1];
      this.nowItem.rows[4] = [
        rowObj.correctTime && rowObj.correctTime.split(" ")[0],
        rowObj.correctTime1 && rowObj.correctTime1.split(" ")[0],
      ];
      this.nowItem.rows[5] = rowObj.id;
      this.nowItem.deviceFactor = rowObj.deviceFactor;
      this.nowItem.deviceObj = rowObj;
      this.$forceUpdate();
    },
    showDel(item) {
      if (
        item.rows[0] !== "" ||
        item.rows[1] !== "" ||
        item.rows[2] !== "" ||
        item.rows[3] !== "" ||
        item.rows[4] !== ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    setFontSize(flag) {
      if (flag === 0) {
        this.data.valueData.fontSize += 1;
      } else {
        this.data.valueData.fontSize -= 1;
      }
    },
    clearRow(item) {
      if (item.deviceObj.purpose == "性能") {
        this.$store.dispatch("actionsDeviceFactor", "");
        this.$store.dispatch("actionsDeviceFactorObj", "");
      } else if (item.deviceObj.purpose == "防护") {
        this.$store.commit("changePurposeFH", "");
        this.$store.dispatch("actionsDeviceFactor2", "");
      }

      item.rows[0] = "";
      item.rows[1] = "";
      item.rows[2] = "";
      item.rows[3] = "";
      item.rows[4] = "";
      item.deviceObj = {};

      this.$forceUpdate();
    },
  },
  mounted() {
    this.$store.dispatch(
      "actionsPurposeDetection",
      this.data.valueData.purposeDetection
    );

    let xnArr = this.data.valueData.point.filter(
      (item) => item.purpose == "性能"
    );
    if (xnArr.length) {
      // this.$store.dispatch("actionsDeviceFactor", xnArr[0].deviceFactor);
      this.$store.commit("saveDeviceFactor", xnArr[0].deviceFactor);
      this.$store.commit("saveDeviceFactorObj", xnArr[0].deviceObj);
      // this.$store.dispatch("actionsDeviceFactorObj",  xnArr[0].deviceObj);
    }
    let fhArr = this.data.valueData.point.filter(
      (item) => item.purpose == "防护"
    );
    if (fhArr.length) {
      this.$store.commit("changePurposeFH", "防护");
      this.$store.commit("saveDeviceFactor2", fhArr[0].deviceFactor);
    }
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
