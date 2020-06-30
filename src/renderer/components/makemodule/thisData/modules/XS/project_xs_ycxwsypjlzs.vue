<template>
	<div class="___relative">
		<div :class="{eventCover:target==='4'}"></div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<table class="myTable" ref="ben">

			<tr class="delLine">
				<td rowspan="2">样品编号</td>
				<td rowspan="2">样品名称</td>
				<td rowspan="2">取样量</td>
				<td rowspan="2">稀释液量(mL)</td>
				<td colspan="5">
					<myInput style="width:40px;border-bottom: 1px solid;height: 26px;"
									 v-model="data.valueData.sysDilutionDegree"></myInput>
					℃培养
					<myInput style="width:40px;border-bottom: 1px solid;height: 26px;"
									 v-model="data.valueData.sysDilutionHour"></myInput>
					h后各稀释度平皿计数（CFU）
				</td>
				<td rowspan="2">报告值</td>
				<td rowspan="2">单位</td>
			</tr>
			<tr>
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
			</tr>
			<tr v-for="(item, index) in data.valueData.point" :key="index">
				<td><!--样品编号-->
					{{name(item)}}
				</td>
				<td>
					<span>{{item.sampleName}}</span>
				</td>
				<td class="___relative tl">
					<myInput @change.native="changeNum(index)" style="width:50px;" v-model="item.sysSamplingQuantity"
									 :class="item.sysSamplingQuantityUnit==='g'&&(item.sysSamplingQuantity>=11 || item.sysSamplingQuantity<=9) ? 'colorRed':''"
									 :defaultValue="item.sysSamplingQuantity"></myInput>
					<div class="___absolute t0" style="width:50px;left:50px;line-height:32px;">
						<selectModel @returnVal="returnVal"
												 :Judge="true"
												 :special="index"
												 :receive="''"
												 :single="true"
												 :rows="false"
												 :transmitText="item.sysSamplingQuantityUnit"
												 :list="['g','mL']" :Obj="''">
						</selectModel>
					</div>
				</td>
				<td>
					<myInput v-if="item.sysSamplingQuantityUnit!='mL'" @change.native="changeNum(index)"
									 :class="item.sysDiluentQuantity%50!==0 ? 'colorRed':''"
									 style="text-align: center" v-model="item.sysDiluentQuantity"
									 :defaultValue="item.sysDiluentQuantity"></myInput>
					<span v-else>/</span>
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
					<myInput @change.native="changeNum(index)" style="text-align: center" v-model="item.item5"
									 :defaultValue="item.item5"></myInput>
				</td>
				<td>
					<span>{{item.sysReport}}</span>
				</td>
				<td style="line-height:32px;">
					<span>{{item.sysUnit}}</span>
				</td>
			</tr>
			<tr>
				<td>备注</td>
				<td colspan="10">
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
      err(msg) {
        this.$notify({
          type: 'error',
          message: msg
        });
      },
      changeNum(index) {
        let item1 = parseFloat(this.data.valueData.point[index].item1);
        let item2 = parseFloat(this.data.valueData.point[index].item2);
        let item3 = parseFloat(this.data.valueData.point[index].item3);
        let item4 = parseFloat(this.data.valueData.point[index].item4);
        let item5 = parseFloat(this.data.valueData.point[index].item5);
        let sysSamplingQuantity = parseFloat(this.data.valueData.point[index].sysSamplingQuantity);
        let sysSamplingQuantityUnit = this.data.valueData.point[index].sysSamplingQuantityUnit;
        let sysDiluentQuantity = this.data.valueData.point[index].sysDiluentQuantity;
        sysDiluentQuantity = this.isNumber(sysDiluentQuantity) ? sysDiluentQuantity : 1;
        if (sysSamplingQuantityUnit === 'g' && (sysSamplingQuantityUnit >= 11 || sysSamplingQuantityUnit <= 9)) {
          this.err('取样量必须在9.00-11.00之间')
        } else if (sysSamplingQuantityUnit === 'g' && sysDiluentQuantity % 50 !== 0) {
          this.err('稀释液量必须是50的倍数')
        }
        let arr = [item1, item2, item3, item4, item5];
        if ([...arr, sysSamplingQuantity].every((item, index) => {
          return this.isNumber(item)
        })) {
          let result = '';
          if (arr.every((item, index) => {
            return item === 0
          })) {
            result = '＜1';
          } else {
            if (sysSamplingQuantityUnit === 'g') {
              result = (((((item1 + item2 + item3 + item4 + item5) / 5) * sysDiluentQuantity) / sysSamplingQuantity));
            } else if (sysSamplingQuantityUnit === 'mL') {
              result = ((item1 + item2 + item3 + item4 + item5) / 5);
            }
            if (this.isNumber(result)) {
              if (result >= 100) {
                result = parseFloat(result).num2e()
              } else {
                result = parseFloat(result).toFixed46(0)
              }
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
      returnVal(val, name, index) {
        let arr = ['CFU/g', 'CFU/mL'];
        this.data.valueData.point[index].sysSamplingQuantityUnit = val;
        this.data.valueData.point[index].sysUnit = arr.find((item, index) => item.includes(val));
        if (val.includes('mL')) {
          this.data.valueData.point[index].sysSamplingQuantity = '1.0'
        }
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
