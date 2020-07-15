<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div style="text-align: center;">
            <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;">
                响应均匀性（{{data.valueData.title}}）
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                标准要求
            </div>
            <div style="border: 1px solid black; border-top: none;" class="tl">
                验收&状态&稳定性：CV≤5.0%。
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测及计算方法
            </div>
            <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;">
                选取探测器剂量指示（DDI）项目中10μGy的预处理图像，选取中心和四个像限中央各一个面积约4cm×4cmROI，分别获取像素值Vi，计算变异系数。变异系数计算公式为： CV=1/V ̅  √(∑▒(V_i-V ̅ )^2⁄((5-1) ))×100%。
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测结果
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td>位置</td>
                    <td>中心</td>
                    <td>Ⅰ</td>
                    <td>Ⅱ</td>
                    <td>Ⅲ</td>
                    <td>Ⅳ</td>
                    <td rowspan="2" style="width: 150px;">
                        CV=
                        <span style="border-bottom: 1px solid black;">{{data.valueData.cvValue}}</span>
                        %
                    </td>
                </tr>
                <tr>
                    <td>
                        <myInput v-model="data.valueData.xiangsuVal"></myInput>
                    </td>
                    <td>
                        <myInput v-model="data.valueData.arr1[0]" :reg="'[^0-9./]'"></myInput>
                    </td>
                    <td>
                        <myInput v-model="data.valueData.arr1[1]" :reg="'[^0-9./]'"></myInput>
                    </td>
                    <td>
                        <myInput v-model="data.valueData.arr1[2]" :reg="'[^0-9./]'"></myInput>
                    </td>
                    <td>
                        <myInput v-model="data.valueData.arr1[3]" :reg="'[^0-9./]'"></myInput>
                    </td>
                    <td>
                        <myInput v-model="data.valueData.arr1[4]" :reg="'[^0-9./]'"></myInput>
                    </td>
                </tr>
            </table>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                备注
            </div>
            <div style="border: 1px solid black;border-top: none;">
                <myInput v-model="data.valueData.note" style="text-align: center;"></myInput>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_dr_xyjyx",
        props: ['data', 'target'],
        watch: {
            'data.valueData.arr1': {
                deep: true,
                handler(arr){
                    let v1 = Number(this.data.valueData.xiangsuVal);
                    let v2 = this.computeObj.sum(...arr) / 5;
                    let val1 = 1 / v2;
                    let val2 = ((v1 - v2) * (v1 - v2)) / (5 - 1);
                    let val3 = val1 * val2 * 100;
                    this.data.valueData.cvValue = val3.toFixed(2);
                }
            }
        }
    }
</script>

<style scoped>

</style>
