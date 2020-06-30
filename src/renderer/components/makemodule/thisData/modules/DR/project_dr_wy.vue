<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <div style="text-align: center;">
                <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;">
                    伪影(探测器1)
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                    标准要求
                </div>
                <div style="border: 1px solid black; border-top: none;" class="tl">
                    验收&状态&稳定性：无伪影。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测及计算方法
                </div>
                <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;">
                    有可能的话取出滤线栅，设置SID等于或尽量接近180cm。选用屏/片X射线摄影密着检测板放置于探测器上面，用60kV，约10mAs，进行曝光，目视影像是否存在伪影，如果存在，检查伪影来源。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测结果
                </div>
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td rowspan="3">
                        <div style="white-space: normal;">
                            是否存在伪影
                        </div>
                    </td>
                    <td colspan="4" style="text-align: left; padding-left: 51px;">
                        <el-radio v-model="data.valueData.state"
                                  @click.native.prevent="computeObj.clearRadio('是', data.valueData, 'state')"
                                  label="是"></el-radio>
                        探测器伪影 监视器伪影
                    </td>
                </tr>
                <tr>
                    <td colspan="4" style="text-align: left; padding-left: 51px;">
                        <el-radio v-model="data.valueData.state"
                                  @click.native.prevent="computeObj.clearRadio('否', data.valueData, 'state')"
                                  label="否"></el-radio>
                    </td>
                </tr>
            </table>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none; text-align: center;">
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
        name: "project_dr_wy",
        props: ['data', 'target'],
        methods: {
        }
    }
</script>

<style scoped>

</style>