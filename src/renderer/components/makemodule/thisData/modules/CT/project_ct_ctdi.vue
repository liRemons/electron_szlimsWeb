//CTDI
<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable" style="margin-bottom: 10px">
        <tr class="tl">
          <td colspan="9">
            <span class="ml10">{{
              data.valueData.testProjectChineseName
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="9">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="9" style="text-align: left; padding-left: 10px">
            <span style="white-space: normal; 20px !important">
              头部模体：验收：与厂家说明书指标相差±15%内；
              <br />状态：与厂家说明书指标相差±20%内,若无说明书技术指标参考，应≤50mGy；稳定性：与基线值相差±15%内。
              <br />体部模体：验收：与厂家说明书指标相差±15%以内。
              腰椎：＜35mGy。腹部：＜25mGy。
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="9">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr>
          <td
            colspan="9"
            style="
              padding-left: 10px;
              line-height: 20px;
              text-indent: 2em;
              text-align: left;
            "
          >
            <span style="white-space: normal; line-height: 20px"
              >将模体置于扫描野中心，除头部使用头部模体外，其余部分均使用体部模体进行检测，选用临床常用条件对模体进行轴向扫描（头部和体部使用轴向扫描模式，腰椎和腹部可以使用螺旋扫描模式），记录仪器示值，根据公式：校准值=仪器示值平均值×校准因子/准直宽度，CTDIw=（模体中心校准值+2×模体四周校准值）/3，偏差=（CTDIw-厂家指标）/厂家指标×100%，对于螺旋扫描CTDIvol=
              CTDIw/螺距。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="9">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr class="tl">
          <td colspan="9" style="padding-left: 10px; line-height: 16px">
            <el-checkbox-group v-model="data.valueData.options">
              <el-checkbox :label="0">头部</el-checkbox>
              <el-checkbox :label="1">体部</el-checkbox>
            </el-checkbox-group>
          </td>
        </tr>
      </table>
      <table
        class="myTable"
        v-for="(item, index) in data.valueData.point"
        :key="index + 'index'"
      >
        <tr v-if="data.valueData.options.includes(index)">
          <td>管电压</td>
          <td>
            <myInput
              style="text-align: center; width: 70%"
              @change.native="changeNum(item, 'a', index)"
              v-model="item.a"
              :defaultValue="item.a"
            ></myInput>
            kV
          </td>
          <td>管电流</td>
          <td colspan="2">
            <myInput
              style="width: 50%"
              v-model="item.b"
              :defaultValue="item.b"
            ></myInput>
            <selectModel
              style="width: 50%; float: right"
              @returnVal="returnVal"
              :Judge="true"
              v-if="!showInput && data.valueData.options.includes(index)"
              :special="index"
              :transmitText="item.bunit"
              :multi-select="false"
              :receive="item"
              :single="true"
              :rows="false"
              :list="['mA', 'mAs']"
              :Obj="''"
            ></selectModel>
          </td>
          <td>曝光时间</td>
          <td>
            <myInput
              v-if="data.valueData.options.includes(index)"
              style="text-align: center; width: 70%"
              v-model="item.c"
              :defaultValue="item.c"
            ></myInput>
            s
          </td>
          <td>SFOV</td>
          <td>
            <myInput
              v-if="data.valueData.options.includes(index)"
              style="text-align: center; width: 70%"
              v-model="item.d"
              :defaultValue="item.d"
            ></myInput>
            mm
          </td>
        </tr>
        <tr v-if="data.valueData.options.includes(index)">
          <td>准直宽度</td>
          <td>
            <myInput
              style="text-align: center; width: 70%"
              v-model="item.e"
              :defaultValue="item.e"
            ></myInput>
            mm
          </td>
          <td>厂家规定值</td>
          <td colspan="2">
            <el-checkbox
              v-model="item.checked"
            ></el-checkbox>
              <myInput
                v-if="item.checked"
                style="width: 50%"
                v-model="item.f"
                @change.native="reset()"
                :defaultValue="item.f"
              ></myInput>
              mGy
          </td>
          <td>CTDI 显示值</td>
          <td>
            <myInput
              style="text-align: center; width: 65%"
              v-model="item.g"
              :defaultValue="item.g"
            ></myInput>
            mGy
          </td>
          <td>校准因子</td>
          <td>{{ item.h }}</td>
        </tr>
        <tr
          v-if="data.valueData.options.includes(index)"
          style="white-space: normal"
        >
          <td>部位</td>
          <td>位置</td>
          <td colspan="3">仪器示值/mGycm</td>
          <td style="line-height: 18px">平均值<br />（mGycm）</td>
          <td style="line-height: 18px">
            CTDI100
            <br />（mGy）
          </td>
          <td style="line-height: 18px">
            校准值
            <br />（mGy）
          </td>
          <td style="line-height: 18px">
            CTDIw
            <br />（mGy）
          </td>
        </tr>
        <tr
          v-if="data.valueData.options.includes(index)"
          style="white-space: normal"
          v-for="(val, i) in item.datas"
          class="___relative"
          :key="index + '' + i"
        >
          <td :rowspan="i == 0 ? 5 : 0" v-if="i == 0">{{ val.scope }}</td>
          <td>{{ val.location }}</td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(val, 'D', index)"
              v-model="val.A"
              :defaultValue="val.A"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(val, 'D', index)"
              v-model="val.B"
              :defaultValue="val.B"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(val, 'D', index)"
              v-model="val.C"
              :defaultValue="val.C"
            ></myInput>
          </td>
          <td>{{ val.D }}</td>
          <td>{{ val.E }}</td>
          <td>{{ val.F }}</td>
          <td :rowspan="i == 0 ? 5 : 0" v-if="i == 0">{{ val.G }}</td>
        </tr>
        <tr v-if="data.valueData.options.includes(index)">
          <td colspan="2">{{ index === 0 ? "头部" : "体部" }}检测结果（%）</td>
          <td colspan="7">
            <span>{{ item.result }}</span>
          </td>
        </tr>
      </table>
      <table class="myTable">
        <tr>
          <td colspan="2">备注</td>
          <td colspan="7">
            <myInput v-model="data.valueData.remark"></myInput>
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
      showInput: false,
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
  ],
  filters: {},
  methods: {
    returnVal(val, item, index) {
      console.log("单位：", val, item, index);
      item.bunit = val;
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.item.deviceType = val;
      if (val === "") {
        this.showInput = false;
      }
      this.$forceUpdate();
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeNum(item, num, fuIndex) {
      switch (num) {
        case "a":
          if (item.a != "") {
            if (
              this.isNumber(item.a) &&
              this.data.valueData.factorArr instanceof Array &&
              this.data.valueData.factorArr.length > 0
            ) {
              item.h = this.getFactor(item.a, this.data.valueData.factorArr);
            } else {
              item.h = "";
            }
          }
          break;
        case "D":
          if (item.A != "" && item.B != "" && item.C != "") {
            item.D = (
              (Number(item.A) + Number(item.B) + Number(item.C)) /
              3
            ).toFixed46(1);
            item.E = (
              (item.D * 10) /
              Number(this.data.valueData.point[fuIndex].e)
            ).toFixed46(1);
            item.F = (
              item.E * Number(this.data.valueData.point[fuIndex].h)
            ).toFixed46(1);
          }
          if (
            this.data.valueData.point[fuIndex].datas.every((val, index) => {
              return (
                this.isNumber(val.A) &&
                this.isNumber(val.B) &&
                this.isNumber(val.C)
              );
            })
          ) {
            let garr = this.data.valueData.point[fuIndex].datas.map((i) =>
              isNaN(i.F) ? 0 : Number(i.F)
            );
            let temparr = this.data.valueData.point[fuIndex].datas;
            for (let i = 0; i < temparr.length; i++) {
              temparr[i].G = (
                (1 / 3) * garr[0] +
                (2 / 3) * ((garr[1] + garr[2] + garr[3] + garr[4]) / 4)
              ).toFixed46(1);
            }
            let result = "";
            let f = this.data.valueData.point[fuIndex].f;
            if (this.purposeDetection.includes("验收")) {
              if (this.isNumber(f)) {
                result = ((temparr[0].G - f) * (100 / f)).toFixed46(1);
              }
            } else if (this.purposeDetection.includes("状态")) {
              if (this.isNumber(f)) {
                result = ((temparr[0].G - f) * (100 / f)).toFixed46(1);
              } else {
                result = temparr[0].G;
              }
            }
            this.data.valueData.point[fuIndex].result = result;
          } else {
            this.data.valueData.point[fuIndex].datas.forEach((val, index) => {
              val.G = "";
            });
            this.data.valueData.point[fuIndex].result = "";
          }
          break;
        default:
          break;
      }
    },
    reset() {
      this.data.valueData.point.forEach((item, index) => {
        item.datas.forEach((val, i) => {
          this.changeNum(val, "D", index);
        });
      });
    },
  },
  computed: {
    ...mapState({
      purposeDetection: (state) => state.StomatologyLinkage.purposeDetection,
      deviceFactor: (state) => state.StomatologyLinkage.deviceFactor,
      sizeList: (state) => state.StomatologyLinkage.sizeList,
    }),
  },
  watch: {
    deviceFactor(val) {
      if (val instanceof Array && val.length > 0) {
        console.log("数据变没变");
        this.data.valueData.factorArr = val;
      }
    },
    purposeDetection() {
      this.reset();
    },
    sizeList(val) {
      this.data.valueData.sizeList = val;
      if (this.data.valueData.point[0].view === "") {
        this.data.valueData.point[0].view = Math.max(...val.split(","));
      }
    },
  },
  mounted() {
    
  },
};
</script>

<style>
</style>
