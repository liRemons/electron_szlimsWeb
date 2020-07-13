import request from "@/utils/request";
import qs from "qs";

let service = request.service;
let requestImg = request.requestImg;

// 获取现场列表数据
export function getLocalData(phone) {
  return service({
    url: "/login",
    method: "post",
    data: qs.stringify({
      phone,
    }),
  });
}

export function getAlarmList(listQuery) {
  return service({
    url: "/alarm/showInf",
    method: "get",
    params: {
      page: listQuery.page,
      limit: listQuery.limit,
    },
  });
}

//获取所有检测员和校核员
export function getMan(type) {
  return service({
    url: "/queryStaff",
    method: "get",
    params: {
      type,
    },
  });
}

//获取所有检测员和校核员
export function getAllMan(taskId) {
  return service({
    url: "/queryStaffByTaskId",
    method: "get",
    params: {
      taskId,
    },
  });
}

export function addGwCyTaskData(taskId, startTime, endTime, data) {
  return service({
    url: "/addGwCyTaskData",
    method: "post",
    data: qs.stringify({
      taskId,
      startTime,
      endTime,
      data,
    }),
  });
}

export function updateTask(taskId, startTime, endTime, data) {
  return service({
    url: "/updateTask",
    method: "post",
    data: {
      taskId,
      startTime,
      endTime,
      data,
    },
  });
}

//上传签名
export function uploadImage(formdata) {
  return service({
    url: "/upload_image",
    method: "post",
    data: formdata,
  });
}

//审核
export function winUpdateTaskState(
  taskIds,
  pass,
  checkStaffId,
  isDetect = false,
  reason,
  staffName,
  staffId
) {
  return service({
    url: "/winUpdateTaskState",
    method: "post",
    data: {
      taskIds,
      pass,
      checkStaffId,
      isDetect,
      reason,
      staffName,
      staffId
    },
  });
}

//获取签名
export function getStaffImg(id) {
  return service({
    url: "/getStaffImg",
    method: "post",
    responseType: "arraybuffer",
    transformResponse: function(data) {
      return (
        "data:image/png;base64," +
        btoa(
          new Uint8Array(data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        )
      );
    },
    data: {
      id,
    },
  });
}
export function getStaffImg_x(id) {
  return service({
    url: "/getStaffImg_x",
    method: "post",
    data: {
      id,
    },
  });
}

//修改状态为已上传
export function updateTaskUpload(taskId, uploadStaffId) {
  return service({
    url: "/updateTaskUpload",
    method: "post",
    data: {
      taskId,
      uploadStaffId,
    },
  });
}

export function getQueryByDeviceTypeName(data) {
  return service({
    url: "/fh_queryByDeviceTypeName",
    method: "post",
    data: data,
  });
}

//获取现场采样仪器
export function queryListType(taskId, subCompanyId) {
  return service({
    url: "/queryListType",
    method: "post",
    data: {
      taskId,
      subCompanyId,
    },
  });
}
export function queryDeviceByDeviceTypeId(data) {
  return service({
    url: "/queryDeviceByDeviceTypeId",
    method: "post",
    data: data,
  });
}

//现场更新签名
export function updateTaskData(taskId, data) {
  return service({
    url: "/updateTaskData",
    method: "post",
    data: {
      taskId,
      data,
    },
  });
}

//现场打回任务
export function updateTaskReturn(staffId, taskIds, reason) {
  return service({
    url: "/updateTaskReturn",
    method: "post",
    data: {
      staffId,
      taskIds,
      reason,
    },
  });
}

//更新任务isDone字段，表示该任务已开始监测不能删除
export function updateIsDone(taskId) {
  return service({
    url: "/updateIsDone",
    method: "post",
    data: {
      taskId,
    },
  });
}

//放射暂存现场
export function fsUpdateTaskData(taskId, data) {
  return service({
    url: "/updateTaskData",
    method: "post",
    data: {
      taskId,
      data,
    },
  });
}

//放射暂存现场
export function querySameDayBlankSample() {
  return service({
    url: "/querySameDayBlankSample",
    method: "post",
    data: {},
  });
}

//修改是否要上传点位图
export function toUpdateIsDocImg(projectId, isDocImg) {
  return service({
    url: "/updateIsDocImg",
    method: "post",
    data: {
      projectId,
      isDocImg,
    },
  });
}

//查看耗材
export function queryTaskMaterialStatistics(taskIds) {
  return service({
    url: "/queryTaskMaterialStatistics",
    method: "post",
    data: {
      taskIds,
    },
  });
}

//上传图片
export function taskXcImage(fromData) {
  return requestImg({
    url: "/upload_taskXcImage",
    method: "post",
    data: fromData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

//录入判断
export function queryTaskIsOpen(data) {
  return service({
    url: "/queryTaskIsOpen",
    method: "post",
    data: data,
  });
}

//获取样品编号
export function querySampleNum(data) {
  return service({
    url: "/querySampleNum",
    method: "post",
    data: data,
  });
}

//删除样品编号
export function addSampleNumDelete(sampleNum) {
  return service({
    url: "/addSampleNumDelete",
    method: "post",
    data: {
      sampleNum: sampleNum,
    },
  });
}
// 生成html
export function generateMeasure(taskId, measureHtml) {
  return service({
    url: "/generateMeasure",
    method: "post",
    data: {
      taskId: taskId,
      measureHtml: measureHtml,
    },
  });
}

export function uploadImg(formData) {
  return service.post("/upload_image", formData, {
    headers: {
      "Content-Type": "multipart/form-data;",
    },
  });
}
