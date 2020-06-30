import request from '@/utils/request'
import qs from 'qs'

let service = request.service;

// 获取模板数据
export function getTaskById(taskId) {
  return service({
    url: '/queryTaskById',
    method: 'post',
    data: qs.stringify({
      taskId
    })
  })
}


// 仪器查询
export function getInstrumentList(taskId, subCompanyId) {
  return service({
    url: '/queryListType',
    method: 'post',
    data: qs.stringify({
      taskId,
      subCompanyId
    })
  })
}


// 添加任务模板数据
export function addGwCyTaskData(taskId, data) {
  return service({
    url: '/addGwCyTaskData',
    method: 'post',
    data: qs.stringify({
      taskId,
      data
    })
  })
}


// 更新任务模板数据
export function updateTask(taskId, data) {
  return service({
    url: '/updateTask',
    method: 'post',
    data: qs.stringify({
      taskId,
      data
    })
  })
}


