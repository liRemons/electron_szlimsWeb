<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <div style="text-align: center;">
                <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;">
                    测距误差（{{data.valueData.title}}）
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;" >
                    标准要求
                </div>
                <div class="tl" style="border: 1px solid black; border-top: none;">
                    验收&状态：±2.0%内。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测及计算方法
                </div>
                <div class="tl" style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;">
                    有可能的话取出滤线栅，设置SID等于或尽量接近180cm，选用两个相互垂直的铅尺放置于探测器表面中央，用50kV，10mAs，进行曝光，用测距软件测量不低于10cm的影像距离，如果铅尺不能放置在探测器表面，应将铅尺放置在患者床面中央，获得影像应做距离修正，距离修正公式：修正后测量距离=测量距离×焦点至铅尺距离/SID。计算公式：E=[(Dm-D0)/D0]×100%。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测结果
                </div>
                <table class="myTable">
                    <tr class="delLine">
                        <td style="width: 50px;">方向</td>
                        <td>真实距离D<sub>0</sub>/cm</td>
                        <td>测量距离D<sub>m</sub>/cm</td>
                        <td style="width: 185px;">
                            <el-checkbox v-model="data.valueData.checkValue1" @change="control(2, 4)">距离修正</el-checkbox>
                        </td>
                        <td style="width: 165px;">
                            <el-checkbox v-model="data.valueData.checkValue1">修正后测量距离/cm</el-checkbox>
                        </td>
                        <td style="width: 90px;">偏差E/%</td>
                    </tr>
                    <tr v-for="(item, index) in data.valueData.point">
                        <td>{{item.v1}}</td>
                        <td>
                            <myInput v-model="item.v2"  @change.native="control(2, 4)" :reg="'[^0-9/]'"></myInput>
                        </td>
                        <td>
                            <myInput v-model="item.v3" @change.native="control(1, 2, 3, 4)" :reg="'[^0-9/]'"></myInput>
                        </td>
                        <td v-if="index === 0" rowspan="2" style="height: 80px; padding: 5px; text-align: left; padding-left: 10px;">
                            <p>SID= <myInput style="width: 50px; border-bottom: 1px solid black;" @change.native="control(1, 2, 3)" v-model="item.v4"></myInput>cm</p>
                            <p>焦点至铅尺距离=<myInput v-model="item.v5" @change.native="control(1, 2, 3)" style="width: 50px; border-bottom: 1px solid black"></myInput>cm</p>
                        </td>
                        <td v-if="index === 0">{{item.v6}}</td>
                        <td v-else>{{item.v4}}</td>

                        <td v-if="index === 0">{{item.v7}}</td>
                        <td v-else>{{item.v5}}</td>
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
    </div>
</template>

<script>
    export default {
        name: "project_dr_cjwc",
        props: ['data', 'jsonString', 'target'],
        methods: {
            control(){
                let arr = [...arguments];
                arr.forEach(flag => {
                    if(flag === 1){
                        this.setValue();
                    }
                    if(flag === 2){
                        if(this.data.valueData.checkValue1){
                            this.setValue3();
                        } else {
                            this.setValue2();
                        }
                    }
                    if(flag === 3){
                        this.setValue4();
                    }

                    if(flag === 4){
                        if(this.data.valueData.checkValue1){
                            this.setValue6();
                        } else {
                            this.setValue5();
                        }
                    }
                });

                this.$forceUpdate();
            },
            setValue(){
                let B1 = this.data.valueData.point[0].v3;
                let D = this.data.valueData.point[0].v5;
                let C = this.data.valueData.point[0].v4;
                let E = (B1 * D) / C;
                this.data.valueData.point[0].v6 = E.toFixed(2);
            },
            setValue2(){
                let B1 = this.data.valueData.point[0].v3;
                let A1 = this.data.valueData.point[0].v2;
                let G1 = ((B1 - A1) * 100) / A1;
                this.data.valueData.point[0].v7 = G1.toFixed(2);
            },
            setValue3(){
                let E = this.data.valueData.point[0].v6;
                let A2 = this.data.valueData.point[1].v2;
                let G1 = ((E - A2) * 100) / A2;
                this.data.valueData.point[0].v7 = G1.toFixed(2);
            },

            setValue4(){
                let B2 = this.data.valueData.point[1].v3;
                let D = this.data.valueData.point[0].v5;
                let C = this.data.valueData.point[0].v4;
                let F = ((B2 * D) / C).toFixed(2);
                this.data.valueData.point[1].v4 = F;

                if(this.data.valueData.checkValue1){
                    this.setValue6();
                } else {
                    this.setValue5();
                }
            },

            setValue5(){
                let B2 = this.data.valueData.point[1].v3;
                let A2 = this.data.valueData.point[1].v2;
                let G2 = (((B2 - A2) * 100) / A2).toFixed(2);
                this.data.valueData.point[1].v5 = G2;
            },
            setValue6(){
                let F = this.data.valueData.point[1].v4;
                let A2 = this.data.valueData.point[1].v2;
                let G2 = (((F - A2) * 100) / A2).toFixed(2);
                this.data.valueData.point[1].v5 = G2;
            }

        }
    }
</script>

<style scoped>

</style>