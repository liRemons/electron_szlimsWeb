<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.1 管电压指示的偏离</p>
            <p style="line-height: 16px;">4.1.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black">
                <p class="ml5 tl">验收&状态：±5.0%或±5.0kV内，以较大者控制。</p>
            </div>
            <p style="line-height: 16px;">4.1.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">验收检测时应分别对大小焦点进行测量，状态检测时只测量大焦点即可，管电压测量60kV、80kV、100kV、120kV或电压<br>
                    接近这些值的档位，管电流应设置为允许的最大管电流的50%或多一些。对于加载条件的选择应结合设备实际情况以用户实<br>
                    际需要为准。 校准平均值=管电压测量值平均值×a1-a0，a1=，a0= ，a0和a1依有效的计量部门证书按线性回归拟合方程<br>
                    求得；偏差=校准平均值-管电压设置值，相对偏差=偏差/管电压设置值×100%，100kV及以下，以偏差为检测结果，100kV<br>
                    以上以相对偏差为检测结果。</p>
            </div>
            <p style="line-height: 16px;">4.1.3 检测条件、仪器示值与检测结果</p>

            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="___absolute Full tc borderRight" style="width:210px;">
                        <span class="heightCenter3">检测条件</span>
                    </div>
                    <div class="___relative tc borderRight" style="width:220px;left:210px;">
                        <div class="___relative tc borderBottom" style="width:220px;">
                            <span>管电压测量值/kV</span>
                        </div>
                        <div class="___relative tc" style="width:220px;">
                            <div class="___relative tc borderRight" style="width:73px;">
                                <span>1</span>
                            </div>
                            <div class="___absolute Full tc borderRight" style="width:73px;left:73px;">
                                <span>2</span>
                            </div>
                            <div class="___absolute Full tc right0" style="width:73px;">
                                <span>3</span>
                            </div>
                        </div>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:90px;left:430px;line-height: 16px;">
                        <span class="heightCenter3">校准平均值<br>/kV</span>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:100px;left:520px;line-height: 16px;">
                        <span class="heightCenter3">偏差<br>/kV</span>
                    </div>
                    <div class="___absolute Full tc right0" style="width:90px;line-height: 16px;">
                        <span class="heightCenter3">相对偏差<br>/%</span>
                    </div>
                </div>
                <div class="___relative" v-for="(item,index) in data.valueData.point">
                    <div class="___absolute Full tc borderRight" style="width:210px;">
                        <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___relative tc borderRight" style="width:220px;left:210px;height:32px;">
                        <div class="___absolute Full tc borderRight" style="width:73px;">
                            <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full tc borderRight" style="width:73px;left:73px;">
                            <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full tc right0" style="width:73px;">
                            <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:90px;left:430px;">
                        <divModel v-model="item.rows[4]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc borderRight" style="width:100px;left:520px;">
                        <divModel v-model="item.rows[5]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="___absolute Full tc right0" style="width:90px;">
                        <divModel v-model="item.rows[6]" style="width:100%;text-align: center;"
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
