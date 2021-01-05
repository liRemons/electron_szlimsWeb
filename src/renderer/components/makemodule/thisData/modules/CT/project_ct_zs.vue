//噪声

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
              >验收：＜0.35%；状态：＜0.45%；稳定性：与基线值相差±10%以内。</span
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
              >选择测量CT值（水）扫描图像，在图像中心选取直径约为测试模体图像直径40%的ROI，测量该ROI的标准偏差，噪声测量值=（中心标准偏差×层厚修正因子×100%）/1000，其中层厚修正因子=√(层厚/10)。</span
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
            <span>{{ data.valueData.a }}kV</span>
          </td>
          <td>管电流</td>
          <td>
            <span>{{ data.valueData.b }}{{ data.valueData.bunit }}</span>
          </td>
          <td>曝光时间</td>
          <td>
            <span>{{ data.valueData.c }}s</span>
          </td>
        </tr>
        <tr>
          <td>SFOV</td>
          <td>
            <span>{{ data.valueData.d }}</span
            >mm
          </td>
          <td>层厚</td>
          <td>
            <span
              :style="{
                color:
                  data.valueData.e < 5 || data.valueData.e > 10
                    ? 'red'
                    : '#000',
              }"
              >{{ data.valueData.e }}</span
            >mm
          </td>
          <td>CTDI 显示值</td>
          <td>
            <span :style="{ color: data.valueData.f > 50 ? 'red' : '#000' }">{{
              data.valueData.f
            }}</span
            >mGy
          </td>
        </tr>

        <tr>
          <td rowspan="2">检测结果</td>
          <td>算法</td>
          <td>层厚修正因子</td>
          <td colspan="2">中心标准偏差</td>
          <td colspan="2">噪声测量值/%</td>
        </tr>
        <tr>
          <td>
            <myInput
              style="text-align: center"
              v-model="data.valueData.A"
              :defaultValue="data.valueData.A"
            ></myInput>
          </td>
          <td>{{ data.valueData.B }}</td>
          <td colspan="2">
            <myInput
              style="text-align: center"
              v-model="data.valueData.C"
              :defaultValue="data.valueData.C"
              @change.native="changeNum(data.valueData, 'D')"
            ></myInput>
          </td>
          <td colspan="2">{{ data.valueData.D }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/bus.js'

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
    changeNum(item, num) {
      switch (num) {
        case 'D':
          if (item.C < 0) {
            item.C = ''
          }
          if (Number(item.C) != '' || Number(item.B) != '')
            item.D = ((Number(item.C) * Number(item.B)) / 10).toFixed46(1)
          break
      }
    },
  },
  mounted() {
    bus.$on('resetCtData', () => {
      let shuiData = this.jsonString.find(
        (i) => i.data.name == 'project_ct_ctzs'
      )
      if (shuiData) {
        let data = shuiData.data.valueData
        let currdata = this.data.valueData
        currdata.a = data.a
        currdata.bunit = data.bunit
        currdata.b = data.b
        currdata.c = data.c
        currdata.d = data.d
        currdata.e = data.e
        currdata.f = data.f
        if (currdata) {
          currdata.B = Math.sqrt(Number(currdata.e) / 10).toFixed46(2)
        }
      }
    })
  },
}
</script>

<style></style>
