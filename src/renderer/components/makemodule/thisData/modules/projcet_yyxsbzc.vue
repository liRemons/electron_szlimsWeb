<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.3 有用线束半值层/mmAl</p>
            <p style="line-height: 16px;">4.3.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&状态：≥2.3。</p>
            </div>
            <p style="line-height: 16px;">4.3.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">检测方法同输出量重复性项目，选择80kV，如果不能选择80kV则尽可能选择相邻档中比80kV档低的一档，采用直读法进行<br>测量。</p>
            </div>
            <p style="line-height: 16px;">4.3.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5">管电压kV，HVL= mm AL</p>
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
