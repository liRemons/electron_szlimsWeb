<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <p>{{ data.valueData.correct }}:</p>
      <table class="myTable">
        <tr>
          <td style="width: 120px">天线类型</td>
          <td class="___relative tc" style="width: 560px">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="0"
                v-if="!data.valueData.showInput"
                :transmitText="data.valueData.antenna"
                :multi-select="false"
                :receive="'id'"
                :single="false"
                :rows="false"
                :list="[
                  '支撑杆',
                  '美化柱',
                  '抱杆',
                  '美化树',
                  '通信杆',
                  '铁塔型',
                  '全向天线',
                  '/',
                  '自定义',
                ]"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="data.valueData.antenna"
                @change.native="
                  (el) => {
                    noShowInput(el, 0);
                  }
                "
              ></myInput>
            </div>
            <div v-else>{{ data.valueData.antenna }}</div>
          </td>
        </tr>
      </table>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 120px">天线离地高度</td>
          <td class="___relative tc" style="width: 220px">
            <myInput
              style="text-align: center; width: 50px"
              v-model="data.valueData.antennaHeight"
              :defaultValue="data.valueData.antennaHeight"
            ></myInput>
            米
          </td>
          <td rowspan="2" style="width: 120px">经纬度坐标</td>
          <td class="___relative tc" style="width: 220px">
            <div class="___absolute tc t0" style="width: 70px">
              <div v-if="target == 0">
                <selectModel
                  @returnVal="returnVal"
                  :Judge="true"
                  :special="1"
                  v-if="!data.valueData.longitudeTitleInput"
                  :transmitText="data.valueData.longitudeTitle"
                  :multi-select="false"
                  :receive="'id'"
                  :single="true"
                  :rows="false"
                  :list="['东经', '西经']"
                  :Obj="''"
                >
                </selectModel>
                <myInput
                  style="text-align: center"
                  v-else
                  v-model="data.valueData.longitudeTitle"
                  @change.native="
                    (el) => {
                      noShowInput(el, 1);
                    }
                  "
                ></myInput>
              </div>
              <div v-else>{{ data.valueData.latitudeTitle }}</div>
            </div>
            <myInput
              style="text-align: center; width: 100px"
              v-model="data.valueData.longitude"
              :defaultValue="data.valueData.longitude"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td style="width: 120px">周围环境性质</td>
          <td class="___relative tc" style="width: 220px">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="2"
                v-if="!data.valueData.natureInput"
                :transmitText="data.valueData.nature"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="[
                  '居住区',
                  '商业区',
                  '工业区',
                  '交通干线',
                  '学校',
                  '景区',
                  '/',
                  '自定义',
                ]"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="data.valueData.nature"
                @change.native="
                  (el) => {
                    noShowInput(el, 2);
                  }
                "
              ></myInput>
            </div>
            <div v-else>{{ data.valueData.nature }}</div>
          </td>
          <td class="___relative tc" style="width: 220px">
            <div class="___absolute tc t0" style="width: 70px">
              <div v-if="target == 0">
                <selectModel
                  @returnVal="returnVal"
                  :Judge="true"
                  :special="3"
                  v-if="!data.valueData.latitudeTitleInput"
                  :transmitText="data.valueData.latitudeTitle"
                  :multi-select="false"
                  :receive="'id'"
                  :single="true"
                  :rows="false"
                  :list="['北纬', '南纬']"
                  :Obj="''"
                >
                </selectModel>
                <myInput
                  style="text-align: center"
                  v-else
                  v-model="data.valueData.latitudeTitle"
                  @change.native="
                    (el) => {
                      noShowInput(el, 3);
                    }
                  "
                ></myInput>
              </div>
              <div v-else>{{ data.valueData.latitudeTitle }}</div>
            </div>
            <myInput
              style="text-align: center; width: 100px"
              v-model="data.valueData.latitude"
              :defaultValue="data.valueData.latitude"
            ></myInput>
          </td>
        </tr>
      </table>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 120px">最近敏感点</td>
          <td class="___relative tc" style="width: 560px">
            <myInput
              style="text-align: center"
              v-model="data.valueData.sensitive"
              :defaultValue="data.valueData.sensitive"
            ></myInput>
          </td>
        </tr>
      </table>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 354px">天线与最近敏感点的距离</td>
          <td class="___relative tc" style="width: 350px">
            <span>水平：</span>
            <myInput
              style="text-align: center; width: 60px"
              v-model="data.valueData.level"
              :defaultValue="data.valueData.level"
            ></myInput>
            <span>米;垂直：</span>
            <myInput
              style="text-align: center; width: 60px"
              v-model="data.valueData.vertical"
              :defaultValue="data.valueData.vertical"
            ></myInput>
            <span>米</span>
          </td>
        </tr>
      </table>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 120px">运营单位</td>
          <td class="___relative tc" style="width: 223px">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="4"
                v-if="!data.valueData.operationUnitInput"
                :transmitText="data.valueData.operationUnit"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="['中国移动', '中国联通', '中国电信', '未提供', '自定义']"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="data.valueData.operationUnit"
                @change.native="
                  (el) => {
                    noShowInput(el, 4);
                  }
                "
              ></myInput>
            </div>
            <div v-else>{{ data.valueData.operationUnit }}</div>
          </td>
          <td style="width: 120px">网络制式类型</td>
          <td class="___relative tc" style="width: 220px">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="5"
                v-if="!data.valueData.networkStandardInput"
                :transmitText="data.valueData.networkStandard"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="['未提供', '自定义']"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="data.valueData.networkStandard"
                @change.native="
                  (el) => {
                    noShowInput(el, 5);
                  }
                "
              ></myInput>
            </div>
            <div v-else>{{ data.valueData.networkStandard }}</div>
          </td>
        </tr>
        <tr>
          <td style="width: 120px">运行状态</td>
          <td class="___relative tc" style="width: 220px">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="6"
                v-if="!data.valueData.runningStateInput"
                :transmitText="data.valueData.runningState"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="['在运行', '未运行', '未知', '自定义']"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="data.valueData.runningState"
                @change.native="
                  (el) => {
                    noShowInput(el, 6);
                  }
                "
              ></myInput>
            </div>
            <div v-else>{{ data.valueData.runningState }}</div>
          </td>
          <td style="width: 120px">天线数量</td>
          <td class="___relative tc" style="width: 220px">
            <myInput
              style="text-align: center"
              v-model="data.valueData.antennaQuantity"
              :defaultValue="data.valueData.antennaQuantity"
            ></myInput>
          </td>
        </tr>
      </table>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 120px">发射频率范围</td>
          <td class="___relative tc" style="width: 560px">
            <myInput
              style="text-align: center; width: 50px"
              v-model="data.valueData.range[0]"
              :defaultValue="data.valueData.range[0]"
            ></myInput>
            <span>至</span>
            <myInput
              style="text-align: center; width: 50px"
              v-model="data.valueData.range[1]"
              :defaultValue="data.valueData.range[1]"
            ></myInput>
            <span>MHz</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
      sampleOption: "",
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
    returnVal(val, name, index) {
      if (val !== "自定义") {
        let keyArr = [
          "antenna",
          "longitudeTitle",
          "nature",
          "latitudeTitle",
          "operationUnit",
          "networkStandard",
          "runningState",
        ];
        this.data.valueData[keyArr[index]] = val;
      } else {
        let showInputArr = [
          "showInput",
          "longitudeTitleInput",
          "natureInput",
          "latitudeTitleInput",
          "operationUnitInput",
          "networkStandardInput",
          "runningStateInput",
        ];
        let keyArr = [
          "antenna",
          "longitudeTitle",
          "nature",
          "latitudeTitle",
          "operationUnit",
          "networkStandard",
          "runningState",
        ];
        this.data.valueData[showInputArr[index]] = true;
        this.data.valueData[keyArr[index]] = " ";
        this.$forceUpdate();
      }
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.data.valueData.antenna = val;
      if (val === "") {
        let showInputArr = [
          "showInput",
          "longitudeTitleInput",
          "natureInput",
          "latitudeTitleInput",
          "operationUnitInput",
          "networkStandardInput",
          "runningStateInput",
        ];
        this.data.valueData[showInputArr[index]] = false;
      }
      this.$forceUpdate();
    },
  },
  mounted() {
    if (this.data.valueData.latLngType) {
      this.data.valueData.longitudeTitle = this.data.valueData.latLngType.split(
        "-"
      )[0];
      this.data.valueData.latitudeTitle = this.data.valueData.latLngType.split(
        "-"
      )[1];
    }

    this.data.valueData.longitude = this.data.valueData.lng;
    this.data.valueData.latitude = this.data.valueData.lat;
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
