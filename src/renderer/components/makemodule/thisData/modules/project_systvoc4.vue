<template>
	<div>
		<div class="___relative" style="border:1px solid black;border-bottom:none">
			<div class="___relative tc" style="width:80px;line-height:32px;">
				<span>稀释倍数</span>
			</div>
			<div class="___absolute t0" style="width:100px;left:80px;line-height:32px;">
				<div>{{data.valueData.sysSolutionMultiple}}</div>
			</div>
		</div>
		<table class="myTable" border="1">
			<tr>
				<th style="width: 160px;line-height: 16px;">
					<p v-if="data.valueData.divisionNum!=''">样品编号：{{data.valueData.divisionNum}}</p>
					<p v-if="data.valueData.kbSampleNum!=''">样品编号：{{data.valueData.kbSampleNum}}</p>
				</th>
				<th>采样体积V(L)</th>
				<th>采样点温度t(℃)</th>
				<th>采样点气压p(kPa)</th>
				<th style="width:50px;">峰面积</th>
				<th>解吸气浓度(μg/mL)</th>
				<th>空白气浓度(μg/mL)</th>
				<th>样品浓度ρ(mg/m3)</th>
				<th>报告值ρ(mg/m3)</th>
				<th style="width: 80px;">相对相差(%)</th>
			</tr>
			<tr v-for="item in data.valueData.point">
				<td>{{item.testProject}}</td>
				<td>{{item.volume}}</td>
				<td>{{item.temperature}}</td>
				<td>{{item.atmosphericPressure}}</td>
				<td v-if="!item.testProject.includes('TVOC总计')">{{item.sysArea}}</td>
				<td v-else>/</td>
				<td v-if="item.sysSuckConcentration != ''">{{item.sysSuckConcentration}}</td>
				<td v-else>/</td>
				<td v-if="item.sysBlankConcentration != ''">{{item.sysBlankConcentration}}</td>
				<td v-else>/</td>
				<td v-if="item.sysConcentration != ''">{{item.sysConcentration}}</td>
				<td v-else>/</td>
				<td v-if="item.testProject === 'TVOC总计'">{{item.sysReport}}</td>
				<td v-else-if="item.testProject === 'TVOC总计-A'" rowspan="2">{{item.sysReport}}</td>
				<td v-else-if="item.testProject !== 'TVOC总计-B'">/</td>
				<td v-if="item.testProject === 'TVOC总计-A'" rowspan="2">{{item.sysDifference}}</td>
				<td v-else-if="item.testProject !== 'TVOC总计-B'">/</td>
			</tr>
		</table>
	</div>
</template>

<script>
  export default {
    name: "project_sysan4.vue",
    props: ['data'],
    computed: {},
    mounted() {
      console.log(this.data)
    }
  }
</script>

<style scoped>

</style>
