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
			<td style="height:64px !important;white-space: normal">
				{{data.valueData.standardName}}
			</td>
		</tr>
		<tr>
			<td>
				实验过程
			</td>
			<td style="height:64px !important;white-space: normal">
				{{data.valueData.sampleHandle}}
			</td>
		</tr>
		<tr style="height: 100px;">
			<td>
				计算公式
			</td>
			<td>
				<img style="max-height:64px" :src="data.valueData.formulas" alt="">
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
