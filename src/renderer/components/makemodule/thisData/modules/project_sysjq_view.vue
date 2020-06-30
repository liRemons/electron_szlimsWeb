<template>
    <div>
        <tr>
            <td>检测日期</td>
            <td :colspan="8"></td>
        </tr>
        <tr>
            <td>检测环境</td>
            <td :colspan="8"></td>
        </tr>
        <tr>
            <td>检测仪器</td>
            <td :colspan="8"></td>
        </tr>
        <tr>
            <td>样品状态</td>
            <td :colspan="8"></td>
        </tr>
        <tr>
            <th>样品编号</th>
            <th>采样体积V（L）</th>
            <th>采样点温度t（℃）</th>
            <th>采样点气压p（kPa）</th>
            <th>峰面积</th>
            <th>空白气浓度（μg/mL）</th>
            <th>解吸气浓度（μg/mL）</th>
            <th>样品浓度ρ（mg/m3）</th>
            <th>报告值ρ（mg/m3）</th>
            <th>相对相差 （%）</th>
        </tr>
    </div>
</template>

<script>
    export default {
        name: "project_sysjq_view.vue",
        data() {
            return {
            }
        },
        props: ['ipdTemplate', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'regressionEquationValue1', 'regressionEquationValue2', 'target'],
        methods: {

        }
    }
</script>

<style scoped>

</style>