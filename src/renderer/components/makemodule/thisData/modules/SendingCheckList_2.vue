<template>
    <div class="page" style="margin:0 auto;padding-top:1px;">
        <div class="___head_titleBox" style="margin-top:20px;">
            深圳市瑞达检测技术有限公司
            <br>样品送检单（2）
        </div>
        <div class="SendingCheckList">
            <div style="margin-top:10px;height:16px;">
                <span class="fl">送检部门：</span>
                <span class="fr">送样日期: 年 月 日</span>
            </div>
            <div class="head_1_tableBox _normalHeight_ ___relative" style="margin-top:10px;">
                <div class="___relative borderBottom">
                    <div class="borderRight tc" style="width: 100px;">
                        <span>样品编号</span>
                    </div>
                    <div class="borderRight tc Full" style="width: 105px;left:100px;line-height:16px;">
                        样品名称
                        <br>/检测领域
                    </div>
                    <div class="borderRight tc Full" style="width: 180px;left:205px;">
                        <span>样品载体</span>
                    </div>
                    <div class="borderRight tc Full" style="width: 130px;left:385px;">
                        <span>检测项目</span>
                    </div>
                    <div class="borderRight tc Full" style="width: 110px;left:515px;line-height: 16px;">
                        采样
                        <br>体积
                    </div>
                    <div class="borderRight tc Full" style="width: 205px;left:625px;line-height: 16px;">
                        <div class="___relative borderBottom">
                            <span>采样条件</span>
                        </div>
                        <div class="___relative">
                            <div class="borderRight" style="width: 50%">
                                <span>温度(℃)</span>
                            </div>
                            <div class="Full" style="width: 50%;right:0;">
                                <span>气压(kpa)</span>
                            </div>
                        </div>
                    </div>
                    <div class="tc Full borderRight" style="width: 160px;left:830px;">
                        <span>检测依据</span>
                    </div>
                    <div class="tc Full" style="width: 120px;right:0;">
                        <span>备注</span>
                    </div>
                </div>
                <div
                        v-for="(item,index) in samplearr"
                        :class="index!=samplearr.length-1 ? 'borderBottom':''"
                        class="___relative"
                >
                    <div class="borderRight tc" style="width: 100px;">
                        <span>{{item.sampleNum}}</span>&nbsp;
                    </div>
                    <div class="borderRight tc Full" style="width: 105px;left:100px;">
                        <span>{{item.sampleName}}</span>
                    </div>
                    <div class="borderRight tc Full" style="width: 180px;left:205px;">
                        <span>{{item.sampleCarrier}}</span>
                    </div>
                    <div class="borderRight tc Full" style="width: 130px;left:385px;">
                        <span></span>
                    </div>
                    <div class="borderRight tc Full" style="width: 110px;left:515px;">
                        <span></span>
                    </div>
                    <div class="borderRight tc Full" style="width: 205px;left:625px;">
                        <span></span>
                    </div>
                    <div class="tc Full borderRight" style="width: 160px;left:830px;">
                        <span></span>
                    </div>
                    <div class="tc Full" style="width: 120px;right:0;">
                        <span>{{item.remarks}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            samplearr: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        data() {
            return {
                list: []
            };
        },

        filters: {},
        methods: {},
        components: {},
        mounted() {
        }
    };
</script>

<style lang="less" scoped>
    @import "../../../../assets/css/Css.css";
</style>
