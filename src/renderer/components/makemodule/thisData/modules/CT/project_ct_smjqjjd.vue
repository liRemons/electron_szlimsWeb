// 扫描架倾角精度
<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable" style="margin-bottom: 10px;">
        <tr class="tl">
          <td colspan="8">
            <span class="ml10">{{
              data.valueData.testProjectChineseName
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="8" style="text-align: left;padding-left: 10px;">
            <span>验收：±2°内。</span>
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="8"
            style="padding-left:10px;line-height: 20px;text-indent: 2em;"
          >
            <span style="white-space: normal;"
              >将中心具有明确标记的长方体模体与扫描野中心点重合，并水平固定，调整模体位置，确定扫描层面，使扫描层面经过模体中心位置。使用临床常用头部扫描条件进行扫描，模体固定不动，测量并记录体模横截面的垂直高度L1，机架倾斜α0（15～20）°使用相同条件进行扫描，测量并记录体模横截面的垂直高度L2，两次测量时窗宽窗位应一致，则扫描架倾斜角α=arcos(L1/L2)°，则扫描架倾角偏差=α-α0°。也可用斜率指示器直接读取α°，则扫描架倾角偏差=α-α0°。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align: left;padding-left: 10px;">
            机架是否具有倾斜功能
          </td>
          <td colspan="2">
            <el-radio v-model="data.valueData.isIncline" label="是"
              >是</el-radio
            >
            <el-radio v-model="data.valueData.isIncline" label="否"
              >否</el-radio
            >
          </td>
          <td colspan="2" style="text-align: left;padding-left: 10px;">
            倾斜功能是否正常
          </td>
          <td colspan="2">
            <el-radio
              v-model="data.valueData.isInclineOk"
              label="是"
              :disabled="data.valueData.isIncline == '否'"
              >是</el-radio
            >
            <el-radio
              v-model="data.valueData.isInclineOk"
              label="否"
              :disabled="data.valueData.isIncline == '否'"
              >否</el-radio
            >
          </td>
        </tr>
        <tr>
          <td colspan="8" style="text-align: left;padding-left: 10px;">
            <el-radio
              v-model="data.valueData.option"
              label="模体检测法"
              @change="changeMtjcf"
              :disabled="data.valueData.isIncline == '否'"
              >模体检测法</el-radio
            >
            <el-radio
              v-model="data.valueData.option"
              label="斜率指示器法"
              @change="changeXlzsq"
              :disabled="data.valueData.isIncline == '否'"
              >斜率指示器法</el-radio
            >
          </td>
        </tr>
        <tr>
          <td>α0(°)</td>
          <td>窗宽</td>
          <td>窗位</td>
          <td>垂直扫L1(mm)</td>
          <td>倾斜扫L2(mm)</td>
          <td>α(°)</td>
          <td colspan="2">扫描架倾角偏差(°)</td>
        </tr>
        <tr>
          <td>
            <myInput
              v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是'
              "
              :style="{
                color:
                  data.valueData.A > 20 || data.valueData.A < 15
                    ? 'red'
                    : '#000',
                textAlign: 'center'
              }"
              v-model="data.valueData.A"
              :defaultValue="data.valueData.A"
              @change.native="changeNum(data.valueData, 'A')"
            ></myInput>
            <span v-else>/</span>
          </td>
          <td>
            <myInput
              v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option !== '斜率指示器法'
              "
              style="text-align: center"
              v-model="data.valueData.B"
              :defaultValue="data.valueData.B"
            ></myInput>
            <span v-else>/</span>
          </td>
          <td>
            <myInput
              v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option !== '斜率指示器法'
              "
              style="text-align: center"
              v-model="data.valueData.C"
              :defaultValue="data.valueData.C"
            ></myInput>
            <span v-else>/</span>
          </td>
          <td>
            <myInput
              v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option !== '斜率指示器法'
              "
              style="text-align: center"
              v-model="data.valueData.D"
              :defaultValue="data.valueData.D"
              @change.native="changeNum(data.valueData, 'E')"
            ></myInput>
            <span v-else>/</span>
          </td>
          <td>
            <myInput
              v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option !== '斜率指示器法'
              "
              :style="{
                color:
                  Number(data.valueData.E) <= Number(data.valueData.D)
                    ? 'red'
                    : '#000',
                textAlign: 'center'
              }"
              v-model="data.valueData.E"
              :defaultValue="data.valueData.E"
              @change.native="changeNum(data.valueData, 'E')"
            ></myInput>
            <span v-else>/</span>
          </td>
          <td>
            <myInput
              v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option == '斜率指示器法'
              "
              style="text-align: center"
              v-model="data.valueData.F"
              :defaultValue="data.valueData.F"
              @change.native="changeNum(data.valueData, 'F')"
            ></myInput>
            <span v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option !== '斜率指示器法'
              ">{{data.valueData.F}}</span>
            <span
              v-if="
                data.valueData.isIncline === '否' ||
                  data.valueData.isInclineOk === '否' ||
                  data.valueData.option == ''
              "
              >/</span
            >
            <!-- {{ data.valueData.F }} -->
          </td>
          <td colspan="2">
            <myInput
              v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option == '斜率指示器法'
              "
              style="text-align: center"
              v-model="data.valueData.G"
              :defaultValue="data.valueData.G"
              @change.native="changeNum(data.valueData, 'G')"
            ></myInput>
            <span v-if="
                data.valueData.isIncline === '是' &&
                  data.valueData.isInclineOk === '是' &&
                  data.valueData.option !== '斜率指示器法'
              ">{{data.valueData.G}}</span>
            <span
              v-if="
                data.valueData.isIncline === '否' ||
                  data.valueData.isInclineOk === '否' ||
                  data.valueData.option == ''
              "
              >/</span
            >
            <!-- {{ data.valueData.G }} -->
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
    changeXlzsq(data) {
      this.data.valueData.B = "/";
      this.data.valueData.C = "/";
      this.data.valueData.D = "/";
      this.data.valueData.E = "/";
    },
    changeMtjcf(data) {
      this.data.valueData.B = null;
      this.data.valueData.C = null;
      this.data.valueData.D = null;
      this.data.valueData.E = null;
    },
    returnVal(val, name, index) {
      if (val !== "自定义") {
        this.data.valueData.deviceType = val;
      } else {
        this.showInput = true;
        this.data.valueData.deviceType = " ";
        this.$forceUpdate();
      }
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
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeNum(item, num) {
      switch (num) {
        case "A":
          if (Number(item.A) < 15 || Number(item.A) > 20) {
            this.err("角度应在15~20°内");
          }
          if (this.isNumber(item.F) && this.isNumber(item.A)) {
            item.G = (item.A - item.F).toFixed46(1);
          }
          break;
        case "E":
          if (item.D != "" && item.E != "") {
            if (Number(item.D) >= Number(item.E)) {
              this.err("L2应大于L1");
            } else {
              item.F = (
                (Math.acos(Number(item.D) / Number(item.E)) * 180) /
                Math.PI
              ).toFixed46(1);
              item.G = (Number(item.F) - Number(item.A)).toFixed46(1);
            }
          }
          break;
      }
    }
  },
  mounted() {}
};
</script>

<style>
</style>
