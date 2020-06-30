<template>
    <div style="text-align: center;line-height: 30px; padding-top: 10px;" class="___relative">
        <div :class="{eventCover: target !== '0'}"></div>
        <div>
            <div style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 10px; min-height: 30px;" v-html="getContent3()">
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                标准要求
            </div>
            <div style="border: 1px solid black; border-top: none; line-height: 20px; min-height: 31px;" class="tl">
                {{this.getContent(0)}}
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测及计算方法
            </div>
            <div style="border: 1px solid black; border-top: none; padding: 1px; min-height: 31px;">{{this.getContent(1)}}
            </div>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                检测结果
            </div>
            <table class="myTable">
                <tr class="delLine">
                    <td>检测条件/kV</td>
                    <td>靶/滤过</td>
                    <td>附加过滤</td>
                    <td>HVL/mmAl</td>
                </tr>
                <tr v-for="(item, i) in data.valueData.point">
                    <td v-if="edit[i]">
                        <myInput v-if="data.valueData.v1IsInput" :reg="'[^0-9./]'" v-model="item.v1" style="text-align: center;"></myInput>
                        <div v-else>
                            {{item.v1}}
                        </div>
                    </td>
                    <td v-if="edit[i]">
                        <selectModel @returnVal="returnFunction"
                                     :single="true"
                                     :rows="false"
                                     v-if="data.valueData.v2select7"
                                     style="border: none"
                                     :special="i"
                                     :Judge="true"
                                     :input="false"
                                     :receive="'v2'"
                                     class="tc borderRight"
                                     :transmitText="item.v2"
                                     :list="myList"
                                     :Obj="'name'">
                        </selectModel>
                        <div v-else-if="data.valueData.v2select1">
                            {{item.v2}}
                        </div>
                        <div v-else>/</div>
                    </td>
                    <td v-if="edit[i]">
                        <selectModel @returnVal="returnFunction2"
                                     :single="true"
                                     :rows="false"
                                     style="border: none"
                                     :special="i"
                                     :Judge="true"
                                     :input="false"
                                     :receive="'v3'"
                                     class="tc borderRight"
                                     :transmitText="item.v3"
                                     :list="['无附加过滤']"
                                     :Obj="''">
                        </selectModel>
                    </td>
                    <td v-if="edit[i]">
                        <myInput v-model="item.v4" :reg="'[^0-9./]'" :style="{textAlign: 'center', color: item.normal === false ? 'red' : ''}" @keyup.native="(el) => {setColor(item, el)}"></myInput>
                    </td>

                    <td v-if="!edit[i]">/</td>
                    <td v-if="!edit[i]">/</td>
                    <td v-if="!edit[i]">/</td>
                    <td v-if="!edit[i]">/</td>
                </tr>
            </table>
            <div style="border: 1px solid black;font-weight: bolder; border-top: none;">
                备注
            </div>
            <div style="border: 1px solid black;border-top: none;">
                <myInput v-model="data.valueData.note" style="text-align: center;"></myInput>
            </div>
            <div class="___absolute myBtn" style="left: 750px; top: 0px; width: 65px;" @click="sure" v-if="target === '0'">
                完成
            </div>
        </div>
    </div>
</template>

<script>
    window.hh = {
        name: "project_dr_yyxsbzc",
        props: ['data', 'jsonString', 'target'],
        data() {
            return {
                content1: "采用直读法，选择80kV，如果不能选择80kV则尽可能选择相邻档中比80kV档低的一档，测器位置同管电压指示的偏离检测项目。",
                content2: "采用直读法，探测器位置同管电压指示的偏离检测项目。",
                content3: "探测器有效点位于乳房支撑台上方10cm处，将压迫器调至焦点与探测器之间约1/2处，选用28kV，合适的mAs，分别选择不同的靶/滤过进行曝光，采用直读法，读取半值层。",
                content4: "探测器有效点位于乳房支撑台上方10cm处，将压迫器调至焦点与探测器之间约1/2处，选用28kV，合适的mAs，靶/滤过为Mo/Mo，进行曝光，采用直读法，读取半值层。",
                list: [
                    {name: 'Mo/Mo', limitValue: [{down: 0.30}, {up: 0.40}]},

                    {name: 'Mo/Rh', limitValue: [{down: 0.30}, {up: 0.47}]},

                    {name: 'Rh/Rh', limitValue: [{down: 0.30}, {up: 0.50}]},

                    {name: 'Rh/Al', limitValue: [{up: 0.30}]},

                    {name: 'W/Rh', limitValue: [{down: 0.30}, {up: 0.58}]},

                    {name: 'W/Al', limitValue: [{down: 0.30}, {up: 0.53}]},

                    {name: 'W/Ag', limitValue: [{down: 0.30}, {up: 0.60}]}
                ],
                list2: [
                    {name: 'Mo/Mo', limitValue: [{down: 0.30}, {up: 0.40}]},

                    {name: 'Mo/Rh', limitValue: [{down: 0.30}, {up: 0.47}]},

                    {name: 'Rh/Rh', limitValue: [{down: 0.30}, {up: 0.50}]},

                    {name: 'Rh/Al', limitValue: [{down: 0.30}]},

                    {name: 'W/Rh', limitValue: [{down: 0.30}]},

                    {name: 'W/Al', limitValue: [{down: 0.30}]},

                    {name: 'W/Ag', limitValue: [{down: 0.30}]}
                ]
            };
        },
        computed: {
            mode() {
                return this.jsonString.find(item => item.to === 'project_jcxcxx').data.valueData.point.map(item => item.exposureMode);
            },
            deviceType() {
                return this.jsonString.find(item => item.to === 'project_jcxcxx').data.valueData.deviceType;
            },
            edit() {
                let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
                let arr2 = ["乳腺DR摄影", "乳腺CR摄影"];
                let arr3 = ["乳腺屏片摄影"];
                let arr4 = ["口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];
                if (this.computeObj.intersect(this.mode, arr1).length > 0) {
                    return [true, false, false, false, false, false, false];
                } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
                    return [true, true, true, true, true, true, true];
                } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {
                    return [true, false, false, false, false, false, false];
                } else if (this.computeObj.intersect(this.mode, arr4).length > 0) {
                    return [true, true, true, true, true, true, true];
                } else {
                    return [false, false, false, false, false, false, false];
                }
            },
            myList(){
                let arr1 = ["乳腺DR"];
                let arr2 = ["乳腺CR"];

                if (this.computeObj.intersect(this.mode, arr1).length > 0) {
                    return this.list;
                } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
                    return this.list2;
                } else {
                    return []
                }
            }
        },
        watch: {
            mode:{
                deep: true,
                handler: function () {
                    if(this.target === '0'){
                        //曝光模式改变后，清除数据。 注释原因： 打回也会清除数据

                        /*this.data.valueData.point.forEach(item => {
                            let keys = Object.keys(item);
                            keys.forEach(key => {
                                item[key] = "";
                            })
                        });*/
                        this.setV1();
                    }
                }
            }
        },
        methods: {
            getContent(flag) {
                if (flag === 0) {
                    return this.getDetailContent();
                } else {
                    return this.getDetailContent2();
                }
            },
            getDetailContent() {
                let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
                let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];
                let arr3 = ["乳腺屏片摄影"];
                let arr4 = ["乳腺DR摄影"];
                if (this.computeObj.intersect(this.mode, arr1).length > 0) {
                    return "验收&状态：≥2.3mmAl。"
                } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
                    return "验收&状态：口内机：1.5mmAl；口外机：1.8mmAl@60kV，2.1mmAl@70kV，2.3mmAl@80kV，2.5mmAl@90kV，2.7mmAl@100kV，3.0mmAl@110kV，3.2mmAl@120kV，3.3mmAl@125kV。对于标准中未直接写明的管电压档位利用内差法计算标准要求。"
                } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {
                    return "验收&状态：≥0.3mmAl。"
                } else if (this.computeObj.intersect(this.mode, arr4).length > 0) {
                    return "验收&稳定性：±10.0%内@t≥100ms；±2ms或±15.0%内@t＜100ms。"
                } else {
                    return ""
                }
            },
            getContent3() {
                let arr1 = ["乳腺DR", "乳腺CR", "乳腺屏片"];
                let arr2 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影", "口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];
                if (this.computeObj.intersect(this.mode, arr1).length > 0) {
                    return "半值层";
                } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
                    return "有用线束半值层";
                } else {
                    return "<div style='color: red'>该曝光模式无对应名称</div>";
                }
            },
            getDetailContent2() {
                let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
                let arr2 = ["口内牙片摄影"];
                let arr3 = ["乳腺DR摄影", "乳腺CR摄影"];
                let arr4 = ["乳腺屏片摄影"];
                if (this.computeObj.intersect(this.mode, arr1).length > 0) {
                    return this.content1;
                } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
                    return this.content2;
                } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {
                    return this.content3;
                } else if (this.computeObj.intersect(this.mode, arr4).length > 0) {
                    return this.content4;
                } else {
                    return ""
                }
            },

            setV1() {
                let arr1 = ["乳腺DR", "乳腺CR"];
                let arr3 = ["乳腺屏片"];
                let arr2 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影", "口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];

                if (this.computeObj.intersect(this.mode, arr1).length > 0) {
                    this.data.valueData.point.forEach(item => {
                        item.v1 = 28;
                    });
                    this.data.valueData.v1IsInput = false;

                    this.data.valueData.v2select7 = true;
                    this.data.valueData.v2select1 = false;
                } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {

                    this.data.valueData.v1IsInput = true;

                } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {

                    this.data.valueData.point.forEach(item => {
                        item.v1 = 28;
                        item.v2 = "Mo/Mo";
                        item.limit = [{down: 0.30}];
                    });

                    this.data.valueData.v1IsInput = false;

                    this.data.valueData.v2select7 = false;
                    this.data.valueData.v2select1 = true;
                } else {
                    this.data.valueData.v1IsInput = false;

                    this.data.valueData.v2select7 = false;
                    this.data.valueData.v2select1 = false;
                }
                this.$forceUpdate();
            },
            returnFunction(name, key, index, obj) {
                this.data.valueData.point[index].v2 = name;
                this.data.valueData.point[index].limit = obj.limitValue;
            },
            returnFunction2(name, key, index){
               this.data.valueData.point[index][key] = name;
            },
            setColor(item, el){
                if(item.hasOwnProperty('limit') && item.limit.length > 0){

                    let max = "";
                    let min = "";
                    let val = el.target.value;
                    item.limit.forEach(item2 => {
                        if(item2.hasOwnProperty('up')){
                            max = Number(item2.up);
                        }
                        if(item2.hasOwnProperty('down')){
                            min = Number(item2.down);
                        }
                    });

                    if(max !== "" && min !== ""){
                        if(val > max || val < min){
                            item.normal = false;
                        } else {
                            item.normal = true;
                        }
                    } else if(max === "" && min !== ""){
                        if(val < min){
                            item.normal = false;
                        } else {
                            item.normal = true;
                        }
                    } else if(max !== "" && min === ""){
                        if(val > max){
                            item.normal = false;
                        } else {
                            item.normal = true;
                        }
                    }

                    this.$forceUpdate();

                }
            },
            sure(){
                let item = this.data.valueData.point[0];
                if(item.v1 !== '' && item.v2 !== '' && item.v3 !== '' && item.v4 !== '') {
                    this.$notify({
                        type: 'success',
                        message: '已完成'
                    })
                } else {
                    this.$notify({
                        type: 'error',
                        message: '至少输入一行！'
                    })
                }
            }
        },
        mounted() {
            if(this.target === '0'){
                this.setV1();
            }
        }
    };
    export default hh
</script>

<style scoped>

</style>
