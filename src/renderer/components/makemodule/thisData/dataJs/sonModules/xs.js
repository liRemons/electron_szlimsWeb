export default [{
  name: 'project_xs_xdylqcjlzs',
  switch: false,
  projectName: '消毒医疗器材菌落总数',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_xdylqcjlzs',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框

    sysDilutionDegree: '',
    sysDilutionHour: '',
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',

      sysSamplingQuantity: '',
      sysSamplingQuantityUnit: '',
      item1: '',
      item2: '',
      sysReport: '',
      sysUnit: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_xdhnjjlzs',
  switch: false,
  projectName: '消毒后内镜菌落总数(GB 15982)',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_xdhnjjlzs',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框

    sysDilutionDegree: '',
    sysDilutionHour: '',
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',
      item1: '',
      item2: '',
      item3: '',
      sysReport: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_xdhnjxjzsxdjsgf',
  switch: false,
  projectName: '消毒后内镜细菌总数(消毒技术规范)',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_xdhnjxjzsxdjsgf',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框

    sysDilutionDegree: '',
    sysDilutionHour: '',
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',
      item1: '',
      item2: '',
      sysReport: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_xdyrjlxdjsgf',
  switch: false,
  projectName: '消毒液染菌量(消毒技术规范)',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_xdyrjlxdjsgf',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',
      item1: '',
      item2: '',
      sysReport: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_xdyrjl',
  switch: false,
  projectName: '消毒液染菌量(GB 15982)',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_xdyrjl',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框

    sysDilutionDegree: '',
    sysDilutionHour: '',
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',
      item1: '',
      item2: '',
      sysReport: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_ycxwsypjlzs',
  switch: false,
  projectName: '一次性卫生用品菌落总数',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_ycxwsypjlzs',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框

    sysDilutionDegree: '',
    sysDilutionHour: '',
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',

      sysSamplingQuantity: '',
      sysSamplingQuantityUnit: '',
      sysDiluentQuantity: '',
      item1: '',
      item2: '',
      item3: '',
      item4: '',
      item5: '',
      sysReport: '',
      sysUnit: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_grsbmxjjlzs',
  switch: false,
  projectName: '工人手表面细菌菌落总数',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_grsbmxjjlzs',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框

    sysDilutionDegree: '',
    sysDilutionHour: '',
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',
      volume: '',
      item1: '',
      item2: '',
      sysReport: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_wtgzhbmjlzs',
  switch: false,
  projectName: '物体、工作台表面菌落总数',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_wtgzhbmjlzs',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框

    sysDilutionDegree: '',
    sysDilutionHour: '',
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',
      volume: '',
      item1: '',
      item2: '',
      sysReport: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
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
  name: 'project_xs_syjlzs',
  switch: false,
  projectName: '水样菌落总数',
  isDeviceData: true,
  valueData: { //模块内容键值对
    testProject: 'project_xs_syjlzs',
    sysTestingTime: "", // 实验室检测日期
    sysTestingEndTime: "",
    mustWrite: ['sysTestingTime', 'testDeviceCheckBox'], //必填项字段名
    multipleId: 0,
    sysTemperature: "", //检测环境1
    sysSampleState: "正常",
    sysHumidity: "", //检测环境1
    testDeviceCheckBox: [], //检测复选框
    point: [{
      sysSolutionMultiple: '1',
      sampleNum: "", //样品编号
      sampleNumIndex: '',
      parallelLetter: '',
      sampleName: '',
      item1: '',
      item2: '',
      item3: '',
      item4: '',
      sysReport: '',
    }],
    remarks: '',
  },
  height: { //模块高度
    _normal: {
      carried: true,
      fixed: 222,
      value: function (obj) {
        return 222 + (32 * obj.point.length)
      }
    },
    _short: {
      carried: false,
      value: function (obj) {
        return 0
      }
    }
  }
},]
