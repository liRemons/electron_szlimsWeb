<template>
    <div>
        <projectHead :data="data" :target="target" :col="11"></projectHead>
    </div>
</template>

<script>
    import {queryByPurpose} from "@/api/laboratory";
    import projectHead from "../project_head";
    export default {
        name: "project_systvoc1.vue",
        data(){
            return {
                showTime: false,
                showTime2: false,
                devices: [],
                testTiem: '',
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                }
            }
        },
        components: {
            projectHead
        },
        computed: {
            timeText () {
                return this.data.valueData.sysTestingTime;

            },

            timeText2() {
                return this.data.valueData.sysTestingEndTime;
            },
            getPickerOptions1(){
                let that = this;
                console.log("1111111111",that.data.valueData.sysTestingTime);
                return {
                    disabledDate (time) {
                        if(that.data.valueData.sysTestingTime){
                            let time2 = (that.data.valueData.sysTestingTime.replace(/-/g, '/'));
                            return time.getTime() < new Date(time2).getTime();
                        } else {
                            return time.getTime() < Date.now() - 8.64e7;
                        }
                    }
                }
            }
        },
        props:['ipdTemplate' , 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'target'],
        methods:{
            toShowTimeBox() {
                this.showTime = !this.showTime;
            },
            changeState(val){
                console.log(1, val);
                if(val === '正常'){
                    console.log(2);
                    this.data.valueData.sysSampleStateDetail = '';
                }
            },
            returnVal(a, b, c, d, valueArr){
                this.data.valueData.testDeviceCheckBox = valueArr.map(item => item.id);
            },
            changeTime() {
                this.showTime = false;
            },
            changeTime2(){
                this.showTime2 = false;
            },
            toShowTimeBox() {
                this.showTime = !this.showTime;
            },
            toShowTimeBox2() {
                this.showTime2 = !this.showTime2;
            }

        },

        mounted() {
            queryByPurpose('实验室').then(res => {
                if (res.success) {
                    this.devices = res.data;
                    this.devices.forEach(item => {
                        item.showName = item.deviceName + ' ' + item.deviceModel + ' ' + item.deviceNum;
                    })
                } else {
                    console.log('获取设备失败');
                }
            })
        }
    }
</script>

<style scoped>

</style>