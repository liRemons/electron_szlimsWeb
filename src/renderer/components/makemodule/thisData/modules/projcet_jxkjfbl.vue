<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.15 极限空间分辨力</p>
            <p style="line-height: 16px;">4.15.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：≥90.0%厂家规定值，或≥80.0%fNyquist，建立基线值；状态≥90.0%基线值。</p>
            </div>
            <p style="line-height: 16px;">4.15.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">有可能的话取出滤线栅，设置SID等于或尽量接近180cm。选用两块分辨力测式卡，呈相互垂直的状态，放置于探测器表面<br>，选用适当条件（如用60kV，3mAs）进行曝光。验收检测建立基线值并与厂家保证值比较，无厂家保证值时与fNyquist比<br>较，并建立基线值；状态检测与基线值比较，对于厂家保证值为45°时的检测结果的，直接用厂家保证值除以1.414即为水平<br>和垂直方向的厂家保证值。
                </p>
            </div>
            <p style="line-height: 16px;">4.15.3检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom">
                        <div class="___relative tc borderRight" style="width: 90px;">
                            <span>方向</span>
                        </div>
                        <div class="___absolute t0 tc borderRight" style="width: 140px;left:90px;line-height: 16px;">
                            <span>最大可分辨线对<br>数目/lp/mm</span>
                        </div>
                        <div class="___absolute t0 tc borderRight" style="width: 140px;left:230px;line-height:16px;">
                            <el-checkbox v-model="item.manufactor" style="margin:0 5px 0 0;"></el-checkbox>
                            <span>厂家保证值<br>/lp/mm</span>
                        </div>
                        <div class="___absolute t0 tc borderRight" style="width: 150px;left:370px;">
                            <span>基线值/lp/mm</span>
                        </div>
                        <div class="___absolute t0 tc borderRight" style="width: 100px;left:520px;line-height:16px;">
                            <el-checkbox v-model="item.fNy" style="margin:0 5px 0 0;"></el-checkbox>
                            <span>fNyquist<br>/lp/mm</span>
                        </div>
                        <div class="___absolute t0 tc right0" style="width: 90px;">
                            <span>检测结果/%</span>
                        </div>
                    </div>
                    <div class="___relative" :class="num!=item.rows.length-1?'borderBottom':''"
                         v-for="(val,num) in item.rows">
                        <div class="___absolute Full t0 tc borderRight" style="width: 90px;">
                            <span class="heightCenter3">{{val[0]}}</span>
                        </div>
                        <div class="___absolute Full t0 tc borderRight" style="width: 140px;left:90px;">
                            <divModel v-model="val[1]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full t0 tc borderRight" style="width: 140px;left:230px;">
                            <divModel v-if="item.manufactor" v-model="val[2]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___relative borderRight" style="width: 150px;left:370px">
                            <div v-if="JudgeVal()" class="___relative ml5">
                                <span>建立基线值=</span>
                                <divModel v-model="val[3]"
                                          style="width:30px;text-align: center;left:75px;"
                                          class="Full heightCenter3 hide focusBg"
                                          :edit="false"
                                          :is-computer="true"
                                          :computers="changeNum(val[1],val[2],val[4],val[5],index,num)"
                                          :computerFormula="'gs11'">
                                </divModel>

                            </div>
                            <div v-else class="___relative ml5">
                                <span>基线值=</span>
                                <divModel v-model="val[4]" style="width:30px;text-align: center;left:50px;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                        </div>
                        <div class="___absolute Full t0 tc borderRight" style="width: 100px;left:520px;">
                            <divModel v-if="item.fNy" v-model="val[5]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full t0 tc right0" style="width: 90px;">
                            <divModel v-if="JudgeResult()" v-model="val[6]"
                                      style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"
                                      :edit="false"
                                      :is-computer="true"
                                      :computers="changeNum(val[1],val[2],val[4],val[5],index,num)"
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
            changeNum(num1, num2, num4, num5, index, num) {
                let val = "";
                this.data.valueData.point[index].rows[num][3] = num1;
                if (this.testingState === 1) {
                    if (this.data.valueData.point[index].manufactor && this.isNumber(num2)) {
                        val = num2
                    } else if (this.data.valueData.point[index].fNy && this.isNumber(num5)) {
                        val = num5
                    }
                } else if (this.testingState === 2 && this.isNumber(num4)) {
                    val = num4
                }
                if (this.isNumber(num1) && this.isNumber(val)) {
                    this.data.valueData.point[index].rows[num][6] = ((num1 / val) * 100).toFixed46(2)
                }else{
                    this.data.valueData.point[index].rows[num][6] = ''
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
            JudgeResult(){
                if (this.testingState === 2 && this.purposeDetection === '新标准首次检测') {
                    return true
                }
                return true
            },
            reset() {
                let obj = {
                    manufactor: "",
                    fNy: "",
                    rows: [['水平', '', '', '', '', '', ''], ['垂直', '', '', '', '', '', '']],
                };
                this.data.valueData.point.forEach((item, index) => {
                    let str = '探测器' + (index + 1);
                    if (this.data.valueData.detector.findIndex((val, num) => val == str) == -1) {
                        this.data.valueData.point.splice(index, 1, obj)
                    }
                });
            },
            isNumber(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
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
