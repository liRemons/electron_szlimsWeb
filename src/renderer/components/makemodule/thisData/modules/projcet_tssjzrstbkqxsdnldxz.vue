<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">4.1 透视受检者入射体表空气比释动能率典型值/（mGy/min）</p>
            <p style="line-height: 16px;">4.1.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <span class="ml5 tl">验收&状态：≤50@透视荧光屏设备；验收&状态&稳定性：≤25@非透视荧光屏设备。</span>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.1.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom" style="line-height: 16px;padding-left: 5px;">
                    <span>将尺寸为30cm×30cm×20cm的水模放置在探测器与影像接收器之间，调节至影像接收器最大照射野尺寸下进行检测，检条<br>件见下表：</span>
                </div>
                <div class="___relative borderBottom">
                    <div style="width: 140px;" class="tc borderRight ___relative">
                        <span>X射线透视设备类型</span>
                    </div>
                    <div style="width: 170px;left:140px;" class="___absolute t0 tc borderRight">
                        <span>探测器位置</span>
                    </div>
                    <div style="width: 130px;left:310px;" class="___absolute t0 tc borderRight">
                        <span>影像接收器位置</span>
                    </div>
                    <div style="width: 130px;line-height:16px;left:440px;" class="___absolute t0 tc borderRight">
                        <span>有AERC的透视<br>条件</span>
                    </div>
                    <div style="width: 140px;line-height:16px;" class="___absolute t0 tc right0">
                        <span>无AERC<br>的透视条件</span>
                    </div>
                </div>
                <div class="___relative borderBottom">
                    <div class="___relative" v-for="(item,index) in data.valueData.point" style="width: 100%;">
                        <div :class="index!=data.valueData.point.length-1 ? 'borderBottom':''" class="___relative"
                             style="width: 440px;">
                            <div style="width: 140px;height: 32px;" class="tc borderRight ___relative">
                                <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div style="width: 170px;left:140px;" class="Full t0 tc borderRight">
                                <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div style="width: 130px;left:310px;" class="Full t0 tc borderRight">
                                <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                        </div>
                    </div>
                    <div style="width: 130px;left:440px;" class="Full t0 tc borderRight">
                        <divModel v-model="data.valueData.thereAreAERC" style="width:100%;text-align: center;"
                                  class="___absolute heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div style="width: 140px;" class="Full t0 tc right0">
                        <div style="width: 140px;height: 32px;" class="tc borderRight borderBottom ___relative">
                            <divModel v-model="data.valueData.NoAERC[0]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div style="width: 140px;height: 96px;" class="tc borderRight ___relative">
                            <divModel v-model="data.valueData.NoAERC[1]" style="width:100%;text-align: center;"
                                      class="___absolute heightCenter3 hide focusBg"></divModel>
                        </div>
                    </div>
                </div>
                <div class="___relative">
                    <span class="ml5">计算公式：校准值=测量值×校准因子。</span>
                </div>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.1.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="___relative ml5">
                        <el-radio v-model="data.valueData.perspective" :label="1">普通荧光屏透视</el-radio>
                        <el-radio v-model="data.valueData.perspective" :label="2">影像增强器透视</el-radio>
                    </div>
                </div>
                <div class="___relative">
                    <div class="___relative">
                        <div class="___relative tc borderRight borderBottom" style="width: 130px;">
                            <span>照射野尺寸</span>
                        </div>
                        <div class="___absolute t0 tc right0 borderBottom" style="width: 300px;">
                            <div class="___relative tc borderRight" style="width: 150px;line-height: 16px;">
                                <span>测量值/μGy/s<br>nGy/s</span>
                            </div>
                            <div class="___absolute t0 tc" style="width: 150px;left:150px;">
                                <span>校准值/mGy/min</span>
                            </div>
                        </div>
                    </div>
                    <div class="___relative">
                        <div class="___relative tc borderRight" style="width: 130px;height:32px;">
                            <divModel v-model="data.valueData.testingConditions[0]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute t0 tc right0" style="width: 300px;">
                            <div class="___relative tc borderRight" style="width: 150px;height:32px;">
                                <divModel v-model="data.valueData.testingConditions[1]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div class="Full t0 tc" style="width: 150px;left:150px;">
                                <divModel v-model="data.valueData.testingConditions[2]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                        </div>
                    </div>
                    <div class="Full t0 borderRight" style="width: 280px;left:130px;">
                        <div class="___relative ml5">
                            <span>检测条件：</span>
                            <divModel v-model="data.valueData.testingConditions[3]" style="width:50px;text-align: center;left:60px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                            <span style="margin-left:50px;">kV，mA</span>
                        </div>
                        <div class="___relative ml5">
                            <span>校准因子=</span>
                            <divModel v-model="data.valueData.testingConditions[4]" style="width:50px;text-align: center;left:60px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
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
        methods: {},
        mounted() {
        }
    };
</script>

<style lang="less">
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
