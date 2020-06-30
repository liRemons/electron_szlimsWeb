<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">三、检测结果</p>
            <p style="line-height: 16px;">3.1 防护检测结果</p>
            <p style="line-height: 16px;">3.1.1 检测结果评价</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative" style="height:100px">
                    <divModel v-model="data.valueData.evaluate" style="width:100%;line-height: 16px;"
                              class="rowHeight hide focusBg rowsInput2 warp2 Full"></divModel>
                </div>
            </div>
            <p style="line-height: 16px;margin-top:10px;">3.1.2机房周围剂量率</p>
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
