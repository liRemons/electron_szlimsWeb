export default [{
  name: 'project_ct_zdcdwjd',
  projectName: '诊断床定位精度',
  switch: true,
  type: null,
  publicData: [], //本模块的公共数据
  noCopyArr: [],
  valueData: { //模块内容键值对
    testProject: 'project_ct_zdcdwjd',
    correct: "诊断床定位精度",
    pointId: window.uuid(),
    foreverId: window.uuid(), //永久的id 用于重复样
    point: [{
      type: '定位',
      instruct: '进300mm',
      startValue: '',
      endValue: '',
      errorValue: '',
      isPrototype: true,
    }, {
      type: '归位',
      instruct: '退300mm',
      startValue: '',
      endValue: '',
      errorValue: '',
      isPrototype: true,
    }],
    size: '',
    deviceType: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 324,
      confirm: true,
      value: function (obj) {
        return 324;
      }
    },
    _short: {
      carried: false,
      value: function (obj) {
        return 0
      }
    }
  }
}, {
  name: 'project_ct_dwgjd',
  projectName: '定位光精度',
  switch: true,
  type: null,
  publicData: [], //本模块的公共数据
  noCopyArr: [],
  valueData: { //模块内容键值对
    testProject: 'project_ct_dwgjd',
    correct: "定位光精度",
    pointId: window.uuid(),
    foreverId: window.uuid(), //永久的id 用于重复样
    initialPosition: '',
    lastPosition: false,
    A: '',
    B: '',
    C: '',
    D: '',
    E: '',
    F: '',
    result: '',
    point: [],

  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 432,
      confirm: true,
      value: function (obj) {
        return 432;
      }
    },
    _short: {
      carried: false,
      value: function (obj) {
        return 0
      }
    }
  },
}, {
  name: 'project_ct_smjqjjd',
  projectName: '扫描架倾角精度',
  switch: true,
  type: null,
  publicData: [], //本模块的公共数据
  noCopyArr: [],
  valueData: { //模块内容键值对
    testProject: 'project_ct_smjqjjd',
    correct: "扫描架倾角精度",
    pointId: window.uuid(),
    foreverId: window.uuid(), //永久的id 用于重复样
    option: '',
    isIncline: '',
    isInclineOk: '',
    A: '',
    B: '',
    C: '',
    D: '',
    E: '',
    F: '',
    G: '',
    result: '',
    point: [],
    size: '',
    deviceType: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 340,
      confirm: true,
      value: function (obj) {
        return 340;
      }
    },
    _short: {
      carried: false,
      value: function (obj) {
        return 0
      }
    }
  }
}, {
  name: 'project_ct_cjcgpc',
  projectName: '重建层厚偏差',
  switch: true,
  type: null,
  publicData: [], //本模块的公共数据
  noCopyArr: [],
  valueData: { //模块内容键值对
    testProject: 'project_ct_cjcgpc',
    correct: "重建层厚偏差",
    pointId: window.uuid(),
    foreverId: window.uuid(), //永久的id 用于重复样
    remark:'',
    point: [{
      scope: 's<1',
      A: '',
      AColor: false,
      B: '',
      C: '',
      D: '',
      E: '',
      F: '',
      G: '',
      H: '',
      I: '',
      J: '',
      K: ''
    }, {
      scope: '2mm≥s≥1m',
      A: '',
      AColor: false,
      B: '',
      C: '',
      D: '',
      E: '',
      F: '',
      G: '',
      H: '',
      I: '',
      J: '',
      K: ''
    }, {
      scope: 's＞2mm',
      A: '',
      AColor: false,
      B: '',
      C: '',
      D: '',
      E: '',
      F: '',
      G: '',
      H: '',
      I: '',
      J: '',
      K: ''
    }]
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 437,
      confirm: true,
      value: function (obj) {
        return 437;
      }
    },
    _short: {
      carried: false,
      value: function (obj) {
        return 0
      }
    }
  }
}, {
  name: 'project_ct_ctdi',
  projectName: 'CTDI',
  switch: true,
  type: null,
  publicData: [], //本模块的公共数据
  noCopyArr: [],
  valueData: { //模块内容键值对
    testProject: 'project_ct_ctdi',
    correct: "CTDI",
    pointId: window.uuid(),
    foreverId: window.uuid(), //永久的id 用于重复样
    factorArr: '',
    options: [],
    point: [{
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: '',
      h: '',
      result: '',
      datas: [{
        scope: '头部',
        location: '中心',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '头部',
        location: '上方',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '头部',
        location: '下方',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '头部',
        location: '左侧',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '头部',
        location: '右侧',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }]
    }, {
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',
      e: '',
      f: '',
      g: '',
      h: '',
      result: '',
      datas: [{
        scope: '体部',
        location: '中心',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '体部',
        location: '上方',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '体部',
        location: '下方',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '体部',
        location: '左侧',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        scope: '体部',
        location: '右侧',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }]
    }]
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 437,
      confirm: true,
      value: function (obj) {
        return 1058;
      }
    },
    _short: {
      carried: false,
      value: function (obj) {
        return 0
      }
    }
  }
},
  {
    name: 'project_ct_ctzs',
    projectName: 'CT 值（水）',
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: { //模块内容键值对
      testProject: 'project_ct_ctzs',
      correct: "CT 值（水）",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',
      e: '',
      f: '',
      result: '',
      point: [],

    },
    height: { //模块高度
      _normal: {
        carried: true,
        fixed: 324,
        confirm: true,
        value: function (obj) {
          return 324;
        }
      },
      _short: {
        carried: false,
        value: function (obj) {
          return 0
        }
      }
    }
  },
  {
    name: 'project_ct_jyx',
    projectName: '均匀性',
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: { //模块内容键值对
      testProject: 'project_ct_jyx',
      correct: "均匀性",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',
      e: '',
      f: '',
      result: '',
      A: '',
      B: '',
      C: '',
      D: '',
      E: '',
      F: '',
      G: '',
      H: '',
      I: '',
      point: []
    },
    height: { //模块高度
      _normal: {
        carried: true,
        fixed: 423,
        confirm: true,
        value: function (obj) {
          return 423;
        }
      },
      _short: {
        carried: false,
        value: function (obj) {
          return 0
        }
      }
    }
  }, {
    name: 'project_ct_zs',
    projectName: '噪声',
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: { //模块内容键值对
      testProject: 'project_ct_zs',
      correct: "噪声",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',
      e: '',
      f: '',
      A: '',
      B: '',
      C: '',
      D: '',
      result: '',
      point: [],

    },
    height: { //模块高度
      _normal: {
        carried: true,
        fixed: 341,
        confirm: true,
        value: function (obj) {
          return 341;
        }
      },
      _short: {
        carried: false,
        value: function (obj) {
          return 0
        }
      }
    }
  },
  {
    name: 'project_ct_gdbfbl',
    projectName: '高对比分辨力',
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: { //模块内容键值对
      testProject: 'project_ct_gdbfbl',
      correct: "高对比分辨力",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',

      point: [{
        arithmetic: '常规',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }, {
        arithmetic: '高分辨力',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: ''
      }]

    },
    height: { //模块高度
      _normal: {
        carried: true,
        fixed: 411,
        confirm: true,
        value: function (obj) {
          return 411;
        }
      },
      _short: {
        carried: false,
        value: function (obj) {
          return 0
        }
      }
    }
  },
  {
    name: 'project_ct_ddbktcnl',
    projectName: '低对比可探测能力',
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: { //模块内容键值对
      testProject: 'project_ct_ddbktcnl',
      correct: "低对比可探测能力",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      option: '',
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',
      e: '',
      f: '',

      point: [{
        contrast: '1%',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
        I: ''
      }, {
        contrast: '0.5%',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
        I: ''
      }, {
        contrast: '0.3%',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
        I: ''
      }]

    },
    height: { //模块高度
      _normal: {
        carried: true,
        fixed: 551,
        confirm: true,
        value: function (obj) {
          return 551;
        }
      },
      _short: {
        carried: false,
        value: function (obj) {
          return 0
        }
      }
    }
  }, {
    name: 'project_ct_ctzxx',
    projectName: 'CT 值线性',
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: { //模块内容键值对
      testProject: 'project_ct_ctzxx',
      correct: "CT 值线性",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      a: '',
      b: '',
      bunit: '',
      c: '',
      d: '',
      e: '',
      f: '',
      valueOption: '',
      point: [{
        title: '模板说明书指定扫描条件，临床常用头部扫描条件',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
        I: ''
      }, {
        title: '临床常用体部扫描条件',
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
        I: ''
      }]

    },
    height: { //模块高度
      _normal: {
        carried: true,
        fixed: 567,
        confirm: true,
        value: function (obj) {
          return 567;
        }
      },
      _short: {
        carried: false,
        value: function (obj) {
          return 0
        }
      }
    }
  }

]
