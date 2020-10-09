<template>
  <div :class="{ _normalHeight_: true }" class="___relative">
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt10">
      <p style="line-height: 16px; margin-top: 10px">
        4.2 透视受检者入射体表空气比释动能率最大值/（mGy/min）
      </p>
      <p style="line-height: 16px">4.2.1 标准要求</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black"
      >
        <span class="ml5 tl">验收：≤100 mGy/min</span>
      </div>
      <p style="line-height: 16px; margin-top: 10px">4.2.2 检测及计算方法</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black; line-height: 16px"
      >
        <p class="ml5">
          在4.1.1的检测条件下，在水模体上加一块2mm厚的铅板（或关闭影像接收器），调节照射野小于铅板的尺寸，在最大剂量<br />透视模式下测试透视受检者入射体表空气比释动能率最大值。
        </p>
      </div>
      <p style="line-height: 16px; margin-top: 10px">
        4.2.3 检测条件、仪器示值与检测结果
      </p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black"
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
              style="width: 130px"
            >
              <span>照射野尺寸</span>
            </div>
            <div
              class="___absolute t0 tc right0 borderBottom"
              style="width: 300px"
            >
              <div
                class="___relative tc borderRight"
                style="width: 150px; line-height: 16px"
              >
                <span>测量值/μGy/s<br />nGy/s</span>
              </div>
              <div class="___absolute t0 tc" style="width: 150px; left: 150px">
                <span>校准值/mGy/min</span>
              </div>
            </div>
          </div>
          <div class="___relative">
            <div
              class="___relative tc borderRight"
              style="width: 130px; height: 32px"
            >
              <divModel
                v-model="data.valueData.testingConditions[0]"
                style="width: 100%; text-align: center"
                class="Full heightCenter3 hide focusBg"
              ></divModel>
            </div>
            <div class="___absolute t0 tc right0" style="width: 300px">
              <div
                class="___relative tc borderRight"
                style="width: 150px; height: 32px"
              >
                <divModel
                  v-model="data.valueData.testingConditions[1]"
                  style="width: 100%; text-align: center"
                  class="Full heightCenter3 hide focusBg"
                ></divModel>
              </div>
              <div class="Full t0 tc" style="width: 150px; left: 150px">
                <divModel
                  v-model="data.valueData.testingConditions[2]"
                  style="width: 100%; text-align: center"
                  class="Full heightCenter3 hide focusBg"
                ></divModel>
              </div>
            </div>
          </div>
          <div class="Full t0 borderRight" style="width: 280px; left: 130px">
            <div class="___relative ml5">
              <span>检测条件：</span>
              <divModel
                v-model="data.valueData.testingConditions[3]"
                style="width: 50px; text-align: center; left: 60px"
                class="Full heightCenter3 hide focusBg"
              ></divModel>
              <span style="margin-left: 50px">kV，mA</span>
            </div>
            <div class="___relative ml5">
              <span>校准因子=</span>
              <divModel
                v-model="data.valueData.testingConditions[4]"
                style="width: 50px; text-align: center; left: 60px"
                class="Full heightCenter3 hide focusBg"
              ></divModel>
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
    "ableInput",
  ],
  methods: {},
  mounted() {},
};
</script>

<style lang="less">
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
