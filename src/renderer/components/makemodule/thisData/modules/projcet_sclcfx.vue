<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.2 输出量重复性</p>
            <p style="line-height: 16px;">4.2.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">调节焦点到探测器的距离为100cm，照射野为10cm×10cm，中心线束与台面垂直，探测器下方放一块铅板，调节至无附加<br>
                    滤过以适当管电流积（如10mAs）照射5次，计算每管电流时间积的输出量K_i，K_i=空气比释动能×Nc/It，<br>
                    <img src="../../../../assets/img/formula_2.png" height="30" width="150"/></p>
            </div>
            <p style="line-height: 16px;">4.2.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="___relative borderBottom">
                    <span class="ml5">检测条件：kVmAms/mAs，剂量校准因子Nc=，重复性CV=%</span>
                </p>
                <div class="___relative" :class="index!=data.valueData.point.length-1 ? 'borderBottom':''"
                     v-for="(item,index) in data.valueData.point">
                    <div class="___relative tc borderRight" style="width:220px;height:32px;">
                        <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc"
                         :class="num!=4 ? 'borderRight':'right0'"
                         :style="{left:(num*98)+220+'px'}"
                         v-for="(val,num) in 5"
                         style="width:98px;">
                        <divModel v-model="item.rows[num+1]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
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
        methods: {},
        mounted() {

        }
    };
</script>

<style>
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
