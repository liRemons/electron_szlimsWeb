<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.8 暗噪声</p>
            <p style="line-height: 16px;">4.8.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5 tl">验收：像素值或DDI在规定值内，或建立基线值，影像均匀无伪影；状态&稳定性：像素值或DDI在规定值内，或基线值<br>±50.0%，影像均匀无伪影。</p>
            </div>
            <p style="line-height: 16px;">4.8.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">有可能的话取出滤线栅，关闭遮线器，用面积15cm×15cm，厚2mm铅板覆盖出线口，设置最低管电流积或最低管电流和<br>最低管电压进行手动曝光并获取一幅空白影像，读取影像中心10cm×10cmROI的平均像素值或记录DDI值。调节适当窗宽<br>窗位，目视检查影像应均匀无伪影。
                </p>
            </div>
            <p style="line-height: 16px;">4.8.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom">
                        <div class=" ___absolute Full tc borderRight" style="width:150px;">
                            <span class="heightCenter3">是否均匀无伪影</span>
                        </div>
                        <div class="___relative borderRight" style="width: 350px;left:150px;">
                            <div class="___relative tc borderBottom">
                                <el-checkbox-group v-model="item.Choice">
                                    <el-checkbox label="平均像素值"></el-checkbox>
                                    <el-checkbox label="DDI值"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                            <div class="___relative">
                                <div class="___relative borderRight" style="width: 175px;">
                                    <div class="___relative ml5">
                                        <el-checkbox v-if="testingState===1" v-model="item.valueChoice"
                                                     label="生产厂家规定值"></el-checkbox>
                                        <el-checkbox v-if="testingState===2" v-model="item.valueChoice"
                                                     label="基线值"></el-checkbox>
                                    </div>
                                </div>
                                <div class="___absolute Full tc right0" style="width: 175px;">
                                    <span class="heightCenter3">检测结果</span>
                                </div>
                            </div>
                        </div>
                        <div class="___absolute Full tc right0" style="width: 210px;">
                            <span class="heightCenter3">结果</span>
                        </div>
                    </div>
                    <div class="___relative">
                        <div class=" ___absolute Full tc borderRight" style="width:150px;">
                            <div class="___absolute heightCenter3">
                                <el-radio v-model="item.artifact" label="是"></el-radio>
                                <el-radio v-model="item.artifact" label="否"></el-radio>
                            </div>
                        </div>
                        <div class="___absolute Full borderRight" style="width: 350px;left:150px;">
                            <div class="___absolute Full borderRight" style="width: 175px;">
                                <divModel v-if="JudgeShow(item.valueChoice)" v-model="item.value"
                                          style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div class="___absolute Full right0" style="width: 175px;">
                                <divModel v-model="item.detectionResult" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                        </div>
                        <div class="___relative" style="width: 210px;left:505px;">
                            <div v-if="valShow()" class="___relative ml5">
                                <span>建立基线值=</span>
                                <divModel v-model="item.result"
                                          style="width:60px;text-align: left;left:75px;"
                                          class="Full hide focusBg"
                                          :edit="false"
                                          :is-computer="true"
                                          :computers="changeNum(item.valueChoice,item.value,item.detectionResult,index)"
                                          :computerFormula="'gs11'">
                                </divModel>
                            </div>
                            <div v-if="valShow()" class="___relative ml5">
                                <span>在规定值内:</span>
                                <divModel v-model="item.prescribed" style="width:60px;text-align: left;left:70px;"
                                          class="Full hide focusBg"></divModel>
                            </div>
                            <div v-else class="___relative ml5">
                                <span>与基线值的偏差=</span>
                                <divModel v-model="item.deviation"
                                          style="width:60px;text-align: left;left:100px;"
                                          class="Full hide focusBg"
                                          :edit="false"
                                          :is-computer="true"
                                          :computers="changeNum(item.valueChoice,item.value,item.detectionResult,index)"
                                          :computerFormula="'gs11'">
                                </divModel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        data() {
            return {}
        },
        props: ['ipdTemplate', 'pageNumber', 'data', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
        methods: {
            changeNum(valueChoice, value, detectionResult, index) {
                if (this.testingState === 1) {
                    this.data.valueData.point[index].result = valueChoice ? this.contrast(value, detectionResult) : detectionResult
                } else if (this.testingState === 2) {
                    if (this.purposeDetection === '新标准首次检测') {
                        this.data.valueData.point[index].result = detectionResult
                    } else {
                        if (this.isNumber(detectionResult) && this.isNumber(value)) {
                            this.data.valueData.point[index].deviation = valueChoice ? (((detectionResult - value) / value) * 100).toFixed46(2) + '%' : ''
                        }
                    }
                }
            },
            JudgeShow(valueChoice) {
                if (valueChoice) {
                    if (this.testingState === 2 && this.purposeDetection === '新标准首次检测') {
                        return false
                    }
                    return true
                } else {
                    return false;
                }
            },
            valShow() {
                if (this.testingState === 1) {
                    return true
                } else if (this.testingState === 2 && this.purposeDetection === '新标准首次检测') {
                    return true
                } else {
                    return false
                }
            },
            contrast(value, detectionResult) {
                let num = '';
                let condition = value[0];
                let manufactor = value.substr(1, value.length - 1);
                if (detectionResult) {
                    switch (condition) {
                        case '<':
                            num = detectionResult > manufactor ? detectionResult : manufactor;
                            break;
                        case '>':
                            num = detectionResult < manufactor ? detectionResult : manufactor;
                            break;
                        case '≥':
                            num = detectionResult >= manufactor ? detectionResult : manufactor;
                            break;
                        case '≤':
                            num = detectionResult <= manufactor ? detectionResult : manufactor;
                            break;
                    }
                    return num
                }
            },
            isNumber(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },
            reset() {
                let obj = {
                    Choice: [],
                    valueChoice: "",
                    artifact: "",
                    value: "",
                    detectionResult: "",
                    result: "",
                    prescribed:"",
                    deviation:""
                };
                this.data.valueData.point.forEach((item, index) => {
                    let str = '探测器' + (index + 1);
                    if (this.data.valueData.detector.findIndex((val, num) => val == str) == -1) {
                        this.data.valueData.point.splice(index, 1, obj)
                    }
                });
            },
        },
        computed: {
            ...mapState({
                testingState: state => state.StomatologyLinkage.testingState,
                purposeDetection: state => state.StomatologyLinkage.purposeDetection,
            })
        },
        watch: {
            purposeDetection() {
                this.data.valueData.detector=[];
                this.reset();
            },
        },
        mounted() {

        }
    };
</script>

<style>
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
