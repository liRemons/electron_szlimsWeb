<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative mt20">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable">
				<tr class="tl">
					<td colspan="5">
						<span class="ml10">透视荧光屏灵敏度</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">标准要求</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="5">
						<span>验收：≥0.11@透视荧光屏设备；状态：≥0.08@透视荧光屏设备。</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">检测及计算方法</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="5" style="padding-left:10px;line-height: 24px;text-indent:25px;">
						<span>将剂量仪的探测器紧贴在荧光屏入射面的照射野（如有滤线栅，应在其后面），以60kV，3mA照射，测得荧光<br>屏入射面的空气比释动能率K。相同条件下，用亮度计测量荧光屏的亮度b。透视荧光屏灵敏度<br>计算公式：B=（b*f）/K。</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">检测结果</span>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        showInput: false,
      }
    },
    computed: {},
    props: ['ipdTemplate', 'pageNumber', 'data', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'task', 'target', 'deviceData'],
    filters: {},
    methods: {},
    mounted() {
    }
  };
</script>

<style>
</style>
