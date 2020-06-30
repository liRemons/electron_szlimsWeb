<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.19 AEC管电压之间一致性</p>
            <p style="line-height: 16px;">4.19.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：建立基线值；状态：±25.0%内。</p>
            </div>
            <p style="line-height: 16px;">4.19.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">1mmCu滤过，有可能的话在无滤线栅无床面衰减条件下，分别设置70kV、80kV、90kV和100kV，在AEC条件下曝光，分<br>别测量4个电压档的影像探测器表面入射空气比释动能，记录剂量值或DDI值，并计算总平均值。偏差=（总平均值-基线值）<br>/基线值×100%。
                </p>
            </div>
            <p style="line-height: 16px;">4.19.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative">
                    <el-checkbox v-model="data.valueData.detector" @change="reset()"
                                 :label="'探测器'+(index+1)"></el-checkbox>
                    <span>（滤线栅是否取出</span>
                    <el-radio v-model="item.filterLine" :label="1">是</el-radio>
                    <el-radio v-model="item.filterLine" :label="2">否</el-radio>
                    <span class="___relative" style="left:-20px;">SID=</span>
                    <divModel v-model="item.SID" style="width:30px;text-align: center;left:370px;"
                              class="Full heightCenter3 hide focusBg"></divModel>
                    <span style="margin-left:20px;">cm,器官曝光程序:</span>
                    <divModel v-model="item.organ" style="width:30px;text-align: center;left:510px;"
                              class="Full heightCenter3 hide focusBg"></divModel>
                    <span style="margin-left:35px;">附加滤过:</span>
                    <divModel v-model="item.additional" style="width:30px;text-align: center;left:600px;"
                              class="Full heightCenter3 hide focusBg"></divModel>
                </div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom">
                        <div class="___relative tc borderRight" style="width: 80px;height:32px;">
                            <span class="heightCenter3">检测指标</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:80px;">
                            <span class="heightCenter3">70kV</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:160px;">
                            <span class="heightCenter3">80kV</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:240px;">
                            <span class="heightCenter3">90kV</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:320px;">
                            <span class="heightCenter3">100kV</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:400px;">
                            <span class="heightCenter3">平均值</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 150px;left:480px;">
                            <span class="heightCenter3">基线值</span>
                        </div>
                        <div class="___absolute t0 Full tc right0" style="width: 80px;">
                            <span class="heightCenter3">偏差/%</span>
                        </div>
                    </div>
                    <div class="___relative">
                        <div class="___relative borderRight" style="width: 80px;">
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[0]" :label="1">mA、s</el-radio>
                            </div>
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[0]" :label="2">mAs</el-radio>
                            </div>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:80px;">
                            <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:160px;">
                            <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:240px;">
                            <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:320px;">
                            <divModel v-model="item.rows[4]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:400px;">
                            <divModel v-model="item.rows[5]"
                                      style="width:100%;text-align: center;"
                                      class="Full warp2 heightCenter3 rowsInput2 hide focusBg"
                                      :edit="false"
                                      :is-computer="true"
                                      :computers="changeNum([item.rows[1],item.rows[2],item.rows[3],item.rows[4]],item.rows[7],index)"
                                      :computerFormula="'gs11'">
                            </divModel>
                        </div>
                        <div class="___absolute t0 Full borderRight" style="width: 150px;left:480px;">
                            <div v-if="JudgeVal()" class="___relative ml5 heightCenter3">
                                <span>建立基线值=</span>
                                <divModel v-model="item.rows[6]"
                                          style="width:30px;text-align: center;left:75px;"
                                          class="Full hide focusBg"></divModel>
                            </div>
                            <div v-else class="___relative ml5 heightCenter3">
                                <span>基线值=</span>
                                <divModel v-model="item.rows[7]"
                                          style="width:30px;text-align: center;left:50px;"
                                          class="Full hide focusBg"></divModel>
                            </div>
                        </div>
                        <div class="___absolute t0 Full tc right0" style="width: 80px;">
                            <divModel v-if="testingState === 2 && purposeDetection !== '新标准首次检测'"
                                      v-model="item.rows[8]"
                                      style="width:100%;text-align: center;"
                                      class="Full warp2 heightCenter3 rowsInput2 hide focusBg"
                                      :edit="false"
                                      :is-computer="true"
                                      :computers="changeNum([item.rows[1],item.rows[2],item.rows[3],item.rows[4]],item.rows[7],index)"
                                      :computerFormula="'gs11'">
                            </divModel>
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
            judgeNum(arr) {
                let calculation = [];
                arr.forEach((item, index) => {
                    if (this.isNumber(item)) {
                        calculation.push(item)
                    }
                });
                return calculation
            },
            average(arr) {
                let calculation = this.judgeNum(arr);
                let total = 0;
                calculation.forEach((item, index) => {
                    total += parseFloat(item)
                });
                return (total / calculation.length)
            },
            changeNum(arr, num1, index) {
                let calculation = this.judgeNum(arr);
                let retainArr = [];
                let average = "";
                calculation.forEach((val, num) => {
                    retainArr.push(val.split(".").length > 1 ? val.split(".")[1].length : 0);
                });
                if (calculation.length > 1) {
                    average = parseFloat(this.average(calculation).toFixed46(Math.max(...retainArr)));
                    this.data.valueData.point[index].rows[5] = average;
                }
                if (this.isNumber(num1) && this.isNumber(average)) {
                    this.data.valueData.point[index].rows[8] = (((average - num1) / num1) * 100).toFixed46(1);
                }
            },
            JudgeVal() {
                if (this.testingState === 1) {
                    return true
                } else if (this.testingState === 2 && this.purposeDetection === '新标准首次检测') {
                    return true
                } else {
                    return false
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
                    filterLine: "",
                    SID: "",
                    organ:"",
                    additional:"",
                    rows: ['', '', '', '', '', '', '', '', '', ''],
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
                this.data.valueData.detector = [];
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
