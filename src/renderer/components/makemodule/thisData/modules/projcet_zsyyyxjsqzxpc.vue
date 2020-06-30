<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">4.8 照射野与影像接收器中心偏差</p>
            <p style="line-height: 16px;">4.8.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：≤2%SID@非透视荧光屏设备。</p>
            </div>
            <p style="line-height: 16px;">4.8.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height:16px;">
                <p class="ml5">调节焦点至影像接收器之间距离最近，照射野设置为最大，将准直测试板放置在影像接收器上使影像接收器中心与测试板中<br>心对准，在透视条件下从显示器中观察并记录照射野中心到影像接收器中心距离，记录焦点至影像接收器之间的距离SID，<br>计算公式为：中心偏差=照射野中心到影像接收器中心距离/SID×100%。
                </p>
            </div>
            <p style="line-height: 16px;">4.8.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <span class="ml5">SID=cm ，照射野中心到影像接收器中心距离：</span>
                <divModel v-model="data.valueData.distance" style="width:50px;text-align: center;left:275px;"
                          class="Full heightCenter3 hide focusBg"></divModel>
                <span style="margin-left:50px;">cm，</span>
                <divModel v-model="data.valueData.SID"
                          style="width:50px;text-align: center;left:355px;"
                          class="Full heightCenter3 hide focusBg"
                          :edit="false"
                          :is-computer="true"
                          :computers="changeNum(data.valueData.distance)"
                          :computerFormula="'gs11'">
                </divModel>
                <span style="margin-left:50px;">=%SID。</span>
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
        methods: {
            isNumber(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },
            changeNum(distance) {
                if (this.isNumber(distance)) {
                    this.data.valueData.SID = (distance * 100).toFixed(2)
                }
            },
        },
        mounted() {
        }
    };
</script>

<style lang="less">
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
