<template>
    <div :class="{_normalHeight_:true}" class="___relative" :id="data.valueData.testProjectId">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative">
            <div style="line-height: 32px; border: 1px solid black; height: 32px; width: 710px;" class="mt20 tc">工作量统计</div>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="___relative tc borderRight" style="width: 240px;">
                        <div class="___relative w100">
                            <div class="tc" style="height:32px;">
                                <span>单次最长曝光时间</span>
                            </div>
                        </div>
                    </div>
                    <div class="___absolute Full tc" style="width: 470px;left:240px;">
                        <divModel v-model="data.valueData.valueA"
                                  :isNumBox="true"
                                  @blur="changeNum"
                                  style="width:50px;text-align: center;left:200px; border-bottom: 1px solid black; height: 30px;"
                                  class="Full warp2 rowsInput2 hide focusBg"></divModel>
                        <span class="___absolute" style="right:200px;">ms</span>
                    </div>
                </div>
                <div class="___relative borderBottom">
                    <div class="___relative tc borderRight" style="width: 240px;">
                        <div class="___relative w100">
                            <div class="tc" style="height:32px;">
                                <span>每天最多曝光</span>
                            </div>
                        </div>
                    </div>
                    <div class="___absolute Full tc" style="width: 470px;left:240px;">
                        <divModel v-model="data.valueData.valueB"
                                  :isNumBox="true"
                                  style="width:50px;text-align: center;left:200px; border-bottom: 1px solid black; height: 29px;"
                                  class="Full warp2 rowsInput2 hide focusBg"></divModel>
                        <span class="___absolute" style="right:205px;">次</span>
                    </div>
                </div>
                <div class="___relative borderBottom">
                    <div class="___relative tc borderRight" style="width: 240px;">
                        <div class="___relative w100">
                            <div class="tc" style="height:32px;">
                                <span>每周最长工作</span>
                            </div>
                        </div>
                    </div>
                    <div class="___absolute Full tc" style="width: 470px;left:240px;">
                        <divModel v-model="data.valueData.valueC"
                                  :isNumBox="true"
                                  style="width:50px;text-align: center;left:200px; border-bottom: 1px solid black; height: 30px;"
                                  class="Full warp2 rowsInput2 hide focusBg"></divModel>
                        <span class="___absolute" style="right:205px;">天</span>
                    </div>
                </div>
                <div class="___relative">
                    <div class="___relative tc borderRight" style="width: 240px;">
                        <div class="___relative w100">
                            <div class="tc" style="height:32px;">
                                <span>最长年曝光时间</span>
                            </div>
                        </div>
                    </div>
                    <div class="___absolute Full tc" style="width: 470px;left:240px;">
                        <divModel v-model="data.valueData.valueD"
                                  style="width:50px;text-align: center;left:200px; border-bottom: 1px solid black; height: 30px;"
                                  class="Full warp2 rowsInput2 hide focusBg"
                                  :edit="false"
                                  :is-computer="true"
                                  :computerFormula="'gs10'"
                                  :computers="changeNum(data.valueData.valueA,data.valueData.valueB,data.valueData.valueC)">
                        </divModel>
                        <span class="___absolute" style="right:193px;">h/年</span>
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
        methods: {
            isNumber(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },
            changeNum(valueA, valueB, valueC) {
                if (this.isNumber(valueA) && this.isNumber(valueB) && this.isNumber(valueC)) {
                    this.data.valueData.valueD = ((valueA * valueB * valueC * 50) / 3600 / 1000).toFixed(2);
                    this.$store.dispatch("actionsTimeExposure", this.data.valueData.valueD);
                }
            },
        },
        computed: {
            ...mapState({
                JudgePhotography: state => state.StomatologyLinkage.JudgePhotography,
            })
        },
        watch:{
            JudgePhotography(val){
                let gzltjs = this.jsonString.filter(item => item.to === 'projcet_gzltj');
                if(val){
                    gzltjs.forEach(item => {
                        item.data.height._normal.carried = true;
                    });
                } else {
                    gzltjs.forEach(item => {
                        item.data.height._normal.carried = false;
                    });
                }
                this.$forceUpdate();
                this.$emit('redefinition');
            }
        },
        mounted() {
        }
    };
</script>

<style>
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
