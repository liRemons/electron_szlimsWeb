<template>
  <div :class="{ _normalHeight_: true }" class="___relative">
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt20">
      <div class="___relative tc">
        <p style="font-size:24px;">深圳市瑞达检测技术有限公司</p>
        <p style="font-size:24px;">
          医用常规X射线诊断设备(透视)质量控制检测原始记录
        </p>
      </div>
      <p style="line-height: 16px;margin-top:10px;">1 项目基本情况</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;"
      >
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>委托单位名称</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.entrustedUnitName"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>委托单位地址</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.entrustedUnitAddress"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>检测地点</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.locationDetection"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>检测内容</span>
          </div>
          <div
            class="___absolute Full tc borderRight"
            style="width:350px;left:160px;"
          >
            <divModel
              v-model="data.valueData.testingContent"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
          <div
            class="___absolute Full tc borderRight"
            style="width:100px;left:510px;"
          >
            <span>检测类别</span>
          </div>
          <div class="___absolute Full tc right0" style="width:100px;">
            <divModel
              v-model="data.valueData.testCategory"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>检测时间</span>
          </div>
          <div
            class="___absolute Full borderRight"
            style="width:350px;left:160px;"
          >
            <span class="ml5">年月日：</span>
            <divModel
              v-model="data.valueData.detectionTime"
              style="width:70%;text-align: center;margin-left:50px;"
              class="Full heightCenter3 tc hide focusBg"
            ></divModel>
          </div>
          <div
            class="___absolute Full tc borderRight"
            style="width:100px;left:510px;"
          >
            <span>检测目的</span>
          </div>
          <div class="___absolute Full tc right0" style="width:100px;">
            <divModel
              v-model="data.valueData.purposeDetection"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>报告编号</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.reportNumber"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>检测评价依据</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.evaluationBasis"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
      </div>

      <p style="line-height: 16px;margin-top:10px;">2 设备基本情况</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;"
      >
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>设备名称</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.deviceName"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>设备型号</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.deviceModel"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>设备编号</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.deviceNum"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>主要参数</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.mainParameter"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>生产厂家</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.manufacturer"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>设备用途</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.equipmentUse"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>管球编号</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.pipeBallNum"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative borderBottom">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>所在场所</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.location"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
        <div class="___relative">
          <div style="width: 160px;" class="tc borderRight ___relative">
            <span>备注</span>
          </div>
          <div class="___absolute Full tc" style="width:550px;left:160px;">
            <divModel
              v-model="data.valueData.remarks"
              style="width:100%;text-align: center;"
              class="Full heightCenter3 hide focusBg"
            ></divModel>
          </div>
        </div>
      </div>

      <p style="line-height: 16px;margin-top:10px;">2 设备基本情况</p>
      <div
        class="___relative ___module_frame_Box"
        style="border-top: solid 1px black;"
      >
        <div class="___relative" style="height:250px">
          <divModel
            v-model="data.valueData.testingInstrument"
            style="width:100%;line-height: 16px;"
            class="rowHeight hide focusBg rowsInput2 warp2 Full"
          ></divModel>
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
  methods: {},
  mounted() {}
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
