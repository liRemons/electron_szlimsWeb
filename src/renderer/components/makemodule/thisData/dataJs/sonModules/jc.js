export default [{
    name: 'project_jc_xczd1',
    projectName: '现场直读（1次读数）',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        factorArr: '',
        algorithm: '',
        method: '',
        SampleTools: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        point: '', // 检测点位
        reading: '', //读数
        correction: '', // 修正信息
        result: '', // 检测结果
        resultAverage: '', //检测结果平均值
        time: '', // 检测时间
        deviceNum: '', // 设备
        remarks: '' // 备注
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_xczd1',
        correct: "现场直读（1次读数）",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_xczd1-0-0-0',
            heBingLength: '',
            factorArr: '',
            algorithm: '',
            method: '',
            SampleTools: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: "",
            SampleAddress: '', // 检测地点
            point: '', // 检测点位
            reading: '', //读数
            correction: '', // 修正信息
            result: '', // 检测结果
            resultAverage: '', //检测结果平均值
            time: '', // 检测时间
            deviceNum: '', // 设备
            remarks: '' // 备注
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            value: function(obj) {
                return 64 + 32 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_xczd3',
    projectName: '现场直读（3次读数）',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        factorArr: '',
        algorithm: '',
        method: '',
        SampleTools: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        point: '', // 检测点位
        reading: ['', '', ''], //读数
        correction: '', // 修正信息
        result: '', // 检测结果
        resultAverage: '', //检测结果平均值
        time: '', // 检测时间
        deviceNum: '', // 设备
        remarks: '' // 备注
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_xczd3',
        correct: "现场直读（3次读数）",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        factorArr: '',
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_xczd3-0-0-0',
            heBingLength: '',
            factorArr: '',
            algorithm: '',
            method: '',
            SampleTools: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: "",
            SampleAddress: '', // 检测地点
            point: '', // 检测点位
            reading: ['', '', ''], //读数
            correction: '', // 修正信息
            result: '', // 检测结果
            resultAverage: '', //检测结果平均值
            time: '', // 检测时间
            deviceNum: '', // 设备
            remarks: '' // 备注
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            value: function(obj) {
                return 64 + 32 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_xczd5',
    projectName: '现场直读（5次读数）',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        factorArr: '',
        algorithm: '',
        method: '',
        SampleTools: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        point: '', // 检测点位
        reading: ['', '', '', '', ''], //读数
        correction: '', // 修正信息
        result: '', // 检测结果
        resultAverage: '', //检测结果平均值
        time: '', // 检测时间
        deviceNum: '', // 设备
        remarks: '' // 备注
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_xczd5',
        correct: "现场直读（5次读数）",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_xczd5-0-0-0',
            heBingLength: '',
            factorArr: '',
            algorithm: '',
            method: '',
            SampleTools: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: "",
            SampleAddress: '', // 检测地点
            point: '', // 检测点位
            reading: ['', '', '', '', ''], //读数
            correction: '', // 修正信息
            result: '', // 检测结果
            resultAverage: '', //检测结果平均值
            time: '', // 检测时间
            deviceNum: '', // 设备
            remarks: '' // 备注
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            value: function(obj) {
                return 64 + 32 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_xflrs',
    projectName: '新风量（人数）',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        position: '',
        shape: '',
        formula: ['', ''],
        measureArea: '',
        windSpeed: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        correction: '/', // 修正信息
        temperature: '',
        number: '',
        airVolume: '',
        time: '', // 检测时间
        tuyereNum: '', // 设备
        tuyereId: '',
        windSpeedNum: '', // 设备
        method: '',
        windSpeedId: '',
        algorithm: '',
        factorArr: '',
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_xflrs',
        correct: "新风量（人数）",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_xflrs-0-0-0',
            heBingLength: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: "",
            SampleAddress: '', // 检测地点
            position: '',
            shape: '',
            formula: ['', ''],
            measureArea: '',
            windSpeed: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            correction: '/', // 修正信息
            temperature: '',
            number: '',
            airVolume: '',
            time: '', // 检测时间
            tuyereNum: '', // 设备
            tuyereId: '',
            windSpeedNum: '', // 设备
            method: '',
            windSpeedId: '',
            algorithm: '',
            factorArr: '',
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            itemHeight: 100,
            value: function(obj) {
                return 64 + 100 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_xflmj',
    projectName: '新风量（面积）',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        position: '',
        shape: '',
        formula: ['', ''],
        measureArea: '',
        windSpeed: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        correction: '/', // 修正信息
        temperature: '',
        number: '',
        airVolume: '',
        time: '', // 检测时间
        tuyereNum: '', // 设备
        tuyereId: '',
        windSpeedNum: '', // 设备
        method: '',
        windSpeedId: '',
        algorithm: '',
        factorArr: '',
        regionId: '',
        regionNum: '',
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_xflmj',
        correct: "新风量（面积）",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_xflmj-0-0-0',
            heBingLength: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: "",
            SampleAddress: '', // 检测地点
            position: '',
            shape: '',
            formula: ['', ''],
            measureArea: '',
            windSpeed: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            correction: '/', // 修正信息
            temperature: '',
            number: '',
            airVolume: '',
            time: '', // 检测时间
            tuyereNum: '', // 设备
            tuyereId: '',
            windSpeedNum: '', // 设备
            method: '',
            windSpeedId: '',
            algorithm: '',
            factorArr: '',
            regionId: '',
            regionNum: '',
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            itemHeight: 100,
            value: function(obj) {
                return 64 + 100 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_xflcs',
    projectName: '新风量（次数）',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        position: '',
        shape: '',
        formula: ['', ''],
        measureArea: '',
        windSpeed: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        correction: '/', // 修正信息
        temperature: '',
        number: '',
        airVolume: '',
        time: '', // 检测时间
        tuyereNum: '', // 设备
        tuyereId: '',
        windSpeedNum: '', // 设备
        method: '',
        windSpeedId: '',
        algorithm: '',
        factorArr: '',
        roomNum: '',
        roomId: '',
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_xflcs',
        correct: "新风量（次数）",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_xflcs-0-0-0',
            heBingLength: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: "",
            SampleAddress: '', // 检测地点
            position: '',
            shape: '',
            formula: ['', ''],
            measureArea: '',
            windSpeed: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
            correction: '/', // 修正信息
            temperature: '',
            number: '',
            airVolume: '',
            time: '', // 检测时间
            tuyereNum: '', // 设备
            tuyereId: '',
            windSpeedNum: '', // 设备
            method: '',
            windSpeedId: '',
            algorithm: '',
            factorArr: '',
            roomNum: '',
            roomId: '',
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            itemHeight: 100,
            value: function(obj) {
                return 64 + 100 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_fwtzs',
    projectName: '非稳态噪声',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        point: '', // 检测点位
        valL: ['', '', '', '', ''],
        result: '', // 检测结果
        resultAverage: '', //检测结果平均值
        time: '', // 检测时间
        deviceNum: '', // 设备
        SampleTools: '',
        remarks: '' // 备注
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_fwtzs',
        correct: "非稳态噪声",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_fwtzs-0-0-0',
            heBingLength: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: "",
            SampleAddress: '', // 检测地点
            point: '', // 检测点位
            valL: ['', '', '', '', ''],
            result: '', // 检测结果
            resultAverage: '', //检测结果平均值
            time: '', // 检测时间
            deviceNum: '', // 设备
            SampleTools: '',
            remarks: '' // 备注
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            value: function(obj) {
                return 64 + 32 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_dqy',
    projectName: '大气压',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        sampleNum: '', // 采样编号
        sampleNumIndex: '',
        SampleAddress: '',
        temperature: '',
        meterVal: '',
        scaleVal: '',
        temperatureCoefficient: '',
        supplementVal: '',
        result: '', // 检测结果
        resultAverage: '',
        time: '', // 检测时间
        factorArr: '',
        method: '',
        algorithm: '',
        deviceNum: '', // 设备
        SampleTools: '',
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_dqy',
        correct: "大气压",
        heBingId: 'project_jc_dqy-0-0-0',
        heBingChange: true,
        heBingJudge: true,
        testingItems: '',
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            sampleNum: '', // 采样编号
            sampleNumIndex: '',
            SampleAddress: '',
            temperature: '',
            meterVal: '',
            scaleVal: '',
            temperatureCoefficient: '',
            supplementVal: '',
            result: '', // 检测结果
            resultAverage: '',
            time: '', // 检测时间
            factorArr: '',
            method: '',
            algorithm: '',
            deviceNum: '', // 设备
            SampleTools: '',
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            value: function(obj) {
                return 64 + 32 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}, {
    name: 'project_jc_cgxs',
    projectName: '采光系数',
    switch: false,
    type: null,
    publicData: [], //本模块的公共数据
    noCopyArr: ['pointId', 'sampleNum'],
    //添加行使用的模板数据
    modelRow: {
        pointId: window.uuid(),
        foreverId: window.uuid(), //永久的id 用于重复样
        noShow: true,
        heBingId: '',
        heBingLength: '',
        sampleNum: '', // 采样编号
        sampleNumIndex: "",
        SampleAddress: '', // 检测地点
        lengthGroundA: '',
        lengthGroundB: '',
        windowLengthA: '',
        windowLengthB: '',
        windowNum: '',
        result: '', // 检测结果
        time: '', // 检测时间
        deviceNum: '', // 设备
        SampleTools: '',
    },
    valueData: { //模块内容键值对
        testProject: 'project_jc_cgxs',
        correct: "采光系数",
        testingItems: '',
        heBingChange: true,
        heBingJudge: true,
        point: [{
            pointId: window.uuid(),
            foreverId: window.uuid(), //永久的id 用于重复样
            noShow: true,
            heBingId: 'project_jc_cgxs-0-0-0',
            heBingLength: '',
            sampleNum: '', // 采样编号
            sampleNumIndex: '',
            SampleAddress: '', // 检测地点
            lengthGroundA: '',
            lengthGroundB: '',
            windowLengthA: '',
            windowLengthB: '',
            windowNum: '',
            result: '', // 检测结果
            time: '', // 检测时间
            deviceNum: '', // 设备
            SampleTools: '',
        }]
    },
    height: { //模块高度
        _normal: {
            carried: true,
            fixed: 64,
            value: function(obj) {
                return 64 + 32 * (obj.point.length);
            }
        },
        _short: {
            carried: false,
            value: function(obj) {
                return 0
            }
        }
    }
}]