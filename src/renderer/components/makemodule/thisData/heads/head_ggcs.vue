<template>
  <div>
    <div :class="{ eventCover: !headInput }"></div>
    <div class="___head_titleBox">
      {{ data.unit }}
      <br />
      {{ data.title }}
    </div>
    <div class="___head_sampleNumberBox">
      &nbsp;&nbsp;项目编号 : {{ data.projectNum }}
    </div>
    <div class="___relative editHistory">
      <div class="editHistoryProject"></div>
      <div class="modules_1_tableBox ___relative">
        <table class="myTable">
          <tr>
            <td class="editHistoryTitle">受检单位名称</td>
            <td colspan="10">
              <myInput
                style="text-align: center"
                class="editHistoryValue"
                v-model="data.valueData.checkUnitName"
              ></myInput>
            </td>
          </tr>
          <tr>
            <td class="editHistoryTitle">委托单位名称</td>
            <td colspan="10">
              <myInput
                class="editHistoryValue"
                style="text-align: center"
                v-model="data.valueData.clientUnitName"
              ></myInput>
              <!-- <span class="editHistoryValue">{{data.valueData.clientUnitName}}</span> -->
            </td>
          </tr>
          <tr>
            <td colspan="1" rowspan="2" class="editHistoryTitle">
              受检单位地址
            </td>
            <td colspan="6" rowspan="2" style="height: 64px !important">
              <textarea
                v-if="target == 0"
                style="
                  text-align: center;
                  height: 64px !important;
                  width: 98%;
                  border: none;
                  resize: none;
                "
                class="editHistoryValue"
                v-model="data.valueData.checkUnitAddress"
              />
              <span v-else>{{ data.valueData.checkUnitAddress }}</span>
            </td>
            <td colspan="2">检测对象</td>
            <td colspan="2">
              <myInput
                v-if="ableInput"
                style="text-align: center"
                v-model="data.valueData.deviceTypeName"
              ></myInput>
              <span v-else>{{ data.valueData.deviceTypeName }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="2">联系电话</td>
            <td colspan="2">
              <myInput
                v-if="ableInput"
                style="text-align: center"
                v-model="data.valueData.checkUnitPhone"
              ></myInput>
              <span v-else>{{ data.valueData.checkUnitPhone }}</span>
            </td>
          </tr>
          <tr style="height: 64px">
            <td>评价依据</td>
            <td
              style="text-align: left; padding: 4px"
              colspan="10"
              v-html="assess"
            ></td>
          </tr>
          <tr style="height: 64px">
            <td>采样依据</td>
            <td
              colspan="10"
              style="
                text-align: left;
                padding: 4px;
                word-break: break-all;
                white-space: pre-wrap;
              "
              v-html="standard"
            ></td>
          </tr>
          <!-- <tr style="height: 64px;">
					<td>检测依据</td>
					<td colspan="10" style="text-align: left; padding: 4px; word-break: break-all;white-space: pre-wrap; ">{{data.valueData.sysStandard}}</td>
					</tr>-->
        </table>
        <table class="myTable ___relative">
          <div :class="{ eventCover: !ableInput }"></div>
          <tr class="delLine" style="height: 40px; line-height: 20px">
            <td colspan="10" style="text-align: left">
              <div class="___relative">
                <div
                  class="___absolute"
                  style="top: -8px; left: 18px; width: 80px"
                >
                  现场调查
                </div>
                <div
                  class="___absolute"
                  style="top: -8px; left: 98px; width: 300px"
                >
                  <div class="___relative">
                    <div class="___absolute">（温湿度表仪器编号：</div>
                    <div
                      class="___absolute"
                      style="
                        left: 150px;
                        border-bottom: 1px solid black;
                        top: -6px;
                      "
                    >
                      <querySelect
                        v-model="data.valueData.deviceNum1"
                        v-if="target == 0"
                        ref="querySelect"
                        :list="getDevice('温湿度')"
                        @getSelectItem="
                          (val, index) => {
                            returnVal2(
                              val,
                              index,
                              'deviceNum1',
                              'deviceNumId1'
                            );
                          }
                        "
                        :defaultValue="data.valueData.deviceNum1"
                        :name="'deviceNum'"
                      ></querySelect>
                      <div v-else>{{ data.valueData.deviceNum1 | toDot }}</div>
                    </div>
                  </div>
                </div>
                <div
                  class="___absolute"
                  style="top: -8px; left: 418px; width: 100px"
                >
                  <div class="___relative">
                    <div class="___absolute">气压表仪器编号：</div>
                    <div
                      class="___absolute"
                      style="
                        top: -6px;
                        left: 118px;
                        width: 150px;
                        border-bottom: 1px solid black;
                      "
                    >
                      <querySelect
                        v-model="data.valueData.deviceNum2"
                        v-if="target == 0"
                        :list="getDevice('气压')"
                        @getSelectItem="
                          (val, index) => {
                            returnVal2(
                              val,
                              index,
                              'deviceNum2',
                              'deviceNumId2'
                            );
                          }
                        "
                        :defaultValue="data.valueData.deviceNum2"
                        :name="'deviceNum'"
                      ></querySelect>
                      <div v-else>{{ data.valueData.deviceNum1 | toDot }}</div>
                    </div>
                    <div class="___absolute" style="left: 280px">）</div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td style="width: 250px">采样/检测地点</td>
            <td>区域面积m²</td>
            <td>温度℃</td>
            <td>湿度%(RH)</td>
            <td>大气压kPa</td>
            <td>场所状态</td>
            <td>门窗状态</td>
            <td>通风情况</td>
            <td>照明情况</td>
            <td>备注</td>
          </tr>
          <tr
            v-for="(poi, index) in data.valueData.point"
            :key="poi.pointId"
            style="line-height: 32px"
          >
            <td>
              <divModel
                v-if="target === '0'"
                v-model="poi.sampleAddress"
              ></divModel>
              <span v-else>{{ poi.sampleAddress | toDot }}</span>
            </td>
            <!--采样/检测地点   :reg="'[^0-9/]'"-->
            <td>
              <divModel
                v-if="target === '0'"
                v-model="poi.areaArea"
                :isNumBox="true"
              ></divModel>
              <span v-else>{{ poi.areaArea | toDot }}</span>
            </td>
            <!--区域面积m2-->
            <td>
              <divModel
                v-if="target === '0'"
                v-model="poi.temperature"
                :isNumBox="true"
              ></divModel>
              <span v-else>{{ poi.temperature | toDot }}</span>
            </td>
            <!--温度-->
            <td>
              <divModel
                v-if="target === '0'"
                v-model="poi.relativeHumidity"
                :isNumBox="true"
              ></divModel>
              <span v-else>{{ poi.relativeHumidity | toDot }}</span>
            </td>
            <!--湿度-->
            <td>
              <divModel
                v-if="target === '0'"
                v-model="poi.atmosphericPressure"
                :isNumBox="true"
              ></divModel>
              <span v-else>{{ poi.atmosphericPressure | toDot }}</span>
            </td>
            <!--大气压hP-->
            <td>
              <div v-if="target == 0">
                <selectModel
                  @returnVal="changeDoorState"
                  :single="true"
                  :rows="false"
                  v-if="!poi.showInput"
                  style="border: none"
                  :special="index"
                  :Judge="true"
                  :input="false"
                  :receive="'localtionState'"
                  class="tc borderRight"
                  :transmitText="poi.localtionState"
                  :list="['空态', '静态', '动态', '自定义', '/']"
                  :Obj="''"
                ></selectModel>
                <myInput
                  v-else
                  v-model="poi.localtionState"
                  style="text-align: center"
                  @change.native="
                    (el) => {
                      noShowInput(el, poi, 'showInput');
                    }
                  "
                ></myInput>
              </div>
              <div v-else>{{ poi.localtionState }}</div>
            </td>
            <!--场所状态-->
            <td>
              <div v-if="target == 0">
                <selectModel
                  @returnVal="changeDoorState"
                  :single="true"
                  :rows="false"
                  style="border: none"
                  v-if="!poi.showInput2"
                  :special="index"
                  :Judge="true"
                  :input="false"
                  :receive="'doorState'"
                  class="tc borderRight"
                  :transmitText="poi.doorState"
                  :list="['全部打开', '部分打开', '全部关闭', '自定义', '/']"
                  :Obj="''"
                ></selectModel>
                <myInput
                  v-else
                  v-model="poi.doorState"
                  style="text-align: center"
                  @change.native="
                    (el) => {
                      noShowInput(el, poi, 'showInput2');
                    }
                  "
                ></myInput>
              </div>
              <div v-else>{{ poi.doorState }}</div>
            </td>
            <!--门窗状态-->
            <td>
              <div v-if="target == 0">
                <selectModel
                  @returnVal="changeDoorState"
                  :single="true"
                  :rows="false"
                  v-if="!poi.showInput3"
                  style="border: none"
                  :special="index"
                  :Judge="true"
                  :input="false"
                  :receive="'windState'"
                  class="tc borderRight"
                  :transmitText="poi.windState"
                  :list="[
                    '门窗关闭',
                    '自然通风',
                    '集中空调',
                    '分体空调',
                    '自定义',
                    '/',
                  ]"
                  :Obj="''"
                ></selectModel>
                <myInput
                  v-else
                  v-model="poi.windState"
                  style="text-align: center"
                  @change.native="
                    (el) => {
                      noShowInput(el, poi, 'showInput3');
                    }
                  "
                ></myInput>
              </div>
              <div v-else>{{ poi.windState }}</div>
            </td>
            <!--通风情况-->
            <td>
              <div v-if="target == 0">
                <selectModel
                  @returnVal="changeDoorState"
                  style="border: none"
                  :single="true"
                  :rows="false"
                  v-if="!poi.showInput4"
                  :special="index"
                  :Judge="true"
                  :input="false"
                  :receive="'shineState'"
                  class="tc borderRight"
                  :transmitText="poi.shineState"
                  :list="['人工照明', '自然采光', '自定义', '/']"
                  :Obj="''"
                ></selectModel>
                <myInput
                  v-else
                  v-model="poi.shineState"
                  style="text-align: center"
                  @change.native="
                    (el) => {
                      noShowInput(el, poi, 'showInput4');
                    }
                  "
                ></myInput>
              </div>
              <div v-else>{{ poi.shineState }}</div>
            </td>
            <!--照明情况-->
            <td>
              <divModel v-if="target === '0'" v-model="poi.remarks"></divModel>
              <span v-else>{{ poi.remarks | toDot }}</span>
              <div class="___relative" v-if="target == 0 && ableInput">
                <utilBar
                  :data="data"
                  :index="index"
                  :barNum="[0, 1, 2]"
                  :jsonString="jsonString"
                  class="___absolute"
                  style="left: 161px; top: -28px"
                ></utilBar>
              </div>
            </td>
            <!--备注-->
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
let head_1_oud = [];
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
      showDoor: false,
      standard: "",
      assess: "",
    };
  },
  props: [
    "ipdTemplate",
    "mainArr",
    "auxiliaryArr",
    "data",
    "pageNumber",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "headInput",
    "target",
    "task",
    "deviceData",
    "deviceData2",
  ],
  watch: {
    "data.valueData.point": {
      deep: true,
      handler: function (val) {
        let address = [];
        val.forEach((item) => {
          if (item.sampleAddress) {
            address.push(item.sampleAddress);
          }
        });
        this.$eventBus.$emit("getSampleAddres", address);
      },
    },
  },
  filters: {
    toDot(val) {
      if (val) {
        return val;
      } else {
        return "/";
      }
    },
  },
  methods: {
    getDevice(name) {
      return this.deviceData2.filter((item) => item.deviceName.includes(name));
    },

    noShowInput(el, item, showInput) {
      let val = el.target.value;
      el.target.value = el.target.value.replace(" ", "");
      if (val === "") {
        item[showInput] = false;
        this.$forceUpdate();
      }
    },
    toHigh() {
      this.data.height._normal.carried = true;
      this.data.height._short.carried = false;
      this.watchSign._high += 1;
      this.$emit("update:jsonString");
      this.$emit("update:watchSign");
    },
    toShort() {
      this.data.height._normal.carried = false;
      this.data.height._short.carried = true;
      this.watchSign._short += 1;
      this.$emit("update:jsonString");
      this.$emit("update:watchSign");
    },
    toUpModule() {
      let index = this.index_jsonString();
      if (index != 0) {
        _transposition(this.jsonString, index, index - 1);
        this.$emit("update:jsonString");
        this.watchSign._down += 1;
        this.$emit("update:watchSign");
      }
    },
    toDownModule() {
      let index = this.index_jsonString();
      if (index != this.jsonString.length - 1) {
        _transposition(this.jsonString, index, index + 1);
        this.$emit("update:jsonString");
        this.watchSign._down += 1;
        this.$emit("update:watchSign");
      }
    },
    toDeleteModule() {
      let index = this.index_jsonString();
      this.jsonString.splice(index, 1);
      this.$emit("update:jsonString");
      this.watchSign._delete += 1;
      this.$emit("update:watchSign");
    },
    increase() {
      let obj = {
        sampleAddress: "", //采样/检测地点
        areaArea: "", //区域面积
        temperature: "", //温度
        humidity: "", //湿度
        pressure: "", //大气压
        localtionState: "", //场所状态
        doorState: "", //门窗状态
        windState: "", //通风情况
        shineState: "", //照明情况
        remark: "", //备注
      };
      this.jsonString[this.index_jsonString()].data.valueData.point.push(obj);
      this.$emit("redefinition");
    },
    reduce(index) {
      if (this.data.valueData.point.length <= 1) {
        this.$notify({
          type: "warning",
          message: "最后一行不可删除！",
        });
        return;
      }
      this.data.valueData.point.splice(index, 1);
      this.$emit("redefinition");
    },
    returnVal2(index, val, key, key2) {
      this.data.valueData[key2] = val.id;
      this.data.valueData[key2] = val.id;
      this.data.valueData[key] = val.deviceNum;
      this.data.valueData[key] = val.deviceNum;
    },
    changeDoorState(showText, receive, special, selectedObj) {
      if (showText === "自定义") {
        let showInputNum = "";
        if (receive === "localtionState") {
          showInputNum = "showInput";
        } else if (receive === "doorState") {
          showInputNum = "showInput2";
        } else if (receive === "windState") {
          showInputNum = "showInput3";
        } else if (receive === "shineState") {
          showInputNum = "showInput4";
        }

        this.data.valueData.point[special][showInputNum] = true;
        this.data.valueData.point[special][receive] = " ";
        this.$forceUpdate();
      } else {
        this.data.valueData.point[special][receive] = showText;
      }
    },
  },
  mounted() {
    let arr = this.data.valueData.standard.split(",");
    this.standard = arr.map((item) => item + "<br/>").join("");
    let assessArr = this.data.valueData.assess.split(",");
    this.assess = assessArr.map((item) => item + "<br/>").join("");
    console.log(this.deviceData2);
  },
};
</script>

<style lang="less" scoped>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
.__functionBox3 {
  width: 56px;
  height: 27px;
  box-shadow: 1px 1px black;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  right: -109px;
  top: 245px;
  bottom: 1px;
}
</style>
