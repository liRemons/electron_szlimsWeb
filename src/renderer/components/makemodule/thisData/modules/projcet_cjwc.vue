<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.12 测距误差</p>
            <p style="line-height: 16px;">4.12.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&状态：±2.0%内。</p>
            </div>
            <p style="line-height: 16px;">4.12.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">有可能的话取出滤线栅，设置SID等于或尽量接近180cm，选用两个相互垂直的铅尺放置于探测器表面中央，用50kV，<br>10mAs，进行曝光，用测距软件测量不低于10cm的影像距离，如果铅尺不能放置在探测器表面，应将铅尺放置在患者床面<br>中央，获得影像应做距离修正，<br>距离修正公式：修正后测量距离=测量距离×焦点至铅尺距离/SID。计算公式：E=[(Dm-D0)/D0]×100%。
                </p>
            </div>
            <p style="line-height: 16px;">4.12.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom">
                        <div class="___relative tc borderRight" style="width:70px;height:32px;">
                        </div>
                        <div class="___absolute Full tc borderRight" style="width:90px;left:70px;line-height: 16px;">
                            <span>真实距离<br>D0/cm</span>
                        </div>
                        <div class="___absolute Full tc borderRight" style="width:110px;left:160px;line-height: 16px;">
                            <span>测量距离<br>Dm/cm</span>
                        </div>
                        <div class="___absolute Full tc borderRight" style="width:170px;left:270px;">
                            <el-checkbox v-model="item.distance">距离修正</el-checkbox>
                        </div>
                        <div class="___absolute Full tc borderRight" style="width:190px;left:440px;">
                            <el-checkbox v-model="item.measure">修正后测量距离/cm</el-checkbox>
                        </div>
                        <div class="___absolute Full tc right0" style="width:80px;">
                            <span>偏差E/%</span>
                        </div>
                    </div>
                    <div class="___relative" v-for="(val,num) in item.rows">
                        <div class="___relative">
                            <div class="___relative" :class="num!=item.rows.length-1 ? 'borderBottom':''"
                                 style="width: 271px;">
                                <div class="___relative tc borderRight" style="width:70px;height:32px;">
                                    <span class="heightCenter3">{{val[0]}}</span>
                                </div>
                                <div class="___absolute Full tc borderRight" style="width:90px;left:70px;">
                                    <divModel v-model="val[1]" style="width:100%;text-align: center;"
                                              class="Full heightCenter3 hide focusBg"></divModel>
                                </div>
                                <div class="___absolute Full tc borderRight" style="width:110px;left:160px;">
                                    <divModel v-model="val[2]" style="width:100%;text-align: center;"
                                              class="Full heightCenter3 hide focusBg"></divModel>
                                </div>
                            </div>
                            <div class="___absolute Full tc right0" :class="num!=item.rows.length-1 ? 'borderBottom':''"
                                 style="width: 270px;">
                                <div class="___absolute Full tc borderRight" style="width:190px;">
                                    <divModel v-model="val[3]" style="width:100%;text-align: center;"
                                              class="Full heightCenter3 hide focusBg"></divModel>
                                </div>
                                <div class="___absolute Full tc right0" style="width:80px;">
                                    <divModel v-model="val[4]" style="width:100%;text-align: center;"
                                              class="Full heightCenter3 hide focusBg"></divModel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="___absolute Full borderRight" style="width:170px;left:270px;top:32px;">
                        <div class="___relative ml5">
                            <span>SID=</span>
                            <divModel v-model="item.SID" style="width:60px;text-align: center;left:35px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                            <span class="___absolute" style="left:100px;">cm</span>
                        </div>
                        <div class="___relative ml5">
                            <span>焦点至铅尺距离=</span>
                            <divModel v-model="item.focus" style="width:40px;text-align: center;left:100px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                            <span class="___absolute" style="left:145px;">cm</span>
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
                    distance: "",
                    measure: "",
                    SID: "",
                    focus: "",
                    rows: [['水平', '', '', '', ''], ['垂直', '', '', '', '']],
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
