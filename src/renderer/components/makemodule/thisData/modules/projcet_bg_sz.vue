<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="___relative tc borderRight" style="width: 50px;">
                        <span>序号</span>
                    </div>
                    <div class="___absolute t0 tc borderRight" style="width: 300px;left:50px;">
                        <span>检测点位置</span>
                    </div>
                    <div class="___absolute t0 tc right0" style="width: 300px;line-height: 16px;">
                        <span>*报告值<br>*(单位：)</span>
                    </div>
                </div>
                <div class="___relative" :class="index != data.valueData.point.length-1 ? 'borderBottom':''"
                     v-for="(item,index) in data.valueData.point">
                    <div class="___relative tc borderRight" style="width: 50px;">
                        <span>{{index+1}}</span>
                    </div>
                    <div class="Full t0 tc borderRight" style="width: 300px;left:50px;">
                        <span>{{item.v1}}</span>
                    </div>
                    <div class="Full t0 tc right0" style="width: 300px;">
                        <span>{{item.v2}}</span>
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
