export default [
  {
    name: "project_wsw_ypjcxx",
    projectName: "录入样品检测信息",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    //添加行使用的模板数据
    modelRow: {
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样

      sampleNum: "",
      /*采样编号*/
      SampleAddress: "",
      /*采样地点*/
      sampleName: "", //样品名称
      sampleBulkML: "", //样品采样（体积L）
      Remarks: "",
      /*备注*/

      sampleNumIndex: "",
      isPrototype: true,
      sampleQuantity: "",
      /*样品数量*/
      SamplePoint: "",
      /*采样布点*/
      blankSample: 0,
    },
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_ypjcxx",
      testProjectChineseName: "录入样品检测信息",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      sysReport: "",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样

          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "", //样品名称
          sampleBulkML: "", //样品采样（体积L）
          Remarks: "",
          /*备注*/

          sampleNumIndex: "",
          isPrototype: true,
          sampleQuantity: "",
          /*样品数量*/
          SamplePoint: "",
          /*采样布点*/
          blankSample: 0,
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 35 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "project_wsw_jl_kqcyqf",
    projectName: "空气采样器法",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    //添加行使用的模板数据
    modelRow: {},
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_kqcyqf",
      id: "",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysReport: "",
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_kqcyqf",
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "", //样品名称
          parallelLetter: "",
          flow: "",
          /*采样流量*/
          flowTime: "",
          /*采样时长*/
          volume: "",
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
          sysResult: "",
        },
      ],
      sysDilutionDegree: "", //温度
      sysDilutionHour: "",
      report: "", // 报告值
      remarks: "" /*备注*/,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 35 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "project_wsw_jl_kqcjf",
    projectName: "空气沉降法/皿",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    //添加行使用的模板数据
    modelRow: {},
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_kqcjf",
      id: "",
      sysReport: "",
      testResults: [
        {
          sampleNum: "实验室空白对照",
          testResult: "",
          noEdit: true,
          showInput: true,
        },
      ],
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_kqcjf",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          volume: "", //暴露时间（min）
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          dishSize: "",
          sysReport: "", //报告值
        },
      ],
      sysDilutionDegree: "", //温度
      sysDilutionHour: "",
      remarks: "" /*备注*/,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 35 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "project_wsw_jl_kqcjf5min",
    projectName: "空气沉降法/皿·5min",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    //添加行使用的模板数据
    modelRow: {},
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_kqcjf5min",
      id: "",
      sysReport: "",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_kqcjf5min",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          volume: "", //暴露时间（min）
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          dishSize: "",
          sysReport: "", //报告值
        },
      ],
      sysDilutionDegree: "", //温度
      sysDilutionHour: "",
      remarks: "" /*备注*/,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 35 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "project_wsw_jl_kqcjf15min",
    projectName: "空气沉降法/皿·15min",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    //添加行使用的模板数据
    modelRow: {},
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_kqcjf15min",
      id: "",
      sysReport: "",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_kqcjf15min",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          volume: "", //暴露时间（min）
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          dishSize: "",
          sysReport: "", //报告值
        },
      ],
      sysDilutionDegree: "", //温度
      sysDilutionHour: "",
      remarks: "" /*备注*/,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 35 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "project_wsw_jl_kqcjfm3",
    projectName: "空气沉降法/m^3",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    //添加行使用的模板数据
    modelRow: {},
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_kqcjfm3",
      id: "",
      sysReport: "",
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],

      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_kqcjfm3",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          volume: "", //暴露时间（min）
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          dishSize: "",
          sysReport: "", //报告值
        },
      ],
      sysDilutionDegree: "", //温度
      sysDilutionHour: "",
      remarks: "" /*备注*/,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 35 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "project_wsw_jl_ejxscm2",
    projectName: "二级稀释/cm^2",
    type: null,
    switch: false,

    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_ejxscm2",
      id: "",
      sysReport: "",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      sysDilutionDegree: "",
      sysDilutionHour: "",
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_ejxscm2",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          volume: "", //体积
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          sysReport: "", //报告值
          sysTemperature: "", //温度
          sysSolutionMultiple: 1, //样品溶液稀释倍数
          sysBlankAbsorbance: "", //空白吸光度
          atmosphericPressure: "", //气压
          sysAbsorbance: "", //吸光度
          sysConcentration: "", //浓度
          sysDifference: "", //相对差值
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 61,
        value: function(obj) {
          return 61 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (3 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_wsw_jl_ejxs25cm2",
    projectName: "二级稀释/25cm^2",
    type: null,
    switch: false,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_ejxs25cm2",
      id: "",
      sysReport: "",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      mustWrite: [], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      sysDilutionDegree: "",
      sysDilutionHour: "",
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_ejxs25cm2",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          volume: "", //体积
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          sysReport: "", //报告值
          sysTemperature: "", //温度
          sysSolutionMultiple: 1, //样品溶液稀释倍数
          sysBlankAbsorbance: "", //空白吸光度
          atmosphericPressure: "", //气压
          sysAbsorbance: "", //吸光度
          sysConcentration: "", //浓度
          sysDifference: "", //相对差值
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 310,
        value: function(obj) {
          return 310 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (3 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_wsw_jl_sjxs50cm2",
    projectName: "三级稀释/50cm^2",
    type: null,
    switch: false,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_sjxs50cm2",
      id: "",
      sysReport: "",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名

      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框

      sysDilutionDegree: "",
      sysDilutionHour: "",
      qualityControl: [
        {
          name: "实验室空白对照",
          sysResult: "",
        },
      ],
      point: [
        {
          modelName: "project_wsw_jl_sjxs50cm2",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          sampleName: "",
          volume: "", //体积
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
          sysReport: "", //报告值
          sysTemperature: "", //温度
          sysSolutionMultiple: 1, //样品溶液稀释倍数
          sysBlankAbsorbance: "", //空白吸光度
          atmosphericPressure: "", //气压
          sysAbsorbance: "", //吸光度
          sysConcentration: "", //浓度
          sysDifference: "", //相对差值
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 145,
        value: function(obj) {
          return 145 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (3 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_wsw_dxgcjl",
    projectName: "定性观察记录",
    type: null,
    switch: false,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_dxgcjl",
      id: "",
      point: [{}],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 145,
        value: function(obj) {
          return 145 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (3 + obj.point.length);
        },
      },
    },
  },

  {
    name: "project_wsw_dx",
    projectName: "定性检测",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_dx",
      testProjectChineseName: "定性检测",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      sysReport: "",
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      point: [
        {
          modelName: "project_wsw_dx",
          sampleNum: "", //样品编号
          sampleName: "",
          sampleNumIndex: "",
          sysAnalysisItem: "",
          sysAnalysisResult: "", //分析结果
          sysReportCount: "",
          sysReport: "",
          realItem: "",
          analysisItems: [],
          detectionLimitPieces: "",
          sysObservationResult: "",
        },
      ],
      remarks: "" /*备注*/,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 184,
        value: function(obj) {
          return (
            184 +
            32 * obj.point.length +
            32 * obj.testResults.filter((item) => item.noEdit).length
          );
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "project_wsw_jl_mbpjsf",
    projectName: "MPN计数法",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    valueData: {
      //模块内容键值对
      testProject: "project_wsw_jl_mbpjsf",
      testProjectChineseName: "MPN计数法",
      correct: "MPN计数法",
      testResults: [
        { sampleNum: "实验室空白对照", testResult: "", noEdit: true },
      ],
      sysReport: "",
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstruments: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框

      point: [
        {
          modelName: "project_wsw_jl_mbpjsf",
          sampleNum: "", //样品编号
          sysSampleId: "",
          sampleNumIndex: "",
          parallelLetter: "",
          item1: "",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
          sysReport: "", //报告值
        },
      ],
      remarks: "" /*备注*/,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 35 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
];
