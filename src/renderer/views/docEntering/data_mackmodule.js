import heads from "@/components/makemodule/thisData/dataJs/heads.js";
import modules from "@/components/makemodule/thisData/dataJs/modules.js";


export default {
    disWs: "",
    deviceMainId: "",

    mainArr: [],
    auxiliaryArr: [],

    android: "",
    ipdEdit: "",
    ipdTemplate: "",
    deleteJudge: false,
    TemplateId: "",
    TemplateName: "",

    munArr: [],
    mun: "",
    checkState: "",
    categoryId: "",
    Equipment: "",
    EquipmentTypeId: "",
    EquipmentType: [],
    categoryOptions: [],

    pass: "",
    // url:'http://192.168.1.198:8003',
    imgUrl: "http://118.178.18.106:8080/roms/",
    winAppUrl: 'http://xtroms.com:2222',
    url: 'http://118.178.18.106:8002',
    debug: false, //是否开启页面主要区域背景色调试, 如果开启, 则将页面主要区域的背景色变成灰色(原来是白色), 方便调试
    toShowTable: '', //控制本页面的子组件显示情况
    isTemplate: false, //是否是实例页面(实例页面背景颜色不是白色)
    headInput: false, //头表格是否可以被输入
    ableInput: false, //表格是否可以被输入
    watchSign: { //被监听标记, 在app页面监听'watchSign'的值, 当其变化时, 执行重渲染
        _high: 0,
        _short: 0,
        _up: 0,
        _down: 0,
        _delete: 0
    },
    numPages: null,
    searchData: {
        deviceMainName: '',
        deviceTypeName: '',
        pageIndex: 1,
        pageSize: 10,
    },
    templateNow: {
        taskId: '',
        data: []
    },
    allTemplates: [],
    templateList: [
        /*{
                id:'',      //实例id
                name:'',     // 实例名称
                content:['head_424', 'project_xpczsyzz', 'project_gyyzsydyzx'],    // 实例数据
                detailData:[{...}, {...}, {...}]   //实例的具体数据
            },
            {
                id:'',      //实例id
                name:'',
                content:['head_424', 'project_xpczsyzz', 'project_gyyzsydyzx', 'project_gdyzsdpl', 'project_bzc'],
                detailData:[{...}, {...}, {...}, {...}, {...}]   //实例的具体数据
            }*/
    ],
    moduleList: [{
            name: '选择头模块', //二级目录标题
            unfold: false, //是否已经展开
            content: heads
        },
        {
            name: '选择项目模块', //二级目录标题
            unfold: false, //是否已经展开
            content: modules
        }
    ],
    fileNumber: 'SZRD/LY424-01', //文件编号
    todayDate: _dateFormat('now', 'Y 年 M 月 D 日'), //当前日期
    heads: heads, //所有表头模块数据数组
    modules: modules, //所有模块数据数组
    jsonString: [ // ***  当前视图的原始数据结构
        /*{
                to:'head_1',
                type:null,
                data:heads.find(val=>val.name=='head_1')
            },
            {
                to:'module_1',
                type:null,
                data:modules.find(val=>val.name=='module_1')
            },
            ...
            */
    ],
    showing: [ //***  当前视图所展示的数据结构
        /*	[        //第一页(每个数组为一页内容)
                  {
                      to:'head_1',
                      type:null,
                      data:heads.find(val=>val.name=='head_1')
                  },
                  {
                      to:'module_1',
                      type:null,
                      data:modules.find(val=>val.name=='module_1')
                  },
                  {
                      to:'module_2',
                      type:null,
                      data:modules.find(val=>val.name=='module_2')
                  },
                  {
                      to:'module_3',
                      type:null,
                      data:modules.find(val=>val.name=='module_3')
                  }
              ],
              [        //第二页(每个数组为一页内容)
                  {
                      to:'module_4',
                      type:null,
                      data:modules.find(val=>val.name=='module_4')
                  },
                  {
                      to:'module_5',
                      type:null,
                      data:modules.find(val=>val.name=='module_5')
                  }
              ]*/
    ]
};
