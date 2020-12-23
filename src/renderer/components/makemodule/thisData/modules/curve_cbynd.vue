<template>
  <div>
    <div
      class="tl05"
      style="
        border: 1px solid gray;
        line-height: 32px;
        width: 1138px;
        border-bottom: none;
      "
    >
      标准工作液浓度
      <CurveUnit
        :unit="data.valueData.unit"
        :type="1"
        @change="
          (val) => {
            data.valueData.unit = val
          }
        "
      ></CurveUnit>
    </div>
    <table style="width: 1140px" border="1" class="curveTable">
      <tr>
        <td colspan="2">标准工作液浓度</td>
        <td
          v-for="(item, index) in num"
          :colspan="(10 - 2) / num.length"
          :key="index + 'index'"
        >
          {{ item.numbering }}
        </td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index">
        <td colspan="2" class="___relative">
          <divModel v-model="item.materialName"></divModel>
          <div class="___absolute" v-if="!onlyRead" style="top: 0; left: -45px">
            <el-tooltip :open-delay="500" effect="dark" content="复制一行">
              <div class="rowOption" @click="add(item, index)">+</div>
            </el-tooltip>
            <el-tooltip :open-delay="500" effect="dark" content="删除一行">
              <div class="rowOption" @click="del(item, index)">-</div>
            </el-tooltip>
          </div>
        </td>
        <td
          v-for="(a, b) in item.rows"
          :colspan="(10 - 2) / item.rows.length"
          :key="b + 'index'"
        >
          {{ a }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import bus from '@/utils/bus.js'
export default {
  props: ['data', 'jsonString', 'onlyRead'],
  data() {
    return {
      num: [],
      formula: '',
      dataType: '',
    }
  },
  watch: {
    'data.valueData.point': function() {
      this.init()
    },
  },
  methods: {
    init() {
      this.jsonString.forEach((item) => {
        if (item.to === 'curve_cby') {
          this.dataType = item.data.valueData
          this.formula = item.data.valueData.formula
        }
      })
      let headPoint = this.__getPoint(this.jsonString, 'curve_head')
      this.num = this.data.valueData.point[0].num
      if (!this.num) {
        return
      }
      // 所有的取用量并得到最大值：针对于臭氧===============
      let Dosage = 0
      if (this.formula === '臭氧') {
        let DosageArr = this.__getPoint(
          this.jsonString,
          'curve_cby'
        ).map((item) => Number(item.Dosage))
        Dosage = Math.max(...DosageArr)
      }
      // ===================================================

      this.data.valueData.point.forEach((item, index) => {
        item.rows = []
        item.num.forEach((a, b) => {
          if (this.dataType === '目标物含量') {
            a.constantVolume = 1
          }
          let num = ''
          if (
            a.materialNum.includes('TVOC') &&
            a.materialNum === headPoint[0].materialName &&
            this.formula === 'TVOC50325'
          ) {
            num = (item.standardValue * a.Dosage * a.count).toFixed46(2)
          } else if (!['TVOC18883', '臭氧'].includes(this.formula)) {
            num = (
              ((item.concentration * a.Dosage) / a.constantVolume) *
              a.count
            ).toFixed46(2)
          } else if (this.formula === '臭氧') {
            num = (
              ((item.concentration * (Dosage - a.Dosage)) / a.constantVolume) *
              a.count
            ).toFixed46(2)
          } else if (this.formula === 'TVOC18883') {
            num = (item.concentration * a.Dosage * a.count).toFixed46(2)
          }
          item.rows.push(this.IntegerAdd2(num))
        })
      })
    },
    add(data, index) {
      this.data.valueData.point.push(data)
      bus.$emit('reset')
    },
    del(data, index) {
      let cbyndPoint = this.__getPoint(this.jsonString, 'curve_cbynd')
      if (cbyndPoint.length <= 1) {
        this.$message.error('再删除就没有了')
        return
      }
      this.data.valueData.point.splice(index, 1)
      bus.$emit('reset')
    },
  },
  mounted() {
    this.init()
  },
}
</script>
