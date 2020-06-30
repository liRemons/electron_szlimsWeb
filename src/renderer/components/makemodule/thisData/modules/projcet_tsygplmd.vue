<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">4.3 透视荧光屏灵敏度/(cd/m^2)/(mGy/min)</p>
            <p style="line-height: 16px;">4.3.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <span class="ml5 tl">验收：≥0.11@透视荧光屏设备；状态：≥0.08@透视荧光屏设备。</span>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.3.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">将剂量仪的探测器紧贴在荧光屏入射面的照射野（如有滤线栅，应在其后面），以60kV，3mA照射，测得荧光屏入射面的<br>空气比释动能率K。相同条件下，用亮度计测量荧光屏的亮度b。透视荧光屏灵敏度计算公式：B=b/K/校准因子。
                </p>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.3.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <span class="ml5">检测条件：</span>
                    <divModel v-model="data.valueData.testingConditions[0]"
                              style="width:50px;text-align: center;left:65px;"
                              class="Full heightCenter3 hide focusBg"></divModel>
                    <span style="margin-left:50px">kV，mA，校准因子=</span>
                    <divModel v-model="data.valueData.testingConditions[1]"
                              style="width:50px;text-align: center;left: 245px;"
                              class="Full heightCenter3 hide focusBg"></divModel>
                </div>
                <div class="___relative borderBottom">
                    <div class="___relative tc borderRight" style="width: 33.3333%;">
                        <span>K/mGy/min</span>
                    </div>
                    <div class="___absolute t0 tc borderRight" style="width: 33.3333%;left:33.3333%">
                        <span>b/cd/m²</span>
                    </div>
                    <div class="___absolute t0 tc right0" style="width: 33.3333%;">
                        <span>B /（cd/m²)/(mGy/min)</span>
                    </div>
                </div>
                <div class="___relative">
                    <div class="___relative tc borderRight" style="width: 33.3333%;height:32px;">
                        <divModel v-model="data.valueData.testingConditions[2]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 borderRight" style="width: 33.3333%;left:33.3333%">
                        <divModel v-model="data.valueData.testingConditions[3]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 right0" style="width: 33.3333%;">
                        <divModel v-model="data.valueData.testingConditions[4]"
                                  style="width:100%;text-align: center;"
                                  class="Full hide focusBg"
                                  :edit="false"
                                  :is-computer="true"
                                  :computers="changeNum(data.valueData.testingConditions[1],data.valueData.testingConditions[2],data.valueData.testingConditions[3])"
                                  :computerFormula="'gs11'">
                        </divModel>
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
            isNumber(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },
            changeNum(num, k, b) {
                if (this.isNumber(num) && this.isNumber(k) && this.isNumber(b)) {
                    this.data.valueData.testingConditions[4] = ((b / k) / num).toFixed(2)
                }
            },
        },
        mounted() {
        }
    };
</script>

<style lang="less">
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
