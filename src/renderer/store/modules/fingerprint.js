const fingerprint = {
  state: {
    fingerprintCode: null,
    fingerprintMsg: "",
  },
  mutations: {
    CHANGE_FINGER (state, data) {
      
      state.fingerprintCode = data.code;
      state.fingerprintMsg = data.msg;
    },
  },
  actions:{
    CHANGE_FINGER_MUTATIONS(context,data){
      context.commit('CHANGE_FINGER',data)
    }
  }
};

export default fingerprint
