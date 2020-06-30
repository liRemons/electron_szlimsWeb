<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div style="text-align: center;">
            <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 10px;">
                光野与照射野四边的偏离/cm
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                标准要求
            </div>
            <div style="border: 1px solid black; border-top: none;" class="tl">
                验收&状态&稳定性：任一边±1.0cm内。
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测及计算方法
            </div>
            <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;">
                将检测板放置于影像接收器上，使检测板中心与光野中心重合检测筒放在检测板上，检测筒的圆心与检测板的中心重合，调节焦片距为100cm或常用焦片距（并记录下来），调节光野左边和上边分别与检测板长方框左边和上边对齐，记录光野右边和下边与长方框右边和下边的的距离，如果光野边在长方框外面则记录光野边与长方框边距离为a（在框内记为负，载框外记为正），曝光后记录影像四边与检测板长方框四边的距离，如果影像边在长方框外面则记录影像边与长方框边距离为b（在框内记为负，载框外记为正），则光野偏离为b-a，如果焦片距不能调节至100cm则检测结果需要进行距离修正，修正公式：光野偏离为（b-a）×100/焦皮距。
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测结果
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td style="width:180px; padding: 5px;">焦皮距
                        <myInput
                                style="width: 50px; border-bottom: 1px solid black;"
                                v-model="data.valueData.distance"
                                :reg="'[^0-9/]'"
                                @change.native="update">
                        </myInput>
                        cm
                    </td>
                    <td>左边/cm</td>
                    <td>右边/cm</td>
                    <td>上边/cm</td>
                    <td>下边/cm</td>
                </tr>
                <tr v-for="item in data.valueData.point">
                    <td>{{item.rows[0]}}</td>
                    <td>
                        <myInput v-model="item.rows[1]" :reg="'[^0-9/]'" @change.native="setValue(0)"></myInput>
                    </td>
                    <td>
                        <myInput v-model="item.rows[2]" :reg="'[^0-9/]'" @change.native="setValue(1)"></myInput>
                    </td>
                    <td>
                        <myInput v-model="item.rows[3]" :reg="'[^0-9/]'" @change.native="setValue(2)"></myInput>
                    </td>
                    <td>
                        <myInput v-model="item.rows[4]" :reg="'[^0-9/]'" @change.native="setValue(3)"></myInput>
                    </td>
                </tr>
                <tr>
                    <td>光野偏离</td>
                    <td>{{data.valueData.arr1[0]}}</td>
                    <td>{{data.valueData.arr1[1]}}</td>
                    <td>{{data.valueData.arr1[2]}}</td>
                    <td>{{data.valueData.arr1[3]}}</td>
                </tr>
                <tr>
                    <td>经过距离修正后的光野偏离</td>
                    <td>{{data.valueData.arr2[0]}}</td>
                    <td>{{data.valueData.arr2[1]}}</td>
                    <td>{{data.valueData.arr2[2]}}</td>
                    <td>{{data.valueData.arr2[3]}}</td>
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
        name: "project_dr_gyyzssbdpl",
        props: ['data', 'target'],
        methods: {
            setValue(flag){
                let value = Number(this.data.valueData.point[0].rows[flag + 1]);
                let value2 = Number(this.data.valueData.point[1].rows[flag + 1]);
                this.data.valueData.arr1[flag] = value2 - value;
                try {
                    let value3 = ((value2 - value) * (100 / this.data.valueData.distance)).toFixed(2);
                    this.data.valueData.arr2[flag] = value3;
                } catch (e) {
                    this.data.valueData.arr2[flag] = "";
                }
                this.$forceUpdate();
            },
            update(){
                this.setValue(0);
                this.setValue(1);
                this.setValue(2);
                this.setValue(3);
            }
        }
    }
</script>

<style scoped>

</style>