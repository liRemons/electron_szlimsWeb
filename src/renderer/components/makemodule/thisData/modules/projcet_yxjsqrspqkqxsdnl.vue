<template>
  <div :class="{ _normalHeight_: true }" class="___relative">
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt10">
      <p style="line-height: 16px;margin-top:10px;">
        4.6 影像接收器入射屏前空气比释动能率/（μGy/min）
      </p>
      <p style="line-height: 16px;">4.6.1 标准要求</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;"
      >
        <div class="___relative borderBottom">
          <p class="ml5 tl">验收&状态：非透视荧光屏设备：见下表：</p>
        </div>
        <div
          class="___relative"
          :class="
            index != data.valueData.point.length - 1 ? 'borderBottom' : ''
          "
          v-for="(item, index) in data.valueData.point"
        >
          <div class="___relative tc borderRight" style="width:310px;">
            <span>{{ item.rows[0] }}</span>
          </div>
          <div
            class="Full tc"
            :class="num != 3 ? 'borderRight' : ''"
            :style="{ left: 310 + num * 100 + 'px' }"
            v-for="(val, num) in item.rows.slice(1)"
            style="width:100px;"
          >
            <span>{{ val }}</span>
          </div>
        </div>
      </div>
      <p style="line-height: 16px;">4.6.2 检测及计算方法</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;line-height: 16px;"
      >
        <p class="ml5">
          在X射线管出线口放1.5mm铜板，照射野设为最大，影像接收器距焦点最近（影像接收器位于床上时则调节至床面上方30<br />cm），探测器紧贴在影像接收器入射面，在自动亮度控制条件下测量空气比释动能率。如无自动亮度控制功能，则在70kV，<br />1mA条件下测量。如果设备有滤线栅，则检测应该应除以2。计算公式：检测结果=A×校准因子×测量值，有滤线栅时A=0.5，<br />无滤线栅时A=1。
        </p>
      </div>
      <p style="line-height: 16px;">4.6.2 检测及计算方法</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;"
      >
        <div class="___relative borderBottom">
          <div class="___relative ml5">
            <el-radio v-model="data.valueData.perspective" :label="1"
              >普通荧光屏透视</el-radio
            >
            <el-radio v-model="data.valueData.perspective" :label="2"
              >影像增强器透视</el-radio
            >
          </div>
        </div>
        <div class="___relative">
          <div class="___relative">
            <div
              class="___relative tc borderRight borderBottom"
              style="width: 130px;"
            >
              <span>照射野尺寸</span>
            </div>
            <div
              class="___absolute t0 tc right0 borderBottom"
              style="width: 300px;"
            >
              <div
                class="___relative tc borderRight"
                style="width: 150px;line-height: 16px;"
              >
                <span>测量值/μGy/s<br />nGy/s</span>
              </div>
              <div class="___absolute t0 tc" style="width: 150px;left:150px;">
                <span>校准值/mGy/min</span>
              </div>
            </div>
          </div>
          <div class="___relative">
            <div
              class="___relative tc borderRight"
              style="width: 130px;height:32px;"
            >
              <divModel
                v-model="data.valueData.testingConditions[0]"
                style="width:100%;text-align: center;"
                class="Full heightCenter3 hide focusBg"
              ></divModel>
            </div>
            <div class="___absolute t0 tc right0" style="width: 300px;">
              <div
                class="___relative tc borderRight"
                style="width: 150px;height:32px;"
              >
                <divModel
                  v-model="data.valueData.testingConditions[1]"
                  style="width:100%;text-align: center;"
                  class="Full heightCenter3 hide focusBg"
                ></divModel>
              </div>
              <div class="Full t0 tc" style="width: 150px;left:150px;">
                <divModel
                  v-model="data.valueData.testingConditions[2]"
                  style="width:100%;text-align: center;"
                  class="Full hide focusBg"
                  :edit="false"
                  :is-computer="true"
                  :computers="
                    changeNum(
                      data.valueData.testingConditions[4],
                      data.valueData.testingConditions[1],
                      data.valueData.testingConditions[5]
                    )
                  "
                  :computerFormula="'gs11'"
                >
                </divModel>
              </div>
            </div>
          </div>
          <div class="Full t0 borderRight" style="width: 280px;left:130px;">
            <div class="___relative ml5">
              <span>检测条件：</span>
              <divModel
                v-model="data.valueData.testingConditions[3]"
                style="width:30px;text-align: center;left:60px;"
                class="Full heightCenter3 hide focusBg"
              ></divModel>
              <span style="margin-left:30px;">kV，mA 校准因子=</span>
              <divModel
                v-model="data.valueData.testingConditions[4]"
                style="width:30px;text-align: center;left:210px;"
                class="Full heightCenter3 hide focusBg"
              ></divModel>
            </div>
            <div class="___relative ml5">
              <span>影增前有无滤线栅：</span>
              <el-radio v-model="data.valueData.testingConditions[5]" :label="1"
                >有</el-radio
              >
              <el-radio v-model="data.valueData.testingConditions[5]" :label="2"
                >无</el-radio
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
    "ableInput"
  ],
  methods: {
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeNum(num4, num1, num5) {
      let A = num5 != "" ? (num5 = 1 ? 0.5 : 1) : "";
      if (this.isNumber(num4) && this.isNumber(num1) && this.isNumber(num5)) {
        this.data.valueData.testingConditions[2] = (num4 * num1 * num5).toFixed(
          2
        );
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less">
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
