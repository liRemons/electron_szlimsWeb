import request from "@/utils/request";
let service = request.service;

export function winGetUserInfo(phone,pwd) {
  return service({
    url: "/winGetUserInfo",
    method: "post",
    data: {
      phone,
      pwd
    },
  });
}
export function updateStaffOnlineTime(staffId) {
  return service({
    url: "/updateStaffOnlineTime",
    method: "post",
    data: {
      staffId,
    },
  });
}
