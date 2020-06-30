<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.14 伪影</p>
            <p style="line-height: 16px;">4.14.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&状态&稳定性：无伪影。</p>
            </div>
            <p style="line-height: 16px;">4.14.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">有可能的话取出滤线栅，设置SID等于或尽量接近180cm。选用屏/片X射线摄影密着检测板放置于探测器上面，用60kV，<br>约10mAs，进行曝光，目视影像是否存在伪影，如果存在，检查伪影来源。
                </p>
            </div>
            <p style="line-height: 16px;">4.14.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <span class="ml5">是否存在伪影：</span>
                    <el-radio v-model="item.sure" :label="1">是：</el-radio>
                    <div class="___absolute t0" style="margin-left:150px;">
                        <el-radio v-model="item.category" :label="1">探测器伪影</el-radio>
                        <el-radio v-model="item.category" :label="2">监视器伪影</el-radio>
                    </div>
                    <el-radio v-model="item.sure" :label="2" style="margin-left:240px;">否</el-radio>
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
                    sure:"",
                    category:"",
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
