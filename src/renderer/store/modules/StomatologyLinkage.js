const StomatologyLinkage = {
  state: {
    testingState: 1,

    purposeDetection: "",
    JudgePhotography: false,
    // deviceFactor: "[{\"value\":\"80/1.07\",\"key\":1572443265583},{\"value\":\"100/1.14\",\"key\":1572443274594},{\"value\":\"150/1.52\",\"key\":1572443281894},{\"value\":\"200/1.68\",\"key\":1572443287879}]",
    deviceFactor: "",
    deviceFactor2: "",
    deviceFactorObj: "",
    workArr: [],
    windowArr: [],
    doorArr: [],
    wallArr: [],
    buildingArr: [],
    Arr: [],

    syntheticData: [],

    timeExposure: "",
    needPorjectName: "",
    workNum: 0,
    surgeon: false,
    changeNum: true,
    resolvingPower: [],
    testprojectId: false,

    sizeList: [],
    sizeList2: [],
    NumberOfDetectors: "",
  },
  mutations: {
    savePurposeDetection(state, payload) {
      state.purposeDetection = payload;
    },
    saveJudgePhotography(state, payload) {
      state.JudgePhotography = payload;
    },
    saveWorkNum(state, payload) {
      state.workNum++;
    },
    setTestprojectId(state, payload) {
      state.testprojectId = payload;
    },

    saveWorkArr(state, payload) {
      state.workArr = payload;
    },
    saveWindowArr(state, payload) {
      state.windowArr = payload;
    },
    saveDoorArr(state, payload) {
      state.doorArr = payload;
    },
    saveWallArr(state, payload) {
      state.wallArr = payload;
    },
    savebuildingArr(state, payload) {
      state.buildingArr = payload;
    },

    saveSurgeonArr(state, payload) {
      state.syntheticData = payload;
      state.needPorjectName = "projcet_szwjcjlmknr";
      state.changeNum = !state.changeNum;
    },
    changeNumberOfDetectors(state, data) {
      state.NumberOfDetectors = data;
    },

    saveJudgePorjectName(state, payload) {
      let data = [];
      state.syntheticData = [];
      if (
        state.purposeDetection === "豁免检测" ||
        state.purposeDetection === "环保验收"
      ) {
        state.needPorjectName = "projcet_jgysnr";
        data = data
          .concat(state.workArr)
          .concat(state.windowArr)
          .concat(state.doorArr)
          .concat(state.wallArr)
          .concat(state.buildingArr);
        data.forEach((item, index) => {
          let obj = {
            rows: [
              item.rows[0],
              "",
              "",
              "",
              "",
              "",
              "",
              "",
              item.rows[item.rows.length - 1],
            ],
            isSzpbt: item.isSzpbt,
          };
          state.syntheticData.push(obj);
        });
      } else {
        state.needPorjectName = "projcet_jcbnr";
        state.syntheticData = data
          .concat(state.workArr)
          .concat(state.windowArr)
          .concat(state.doorArr)
          .concat(state.wallArr)
          .concat(state.buildingArr);
      }
      state.changeNum = !state.changeNum;
    },

    saveClear(state, payload) {
      state.workArr = [];
      state.windowArr = [];
      state.doorArr = [];
      state.wallArr = [];
      state.buildingArr = [];

      state.surgeon = false;
    },

    saveSurgeon(state, payload) {
      state.surgeon = !state.surgeon;
    },

    saveTimeExposure(state, payload) {
      state.timeExposure = payload;
    },

    saveTestingState(state, payload) {
      state.testingState = payload;
    },

    saveResolvingPower(state, payload) {
      state.resolvingPower = payload;
    },
    saveDeviceFactor(state, payload) {
      state.deviceFactor = payload;
    },
    saveDeviceFactor2(state, payload) {
      state.deviceFactor2 = payload;
    },
    saveDeviceFactorObj(state, payload) {
      state.deviceFactorObj = payload;
    },

    saveSizeList(state, payload) {
      state.sizeList = payload;
    },

    saveSizeList2(state, payload) {
      state.sizeList2 = payload;
    },
  },
  actions: {
    actionsPurposeDetection({ commit }, payload) {
      commit("savePurposeDetection", payload);
    },
    confirm({ commit }, payload) {
      commit("saveJudgePhotography", payload);
    },
    actionsJudgePhotography({ commit }, payload) {
      commit("saveJudgePhotography", payload);
    },

    actionsWorkArr({ commit }, payload) {
      commit("saveWorkArr", payload);
      commit("saveJudgePorjectName", payload);
    },
    actionsWorkNum({ commit }, payload) {
      commit("saveWorkNum", payload);
    },
    actionsWindowArr({ commit }, payload) {
      commit("saveWindowArr", payload);
      commit("saveJudgePorjectName", payload);
    },
    actionsDoorArr({ commit }, payload) {
      commit("saveDoorArr", payload);
      commit("saveJudgePorjectName", payload);
    },
    actionsSetTestprojectId({ commit }, payload) {
      commit("setTestprojectId", payload);
    },
    actionsWallArr({ commit }, payload) {
      commit("saveWallArr", payload);
      commit("saveJudgePorjectName", payload);
    },
    actionsbuildingArr({ commit }, payload) {
      commit("savebuildingArr", payload);
      commit("saveJudgePorjectName", payload);
    },
    actionsSurgeonArr({ commit }, payload) {
      commit("saveSurgeonArr", payload);
    },

    actionsClear({ commit }, payload) {
      commit("saveClear", payload);
    },

    actionsSurgeon({ commit }, payload) {
      commit("saveSurgeon", payload);
    },

    actionsTimeExposure({ commit }, payload) {
      commit("saveTimeExposure", payload);
    },

    actionsTestingState({ commit }, payload) {
      // commit('saveTestingState', payload)
    },

    actionsResolvingPower({ commit }, payload) {
      commit("saveResolvingPower", payload);
    },
    actionsDeviceFactor({ commit }, payload) {
      commit("saveDeviceFactor", payload);
    },
    actionsDeviceFactor2({ commit }, payload) {
      commit("saveDeviceFactor2", payload);
    },
    actionsDeviceFactorObj({ commit }, payload) {
      commit("saveDeviceFactorObj", payload);
    },
    actionsSizeList({ commit }, payload) {
      commit("saveSizeList", payload);
    },
    actionsSizeList2({ commit }, payload) {
      commit("saveSizeList2", payload);
    },
  },
};

export default StomatologyLinkage;
