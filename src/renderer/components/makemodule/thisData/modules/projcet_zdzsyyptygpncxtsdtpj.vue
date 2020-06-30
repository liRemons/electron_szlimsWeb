<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">4.9 最大照射野与普通荧光屏尺寸相同时的台屏距/mm</p>
            <p style="line-height: 16px;">4.9.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：≥250@透视荧光屏设备。</p>
            </div>
            <p style="line-height: 16px;">4.9.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height:16px;">
                <p class="ml5">将荧光屏推到距诊断床最近处，将照射野设置为最大，这时照射野应小于荧光屏，在透视条件下，慢慢将荧光屏往远处，当<br>最大照射野等于荧光屏大于时，锁住荧光屏位置。测量床面板至荧光屏后面板（与受检者身体接触的平面）的距离。
                </p>
            </div>
            <p style="line-height: 16px;">4.9.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative tc ___module_frame_Box" style="border-top: solid 1px black;">
                <span>最大照射野与荧光屏尺寸相同时,床面板到屏面板的距离d=</span>
                <divModel v-model="data.valueData.mm" style="width:50px;text-align: center;left:525px;"
                          class="Full heightCenter3 hide focusBg"></divModel>
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
