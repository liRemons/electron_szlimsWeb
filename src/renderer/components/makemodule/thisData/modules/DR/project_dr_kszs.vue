<template>
    <div style="line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <div style="text-align: center;">
                <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;">
                    暗噪声（探测器1）
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                    标准要求
                </div>
                <div style="border: 1px solid black; border-top: none; line-height: 20px;" class="tl">
                    验收：像素值或DDI在规定值内，或建立基线值，影像均匀无伪影；
                    <br/>
                    状态&稳定性：像素值或DDI在规定值内，或基线值±50.0%，影像均匀无伪影。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测及计算方法
                </div>
                <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;">
                    有可能的话取出滤线栅，关闭遮线器，用面积15cm×15cm，厚2mm铅板覆盖出线口，设置最低管电流积或最低管电流和最低管电压进行手动曝光并获取一幅空白预处理影像，读取影像中心10cm×10cmROI的平均像素值或记录DDI值。调节适当窗宽窗位，目视检查影像应均匀无伪影。
                </div>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    检测结果
                </div>
                <table class="myTable">
                    <tr class="delLine">
                        <td rowspan="2">是否均匀无伪影</td>
                        <td colspan="3">
                            <el-radio v-model="data.valueData.radioValue"
                                      @click.native.prevent="computeObj.clearRadio('平均像素值', data.valueData, 'radioValue')"
                                      label="平均像素值"></el-radio>
                            <el-radio v-model="data.valueData.radioValue"
                                      @click.native.prevent="computeObj.clearRadio('DDI值', data.valueData, 'radioValue')"
                                      label="DDI值"></el-radio>
                        </td>
                        <td rowspan="2" style="width: 200px;">结果</td>
                    </tr>
                    <tr>
                        <td style="width: 150px;">
                            厂家规定值
                            <div style="text-align: left; padding-left: 20px;">
                                <el-radio v-model="data.valueData.factoryValue"
                                          @click.native.prevent="computeObj.clearRadio('有', data.valueData, 'factoryValue')"
                                          label="有"
                                          style="width: 20px;"></el-radio>
                                <el-radio v-model="data.valueData.factoryValue"
                                          @click.native.prevent="computeObj.clearRadio('无', data.valueData, 'factoryValue')"
                                          label="无"
                                          style="width: 20px;"></el-radio>
                            </div>
                            <!-- <selectModel @returnVal="returnVal2"
                                          :Judge="true"
                                          :special="1"
                                          :multi-select="false"
                                          :receive="'factoryValue'"
                                          :transmitText="''"
                                          :single="true"
                                          :rows="false"
                                          :list="['有', '无']"
                                          :Obj="''">
                             </selectModel>-->
                        </td>
                        <td>基线值</td>
                        <td>检测结果</td>
                    </tr>
                    <tr>
                        <td>
                            <el-radio v-model="data.valueData.hasShadow"
                                      @click.native.prevent="computeObj.clearRadio('是', data.valueData, 'hasShadow')"
                                      label="是" style="width: 30px;"></el-radio>
                            <el-radio v-model="data.valueData.hasShadow"
                                      @click.native.prevent="computeObj.clearRadio('否', data.valueData, 'hasShadow')"
                                      label="否"></el-radio>
                        </td>
                        <td>
                            <selectModel @returnVal="returnVal"
                                         :Judge="true"
                                         :special="1"
                                         v-if="!showInput"
                                         :multi-select="false"
                                         :receive="'AECNum'"
                                         :transmitText="data.valueData.arr[0]"
                                         :single="true"
                                         :rows="false"
                                         :list="['无', '自定义']"
                                         :Obj="''">
                            </selectModel>
                            <myInput v-else v-model="data.valueData.arr[0]" :reg="'[^0-9./]'"
                                     @change.native="(el) => {setShowInput(el, 1)}"></myInput>

                        </td>
                        <td>
                            <div v-if="testPurpose === '状态检测'">

                                <selectModel @returnVal="returnVal"
                                             :Judge="true"
                                             :special="2"
                                             v-if="!showInput2"
                                             :multi-select="false"
                                             :receive="'AECNum'"
                                             :transmitText="''"
                                             :single="true"
                                             :rows="false"
                                             :list="['无', '自定义']"
                                             :Obj="''">
                                </selectModel>
                                <myInput v-else v-model="data.valueData.arr[1]" :reg="'[^0-9./]'"
                                         @change.native="(el) => {setShowInput(el, 2)}"></myInput>
                            </div>
                            <div v-else>
                                无
                            </div>
                        </td>
                        <td>
                            <myInput v-model="data.valueData.arr[2]" @change.native="checkValue"></myInput>
                        </td>
                        <td>
                            <div style="height: 100px; line-height: 24px; text-align: left; padding-left: 20px;">
                                <p>
                                    <el-checkbox v-model="data.valueData.checkBoxArr[0]" disabled>在厂家规定值内</el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox v-model="data.valueData.checkBoxArr[1]" disabled>在厂家规定值外</el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox v-model="data.valueData.checkBoxArr[2]" disabled>建立基线值 = <span
                                            v-if="data.valueData.checkBoxArr[2]"
                                            style="border-bottom: 1px solid black; padding-left: 10px; padding-right: 10px;">{{data.valueData.arr[2]}}</span>
                                    </el-checkbox>
                                </p>
                                <p>
                                    <el-checkbox v-model="data.valueData.checkBoxArr[3]" disabled>与基线值的偏差=<span v-if="data.valueData.checkBoxArr[3]">{{data.valueData.eValue}}</span>%</el-checkbox>
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
                <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                    备注
                </div>
                <div style="border: 1px solid black;border-top: none;">
                    <div style="text-align: left; padding-left: 200px;">
                        <p>
                            <el-radio v-model="data.valueData.note"
                                      @click.native.prevent="computeObj.clearRadio('新标准实施后首次检测，建立基线值。', data.valueData, 'note')"
                                      label="新标准实施后首次检测，建立基线值。"></el-radio>
                        </p>
                        <p>
                            <el-radio v-model="data.valueData.note"
                                      @click.native.prevent="computeObj.clearRadio('无法确认建立基线值的检测条件，建立基线值。', data.valueData, 'note')"
                                      label="无法确认建立基线值的检测条件，建立基线值。"></el-radio>
                        </p>
                    </div>
                </div>
            </div>
            <div class="___absolute myBtn" style="left: 750px; top: 0px; width: 65px; text-align: center;" @click="sure()" v-if="target === '0'">
                完成
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "project_dr_kszs",
        props: ['data', 'jsonString', 'target'],
        data() {
            return {
                showInput: false,
                showInput2: false
            }
        },
        computed: {
            testPurpose() {
                return this.computeObj.judgeState(this.jsonString.find(item => item.to === 'project_jbxx').data.valueData.purposeDetection);
            },
            baseValue() {
                try {
                    let val = data.valueData.arr[1].replace(' ', '');
                    if (val !== '' && val !== '无') {
                        return '有'
                    } else {
                        return '无'
                    }
                } catch (e) {
                    return '无'
                }
            }
        },
        watch: {
            testPurpose(val) {
                this.changeValue(val);
            }
        },
        methods: {
            returnVal(val, a, flag) {
                if (val === "自定义") {
                    if (flag === 1) {
                        this.showInput = true;
                        this.data.valueData.arr[0] = ' ';
                    } else {
                        this.showInput2 = true;
                        this.data.valueData.arr[1] = ' ';
                    }
                } else {
                    if (flag === 1) {
                        this.data.valueData.arr[0] = val;
                    } else {
                        this.data.valueData.arr[1] = val;
                    }
                }
            },

            returnVal2(val, a, flag) {
                this.data.valueData.factoryValue = val;
            },

            setShowInput(el, flag) {
                let val = el.target.value;
                el.target.value = el.target.value.replace(' ', '');
                if (val === '') {
                    if (flag === 1) {
                        this.showInput = false;
                    } else {
                        this.showInput2 = false;
                    }
                }

                if (flag === 1) {
                    if (val === '' || this.data.valueData.arr[2] === '') return;
                    let result = isNaN(val);
                    let result2 = isNaN(this.data.valueData.arr[2]);
                    let val2 = Number(this.data.valueData.arr[2]);
                    if (!result && !result2 && val2 <= Number(val)) {
                        this.data.valueData.checkBoxArr[0] = true;
                    } else {
                        this.data.valueData.checkBoxArr[0] = false;
                    }
                    this.$forceUpdate();
                }

                this.setEValue();

            },
            setEValue(){
                let b = this.data.valueData.arr[1];
                let c = this.data.valueData.arr[2];
                let e = ((c - b) * 100) / b;
                this.data.valueData.eValue = e.toFixed(1);
            },
            checkValue(el) {
                let val = el.target.value;
                if (val === '' || this.data.valueData.arr[0] === '') return;
                let result2 = isNaN(val);
                let result = isNaN(this.data.valueData.arr[0]);
                let val2 = Number(this.data.valueData.arr[0]);
                if (!result && !result2 && Number(val) <= val2) {
                    this.data.valueData.checkBoxArr[0] = true;
                } else {
                    this.data.valueData.checkBoxArr[0] = false;
                }
                this.$forceUpdate();

                this.setEValue();
            },

            changeValue(val) {
                for (let i = 0; i < this.data.valueData.checkBoxArr.length; i++) {
                    this.data.valueData.checkBoxArr[i] = false;
                }
                this.$forceUpdate();

                if (val === "验收检测") {
                    this.data.valueData.arr[1] = "无";

                    if (this.data.valueData.factoryValue === '无') {

                        this.data.valueData.checkBoxArr[2] = true;

                    } else if (this.data.valueData.factoryValue === '有') {
                        let a = this.data.valueData.arr[0];
                        let c = this.data.valueData.arr[2];
                        if (c <= a) {
                            this.data.valueData.checkBoxArr[0] = true;
                        } else {
                            this.data.valueData.checkBoxArr[1] = true;
                        }
                    }
                } else if (val === "状态检测") {
                    let factoryValue = this.data.valueData.factoryValue;

                    if (factoryValue === '无' && this.baseValue === '无') {

                        this.data.valueData.checkBoxArr[2] = true;

                    } else if (factoryValue === '无' && this.baseValue === '有') {

                        this.data.valueData.checkBoxArr[3] = true;

                    } else if (factoryValue === '有' && this.baseValue === '无') {
                        let a = this.data.valueData.arr[0];
                        let c = this.data.valueData.arr[2];

                        if (c <= a) {
                            this.data.valueData.checkBoxArr[0] = true;
                        } else {
                            this.data.valueData.checkBoxArr[1] = true;
                        }

                    } else if (factoryValue === '有' && this.baseValue === '有') {

                        let a = this.data.valueData.arr[0];
                        let c = this.data.valueData.arr[2];

                        if (c <= a) {
                            this.data.valueData.checkBoxArr[0] = true;
                        } else {
                            this.data.valueData.checkBoxArr[1] = true;
                        }
                        this.data.valueData.checkBoxArr[3] = true;
                    }
                }
            },



            sure(){
                let factoryValue = this.data.valueData.factoryValue;
                if(factoryValue === '无' && this.baseValue === '无'){
                    if(this.data.valueData.note === ''){
                        this.$notify({
                            type: 'warning',
                            message: '备注必须二选一!'
                        });
                    }
                } else {
                    this.$notify({
                        type: 'success',
                        message: '已完成'
                    });
                }
            }
        },
        mounted() {
            if (this.testPurpose === "验收检测") {
                this.data.valueData.arr[1] = "无";
                this.$forceUpdate();
            }
        }
    }
</script>

<style scoped>

</style>
