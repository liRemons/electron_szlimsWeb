<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative mt20">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable">
				<tr class="tl">
					<td colspan="3">
						<span class="ml10">最大照射野与普通荧光屏尺寸相同时的台屏距</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<span class="bold">标准要求</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="3" style="padding-left:10px;line-height: 16px;">
						<span>验收：≥250@透视荧光屏设备。</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<span class="bold">检测及计算方法</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="3" style="padding-left:10px;line-height: 24px;text-indent:25px;">
						<span>将荧光屏推到距诊断床最近处，将照射野设置为最大，这时照射野应小于荧光屏，在透视条件下，慢慢将<br>荧光屏往远处，当最大照射野等于荧光屏大于时，锁住荧光屏位置。测量床面板至荧光屏后面板（与受检者身<br>体接触的平面）的距离。</span>
					</td>
				</tr>
				<tr>
					<td colspan="3">
						<span class="bold">检测结果</span>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<span>最大照射野与荧光屏尺寸相同时，床面板到屏面板的距离（mm）</span>
					</td>
					<td>
						<myInput style="text-align: center" v-model="data.valueData.distance"
										 :defaultValue="data.valueData.distance"></myInput>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {}
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
