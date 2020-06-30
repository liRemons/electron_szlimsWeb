<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.5 有用线束垂直度偏离</p>
            <p style="line-height: 16px;">4.5.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&状态&稳定性：≤3°。</p>
            </div>
            <p style="line-height: 16px;">4.5.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">将检测板放置于影像接收器上，使检测板中心与光野中心重合，检测筒放在检测板上，检测筒的圆心与检测板的中心重合，<br>调节焦片距为100cm或常用焦片距，设置加载条件：60kV，3mAs左右，对于焦片距为100cm则曝光后观察检测筒上表面<br>中心钢珠的影像落在检测板中大圆影像内，则记录检测结果为＜3°，焦片距不等于100cm时应测量检测筒上表面中心钢珠的<br>影像距检测板中心的距离d，当d×100/大圆半径＜焦片距时，则记录检测结果为＜3°。
                </p>
            </div>
            <p style="line-height: 16px;">4.5.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <el-checkbox v-model="data.valueData.cokeSlice" class="ml5">焦片距=100cm：</el-checkbox>
                <divModel v-model="data.valueData.cokeSliceVal" style="width:50px;text-align: center;left:140px;"
                          class="Full heightCenter3 hide focusBg"></divModel>
                <el-checkbox v-model="data.valueData.within" style="margin-left:20px;">钢珠影像落在大圆内</el-checkbox>
                <el-checkbox v-model="data.valueData.external">钢珠影像落在大圆外，检测结果:</el-checkbox>
                <divModel v-model="data.valueData.externalVal" style="width:50px;text-align: center;left:630px;"
                          class="Full heightCenter3 hide focusBg"></divModel>
            </div>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <el-checkbox v-model="data.valueData.radius" class="ml5">焦片距=cm：d=cm，d×100/大圆半径=cm，检测结果：</el-checkbox>
                <divModel v-model="data.valueData.radiusVal" style="width:50px;text-align: center;left:400px;"
                          class="Full heightCenter3 hide focusBg"></divModel>
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
