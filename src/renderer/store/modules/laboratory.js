const laboratory = {
  state: {
    labtemplate: null, // 实验室Tab 模板原始数据
    clearSelect: false,
    hasReviewData: null,
    analysisData: null,
    inspectionTime: "",
    // 录入界面
    deviceType: "",
    cultureTime: "",
  },
  mutations: {
    CHANGETIME: (state, time) => {
      state.cultureTime = time;
    },
    UPDATE_LAB_TEMPLATE: (state, labtemplate) => {
      state.labtemplate = labtemplate;
    },
    CLEAR_SELECT: (state, value) => {
      state.clearSelect = value;
    },
    CHANGE_HASREVIEWDATA: (state, value) => {
      state.hasReviewData = value;
    },
    saveAnalysisData: (state, value) => {
      state.analysisData = value;
    },
    inspectionTime: (state, value) => {
      state.inspectionTime = value;
    },
    UPDATE_DEVICETYPE: (state, data) => {
      state.deviceType = data;
    },
  },
  actions: {
    UpdateLabTemplate({ commit }, labtemplate) {
      commit("UPDATE_LAB_TEMPLATE", labtemplate);
    },

    ClearSelect({ commit }, value) {
      commit("CLEAR_SELECT", value);
    },

    ChangeHasReviewData({ commit }, value) {
      commit("CHANGE_HASREVIEWDATA", value);
    },

    ChangeSaveAnalysisData({ commit }, value) {
      commit("saveAnalysisData", value);
    },
    ChangeInspectionTime({ commit }, value) {
      commit("inspectionTime", value);
    },
  },
};

export default laboratory;
