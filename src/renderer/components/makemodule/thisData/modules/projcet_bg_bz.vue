<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">四、备注</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">依据GBZ 130-2013《医用X射线诊断放射防护要求》和WS 581-2017《牙科X射线设备质量控制检测规范》中的方法和要<br>求，对本次委托的设备进行了质量控制检测。结果表明，该设备所检项目均满足标准要求。
                </p>
            </div>
            <p style="line-height: 16px;margin-top:10px;">五、报告签署</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderRight" style="width:300px;">
                    <div class="___relative borderBottom">
                        <div class="___relative tc borderRight" style="width: 100px;">
                            <span>报告编制</span>
                        </div>
                        <div class="Full right0" style="width: 200px;">
                            <divModel v-model="data.valueData.reportCompilation" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                    </div>
                    <div class="___relative borderBottom">
                        <div class="___relative tc borderRight" style="width: 100px;">
                            <span>报告审核</span>
                        </div>
                        <div class="Full right0" style="width: 200px;">
                            <divModel v-model="data.valueData.reportAudit" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                    </div>
                    <div class="___relative">
                        <div class="___relative tc borderRight" style="width: 100px;">
                            <span>报告签发</span>
                        </div>
                        <div class="Full right0" style="width: 200px;">
                            <divModel v-model="data.valueData.reportIssue" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                    </div>
                </div>
                <div class="Full right0" style="width:410px;">
                    <div style="margin:-32px 0 0 50px;" class="heightCenter2">
                        <p>检验检测专用章</p>
                        <div class="___relative">
                            <span>签发日期:</span>
                            <divModel v-model="data.valueData.year" style="width:40px;text-align: center;left:60px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                            <span style="margin-left:45px;">年</span>
                            <divModel v-model="data.valueData.month" style="width:30px;text-align: center;left:120px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                            <span style="margin-left:40px;">月</span>
                            <divModel v-model="data.valueData.day" style="width:30px;text-align: center;left:175px;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                            <span style="margin-left:40px;">日</span>
                        </div>
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
