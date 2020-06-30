<template>
	<table class="myTable">
		<tr>
			<td>
				收样日期
			</td>
			<td>
				{{data.valueData.labPickSampleTime}}
			</td>
		</tr>
		<tr>
			<td>
				检测项目
			</td>
			<td>
				{{data.valueData.testProjectName}}
			</td>
		</tr>
		<tr>
			<td>
				检测依据
			</td>
			<td>
				{{data.valueData.standardName}}
			</td>
		</tr>
		<tr>
			<td>
				样品处理
			</td>
			<td>
				{{data.valueData.sampleHandle}}
			</td>
		</tr>
		<tr style="height: 100px;">
			<td>
				计算公式
			</td>
			<td>
				<img :src="data.valueData.formulas" alt="">
			</td>
		</tr>
	</table>
</template>

<script>
  export default {
    name: "head_wsw.vue",
    props: ['data']
  }
</script>

<style scoped>

</style>
