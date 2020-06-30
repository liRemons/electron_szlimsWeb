<template>
	<div class="___relative">
		<!--		<div :class="{eventCover:target==='4'}"></div>-->
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<table class="myTable" ref="ben">
			<tr class="delLine">
				<td rowspan="2">样品编号</td>
				<td rowspan="2">样品名称</td>
				<td rowspan="2">采样量</td>
				<td colspan="2">
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
			</tr>
			<tr v-for="(item, index) in data.valueData.point" :key="index">
				<td><!--样品编号-->
					{{name(item)}}
				</td>
				<td>
					<span>{{item.sampleName}}</span>
				</td>
				<td class="___relative">
					<myInput v-if="item.sysSamplingQuantityUnit!=='件'" @change.native="changeNum(index)" style="width:40px;"
									 :class="(item.sysSamplingQuantityUnit==='g'&&(item.sysSamplingQuantity<1 || item.sysSamplingQuantity>10))
									 || (item.sysSamplingQuantityUnit==='cm²'&&(item.sysSamplingQuantity<1 || item.sysSamplingQuantity>100)) ? 'colorRed':''"
									 v-model="item.sysSamplingQuantity"
									 :defaultValue="item.sysSamplingQuantity"></myInput>
					<span v-else>1</span>
					<div class="___absolute t0" style="width:50px;left:100px;line-height:32px;">
						<selectModel @returnVal="returnVal"
												 :Judge="true"
												 :special="index"
												 :receive="''"
												 :single="true"
												 :rows="false"
												 :transmitText="item.sysSamplingQuantityUnit"
												 :list="['件','cm²','g']" :Obj="''">
						</selectModel>
					</div>
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
				<td style="line-height:32px;">
					<span>{{item.sysUnit}}</span>
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
      err(msg) {
        this.$notify({
          type: 'error',
          message: msg
        });
      },
      changeNum(index) {
        let item1 = parseFloat(this.data.valueData.point[index].item1);
        let item2 = parseFloat(this.data.valueData.point[index].item2);
        let sysSamplingQuantity = parseFloat(this.data.valueData.point[index].sysSamplingQuantity);
        let sysSamplingQuantityUnit = this.data.valueData.point[index].sysSamplingQuantityUnit;
        if (sysSamplingQuantityUnit === 'g' && (sysSamplingQuantity < 1 || sysSamplingQuantity > 10)) {
          this.err('采样量必须在1-10之内')
        } else if (sysSamplingQuantityUnit === 'cm²' && (sysSamplingQuantity < 1 || sysSamplingQuantity > 100)) {
          this.err('采样量必须在1-100之内')
        }
        if (this.isNumber(item1) && this.isNumber(item2) && this.isNumber(sysSamplingQuantity)) {
          let result = '';
          if (item1 === 0 && item2 === 0) {
            if (sysSamplingQuantityUnit === '件') {
              result = (10 / sysSamplingQuantity) > 1 ? '＜' + (10 / sysSamplingQuantity).toFixed46(this.sizeMin([sysSamplingQuantity]), false, true) : '＜1'
            } else {
              result = '＜1';
            }
          } else {
            result = (((item1 + item2) / 2) * 10) / sysSamplingQuantity;
          }
          if (this.isNumber(result)) {
            if (result >= 100) {
              result = parseFloat(result).num2e()
            } else {
              result = parseFloat(result).toFixed46(0);
              if (sysSamplingQuantityUnit === '件') {
                result = result < 10 ? '＜10' : result;
              } else {
                result = result < 1 ? '＜1' : result;
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
        let arr = ['CFU/件', 'CFU/g', 'CFU/cm²'];
        this.data.valueData.point[index].sysSamplingQuantityUnit = val;
        this.data.valueData.point[index].sysUnit = arr.find((item, index) => item.includes(val));
        if ([val].includes('件')) {
          this.data.valueData.point[index].sysSamplingQuantity = 1;
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
