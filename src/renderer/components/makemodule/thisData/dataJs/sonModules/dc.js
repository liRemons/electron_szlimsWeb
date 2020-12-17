export default [
  {
    name: "project_dc_jcxx",
    isHead: true,
    projectName: "检测信息",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: {
      //模块内容键值对
      testProject: "project_dc_jcxx",
      correct: "检测信息",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      sampleNum: "",
      sampleNumIndex: "",

      detectionObjName: "",
      detectionTime: "",
      detectionObjAddress: "",
      detectionAddress: "",
      DetectionBasis: "",

      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 308,
        value: function(obj) {
          return 308;
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
    name: "project_dc_yqsb",
    projectName: "仪器设备",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    modelRow: {
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      SampleTools: "",
      rows: ["", "", "", "", ""],
    },
    valueData: {
      //模块内容键值对
      testProject: "project_dc_yqsb",
      correct: "仪器设备",
      deviceList: ["电场强度", "环境温湿度", "距离测量", "选频检测", "自定义"],
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          SampleTools: "",
          rows: ["环境温湿度", "", "", "", ""],
        },
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          SampleTools: "",
          rows: ["距离测量", "", "", "", ""],
        },
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          SampleTools: "",
          rows: ["电场强度", "", "", "", ""],
        },
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          SampleTools: "",
          rows: ["", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 65,
        value: function(obj) {
          return 65 + 32 * obj.point.length;
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
    name: "project_dc_hjtj",
    projectName: "环境条件",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: {
      //模块内容键值对
      testProject: "project_dc_hjtj",
      correct: "环境条件",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      weather: "",
      temperature: ["", ""],
      humidity: ["", ""],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 65,
        value: function(obj) {
          return 65;
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
    name: "project_dc_jcdxxx",
    projectName: "检测对象信息",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: {
      //模块内容键值对
      testProject: "project_dc_jcdxxx",
      correct: "检测对象信息",
      // pointId: window.uuid(),
      // foreverId: window.uuid(), //永久的id 用于重复样
      antenna: "",
      heightGround: "",
      longitudeTitle: "东经",
      latitudeTitle: "北纬",
      longitude: "",
      latitude: "",
      nature: "",
      sensitive: "",
      level: "",
      vertical: "",
      operationUnit: "",
      networkStandard: "",
      runningState: "",
      antennaQuantity: "",
      point: [],
      range: ["", ""],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 295,
        value: function(obj) {
          return 295;
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
    name: "project_dc_xcdc",
    projectName: "现场调查",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    modelRow: {
      pointId: window.uuid(),
      foreverId: window.uuid(),
      title: "现场检测照片",
      state: 0,
      img: "",
    },
    photoNameArr: [
      "点位示意图",
      "近景照片",
      "远景照片",
      "远景照片",
      "西侧照片",
      "南侧照片",
      "北侧照片",
      "现场检测照片",
    ],
    valueData: {
      //模块内容键值对
      testProject: "project_dc_xcdc",
      correct: "现场照片",
      point: [
        "点位示意图",
        "近景照片",
        "远景照片",
        "远景照片",
        "西侧照片",
        "南侧照片",
        "北侧照片",
        "现场检测照片",
      ].map((item) => {
        return {
          pointId: window.uuid(),
          foreverId: window.uuid(),
          title: item,
          state: 0,
          img: "",
        };
      }),
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 32,
        value: function(obj) {
          return 32 + 33 * obj.point.length;
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
    name: "project_dc_dchjcl",
    projectName: "电磁环境测量",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    modelRow: {
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      rows: ["", "", "", "", "", "", "", "", "", "", ""],
    },
    valueData: {
      //模块内容键值对
      testProject: "project_dc_dchjcl",
      correct: "电磁环境测量",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          rows: ["", "", "", "", "", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 100,
        value: function(obj) {
          return 100 + 32 * obj.point.length;
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
    name: "project_dc_dchjxpcl",
    projectName: "电磁环境选频测量",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: {
      //模块内容键值对
      testProject: "project_dc_dchjxpcl",
      correct: "电磁环境测量",
      pointId: "",
      foreverId: "", //永久的id 用于重复样
      testNum: "",
      pointNum: "",
      pointName: "",
      level: "",
      vertical: "",
      imgList: [
        {
          title: "频谱图",
          name: "频谱图",
          imgName: "",
          img: [],
        },
        {
          title: "E₁",
          name: "E1",
          imgName: "",
          img: [],
        },
        {
          title: "E₂",
          name: "E2",
          imgName: "",
          img: [],
        },
        {
          title: "E₃",
          name: "E3",
          imgName: "",
          img: [],
        },
        {
          title: "E₄",
          name: "E4",
          imgName: "",
          img: [],
        },
        {
          title: "E₅",
          name: "E5",
          imgName: "",
          img: [],
        },
      ],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 362,
        confirm: true,
        value: function(obj) {
          return 362;
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
    name: "project_dc_dchjxpclbg",
    projectName: "电磁环境选频测量表格",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: {
      //模块内容键值对
      testProject: "project_dc_dchjxpclbg",
      correct: "电磁环境选频测量表格",
      pointId: "",
      foreverId: "", //永久的id 用于重复样
      point: [
        {
          v1: 1,
          v2: "",
          v3: "",
          v4: "",
          v5: "",
          v6: "",
          v7: "",
          v8: "",
          v9: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 66,
        confirm: false,
        value: function(obj) {
          return 66 + obj.point.length * 33;
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
    name: "project_dc_dctj",
    projectName: "统计",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    valueData: {
      //模块内容键值对
      testProject: "project_dc_dctj",
      correct: "统计",
      Judge: true,
      pointId: "",
      foreverId: "", //永久的id 用于重复样
      Other: ["", ""],
      total: ["", ""],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        confirm: true,
        fixed: 100,
        value: function(obj) {
          return 100;
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
    name: "project_dc_yysmc",
    projectName: "运营商名称",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: [],
    //添加行使用的模板数据
    modelRow: {
      pointId: "",
      foreverId: "", //永久的id 用于重复样
      noShow: true,
      heBingId: "",
      heBingLength: "",
      service: "",
      frequencyBand: "",
      electricField: "",
      fieldStrength: "",
    },
    valueData: {
      //模块内容键值对
      testProject: "project_dc_yysmc",
      correct: "",
      heBingChange: true,
      heBingJudge: true,
      showInput: false,
      multipleId: 0,
      filterOperateList: [],
      point: [
        {
          noShow: true,
          heBingId: "project_dc_yysmc-0-0-0",
          heBingLength: "",
          service: "",
          frequencyBand: "",
          electricField: "",
          fieldStrength: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 64,
        value: function(obj) {
          return 64 + 32 * obj.point.length;
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
    name: "project_dc_gpjcxx",
    isHead: true,
    projectName: "工频检测信息",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_dc_gpjcxx",
      correct: "检测信息",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      detectionTime:'',
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 395,
        value: function(obj) {
          return 395;
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
    name: "project_dc_jcgk",
    projectName: "检测工况",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_dc_jcgk",
      correct: "检测工况",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      point: [
        {
          deviceName: "",
          showInput: true,
          V: "",
          Vunit: "",
          I: "",
          Iunit: "",
          P: "",
          Punit: "",
          Q: "",
          Qunit: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 68,
        value: function(obj) {
          return 68 + obj.point.length * 32;
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
    name: "project_dc_gpspjcdxxx",
    projectName: "检测对象信息",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      title: "",
      //模块内容键值对
      testProject: "project_dc_gpspjcdxxx",
      correct: "检测对象信息",
      point: [{ id: uuid(), deviceName: "", value: "", detectionType: "" }],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 68,
        value: function(obj) {
          return 68 + obj.point.length * 32;
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
    name: "project_dc_gpjcjg",
    projectName: "工频检测结果",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_dc_gpjcjg",
      correct: "工频检测结果",
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      point: [
        {
          index: 1,
          pointNum: "1#",
          pointDescribe: "",
          argument: "",
          rows: [
            ["电场强度\nE(V/m)", "", "", "", "", "", ""],
            ["磁感应强度\nB(μT)", "", "", "", "", "", ""],
          ],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 98,
        itemHeight: 66,
        value: function(obj) {
          return 98 + obj.point.length * 66;
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
