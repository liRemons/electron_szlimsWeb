<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div style="text-align: center;">
            <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;">
                探测器剂量指示（DDI）（探测器1）
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                标准要求
            </div>
            <div style="border: 1px solid black; border-top: none;" class="tl">
                验收：DDI（10μGy）计算值与测量值±20.0%，DDI或平均像素值建立基线值；状态：基线值±20.0%。
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测及计算方法
            </div>
            <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;">
                有可能的话取出滤线栅，设置SID为180cm，如达不到则调节SID至最大值，70kV，1mmCu滤过，入射空气比释动能约10μGy，实际检测条件参考曝光参数选择，曝光3次，记录DDI值，如果没有DDI值则读取影像中心10cm×10cmROI的平均像素值，并计算三幅影像平均像素值。验收检测结果偏差=（计算值-测量值）/测量值×100%，状态检测结果偏差=（平均值-基线值）/基线值×100%。
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测结果
            </div>
            <div style="border: 1px solid black; border-top: none;">
                <el-radio label="平均像素值"
                          @click.native.prevent="computeObj.clearRadio('平均像素值', data.valueData, 'radioValue')"
                          v-model="data.valueData.radioValue"></el-radio>
                <el-radio label="DDI值"
                          @click.native.prevent="computeObj.clearRadio('DDI值', data.valueData, 'radioValue')"
                          v-model="data.valueData.radioValue"></el-radio>
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td rowspan="2">检测结果</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>平均值</td>
                </tr>
                <tr>
                    <td>
                        <myInput v-model="data.valueData.arr1[0]" :reg="'[^0-9./]'" @change.native="setAv"></myInput>
                    </td>
                    <td>
                        <myInput v-model="data.valueData.arr1[1]" :reg="'[^0-9./]'" @change.native="setAv"></myInput>
                    </td>
                    <td>
                        <myInput v-model="data.valueData.arr1[2]" :reg="'[^0-9./]'" @change.native="setAv"></myInput>
                    </td>
                    <td>
                        {{data.valueData.arr1[3]}}
                    </td>
                </tr>
            </table>
            <table class="myTable" v-if="testType === '验收检测'">
                <tr class="delLine">
                    <td rowspan="4">
                        验收检测
                    </td>
                    <td colspan="3">
                        <div style="text-align: left; padding-left: 14px; padding: 5px;">
                            <el-radio v-model="data.valueData.radioValue"
                                      @click.native.prevent="computeObj.clearRadio('有DDI值及生产厂家计算公式 计算公式：', data.valueData, 'radioValue')"
                                      label="有DDI值及生产厂家计算公式 计算公式："></el-radio>
                            <myInput v-if="hasDDI" v-model="data.valueData.computer"
                                     style="width: 150px; border-bottom: 1px solid black;"></myInput>
                            <span v-else>/</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>空气比释动能测量值/μGy</td>
                    <td>空气比释动能计算值/μGy</td>
                    <td>偏差/%</td>
                </tr>
                <tr>
                    <td>
                        <myInput v-if="hasDDI" v-model="data.valueData.arr2[0]" :reg="'[^0-9./]'"
                                 @change.native="setPianCha"></myInput>
                        <div v-else>/</div>
                    </td>
                    <td>
                        <myInput v-if="hasDDI" v-model="data.valueData.arr2[1]" :reg="'[^0-9./]'"
                                 @change.native="setPianCha"></myInput>
                        <div v-else>/</div>
                    </td>
                    <td>
                        <div v-if="hasDDI">{{data.valueData.arr2[2]}}</div>
                        <div v-else>/</div>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <div style="text-align: left; padding-left: 5px;">
                            <el-radio v-model="data.valueData.radioValue"
                                      @click.native.prevent="computeObj.clearRadio('无DDI值及生产厂家计算公式：建立基线值 =', data.valueData, 'radioValue')"
                                      label="无DDI值及生产厂家计算公式：建立基线值 ="></el-radio>
                            <span v-if="!hasDDI"
                                  style="border-bottom: 1px solid black;">{{data.valueData.arr1[3]}}</span>
                            <span v-else>/</span>
                        </div>
                    </td>
                </tr>
            </table>
            <table class="myTable"  v-if="testType === '状态检测'">
                <tr class="delLine">
                    <td rowspan="2" style="width: 176px;">
                        状态检测
                    </td>
                    <td>基线值</td>
                    <td>结果</td>
                </tr>
                <tr>
                    <td>
                        <selectModel @returnVal="returnVal"
                                     :Judge="true"
                                     :special="1"
                                     v-if="!showInput"
                                     :multi-select="false"
                                     :receive="'AECNum'"
                                     :transmitText="''"
                                     :single="true"
                                     :rows="false"
                                     :list="['无', '自定义']"
                                     :Obj="''">
                        </selectModel>
                        <myInput v-else v-model="data.valueData.jiXianZhi" :reg="'[^0-9./]'"
                                 @change.native="(el) => {setShowInput(el, 1)}"></myInput>
                    </td>
                    <td style="text-align: left; padding-left: 10px;">
                        <p>
                            <el-checkbox v-model="data.valueData.checkArr[0]" disabled style="width: 90px;">
                                建立基线值 =
                            </el-checkbox>
                            <span v-if="data.valueData.checkArr[0]">{{data.valueData.arr1[3]}}</span>
                        </p>
                        <p>
                            <el-checkbox v-model="data.valueData.checkArr[1]" disabled style="width: 120px;">
                                与基线值的偏差 =
                            </el-checkbox>
                            <span v-if="data.valueData.checkArr[1]">{{data.valueData.pianCha}}%</span>
                        </p>
                    </td>
                </tr>
            </table>
            <div style="border: 1px solid black; border-top: none; line-height: 25px; text-align: left; padding-left: 180px;">
                <p>
                    <el-radio v-model="data.valueData.note"
                              @click.native.prevent="computeObj.clearRadio('新标准实施后首次检测,建立基线值。', data.valueData, 'note')"
                              label="新标准实施后首次检测,建立基线值。"></el-radio>
                </p>
                <p>
                    <el-radio v-model="data.valueData.note"
                              @click.native.prevent="computeObj.clearRadio('无法确认建立基线值的检测条件,建立基线值。', data.valueData, 'note')"
                              label="无法确认建立基线值的检测条件,建立基线值。"></el-radio>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_dr_tcqjlzs",
        props: ['data', 'jsonString', 'target'],
        data() {
            return {
                showInput: false
            }
        },
        watch: {
            "data.valueData.jiXianZhi": function () {
                this.setPianChaVal();
            },
            "data.valueData.arr1": function () {
                this.setPianChaVal();
            }
        },
        computed: {
            hasDDI() {
                return this.data.valueData.radioValue.indexOf('有DDI值') !== -1;
            },
            testType(){
                return this.computeObj.judgeState(this.jsonString.find(item => item.to === 'project_jbxx').data.valueData.purposeDetection);
            }
        },
        methods: {
            setAv() {
                let sum = this.computeObj.sum(this.data.valueData.arr1[0], this.data.valueData.arr1[1], this.data.valueData.arr1[2]);
                let avg = sum / 3;
                this.data.valueData.arr1[3] = avg.toFixed(2);
                this.$forceUpdate();
            },
            setPianCha() {
                try {
                    let f = this.data.valueData.arr2[0];
                    let g = this.data.valueData.arr2[1];
                    this.data.valueData.arr2[2] = (((f - g) * 100) / g).toFixed(2);
                } catch (e) {
                    this.data.valueData.arr2[2] = "";
                }
                this.$forceUpdate();
            },
            setShowInput(el) {
                let val = el.target.value;
                el.target.value = el.target.value.replace(' ', '');
                if (val === '') {
                    this.showInput = false;
                }
            },
            returnVal(val) {
                if (val === '自定义') {
                    this.data.valueData.jiXianZhi = " ";
                    this.showInput = true;
                    this.data.valueData.checkArr[0] = false;
                    this.data.valueData.checkArr[1] = true;
                } else {
                    this.data.valueData.jiXianZhi = val;
                    this.data.valueData.checkArr[0] = true;
                    this.data.valueData.checkArr[1] = false;
                }
                this.$forceUpdate();
            },
            setPianChaVal() {
                let J = this.data.valueData.jiXianZhi;
                let D = this.data.valueData.arr1[3];
                let L = ((D - J) * 100) / J;
                this.data.valueData.pianCha = L.toFixed(2);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
