import Vue from "vue";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "element-ui/lib/theme-chalk/index.css";
import $ from "jquery";
import App from "./App";
import store from "./store";
import router from "./router";
import "@/icons"; // icon
import "@/permission"; // permission control
import Head from "./components/makemodule/thisData/heads/out_head.js";
import Module from "./components/makemodule/thisData/modules/out_module.js";
import computes from "./utils/computes.js";
import { ipcRenderer, remote } from "electron";
import "viewerjs/dist/viewer.css";
import axios from "./utils/request";
import Viewer from "v-viewer";
import $utils from "methods-remons";
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    navbar: true,
    title: true,
    toolbar: true,
    fullscreen: true,
  },
});
if (!process.env.IS_WEB) Vue.use(require("vue-electron"));

import {
  Pagination,
  Dialog,
  Checkbox,
  Menu,
  Main,
  Container,
  Header,
  Tag,
  Submenu,
  MenuItem,
  Input,
  Select,
  Option,
  Button,
  DatePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Row,
  Col,
  Progress,
  Card,
  Carousel,
  CarouselItem,
  Collapse,
  CheckboxGroup,
  CollapseItem,
  Loading,
  MessageBox,
  Message,
  Notification,
  Scrollbar,
  Tabs,
  TabPane,
  Table,
  TableColumn,
  Radio,
  RadioGroup,
  RadioButton,
  Autocomplete,
  TimePicker,
  Upload,
  InputNumber,
  Avatar,
} from "element-ui";
import "./public/css/Css.css";
import "./public/css/curve.css";
import Axios from "axios";
Vue.use(Checkbox);
Vue.use(InputNumber);
Vue.use(Avatar);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Scrollbar);
Vue.use(CheckboxGroup);
Vue.use(Progress);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Container);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(TimePicker);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Header);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Autocomplete);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Main);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Loading.directive);
Vue.use(Module);
Vue.use(Head);
Vue.use(Tag);
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$utils = $utils;
Vue.prototype.$ = $;
Vue.prototype.hostUrl = "http://120.77.153.63:8033";
Vue.prototype.imgUrl = "http://120.77.153.63:8003";
Vue.prototype.global = global;
Vue.prototype.$ipcRenderer = ipcRenderer;
Vue.prototype.computeObj = computes;
Vue.config.productionTip = false;
Vue.prototype.remote = remote;
Vue.prototype.$updateAxios = axios.updateAxios;
Vue.prototype.$isUpdate = false;
Vue.prototype.version = "1.14";
Vue.prototype.getFactor = function(val, arr) {
  let result = 0;
  let index = "";
  let Judge = true;
  val = parseFloat(val);
  index = arr.findIndex((item, index) => {
    let valArr = item.value.split("/");
    return valArr[0] == val;
  });
  if (index == -1) {
    let min = arr[0].value.split("/")[0];
    let max = arr[arr.length - 1].value.split("/")[0];
    index = val < min ? 0 : val > max ? arr.length - 1 : -1;
  } else {
    Judge = false;
  }
  if (index == -1) {
    index = arr.findIndex((item, index) => {
      let valArr1 = item.value.split("/");
      let valArr2 = arr[index + 1].value.split("/");
      return val > valArr1[0] && val < valArr2[0];
    });
  } else {
    Judge = false;
  }
  if (Judge) {
    let valArr1 = arr[index].value.split("/");
    let valArr2 = arr[index + 1].value.split("/");
    let min = parseFloat(valArr1[1]);
    let max = parseFloat(valArr2[1]);

    // let Intercept = valArr1[1].split('.').length > 1 ? valArr1[1].split('.')[1].length : 0;

    result = parseFloat(
      ((max - min) * (val - valArr1[0])) / (valArr2[0] - valArr1[0]) + min
    );

    // result = Intercept > 0 ? result : result.split('.')[0]
  } else {
    result = arr[index].value.split("/")[1];
  }
  let retain = [];
  arr.forEach((item, index) => {
    retain.push(item.value.split("/")[1]);
  });
  // return parseFloat(result).toFixed46(this.sizeMin(retain));
  return parseFloat(result);
};
Vue.prototype.isNumber = function(val) {
  if (parseFloat(val).toString() == "NaN") {
    return false;
  } else {
    return true;
  }
};
Vue.prototype.JudgeNum = function(arr) {
  let Judge = [];
  arr.forEach((item, index) => {
    if (this.isNumber(parseFloat(item))) {
      Judge.push(parseFloat(item));
    }
  });
  return Judge;
};

Vue.prototype.average = function(arr) {
  let Judge = [];
  Judge = this.JudgeNum(arr);
  return parseFloat(Judge.reduce((acc, val) => acc + val, 0) / Judge.length);
};

Vue.prototype.size = function(arr) {
  //判断平均值的小数点后的位数
  let j;
  if ((arr[0] + "").split(".").length > 1) {
    j = (arr[0] + "").split(".")[1].length;
  } else {
    j = 0;
  }
  for (let i = 1; i < arr.length; i++) {
    if ((arr[i] + "").split(".").length > 1) {
      if ((arr[i] + "").split(".")[1].length > j) {
        j = (arr[i] + "").split(".")[1].length;
      }
    }
  }
  return j;
};

Vue.prototype.sizeMin = function(arr) {
  //判断平均值的小数点后的位数
  let j = 0;
  let data = [];
  arr.forEach((item, index) => {
    let numArr = (item + "").split(".");
    if (numArr.length > 1) {
      data.push(numArr[1].length);
    } else {
      data.push(0);
    }
  });
  return Math.min(...data);
};
Vue.prototype.deepCopy = function(target) {
  let copyed_objs = []; //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target) {
    if (typeof target !== "object" || !target) {
      return target;
    }
    for (let i = 0; i < copyed_objs.length; i++) {
      if (copyed_objs[i].target === target) {
        return copyed_objs[i].copyTarget;
      }
    }
    let obj = {};
    if (Array.isArray(target)) {
      obj = []; //处理target是数组的情况
    }
    copyed_objs.push({ target: target, copyTarget: obj });
    Object.keys(target).forEach((key) => {
      if (obj[key]) {
        return;
      }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }

  return _deepCopy(target);
};
Vue.prototype.getRange = function(val, arr) {
  let result = "";
  let dataKeyTotel = [];
  arr.forEach((item, index) => {
    dataKeyTotel.push(...item.key);
  });
  let max = Math.max(...dataKeyTotel);
  let min = Math.min(...dataKeyTotel);
  let range = "";
  if (val < min) {
    range = min;
  } else if (val > max) {
    range = max;
  }
  if (range !== "") {
    let index = dataKeyTotel.findIndex(
      (item, index) => parseFloat(item) === range
    );
    let rangeIndex = parseInt(index / 2);
    result = arr[rangeIndex].value;
  }

  if (result === "") {
    let index = dataKeyTotel.findIndex((item, index) => item === val);
    let rangeIndex = parseInt(index / 2);
    result = arr[rangeIndex].value;
  }

  if (result === "") {
    let arrLength = arr.length;
    for (let i = 0; i < arrLength; i++) {
      if (val > arr[i].key[0] && val < arr[i].key[1]) {
        result = arr[i].value;
        break;
      }
    }
  }
  return result;
};
// 一位小数，不足补0
Vue.prototype.IntegerAdd0 = function(val) {
  if (!isNaN(val)) {
    if ((val + "").split(".").length == 1) {
      val += ".0";
    }
  }
  return val;
};
// 两位小数，不足补0
Vue.prototype.IntegerAdd2 = function(val) {
  if (!isNaN(val) && (val + "").split(".").length) {
    if ((val + "").split(".")[1].length == 1) {
      val += "0";
    }
  }
  return val;
};
Vue.prototype.significantFigure3 = (data) => {
  if (data !== "") {
    data += "";
    data.split(".")[1] && data.split(".")[1].length == 2 ? (data += "0") : "";
  }
  return data;
};
Vue.prototype.detectionType = function(val) {
  if (val == "环保验收" || val == "卫生验收") {
    return "验收检测";
  } else if (val == "状态") {
    return "状态检测";
  } else {
    return "";
  }
};
// Vue.prototype.getHistory = function() {
//   let historyList = [];
//   document.querySelectorAll(".historyParent").forEach((item) => {
//     let obj = {
//       values: [],
//       title: item.getElementsByClassName("historyTitle")[0].innerText,
//     };
//     Array.prototype.forEach.call(
//       item.getElementsByClassName("historyValue"),
//       (el) => {
//         obj.values.push(el.innerText);
//       }
//     );
//     historyList.push(obj);
//   });
//   return historyList
// };
// 获取当前可能修改记录
Vue.prototype.getHistory = function() {
  let historyList = [];
  document.querySelectorAll(".editHistory").forEach((item) => {
    let obj = {
      values: [], //模块下的每一项
      project: item
        .getElementsByClassName("editHistoryProject")[0]
        .innerText.trim(),
    };
    Array.prototype.forEach.call(
      item.getElementsByClassName("editHistoryTitle"),
      (el) => {
        // 修改值的标题
        obj.values.push({ title: el.textContent.trim() });
      }
    );

    Array.prototype.forEach.call(
      item.getElementsByClassName("editHistoryValue"),
      (el, index) => {
        // 修改的值
        if (obj.values[index].title == "主要参数") {
          let int = el.textContent.includes("mAs") ? "mAs" : "mA";
          let text = el.textContent
            .replace(/[^0-9]/gi, ",")
            .trim()
            .split(",")
            .filter((a) => a);
          obj.values[index].value = `${text[0]}kV ${text[1]}${int}`;
        } else {
          if (el.tagName == "INPUT") {
            obj.values[index].value = el.value.trim();
          } else {
            obj.values[index].value = el.textContent.trim();
          }
        }
      }
    );
    historyList.push(obj);
  });
  return historyList;
};
const myVue = new Vue({
  components: { App },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.myVue = myVue;
