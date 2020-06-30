<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.16 低对比度细节检测</p>
            <p style="line-height: 16px;">4.16.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收：建立基线值；状态：与基线值比较不超过2个细节变化。</p>
            </div>
            <p style="line-height: 16px;">4.16.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">有可能的话取出滤线栅。选取合适的SID、管电压和滤过，入射空气比释动能分别选取约1μGy、5μGy、10μGy，进行三次<br>曝光获取影像，并记录检测结果，验收检测控模体说明书判断或建立基线值，状态检测与基线值进行比较。
                </p>
            </div>
            <p style="line-height: 16px;">4.16.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom">
                        <div class="___relative tc borderRight" style="width:290px;">
                            <span>剂量水平</span>
                        </div>
                        <div class="___absolute tc t0 borderRight" style="width:150px;left:290px;">
                            <span>1μGy</span>
                        </div>
                        <div class="___absolute tc t0 borderRight" style="width:150px;left:440px;">
                            <span>5μGy</span>
                        </div>
                        <div class="___absolute tc t0 right0" style="width:120px;">
                            <span>10μGy</span>
                        </div>
                    </div>
                    <div class="___relative" :class="num!=item.rows.length-1 ? 'borderBottom':''"
                         v-for="(val,num) in item.rows">
                        <div class="___absolute tc Full borderRight" style="width:120px;">
                            <span class="heightCenter3">{{val[0]}}</span>
                        </div>
                        <div class="___relative" style="width: 590px;left:120px;">
                            <div class="___relative borderBottom">
                                <div class="___relative tc borderRight" style="width:170px;">
                                    <span>细节直径</span>
                                </div>
                                <div class="___absolute Full tc" style="width:420px;left:170px;">
                                    <divModel v-model="val[1]" style="width:100%;text-align: center;"
                                              class="Full heightCenter3 hide focusBg"></divModel>
                                </div>
                            </div>
                            <div class="___relative borderBottom">
                                <div class="___relative tc borderRight" style="width:170px;">
                                    <span>细节数</span>
                                </div>
                                <div class="___absolute Full tc" style="width:420px;left:170px;">
                                    <div class="___relative tc borderRight" style="width:150px;height:32px;">
                                        <divModel v-model="val[2]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                    <div class="___absolute Full tc t0 borderRight" style="width:150px;left:150px;">
                                        <divModel v-model="val[3]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                    <div class="___absolute Full tc t0 right0" style="width:120px;">
                                        <divModel v-model="val[4]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                </div>
                            </div>
                            <div class="___relative">
                                <div class="___relative tc borderRight" style="width:170px;">
                                    <span>对比度</span>
                                </div>
                                <div class="___absolute Full tc" style="width:420px;left:170px;">
                                    <div class="___relative tc borderRight" style="width:150px;height:32px;">
                                        <divModel v-model="val[5]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                    <div class="___absolute Full tc t0 borderRight" style="width:150px;left:150px;">
                                        <divModel v-model="val[6]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                    <div class="___absolute Full tc t0 right0" style="width:120px;">
                                        <divModel v-model="val[7]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                </div>
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
            reset() {
                let obj = {
                    rows: [['基线值', '', '', '', '', '', '', ''], ['检测结果', '', '', '', '', '', '', '']]
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
