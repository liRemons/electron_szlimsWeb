import request from '@/utils/request'
import qs from 'qs'

// 添加任务
export function add(name) {
    return request({
        url: '/task/add',
        method: 'post',
        data: qs.stringify({
            name
        })
    })
}


//添加任务数据    taskId, lng, lat, height, temperature, humidity, doseRate, voltage
export function addValue(task) {
    return request({
        url: '/task/addValue',
        method: 'post',
        data: qs.stringify(task)
    })
}


// 添加频谱数据   taskId, value 
export function addNengPuValue(task) {
    return request({
        url: '/task/addNengPuValue',
        method: 'post',
        data: qs.stringify(task)
    })
}
