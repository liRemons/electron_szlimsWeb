<template>
    <div style="padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <table class="myTable">
                <tr>
                    <td style="font-weight: bolder">探测器数量：</td>
                    <td style="line-height: 32px;">
                        <selectModel @returnVal="returnVal"
                                     :Judge="true"
                                     :special="1"
                                     :multi-select="false"
                                     :receive="'NumberOfDetectors'"
                                     :transmitText="data.valueData.NumberOfDetectors"
                                     :single="true"
                                     :rows="false"
                                     :list="['1', '2']"
                                     :Obj="''">
                        </selectModel>
                    </td>
                    <td style="font-weight: bolder">探测器1编号</td>
                    <td>
                        <myInput v-model="data.valueData.tcqNum1" v-if="data.valueData.NumberOfDetectors === '1'"></myInput>
                        <div v-else>/</div>
                    </td>
                    <td style="font-weight: bolder">探测器2编号</td>
                    <td>
                        <myInput v-model="data.valueData.tcqNum2" v-if="data.valueData.NumberOfDetectors === '2'"></myInput>
                        <div v-else>/</div>
                    </td>
                </tr>
                <tr>
                    <td style="font-weight: bolder">
                        AEC电离室数量：
                    </td>
                    <td style="line-height: 32px;">
                        <selectModel @returnVal="returnVal"
                                     :Judge="true"
                                     :special="1"
                                     :multi-select="false"
                                     :receive="'AECNum'"
                                     :transmitText="data.valueData.AECNum"
                                     :single="true"
                                     :rows="false"
                                     :list="['0', '1', '2']"
                                     :Obj="''">
                        </selectModel>
                    </td>
                    <td colspan="4"></td>
                </tr>
            </table>
            <div>
                <table class="myTable">
                    <tr class="delLine" style="text-align: left;">
                        <td style="padding-left: 10px; font-weight: bolder; border-right: none; width: 100px;">曝光参数选择（探测器{{data.valueData.NumberOfDetectors}}）</td>
                        <td style="border-right: none; border-left: none; width: 100px;"></td>
                        <td style="border-left: none;"></td>
                    </tr>
                    <tr>
                        <td>是否取出滤线栅</td>
                        <td colspan="2" style="text-align: left; padding-left: 20px;">
                            <el-radio label="是"
                                      @click.native.prevent="computeObj.clearRadio('是', data.valueData, 'isPole')"
                                      v-model="data.valueData.isPole"></el-radio>
                            <el-radio label="否"
                                      @click.native.prevent="computeObj.clearRadio('否', data.valueData, 'isPole')"
                                      v-model="data.valueData.isPole"></el-radio>
                        </td>
                    </tr>
                    <tr>
                        <td>器官曝光程序</td>
                        <td colspan="2" style="padding-left: 10px;">
                            <myInput v-model="data.valueData.cxbgcx" style="text-align: left;"></myInput>
                        </td>
                    </tr>
                </table>
                <table class="myTable">
                    <tr class="delLine">
                        <td colspan="2">检测条件</td>
                        <td rowspan="2">附加滤过</td>
                        <td rowspan="2">SID/cm</td>
                        <td rowspan="2" style="width: 150px;">目标空气比释动能/μGy</td>
                        <td rowspan="2" style="width: 150px;">实测空气比释动能/μGy</td>
                    </tr>
                    <tr>
                        <td>管电压 /kV</td>
                        <td>毫安秒/mAs</td>
                    </tr>
                    <tr v-for="(item, index) in data.valueData.point">
                        <td>
                            {{item.v1}}
                        </td>
                        <td>
                            <myInput v-model="item.v2"></myInput>
                        </td>
                        <td v-if="index === 0" rowspan="5">
                            {{item.v3}}
                        </td>
                        <td v-else-if="index === data.valueData.point.length-1">
                            {{item.v3}}
                        </td>
                        <td v-if="index === 0" rowspan="5">
                            <myInput v-model="item.v4"></myInput>
                        </td>
                        <td v-else-if="index === data.valueData.point.length-1">
                            <myInput v-model="item.v4"></myInput>
                        </td>
                        <td>
                            {{item.v5}}
                        </td>
                        <td>
                            <myInput v-model="item.v6"></myInput>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_dr_tcq",
        props:['data', 'target'],
        methods: {
            returnVal(val, key){
                if(key === 'NumberOfDetectors'){
                    this.data.valueData.tcqNum1 = "";
                    this.data.valueData.tcqNum2 = "";
                    this.$forceUpdate();
                }
                this.data.valueData[key] = val;
            }
        }
    }
</script>

<style scoped>

</style>