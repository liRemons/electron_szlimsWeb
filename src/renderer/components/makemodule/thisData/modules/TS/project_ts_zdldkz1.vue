<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative mt20">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable">
				<tr class="tl">
					<td colspan="5">
						<span class="ml10">自动亮度控制</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">标准要求</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="5" style="padding-left:10px;line-height: 16px;">
						<span>验收：平均值±10%；状态：平均值±15%；稳定性：基线值±30%内。</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">检测及计算方法</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="5" style="padding-left:10px;line-height: 24px;text-indent:25px;">
						<span>将一块厚20mm的铝板访在诊断床上，照射野调节到略小于铝板，在自动亮度控制条件下，用亮度计测量监视<br>器的荧
							    屏亮度并记录。增加一块1.5mm铜板，在不改变其它条件的情况下，再次测量监视器的荧屏亮度并记录。<br>改变照射野尺寸
									至约原来的一半，重复上述检测过程。如果该系统只通过改变管电压自动调节亮度，则应检测低<br>电流(如1mA)和高电流(如
									4mA)两种情况下进行检测，如果该系统是通过改变管电流自动调节亮度，则检测80kV时<br>的电流补偿情况。亮度变化率计：亮度变化率=</span>
						<img src="../../../../../assets/img/formula_5.png" height="32" width="164"/></td>
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
