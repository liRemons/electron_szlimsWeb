<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.17 AEC灵敏度</p>
            <p style="line-height: 16px;">4.17.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：建立基线值；状态：基线值±25.0%内。</p>
            </div>
            <p style="line-height: 16px;">4.17.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">70kV，1mmCu滤过，选择所有的电离室，在AEC条件下曝光，记录mA，s，或mAs或DDI值。偏差=（检测结果-基线值）<br>/基线值×100%。</p>
            </div>
            <p style="line-height: 16px;">4.17.3检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom">
                        <div class="___absolute t0 Full tc borderRight" style="width: 70px;">
                            <span class="heightCenter3">SID/cm</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight"
                             style="width: 80px;left:70px;line-height: 16px;">
                            <span class="heightCenter3">滤线栅是<br>否取出</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight"
                             style="width: 70px;left:150px;line-height: 16px;">
                            <span class="heightCenter3">器官曝<br>光程序</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 70px;left:220px;">
                            <span class="heightCenter3">附加滤过</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 140px;left:290px;">
                            <span class="heightCenter3">检测指标</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:430px;">
                            <span class="heightCenter3">检测结果</span>
                        </div>
                        <div class="___relative tc borderRight" style="width: 120px;left:510px;">
                            <span v-if="JudgeTitle()">基线值</span>
                            <span v-else>建立基线值</span>
                        </div>
                        <div class="___absolute t0 Full tc right0" style="width: 80px;">
                            <span class="heightCenter3">偏差/%</span>
                        </div>
                    </div>
                    <div class="___relative">
                        <div class="___absolute t0 Full tc borderRight" style="width: 70px;">
                            <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:70px;">
                            <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 70px;left:150px;">
                            <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 70px;left:220px;">
                            <selectModel @returnVal="returnVal" :special="1" :receive="''"
                                         style="left:1px;"
                                         class="heightCenter3"
                                         :single="true"
                                         :rows="false"
                                         :factor="true"
                                         :transmitText="item.rows[3]"
                                         :Judge="true"
                                         :list="list" :Obj="''"></selectModel>
                        </div>
                        <div class="___relative borderRight" style="width: 140px;left:290px;">
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[4]" :label="1">mA、s</el-radio>
                            </div>
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[4]" :label="2">mAs</el-radio>
                            </div>
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[4]" :label="3">DDI值</el-radio>
                            </div>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 80px;left:430px;">
                            <divModel v-model="item.rows[5]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 120px;left:510px;">
                            <divModel v-model="item.rows[6]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc right0" style="width: 80px;">
                            <divModel v-if="testingState === 2 && purposeDetection !== '新标准首次检测'"
                                      v-model="item.rows[7]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"
                                      :edit="false"
                                      :is-computer="true"
                                      :computers="changeNum(item.rows[5],item.rows[6],index)"
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
            return {
                list: ['mmAl','mmCu'],
            }
        },
        props: ['ipdTemplate', 'pageNumber', 'data', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
        methods: {
            isNumber(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },
            changeNum(num5, num6, index) {
                if (this.isNumber(num5) && this.isNumber(num6)) {
                    this.data.valueData.point[index].rows[7] = (((num5 - num6) / num6) * 100).toFixed46(2)
                }
            },
            returnVal(val, obj, special) {
                if (special == 1) {
                    this.data.valueData.point[this.patternIndex].rows[3] = val;
                }
            },
            JudgeTitle() {
                if (this.testingState === 1) {
                    return true
                } else if (this.testingState === 2 && this.purposeDetection === '新标准首次检测') {
                    return true
                } else {
                    return false
                }
            },
            reset() {
                let obj = {
                    rows: ['', '', '', '', '', '', '', ''],
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
