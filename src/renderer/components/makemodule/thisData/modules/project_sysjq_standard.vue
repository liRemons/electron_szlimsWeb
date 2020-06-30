<template>
    <table class="myTable" border="1">
        <tr>
            <td rowspan="2">标准物质</td>
            <td>标准物质名称</td>
            <td colspan="2">{{data.valueData.materialName}}</td>
            <td>标准物质编号</td>
            <td colspan="2">{{data.valueData.batchNum}}</td>
        </tr>
        <tr>
            <td>标准实验室编号</td>
            <td colspan="2">{{data.valueData.laboratoryNum}}</td>
            <td>有限期</td>
            <td colspan="2">{{invalidTime}}</td>
        </tr>
        <tr>
            <td>回归方程</td>
            <td colspan="3">{{data.valueData.regressionEquation}}</td>
            <td>相关系数</td>
            <td colspan="2">
                {{this.data.valueData.coefficient}}
            </td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point" :key="index">
            <td v-if="index == 0" :rowspan="data.valueData.point.length">标准系列</td>
            <td colspan="3">{{item.testProject}}</td>
            <td colspan="3">{{item.response}}</td>
        </tr>
    </table>
</template>

<script>
    export default {
        name: "project_sysjq_standard",
        props: ['data'],
        computed: {
            invalidTime(){
                if(!this.data.valueData.invalidTime)return;

                let time = this.data.valueData.invalidTime;
                let arr = time.split(' ');
                return arr[0];
            }
        },
        mounted() {

            this.$emit('redefinition');
        }
    }
</script>

<style scoped>

</style>