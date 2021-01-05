<template>
  <div style="line-height: 30px; padding-top: 10px;" class="___relative">
    <div :class="{ eventCover: !ableInput }"></div>
    <div>
      <div style="text-align: center;">
        <div
          style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;"
        >
          AEC电离室之间一致性（{{ data.valueData.title }}）
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;"
        >
          标准要求
        </div>
        <div class="tl" style="border: 1px solid black; border-top: none;">
          验收：±10.0%内；状态：±15.0%内。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测及计算方法
        </div>
        <div
          class="tl"
          style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;"
        >
          70kV，1mmCu滤过，分别选择一个电离室，在AEC条件下曝光，记录mA，s或mAs或DDI值，将每两个电离室的测量值X进行比较，计算平均值最大偏差。电离室i测量值Xi与电离室j测量值Xj之间的平均值偏差ij=(Xi-Xj)/(Xi+Xj)。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测结果
        </div>
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 230px;">检测指标</td>
          <td>电离室1</td>
          <td>电离室2</td>
          <td>电离室3</td>
          <td style="width: 90px;">平均值偏差<sub>12</sub></td>
          <td style="width: 90px;">平均值偏差<sub>23</sub></td>
          <td style="width: 90px;">平均值偏差<sub>13</sub></td>
        </tr>
        <tr>
          <td>
            <el-radio
              label="mA、s"
              style="width: 30px;"
              @click.native.prevent="
                computeObj.clearRadio('mA、s', data.valueData, 'radioValue')
              "
              v-model="data.valueData.radioValue"
            ></el-radio>
            <el-radio
              label="mAs"
              style="width: 30px;"
              @click.native.prevent="
                computeObj.clearRadio('mAs', data.valueData, 'radioValue')
              "
              v-model="data.valueData.radioValue"
            ></el-radio>
            <el-radio
              label="DDI值"
              style="width: 30px;"
              @click.native.prevent="
                computeObj.clearRadio('DDI值', data.valueData, 'radioValue')
              "
              v-model="data.valueData.radioValue"
            ></el-radio>
          </td>
          <td>
            <myInput
              v-model="data.valueData.arr[0]"
              @change.native="control"
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="data.valueData.arr[1]"
              @change.native="control"
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="data.valueData.arr[2]"
              @change.native="control"
            ></myInput>
          </td>
          <td>
            {{ data.valueData.arr[3] }}
          </td>
          <td>
            {{ data.valueData.arr[4] }}
          </td>
          <td>
            {{ data.valueData.arr[5] }}
          </td>
        </tr>
      </table>

      <div
        class="___absolute myBtn"
        style="left: 750px; top: 0px; width: 65px; text-align: center;"
        @click="sure"
        v-if="target === '0'"
      >
        完成
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'project_dr_aecdlszjyzx',
  props: ['data', 'ableInput', 'jsonString', 'target'],
  computed: {
    state() {
      return this.computeObj.judgeState(
        this.jsonString.find((item) => item.to === 'project_jbxx').data
          .valueData.purposeDetection
      )
    },
    A() {
      return Number(this.data.valueData.arr[0])
    },
    B() {
      return Number(this.data.valueData.arr[1])
    },
    C() {
      return Number(this.data.valueData.arr[2])
    },
  },
  methods: {
    control() {
      this.gs1()
      this.gs2()
      this.gs3()
      this.$forceUpdate()
    },
    gs1() {
      this.data.valueData.arr[3] = (
        (this.A - this.B) /
        (this.A + this.B)
      ).toFixed(2)
    },
    gs2() {
      this.data.valueData.arr[4] = (
        (this.B - this.C) /
        (this.B + this.C)
      ).toFixed(2)
    },
    gs3() {
      this.data.valueData.arr[5] = (
        (this.A - this.C) /
        (this.A + this.C)
      ).toFixed(2)
    },
    sure() {
      if (this.data.valueData.radioValue === '') {
        this.$notify({
          type: 'warning',
          message: '检测指标必须选一个',
        })
      } else {
        this.$notify({
          type: 'success',
          message: '已完成',
        })
      }
    },
  },
}
</script>

<style scoped></style>
