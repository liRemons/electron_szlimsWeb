<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable">
				<tr>
					<td rowspan="2" style="width:140px;" class="___relative hide">
						<p class="w100 ___absolute" style="right:-30px;top:0;">测量值</p>
						<p class="w100 ___absolute" style="left:-30px;bottom:0;">检测条件</p>
						<div style="width:155px;height:1px;background:black;transform: rotate(25deg);left:-7px;"
								 class="___relative"></div>
					</td>
					<td colspan="2" rowspan="2">
						<div class="___relative">
							<el-radio v-model="data.valueData.radio" label="1">只改变mA</el-radio>
						</div>
						<div class="___relative">
							<el-radio v-model="data.valueData.radio" label="2">同时改变kV和mA</el-radio>
						</div>
					</td>
					<td colspan="4">
						<el-radio v-model="data.valueData.radio" label="3">只改变kV</el-radio>
					</td>
				</tr>
				<tr>
					<td colspan="2">低管电流</td>
					<td colspan="2">高管电流</td>
				</tr>
				<tr>
					<td>检测条件</td>
					<td>b小照射野</td>
					<td>b大照射野</td>
					<td>b小照射野</td>
					<td>b大照射野</td>
					<td>b小照射野</td>
					<td>b大照射野</td>
				</tr>
				<tr v-for="(item,index) in data.valueData.point">
					<td>
						<span>{{item.testingConditions}}</span>
					</td>
					<td>
						<div class="___relative" v-if="data.valueData.radio==='1' || data.valueData.radio==='2'">
							<myInput @change.native="changeNum(index,1)"
											 v-if="index!==2"
											 style="text-align: center"
											 v-model="item.val1" :defaultValue="item.val1"></myInput>
							<span v-else>{{item.val1}}</span>
						</div>
					</td>
					<td>
						<div class="___relative" v-if="data.valueData.radio==='1' || data.valueData.radio==='2'">
							<myInput @change.native="changeNum(index,2)"
											 v-if="index!==2"
											 style="text-align: center"
											 v-model="item.val2" :defaultValue="item.val2"></myInput>
							<span v-else>{{item.val2}}</span>
						</div>
					</td>
					<td>
						<div class="___relative" v-if="data.valueData.radio==='3'">
							<myInput @change.native="changeNum(index,3)"
											 v-if="index!==2"
											 style="text-align: center"
											 v-model="item.val3" :defaultValue="item.val3"></myInput>
							<span v-else>{{item.val3}}</span>
						</div>
					</td>
					<td>
						<div class="___relative" v-if="data.valueData.radio==='3'">
							<myInput @change.native="changeNum(index,4)"
											 v-if="index!==2"
											 style="text-align: center"
											 v-model="item.val4" :defaultValue="item.val4"></myInput>
							<span v-else>{{item.val4}}</span>
						</div>
					</td>
					<td>
						<div class="___relative" v-if="data.valueData.radio==='3'">
							<myInput @change.native="changeNum(index,5)"
											 v-if="index!==2"
											 style="text-align: center"
											 v-model="item.val5" :defaultValue="item.val5"></myInput>
							<span v-else>{{item.val5}}</span>
						</div>
					</td>
					<td class="___relative">
						<div class="___relative" v-if="data.valueData.radio==='3'">
							<myInput @change.native="changeNum(index,6)"
											 v-if="index!==2"
											 style="text-align: center"
											 v-model="item.val6" :defaultValue="item.val6"></myInput>
							<span v-else>{{item.val6}}</span>
						</div>
						<!--						<utilBar-->
						<!--										:data="data"-->
						<!--										:index="index"-->
						<!--										:barNum="[0, item.isPrototype ? 1: '', 3, 4, item.isPrototype ? 5: '']"-->
						<!--										:jsonString="jsonString"-->
						<!--										:whiteList="['sampleName','flow','flowTime','volume','samplingDianWei','dishSize','Remarks']"-->
						<!--										class="___absolute"-->
						<!--										style="left: 160px;top: 5px;"-->
						<!--						></utilBar>-->
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
    methods: {
      isNumber(val) {
        if (parseFloat(val).toString() == "NaN") {
          return false;
        } else {
          return true;
        }
      },
      changeNum(index, num) {
        let A = parseFloat(this.data.valueData.point[0]['val' + num]);
        let B = parseFloat(this.data.valueData.point[1]['val' + num]);
        if (this.isNumber(A) && this.isNumber(B)) {
          this.data.valueData.point[2]['val' + num] = (((A - B) / ((A + B) / 2)) * 100).toFixed46(1);
        } else {
          this.data.valueData.point[2]['val' + num] = '';
        }
      },
    },
    mounted() {
    }
  };
</script>

<style>
</style>
