import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import drone from "./modules/drone";
import laboratory from "./modules/laboratory";
import fingerprint from "./modules/fingerprint";
import StomatologyLinkage from "./modules/StomatologyLinkage";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    drone,
    laboratory,
    StomatologyLinkage,
    fingerprint,
  },
  getters,
});

export default store;
