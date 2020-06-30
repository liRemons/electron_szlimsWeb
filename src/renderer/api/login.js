import request from '@/utils/request'
let service = request.service;

export function winGetUserInfo(phone) {
    return service({
        url: '/winGetUserInfo',
        method: 'post',
        data: {
            phone
        }
    })
}
