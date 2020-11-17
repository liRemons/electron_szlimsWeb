import request from "@/utils/request";
import qs from "qs";

let service = request.service;

export function querySubmittedSample(sampleType, id) {
  return service({
    url: "/querySubmittedSample_x",
    method: "post",
    data: {
      sampleType,
      staffId: id,
    },
  });
}

//接样
export function receiveSample(labPickSampleStaffId, sampleIds) {
  return service({
    url: "/receiveSample",
    method: "post",
    data: {
      labPickSampleStaffId,
      sampleIds,
    },
  });
}

//送审
export function toSongShen(labPickSampleStaffId, sampleIds) {
  return service({
    url: "/toSongShen",
    method: "post",
    data: {
      labPickSampleStaffId,
      sampleIds,
    },
  });
}

export function updateSampleData(samples, curveId, curveArr, sysAtlasUrl) {
  return service({
    url: "/updateSampleData",
    method: "post",
    data: {
      samples,
      curveId,
      curveArr,
      sysAtlasUrl,
    },
  });
}

export function updateSampleAnalysisStaff(sampleIds, staffId, analysisState) {
  return service({
    url: "/updateSampleAnalysisStaff",
    method: "post",
    data: {
      sampleIds,
      staffId,
      analysisState,
    },
  });
}
/*export function updateSampleState(sampleIds,state) {
    return service({
        url: '/updateSampleState',
        method: 'post',
        data:{
            sampleIds,
            state
        }
    })
}*/

export function updateSampleStateFinger(
  sampleIds,
  state,
  staffId,
  returnReason
) {
  return service({
    url: "/updateSampleState",
    method: "post",
    data: {
      sampleIds,
      state,
      staffId,
      returnReason,
    },
  });
}

export function updateSampleStateReason(
  sampleIds,
  state,
  staffId,
  returnReason
) {
  return service({
    url: "/updateSampleState",
    method: "post",
    data: {
      sampleIds,
      state,
      staffId,
      returnReason,
    },
  });
}

export function getCurveList(pageIndex, pageSize) {
  return service({
    url: "/queryPageSolution",
    method: "post",
    data: {
      pageIndex,
      pageSize,
    },
  });
}

export function addForCurve(
  curveNum,
  materialId,
  regressionEquation,
  coefficient,
  series,
  regressionEquationValue1,
  regressionEquationValue2,
  regressionEquationValue3,
  solutionId
) {
  return service({
    url: "/addCurve",
    method: "post",
    data: {
      curveNum,
      materialId,
      regressionEquation,
      coefficient,
      series,
      regressionEquationValue1,
      regressionEquationValue2,
      regressionEquationValue3,
      solutionId,
    },
  });
}

export function queryAllMaterial() {
  return service({
    url: "/queryAllMaterial",
    method: "post",
  });
}

export function updateCurve(
  curveId,
  curveNum,
  materialId,
  regressionEquation,
  coefficient,
  series,
  regressionEquationValue1,
  regressionEquationValue2,
  regressionEquationValue3
) {
  return service({
    url: "/updateCurve",
    method: "post",
    data: {
      curveId,
      curveNum,
      materialId,
      regressionEquation,
      coefficient,
      series,
      regressionEquationValue1,
      regressionEquationValue2,
      regressionEquationValue3,
    },
  });
}

//新增配置记录
export function updateCurveSolutionPreparationData(
  staffId,
  solutionPreparationData,
  solutionNum
) {
  return service({
    url: "/addSolution",
    method: "post",
    data: {
      staffId,
      solutionPreparationData,
      solutionNum
    },
  });
}

//复制配置记录
export function copySolution(
  staffId,
  beCopySolutionId,
  solutionPreparationData
) {
  return service({
    url: "/copySolution",
    method: "post",
    data: {
      staffId,
      beCopySolutionId,
      solutionPreparationData,
    },
  });
}

//修改配置记录
export function updateSolution(staffId, solutionPreparationData, solutionId) {
  return service({
    url: "/updateSolution",
    method: "post",
    data: {
      staffId,
      solutionPreparationData,
      solutionId,
    },
  });
}

//删除配置记录
export function deleteSolution(solutionId) {
  return service({
    url: "/deleteSolution",
    method: "post",
    data: {
      solutionId,
    },
  });
}

//删除曲线
export function deleteCurve(curveId) {
  return service({
    url: "/deleteCurve",
    method: "post",
    data: {
      curveId,
    },
  });
}

// export function queryAllCurve() {
//   return service({
//     url: "/queryAllCurve",
//     method: "post",
//   });
// }
export function queryAllCurve(testProjectId) {
  return service({
    url: "/queryCurveByTestProject",
    method: "post",
    data: { testProjectId },
  });
}

export function queryStandardByMaterialId(materialIdArr) {
  return service({
    url: "/queryStandardByMaterialId",
    method: "post",
    data: { materialIdArr },
  });
}

export function updateSampleStaffCheck(sampleIds, checkStaffId, staffType) {
  return service({
    url: "/updateSampleStaff",
    method: "post",
    data: {
      sampleIds,
      checkStaffId,
      staffType,
    },
  });
}

export function updateSampleStaff(sampleIds, recordStaffId, staffType) {
  return service({
    url: "/updateSampleStaff",
    method: "post",
    data: {
      sampleIds,
      recordStaffId,
      staffType,
    },
  });
}

export function queryByPurpose(purpose) {
  return service({
    url: "/queryByPurpose",
    method: "post",
    data: {
      purpose,
    },
  });
}

export function querySysDeviceData(sampleNums) {
  return service({
    url: "/querySysDeviceData",
    method: "post",
    data: {
      sampleNums,
    },
  });
}

/*获取审核模板数据*/

export function querySysSampleData(sampleIds) {
  return service({
    url: "/querySysSampleData",
    method: "post",
    data: {
      sampleIds,
    },
  });
}

//分析暂存
export function toTemporaryStorageSampleData(
  samples,
  taskDataStateId,
  curveId,
  curveArr
) {
  return service({
    url: "/temporaryStorageSampleData",
    method: "post",
    data: {
      samples,
      taskDataStateId,
      curveId,
      curveArr,
    },
  });
}

//分析暂存
export function toQuerySysSampleTemporaryStorageData(sampleIds) {
  return service({
    url: "/querySysSampleTemporaryStorageData",
    method: "post",
    data: {
      sampleIds,
    },
  });
}

//分析项管理
export function getAnalysisItemList(pageIndex, pageSize) {
  return service({
    url: "/queryPageTestProjectAnalysis",
    method: "post",
    data: {
      pageIndex,
      pageSize,
    },
  });
}

//获取所有检测项目
export function queryAllTestProject(testProjectName) {
  return service({
    url: "/queryAllTestProject",
    method: "post",
    data: {
      testProjectName,
    },
  });
}

//获取所有检测项目
export function addTestProjectAnalysis(testProjectId, data) {
  return service({
    url: "/addTestProjectAnalysis",
    method: "post",
    data: {
      testProjectId,
      data,
    },
  });
}

//获取所有检测项目
export function toUpdateTestProjectAnalysis(testProjectId, data) {
  return service({
    url: "/updateTestProjectAnalysis",
    method: "post",
    data: {
      testProjectId,
      data,
    },
  });
}

//删除所有检测项目
export function delTestProjectAnalysis(testProjectId) {
  return service({
    url: "/deleteTestProjectAnalysis",
    method: "post",
    data: {
      testProjectId,
    },
  });
}

//获取定性数据
export function queryTestProjectAnalysisItemData(testProjectId) {
  return service({
    url: "/queryTestProjectAnalysisItemData",
    method: "post",
    data: {
      testProjectId,
    },
  });
}

// 配标选择仪器
export function queryBySysDeviceType(sysDeviceType) {
  return service({
    url: "/queryBySysDeviceType",
    method: "post",
    data: {
      sysDeviceType,
    },
  });
}

// 退回委托送样样品
export function updateEntrustGiveSampleReturn(
  sampleIds,
  staffId,
  returnReason
) {
  return service({
    url: "/updateEntrustGiveSampleReturn",
    method: "post",
    data: {
      sampleIds,
      staffId,
      returnReason,
    },
  });
}
