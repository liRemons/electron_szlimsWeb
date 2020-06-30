<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <div style="text-align: center;">
                <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;" v-html="title()"></div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                    标准要求
                </div>
                <div style="border: 1px solid black; border-top: none; min-height: 30px;" v-html="getDetailContent()"></div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;" class="tl">
                    检测及计算方法
                </div>
                <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px; min-height: 22px;" v-html="getDetailContent2()"></div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测结果
                </div>
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td rowspan="2">预设值/ms</td>
                    <td colspan="3">曝光时间测量值/ms</td>
                    <td rowspan="2">平均值/ms</td>
                    <td rowspan="2">偏差/ms</td>
                    <td rowspan="2">相对偏差/%</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                </tr>
                <tr v-for="item in data.valueData.point">
                    <td v-if="!item.disabled">
                        <myInput v-model="item.v1" :reg="'[^0-9./]'" @change.native="(el) => {checkValue(el, item)}"></myInput>
                    </td>
                    <td v-if="!item.disabled">
                        <myInput v-model="item.v2" :reg="'[^0-9./]'"></myInput>
                    </td>
                    <td v-if="!item.disabled">
                        <myInput v-model="item.v3" :reg="'[^0-9./]'"></myInput>
                    </td>
                    <td v-if="!item.disabled">
                        <myInput v-model="item.v4" :reg="'[^0-9./]'"></myInput>
                    </td>
                    <td v-if="!item.disabled">{{item.v5}}</td>
                    <td v-if="!item.disabled">{{item.v6}}</td>
                    <td v-if="!item.disabled">{{item.v7}}</td>

                    <td  v-if="item.disabled">/</td>
                    <td  v-if="item.disabled">/</td>
                    <td  v-if="item.disabled">/</td>
                    <td  v-if="item.disabled">/</td>
                    <td  v-if="item.disabled">/</td>
                    <td  v-if="item.disabled">/</td>
                    <td  v-if="item.disabled">/</td>

                </tr>
            </table>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none; text-align: center;">
                备注
            </div>
            <div style="border: 1px solid black;border-top: none;">
                <myInput v-model="data.valueData.note" style="text-align: center;"></myInput>
            </div>
            <div class="___absolute myBtn" style="left: 750px; top: 0px; text-align: center; width: 65px;" @click="sure" v-if="target === '0'">
                完成
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_dr_bgsjzsdpl",
        props: ['data', 'jsonString', 'target'],
        computed: {
            mode(){
                return this.jsonString.find(item => item.to === 'project_jcxcxx').data.valueData.point.map(item => item.exposureMode);
            }
        },
        watch: {
            mode(){
                this.setDisable();
            },
            "data.valueData.point": {
                deep: true,
                handler: function (val) {
                    try {
                        this.setAvg(val);
                        this.setDiff(val);
                        this.setRelativeDiff(val);
                    } catch (e) {

                    }
                }
            },
        },
        methods: {
            getDetailContent(){
                let arr1 = ["DR摄影","CR摄影", "屏片摄影", "点片摄影"];
                let arr2 = ["口内牙片机"];
                let arr3 = ["全景扫描", "头颅摄影"];
                let arr4 = ["乳腺屏片"];
                if(this.computeObj.intersect(this.mode, arr1).length > 0){
                    return "验收&稳定性：±10.0%内@t≥100ms；±2ms或±15.0%内@t＜100ms。"
                } else if(this.computeObj.intersect(this.mode, arr2).length > 0){
                    return "验收&状态&稳定性：±5%内或±20ms取较大者@口内机；"
                } else if(this.computeObj.intersect(this.mode, arr3).length > 0){
                    return "验收&状态&稳定性：±（5%+50ms）内@口外机。"
                } else if(this.computeObj.intersect(this.mode, arr4).length > 0){
                    return "验收：±10%内@＞200ms，±15%内@≤200ms。 "
                } else {
                    return ""
                }
            },
            checkValue(el, item){
                let value = Number(el.target.value);
                if(item.futureValueUnit === "≥" && value < item.futureValue){
                    this.$notify({
                        type:'warning',
                        message:'预设值应≥'+ item.futureValue +'ms'
                    });
                    el.target.style.color = 'red';
                } else if(item.futureValueUnit === "<" && value >= item.futureValue){
                    this.$notify({
                        type:'warning',
                        message:'预设值应<'+ item.futureValue +'ms'
                    });
                    el.target.style.color = 'red';
                } else if(item.futureValueUnit === ">" && value <= item.futureValue){
                    this.$notify({
                        type:'warning',
                        message:'预设值应>'+ item.futureValue +'ms'
                    });
                    el.target.style.color = 'red';
                } else if(item.futureValueUnit === "≤" && value > item.futureValue){
                    this.$notify({
                        type:'warning',
                        message:'预设值应≤'+ item.futureValue +'ms'
                    });
                    el.target.style.color = 'red';
                } else {
                    el.target.style.color = '';
                }
            },
            getDetailContent2(){
                let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
                let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];
                let arr3 = ["乳腺屏片"];

                if(this.computeObj.intersect(this.mode, arr1).length > 0){
                    return "重点测量临床常用时间档进行检测，选择100ms以下测量1档，100ms及以上测量1档。偏差=曝光时间测量值-曝光时间预设值；相对偏差=（偏差/曝光时间预设值）×100%。 "
                } else if(this.computeObj.intersect(this.mode, arr2).length > 0){
                    return "以设备常用成人曝光条件进行检测。偏差=曝光时间测量值-曝光时间预设值；相对偏差=（偏差/曝光时间预设值）×100%。 "
                } else if(this.computeObj.intersect(this.mode, arr3).length > 0){
                    return "选择常用的曝光时间设置值，选择200ms以上测量1档，200ms及以下测量1档，读取曝光时间测量值。偏差=曝光时间测量值-曝光时间预设值；相对偏差=（偏差/曝光时间预设值）×100%。 "
                } else {
                    return ""
                }
            },
            setDisable(){
                let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
                let arr2 = ["乳腺屏片"];
                let arr3 = ["口内牙片摄影"];
                let arr4 = ["全景扫描", "头颅摄影"];
                let arr5 = ["口腔三维扫描"];

                if(this.computeObj.intersect(this.mode, arr1).length > 0){
                    this.data.valueData.point[0].disabled = false;
                    this.data.valueData.point[1].disabled = false;
                    this.data.valueData.point[2].disabled = true;
                    this.data.valueData.point[3].disabled = true;

                    this.data.valueData.point[0].futureValue = 100;
                    this.data.valueData.point[0].futureValueUnit = "≥";
                    this.data.valueData.point[1].futureValue = 100;
                    this.data.valueData.point[1].futureValueUnit = "<";

                }else if( this.computeObj.intersect(this.mode, arr2).length > 0){
                    this.data.valueData.point[0].disabled = false;
                    this.data.valueData.point[1].disabled = false;
                    this.data.valueData.point[2].disabled = true;
                    this.data.valueData.point[3].disabled = true;

                    this.data.valueData.point[0].futureValue = 200;
                    this.data.valueData.point[0].futureValueUnit = ">";
                    this.data.valueData.point[1].futureValue = 200;
                    this.data.valueData.point[1].futureValueUnit = "≤";

                }else if(this.computeObj.intersect(this.mode, arr3).length > 0 || this.computeObj.intersect(this.mode, arr4).length > 0 || this.computeObj.intersect(this.mode, arr5).length > 0){
                    this.data.valueData.point[0].disabled = false;
                    this.data.valueData.point[1].disabled = false;
                    this.data.valueData.point[2].disabled = false;
                    this.data.valueData.point[3].disabled = false;
                }
                this.$forceUpdate();
            },
            title(){
                let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影", "乳腺屏片", "口腔三维扫描"];
                let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影"];

                if(this.computeObj.intersect(this.mode, arr1).length > 0){
                    return "曝光时间指示的偏离"
                } else if(this.computeObj.intersect(this.mode, arr2).length > 0){
                    return "加载时间偏离"
                } else {
                    return "<div style='color: red'>该曝光模式无对应名称</div>";
                }
            },
            setAvg(point){
                point.forEach(item => {
                    item.v5 = (this.computeObj.sum(item.v2, item.v3, item.v4) / 3).toFixed(3);
                })
            },
            setDiff(point){
                point.forEach(item => {
                    item.v6 = (item.v5 - item.v1).toFixed(3);
                })
            },
            setRelativeDiff(point){
                point.forEach(item => {
                    item.v7 = ((item.v6 / item.v1).toFixed(3)) * 100;
                })
            },
            sure(){
                let item = this.data.valueData.point[0];
                if(item.v1 === "" || item.v2 === "" || item.v3 === "" || item.v4 === "" ){
                    this.$notify({
                        type:'error',
                        message: '至少填写一行！'
                    });
                } else {
                    this.$notify({
                        type:'success',
                        message: '已完成'
                    });
                }
            }
        },
        mounted() {
            this.setDisable();
        }
    }
</script>

<style scoped>

</style>
