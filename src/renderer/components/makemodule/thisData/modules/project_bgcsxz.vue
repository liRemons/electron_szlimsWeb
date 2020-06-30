<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.11 响应均匀性</p>
            <p style="line-height: 16px;">4.11.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&状态&稳定性：CV≤5.0%。</p>
            </div>
            <p style="line-height: 16px;">4.11.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">选取探测器剂量指示（DDI）项目中10μGy的预处理图像，选取中心和四个像限中央各一个面积约4cm×4cmROI，分别获<br>取像素值Vi，计算变异系数。变异系数计算公式为：
                    <img src="../../../../assets/img/formula_3.png" height="30" width="170"/></p>
            </div>
            <p style="line-height: 16px;">4.11.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative" style="width: 551px;">
                        <div class="___relative borderBottom">
                            <div class="___relative tc borderRight" style="width:100px;height:32px;">
                                <span class="heightCenter3">位置</span>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:100px;">
                                <span>中心</span>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:190px;">
                                <span>Ⅰ</span>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:280px;">
                                <span>Ⅱ</span>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:370px;">
                                <span>Ⅲ</span>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:460px;">
                                <span>Ⅳ</span>
                            </div>
                        </div>
                        <div class="___relative">
                            <div class="___relative tc borderRight" style="width:100px;height:32px;">
                                <span class="heightCenter3">像素值Vi</span>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:100px;">
                                <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:190px;">
                                <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:280px;">
                                <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:370px;">
                                <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:90px;left:460px;">
                                <divModel v-model="item.rows[4]" style="width:100%;text-align: center;"
                                          class="Full heightCenter3 hide focusBg"></divModel>
                            </div>
                        </div>
                    </div>
                    <div class="___absolute Full right0" style="width: 160px;">
                        <div class="heightCenter3 ml5">
                            <span>CV=</span>
                            <divModel v-model="item.CV" style="width:50px;text-align: center;left:30px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                            <span style="margin-left:60px;">%</span>
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
                    CV:"",
                    rows: ['', '', '', '', ''],
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
