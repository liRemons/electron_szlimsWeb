// 低对比可探测能力

<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable" style="margin-bottom: 10px;">
        <tr class="tl">
          <td colspan="11">
            <span class="ml10">{{
              data.valueData.testProjectChineseName
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="11">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="11" style="text-align: left;padding-left: 10px;">
            <span>验收：＜2.5mm；状态：＜3.0mm。</span>
          </td>
        </tr>
        <tr>
          <td colspan="11">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="11"
            style="padding-left:10px;line-height: 20px;text-indent: 2em;"
          >
            <span style="white-space: normal;"
              >将模体置于扫描野中心，并使圆柱轴垂直于扫描层面，采用临床常用头部扫描条件，设置层厚尽量靠近10mm，且CTDIw应不大于50mGy，尽量接近50mGy，扫描低对比度细节模体中心，获取图像，三组低对比度细节的对比度分别为1.0%、0.5%和0.3%。选择1.0%对比度细节，调节窗宽窗位至观察者所认为的最清晰状态，记录所能观察到的最小直径，细节直径从大到小分别为15mm、9mm、8mm、7mm、6mm、5mm、4mm、3mm、2mm，分别选择0.5%和0.3%对比度细节重复上一步。将观察到的3个最小直径结果与对应的标称对比度相乘后作平均，以平均值作为低对比可探测能力的检测值。</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="11">
            <span class="bold">检测结果</span>
          </td>
        </tr>
        <tr>
          <td rowspan="2">检测条件</td>
          <td colspan="2">管电压</td>
          <td>
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.a"
              :defaultValue="data.valueData.a"
              @change.native="changeNum(data.valueData, 'a')"
            ></myInput>
            kV
          </td>
          <td>管电流</td>
          <td colspan="2">
            <myInput
              style="text-align: center;width: 50%;"
              v-model="data.valueData.b"
              :defaultValue="data.valueData.b"
              @change.native="changeNum(data.valueData, 'b')"
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
          <td colspan="2">曝光时间</td>
          <td colspan="2">
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.c"
              :defaultValue="data.valueData.c"
              @change.native="changeNum(data.valueData, 'c')"
            ></myInput>
            s
          </td>
        </tr>
        <tr>
          <td colspan="2">SFOV</td>
          <td>
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.d"
              :defaultValue="data.valueData.d"
              @change.native="changeNum(data.valueData, 'd')"
            ></myInput>
            mm
          </td>
          <td>层厚</td>
          <td colspan="2">
            <myInput
              style="text-align: center;width: 70%"
              v-model="data.valueData.e"
              :defaultValue="data.valueData.e"
              @focus.native="$message('应尽量接近10')"
              @change.native="changeNum(data.valueData, 'e')"
            ></myInput>
            mm
          </td>
          <td colspan="2">CTDI 显示值</td>
          <td colspan="2">
            <myInput
              style="text-align: center ;width: 70%"
              :style="{ color: data.valueData.f > 50 ? 'red' : '#000' }"
              v-model="data.valueData.f"
              :defaultValue="data.valueData.f"
              @change.native="changeNum(data.valueData, 'f')"
            ></myInput>
            mGy
          </td>
        </tr>
        <tr>
          <td rowspan="5">检测结果</td>
          <td rowspan="2">对比度</td>
          <td colspan="2">孔内CT值</td>
          <td colspan="2">孔外CT值</td>
          <td colspan="2">设置条件</td>
          <td rowspan="2" style="white-space: normal;">可观察最小值（mm）</td>
          <td rowspan="2" style="white-space: normal;">
            最小直径与对比度乘积（mm）
          </td>
          <td rowspan="2" style="white-space: normal;">检测结果（mm）</td>
        </tr>
        <tr>
          <td>M</td>
          <td>SD</td>
          <td>M</td>
          <td>SD</td>
          <td>窗宽</td>
          <td>窗位</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point" :key="index">
          <td>
            <span>{{ item.contrast }}</span>
          </td>
          <td>
            <myInput
              style="text-align: center;width: 60%"
              @change.native="changeNum(item, 'E')"
              v-model="item.A"
              :defaultValue="item.A"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(item, 'E')"
              v-model="item.B"
              :defaultValue="item.B"
            ></myInput>
          </td>
          <td>
            <myInput
              :style="{
                color: Number(item.A) < Number(item.C) ? 'red' : '#000',
              }"
              style="text-align: center"
              @change.native="changeNum(item, 'E')"
              v-model="item.C"
              :defaultValue="item.C"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(item, 'E')"
              v-model="item.D"
              :defaultValue="item.D"
            ></myInput>
          </td>
          <td>
            {{ item.E }}
          </td>
          <td>
            {{ item.F }}
          </td>
          <td>
            <selectModel
              style="width: 100%;float: right;"
              @returnVal="returnGVal"
              :Judge="true"
              v-if="!showInput"
              :special="item"
              :transmitText="item.G"
              :multi-select="false"
              :receive="item"
              :single="true"
              :rows="false"
              :list="['15', '9', '8', '7', '6', '5', '4', '3', '2']"
              :Obj="''"
            ></selectModel>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.H"
              :defaultValue="item.H"
            ></myInput>
          </td>
          <td v-if="index == 0" rowspan="3">
            {{ item.I }}
            <!-- <myInput
              style="text-align: center"
              v-model="item.I"
              :defaultValue="item.I"
            ></myInput> -->
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
      showInput: false,
    }
  },
  computed: {},
  props: [
    'ipdTemplate',
    'pageNumber',
    'data',
    'thisPageIndex',
    'jsonString',
    'showing',
    'watchSign',
    'isTemplate',
    'ableInput',
    'task',
    'target',
    'deviceData',
  ],
  filters: {},
  methods: {
    returnVal(val, name, index) {
      this.data.valueData.bunit = val
    },
    returnGVal(val, item, index) {
      item.G = val
      switch (item.contrast) {
        case '1%':
          item.H = item.G
          break
        case '0.5%':
          item.H = (item.G * 0.5).toFixed46(2)
          break
        case '0.3%':
          item.H = (item.G * 0.3).toFixed46(2)
          break
        default:
          break
      }
      let harr = this.data.valueData.point
        .map((o) => o.H)
        .filter((i) => i != '')
        .map((z) => Number(z))
      this.data.valueData.point.forEach(
        (i) => (i.I = this.IntegerAdd2((eval(harr.join('+')) / 3).toFixed46(2)))
      )
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(' ', '')
      let val = el.target.value
      this.data.valueData.deviceType = val
      if (val === '') {
        this.showInput = false
      }
      this.$forceUpdate()
    },
    err(msg) {
      this.$notify({
        type: 'error',
        message: msg,
      })
    },
    changeNum(item, num) {
      if (['a', 'b', 'c', 'd', 'e', 'f'].includes(num)) {
        if (isNaN(item[num])) {
          item[num] = ''
        }
      }
      switch (num) {
        case 'f':
          if (Number(item.f) > 50) this.err('大于50mGy')
          break
        case 'e':
          if (Number(item.e) < 5) this.err('应尽量接近10')
          if (Number(item.e < 5)) {
            item.e = null
          }
          break
        case 'E':
          if (item.A != '' && item.B != '' && item.C != '' && item.D != '') {
            item.E = this.IntegerAdd0(
              (
                Number(item.A) -
                Number(item.C) +
                5 * Math.max(Number(item.B), Number(item.D))
              ).toFixed46(1)
            )
            item.F = this.IntegerAdd0(
              ((Number(item.A) + Number(item.C)) / 2).toFixed46(1)
            )
          }
          if (item.A < item.C) {
            this.err('孔内值必须大于孔外值')
          }
          break
        default:
          break
      }
    },
  },
  mounted() {},
}
</script>

<style></style>
