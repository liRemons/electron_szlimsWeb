<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">4.7 自动亮度控制</p>
            <p style="line-height: 16px;">4.7.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：平均值±10%；状态：平均值±15%；稳定性：基线值±30%内。</p>
            </div>
            <p style="line-height: 16px;">4.7.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height:16px;">
                <p class="ml5">将一块厚20mm的铝板访在诊断床上，照射野调节到略小于铝板，在自动亮度控制条件下，用亮度计测量监视器的荧屏亮度<br>并记录。增加一块1.5mm铜板，在不改变其它条件的情况下，再次测量监视器的荧屏亮度并记录。改变照射野尺寸至约原来<br>的一半，重复上述检测过程。如果该系统只通过改变管电压自动调节亮度，则应检测低电流（如1mA）和高电流（如4mA）<br>两种情况下进行检测，如果该系统是通过改变管电流自动调节亮度，则检测80kV时的电流补偿情况。
                </p>
                <p class="ml5">亮度变化率计算公式:<img src="../../../../assets/img/formula_4.png" height="32" width="220"/></p>
            </div>
            <p style="line-height: 16px;">4.7.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="Full borderRight" style="width:180px;">
                        <div class="___relative" style="height:50px;">
                            <span class="heightCenter3" style="text-align: right;margin-right: 20px;">测量值</span>
                        </div>
                        <div class="___relative" style="height:50px;">
                            <span class="heightCenter3" style="margin-left: 20px;">检测条件</span>
                        </div>
                        <div class="obliqueLine"></div>
                    </div>
                    <div class="___relative" style="width:530px;left:180px;">
                        <div class="___relative borderBottom">
                            <div class="Full borderRight" style="width:178px;">
                                <div class="heightCenter3 ml5" style="line-height: 16px;">
                                    <p>
                                        <el-radio v-model="data.valueData.change" :label="1">只改变kV</el-radio>
                                    </p>
                                    <p>
                                        <el-radio v-model="data.valueData.change" :label="2">同时改变kV和mA</el-radio>
                                    </p>
                                </div>
                            </div>
                            <div class="___relative" style="width: 352px;left:178px;">
                                <div class="___relative tc borderBottom">
                                    <el-checkbox v-model="data.valueData.kV">只改变kV</el-checkbox>
                                </div>
                                <div class="___relative">
                                    <div class="___relative tc borderRight" style="width:176px;">
                                        <span>低管电流</span>
                                    </div>
                                    <div class="___absolute tc t0 right0" style="width:176px;">
                                        <span>高管电流</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="___relative">
                            <div class="___relative tc borderRight" style="width:89px;">
                                <span>b小照射野</span>
                            </div>
                            <div class="___absolute tc t0 borderRight" style="width:89px;left:89px;">
                                <span>b大照射野</span>
                            </div>
                            <div class="___absolute tc t0 borderRight" style="width:89px;left:177px;">
                                <span>b小照射野</span>
                            </div>
                            <div class="___absolute tc t0 borderRight" style="width:89px;left:265px;">
                                <span>b大照射野</span>
                            </div>
                            <div class="___absolute tc t0 borderRight" style="width:89px;left:353px;">
                                <span>b小照射野</span>
                            </div>
                            <div class="___absolute tc t0 right0" style="width:89px;">
                                <span>b大照射野</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="___relative" :class="index!=data.valueData.point.length-1 ? 'borderBottom':''"
                     v-for="(item,index) in data.valueData.point">
                    <div class="___relative tc borderRight" style="width: 180px;height:32px;">
                        <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 tc borderRight" style="width: 89px;left:180px;">
                        <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 tc borderRight" style="width: 89px;left:269px;">
                        <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 tc borderRight" style="width: 89px;left:357px;">
                        <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 tc borderRight" style="width: 89px;left:445px;">
                        <divModel v-model="item.rows[4]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 tc borderRight" style="width: 89px;left:533px;">
                        <divModel v-model="item.rows[5]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 tc right0" style="width: 89px;">
                        <divModel v-model="item.rows[6]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="__functionBox" v-if="index!=data.valueData.point.length-1&&ipdTemplate=='ipdTemplate'"
                         style="top:6px;right:-70px;width: 20px;z-index:100">
                        <div class="__functionButton6" @dblclick="reduce(index)" style="right:0;">
                            <span>-</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="__functionBox" style="right:-125px;width: 80px;" v-if="ipdTemplate=='ipdTemplate'">
                <!-- ******** 功能模块 ********** -->
                <div class="__functionButton6" @dblclick="reduce(data.valueData.point.length-1)" style="right:55px;">
                    <span>-</span>
                </div>
                <div class="__functionButton6" @click="increase">
                    <span>+</span>
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
        methods: {
            reduce(index) {
                if (this.data.valueData.point.length > 1) {
                    this.data.valueData.point.splice(index, 1);
                    this.$emit('redefinition');
                }
            },
            increase() {
                let obj = {
                    rows: ['', '', '', '', '', '', '']
                };
                let nameArr = [];
                this.jsonString.forEach((item, index) => {
                    nameArr.push(item.data.name)
                });
                let index = nameArr.reverse().findIndex((item, index) => item === 'projcet_zdldkz');
                this.jsonString[(this.jsonString.length - 1) - index].data.valueData.point.push(obj);
                this.$emit('redefinition');
            },
        },
        mounted() {
        }
    };
</script>

<style lang="less">
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
