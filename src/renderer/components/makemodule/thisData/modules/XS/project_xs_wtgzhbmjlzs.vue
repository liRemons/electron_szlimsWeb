<template>
	<div class="___relative">
		<div :class="{eventCover:target==='4'}"></div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<table class="myTable" ref="ben">

			<tr class="delLine">
				<td rowspan="2">样品编号</td>
				<td rowspan="2">样品名称</td>
				<td rowspan="2">采样面积</td>
				<td colspan="2">
					<myInput style="width:40px;border-bottom: 1px solid;height: 26px;"
									 v-model="data.valueData.sysDilutionDegree"></myInput>
					℃培养
					<myInput style="width:40px;border-bottom: 1px solid;height: 26px;"
									 v-model="data.valueData.sysDilutionHour"></myInput>
					h后各稀释度平皿计数（CFU）
				</td>
				<td rowspan="2">报告值(CFU/只手)</td>
			</tr>
			<tr>
				<td>1</td>
				<td>2</td>
			</tr>
			<tr v-for="(item, index) in data.valueData.point" :key="index">
				<td><!--样品编号-->
					{{name(item)}}
				</td>
				<td>
					<span>{{item.sampleName}}</span>
				</td>
				<td class="___relative">
					<span>{{item.volume}}</span>
				</td>
				<td>
					<myInput @change.native="changeNum(index)" style="text-align: center" v-model="item.item1"
									 :defaultValue="item.item1"></myInput>
				</td>
				<td>
					<myInput @change.native="changeNum(index)" style="text-align: center" v-model="item.item2"
									 :defaultValue="item.item2"></myInput>
				</td>
				<td>
					<span>{{item.sysReport}}</span>
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td colspan="5">
					<myInput v-model="data.valueData.remarks" :defaultValue="data.valueData.remarks"></myInput>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
  import projectHead from "../../project_head";

  export default {
    data() {
      return {
        showTime: false,
        devices: [],
        testTiem: ""
      }
    },
    components: {
      projectHead
    },
    props: ['ipdTemplate', 'data', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'target', 'detectionLimitObj'],
    methods: {
      headShow() {
        if (this.pageNumber > 0) {
          if (this.thisPageIndex == 0) {
            let showlLen = this.showing[this.pageNumber - 1].length - 1;
            if (this.showing[this.pageNumber - 1][showlLen].to !== this.data.valueData.testProject) {
              return true
            } else {
              return false
            }
          } else {
            if (this.showing[this.pageNumber][this.thisPageIndex - 1].to !== this.data.valueData.testProject) {
              return true
            } else {
              return false
            }
          }
        } else {
          return true;
        }
      },
      isNumber(val) {
        if (parseFloat(val).toString() == "NaN") {
          return false;
        } else {
          return true;
        }
      },
      changeNum(index) {
        let item1 = parseFloat(this.data.valueData.point[index].item1);
        let item2 = parseFloat(this.data.valueData.point[index].item2);
        let volume = parseFloat(this.data.valueData.point[index].volume);
        // let volume = 25;
        volume = this.isNumber(volume) ? volume : 1;
        if (this.isNumber(item1) && this.isNumber(item2)) {
          let result = '';
          if (item1 === 0 && item2 === 0) {
            result = '＜1'
          } else {
            result = ((((item1 + item2) / 2) * 10) / volume);
          }
          if (this.isNumber(result)) {
            if (result >= 100) {
              result = parseFloat(result).num2e()
            } else {
              result = parseFloat(result).toFixed46(0);
              result = result < 1 ? '＜1' : result
            }
          }
          this.data.valueData.point[index].sysReport = result;
        } else {
          this.data.valueData.point[index].sysReport = '';
        }
      },
      name(item) {
        let name = `${item.sampleNum}${item.sampleNumIndex ? item.sampleNumIndex : ''}${item.parallelLetter}`;
        return name.replace(/\s*/g, "");
      },
    },
    computed: {},
    mounted() {
      setTimeout(() => {
        this.$forceUpdate();
      }, 300)
    }
  }
</script>

<style scoped>

</style>
