<template>
    <div :class="{_normalHeight_:true}" class="___relative">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;margin-top:10px;">4.4 空间分辨力/lp/mm</p>
            <p style="line-height: 16px;">4.4.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px">
                <p class="ml5 tl">验收：≥0.8@透视荧光屏设备，影像增强器透视设备：≥0.8@350mm(15in)，≥1.0@310mm(12in)，≥1.2@230mm(9in)，<br>≥1.4@150mm(6in)；状态：≥0.6；稳定性：基线值±20%内。</p>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.4.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">对普通荧光屏透视设备，将测试卡紧贴在荧光屏的入射面，以适当条件（如70kV，3mA）进行透视，从荧光屏上观察并记<br>录下能分辨的最大线对数。对于非普通荧光屏透视设备，检测量应将线对卡紧贴在影像接收器的入射屏或放在诊断床上，使<br>显示器中的测试卡的线条影像与扫描线的方向成45°夹角，以自动曝光控制条件或临床常用透视条件进行透视，如果出现影<br>像饱和现象（影像全白），可以在线对卡上放一块20mm厚铝板。从显示器上观察并记下能分辨的最大线对数。
                </p>
            </div>
            <p style="line-height: 16px;margin-top:10px;">4.4.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <div class="___relative borderBottom">
                    <div class="___relative tc borderRight" style="width: 33.3333%;">
                        <span>照射野尺寸</span>
                    </div>
                    <div class="___absolute t0 tc borderRight" style="width: 33.3333%;left:33.3333%">
                        <span>照射野尺寸</span>
                    </div>
                    <div class="___absolute t0 tc right0" style="width: 33.3333%;">
                        <span>检测值/lp/mm </span>
                    </div>
                </div>
                <div class="___relative" :class="index!=data.valueData.point.length-1 ? 'borderBottom':''"
                     v-for="(item,index) in data.valueData.point">
                    <div class="___relative tc borderRight" style="width: 33.3333%;height:32px;">
                        <divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 borderRight" style="width: 33.3333%;left:33.3333%">
                        <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                  class="Full heightCenter3 hide focusBg"></divModel>
                    </div>
                    <div class="Full t0 right0" style="width: 33.3333%;">
                        <divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
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
                    rows:['','','']
                };
                let nameArr = [];
                this.jsonString.forEach((item, index) => {
                    nameArr.push(item.data.name)
                });
                let index = nameArr.reverse().findIndex((item, index) => item === 'projcet_kjfbl');
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
