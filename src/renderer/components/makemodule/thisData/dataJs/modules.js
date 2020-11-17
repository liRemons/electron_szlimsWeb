import JC from "./sonModules/jc";
import WSW from "./sonModules/wsw";
import DC from "./sonModules/dc";
import TS from "./sonModules/ts";
import CT from "./sonModules/ct";
import XS from "./sonModules/xs";

export default [
  {
    name: "project_xpczsyzz", //模块名 (保证唯一)
    projectName: "胸壁侧照射野准直",
    type: null, //类型
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_xpczsyzz",
      project: 0, // 0 是不打勾， 1 是打钩
      reason: "", // 未检测原因
      item1: 0, // 超出台边0是不打勾， 1 是打钩
      item2: "", // 超出距离
      item3: 0, // 未超出台边： 0 是不打勾， 1 是打钩
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function() {
          return 32 * 1;
        },
      },
      _short: {
        carried: false,
        value: function() {
          return 26 * 1;
        },
      },
    },
  },
  {
    name: "project_gyyzsydyzx",
    projectName: "光野与照射野的一致性",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_gyyzsydyzx",
      project: 0, // 0 是不打勾， 1 是打钩
      reason: "", // 未检测原因
      item1: "", // a1值
      item2: "", // a2值
      item3: "", // a3值
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function() {
          return 32 * 1;
        },
      },
      _short: {
        carried: false,
        value: function() {
          return 26 * 1;
        },
      },
    },
  },
  {
    name: "project_gdyzsdpl",
    projectName: "管电压指示的偏离",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      testProject: "project_gdyzsdpl",
      point: [
        {
          item1: "大焦点",
          project: 0, // 0 是不打勾， 1 是打钩
          pointdata: [
            {
              item1: "", // 标称值
              item2: "", // 测量值1
              item3: "", // 测量值2
              item4: "", // 测量值3
              item5: "", // 平均值
              item6: "", // 偏差
            },
          ],
        },
        {
          item1: "小焦点",
          project: 0,
          pointdata: [
            {
              item1: "", // 标称值
              item2: "", // 测量值1
              item3: "", // 测量值2
              item4: "", // 测量值3
              item5: "", // 平均值
              item6: "", // 偏差
            },
          ],
        },
      ],
      // 计算结果: "偏差=校准平均值-标称值",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 120,
        value: function(obj) {
          return (
            32 *
            (1 + obj.point[0].pointdata.length + obj.point[1].pointdata.length)
          );
        },
      },
      _short: {
        carried: true,
        value: function(obj) {
          return (
            26 *
            (1 + obj.point[0].pointdata.length + obj.point[1].pointdata.length)
          );
        },
      },
    },
  },
  {
    name: "project_bzc",
    projectName: "半值层 ( HVL ) /mmAl",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_bzc",
      item1: "", // 检测条件kv
      item2: "", // 检测条件mAs
      point: [
        {
          item1: "", // 靶 / 滤过
          item2: "", // 测量值1
          item3: "", // 测量值2
          item4: "", // 测量值3
          item5: "", // 平均值
        },
      ],
      // 计算结果: "半值层取各个状态下的平均值",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (2 + obj.point.length);
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (2 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_scl",
    projectName: "特定辐射输出量",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_scl",
      project: 0,
      project1: 0,
      reason: "", //未检测原因
      item1: "", // 测量值
      item2: "", // 检测条件kv
      item3: "", // 检测条件mAs
      item4: "", // 距离
      item5: "", // cv值
      point: [
        {
          item1: "", // 靶 / 滤过
          item2: "", // 测量值1
          item3: "", // 测量值2
          item4: "", // 测量值3
          item5: "", // 测量值4
          item6: "", // 测量值5
          item7: "", // X100
          item8: "", // 基线值
          item9: "", // 偏差
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (2 + obj.point.length);
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (2 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_gdbfbl",
    projectName: "高对比分辨率",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_gdbfbl",
      project: 0, //（0是不打勾，1是打钩）
      reason: "", //未检测原因
      item1: "", // 检测条件kv
      item2: "", // 检测条件mAs
      item3: "", // 探测器宽度
      item4: "", // 厂家规定值
      point: [
        {
          item1: "水平方向(lp/mm)",
          item2: "", // 测量值
          item3: "", // 90 % 规定值
          item4: "", // 80 %
          item5: "", // 基线值
          item6: "", // 相对偏差
        },
        {
          item1: "竖直方向(lp/mm)",
          item2: "", // 测量值
          item3: "", // 90 % 规定值
          item4: "", // 80 %
          item5: "", // 基线值
          item6: "", // 相对偏差
        },
      ],
    },
    computeResult: require("../../../../assets/icon/formula_module_5.png"), //复杂计算公式图片
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function() {
          return 32 * 4;
        },
      },
      _short: {
        carried: false,
        value: function() {
          return 26 * 4;
        },
      },
    },
  },
  {
    name: "project_yxjsqxy",
    projectName: "影像接收器响应",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_yxjsqxy",
      project: 0, //（0是不打勾，1是打钩）
      reason: "", //未检测原因
      item1: "", //kv
      item2: "", //K
      item3: "", //拟合结果
      item4: "", //拟合曲线类型
      item5: "", //R2
      point: [
        {
          item1: "曝光mAs",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
        },
        {
          item1: "空气比释动能K()",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
        },
        {
          item1: "平均像素值(M)",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
        },
        {
          item1: "像素标准偏差",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function() {
          return 32 * 5;
        },
      },
      _short: {
        carried: false,
        value: function() {
          return 26 * 5;
        },
      },
    },
  },
  {
    name: "project_yxjsqjyx",
    projectName: "影像接收器均匀性",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_yxjsqjyx",
      project: "", //（0是不打勾，1是打钩）
      reason: "", // 未检测原因
      item1: "", // 检测条件kv
      item2: "", // 检测条件mAs
      item3: "", // 靶/滤过
      item4: 0, // 自动曝光
      item5: 0, // 手动曝光
      item6: "", // 均匀性
      point: [
        {
          item1: "平均像素值（M）",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
        },
        {
          item1: "与中心区域偏差%",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
        },
      ],
    },
    computeResult: require("../../../../assets/icon/formula_module_5.png"), //复杂计算公式图片
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function() {
          return 32 * 4;
        },
      },
      _short: {
        carried: false,
        value: function() {
          return 26 * 4;
        },
      },
    },
  },
  {
    name: "project_wy",
    projectName: "伪影",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_wy",
      project: 0, //（0是不打勾，1是打钩）
      reason: "", // 未检测原因
      item1: "", // 检测条件kv
      item2: "", // 检测条件mAs
      item3: "", // 靶/滤过
      item4: "", // 自动曝光
      item5: "", // 手动曝光
      item6: 0, // 是否存在伪影（0:否 1：是）
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function() {
          return 32;
        },
      },
      _short: {
        carried: false,
        value: function() {
          return 26;
        },
      },
    },
  },
  {
    name: "project_zdbgkzcfx",
    projectName: "自动曝光控制重复性",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_zdbgkzcfx",
      project: 0, //（0是不打勾，1是打钩）
      reason: "", // 未检测原因
      item1: "", // 检测条件kv
      item2: "", // 检测条件mAs
      item3: "", // 靶/滤过
      point: [
        {
          item1: "测量值(mAs)",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
          item7: "",
        },
        {
          item1: "与平均值偏差",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
          item7: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * 4;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          // return 26*(2+obj.point.length)
          return 26 * 4;
        },
      },
    },
  },
  {
    name: "project_rxpjjl",
    projectName: "乳腺平均剂量",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_rxpjjl",
      project: 0, //（0是不打勾，1是打钩）
      project1: 0, //（0都不勾选，1是勾选2D，2是勾选3D）
      reason: "", // 未检测原因
      item1: "", // 检测条件kv
      item2: "", // 检测条件mAs
      item3: "", // 检测条件mmAl
      item4: "", // 投射角度
      item5: "", // 靶/滤过
      item6: "", // 转换因子g
      item7: "", // 不同乳房成分修正以你这
      item8: "", // 不同靶/滤过修正因子
      item9: "", // 投照角度修正因子
      item10: "", // 乳腺平均剂量值
      item11: "", // 测量值
      item12: 0, // 3D测量值是否选择（0：不选择 1：选择）
      item13: "", // 3D测量值单位
      point: [
        {
          item1: "测量值K（单位可选）",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
          item7: "",
          item8: "",
        },
        {
          item1: "3D测量值（单位可选）",
          item2: "",
          item3: "",
          item4: "",
          item5: "",
          item6: "",
          item7: "",
          item8: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * 5;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * 5;
        },
      },
    },
  },
  {
    name: "project_dbdxjfz",
    projectName: "对比度细节阈值",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_dbdxjfz",
      project: "", // （0是不打勾，1是打钩）
      reason: "", // 未检测原因
      item1: "", // 检测条件kv
      item2: "", // 检测条件mAs
      point: [
        {
          item1: "", // 细节直径
          item2: "", // 可观察到的最小细节物
          item3: "", // 对比度
        },
        {
          item1: "", // 细节直径
          item2: "", // 可观察到的最小细节物
          item3: "", // 对比度
        },
        {
          item1: "", // 细节直径
          item2: "", // 可观察到的最小细节物
          item3: "", // 对比度
        },
        {
          item1: "", // 细节直径
          item2: "", // 可观察到的最小细节物
          item3: "", // 对比度
        },
        {
          item1: "", // 细节直径
          item2: "", // 可观察到的最小细节物
          item3: "", // 对比度
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (2 + obj.point.length);
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (2 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_xcjctyjl",
    projectName: "现场检测通用记录",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_xcjctyjl",
      testProjectType: "",
      testProjectId: "",
      TestingItems: "",
      correct: "修正系数",
      point: [
        {
          LocationDetection: "",
          Reading1: "",
          Reading2: "",
          Reading3: "",
          correctionFactor: "",
        },
      ],
      detectionResult: "",
      DetectionTime: "",
      Testinginstrument: "",
      Remarks: "",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (3 + obj.point.length);
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
    name: "project_zqxhfwtzs",
    projectName: "周期性和非稳态噪声",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_zqxhfwtzs",
      TestingItems: "",
      LocationDetection: "",
      correct: "修正系数",
      point: [
        {
          L1: "",
          L2: "",
          L3: "",
          L4: "",
          L5: "",
        },
      ],
      CorrectionValue: "",
      detectionResult: "",
      DetectionTime: "",
      Testinginstrument: "",
      TestingInstrument: "",
      Remarks: "",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (3 + obj.point.length);
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
    name: "project_xfl",
    projectName: "新风量",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_xfl",
      TestingItems: "",
      point: [
        {
          LocationDetection: "",
          shape: "",
          area: "",
          val: {
            v1: "",
            v2: "",
            v3: "",
            v4: "",
            v5: "",
            v6: "",
            v7: "",
            v8: "",
            v9: "",
            v10: "",
            v11: "",
            v12: "",
            v13: "",
            v14: "",
            v15: "",
            v16: "",
          },
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (5 * obj.point.length);
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (5 * obj.point.length);
        },
      },
    },
  },
  {
    name: "project_dqy",
    projectName: "大气压",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_dqy",
      TestingItems: "",
      LocationDetection: "",
      AttachedTemperature: "",
      IndicationValue: "",
      scale: "",
      temperature: "",
      supplement: "",
      detectionresult: "",
      DetectionTime: "",
      TestingInstrument: "",
      Remarks: "",
      point: [{}],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (2 + obj.point.length);
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (2 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_xklw",
    projectName: "细颗粒物PM2.5",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_xklw",
      TestingItems: "",
      point: [
        {
          LocationDetection: "",
          Reading1: "",
          Reading2: "",
          Reading3: "",
          Reading4: "",
          Reading5: "",
          correctionFactor: "",
        },
      ],
      detectionResult: "",
      DetectionTime: "",
      Testinginstrument: "",
      Remarks: "",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (3 + obj.point.length);
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
    name: "project_cgxs",
    projectName: "采光系数",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_cgxs",
      TestingItems: "",
      LengthGround: "",
      GroundWidth: "",
      point: [
        {
          windowLength: "",
          windowWidth: "",
          windowNum: "",
        },
      ],
      detectionResult: "",
      DetectionEvent: "",
      TestingInstrument: "",
      Remarks: "",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (2 + obj.point.length);
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 26 * (2 + obj.point.length);
        },
      },
    },
  },
  {
    name: "project_cyhj",
    projectName: "采样环境",
    switch: false,
    isSampleModel: true,
    type: null,
    noCopyArr: ["sampleNum", "foreverId", "sampleNumIndex"],
    publicData: [], //本模块的公共数据
    modelRow: {
      id: Math.random(),
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样
      sampleNum: "",
      /*采样编号*/
      SampleAddress: "",
      /*采样地点*/
      sampleNumIndex: "",
      isPrototype: true,
      deviceNum: "",
      multipleId: 0,
      blankSample: 0,
      sampleName: "",
      time: "",
      flow: "",
      /*采样流量*/
      flowTime: "",
      /*采样时长*/
      editSampleQuantity: false,
      volume: "",
      /*采样体积*/
      sampleQuantity: "",
      /*样品数量*/
      SamplePoint: "",
      /*采样布点*/
      SamplingTime: "",
      /*采样时间*/
      SampleTools: "",
      /*采样仪器*/
      Remarks: "" /*备注*/,
    },
    valueData: {
      //模块内容键值对
      testProject: "project_cyhj",
      testProjectChineseName: "",
      correct: "采样面积",
      canDelete: [
        "sampleNum",
        "SampleAddress",
        "volume",
        "sampleQuantity",
        "SamplePoint",
        "SamplingTime",
        "Remarks",
      ],
      point: [
        {
          id: Math.random(),
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleNumIndex: "",
          isPrototype: true,
          deviceNum: "",
          multipleId: 0,
          blankSample: 0,
          sampleName: "",
          time: "",
          flow: "",
          /*采样流量*/
          flowTime: "",
          /*采样时长*/
          editSampleQuantity: false,
          volume: "",
          /*采样体积*/
          sampleQuantity: "",
          /*样品数量*/
          SamplePoint: "",
          /*采样布点*/
          SamplingTime: "",
          /*采样时间*/
          SampleTools: "",
          /*采样仪器*/
          Remarks: "" /*备注*/,
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 50,
        value: function(obj) {
          return 50 + 32 * obj.point.length;
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
    name: "project_yp",
    projectName: "微生物样品",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_yp",
      TestingItems: "",
      point: [
        {
          item1: "",
          item2: "",
          item3: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (3 + obj.point.length);
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
    name: "project_formaldehyde",
    projectName: "甲醛",
    type: null,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_formaldehyde",
      id: "",
      labSampleNum: "", // 实验室样品编号
      createtime: "", // 创建时间
      testingItems: "", // 检测项目
      testStandard: "", // 检测依据
      taskBatchNumber: "", // 任务批号
      testDate: "", // 检测日期
      testEnvironment: "", // 检测环境
      samplePreProcess: "", // 样品前处理

      point: [
        {
          item1: "",
          item2: "",
          item3: "",
        },
        {
          item1: "",
          item2: "",
          item3: "",
        },
        {
          item1: "",
          item2: "",
          item3: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 32 * (3 + obj.point.length);
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
    name: "project_sysjq",
    projectName: "甲醛",
    type: null,
    switch: false,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_sysjq",
      id: "",
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      multipleId: 0,
      sysTestingInstrument: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      point: [
        {
          sampleNum: "", //样品编号
          sysSampleId: "",
          volume: "", //体积
          sysTemperature: "", //温度
          sysSolutionMultiple: 1, //样品溶液稀释倍数
          sysBlankAbsorbance: "", //空白吸光度
          atmosphericPressure: "", //气压
          sysAbsorbance: "", //吸光度
          sysConcentration: "", //浓度
          sysReport: "", //报告值
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
    name: "project_sysben",
    switch: false,
    projectName: "苯",
    isDeviceData: true,
    valueData: {
      //模块内容键值对
      testProject: "project_sysben",
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      multipleId: 0,
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      sysTestingInstrument: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框

      point: [
        {
          sysSolutionMultiple: "1",
          sampleNum: "", //样品编号
          volume: "", //采样体积
          temperature: "", //采样点温度
          atmosphericPressure: "", //采样点气压
          sysArea: "", //峰面积
          sysBlankConcentration: "", //空白气浓度
          sysSuckConcentration: "", //解吸气浓度
          sysConcentration: "", //样品浓度
          sysReport: "", //报告值
          sysDifference: "", //相对相差
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 160,
        confirm: false, //是否自占一頁
        value: function(obj) {
          return 32 * (3 + obj.point.length);
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
    name: "project_sysben_two",
    switch: false,
    projectName: "苯",
    isDeviceData: true, //使用仪器导入的数据
    valueData: {
      //模块内容键值对
      testProject: "project_sysben_two",
      sysTestingEndTime: "",
      sysTestingTime: "", // 实验室检测日期
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      multipleId: 0,
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      sysTestingInstrument: "", //检测仪器
      sysSampleStateDetail: "",
      sysSolventDesorption: "", //实验室-溶剂解吸效率
      testDeviceCheckBox: [], //检测复选框
      point: [
        {
          sampleNum: "", //样品编号
          volume: "", //采样体积
          temperature: "", //采样点温度
          atmosphericPressure: "", //采样点气压
          parallelLetter: "",
          sysSolutionMultiple: "1",
          sysBlankArea: "", //空白峰面积
          sysArea: "", //峰面积
          sysConcentration: "", //样品浓度
          sysReport: "", //报告值
          sysDifference: "", //相对相差
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 160,
        confirm: false,
        value: function(obj) {
          return 32 * (3 + obj.point.length);
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
    name: "project_sysdong",
    switch: false,
    projectName: "氡",
    valueData: {
      //模块内容键值对
      testProject: "project_sysdong",
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      multipleId: 0,
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      sysScaleCoefficientA: "",

      sysScaleCoefficientB: "",
      sysNetCountingRate: "",
      sysRealNetCountingRate: "",
      sysTestingInstrument: "", //检测仪器
      sysTestingResult: "",
      testDeviceCheckBox: [], //检测复选框
      point: [
        {
          sampleNum: "", //样品编号,
          dongConcentration: "",
          sysReport: "", //报告值
          sysDifference: "", //相对相差

          sysScaleCoefficientA: "",
          sysScaleCoefficientB: "",
          sysNetCountingRate: "",
          sysRealNetCountingRate: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 253,
        confirm: true,
        value: function(obj) {
          return 253 + 32 * (3 + obj.point.length);
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
    name: "curve_head",
    projectName: "曲线头",
    switch: false,
    valueData: {
      testProject: "curve_head",
      point: [
        {
          id: "",
          materialName: "",
          materialNameData: {},
          standardValue: "",
          batchNum: "",
          laboratoryNum: "",
          purchaseTime: "",
          invalidTime: "",
          matrix: "",
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
    name: "curve_mid",
    projectName: "曲线中",
    switch: false,
    valueData: {
      testProject: "curve_mid",
      biaoHaoArr: ["", "", "", "", "", "", ""],
      guiGeArr: ["", "", "", "", "", ""],
      checked: ["", "", "", "", "", "", ""],
      point: ["", ""],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 96,
        value: function(obj) {
          // return 32 * obj.point.length + 96;
          return 32 * obj.biaoHaoArr.length + 96;
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
    name: "curve_foot",
    projectName: "曲线尾",
    switch: false,
    valueData: {
      testProject: "curve_foot",
      point: [
        {
          isStockSolution:false,//是否有储备液
          id: "",
          materialName: "",
          Dosage: "",
          constantVolume: "",
          concentration: "",
          standardValue: "",
          numbering: "",
          validityPeriod: "",
          count: 1,
          noUse: true,
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
    name: "curve_cby",
    projectName: "曲线尾",
    switch: false,
    valueData: {
      testProject: "curve_cby",
      point: [
        {
          id: "",
          materialNum: "",
          materialName: "",
          Dosage: "",
          constantVolume: "",
          concentration: "",
          numbering: "",
          validityPeriod: "临用现配",
          count: 1,
          noUse: true,
          popoverFlag:false
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
    name: "curve_cbynd",
    projectName: "储备液浓度",
    switch: false,
    valueData: {
      testProject: "curve_cbynd",
      point: [
        {
          id: "",
          materialName: "",
          constantVolume: "",
          concentration:"",
          num: [],
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
    name: "project_systvoc",
    projectName: "TVOC",
    valueData: {
      //模块内容键值对
      testProject: "project_systvoc",
      sysTestingTime: "", // 实验室检测日期
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      isDeviceData: true,
      sysHumidity: "", //检测环境1
      sysTestingInstrument: "", //检测仪器
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名
      testDeviceCheckBox: [], //检测复选框
      point: [
        {
          sampleNum: "", //样品编号
          arr: [
            {
              name: "苯",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "甲苯",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "乙酸丁酯",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "乙苯",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "对二甲苯+间二甲苯",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "苯乙烯",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "邻二甲苯",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "正十一烷",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "其他（以甲苯计）",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
            {
              name: "TVOC总计",
              volume: "", //采样体积
              sysTemperature: "", //采样点温度
              atmosphericPressure: "", //采样点气压
              peakArea: "", //峰面积
              blankConcentration: "", //空白气浓度
              suckConcentration: "", //解吸气浓度
              sysConcentration: "", //样品浓度
              sysReport: "", //报告值
              sysDifference: "", //相对相差.
            },
          ],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 50 + 32 * obj.point.length;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 50 + 32 * obj.point.length;
        },
      },
    },
  },
  {
    name: "project_sysan",
    projectName: "氨",
    valueData: {
      //模块内容键值对
      testProject: "project_sysan",

      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名

      sysTestingTime: "", // 实验室检测日期
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      sysTestingInstrument: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      point: [
        {
          sampleNum: "", //样品编号
          sysSampleId: "",
          volume: "", //体积
          sysTemperature: "", //温度
          sysBlankAbsorbance: "", //空白吸光度
          atmosphericPressure: "", //气压
          sysSolutionMultiple: 1, //样品溶液稀释倍数
          sysAbsorbance: "", //吸光度
          sysConcentration: "", //浓度
          sysReport: "", //报告值
          sysDifference: "", //相对差值
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        value: function(obj) {
          return 150 + 32 * obj.point.length;
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
    name: "project_systvoc1",
    projectName: "TVOC",
    valueData: {
      //模块内容键值对
      testProject: "project_systvoc",
      testProject2: "project_systvoc1",
      modelName: "project_systvoc",
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "", // 实验室检测日期
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      mustWrite: ["sysTestingTime", "testDeviceCheckBox"], //必填项字段名,
      sysTestingInstrument: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      point: ["", ""],
      sysSolutionMultiple: 1,
    },
    height: {
      //模块高度
      _normal: {
        confirm: true,
        fixed: 127,
        carried: true,
        value: function(obj) {
          return 127;
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
    name: "project_systvoc2",
    projectName: "TVOC",
    valueData: {
      //模块内容键值对
      testProject: "project_systvoc",
      modelName: "project_systvoc",
      sysReport: "",
      sysSampleId: 23,
      sysDifference: "",
      point: ["", "", "", ""],
      sysSolutionMultiple: 1,
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
          return 40 + 32 * obj.point.length;
        },
      },
    },
  },
  {
    name: "project_systvoc3",
    projectName: "TVOC",
    valueData: {
      //模块内容键值对
      testProject: "project_systvoc",
      modelName: "project_systvoc",
      sysTestingTime: "", // 实验室检测日期
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      sysTestingInstrument: "", //检测仪器
      sysSampleId: 22,
      sysReport: "",
      sysDifference: "",
      sysSolutionMultiple: 1,
      point: ["", ""],
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
          return 40 + 32 * obj.point.length;
        },
      },
    },
  },
  {
    name: "project_systvoc4",
    switch: false, //横板竖版
    projectName: "TVOC",
    valueData: {
      //模块内容键值对
      multipleId: 0, //同一类
      testProject: "project_systvoc",
      modelName: "project_systvoc",
      kbSampleNum: "",
      point: [],
      sysSolutionMultiple: 1,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        confirm: true,
        fixed: 64, //固定
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
    name: "project_systvoc5",
    switch: false, //横板竖版
    projectName: "TVOC",
    valueData: {
      //模块内容键值对
      testProject: "project_systvoc5",
      modelName: "project_systvoc5",
      sysTestingTime: "", // 实验室检测日期
      sysTestingEndTime: "",
      multipleId: 0,
      sysTemperature: "", //检测环境1
      sysSampleState: "正常",
      sysHumidity: "", //检测环境1
      sysTestingInstrument: "", //检测仪器
      testDeviceCheckBox: [], //检测复选框
      point: ["", ""],
      sysSolutionMultiple: 1,
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        confirm: true,
        fixed: 130, //固定
        value: function(obj) {
          return 130;
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
    name: "project_jbxx",
    projectName: "基本信息",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    isHead: true,
    valueData: {
      endTime: "",
      testProject: "project_jbxx",
      multipleId: 0,
      entrustedUnitName: "",
      assessArr: [],
      UnitExaminationName: "",
      UnitExaminationAddress: "",
      detectionObjects: "",
      purposeDetection: "",
      organizationName: "",
      siteEnvironment2: "",
      siteEnvironment3: "",
      institutionalAddress: "",
      licenseNumber: "",
      metrologyCertificate: "",
      detectionTime: "",
      samplingPersonnel: "",
      fontSize: 14,
      detectionBasis: "",
      point: [
        {
          rows: ["", "", "", "", ""],
        },
        {
          rows: ["", "", "", "", ""],
        },
        {
          rows: ["", "", "", "", ""],
        },
        {
          rows: ["", "", "", "", ""],
        },
        {
          rows: ["", "", "", "", ""],
        },
        {
          rows: ["", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        disable: true, //禁用现场可删除
        value: function(obj) {
          return 988;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 988;
        },
      },
    },
  },
  {
    name: "project_jcxcxx",
    projectName: "检测现场信息",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    isHead: true,
    checkField: [
      {
        deviceName: "设备名称",
      },
      {
        deviceModel: "设备型号",
      },
      {
        deviceNum: "设备编号",
      },
      {
        manufacturer: "生产厂家",
      },
      {
        mainParameterkV: "主要参数",
      },
      {
        mainParametermA: "主要参数",
      },
      {
        location: "所在场所",
      },
      {
        ballNum: "球管编号",
      },
      {
        deviceType: "设备类型",
      },
      {
        siteEnvironment: "现场环境",
      },
      {
        operationMode: "设备操作方式",
      },
      {
        exposureMode: "曝光模式",
      },
      {
        harnessDirection: "有用线束方向",
      },
    ],
    valueData: {
      //模块内容键值对
      testProject: "project_jcxcxx",
      multipleId: 0,
      deviceName: "",
      deviceModel: "",
      deviceNum: "",
      manufacturer: "",
      mainParameterkV: "",
      mainParametermA: "",
      mainParametermAutil: "mA",
      location: "",
      ballNum: "",
      deviceType: "",
      point: [
        {
          exposureMode: "",
          harnessDirection: "",
          checked: true,
        },
      ],
      deviceStatus: "",
      operationMode: ["", ""],
      sonOperation: "",
      surgeonNum: "",
      siteEnvironment: "",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        disable: true, //禁用现场可删除
        fixed: 416,
        value: function(obj) {
          return 416 + obj.point.length * 32;
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
    name: "projcet_jcjg",
    projectName: "机房门情况",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_jcjg",
      moFold: false,
      multipleId: 0,
      point: [
        {
          rows: ["控制室门", "", "", "", "", "", ""],
        },
        {
          rows: ["机房大门", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 100,
        itemHeight: 64,
        value: function(obj) {
          let height = obj.moFold ? 100 : 100 + obj.point.length * 64;
          return height;
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
    name: "projcet_jfcsl",
    projectName: "机房窗数量",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_jfcsl",
      testProjectChineseName: "机房窗数量",
      moFold: false,
      multipleId: 0,
      point: [
        {
          rows: ["观察窗", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 80,
        value: function(obj) {
          let height = obj.moFold ? 80 : 80 + obj.point.length * 32;
          return height;
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
    name: "projcet_szpbt",
    projectName: "机房六面屏蔽体情况",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_szpbt",
      multipleId: 0,
      moFold: false,
      point: [
        {
          rows: ["墙1", "", "", "", ""],
        },
        {
          rows: ["墙2", "", "", "", ""],
        },
        {
          rows: ["墙3", "", "", "", ""],
        },
        {
          rows: ["墙4", "", "", "", ""],
        },
        {
          rows: ["机房上方", "", "", "", ""],
        },
        {
          rows: ["机房下方", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 90,
        itemHeight: 48,
        value: function(obj) {
          let height = obj.moFold ? 90 : 90 + obj.point.length * 48;
          return height;
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
    name: "projcet_gzwyzwtgxdk",
    projectName: "工作人员操作位和管线洞口",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    scalableTitle: "工作人员操作位和管线洞口", //折叠显示的文本
    showScalableTitle: false, //是否显示折叠文本
    scaleHeight: 75,

    valueData: {
      //模块内容键值对
      moFold: false,
      testProject: "projcet_gzwyzwtgxdk",
      testProjectChineseName: "工作人员操作位和管线洞口",
      multipleId: 0,
      point: [
        {
          rows: ["工作人员操作位", "", ""],
        },
        {
          rows: ["管线洞口", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        confirm: false,
        fixed: 127,
        value: function(obj) {
          let height = obj.moFold ? 127 : 127 + obj.point.length * 32;
          return height;
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
    name: "projcet_jflslxgzdqk",
    projectName: "机房楼上和楼下关注点情况",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_jflslxgzdqk",
      moFold: false,
      multipleId: 0,
      point: [
        {
          rows: ["", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 72,
        value: function(obj) {
          let height = obj.moFold ? 72 : 72 + obj.point.length * 32;
          return height;
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
    name: "projcet_jcbt",
    projectName: "防护检测条件",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_jcbt",
      multipleId: 0,
      isObtain: true,
      deviceState: "",
      exposureMode: "",
      harnessDirection: "",
      unit1: "mA",
      unit2: "ms",
      exposureParameterkV1: "",
      exposureParametermA: "",
      exposureParameterms: "",
      exposureParameterkV2: "",
      exposureParametermAs: "",
      exposureParameterState: "",

      irradiationField1: "",
      irradiationField2: "",
      radio: "1",
      calibrationFactor: "",
      Judge: false,
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 232,
        confirm: true,
        value: function(obj) {
          return 232;
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
    name: "projcet_jcbnr",
    projectName: "防护检测数据",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_jcbnr",
      multipleId: 0,
      testPoinrNum: [true, true, true],
      company: "μSv/h",
      testNum: 3,
      isObtain: true,
      point: [
        {
          rows: ["", "", "", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 96,
        value: function(obj) {
          return 96 + obj.point.length * 32;
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
    name: "projcet_gzltj",
    projectName: "工作量统计",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_gzltj",
      multipleId: 0,
      valueA: "",
      valueB: "",
      valueC: "",
      valueD: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 170,
        value: function(obj) {
          return 170;
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
    name: "projcet_szwjcjlmkt",
    projectName: "术者位检测记录模块_头",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    toBeShow: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_szwjcjlmkt",
      multipleId: 0,
      isObtain: true,
      deviceState: "开机",
      exposureMode: "",
      harnessDirection: "",
      exposureProcedure: "",
      tubeVoltage: "",
      tubeCurrent: "",
      irradiationFieldChoice: "",
      irradiationFieldM1: "",
      irradiationFieldM2: "",
      calibrationFactor: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: false,
        fixed: 291,
        confirm: true,
        value: function(obj) {
          return 291;
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
    name: "projcet_szwjcjlmknr",
    projectName: "术者位检测记录模块_内容",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    toBeShow: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_szwjcjlmknr",
      multipleId: 0,
      isObtain: true,
      testPoinrNum: [true, true, true],
      testNum: 3,
      company: "μSv/h",
      point: [
        {
          rows: ["", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: false,
        fixed: 84,
        value: function(obj) {
          return 84 + obj.point.length * 32;
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
    name: "projcet_jgyst",
    projectName: "竣工验收（环保）_头",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_jgyst",
      multipleId: 0,
      isObtain: true,
      deviceState: "",
      exposureMode: "",
      harnessDirection: "",

      exposureParameterkV1: "",
      exposureParametermA: "",
      exposureParameterms: "",
      exposureParameterkV2: "",
      exposureParametermAs: "",
      exposureParameterState: "",
      radio: "1",
      irradiationField1: "",
      irradiationField2: "",
      unit1: "mA",
      unit2: "ms",
      calibrationFactor: "",
      Judge: false,
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: false,
        fixed: 280,
        confirm: true,
        value: function(obj) {
          return 280;
        },
      },
      _short: {
        carried: true,
        value: function(obj) {
          return 0;
        },
      },
    },
  },
  {
    name: "projcet_jgysnr",
    projectName: "竣工验收（环保）_内容",
    type: null,
    publicData: [], //本模块的公共数据
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "projcet_jgysnr",
      multipleId: 0,
      isObtain: true,
      testPoinrNum: [true, true, true],
      testNum: 3,
      company: "μSv/h",
      // count:0,
      point: [
        {
          rows: ["", "", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 113,
        value: function(obj) {
          return 113 + obj.point.length * 32;
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
    name: "project_fs_xn_gdy",
    projectName: "管电压",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_fs_xn_gdy",
      multipleId: 0,
      check1: "", //打勾是true 否则 false
      voltage1: "", // 对应取值
      check2: "", //打勾是true 否则 false
      voltage2: "", // 对应取值
      check3: "", //打勾是true 否则 false
      voltage3: "", // 对应取值

      remarks: "",
      point: [""],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 350,
        value: function(obj) {
          return 350;
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
    name: "project_fs_xn_gdypl",
    projectName: "管电压指示的偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_fs_xn_gdypl",
      multipleId: 0,
      remarks: "",
      point: [
        {
          rows: ["", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 430,
        value: function(obj) {
          return 430 + 32 * obj.point.length;
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
    name: "project_fs_xn_scl",
    projectName: "输出量重复性",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_fs_xn_scl",
      multipleId: 0,
      remarks: "",
      point: [
        {
          rows: ["", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 418,
        value: function(obj) {
          return 418 + 32 * obj.point.length;
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
    name: "project_fs_xn_jzsj",
    projectName: "加载时间偏离/曝光时间指示的偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_fs_xn_jzsj",
      multipleId: 0,
      tubeVoltage: "",
      tubeCurrent: "",
      timeExposure: "",
      remarks: "",
      unit: "ms",
      point: [
        {
          rows: ["", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 352,
        value: function(obj) {
          return 352 + 32 * obj.point.length;
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
    name: "project_fs_xn_yyxj",
    projectName: "有用线束半值层/半值层",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_fs_xn_yyxj",
      multipleId: 0,
      point: [
        {
          rows: ["", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 269,
        value: function(obj) {
          return 269 + 32 * obj.point.length;
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
    name: "project_fs_xn_gdb",
    projectName: "高对比分辨力",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_fs_xn_gdb",
      multipleId: 0,
      point: [
        {
          rows: ["", "", "", ""],
        },
        {
          rows: ["", "", "", ""],
        },
        {
          rows: ["", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 400,
        confirm: true,
        value: function(obj) {
          return 400;
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
    name: "project_fs_xn_gdyddbfbl",
    projectName: "低对比分辨力",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_fs_xn_gdyddbfbl",
      multipleId: 0,
      point: [
        {
          rows: ["", "", "", ""],
        },
        {
          rows: ["", "", "", ""],
        },
        {
          rows: ["", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 400,
        confirm: true,
        value: function(obj) {
          return 400;
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
    name: "project_sysjq_standard",
    projectName: "project_sysjq_standard",
    switch: false,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      point: ["", "", ""],
    },
    height: {
      //模块高度
      _normal: {
        confirm: false,
        carried: true,
        fixed: 90,
        value: function(obj) {
          return 90 + 32 * obj.point.length;
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
    name: "projcet_azs",
    projectName: "暗噪声",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          Choice: [],
          valueChoice: "",
          artifact: "",
          value: "",
          detectionResult: "",
          result: "",
          prescribed: "",
          deviation: "",
        },
        {
          Choice: [],
          valueChoice: "",
          artifact: "",
          value: "",
          detectionResult: "",
          result: "",
          prescribed: "",
          deviation: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 500,
        confirm: true,
        value: function(obj) {
          return 500;
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
    name: "projcet_tcqjlzs",
    projectName: "探测器剂量指示（DDI）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          Choice: [],
          formula: "",
          detectionResult1: "",
          detectionResult2: "",
          detectionResult3: "",
          detectionAverage: "",
          DDIval: "",
          measuredValue: "",
          calculatedValue: "",
          deviation1: "",
          nothingBaseline: "",
          baselineValue: "",
          deviation2: "",
          stateDetection: "",
        },
        {
          Choice: [],
          formula: "",
          detectionResult1: "",
          detectionResult2: "",
          detectionResult3: "",
          detectionAverage: "",
          DDIval: "",
          measuredValue: "",
          calculatedValue: "",
          deviation1: "",
          nothingBaseline: "",
          baselineValue: "",
          deviation2: "",
          stateDetection: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 705,
        confirm: true,
        value: function(obj) {
          return 705;
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
    name: "projcet_xhcdtx",
    projectName: "信号传递特性（STP）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          rows: [
            ["K/μGy", "", "", "", "", ""],
            ["P", "", "", "", "", ""],
          ],
          valP: "",
          valR2: "",
          option: "对数的拟合曲线",
        },
        {
          rows: [
            ["K/μGy", "", "", "", "", ""],
            ["P", "", "", "", "", ""],
          ],
          valP: "",
          valR2: "",
          option: "对数的拟合曲线",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 425,
        confirm: true,
        value: function(obj) {
          return 425;
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
    name: "projcet_jxkjfbl",
    projectName: "极限空间分辨力",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          manufactor: "",
          fNy: "",
          rows: [
            ["水平", "", "", "", "", "", ""],
            ["垂直", "", "", "", "", "", ""],
          ],
        },
        {
          manufactor: "",
          fNy: "",
          rows: [
            ["水平", "", "", "", "", "", ""],
            ["垂直", "", "", "", "", "", ""],
          ],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 440,
        confirm: true,
        value: function(obj) {
          return 440;
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
    name: "projcet_AEClmd",
    projectName: "AEC灵敏度",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          rows: ["", "", "", "", "", "", "", ""],
        },
        {
          rows: ["", "", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 470,
        confirm: true,
        value: function(obj) {
          return 470;
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
    name: "projcet_AECdlszjyzx",
    projectName: "AEC电离室之间一致性",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          choice: "",
          rows: ["", "", "", "", "", "", ""],
        },
        {
          choice: "",
          rows: ["", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 470,
        confirm: true,
        value: function(obj) {
          return 470;
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
    name: "projcet_AECgdyzjyzx",
    projectName: "AEC管电压之间一致性",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          filterLine: "",
          SID: "",
          organ: "",
          additional: "",
          rows: ["", "", "", "", "", "", "", "", "", ""],
        },
        {
          filterLine: "",
          SID: "",
          organ: "",
          additional: "",
          rows: ["", "", "", "", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 415,
        confirm: true,
        value: function(obj) {
          return 415;
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
    name: "projcet_gdyzsdpl",
    projectName: "管电压指示的偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          rows: ["", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 258,
        value: function(obj) {
          return 258 + obj.point.length * 32;
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
    name: "projcet_sclcfx",
    projectName: "输出量重复性",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          rows: ["空气比释动能/μGy", "", "", "", "", ""],
        },
        {
          rows: ["输出量测量值K/mGy/mAs", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 192,
        value: function(obj) {
          return 192 + obj.point.length * 32;
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
    name: "projcet_yyxsbzc",
    projectName: "有用线束半值层/mmAl",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 175,
        confirm: true,
        value: function(obj) {
          return 175;
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
    name: "projcet_bgsjzsdpl",
    projectName: "曝光时间指示的偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      point: [
        {
          rows: ["", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 193,
        value: function(obj) {
          return 193 + obj.point.length * 32;
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
    name: "projcet_yyxsczdpl",
    projectName: "有用线束垂直度偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],
      cokeSlice: "",
      cokeSliceVal: "",

      within: "",
      external: "",
      externalVal: "",

      radius: "",
      radiusVal: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 245,
        confirm: true,
        value: function(obj) {
          return 245;
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
    name: "projcet_gyyzsysbdpl",
    projectName: "光野与照射野四边的偏离/cm",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],

      point: [
        {
          rows: ["光野与长方框距离a", "", "", "", ""],
        },
        {
          rows: ["影像与长方框距离b", "", "", "", ""],
        },
        {
          rows: ["光野偏离", "", "", "", ""],
        },
        {
          rows: ["光野偏离", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 355,
        confirm: true,
        value: function(obj) {
          return 355;
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
    name: "project_bgcsxz",
    projectName: "曝光参数选择",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],

      point: [
        {
          CV: "",
          rows: ["", "", "", "", ""],
        },
        {
          CV: "",
          rows: ["", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 355,
        confirm: true,
        value: function(obj) {
          return 355;
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
    name: "projcet_cjwc",
    projectName: "测距误差",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],

      point: [
        {
          distance: "",
          measure: "",
          SID: "",
          focus: "",
          rows: [
            ["水平", "", "", "", ""],
            ["垂直", "", "", "", ""],
          ],
        },
        {
          distance: "",
          measure: "",
          SID: "",
          focus: "",
          rows: [
            ["水平", "", "", "", ""],
            ["垂直", "", "", "", ""],
          ],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 440,
        confirm: true,
        value: function(obj) {
          return 440;
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
    name: "project_cy",
    projectName: "残影",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],

      point: [
        {
          Judge: "",
          rows: ["", "", ""],
        },
        {
          Judge: "",
          rows: ["", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 472,
        confirm: true,
        value: function(obj) {
          return 472;
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
    name: "projcet_wy",
    projectName: "伪影",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],

      point: [
        {
          sure: "",
          category: "",
        },
        {
          sure: "",
          category: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 275,
        confirm: true,
        value: function(obj) {
          return 275;
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
    name: "projcet_ddbdxjjc",
    projectName: "低对比度细节检测",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      detector: [],

      point: [
        {
          rows: [
            ["基线值", "", "", "", "", "", "", ""],
            ["检测结果", "", "", "", "", "", "", ""],
          ],
        },
        {
          rows: [
            ["基线值", "", "", "", "", "", "", ""],
            ["检测结果", "", "", "", "", "", "", ""],
          ],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 675,
        confirm: true,
        value: function(obj) {
          return 675;
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
    name: "projcet_tszlkz",
    projectName: "医用常规X射线诊断设备(透视)质量控制检测原始记录",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      entrustedUnitName: "",
      entrustedUnitAddress: "",
      locationDetection: "",
      testingContent: "",
      testCategory: "",
      detectionTime: "",
      purposeDetection: "",
      reportNumber: "",
      evaluationBasis: "",
      deviceName: "",
      deviceModel: "",
      deviceNum: "",
      mainParameter: "",
      manufacturer: "",
      equipmentUse: "",
      pipeBallNum: "",
      location: "",
      remarks: "",
      testingInstrument: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 1010,
        confirm: true,
        value: function(obj) {
          return 1010;
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
    name: "projcet_tssjzrstbkqxsdnldxz",
    projectName: "透视受检者入射体表空气比释动能率典型值/（mGy/min）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      thereAreAERC: "",
      NoAERC: ["", ""],
      perspective: "",
      testingConditions: ["", "", "", "", ""],
      point: [
        {
          rows: ["", "", ""],
        },
        {
          rows: ["", "", ""],
        },
        {
          rows: ["", "", ""],
        },
        {
          rows: ["", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 460,
        confirm: true,
        value: function(obj) {
          return 460;
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
    name: "project_tssjzrstbkqbsdnlzdz",
    projectName: "透视受检者入射体表空气比释动能率最大值/（mGy/min）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      perspective: "",
      testingConditions: ["", "", "", "", ""],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 265,
        confirm: true,
        value: function(obj) {
          return 265;
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
    name: "projcet_tsygplmd",
    projectName: "透视荧光屏灵敏度/(cd/m^2)/(mGy/min)",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testingConditions: ["", "", "", "", ""],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 235,
        confirm: true,
        value: function(obj) {
          return 235;
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
    name: "projcet_kjfbl",
    projectName: "空间分辨力/lp/mm",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      point: [
        {
          rows: ["", "", ""],
        },
        {
          rows: ["", "", ""],
        },
        {
          rows: ["", "", ""],
        },
        {
          rows: ["", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 270,
        value: function(obj) {
          return 270 + obj.point.length * 32;
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
    name: "projcet_ddbfbl",
    projectName: "低对比分辨力",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testingConditions: "",
      detectionResult: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 195,
        confirm: true,
        value: function(obj) {
          return 195;
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
    name: "projcet_yxjsqrspqkqxsdnl",
    projectName: "影像接收器入射屏前空气比释动能率/（μGy/min）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      point: [
        {
          rows: ["影像增强器入射屏直径/mm", "350", "310", "230", "150"],
        },
        {
          rows: ["平板探测器长边尺寸/mm", "400", "300", "250", "200"],
        },
        {
          rows: [
            "入射屏前空气比释动能率（μGy/min）",
            "≤30.0",
            "≤48.0",
            "≤60.0",
            "≤134.0",
          ],
        },
      ],
      perspective: "",
      testingConditions: ["", "", "", "", "", ""],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 375,
        confirm: true,
        value: function(obj) {
          return 375;
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
    name: "projcet_zdldkz",
    projectName: "自动亮度控制",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      change: "",
      kV: "",
      point: [
        {
          rows: ["", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 308,
        value: function(obj) {
          return 308 + obj.point.length * 32;
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
    name: "projcet_zsyyyxjsqzxpc",
    projectName: "照射野与影像接收器中心偏差",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      distance: "",
      SID: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 195,
        confirm: true,
        value: function(obj) {
          return 195;
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
    name: "projcet_zdzsyyptygpncxtsdtpj",
    projectName: "最大照射野与普通荧光屏尺寸相同时的台屏距/mm",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      mm: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 175,
        confirm: true,
        value: function(obj) {
          return 175;
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
    name: "projcet_fhjcxg",
    projectName: "防护检测结果",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      evaluate: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 186,
        confirm: true,
        value: function(obj) {
          return 186;
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
    name: "projcet_bg_sz",
    projectName: "术者_报告",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      point: [
        {
          v1: "",
          v2: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 45,
        value: function(obj) {
          return 45 + obj.point.length * 32;
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
    name: "projcet_bg_hb",
    projectName: "环保_报告",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 45,
        value: function(obj) {
          return 45 + obj.point.length * 32;
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
    name: "projcet_bg_jc1",
    projectName: "检测1_报告",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 45,
        value: function(obj) {
          return 45 + obj.point.length * 32;
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
    name: "projcet_bg_jc2",
    projectName: "检测1_报告",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 45,
        value: function(obj) {
          return 45 + obj.point.length * 32;
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
    name: "projcet_zlkz",
    projectName: "质量控制（性能）检测结果",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      evaluate: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 170,
        confirm: true,
        value: function(obj) {
          return 170;
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
    name: "projcet_xnjcjg",
    projectName: "检测结果",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      moFold: false,
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 81,
        value: function(obj) {
          return 81 + obj.point.length * 32;
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
    name: "projcet_bg_bz",
    projectName: "报告_备注",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      reportCompilation: "",
      reportAudit: "",
      reportIssue: "",
      year: "",
      month: "",
      day: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 186,
        value: function(obj) {
          return 186;
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
    name: "project_blankSample",
    projectName: "空白样",
    switch: false,
    isHead: true, //虽然它不是头 但是要加上这个 否则现场就可以删除它
    valueData: {
      //模块内容键值对
      testProject: "project_blankSample",
      testProjectChineseName: "空白样",
      point: [
        {
          testProjects: [],
          sampleName: "",
          sampleNum: "",
          sampleQuantity: "",
          remark: "",
          pointId: uuid(),
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 35,
        value: function(obj) {
          return 35 + obj.point.length * 32;
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
    name: "project_dr_gdyzsdpl",
    projectName: "DR管电压指示的偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_dr_gdyzsdpl",
      testProjectChineseName: "DR管电压指示偏离",
      note: "",
      factorArr: [],
      point: [
        {
          testProjects: [],
          sampleName: "",
          sampleNum: "",
          sampleQuantity: "",
          remark: "",
        },
      ],
      bigFocus: [
        {
          toRow3: true,
          getIndex: 0,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 0,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 0,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 3,
          toRow3: true,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 3,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 3,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 6,
          toRow3: true,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 6,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 6,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 9,
          toRow3: true,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 9,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 9,
          rows: ["", "", "", "", "", "", ""],
        },
      ],
      smallFocus: [
        {
          getIndex: 0,
          toRow3: true,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 0,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 0,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 3,
          toRow3: true,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 3,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 3,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 6,
          toRow3: true,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 6,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 6,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 9,
          toRow3: true,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 9,
          rows: ["", "", "", "", "", "", ""],
        },
        {
          getIndex: 9,
          rows: ["", "", "", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 1000,
        value: function(obj) {
          return 1000;
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
    name: "project_dr_sclcfx",
    projectName: "DR输出量重复性",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_dr_sclcfx",
      testProjectChineseName: "DR输出量重复性",
      condition1: "",
      repeatNum: "",
      repeatNum2: "",
      note: "",
      condition2: "",
      point: [
        {
          name: "空气比释动能K/mGy",
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 382,
        confirm: true,
        value: function(obj) {
          return 382;
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
    name: "project_dr_yyxsbzc",
    projectName: "有用线束半值层/mmAl",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_dr_yyxsbzc",
      testProjectChineseName: "有用线束半值层/mmAl",
      note: "",
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          disable: true,
          normal: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          disable: true,
          normal: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          disable: true,
          normal: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          disable: true,
          normal: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          disable: true,
          normal: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          disable: true,
          normal: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          disable: true,
          normal: true,
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 543,
        confirm: 543,
        value: function(obj) {
          return 543;
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
    name: "project_dr_yyxsczdpl",
    projectName: "DR有用线束垂直度偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_dr_yyxsczdpl",
      testProjectChineseName: "DR有用线束垂直度偏离",
      distance: "",
      circleResult: "",
      note: "",
      result: "",
      point: [{}],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 310,
        confirm: true,
        value: function(obj) {
          return 310;
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
    name: "project_dr_yyxsczdpl",
    projectName: "DR有用线束垂直度偏离",
    switch: true,
    valueData: {
      //模块内容键值对
      testProject: "project_dr_yyxsczdpl",
      testProjectChineseName: "DR有用线束垂直度偏离",
      distance: "",
      circleResult: "",
      note: "",
      result: "",
      point: [{}],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 35,
        value: function(obj) {
          return 35 + obj.point.length * 32;
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
    name: "project_dr_gyyzssbdpl",
    projectName: "dr光野与照射野四边的偏离/cm",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_gyyzssbdpl",
      testProjectChineseName: "dr光野与照射野四边的偏离/cm",
      detector: [],
      distance: "",
      arr1: [],
      arr2: [],
      point: [
        {
          rows: ["光野与长方框距离a", "", "", "", ""],
        },
        {
          rows: ["影像与长方框距离b", "", "", "", ""],
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 505,
        confirm: true,
        value: function(obj) {
          return 505;
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
    name: "project_dr_tcq",
    projectName: "DR探测器",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_tcq",
      testProjectChineseName: "DR探测器",
      isPole: "",
      isPole2: "",
      NumberOfDetectors: "1",
      AECNum: "",
      cxbgcx: "",
      cxbgcx2: "",
      tcqNum1: "",
      tcqNum2: "",
      point: [
        {
          v1: 70,
          v2: "",
          v3: "1mmCu",
          v4: "",
          v5: 1,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "1mmCu",
          v4: "",
          v5: 5,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "",
          v4: "1mmCu",
          v5: 10,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "",
          v4: "1mmCu",
          v5: 20,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "",
          v4: "1mmCu",
          v5: 30,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "无",
          v4: "",
          v5: 5,
          v6: "",
        },
      ],
      point2: [
        {
          v1: 70,
          v2: "",
          v3: "1mmCu",
          v4: "",
          v5: 1,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "1mmCu",
          v4: "",
          v5: 5,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "",
          v4: "1mmCu",
          v5: 10,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "",
          v4: "1mmCu",
          v5: 20,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "",
          v4: "1mmCu",
          v5: 30,
          v6: "",
        },
        {
          v1: 70,
          v2: "",
          v3: "无",
          v4: "",
          v5: 5,
          v6: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 820,
        confirm: true,
        value: function(obj) {
          return 410 * Number(obj.NumberOfDetectors);
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
    name: "project_dr_kszs",
    projectName: "DR暗噪声",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_kszs",
      testProjectChineseName: "DR暗噪声",
      note: "",
      radioValue: "",
      hasShadow: "",
      arr: ["", "", ""],
      eValue: "",
      factoryValue: "",
      checkBoxArr: [false, false, false, false],
      point: [{}],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 485,
        confirm: true,
        value: function(obj) {
          return 485;
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
    name: "project_dr_tcqjlzs",
    projectName: "探测器剂量指示（DDI）（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_tcqjlzs",
      testProjectChineseName: "探测器剂量指示（DDI）（探测器1）",
      radioValue: "",
      testType: "",
      jiXianZhi: "",
      jlJiXianZhi: "",
      note: "",
      computer: "",
      computer2: "",
      pianCha: "",
      pianCha2: "",
      checkArr: [false, false],
      arr1: ["", "", "", ""],
      arr2: ["", "", "", ""],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 450,
        confirm: true,
        value: function(obj) {
          return 450;
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
    name: "project_dr_xhcttx",
    projectName: "信号传递特性（STP）（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_xhcttx",
      testProjectChineseName: "信号传递特性（STP）（探测器1）",
      arr1: ["", "", "", "", ""],
      arr2: ["", "", "", "", ""],
      gs1: "",
      noteState: "",
      noteOther: "",
      gs2: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 393,
        confirm: true,
        value: function(obj) {
          return 393;
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
    name: "project_dr_xyjyx",
    projectName: "响应均匀性（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_xyjyx",
      testProjectChineseName: "响应均匀性（探测器1）",
      arr1: ["", "", "", ""],
      note: "",
      xiangsuVal: "",
      cvValue: "",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 324,
        confirm: true,
        value: function(obj) {
          return 324;
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
    name: "project_dr_cjwc",
    projectName: "测距误差（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_cjwc",
      testProjectChineseName: "测距误差（探测器1）",
      note: "",
      checkValue1: false,
      checkValue2: false,
      point: [
        {
          v1: "水平",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
          v6: "",
          v7: "",
        },
        {
          v1: "垂直",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 405,
        confirm: true,
        value: function(obj) {
          return 405;
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
    name: "project_dr_cy",
    projectName: "DR残影",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_cy",
      testProjectChineseName: "DR残影",
      note: "",
      arr: {
        v1: "",
        v2: "",
        v3: "",
      },
      state: "否",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 433,
        confirm: true,
        value: function(obj) {
          return 433;
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
    name: "project_dr_wy",
    projectName: "DR伪影",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_wy",
      testProjectChineseName: "DR伪影",
      note: "",
      state: "否",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 321,
        confirm: true,
        value: function(obj) {
          return 321;
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
    name: "project_dr_ddbdxjjc",
    projectName: "DR低对比度细节检测",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_ddbdxjjc",
      testProjectChineseName: "DR低对比度细节检测",
      modelName: "",
      checkboxsValue: [true, false],
      note: [false, false],
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
        },
        {
          v1: "",
          v2: "",
          v3: "",
        },
        {
          v1: "",
          v2: "",
          v3: "",
        },
        {
          v1: "",
          v2: "",
          v3: "",
        },
        {
          v1: "",
          v2: "",
          v3: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 562,
        confirm: true,
        value: function(obj) {
          return 562;
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
    name: "project_dr_aeclmd",
    projectName: "AEC灵敏度（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_aeclmd",
      testProjectChineseName: "AEC灵敏度（探测器1）",
      note: "",
      baseValue: "",
      radioVal: "",
      arr2: ["", "", "", "", "", ""],
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 440,
        confirm: true,
        value: function(obj) {
          return 440;
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
    name: "project_dr_aecdlszjyzx",
    projectName: "AEC电离室之间一致性（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_aecdlszjyzx",
      testProjectChineseName: "AEC电离室之间一致性（探测器1）",
      radioValue: "",
      arr: ["", "", "", "", "", ""],
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
          v6: "",
          v7: "",
          v8: "",
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 262,
        confirm: true,
        value: function(obj) {
          return 262;
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
    name: "project_dr_aecgdyzjyzx",
    projectName: "AEC管电压之间一致性（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_aecgdyzjyzx",
      testProjectChineseName: "AEC管电压之间一致性（探测器1）",
      takeOut: "",
      arr: ["", "", "", ""],
      note: "",
      point: [
        {
          v1: "",
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
      checkBoxs: [false, false],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 452,
        confirm: true,
        value: function(obj, num) {
          return 452;
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
    name: "project_dr_jxkjfbl",
    projectName: "DR极限空间分辨力（探测器1）",
    switch: true,
    valueData: {
      //模块内容键值对
      multipleId: 0,
      testProject: "project_dr_jxkjfbl",
      testProjectChineseName: "DR极限空间分辨力（探测器1）",
      arr: ["", "", "", ""],
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          // v5: [false, false, false, false, false, false, false],
          v5: "",
          jiXianVal: "",
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          // v5: [false, false, false, false, false, false, false],
          v5: "",
          jiXianVal: "",
        },
      ],
      checkBoxsTop: [false, false],
      note: "",
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 680,
        confirm: true,
        value: function(obj) {
          return 680;
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
    name: "project_cy_kqlhcy",
    projectName: "空气理化采样",
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
      sampleName: "室内空气", //样品名称
      flow: "0.5",
      /*采样流量*/
      flowTime: "",
      /*采样时长*/
      volume: "",
      /*采样体积*/
      time: "",
      sampleNumIndex: "", //重复样使用
      samplingDianWei: "室内中央",
      SamplingTime: "",
      /*采样时间*/
      SampleTools: "",

      blankSample: 0,
      sampleQuantity: "",
      /*样品数量*/
      SamplePoint: "",
      /*采样布点*/
      temperature: "", //温度
      isPrototype: true,
      multipleId: 0,
      Remarks: "" /*备注*/,
    },
    valueData: {
      //模块内容键值对
      testProject: "project_cy_kqlhcy",
      testProjectChineseName: "空气理化采样",
      correct: "空气理化采样",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "室内空气", //样品名称
          flow: "0.5",
          /*采样流量*/
          flowTime: "",
          /*采样时长*/
          volume: "",
          /*采样体积*/
          time: "",
          sampleNumIndex: "", //重复样使用
          samplingDianWei: "室内中央",
          SamplingTime: "",
          /*采样时间*/
          SampleTools: "",

          blankSample: 0,
          sampleQuantity: "",
          /*样品数量*/
          SamplePoint: "",
          /*采样布点*/
          temperature: "", //温度
          isPrototype: true,
          multipleId: 0,
          Remarks: "" /*备注*/,
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_cy_ljskcyq",
    projectName: "六级筛孔采样器",
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
      sampleNumIndex: "",
      sampleName: "空调送风", //样品名称
      flow: "28.3",
      /*采样流量*/
      flowTime: "5",
      /*采样时长*/
      volume: "141.5",
      /*采样体积*/
      time: "",
      samplingDianWei: "送风口",
      SamplingTime: "",
      /*采样时间*/
      SampleTools: "",
      /*采样仪器*/
      deviceNum: "",
      blankSample: 0,
      sampleQuantity: "",
      /*样品数量*/
      SamplePoint: "",
      /*采样布点*/
      dishSize: "6", //平皿数量
      isPrototype: true,
      multipleId: 0,
      Remarks: "应在样品标签上标记级数" /*备注*/,
    },
    valueData: {
      //模块内容键值对
      testProject: "project_cy_ljskcyq",
      testProjectChineseName: "六级筛孔采样器",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleNumIndex: "",
          sampleName: "空调送风", //样品名称
          flow: "28.3",
          /*采样流量*/
          flowTime: "5",
          /*采样时长*/
          volume: "141.5",
          /*采样体积*/
          time: "",
          samplingDianWei: "送风口",
          SamplingTime: "",
          /*采样时间*/
          SampleTools: "",
          /*采样仪器*/
          deviceNum: "",
          blankSample: 0,
          sampleQuantity: "",
          /*样品数量*/
          SamplePoint: "",
          /*采样布点*/
          dishSize: "6", //平皿数量
          isPrototype: true,
          multipleId: 0,
          Remarks: "应在样品标签上标记级数" /*备注*/,
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_cy_kqwswcy",
    projectName: "空气微生物采样",
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
      sampleName: "室内空气", //样品名称
      Remarks: "应在样品标签上标记采样点位",
      /*备注*/
      exposureTime: "", //暴露时间
      sampleNumIndex: "",
      samplingDianWei: "", //采样点位
      isPrototype: true,

      sampleQuantity: "",
      /*样品数量*/
      SamplePoint: "",
      /*采样布点*/
      blankSample: 0,
    },
    valueData: {
      //模块内容键值对
      testProject: "project_cy_kqwswcy",
      testProjectChineseName: "空气微生物采样",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样
          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "室内空气", //样品名称
          Remarks: "应在样品标签上标记采样点位",
          /*备注*/
          exposureTime: "", //暴露时间

          sampleNumIndex: "",
          samplingDianWei: "", //采样点位
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
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_cy_ypcymj",
    projectName: "样品采样面积",
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
      volume: "", //样品面积  和体积使用一个字段
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
      testProject: "project_cy_ypcymj",
      testProjectChineseName: "样品采样面积",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样

          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "", //样品名称
          volume: "", //样品面积   和体积使用一个字段
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
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_cy_kqzdnd",
    projectName: "空气中氡浓度",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ["pointId", "sampleNum"],
    //添加行使用的模板数据
    modelRow: {
      pointId: window.uuid(),
      foreverId: window.uuid(), //永久的id 用于重复样

      sampleNum: "",
      deviceNum: "", //仪器编号
      /*采样编号*/
      SampleAddress: "",
      /*采样地点*/
      sampleName: "", //样品名称
      point: "", //
      period1: "", //第一周期
      period2: "",
      result: "",
      pumpingTime: "", //抽气时长
      resultAverage: "", //检测结果平均值，
      measureTime: "", //测量时长
      exportTime: "", //排气时长
      Remarks: "",
      /*备注*/
      time: "",
      SamplingTime: "",
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
      testProject: "project_cy_kqzdnd",
      testProjectChineseName: "空气中氡浓度",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样

          sampleNum: "",
          deviceNum: "", //仪器编号
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "", //样品名称
          point: "", //
          period1: "", //第一周期
          period2: "",
          result: "",
          pumpingTime: "", //抽气时长
          resultAverage: "", //检测结果平均值，
          measureTime: "", //测量时长
          exportTime: "", //排气时长
          Remarks: "",
          /*备注*/
          time: "",
          SamplingTime: "",
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
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_cy_ypcytjml",
    projectName: "样品采样(体积mL)",
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
      volume: "", //样品体积ml
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
      testProject: "project_cy_ypcytjml",
      testProjectChineseName: "样品采样(体积mL)",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样

          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "", //样品名称
          volume: "", //样品体积ml
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
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_cy_ypcytjl",
    projectName: "样品采样(体积L)",
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
      volume: "", //样品体积L
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
      testProject: "project_cy_ypcytjl",
      testProjectChineseName: "样品采样(体积L)",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样

          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "", //样品名称
          volume: "", //样品体积L
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
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_cy_ypcycy",
    projectName: "样品采样（抽样）",
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
      packingSpecs: "", //包装规格
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
      testProject: "project_cy_ypcycy",
      testProjectChineseName: "样品采样（抽样）",
      point: [
        {
          pointId: window.uuid(),
          foreverId: window.uuid(), //永久的id 用于重复样

          sampleNum: "",
          /*采样编号*/
          SampleAddress: "",
          /*采样地点*/
          sampleName: "", //样品名称
          packingSpecs: "",
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
        fixed: 80,
        value: function(obj) {
          return 80 + 32 * obj.point.length;
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
    name: "project_deleteReason",
    projectName: "删除原因",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    //添加行使用的模板数据
    valueData: {
      //模块内容键值对
      testProject: "project_deleteReason",
      testProjectChineseName: "删除原因",
      point: [],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 0,
        value: function(obj) {
          return 32 * obj.point.length;
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
    name: "project_point",
    projectName: "点位图",
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    //添加行使用的模板数据
    valueData: {
      //模块内容键值对
      testProject: "project_point",
      testProjectChineseName: "点位图",
    },
    height: {
      //模块高度
      _normal: {
        confirm: true,
        carried: true,
        fixed: 600,
        value: function(obj) {
          return 600;
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
    name: "project_fh_bd",
    projectName: "本底",
    switch: true,
    type: null,
    publicData: [], //本模块的公共数据
    //添加行使用的模板数据
    valueData: {
      //模块内容键值对
      testProject: "project_fh_bd",
      testProjectChineseName: "本底",
      purposeDetection: "",
      point: [
        { row: ["1", "2", "3", "4", "5", "最小值", ""] },
        { row: ["", "", "", "", "", "平均值", ""] },
        { row: ["6", "7", "8", "9", "10", "最大值", ""] },
        { row: ["", "", "", "", "", "本底范围", ""] },
      ],
    },
    height: {
      //模块高度
      _normal: {
        confirm: true,
        carried: true,
        fixed: 190,
        value: function(obj) {
          return 190;
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
    name: "project_dr_bgsjzsdpl",
    projectName: "曝光时间指示的偏离",
    type: null,
    switch: true,
    publicData: [], //本模块的公共数据
    valueData: {
      //模块内容键值对
      testProject: "project_dr_bgsjzsdpl",
      note: "",
      futureValue1: "",
      futureValueUnit: "",
      point: [
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
          v6: "",
          v7: "",
          disabled: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
          v6: "",
          v7: "",
          disabled: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
          v6: "",
          v7: "",
          disabled: true,
        },
        {
          v1: "",
          v2: "",
          v3: "",
          v4: "",
          v5: "",
          v6: "",
          v7: "",
          disabled: true,
        },
      ],
    },
    height: {
      //模块高度
      _normal: {
        carried: true,
        fixed: 450,
        confirm: true,
        value: function(obj) {
          return 450;
        },
      },
      _short: {
        carried: false,
        value: function(obj) {
          return 450;
        },
      },
    },
  },

  ...JC, // 检测模块
  ...WSW, //微生物模块
  ...DC, //电磁
  ...TS, //透视
  ...CT, // CT
  ...XS, // 消杀
];
