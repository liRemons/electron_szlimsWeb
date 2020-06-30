<template>
    <div style="line-height: 30px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
       <div>
           <div style="text-align: center;">
               <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;"
                    v-html="title"></div>
               <div style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;">
                   标准要求
               </div>
               <div style="border: 1px solid black; border-top: none;" class="tl">
                   验收：≥90.0%厂家规定值，或≥80.0%fNyquist，建立基线值；状态≥90.0%基线值。
               </div>
               <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                   检测及计算方法
               </div>
               <div style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px; min-height: 40px;">
                   {{this.getDetailContent()}}
               </div>
               <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                   检测结果
               </div>
               <table class="myTable">
                   <tr style="line-height: 20px;">
                       <td>方向</td>
                       <td>
                           <redStar></redStar>
                           最大可分辨线
                           <br/>
                           对数目/lp/mm
                       </td>
                       <td style="width: 90px;">
                           <redStar v-if="state === '验收检测'"></redStar>
                           <el-checkbox v-model="data.valueData.checkBoxsTop[0]" label="厂家规定"></el-checkbox>
                           <br/>
                           值/lp/mm
                       </td>
                       <td>
                           <redStar v-if="state === '验收检测'"></redStar>
                           <el-checkbox v-model="data.valueData.checkBoxsTop[1]" label="fNyquist"></el-checkbox>
                           <br/>
                           /lp/mm
                       </td>
                       <td style="width: 150px;">
                           基线值
                           <br/>
                           /lp/mm
                       </td>
                       <td style="width: 200px;">检测结果/%</td>
                   </tr>
                   <tr>
                       <td>
                           水平
                       </td>
                       <td>
                           <myInput v-model="data.valueData.point[0].v1"></myInput>
                       </td>
                       <td>
                           <myInput v-model="data.valueData.point[0].v2"></myInput>
                       </td>
                       <td>
                           <myInput v-model="data.valueData.point[0].v3"></myInput>
                       </td>
                       <td>
                           <div v-if="state === '状态检测'">
                               <selectModel @returnVal="returnFn"
                                            :single="true"
                                            :rows="false"
                                            :special="0"
                                            v-if="!showInput"
                                            :Judge="true"
                                            :input="false"
                                            style="white-space: pre-wrap; line-height: 20px; text-align: left;"
                                            :receive="''"
                                            :transmitText="data.valueData.point[0].v4"
                                            :list="list"
                                            :Obj="'name'">
                               </selectModel>
                               <myInput v-else v-model="data.valueData.point[0].v4" :reg="'[^0-9/]'" @change.native="changeV4()"></myInput>
                           </div>
                           <div v-else>
                               /
                           </div>

                       </td>
                       <td style="text-align: left; padding-left: 20px;">
                           <el-checkbox disabled v-model="data.valueData.point[0].v5[0]">≥90%厂家规定值</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[0].v5[1]">＜90%厂家规定值</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[0].v5[2]">≥80%fNyquist</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[0].v5[3]">＜80%fNyquist</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[0].v5[4]">建立基线值= <span
                                   style="border-bottom: 1px solid black;">{{data.valueData.point[0].jiXianVal}}</span></el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[0].v5[5]">≥90%基线值</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[0].v5[6]">＜90%基线值</el-checkbox>
                       </td>
                   </tr>
                   <tr>
                       <td>
                           垂直
                       </td>
                       <td>
                           <myInput v-model="data.valueData.point[1].v1"></myInput>
                       </td>
                       <td>
                           <myInput v-model="data.valueData.point[1].v2"></myInput>
                       </td>
                       <td>
                           <myInput v-model="data.valueData.point[1].v3"></myInput>
                       </td>
                       <td>
                           <div v-if="state === '状态检测'">
                               <selectModel @returnVal="returnFn"
                                            :single="true"
                                            :rows="false"
                                            :special="1"
                                            v-if="!showInput2"
                                            :Judge="true"
                                            :input="false"
                                            style="white-space: pre-wrap; line-height: 20px; text-align: left;"
                                            :receive="''"
                                            :transmitText="data.valueData.point[1].v4"
                                            :list="list"
                                            :Obj="'name'">
                               </selectModel>
                               <myInput v-else v-model="data.valueData.point[0].v4" :reg="'[^0-9/]'" @change.native="changeV4()"></myInput>
                           </div>
                           <div v-else>/</div>
                       </td>
                       <td style="text-align: left; padding-left: 20px;">
                           <el-checkbox disabled v-model="data.valueData.point[1].v5[0]">≥90%厂家规定值</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[1].v5[1]">＜90%厂家规定值</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[1].v5[2]">≥80%fNyquist</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[1].v5[3]">＜80%fNyquist</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[1].v5[4]">建立基线值= <span
                                   style="border-bottom: 1px solid black;">{{data.valueData.point[1].jiXianVal}}</span></el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[1].v5[5]">≥90%基线值</el-checkbox>
                           <br/>
                           <el-checkbox disabled v-model="data.valueData.point[1].v5[6]">＜90%基线值</el-checkbox>
                       </td>
                   </tr>
               </table>
               <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                   备注
               </div>
               <div style="border: 1px solid black;border-top: none; text-align: left; padding-left: 10px;">
                   <el-radio v-model="data.valueData.note" disabled label="新标准实施后首次检测，建立基线值。"></el-radio>
                   <br/>
                   <el-radio v-model="data.valueData.note" disabled label="无法确认建立基线值的检测条件，建立基线值。"></el-radio>
                   <br/>
                   <el-radio v-model="data.valueData.note" disabled label="无法确认建立基线值的检测条件，以90%厂家规定值作为最小基线值。"></el-radio>
                   <br/>
                   <el-radio v-model="data.valueData.note" disabled label="新标准实施后首次检测，以90%厂家规定值作为最小基线值。"></el-radio>
                   <br/>
                   <el-radio v-model="data.valueData.note" disabled label="无法确认建立基线值的检测条件，以80% fNyquist作为最小基线值。"></el-radio>
                   <br/>
                   <el-radio v-model="data.valueData.note" disabled label="新标准实施后首次检测，以80% fNyquist作为最小基线值。"></el-radio>
               </div>
           </div>
           <div class="___absolute myBtn" style="left: 750px; top: 0px; text-align: center; width: 65px;" @click="sure" v-if="target === '0'">
               完成
           </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "project_dr_jxkjfbl",
        props: ['data', 'jsonString', 'target'],
        data() {
            return {
                list: [
                    {id: 0, name: "无法确认建立基线值的检测条件，以90%厂家规定值作为最小基线值；"},
                    {id: 1, name: "无法确认建立基线值的检测条件，以80% fNyquist作为最小基线值；"},
                    {id: 2, name: "新标准实施后首次检测，以90%厂家规定值作为最小基线值；"},
                    {id: 3, name: "新标准实施后首次检测，以80% fNyquist作为最小基线值；"},
                    {id: 4, name: "自定义"}
                ],
                showInput: false,
                showInput2: false
            }
        },
        computed: {
            mode() {
                try {
                    return this.jsonString.find(item => item.to === 'project_jcxcxx').data.valueData.point.map(item => item.exposureMode);
                } catch (e) {
                    return []
                }
            },
            state() {
                try {
                    return this.computeObj.judgeState(this.jsonString.find(item => item.to === 'project_jbxx').data.valueData.purposeDetection);
                } catch (e) {
                    return ''
                }
            },
            testType() {
                try {
                    return this.jsonString.find(item => item.to === 'project_jbxx').data.valueData.detectionObjects;
                } catch (e) {
                    return ''
                }
            },
            title() {
                if (this.testType === "乳腺DR") {
                    return "高对比分辨力";
                } else {
                    return "极限空间分辨力（探测器1）";
                }
            }
        },
        methods: {
            getDetailContent() {

                let arr1 = ["DR摄影"];
                let arr2 = ["乳腺DR"]
                ;
                if (this.computeObj.intersect(this.mode, arr1).length > 0) {
                    return "有可能的话取出滤线栅，设置SID等于或尽量接近180cm。选用两块分辨力测式卡，呈相互垂直的状态，放置于探测器表面，选用适当条件（如用60kV，3mAs）进行曝光。验收检测建立基线值并与厂家保证值比较，无厂家保证值时与fNyquist比较，并建立基线值；状态检测与基线值比较，对于厂家保证值为45°时的检测结果的，直接用厂家保证值除以1.414即为水平和垂直方向的厂家保证值。 "
                } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
                    return "将两个最大线对数不低于10lp/mm的线对卡分别呈水平和垂直方向放置于支撑台上，线对卡尽可能紧贴影像接收器，选择适当条件进行曝光，在高分辨显示器上读取该影像，调节窗宽窗位至最优化，观察可分辨的线对组数。 "
                } else {
                    return ""
                }
            },
            returnFn(val, a, index, row) {
                let item = this.data.valueData.point[index];
                let allow = [];
                if (this.data.valueData.checkBoxsTop[0] === false && this.data.valueData.checkBoxsTop[1] === false && item.v2 === '' && item.v3 === '') {
                    allow = [4];
                } else if (this.data.valueData.checkBoxsTop[0] === true && this.data.valueData.checkBoxsTop[1] === false) {
                    allow = [4, 0, 2];
                } else if (this.data.valueData.checkBoxsTop[0] === true && this.data.valueData.checkBoxsTop[1] === true) {
                    allow = [4, 0, 2];
                } else if (this.data.valueData.checkBoxsTop[0] === false && this.data.valueData.checkBoxsTop[1] === true) {
                    allow = [4, 1, 3];
                } else {
                    allow = [4, 0, 1, 2, 3]
                }
                let result = allow.findIndex(item => {
                    return item === row.id
                });


                let reason = "";
                if (row.id === 0 || row.id === 2) {
                    reason = "请填写厂家规定值";
                } else if (row.id === 1 || row.id === 3) {
                    reason = "请填写fNyquist";
                }
                if (result === -1) {
                    this.$notify({
                        type: 'warning',
                        message: reason
                    });
                    this.$eventBus.$emit('referSelectModel');
                } else {
                    if (val === '自定义') {
                        item.v4 = ' ';
                        this.showInput = true;
                    } else {
                        item.v4 = val;
                        item.v4Id = row.id;
                    }
                }
            },
            sure() {
                if (this.state === "验收检测") {
                    if (this.data.valueData.point[0].v1 === "" || (this.data.valueData.point[0].v2 === "" && this.data.valueData.point[0].v3 === "")) {
                        this.$notify({
                            type: 'warning',
                            message: '有必填项未填写！'
                        })
                    } else {
                        this.$notify({
                            type: 'success',
                            message: '完成'
                        })
                    }
                } else if (this.state === "状态检测") {
                    if (this.data.valueData.point[0].v1 === "") {
                        this.$notify({
                            type: 'warning',
                            message: '有必填项未填写！'
                        })
                    } else {
                        this.$notify({
                            type: 'success',
                            message: '完成'
                        })
                    }
                }
            },

            yanShouTest(item) {
                if ((this.data.valueData.checkBoxsTop[0] === true && item.v2 !== "") && (this.data.valueData.checkBoxsTop[1] === false && item.v3 === "")) {
                    let e = item.v1 / item.v2;
                } else if ((this.data.valueData.checkBoxsTop[0] === false && item.v2 === "") && (this.data.valueData.checkBoxsTop[1] === true && item.v3 !== "")) {
                    let f = item.v1 / item.v2;
                } else if ((this.data.valueData.checkBoxsTop[0] === true && item.v2 !== "") && (this.data.valueData.checkBoxsTop[1] === true && item.v3 !== "")) {
                    let g = item.v1 / item.v2;
                }
            },

            stateTest(item) {
                if ((this.data.valueData.checkBoxsTop[0] === true && item.v2 !== "") && (this.data.valueData.checkBoxsTop[1] === false && item.v3 === "")) {
                    if (item.v4Id === 0){
                        let e1 = item.v2 * 0.9 * 0.9;
                        if(item.v1 >= e1){
                            item.v5[4] = true;
                            item.jiXianVal= item.v1;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，建立基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，以90%厂家规定值作为最小基线值。"
                        }
                        item.val = e1;

                    } else if (item.v4Id === 2){
                        let e1 = item.v2 * 0.9 * 0.9;
                        if(item.v1 >= e1){
                            item.v5[4] = true;
                            item.jiXianVal = item.v1;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，建立基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，以90%厂家规定值作为最小基线值。"
                        }
                        item.val = e1;
                    } else if (item.v4Id === 4){
                        let g1 = item.v2 * 0.9;
                        if(item.v1 >= g1){
                            item.v5[5] = true;
                            item.jiXianVal = item.v1;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，建立基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，以90%厂家规定值作为最小基线值。"
                        }
                        item.val = g1;
                    }
                } else if ((this.data.valueData.checkBoxsTop[0] === false && item.v2 === "") && (this.data.valueData.checkBoxsTop[1] === true && item.v3 !== "")) {
                    if (item.v4Id === 1){
                        let e2 = item.v3 * 0.8 * 0.9;
                        if(item.v1 >= e2){
                            item.v5[4] = true;
                            item.jiXianVal = item.v1;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，建立基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，以80% fNyquist作为最小基线值。"
                        }
                        item.val = e2;
                    } else if (item.v4Id === 3){
                        let e2 = item.v3 * 0.8 * 0.9;
                        if(item.v1 >= e2){
                            item.v5[4] = true;
                            item.jiXianVal = item.v1;
                            this.data.valueData.note = "新标准实施后首次检测，建立基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，以80% fNyquist作为最小基线值。"
                        }
                        item.val = e2;
                    } else if (item.v4Id === 4){
                        let g1 = item.v3 * 0.9;
                        if(item.v1 >= g1){
                            item.v5[4] = true;
                            item.jiXianVal = item.v1;
                            this.data.valueData.note = "新标准实施后首次检测，建立基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，以80% fNyquist作为最小基线值。"
                        }
                        item.val = g1;
                    }

                } else if ((this.data.valueData.checkBoxsTop[0] === true && item.v2 !== "") && (this.data.valueData.checkBoxsTop[1] === true && item.v3 !== "")) {
                    if (item.v4Id === 0){
                        let e1 = item.v2 * 0.9 * 0.9;
                        if(item.v1 >= e1){
                            item.v5[4] = true;
                            item.jiXianVal = item.v1;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，建立基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "新标准实施后首次检测，以90%厂家规定值作为最小基线值。"
                        }
                        item.val = e1;
                    } else if (item.v4Id === 2){
                        let e1 = item.v2 * 0.9 * 0.9;

                        if(item.v1 >= e1){
                            item.v5[4] = true;
                            item.jiXianVal = item.v1;
                            this.data.valueData.note = "新标准实施后首次检测，以90%厂家规定值作为最小基线值。"
                        } else {
                            item.v5[6] = true;
                            this.data.valueData.note = "无法确认建立基线值的检测条件，以90%厂家规定值作为最小基线值。"
                        }
                        item.val = e1;
                    } else if (item.v4Id === 4){
                        let g1 = item.v2 * 0.9;
                        if(item.v1 >= g1){
                            item.v5[5] = true;
                            item.jiXianVal = item.v1;
                        } else {
                            item.v5[6] = true;
                        }
                        item.g1 = g1;
                    }
                }
            },
            changeV4() {
                if (this.data.valueData.point[0].v4 === '') {
                    this.showInput = false;
                } else {
                    this.data.valueData.point[0].v4 = this.data.valueData.point[0].v4.replace(' ', '');
                }
            }
        }
    }
</script>

<style scoped>

</style>