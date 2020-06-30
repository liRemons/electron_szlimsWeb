//CT 值（水）

<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable" style="margin-bottom: 10px;">
        <tr class="tl">
          <td colspan="7">
            <span class="ml10">{{
              data.valueData.testProjectChineseName
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="7">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="7" style="text-align: left;padding-left: 10px;">
            <span
              >验收：±4HU内；状态：±6HU内；稳定性：与基线值相差±4HU内。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="7">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="7"
            style="padding-left:10px;line-height: 20px;text-indent: 2em;"
          >
            <span style="white-space: normal;"
              >将内径为18cm～22cm圆柱型均质水模体置于扫描野中心，使用常用头部扫描条件进行轴向扫描，层厚设置尽量接近10mm，且CTDIw应不大于50mGy，在图像中心选取直径约为测试模体图像直径10%的ROI，测量该ROI的平均CT值作为水CT值的测量值。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="7">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td rowspan="2">检测条件</td>
          <td>管电压</td>
          <td>
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.a"
              :defaultValue="data.valueData.a"
              @change.native="changeNum(data.valueData, 'e')"
            ></myInput>
            kV
          </td>
          <td>管电流</td>
          <td>
            <myInput
              style="text-align: center;width: 50%;"
              v-model="data.valueData.b"
              :defaultValue="data.valueData.b"
              @change.native="changeNum(data.valueData, 'e')"
            ></myInput>
            <selectModel
              style="width: 50%;float: right;"
              @returnVal="returnVal"
              :Judge="true"
              v-if="!showInput"
              :special="'0'"
              :transmitText="data.valueData.bunit"
              :multi-select="false"
              :receive="data.valueData"
              :single="true"
              :rows="false"
              :list="['mA', 'mAs']"
              :Obj="''"
            ></selectModel>
          </td>
          <td>曝光时间</td>
          <td>
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.c"
              :defaultValue="data.valueData.c"
              @change.native="changeNum(data.valueData, 'e')"
            ></myInput>
            s
          </td>
        </tr>
        <tr>
          <td>SFOV</td>
          <td>
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.d"
              :defaultValue="data.valueData.d"
              @change.native="changeNum(data.valueData, 'e')"
            ></myInput>
            mm
          </td>
          <td>层厚</td>
          <td style="white-space: normal;">
            <myInput
              :style="{
                color:
                  data.valueData.e < 5 || data.valueData.e > 10 ? 'red' : '#000'
              }"
              style="text-align: center;width: 70%"
              v-model="data.valueData.e"
              :defaultValue="data.valueData.e"
              @focus.native="$message('应尽量接近10')"
              @change.native="changeNum(data.valueData, 'e')"
            ></myInput>
            mm
          </td>
          <td>CTDI 显示值</td>
          <td style="white-space: normal;">
            <myInput
              :style="{ color: data.valueData.f > 50 ? 'red' : '#000' }"
              style="text-align: center ;width: 70%"
              v-model="data.valueData.f"
              :defaultValue="data.valueData.f"
              @change.native="changeNum(data.valueData, 'f')"
            ></myInput>
            mGy
          </td>
        </tr>
        <tr>
          <td>检测结果</td>
          <td colspan="2">CT 值（水）</td>
          <td colspan="4">
            <myInput
              style="text-align: center;width:50px;"
              v-model="data.valueData.result"
              :defaultValue="data.valueData.result"
              @change.native="changeNum(data.valueData, 'result')"
            ></myInput>
            <span>HU</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";

export default {
  data() {
    return {
      showInput: false
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
    "deviceData"
  ],
  filters: {},
  methods: {
    returnVal(val, item, index) {
      item.bunit = val;
      this.changeNum(item, null);
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.data.valueData.deviceType = val;
      if (val === "") {
        this.showInput = false;
      }
      this.$forceUpdate();
    },
    err(msg) {
      this.$notify({
        type: "error",
        message: msg
      });
    },
    changeNum(item, num) {
      switch (num) {
        case "e":
          if (Number(item.e) < 5 || Number(item.e) > 10)
						this.err("应尽量接近10");
					if(Number(item.e)<5){
						item.e=null
					}
          break;
        case "f":
          if (Number(item.f) > 50) this.err("CTDIW大于50mGy");
          break;
      }
      bus.$emit("resetCtData");
    }
  },
  mounted() {}
};
</script>

<style>
</style>
