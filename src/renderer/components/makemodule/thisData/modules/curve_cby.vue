<template>
  <!-- 储备液配制记录 改为 标准工作液-->
  <div class="curve_cby">
    <table style="width: 1140px" border="1" class="curveTable">
      <tr>
        <td class="tl05" colspan="12">标准工作液配制记录</td>
      </tr>
      <tr>
        <td colspan="3">标准物质</td>
        <td>
          取用量
          <CurveUnit
            :unit="data.valueData.DosageUnit"
            :type="2"
            @change="
              (val) => {
                data.valueData.DosageUnit = val
              }
            "
          ></CurveUnit>
        </td>
        <td>
          定容体积
          <CurveUnit
            :unit="data.valueData.volUnit"
            :type="3"
            @change="
              (val) => {
                data.valueData.volUnit = val
              }
            "
          ></CurveUnit>
        </td>
        <td>单位转换系数</td>
        <td colspan="2">
          <selectModel
            @returnVal="returnVal"
            :Judge="true"
            :special="''"
            :transmitText="data.valueData.dataType"
            :multi-select="false"
            :receive="'dataType'"
            :single="true"
            :rows="false"
            :list="['标准溶液浓度', '目标物含量']"
            :Obj="''"
          >
          </selectModel>
        </td>
        <td colspan="3">标液编号</td>
        <td>有效期</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="index + 'index'">
        <td colspan="3">
          <el-popover
            v-model="item.popoverFlag"
            placement="right"
            trigger="click"
            @show="show(item)"
          >
            <div>
              <p v-for="a in num">
                <el-link
                  type="primary"
                  @click=";(item.materialNum = a), (item.popoverFlag = false)"
                  >{{ a }}</el-link
                >
              </p>
            </div>
            <divModel v-model="item.materialNum" slot="reference"></divModel>
          </el-popover>
        </td>
        <td>
          <divModel v-model="item.Dosage"></divModel>
        </td>
        <td>
          <divModel v-model="item.constantVolume"></divModel>
        </td>
        <td>
          <divModel :isNumBox="true" v-model="item.count"></divModel>
        </td>
        <td
          colspan="2"
          v-if="index == 0"
          :rowspan="data.valueData.point.length"
        >
          见标准工作液浓度
        </td>
        <td colspan="3" class="___relative">
          <divModel v-model="item.numbering"></divModel>
          <div
            class="___absolute"
            style="top: 0; right: -140px"
            v-if="!onlyRead"
          >
            <div
              class="rowOption"
              style="display: inline-block"
              @click="addRow(item, index)"
            >
              +
            </div>
            <div
              class="rowOption"
              style="display: inline-block"
              @click="delRow(index)"
            >
              -
            </div>
          </div>
        </td>
        <td
          v-if="index == 0"
          :rowspan="data.valueData.point.length"
          class="___relative"
        >
          <divModel v-model="item.validityPeriod"></divModel>
          <el-button
            v-if="!onlyRead"
            class="___absolute"
            style="top: 0; right: -80px"
            size="mini"
            icon="el-icon-search"
            circle
            @click="create"
          ></el-button>
          <el-select
            @change="changeFormula"
            v-if="!onlyRead"
            v-model="data.valueData.formula"
            placeholder="请选择公式"
            class="___absolute"
            style="right:-250px;width:200px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.value"
                placement="left-start"
              >
                <span>{{ item.label }}</span>
              </el-tooltip>
            </el-option>
          </el-select>
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
      options: [
        {
          value: '标准溶液浓度*TVOC标准储备液取用量*单位转换系数',
          label: 'TVOC18883',
        },
        {
          value:
            '标准溶液浓度*TVOC标准储备液取用量/定容体积*单位转换系数\nTVOC标准溶液标准值*TVOC标准储备液取用量/定容体积*单位转换系数',
          label: 'TVOC50325',
        },
        {
          value: '甲醛标准储备液浓度*取用量/工作液定容体积*单位转换系数',
          label: '甲醛和其他',
        },
        {
          value:
            '标准溶液浓度*(取用量最大值-取用量）/工作液的定容体积*单位转换系数',
          label: '臭氧',
        },
      ],
    }
  },
  mounted() {},
  watch: {},
  methods: {
    returnVal(a) {
      this.jsonString.forEach((item) => {
        item.to === 'curve_cby' && (item.data.valueData.dataType = a)
      })
    },
    // 公式改变
    changeFormula() {
      this.jsonString.forEach((item) => {
        item.to === 'curve_cby' &&
          (item.data.valueData.formula = this.data.valueData.formula)
      })
    },
    show(data) {
      let footPoint = this.__getPoint(this.jsonString, 'curve_foot')
      // 获取储备液或者没有生成过储备液的编号
      this.num = [
        ...new Set(
          footPoint.map((item) => !item.isStockSolution && item.numbering)
        ),
      ].filter((item) => item)
      // 针对 TVOC 50325标准
      if (
        footPoint.length === 1 &&
        footPoint[0].materialName.includes('TVOC')
      ) {
        this.num.push(footPoint[0].materialName)
      }
      if (!this.num.length) {
        data.popoverFlag = false
      }
    },
    addRow(data, index) {
      let point = this.__getPoint(this.jsonString, 'curve_cby')
      if (point.length >= 10) {
        this.$message.warning('您最多只能添加10条')
        return
      }
      let obj = Object.assign({}, data)
      obj.noUse = true
      obj.popoverFlag = false
      this.data.valueData.point.splice(index + 1, 0, obj)
      bus.$emit('reset')
    },
    delRow(index) {
      if (this.__getPoint(this.jsonString, 'curve_cby').length <= 1) {
        return
      }
      this.data.valueData.point.splice(index, 1)
      bus.$emit('reset')
    },
    create() {
      console.log(this.data.valueData.formula)
      if (!this.data.valueData.formula) {
        this.$message.warning('请选择公式！')
        return
      }
      let footPoint = this.__getPoint(this.jsonString, 'curve_foot').filter(
          (item) => !item.isStockSolution
        ),
        point = this.__getPoint(this.jsonString, 'curve_cby'),
        num = this.__getPoint(this.jsonString, 'curve_cby').map((item) => {
          return {
            Dosage: item.Dosage,
            constantVolume: item.constantVolume,
            numbering: item.numbering,
            materialNum: item.materialNum,
            count: item.count,
          }
        }),
        cdyndPoint = this.__getPoint(this.jsonString, 'curve_cbynd'),
        rows = []
      // 重置curve_cbynd
      let Index = []
      this.jsonString.forEach((item, index) => {
        if (item.to == 'curve_cbynd') Index.push(index)
      })
      if (Index.length > 1) {
        let length = Index.slice(-1) - Index[0]
        this.jsonString.splice(Index[0] + 1, length)
      }

      let newCdyndPoint = []
      footPoint.forEach((item, index) => {
        newCdyndPoint[index] = {
          id: item.id,
          standardValue: item.standardValue,
          materialName: item.materialName,
          concentration: item.concentration,
          num: num,
          rows: [],
        }
      })
      this.jsonString.forEach((item, index) => {
        if (item.to == 'curve_cbynd') {
          item.data.valueData.point = newCdyndPoint
        }
      })
      bus.$emit('reset')
    },
  },
}
</script>
