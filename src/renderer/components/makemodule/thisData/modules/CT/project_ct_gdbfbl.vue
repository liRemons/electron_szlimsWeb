// 高对比分辨率

<template>
  <div>
    <div :class="{_normalHeight_:true}" class="___relative">
      <div :class="{eventCover:!ableInput}"></div>
      <table class="myTable" style="margin-bottom: 10px;">
        <tr class="tl">
          <td colspan="9">
            <span class="ml10">{{data.valueData.testProjectChineseName}}</span>
          </td>
        </tr>
        <tr>
          <td colspan="9">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="9" style="text-align: left;padding-left: 10px;">
            <span>验收：±5HU内；状态：±6HU内；稳定性：与基线值相差±2HU内。</span>
          </td>
        </tr>
        <tr>
          <td colspan="9">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td colspan="9" style="padding-left:10px;line-height: 20px;text-indent: 2em;">
            <span
              style="white-space: normal;"
            >选择和测量CT值（水）的扫描图像，在图像圆周相当于钟表时针3，6，9，12点的方向，距模体影像边沿约10mm处，选取直径约为测试模体图像直径10%的RAOI，分别测量这个四个ROI的平均CT值，其中与CT值（水）的图像中心平均CT值的最大差值作为均匀性的测量值。</span>
          </td>
        </tr>
        <tr>
          <td colspan="9">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td>检测条件</td>
          <td>管电压</td>
          <td>
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.a"
              :defaultValue="data.valueData.a"
            ></myInput>kV
          </td>
          <td>管电流</td>
          <td>
            <myInput
              style="text-align: center;width: 50%;"
              v-model="data.valueData.b"
              :defaultValue="data.valueData.b"
            ></myInput>
            <selectModel
              style="width: 50%;float: right;"
              @returnVal="returnVal"
              :Judge="true"
              v-if="!showInput"
              :special="'0'"
              :transmitText="data.valueData.bunit"
              :multi-select="false"
              :receive="'id'"
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
            ></myInput>s
          </td>
          <td>CTDI 显示值</td>
          <td>
            <myInput
              style="text-align: center;width: 60%"
              :style="{ color: (data.valueData.d>50?'red':'#000')}"
              v-model="data.valueData.d"
              :defaultValue="data.valueData.d"
              @change.native="changeNum(data.valueData,'d')"
            ></myInput>mGy
          </td>
        </tr>
        <tr>
          <td rowspan="3">检测结果</td>
          <td colspan="2">算法</td>
          <td>层厚</td>
          <td>SFOV</td>
          <td style="white-space: normal;">细节CT值（HU）</td>
          <td style="white-space: normal;">背景CT值（HU）</td>
          <td>窗位</td>
          <td style="white-space: normal;">检测结果（lp/mm）</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point" :key="index">
          <td colspan="2">
            <span>{{item.arithmetic}}</span>
            <myInput style="text-align: center;width: 60%" v-model="item.A" :defaultValue="item.A"></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              :style="{ color: (item.B>8?'red':'#000')}"
              v-model="item.B"
              :defaultValue="item.B"
              @change.native="changeNum(item,'B')"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              :style="{ color: (item.C>140?'red':'#000')}"
              v-model="item.C"
              :defaultValue="item.C"
              @change.native="changeNum(item,'C')"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.D"
              :defaultValue="item.D"
              @change.native="changeNum(item,'F')"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.E"
              :defaultValue="item.E"
              @change.native="changeNum(item,'F')"
            ></myInput>
          </td>
          <td>{{item.F}}</td>
          <td>
            <myInput
              style="text-align: center"
              :style="{ color: (item.G>21?'red':'#000')}"
              v-model="item.G"
              :defaultValue="item.G"
              @change.native="changeNum(item,'G')"
            ></myInput>
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
    returnVal(val, name, index) {
      this.data.valueData.bunit = val;
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
        case "d":
          if (Number(item.d) > 50) this.err("大于50mGy");
          break;
        case "B":
          if (Number(item.B) > 8) this.err("请使用薄层扫描");
          break;
        case "C":
          if (Number(item.C) > 140) this.err("请使用小FOV 扫描");
          break;
        case "F":
          if (item.D != "" && item.E != "");
          {
            item.F = (Number(item.D) + Number(item.E)) / 2;
          }
          break;
        case "G":
          if (Number(item.G) > 21) this.err("请确认检测结果");

          break;
        default:
          break;
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>
