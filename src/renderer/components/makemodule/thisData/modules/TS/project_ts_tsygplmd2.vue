<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable">
        <tr>
          <td>管电压(kV)</td>
          <td>管电流(mA)</td>
          <td>K(mGy/min)</td>
          <td>b(cd/m²)</td>
          <td>校准因子f</td>
          <td style="width:150px;">B/(cd/m²)/(mGy/min)</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td>
            <myInput
              v-if="showInput"
              style="text-align: center"
              @change.native="changeNum(index)"
              v-model="item.voltage"
              :defaultValue="item.voltage"
              @focus.native="focus($event, item)"
            ></myInput>
            <span v-else>{{ item.voltage }}</span>
          </td>
          <td>
            <myInput
              v-if="showInput"
              style="text-align: center"
              v-model="item.electricCurrent"
              :defaultValue="item.electricCurrent"
            ></myInput>
            <span v-else>{{ item.electricCurrent }}</span>
          </td>
          <td>
            <myInput
              v-if="showInput"
              style="text-align: center"
              @change.native="changeNum(index)"
              v-model="item.K"
              :defaultValue="item.K"
            ></myInput>
            <span v-else>{{ item.K }}</span>
          </td>
          <td>
            <myInput
              v-if="showInput"
              style="text-align: center"
              @change.native="changeNum(index)"
              v-model="item.b"
              :defaultValue="item.b"
            ></myInput>
            <span v-else>{{ item.b }}</span>
          </td>
          <td class="hide">
            <span>{{ item.factor }}</span>
          </td>
          <td class="___relative">
            <span>{{ item.result }}</span>
            <utilBar
            v-if="btnFlag"
              :data="data"
              :index="index"
              :barNum="[
                0,
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
      showInput: true
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
    "deviceData",
    "btnFlag"
  ],
  filters: {},
  methods: {
    focus(e, val) {},
    changeNum(index) {
      let voltage = this.data.valueData.point[index].voltage;
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
        this.data.valueData.point[index].factor = "";
      }
      let D = this.data.valueData.point[index].b;
      let E = this.data.valueData.point[index].factor;
      let C = this.data.valueData.point[index].K;
      let arr = [D, E];
      let result = "";
      if (
        arr.every((item, index) => {
          return this.isNumber(item);
        })
      ) {
        result = ((D * E) / C).toFixed46(3);
      }
      this.$set(this.data.valueData.point[index], "result", result);
    },
    reset() {
      this.data.valueData.point.forEach((item, index) => {
        this.changeNum(index);
      });
    },
    initData() {
      let arr = this.jsonString.filter(item => item.to == "project_jcxcxx");
      if (arr[0].data.valueData.deviceType == "非透视荧光屏设备") {
        this.showInput = false;
        this.data.valueData.point.forEach(item => {
          item.voltage = "/";
          item.electricCurrent = "/";
          item.K = "/";
          item.factor = "/";
          item.b = "/";
          item.result = "/";
        });
      } else {
        this.showInput = true;
        this.data.valueData.point.forEach(item => {
          item.voltage =  item.voltage ;
          item.electricCurrent =  item.electricCurrent ;
          item.K =  item.K ;
          item.factor =  item.factor ;
          item.b =  item.b ;
          item.result =  item.result ;
        });
      }
    }
  },
  computed: {
    ...mapState({
      deviceFactor: state => state.StomatologyLinkage.deviceFactor
    }),
    deviceType() {
      return this.$store.state.laboratory.deviceType;
    }
  },
  watch: {
    deviceFactor(val) {
      if (val instanceof Array && val.length > 0) {
        this.data.valueData.factorArr = val;
        this.reset();
      }
    },
    deviceType() {
      this.initData();
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style>
</style>
