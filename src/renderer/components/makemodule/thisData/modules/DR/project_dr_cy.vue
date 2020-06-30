<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <div style="text-align: center;">
                <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;">
                    残影（探测器1）
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                    标准要求
                </div>
                <div style="border: 1px solid black; border-top: none;" class="tl">
                    验收&稳定性：不存在残影或有残影而像素值误差≤5.0%。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测及计算方法
                </div>
                <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;">
                    有可能的话取出滤线栅，设置SID等于或尽量接近180cm。第一次曝光，关闭遮线器，用面积15cm×15cm，厚2mm铅板覆盖出线口，设置最低管电压最低管电流积或最低管电流后，手动曝光并获取一幅空白影像；第二次曝光，打开遮线器，取走铅板，在探测器表面中央部位放置一块面积4cm×4cm，厚4mm铅板，70kV，无滤过，入射空气比释动能选取5μGy，实际检测条件参考曝光参数选择；1.5分钟内进行第三次曝光，条件同第一次曝光，观察第三次曝光后的空白影像中不应存在第二次曝光影像中的残影，如果存在残影，应分别测量残影区和非残影区相同ROI面积的平均像素值，并比较。计算公式：误差=(残影区平均像素值-非残影区平均像素值)/非残影区平均像素值×100%。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测结果
                </div>
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td rowspan="3">
                        <div style="white-space: normal;">
                            第三次曝光后的空白影像中是否存在第二次曝光影像中的残影
                        </div>
                    </td>
                    <td rowspan="2">
                        <el-radio v-model="data.valueData.state"
                                  @click.native.prevent="computeObj.clearRadio('是', data.valueData, 'state')"
                                  @change="clearData" label="是"></el-radio>
                    </td>
                    <td>
                        残影区平均像素值
                    </td>
                    <td>
                        非残影区平均像素值
                    </td>
                    <td>
                        误差/%
                    </td>
                </tr>
                <tr>
                    <td>
                        <myInput v-if="data.valueData.state === '是'" v-model="data.valueData.arr.v1" @change.native="gs1"></myInput>
                        <span v-else>/</span>
                    </td>
                    <td>
                        <myInput  v-if="data.valueData.state === '是'" v-model="data.valueData.arr.v2" @change.native="gs1"></myInput>
                        <span v-else>/</span>
                    </td>
                    <td>
                        <div v-if="data.valueData.state === '是'">
                            {{data.valueData.arr.v3}}
                        </div>
                        <span v-else>/</span>
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: left; padding-left: 51px;">
                        <el-radio v-model="data.valueData.state"
                                  @click.native.prevent="computeObj.clearRadio('否', data.valueData, 'state')"
                                  label="否" @change="clearData"></el-radio>
                    </td>
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
        name: "project_dr_cy",
        props: ['data', 'jsonString', 'target'],
        methods: {
            clearData(){
                this.data.valueData.arr = {v1: "", v2:"", v3: ""};
            },
            gs1(){
                let A = this.data.valueData.arr.v1;
                let B = this.data.valueData.arr.v2;
                let C = (((A - B) * 100) / B).toFixed(2);
                this.data.valueData.arr.v3 = C;
            },
            sure(){
                if(this.data.valueData.state === ""){
                    this.$notify({
                        type:'warning',
                        message: '是和否必须二选一！'
                    })
                } else {
                    this.$notify({
                        type:'success',
                        message: '已完成'
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>