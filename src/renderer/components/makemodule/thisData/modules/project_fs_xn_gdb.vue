<template>
	<div class="___relative" style="padding-top: 20px;" :id="data.valueData.testProjectId">
		<div :class="{eventCover:target != 0}"></div>
		<table border="1" class="myTableReset _normalHeight_">
			<tr>
				<th align="left" colspan="3" class="p20">{{data.valueData.testProjectChineseName}}</th>
			</tr>
			<tr>
				<th class="p20 tc" colspan="3">标准要求</th>
			</tr>
			<tr>
				<td class="p20 tl" align="left" colspan="3">
					验收&状态&稳定性：≥2@数字成像设备。
				</td>
			</tr>
			<tr>
				<th class="p20 tc" colspan="3">检测及计算方法</th>
			</tr>
			<tr>
				<td class="p20" align="left" colspan="3" style="line-height: 16px;">
					对于口内牙片机，将模体置于靠近限束筒出口位置，并使其平面与主射束中心轴垂直；
					对于全景摄影功能，将模体置于头托中心，模体平面与临床受检者正前方向垂直，并
					在X射线球管出线口放置0.8mmCu作为附加衰减层；对于头颅摄影功能，将模体置于受
					检者头颅所在位置，主射束中心轴与测试平面垂直，并在X射线球管出线口放置0.8mmCu
					作为附加衰减层。在高分辨显示器上读取影像，观察可分辨的最高线对组数，模体中高分
					卡的线对数由低到高分别为1.6lp/mm、2.0lp/mm、2.2lp/mm、2.5lp/mm和3.0lp/mm。
				</td>
			</tr>

			<tr>
				<th colspan="3">检测结果</th>
			</tr>
			<tr>
				<td>用途</td>
				<td>检测条件</td>
				<td>检测值/lp/mm</td>
			</tr>
			<tr v-for="(item,index) in data.valueData.point">
				<td style="height:32px;">
					<span>{{item.rows[0]}}</span>
				</td>

				<td align="left" class="___relative">
					<div v-if="item.rows[0]!=''" class="___relative" style="width:75px;margin-left:10px;">
						<divModel v-model="item.rows[1]"
											style="width:50px;text-align: center; border-bottom: 1px solid black; height: 28px;"
											class="Full warp2 rowsInput2 hide focusBg"></divModel>
						<span style="margin-left:55px;">kv</span>
					</div>
					<div v-if="item.rows[0]!=''" class="___absolute t0" style="width:150px;margin-left:100px;">
						<divModel v-model="item.rows[2]"
											style="width:50px;text-align: center; border-bottom: 1px solid black; height: 28px;"
											class="Full warp2 rowsInput2 hide focusBg"></divModel>
						<span style="margin-left:55px;">mA</span>
					</div>
				</td>
				<td>
					<div v-if="item.rows[0]!=''">
						<div v-if="target == 0">
							<selectModel @returnVal="returnVal"
													 :Judge="true"
													 v-if="!item.showInput"
													 :special="index"
													 :multi-select="false"
													 :transmitText="item.rows[3]"
													 :receive="'id'"
													 :single="true"
													 :rows="false"
													 :list="['1.6', '2.0', '2.2', '2.5', '3.0', '自定义']"
													 :Obj="''">
							</selectModel>
							<myInput style="text-align: center" v-else v-model="item.rows[3]"
											 @change.native="(el) => {noShowInput(el, index)}"></myInput>
						</div>
						<div v-else>{{item.rows[3]}}</div>
					</div>
					<div v-else>

					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    data() {
      return {}
    },
    props: ['ipdTemplate', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'task', 'target'],
    methods: {
      returnVal(val, name, index) {
        if (val !== '自定义') {
          this.data.valueData.point[index].rows[3] = val;
        } else {
          this.data.valueData.point[index].showInput = true;
          this.data.valueData.point[index].rows[3] = ' ';
          this.$forceUpdate();
        }
      },
      noShowInput(el, index) {
        el.target.value = el.target.value.replace(' ', '');
        let val = el.target.value;
        this.data.valueData.point[index].rows[3] = val;
        if (val === '') {
          this.data.valueData.point[index].showInput = false;
        }
        this.$forceUpdate();
      }
    },
    components: {},
    computed: {
      ...mapState({
        resolvingPower: state => state.StomatologyLinkage.resolvingPower,
      })
    },
    watch: {
      resolvingPower(data) {
        let point = this.data.valueData.point;
        point.forEach((item, index) => {
          this.$set(item.rows, 0, data[index] ? data[index] : '')
        });
      },
    },
    mounted() {
    }
  }
</script>


<style scoped>

</style>
