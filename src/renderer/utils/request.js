import axios from "axios";
import { Message, Loading } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 20000, // 请求超时时间
});
const requestImg = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 20000, // 请求超时时间
});

const updateAxios = axios.create({
  baseURL: "http://xtroms.com:5013", // api 的 base_url
  timeout: 20000, // 请求超时时间
});

let globalLoading;
let hint = true; //是否全局提示
// request拦截器
service.interceptors.request.use(
  (config) => {
    if (navigator.onLine) {
    } else {
      config.url !== "/updateStaffOnlineTime" &&
        this.$message.error("当前无网络");
      return;
    }
    if (config.baseURL !== "http://xtroms.com:5013") {
      // console.log(config.url)
      if (
        window.location.hash.split("#")[1] == "/local/entering" &&
        config.url !== "/updateTaskReturn" &&
        config.url !== "/queryTaskMaterialStatistics"
      ) {
        hint = false;
      } else if (
        config.url == "/temporaryStorageSampleData" ||
        config.url == "/updateStaffOnlineTime"
      ) {
        hint = false;
      } else {
        hint = true;
      }
      if (hint) {
        globalLoading = Loading.service({
          lock: true,
          // target:'#content',
          text: "加载中.....",
          background: "rgba(0, 0, 0, 0.8)",
        });
      }
    }
    // console.log(config)

    if (store.getters.token) {
      // config.headers["authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    globalLoading ? globalLoading.close() : "";
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (!res.success && response.headers["content-type"] != "image/png") {
      Message({
        message: res.msg,
        type: "error",
        duration: 2 * 1000,
      });

      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  (error) => {
    globalLoading ? globalLoading.close() : "";
    console.log("err" + error); // for debug
    // error.msg
    if (hint) {
      Message({
        message: "请求超时",
        type: "error",
        duration: 2 * 1000,
      });
    }
    return Promise.reject(error);
  }
);

export default { service, requestImg, updateAxios };
