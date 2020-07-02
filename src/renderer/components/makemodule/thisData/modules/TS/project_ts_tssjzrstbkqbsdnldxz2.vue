<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr>
          <td rowspan="2" style="width:80px;">视野(mm)</td>
          <td rowspan="2" style="width: 80px;">管电压(kV)</td>
          <td rowspan="2" style="width: 80px;">管电流(mA)</td>
          <td colspan="3" class="___relative" style="width: 230px;">
            <span style="margin-right:55px;">测量值k(</span>
            <div class="___absolute t0" style="width:50px;left:115px;">
              <selectModel
                @returnVal="returnVal2"
                :Judge="true"
                :special="''"
                :receive="''"
                :single="true"
                :rows="false"
                :transmitText="data.valueData.company"
                :list="['μGy/s', 'nGy/s']"
                :Obj="''"
              >
              </selectModel>
            </div>
            <span>)</span>
          </td>
          <td rowspan="2" style="width:80px;">校准因子f</td>
          <td rowspan="2">检测结果(mGy/min)</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td>
            <selectModel
              @returnVal="returnVal"
              v-if="data.valueData.sizeList.split(',')[0] !== ''"
              :Judge="true"
              :special="index"
              :receive="''"
              :single="true"
              :rows="false"
              :repeat="[
                'view',
                data.valueData.testProject,
                data.valueData.multipleId,
                jsonString
              ]"
              :transmitText="item.view"
              :list="data.valueData.sizeList.split(',')"
              :Obj="''"
            >
            </selectModel>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(index)"
              v-model="item.voltage"
              :defaultValue="item.voltage"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.electricCurrent"
              :defaultValue="item.electricCurrent"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(index)"
              v-model="item.val1"
              :defaultValue="item.val1"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(index)"
              v-model="item.val2"
              :defaultValue="item.val2"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(index)"
              v-model="item.val3"
              :defaultValue="item.val3"
            ></myInput>
          </td>
          <td class="hide">
            <span>{{ item.factor }}</span>
          </td>
          <td class="___relative">
            <span>{{ item.result }}</span>
            <utilBar
              :data="data"
              :index="index"
              :barNum="[
                limit(),
                item.isPrototype ? 1 : '',
                3,
                4,
                item.isPrototype ? 5 : ''
              ]"
              :jsonString="jsonString"
              :whiteList="[
                'sampleName',
                'flow',
                'flowTime',
                'volume',
                'samplingDianWei',
                'dishSize',
                'Remarks'
              ]"
              class="___absolute"
              style="left: 210px;top: 5px;"
            ></utilBar>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showInput: false
    };
  },
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
    "deviceData"
  ],
  filters: {},
  methods: {
    limit() {
      let point = [];
      this.jsonString.forEach((item, index) => {
        if (
          item.to === this.data.valueData.testProject &&
          item.data.valueData.multipleId === this.data.valueData.multipleId
        ) {
          point.push(...item.data.valueData.point);
        }
      });
      if (this.data.valueData.sizeList === "") return "";
      if (this.data.valueData.sizeList.split(",").length > point.length) {
        return 0;
      } else {
        return "";
      }
    },
    changeNum(index) {
      let voltage = this.data.valueData.point[index].voltage;
      console.log(this.data.valueData.factorArr);
      if (
        this.isNumber(voltage) &&
        this.data.valueData.factorArr instanceof Array &&
        this.data.valueData.factorArr.length > 0
      ) {
        this.data.valueData.point[index].factor = this.getFactor(
          voltage,
          this.data.valueData.factorArr
        );
      } else {
        // this.data.valueData.point[index].factor = "";
      }
      let company = this.data.valueData.company;
      let E = parseFloat(this.data.valueData.point[index].val1);
      let F = parseFloat(this.data.valueData.point[index].val2);
      let G = parseFloat(this.data.valueData.point[index].val3);
      let H = parseFloat(this.data.valueData.point[index].factor);
      let arr = [E, F, G, H];
      let result = "";
      if (
        arr.every((item, index) => {
          return this.isNumber(item);
        })
      ) {
        if (company === "μGy/s") {
          result = (((E + F + G) * H * 60) / (3 * 1000)).toFixed46(1);
        } else if (company === "nGy/s") {
          result = (((E + F + G) * H * 60) / (3 * 1000 * 1000)).toFixed46(1);
        }
      }
      this.$set(this.data.valueData.point[index], "result", result);
    },
    reset() {
      this.data.valueData.point.forEach((item, index) => {
        this.changeNum(index);
      });
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    returnVal(val, name, index) {
      this.data.valueData.point[index].view = val;
    },
    returnVal2(val, name, index) {
      this.data.valueData.company = val;
      this.reset();
    }
  },
  computed: {
    ...mapState({
      deviceFactor: state => state.StomatologyLinkage.deviceFactor,
      sizeList: state => state.StomatologyLinkage.sizeList
    })
  },
  watch: {
    deviceFactor(val) {
      if (val instanceof Array && val.length > 0) {
        this.$set(this.data.valueData, "factorArr", val);
        this.showing.forEach(item => {
          item.forEach(a => {
            if(a.to=="project_ts_tssjzrstbkqbsdnldxz1")
            a.data.valueData.factorArr = val;
          });
        });
        this.reset();
      }

      console.log(this.jsonString);
      this.$emit("redefinition");
    },
    sizeList(val) {
      this.data.valueData.sizeList = val;
      if (this.data.valueData.point[0].view === "") {
        this.data.valueData.point[0].view = Math.max(...val.split(","));
      }
      this.reset();
    }
  },
  mounted() {}
};
</script>

<style>
</style>
