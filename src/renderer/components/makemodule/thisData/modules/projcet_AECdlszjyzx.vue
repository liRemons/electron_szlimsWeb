<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.18 AEC电离室之间一致性</p>
            <p style="line-height: 16px;">4.18.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：±10.0%内；状态：±15.0%内。</p>
            </div>
            <p style="line-height: 16px;">4.18.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">70kV，1mmCu滤过，分别选择一个电离室，在AEC条件下曝光，记录mA，s或mAs或DDI值，将每两个电离室的测量值X<br>进行比较，计算平均值最大偏差。电离室i测量值Xi与电离室j测量值Xj之间的平均值偏差ij=(Xi-Xj)/(Xi+Xj)。
                </p>
            </div>
            <p style="line-height: 16px;">4.18.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom">
                        <div class="___relative tc borderRight" style="width: 170px;height:32px;">
                            <span class="heightCenter3">检测指标</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:170px;">
                            <span class="heightCenter3">电离室1</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:260px;">
                            <span class="heightCenter3">电离室2</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:350px;">
                            <span class="heightCenter3">电离室3</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:440px;">
                            <span class="heightCenter3">平均值偏差12</span>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:530px;">
                            <span class="heightCenter3">平均值偏差23</span>
                        </div>
                        <div class="___absolute t0 Full tc right0" style="width: 90px;">
                            <span class="heightCenter3">平均值偏差13</span>
                        </div>
                    </div>
                    <div class="___relative">
                        <div class="___relative borderRight" style="width: 170px">
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[0]" :label="1">mA、s</el-radio>
                            </div>
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[0]" :label="2">mAs</el-radio>
                            </div>
                            <div class="___relative ml5">
                                <el-radio v-model="item.rows[0]" :label="3">DDI值</el-radio>
                            </div>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:170px;">
                            <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:260px;">
                            <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:350px;">
                            <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:440px;">
                            <divModel v-model="item.rows[4]"
                                      style="width:100%;text-align: center;"
                                      class="Full warp2 heightCenter3 rowsInput2 hide focusBg"
                                      :edit="false"
                                      :is-computer="true"
                                      :computers="changeNum(item.rows[1],item.rows[2],item.rows[3],index)"
                                      :computerFormula="'gs11'">
                            </divModel>
                        </div>
                        <div class="___absolute t0 Full tc borderRight" style="width: 90px;left:530px;">
                            <div style="width:100%;text-align: center;" class="Full heightCenter3 hide focusBg">
                                {{item.rows[5]}}
                            </div>
                        </div>
                        <div class="___absolute t0 Full tc right0" style="width: 90px;">
                            <div style="width:100%;text-align: center;" class="Full heightCenter3 hide focusBg">
                                {{item.rows[6]}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            changeNum(num1, num2, num3, index) {
                let arr = [num1, num2, num3];
                let calculation = this.judgeNum(arr);
                if (calculation.length === 3) {
                    this.data.valueData.point[index].rows[4] = ((num1-num2)*(num1+num2)).toFixed(1);
                    this.data.valueData.point[index].rows[5] = ((num2-num3)*(num2+num3)).toFixed(1);
                    this.data.valueData.point[index].rows[6] = ((num1-num3)*(num1+num3)).toFixed(1);
                } else {
                    this.data.valueData.point[index].rows[4] = '';
                    this.data.valueData.point[index].rows[5] = '';
                    this.data.valueData.point[index].rows[6] = ''
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
                    choice: "",
                    rows: ['', '', '', '', '', '', ''],
                };
                this.data.valueData.point.forEach((item, index) => {
                    let str = '探测器' + (index + 1);
                    if (this.data.valueData.detector.findIndex((val, num) => val == str) == -1) {
                        this.data.valueData.point.splice(index, 1, obj)
                    }
                });
            },
        },
        mounted() {

        }
    };
</script>

<style>
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
