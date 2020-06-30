const drone = {
    state: {
        data: {},
        lastTaskid: '',
        lastTime: '',
        loading: true,
        runInterval: true,
        jiLiangLv: [],
        inputNum: ''
    },
    mutations: {
        SET_drone: (state, data) => {
            state.data = data
        },
        SET_LAST_TASKID: (state, lastTaskid) => {
            state.lastTaskid = lastTaskid
        },
        SET_LAST_TIME: (state, lastTime) => {
            state.lastTime = lastTime
        },
        SET_JILIANGLV: (state, jiLiangLvObj) => {
            state.jiLiangLv = jiLiangLvObj;
        },
        SET_INPUTNUM: (state, inputNumS) => {
            state.inputNum = inputNumS;
        }
    },
    actions: {
        SetDrone({ commit }, data) {
            commit('SET_drone', data);
        },
        SetLastTaskid({ commit }, lastTaskid) {
            commit('SET_LAST_TASKID', lastTaskid);
        },
        SetLastTime({ commit }, lastTime) {
            commit('SET_LAST_TIME', lastTime);
        },
        SetJiLiangLv({ commit }, jiLiangLvObj) {
            commit('SET_JILIANGLV', jiLiangLvObj);
        },
        SET_INPUTNUM({ commit }, inputNumS) {
            commit('SET_INPUTNUM', inputNumS);
        },
    }
}

export default drone
