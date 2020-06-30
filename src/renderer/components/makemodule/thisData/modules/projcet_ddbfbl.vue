<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">4.5 低对比分辨力</p>
            <p style="line-height: 16px;">4.5.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5 tl">验收：2%，≤7mm；状态&稳定性：4%，≤7mm。</p>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.5.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">将低对比度分辨力测试板在X射线管与影像接收器之间，尽量靠近影像接收器。调整显示器的亮度对比度，使测试板的影像<br>最佳，记录最小的孔直径，检测时照射野应设置为10cm×10cm，在状态检测时如果不能分辨直径为7mm的孔时，可使用一<br>块厚铝板加带孔的薄铝板再重复测量一次，这时圆孔与其周围的对比度从2%变为4%。
                </p>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.4.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative ml5">
                    <span>检测条件：</span>
                    <divModel v-model="data.valueData.testingConditions" style="width:50px;text-align: center;left:60px;"
                              class="Full heightCenter3 hide focusBg"></divModel>
                    <span style="margin-left:50px;">kV，mA，检测结果：</span>
                    <divModel v-model="data.valueData.detectionResult" style="width:50px;text-align: center;left:240px;"
                              class="Full heightCenter3 hide focusBg"></divModel>
                    <span style="margin-left:50px;">%mm</span>
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
