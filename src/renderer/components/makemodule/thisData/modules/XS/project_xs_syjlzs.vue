<template>
	<div class="___relative">
		<div :class="{eventCover:target==='4'}"></div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<table class="myTable" ref="ben">
			<tr class="delLine">
				<td rowspan="2" style="width:200px;">样品编号</td>
				<td rowspan="2">样品名称</td>
				<td colspan="4" style="width:350px;">各稀释度平皿计数(CFU)</td>
				<td rowspan="2">报告值(CFU/只手)</td>
			</tr>
			<tr>
				<td colspan="2">1:1</td>
				<td colspan="2">1:10</td>
			</tr>
			<tr v-for="(item, index) in data.valueData.point" :key="index">
				<td><!--样品编号-->
					{{name(item)}}
				</td>
				<td>
					<span>{{item.sampleName}}</span>
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
					<myInput @change.native="changeNum(index)" style="text-align: center" v-model="item.item3"
									 :defaultValue="item.item3"></myInput>
				</td>
				<td>
					<myInput @change.native="changeNum(index)" style="text-align: center" v-model="item.item4"
									 :defaultValue="item.item4"></myInput>
				</td>
				<td>
					<span>{{item.sysReport}}</span>
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td colspan="6">
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
        let item3 = parseFloat(this.data.valueData.point[index].item3);
        let item4 = parseFloat(this.data.valueData.point[index].item4);
        let arr = [item1, item2, item3, item4];
        if (arr.every((item, index) => {
          return this.isNumber(item)
        })) {
          let result = '';
          if (arr.every((item, index) => {
            return item === 0
          })) {
            result = '＜1';
          } else {
            let Judge = [];
            let itemArr = [[item1, item2], [item3, item4]];
            itemArr.forEach((item, index) => {
              if (item[0] >= 30 && item[0] <= 300 && item[1] >= 30 && item[1] <= 300) {
                Judge.push(index)
              }
            });
            if (Judge.length === 1) {
              let multiple = Judge[0] === 0 ? 1 : 10;
              result = (((itemArr[Judge[0]][0] + itemArr[Judge[0]][1]) / 2) * multiple)
            } else if (Judge.length === 2) {
              let num = (((item3 + item4) / 2) * 10) / ((item1 + item2) / 2);
              if (num < 2) {
                result = (((item1 + item2) + ((item3 + item4) * 10)) / 4)
              } else {
                result = ((item1 + item2) / 2)
              }
            } else {
              let range = [];
              itemArr.forEach((item, index) => {
                let numArr = [];
                let num = (item[0] > 300 ? item[0] - 300 : Math.abs(item[0] - 30)) + (item[1] > 300 ? item[1] - 300 : Math.abs(item[1] - 30));
                numArr.push(...[num, index]);
                range.push(numArr)
              });
              let numSet = Array.from(new Set([range[0][0], range[1][0]]));
              if (numSet.length === 2) {
                if (range[0][0] < range[1][0]) {
                  result = ((item1 + item2) / 2);
                } else {
                  result = (((item3 + item4) / 2) * 10);
                }
              } else {
                if ((item1 + item2) > (item3 + item4)) {
                  result = ((item1 + item2) / 2);
                } else {
                  result = (((item3 + item4) / 2) * 10);
                }
              }
            }
          }
          result = result < 1 ? '＜1' : result;
          if (this.isNumber(result)) {
            if (result >= 100) {
              result = parseFloat(result).num2e()
            } else {
              result = parseFloat(result).toFixed46(0)
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
