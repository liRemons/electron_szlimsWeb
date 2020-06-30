<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable">
				<tr>
					<td style="width: 180px;">影像增强输入屏视野尺(mm)</td>
					<td>管电压(kV)</td>
					<td>管电流(mA)</td>
					<td>厚铝板数量</td>
					<td>检测结果</td>
				</tr>
				<tr v-for="(item,index) in data.valueData.point">
					<td>
						<selectModel @returnVal="returnVal"
												 v-if="data.valueData.sizeList.split(',')[0]!==''"
												 :Judge="true"
												 :special="index"
												 :receive="''"
												 :single="true"
												 :rows="false"
												 :transmitText="item.view"
												 :repeat="['view',data.valueData.testProject,data.valueData.multipleId,jsonString]"
												 :list="data.valueData.sizeList.split(',')" :Obj="''">
						</selectModel>
					</td>
					<td>
						<myInput style="text-align: center" v-model="item.voltage" :defaultValue="item.voltage"></myInput>
					</td>
					<td>
						<myInput style="text-align: center" v-model="item.electricCurrent"
										 :defaultValue="item.electricCurrent"></myInput>
					</td>
					<td>
						<selectModel @returnVal="returnVal2"
												 :Judge="true"
												 :special="index"
												 :receive="''"
												 :single="true"
												 :rows="false"
												 :transmitText="item.num"
												 :list="[1,2]" :Obj="''">
						</selectModel>
					</td>
					<td class="___relative">
						<div class="___relative">
							<div class="___absolute t0" style="width: 40px;">{{item.result1}}</div>
							<span style="margin-left:40px;">%</span>
							<div class="___absolute t0" style="width: 40px;left:60px;">
								<selectModel @returnVal="returnVal3"
														 :Judge="true"
														 :special="index"
														 :receive="''"
														 :single="true"
														 :rows="false"
														 :transmitText="item.result2"
														 :list="[1.5,3,5,7]" :Obj="''">
								</selectModel>
							</div>
							<span style="margin-left:50px;">mm</span>
						</div>
						<utilBar
										:data="data"
										:index="index"
										:barNum="[limit(), item.isPrototype ? 1: '', 3, 4, item.isPrototype ? 5: '']"
										:jsonString="jsonString"
										:whiteList="['sampleName','flow','flowTime','volume','samplingDianWei','dishSize','Remarks']"
										class="___absolute"
										style="left: 190px;top: 5px;"
						></utilBar>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        showInput: false,
      }
    },
    props: ['ipdTemplate', 'pageNumber', 'data', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'task', 'target', 'deviceData'],
    filters: {},
    methods: {
      returnVal(val, name, index) {
        this.data.valueData.point[index].view = val;
      },
      returnVal2(val, name, index) {
        this.data.valueData.point[index].num = val;
        this.data.valueData.point[index].result1 = val == 1 ? 4 : 2
      },
      returnVal3(val, name, index) {
        this.data.valueData.point[index].result2 = val;
      },
      limit() {
        let point = [];
        this.jsonString.forEach((item, index) => {
          if (item.to === this.data.valueData.testProject && item.data.valueData.multipleId === this.data.valueData.multipleId) {
            point.push(...item.data.valueData.point)
          }
        });
        if (this.data.valueData.sizeList === '') return '';
        if (this.data.valueData.sizeList.split(',').length > point.length) {
          return 0
        } else {
          return ''
        }
      },
    },
    computed: {
      ...mapState({
        sizeList: state => state.StomatologyLinkage.sizeList,
      })
    },
    watch: {
      sizeList(val) {
        this.data.valueData.sizeList = val;
        if (this.data.valueData.point[0].view === '') {
          this.data.valueData.point[0].view = Math.max(...val.split(','));
        }
      },
    },
    mounted() {
    }
  };
</script>

<style>
</style>
