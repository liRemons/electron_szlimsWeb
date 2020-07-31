import Cookies from "js-cookie";
import { data } from "jquery";
// import { delete } from "vue/types/umd";

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get("sidebarStatus"),
      withoutAnimation: false,
    },
    device: "desktop",
    taskId: "",
    isConnect: true,
    info: null,
    pinpu: [],
    menuState: "local", // 菜单状态
    templateAction: "update", // 模板动作
    shareObject:{}
  },
  mutations: {
    SESSIONSTORAGE_SET:(state,data)=>{
      state.shareObject[data.key]=data.value
    },
    SESSIONSTORAGE_GET:(state,data)=>{
      
    },
    SESSIONSTORAGE_REMOVE:(state,key)=>{
      if(key){
        delete state.shareObject[key]
      }
      
    },
    SESSIONSTORAGE_CLEAR:(state,data)=>{
      state.shareObject={}
    },
    TOGGLE_BLOCK: (state, menuState) => {
      state.menuState = menuState;
    },
    TEMPLATE_ACTION: (state, action) => {
      state.templateAction = action;
    },
    TOGGLE_SIDEBAR: (state) => {
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set("sidebarStatus", 1);
      state.sidebar.opened = false;
      state.sidebar.withoutAnimation = withoutAnimation;
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device;
    },
    SET_TASKID: (state, taskId) => {
      state.taskId = taskId;
    },
    SET_ISCONNECT: (state, isConnect) => {
      state.isConnect = isConnect;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_PINPU: (state, pinpu) => {
      state.pinpu = pinpu;
    },
  },
  actions: {
    ToggleBlock({ commit }, menuState) {
      commit("TOGGLE_BLOCK", menuState);
    },
    TemplateAction({ commit }, action) {
      commit("TEMPLATE_ACTION", action);
    },
    ToggleSideBar: ({ commit }) => {
      commit("TOGGLE_SIDEBAR");
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit("CLOSE_SIDEBAR", withoutAnimation);
    },
    ToggleDevice({ commit }, device) {
      commit("TOGGLE_DEVICE", device);
    },
    SetTaskId({ commit }, taskId) {
      commit("SET_TASKID", taskId);
    },
    SetIsConnect({ commit }, isConnect) {
      commit("SET_ISCONNECT", isConnect);
    },
    SetInfo({ commit }, info) {
      commit("SET_INFO", info);
    },
    SetPinpu({ commit }, pinpu) {
      commit("SET_PINPU", pinpu);
    },
  },
};

export default app;
