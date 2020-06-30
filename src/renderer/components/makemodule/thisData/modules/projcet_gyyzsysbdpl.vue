<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.6 光野与照射野四边的偏离/cm</p>
            <p style="line-height: 16px;">4.6.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&状态&稳定性：任一边±1.0内。</p>
            </div>
            <p style="line-height: 16px;">4.6.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">将检测板放置于影像接收器上，使检测板中心与光野中心重合检测筒放在检测板上，检测筒的圆心与检测板的中心重合，调<br>
                    节焦片距为100cm或常用焦片距（并记录下来），调节光野左边和上边分别与检测板长方框左边和上边对齐，记录光野右边<br>
                    和下边与长方框右边 和下边的的距离，如果光野边在长方框外面则记录光野边与长方框边距离为a，曝光后记录影像四边与<br>
                    检测板长方框四边的距离，如果影像边在长方框外面则记录影像边与长方框边距离为b，则光野偏离为b-a，如果焦片距不能<br>
                    调节至100cm则检测结果需要进行距离修正，修正公式：光野偏离为（b-a）×100/焦皮距。
                </p>
            </div>
            <p style="line-height: 16px;">4.6.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="___absolute Full tc borderRight" style="width:270px;">
                        <span class="heightCenter3">焦皮距=cm</span>
                    </div>
                    <div class="___relative tc borderRight" style="width:110px;left:270px;height:32px;">
                        <span>左边/cm</span>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:110px;left:380px;">
                        <span>右边/cm</span>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:110px;left:490px;">
                        <span>上边/cm</span>
                    </div>
                    <div class="___absolute Full tc right0" style="width:110px;">
                        <span>下边/cm</span>
                    </div>
                </div>
                <div class="___relative" :class="index!=data.valueData.point.length-1 ? 'borderBottom':''" v-for="(item,index) in data.valueData.point">
                    <div class="___absolute Full tc borderRight" style="width:270px;">
                        <span>{{item.rows[0]}}</span>
                    </div>
                    <div class="___relative tc borderRight" style="width:110px;left:270px;height:32px;">
                        <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:110px;left:380px;">
                        <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:110px;left:490px;">
                        <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc right0" style="width:110px;">
                        <divModel v-model="item.rows[4]" style="width:100%;text-align: center;"
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
