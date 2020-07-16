<template>
	<div class="___relative" style="padding-top: 20px;">
		<div :class="{eventCover:target != 0}"></div>
		<table border="1" class="myTableReset _normalHeight_">
			<tr>
				<th align="left" colspan="7" class="p20">{{data.valueData.testProjectChineseName}}</th>
			</tr>
			<tr>
				<th class="p20 tc" colspan="7">标准要求</th>
			</tr>
			<tr>
				<td class="p20 tl" colspan="7">
					验收&状态&稳定性：±5%内或±20ms取较大者@口内机；±（5%+50ms）内@口外机。
				</td>
			</tr>
			<tr>
				<th class="p20 tc" colspan="7">检测及计算方法</th>
			</tr>
			<tr>
				<td class="p20 tl" colspan="7" style="line-height:16px;">
					检测方法同管电压指示的偏离项目。以设备常用成人曝光条件进行检测。加载时间的偏离
					（ms）=加载时间测量平均值-加载时间。加载时间的偏离（%）=（加载时间测量平均值-
					加载时间）/加载时间×100%。
				</td>
			</tr>
			<tr>
				<th colspan="7" align="center">
					<div class="___relative">
						<div class="___absolute" style="left: 300px;">检测结果 /</div>
						<div>
							<selectModel @returnVal="returnVal"
													 :Judge="true"
													 style="left: 30px; width: 50px;"
													 :multi-select="false"
													 :receive="''"
													 :single="true"
													 :rows="false"
													 :transmitText="'ms'"
													 :list="['ms', 's']"
													 :Obj="''">
							</selectModel>
						</div>
					</div>
				</th>
			</tr>
			<tr>
				<td rowspan="2" align="center">预设值/{{data.valueData.unit}}</td>
				<td colspan="3" align="center">曝光时间测量值/{{data.valueData.unit}}</td>
				<td rowspan="2" align="center">平均值/{{data.valueData.unit}}</td>
				<td rowspan="2" align="center">偏离/{{data.valueData.unit}}</td>
				<td rowspan="2" align="center">偏离度/%</td>
			</tr>
			<tr>
				<td align="center">1</td>
				<td align="center">2</td>
				<td align="center">3</td>
			</tr>
			<tr v-for="(item,index) in data.valueData.point">
				<td>
					<divModel v-model="item.rows[0]" style="width:100%;text-align: center;"
										class="moduleInput hide focusBg"></divModel>
				</td>
				<td>
					<divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
										class="moduleInput hide focusBg"></divModel>
				</td>
				<td>
					<divModel v-model="item.rows[2]" style="width:100%;text-align: center;"
										class="moduleInput hide focusBg"></divModel>
				</td>
				<td>
					<divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
										class="moduleInput hide focusBg"></divModel>
				</td>
				<td>
					<divModel v-model="item.rows[4]"
										style="width:100%;text-align: center;"
										class="moduleInput hide focusBg"
										:edit="false"
										:is-computer="true"
										:computers="changeNum(item.rows[0],item.rows[1],item.rows[2],item.rows[3],index)"
										:computerFormula="'gs11'">
					</divModel>
				</td>
				<td>
					<div style="width:100%;text-align: center;" class="moduleInput hide focusBg">{{item.rows[5]}}</div>
				</td>
				<td class="___relative">
					<div style="width:100%;text-align: center;" class="moduleInput hide focusBg">{{item.rows[6]}}</div>
					<div class="__functionBox" v-if="index!=data.valueData.point.length-1&&ipdTemplate=='ipdTemplate'"
							 style="right:-70px;width: 20px;z-index:100">
						<div class="__functionButton6" @dblclick="reduce(index)" style="right:0;">
							<span>-</span>
						</div>
					</div>
				</td>
			</tr>
			<tr>
				<th colspan="7" align="center">备注信息</th>
			</tr>
			<tr>
				<td colspan="7">
					<divModel v-model="data.valueData.remarks" style="width:100%;text-align: center;"
										class="moduleInput hide focusBg"></divModel>
				</td>
			</tr>
		</table>

		<div class="__functionBox" style="bottom:69px;" v-if="ipdTemplate=='ipdTemplate' && target == 0">
			<div class="__functionButton6" @dblclick="reduce(data.valueData.point.length-1)" style="right:30px;">
				<span>-</span>
			</div>
			<div class="__functionButton6" @dblclick="increase">
				<span>+</span>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        content1: "重点测量临床常用时间档进行检测，选择100ms以下测量1档，100ms及以上测量1档。偏差=曝光时间测量值-曝光时间预设值；相对偏差=（偏差/曝光时间预设值）×100%。 ",
        content2: "以设备常用成人曝光条件进行检测。偏差=曝光时间测量值-曝光时间预设值；相对偏差=（偏差/曝光时间预设值）×100%。",
        content3: "选择常用的曝光时间设置值，选择200ms以上测量1档，200ms及以下测量1档，读取曝光时间测量值。偏差=曝光时间测量值-曝光时间预设值；相对偏差=（偏差/曝光时间预设值）×100%。 "
      }
    },
    props: ['ipdTemplate', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'target'],
    computed: {
      mode() {
        this.jsonString.find(item => item.to === 'project_jcxcxx').data.valueData.point.map(item => item.exposureMode);
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
      reduce(index) {
        if (this.data.valueData.point.length > 1) {
          this.data.valueData.point.splice(index, 1);
          this.$emit('redefinition');
        }
      },
      isNumber(val) {
        if (parseFloat(val).toString() == "NaN") {
          return false;
        } else {
          return true;
        }
      },
      getDetailContent() {
        let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
        let arr2 = ["口内牙片机"];
        let arr3 = ["全景扫描", "头颅摄影"];
        let arr4 = ["乳腺屏片"];

        if (this.computeObj.intersect(this.mode, arr1).length > 0) {
          return "验收&稳定性：±10.0%内@t≥100ms；±2ms或±15.0%内@t＜100ms。"
        } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
          return "验收&状态&稳定性：±5%内或±20ms取较大者@口内机；"
        } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {
          return "验收&状态&稳定性：±（5%+50ms）内@口外机。"
        } else if (this.computeObj.intersect(this.mode, arr4).length > 0) {
          return "验收：±10%内@＞200ms，±15%内@≤200ms。 "
        } else {
          return ""
        }
      },
      getDetailContent2() {
        let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
        let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];
        let arr3 = ["乳腺屏片摄影"];
        if (this.computeObj.intersect(this.mode, arr1).length > 0) {
          return this.content1;
        } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
          return this.content2;
        } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {
          return this.content3;
        } else {
          return ""
        }
      },
      returnVal(val) {
        this.data.valueData.unit = val;
        this.$forceUpdate();
      },
      judgeNum(arr) {
        let calculation = [];
        arr.forEach((item, index) => {
          if (this.isNumber(item)) {
            calculation.push(parseFloat(item))
          }
        });
        return calculation
      },
      average(arr) {
        let calculation = this.judgeNum(arr);
        let total = 0;
        calculation.forEach((item, index) => {
          total += parseFloat(item)
        });
        return (total / calculation.length)
      },
      changeNum(num1, num2, num3, num4, index) {
        let loadingTime = num1;
        let arr = [num2, num3, num4];
        let calculation = this.judgeNum(arr);
        let average = this.average(calculation).toFixed46(this.size(calculation), false, true);
        if (this.isNumber(average) && this.isNumber(loadingTime)) {
          this.data.valueData.point[index].rows[4] = average;
          this.data.valueData.point[index].rows[5] = (average - loadingTime).toFixed46(2, false, true);
          this.data.valueData.point[index].rows[6] = (((average - loadingTime) / loadingTime) * 100).toFixed46(2, false, true);
        }
      },
      increase() {
        let obj = {
          rows: ['', '', '', '', '', '', '']
        };
        this.data.valueData.point.push(obj);
        this.$emit('redefinition');
      },
    },
    components: {},
    mounted() {

    }
  }
</script>


<style scoped>

</style>
