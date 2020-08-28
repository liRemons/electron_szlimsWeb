<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable">
				<tr>
					<td>影像增强输入屏视野尺寸(mm)</td>
					<td style="width: 150px;">管电压(kV)</td>
					<td>管电流(mA)</td>
					<td>检测结果(lp/mm)</td>
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
												 :repeat="['view',data.valueData.testProject,data.valueData.multipleId,jsonString]"
												 :transmitText="item.view"
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
					<td class="___relative">
						<myInput style="text-align: center" v-model="item.result" :defaultValue="item.result"></myInput>
						<utilBar
						v-if="btnFlag&&target==0"
										:data="data"
										:index="index"
										:barNum="[limit(), item.isPrototype ? 1: '', 3, 4, item.isPrototype ? 5: '']"
										:jsonString="jsonString"
										:whiteList="['sampleName','flow','flowTime','volume','samplingDianWei','dishSize','Remarks']"
										class="___absolute leftBtn"
										style="left: 245px;top: 5px;"
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
    props: ['ipdTemplate','btnFlag', 'pageNumber', 'data', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'task', 'target', 'deviceData'],
    filters: {},
    methods: {
      returnVal(val, name, index) {
        this.data.valueData.point[index].view = val;
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
