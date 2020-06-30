<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.4 曝光时间指示的偏离</p>
            <p style="line-height: 16px;">4.4.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&稳定性：±10.0%内@t≥100ms；±2ms或±15.0%内@t＜100ms。</p>
            </div>
            <p style="line-height: 16px;">4.4.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">检测方法同管电压指示的偏离项目，重点测量临床常用时间档进行检测，尽可能选择100ms以下测量2档，100ms及以上测<br>
                    量2档。<br>偏离=曝光时间测量值-曝光时间设置值；偏离度=偏离/曝光时间设置值×100%。
                </p>
            </div>
            <p style="line-height: 16px;">4.4.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="___absolute Full tc borderRight" style="width:260px;">
                        <span class="heightCenter3">检测条件</span>
                    </div>
                    <div class="___relative tc borderRight" style="width:190px;left:260px;height:32px;">
                        <span>曝光时间测量值/mss</span>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:140px;left:450px;">
                        <span class="heightCenter3">偏离/ms</span>
                    </div>
                    <div class="___absolute Full tc right0" style="width:120px;">
                        <span class="heightCenter3">偏离度/%</span>
                    </div>
                </div>
                <div class="___relative" v-for="(item,index) in data.valueData.point">
                    <div class="___absolute Full tc borderRight" style="width:260px;">
                        <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___relative tc borderRight" style="width:190px;left:260px;height:32px;">
                        <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:140px;left:450px;">
                        <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc right0" style="width:120px;">
                        <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
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
