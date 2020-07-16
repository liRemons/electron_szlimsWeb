<template>
    <div style="text-align: center;line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 10px;">
                有用线束垂直度偏离
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                标准要求
            </div>
            <div style="border: 1px solid black; border-top: none; line-height: 20px;" class="tl">验收&状态&稳定性：≤3°。</div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测及计算方法
            </div>
            <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;" class="tl">
                将检测板放置于影像接收器上，使检测板中心与光野中心重合，检测筒放在检测板上，检测筒的圆心与检测板的中心重合，调节焦片距为100cm或常用焦片距，设置加载条件：60kV，3mAs左右，曝光后观察检测筒上表面中心钢珠的影像落在检测板中大圆影像内，则记录检测结果为＜3°。
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测结果
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td style="width: 200px; text-align: right; padding-right: 4px; height: 35px;">
                        <redStar></redStar>焦片距=
                        <myInput v-model="data.valueData.distance" style="width: 55px; border-bottom: 1px solid black; height: 20px;" :reg="'[^0-9./]'"></myInput>
                        cm,钢珠影像落在
                    </td>
                    <td style="width: 250px;">
                        <el-radio label="大圆内"
                                  style="width: 50px;"
                                  @click.native.prevent="computeObj.clearRadio('大圆内', data.valueData, 'circleResult')"
                                  v-model="data.valueData.circleResult"></el-radio>
                        <el-radio label="大圆外"
                                  style="width: 50px;"
                                  @click.native.prevent="computeObj.clearRadio('大圆外', data.valueData, 'circleResult')"
                                  v-model="data.valueData.circleResult"></el-radio>
                        <el-radio label="大圆上"
                                  @click.native.prevent="computeObj.clearRadio('大圆上', data.valueData, 'circleResult')"
                                  v-model="data.valueData.circleResult"></el-radio>
                    </td>
                    <td style="width: 150px;">检测结果：<span style="border-bottom: 1px solid black; padding-left: 10px;padding-right: 10px;">{{data.valueData.result}}</span> 3°</td>
                </tr>
            </table>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
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
        name: "project_dr_yyxsczdpl",
        props: ['data', 'target'],
        watch: {
            "data.valueData.circleResult": function (value) {
                if(value === "大圆内"){
                    this.data.valueData.result = "<";
                } else if(value === "大圆外"){
                    this.data.valueData.result = ">";
                } else {
                    this.data.valueData.result = "=";
                }
                }
        },
        methods: {
            sure(){
                let myMustWrite = ['distance'];
                this.computeObj.checkMustWrite(this.data.valueData, myMustWrite, '已完成', '有必填字段未填写！');
            }
        }
    }
</script>

<style scoped>

</style>
