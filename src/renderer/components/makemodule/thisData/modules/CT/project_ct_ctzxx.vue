//CT 值线性

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
            <span>验收：±50HU内。</span>
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
              >将模体置于扫描野中心，并使圆柱轴垂直于扫描层面，模体说明书指定扫描条件，或分别用临床常用头部和体部扫描条件，扫描低对比度细节模体中心，获取图像，在不同模块中心选取直径约模块直径80%的ROI，测量其平均CT值，计算模块标称CT值与测量所得平均CT值之差，差值最大者记为CT值线性的评价参数。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td rowspan="2" colspan="2" style="white-space: normal;">
            <el-radio
              @change="optionChangeValue"
              name="option"
              v-model="data.valueData.valueOption"
              label="0"
            >
              模板说明书指定
              <br />扫描条件
            </el-radio>
            <el-radio
              @change="optionChangeValue"
              name="option"
              style="float: left;margin-left: 7px;"
              v-model="data.valueData.valueOption"
              label="1"
            >
              临床常用头部扫
              <br />描条件
            </el-radio>
          </td>
          <td>管电压</td>
          <td>
            <myInput
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              style="text-align: center;width: 70%"
              v-model="data.valueData.a"
              :defaultValue="data.valueData.a"
            ></myInput>
            kV
          </td>
          <td>管电流</td>
          <td>
            <myInput
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              style="text-align: center;width: 50%;"
              v-model="data.valueData.b"
              :defaultValue="data.valueData.b"
            ></myInput>
            <selectModel
              style="width: 50%;float: right;"
              @returnVal="returnVal"
              :Judge="true"
              v-if="
                (!showInput && data.valueData.valueOption == 0) ||
                  data.valueData.valueOption == 1
              "
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
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              style="text-align: center;width: 70%"
              v-model="data.valueData.c"
              :defaultValue="data.valueData.c"
            ></myInput>
            s
          </td>
        </tr>
        <tr>
          <td>SFOV</td>
          <td>
            <myInput
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              style="text-align: center;width: 70%"
              v-model="data.valueData.d"
              :defaultValue="data.valueData.d"
            ></myInput>
            mm
          </td>
          <td>层厚</td>
          <td>
            <myInput
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              style="text-align: center;width: 70%"
              :style="{
                color:
                  data.valueData.e < 5 || data.valueData.e > 10 ? 'red' : '#000'
              }"
              @change.native="changeNum(data.valueData, 'e')"
              v-model="data.valueData.e"
              @focus.native="$message('应尽量接近10')"
              :defaultValue="data.valueData.e"
            ></myInput>
            mm
          </td>
          <td>算法</td>
          <td>
            <myInput
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              style="text-align: center ;width: 70%"
              v-model="data.valueData.f"
              :defaultValue="data.valueData.f"
            ></myInput>
            <!-- :style="{ color: data.valueData.f > 50 ? 'red' : '#000' }" -->
            <!-- mGy -->
          </td>
        </tr>
        <tr>
          <td rowspan="2" colspan="2" style="white-space: normal;">
            <el-radio
              @change="optionChangeValue"
              name="option"
              v-model="data.valueData.valueOption"
              label="2"
            >
              临床常用头部
              <br />扫描条件
            </el-radio>
          </td>
          <td>管电压</td>
          <td>
            <myInput
              v-if="data.valueData.valueOption == 2"
              style="text-align: center;width: 70%"
              v-model="data.valueData.a"
              :defaultValue="data.valueData.a"
            ></myInput>
            kV
          </td>
          <td>管电流</td>
          <td>
            <myInput
              v-if="data.valueData.valueOption == 2"
              style="text-align: center;width: 50%;"
              v-model="data.valueData.b"
              :defaultValue="data.valueData.b"
            ></myInput>
            <selectModel
              style="width: 50%;float: right;"
              @returnVal="returnVal"
              :Judge="true"
              v-if="!showInput && data.valueData.valueOption == 2"
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
              v-if="data.valueData.valueOption == 2"
              style="text-align: center;width: 70%"
              v-model="data.valueData.c"
              :defaultValue="data.valueData.c"
            ></myInput>
            s
          </td>
        </tr>
        <tr>
          <td>SFOV</td>
          <td>
            <myInput
              v-if="data.valueData.valueOption == 2"
              style="text-align: center;width: 70%"
              v-model="data.valueData.d"
              :defaultValue="data.valueData.d"
            ></myInput>
            mm
          </td>
          <td>层厚</td>
          <td>
            <myInput
              v-if="data.valueData.valueOption == 2"
              style="text-align: center;width: 70%"
              @change.native="changeNum(data.valueData, 'e')"
              @focus.native="$message('应尽量接近10')"
              v-model="data.valueData.e"
              :defaultValue="data.valueData.e"
            ></myInput>
            mm
          </td>
          <td>CTDI 显示值</td>
          <td>
            <myInput
              v-if="data.valueData.valueOption == 2"
              style="text-align: center ;width: 70%"
              @change.native="changeNum(data.valueData, 'f')"
              v-model="data.valueData.f"
              :defaultValue="data.valueData.f"
            ></myInput>
            mGy
          </td>
        </tr>

        <tr>
          <td colspan="3">材料</td>
          <td>Acrylic</td>
          <td>Air</td>
          <td>Teflon</td>
          <td>LDPE</td>
          <td rowspan="2">
            CT值线性检测
            <br />结果
          </td>
        </tr>
        <tr>
          <td colspan="3">标准CT 值</td>
          <td>120</td>
          <td>-1000</td>
          <td>950</td>
          <td>-100</td>
        </tr>

        <!-- 模板说明书指定扫描条件，临床常用头部扫描条件 -->
        <tr>
          <td colspan="2" rowspan="2">
            <el-radio
              @change="optionChangeValue"
              v-model="data.valueData.valueOption"
              label="0"
            >
              模板说明书指定
              <br />扫描条件
            </el-radio>
            <el-radio
              @change="optionChangeValue"
              style="float: left;margin-left: 7px;"
              v-model="data.valueData.valueOption"
              label="1"
            >
              临床常用头部扫
              <br />描条件
            </el-radio>
          </td>
          <td>实测CT 值</td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              @change.native="changeNum(data.valueData.point[0], 'E')"
              v-model="data.valueData.point[0].A"
              :defaultValue="data.valueData.point[0].A"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              @change.native="changeNum(data.valueData.point[0], 'F')"
              v-model="data.valueData.point[0].B"
              :defaultValue="data.valueData.point[0].B"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              @change.native="changeNum(data.valueData.point[0], 'G')"
              v-model="data.valueData.point[0].C"
              :defaultValue="data.valueData.point[0].C"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="
                data.valueData.valueOption == 0 ||
                  data.valueData.valueOption == 1
              "
              @change.native="changeNum(data.valueData.point[0], 'H')"
              v-model="data.valueData.point[0].D"
              :defaultValue="data.valueData.point[0].D"
            ></myInput>
          </td>
          <td rowspan="4">{{ data.valueData.point[0].I }}</td>
        </tr>
        <tr>
          <td>差值</td>
          <td>{{ data.valueData.point[0].E }}</td>
          <td>{{ data.valueData.point[0].F }}</td>
          <td>{{ data.valueData.point[0].G }}</td>
          <td>{{ data.valueData.point[0].H }}</td>
        </tr>
        <!-- 临床常用体部扫描条件 -->
        <tr>
          <td colspan="2" rowspan="2">
            <el-radio
              style="float: left;margin-left: 7px;"
              @change="optionChangeValue"
              v-model="data.valueData.valueOption"
              label="2"
            >
              临床常用体部扫
              <br />描条件
            </el-radio>
          </td>
          <td>实测CT 值</td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="data.valueData.valueOption === 2"
              @change.native="changeNum(data.valueData.point[1], 'E')"
              v-model="data.valueData.point[1].A"
              :defaultValue="data.valueData.point[1].A"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="data.valueData.valueOption === 2"
              @change.native="changeNum(data.valueData.point[1], 'F')"
              v-model="data.valueData.point[1].B"
              :defaultValue="data.valueData.point[1].B"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="data.valueData.valueOption === 2"
              @change.native="changeNum(data.valueData.point[1], 'G')"
              v-model="data.valueData.point[1].C"
              :defaultValue="data.valueData.point[1].C"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9./]'"
              style="text-align: center"
              v-if="data.valueData.valueOption === 2"
              @change.native="changeNum(data.valueData.point[1], 'H')"
              v-model="data.valueData.point[1].D"
              :defaultValue="data.valueData.point[1].D"
            ></myInput>
          </td>
        </tr>
        <tr>
          <td>差值</td>
          <td>{{ data.valueData.point[1].E }}</td>
          <td>{{ data.valueData.point[1].F }}</td>
          <td>{{ data.valueData.point[1].G }}</td>
          <td>{{ data.valueData.point[1].H }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInput: false,
      zhezhao: ""
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
  watch: {
  },
  filters: {},
  methods: {
    optionChangeValue(val) {
      if (val == 0 || val == 1) {
        this.zhezhao = 1;
      } else {
        this.zhezhao = 2;
      }
    },
    returnVal(val, item, index) {
      item.bunit = val;
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
          if (Number(item.e) > 5) this.err("应尽量接近10");
          if (Number(item.e) < 5) {
            item.e = null;
          }
          break;
        // case "f":
        //   if (Number(item.f) > 50) this.err("大于50mGy");
        //   break;
        case "E":
          if (item.A != "") {
            item.E = (120 - Number(item.A)).toFixed46(2);
          }
        case "F":
          if (item.B != "") {
            item.F = (-1000 - Number(item.B)).toFixed46(2);
          }
        case "G":
          if (item.C != "") {
            if (item.C == "/") {
              item.G = "/";
            } else {
              item.G = (950 - Number(item.C)).toFixed46(2);
            }
          }
        case "H":
          if (item.D != "") {
            item.H = (-100 - Number(item.D)).toFixed46(2);
          }
          break;
        default:
          break;
      }

      let maxNum = Math.max(
        Math.abs(item.E),
        Math.abs(item.F),
        Math.abs(item.G == "/" ? 0 : item.G),
        Math.abs(item.H)
      );
      let maxResule = [item.E, item.F, item.G, item.H].find(
        i => maxNum == Math.abs(i)
      );
      this.data.valueData.point.forEach(i => (i.I = maxResule));
    }
  },
  mounted() {}
};
</script>

<style>
</style>
