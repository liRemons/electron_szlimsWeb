<template>
  <div>
    <div
      style="
        border: 1px solid black;
        line-height: 32px;
        text-align: left;
        padding-left: 10px;
        border-top: none;
      "
    >
      检测项目：{{ data.valueData.testProjectChineseName
      }}{{ data.valueData.detectionLimitPieces }} &nbsp;&nbsp;&nbsp;&nbsp;
      检测依据:{{ data.valueData.sysStandardNum }}
    </div>
    <table class="myTable ___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <tr class="delLine">
        <td colspan="2">
          样品编号
          <div>
            <div
              title="复制该检测项目下所有样品"
              class="myBtn"
              style="margin-bottom: 2px; margin-left: 30px"
              @click="computeObj.copyAllSample(data.valueData)"
            >
              <span>c</span>
            </div>
            <div class="___relative">
              <div
                title="粘贴样品"
                class="___absolute myBtn"
                style="top: -30px; left: 90px"
                @click="computeObj.pasteAllSample(data.valueData)"
              >
                <span>p</span>
              </div>
            </div>
          </div>
        </td>
        <td colspan="2">检测地点</td>
        <td>检测点位</td>
        <td>第一周期</td>
        <td>第二周期</td>
        <td>检测结果</td>
        <td>检测结果<br />平均值</td>
        <td>检测时间</td>
        <td>抽气时长<br />（min）</td>
        <td>测量时长<br />（min）</td>
        <td>排气时长<br />（min）</td>
        <td>仪器编号</td>
        <td>备注</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="item.pointId">
        <td colspan="2" @click="generateSampleNum(data.valueData.point)">
          {{ item.sampleNum + "" + item.sampleNumIndex }}
        </td>
        <td colspan="2" @click="getDetailData">
          <selectModel
            @returnVal="returnVal"
            :single="true"
            :rows="false"
            style="line-height: 30px"
            :special="index"
            :Judge="true"
            :input="false"
            :receive="'SampleAddress'"
            :factor="true"
            :watchTransmitText="true"
            :transmitText="item.SampleAddress"
            :list="myggcspoint"
            :Obj="''"
          ></selectModel>
        </td>
        <!-- 检测点位 -->
        <td>
          <myInput v-model="item.point"></myInput>
        </td>
        <!-- 第一周期 -->
        <td>
          <myInput v-model="item.period1"></myInput>
        </td>
        <!-- 第二周期 -->
        <td>
          <myInput
            @change.native="changePeriod2(item, item.period2)"
            v-model="item.period2"
          ></myInput>
        </td>
        <!-- 检测结果 -->
        <td>{{ item.result }}</td>
        <!-- 检测结果平均值 -->
        <td>{{ item.resultAverage }}</td>
        <!-- 检测时间 -->
        <td class="___relative tc">
          <timePickerModel
            :showTime="item.time"
            :data="item"
            @setTime="(time) => (item.time = time)"
          />
        </td>
        <!-- 抽气时长 -->
        <td>
          <myInput v-model="item.pumpingTime"></myInput>
        </td>
        <!-- 测量时长 -->
        <td>
          <myInput v-model="item.measureTime"></myInput>
        </td>
        <!-- 排气时长 -->
        <td>
          <myInput v-model="item.exportTime"></myInput>
        </td>
        <!-- 仪器编号 -->
        <td>
          <querySelect
            v-model="item.deviceNum"
            v-if="target == 0"
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
        </td>
        <td>
          <myInput v-model="item.Remarks"></myInput>
          <div class="___relative" v-if="target == 0">
            <utilBar
              v-if="ableInput"
              :data="data"
              :index="index"
              :barNum="[
                ((!item.isPrototype || !item.sampleNumIndex) &&
                  (!data.valueData.point[index + 1]
                    ? true
                    : data.valueData.point[index + 1].sampleNum !==
                      item.sampleNum)) ||
                item.sampleNum == ''
                  ? 0
                  : '',
                !item.sampleNumIndex ? 1 : '',
                3,
                4,
                5,
                item.isPrototype ? 6 : '',
              ]"
              :jsonString="jsonString"
              class="___absolute"
              style="left: 120px; top: -28px"
            ></utilBar>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "project_cy_ypcymj",
  props: ["data", "jsonString", "target", "task", "ableInput", "deviceData"],
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
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
      ggcspoint: [],
      nowShowTimeBox: "",
      devices: [],
    };
  },
  computed: {
    myggcspoint() {
      if (this.ggcspoint.length > 0) {
        return this.ggcspoint.map((item) => item.sampleAddress);
      } else {
        return [];
      }
    },
  },
  watch: {
    myggcspoint() {
      this.data.valueData.point.forEach((item) => {
        if (item.SampleAddress == "") {
          item.SampleAddress = this.myggcspoint[0];
        }
      });
    },
    "data.valueData.point": function () {
      this.calculateAverage();
    },
  },
  methods: {
    calculateAverage() {
      let point = [];
      this.jsonString.forEach((item) => {
        if (item.to == "project_cy_kqzdnd") {
          point.push(
            ...item.data.valueData.point.map((a) => {
              return { foreverId: a.foreverId, result: a.result };
            })
          );
        }
      });
      let foreverIdArr = [...new Set(point.map((item) => item.foreverId))];
      let newPoint = [];
      foreverIdArr.forEach((item, index) => {
        newPoint[index] = { foreverId: item, resultArr: [] };
      });
      newPoint.forEach((item) => {
        item.resultArr = point
          .map((a) => {
            return a.foreverId == item.foreverId ? Number(a.result) : "";
          })
          .filter((a) => a);
      });
      newPoint.forEach((item) => {
        item.resultAverage = item.resultArr.length
          ? this.$utils.arrSUM(item.resultArr) / item.resultArr.length
          : "";
      });
      this.data.valueData.point.forEach((item) => {
        newPoint.forEach((a) => {
          if (item.foreverId == a.foreverId) {
            item.resultAverage = a.resultAverage;
          }
        });
      });
    },
    changePeriod2(item, data) {
      item.result = data;
      this.calculateAverage();
      this.$forceUpdate();
    },
    reset() {},
    returnVal2(index, val) {},

    returnVal(showText, receive, special) {
      this.data.valueData.point[special][receive] = showText;
    },

    getDetailData() {
      let ggcs = this.jsonString.find((item) => item.to == "head_ggcs");
      if (ggcs) {
        this.ggcspoint = ggcs.data.valueData.point;
      }
    },

    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item,
        this.data.valueData.multipleId
      );
    },
  },
  mounted() {
    this.getDetailData();

    this.$eventBus.$on("getDevice", (device) => {
      this.devices = device;
    });
  },
};
</script>

<style scoped>
</style>
