import Vue from "vue";
import Router from "vue-router";
// import Layout from "../views/layout/index";

// 现场操作
// import DocEntering from "../views/docEntering/index";
// import LocalEntering from "../views/local/entering/index";
// import LocalUpload from "../views/local/upload/index";
// import Review from "../views/local/Review/index";

// 实验室操作
// import LaboratoryPickUp from "../views/laboratory/pickup/index";
// import LaboratoryAnalysis from "../views/laboratory/analysis/index";
// import LaboratoryUpload from "../views/laboratory/upload/index";
// import Curve from "../views/laboratory/curve/index";
// import AnalysisItem from "../views/laboratory/analysisItem/index";

Vue.use(Router);
import { getToken } from "../utils/auth";
const constantRouterMap = [
  // {
  //   path: "/",
  //   redirect: "/login",
  // },
  {
    path: "/camera",
    component: () => import("@/views/camera"),
    // component:()=>import('@/views/demo')
  },
  {
    path: "/",
    component: () => import("@/views/block/index"),
  },
  {
    path: "/showFlatTemplate/:templateData",
    component: () => import("../views/showFlatTemplate/index"),
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/404",
    component: () => import("../views/login/index"),
    hidden: true,
  },
  {
    path: "/local",
    component: () => import("../views/main"),
    redirect: "/local/entering",
    children: [
      {
        path: "entering",
        component: () => import("../views/local/entering/index"),
      },
      {
        path: "upload",
        component: () => import("../views/local/upload/index"),
      },
      {
        path: "review",
        component: () => import("../views/local/Review/index"),
      },
      {
        name: "local-doc-entering",
        path: "doc-entering/:target/:ids",
        component: () => import("../views/docEntering/index"),
      },
    ],
  },
  {
    path: "/laboratory",
    component: () => import("../views/main"),
    redirect: "/laboratory/pickUp",
    children: [
      {
        path: "pickUp",
        component: () => import("../views/laboratory/pickup/index"),
      },
      {
        path: "curve",
        component: () => import("../views/laboratory/curve/index"),
      },
      {
        name: "doc-entering",
        path: "doc-entering/:target",
        component: () => import("../views/docEntering/index"),
      },
      {
        path: "analysis",
        component: () => import("../views/laboratory/analysis/index"),
      },
      {
        path: "analysisItem",
        component: () => import("../views/laboratory/analysisItem/index"),
      },
      {
        path: "upload",
        component: () => import("../views/laboratory/upload/index"),
      },
    ],
  },
];

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: constantRouterMap,
});

router.beforeEach((to, from, next) => {
  next();
  // if (to.path == "/login") {

  //   next();
  // } else {
  //   if (getToken()) {
  //     next()
  //   } else {
  //     router.push("/login");
  //   }
  // }
});

export default router;
