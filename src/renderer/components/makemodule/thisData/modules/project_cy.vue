<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.13 残影</p>
            <p style="line-height: 16px;">4.13.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&稳定性：不存在残影或有残影而像素值误差≤5.0%。</p>
            </div>
            <p style="line-height: 16px;">4.13.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">有可能的话取出滤线栅，设置SID等于或尽量接近180cm。第一次曝光，关闭遮线器，用面积15cm×15cm，厚2mm铅板覆<br>盖出线口，设置最低管电压最低管电流积或最低管电流后，手动曝光并获取一幅空白影像；第二次曝光，打开遮线器，取走<br>铅板，在探测器表面中央部位放置一块面积4cm×4cm，厚4mm铅板，70kV，无滤过，入射空气比释动能选取5μGy，实际<br>检测条件参考曝光参数选择；1.5分钟内进行第三次曝光，条件同第一次曝光，观察第三次曝光后的空白影像中不应存在第二<br>次曝光影像中的残影，如果存在残影，应分别测量残影区和非残影区相同ROI面积的平均像素值，并比较。<br>计算公式：误差=(残影区平均像素值-非残影区平均像素值)/非残影区平均像素值×100%。
                </p>
            </div>
            <p style="line-height: 16px;">4.13.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___absolute Full borderRight" style="width: 190px;line-height: 16px;">
                        <span class="heightCenter2"
                              style="margin:-24px 0 0 10px;">第三次曝光后的空白影像中<br>是否存在第二次曝光影像中<br>的残影</span>
                    </div>
                    <div class="___relative right0" style="width: 520px;left:190px;">
                        <div class="___relative borderBottom">
                            <div class="___absolute Full borderRight" style="width:90px;">
                                <div class="heightCenter3" style="left:10px;">
                                    <el-radio v-model="item.Judge" :label="1">是</el-radio>
                                </div>
                            </div>
                            <div class="___relative tc" style="width:430px;left:90px;">
                                <div class="___relative borderBottom">
                                    <div class="___relative tc borderRight" style="width:180px;">
                                        <span>残影区平均像素值</span>
                                    </div>
                                    <div class="___absolute Full tc borderRight" style="width:180px;left:180px;">
                                        <span>非残影区平均像素值</span>
                                    </div>
                                    <div class="___absolute Full tc right0" style="width:70px;">
                                        <span>误差/%</span>
                                    </div>
                                </div>
                                <div class="___relative" style="height:32px;">
                                    <div class="___absolute Full tc borderRight" style="width:180px;">
                                        <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                    <div class="___absolute Full tc borderRight" style="width:180px;left:180px;">
                                        <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                    <div class="___absolute Full tc right0" style="width:70px;">
                                        <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                                  class="Full heightCenter3 hide focusBg"></divModel>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="___relative">
                            <div class="___relative" style="left:10px;">
                                <el-radio v-model="item.Judge" :label="2">否</el-radio>
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
                    Judge: "",
                    rows: ['', '', '']
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
