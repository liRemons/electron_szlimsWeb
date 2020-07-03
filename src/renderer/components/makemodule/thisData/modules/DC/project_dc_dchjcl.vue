<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative">
			<div :class="{eventCover:!ableInput}"></div>
			<p>{{data.valueData.correct}}:</p>
			<table class="myTable">
				<tr>
					<td class="___relative tc" rowspan="2" style="width: 50px;line-height:16px;">
						<span>点位<br>序号</span>
					</td>
					<td class="___relative tc" colspan="2" style="width: 100px;">
						<span>与天线的距离(m)</span>
					</td>
					<td class="___relative tc" colspan="6" style="width: 350px;">
						<span>电场强度(V/m)</span>
					</td>
					<td class="___relative tc" rowspan="2" style="width: 80px;line-height: 16px;">
						<span>功率密度S<br>(μW/cm2)</span>
					</td>
					<td class="___relative tc" rowspan="2" style="width: 110px;">
						<span>检测点位名称</span>
					</td>
				</tr>
				<tr>
					<td class="___relative tc">
						<span>水平</span>
					</td>
					<td class="___relative tc">
						<span>垂直</span>
					</td>
					<td class="___relative tc">
						<span>E₁</span>
					</td>
					<td class="___relative tc">
						<span>E₂</span>
					</td>
					<td class="___relative tc">
						<span>E₃</span>
					</td>
					<td class="___relative tc">
						<span>E₄</span>
					</td>
					<td class="___relative tc">
						<span>E₅</span>
					</td>
					<td class="___relative tc">
						<span>E</span>
					</td>
				</tr>
				<tr v-for="(item,index) in data.valueData.point">
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[0]" :defaultValue="item.rows[0]"></myInput>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[1]" :defaultValue="item.rows[1]"></myInput>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[2]" :defaultValue="item.rows[2]"></myInput>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[3]"
										 @change.native="changeNum(index)"
										 :defaultValue="item.rows[3]"></myInput>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[4]"
										 @change.native="changeNum(index)"
										 :defaultValue="item.rows[4]"></myInput>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[5]"
										 @change.native="changeNum(index)"
										 :defaultValue="item.rows[5]"></myInput>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[6]"
										 @change.native="changeNum(index)"
										 :defaultValue="item.rows[6]"></myInput>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[7]"
										 @change.native="changeNum(index)"
										 :defaultValue="item.rows[7]"></myInput>
					</td>
					<td class="___relative tc">
						<div>{{item.rows[8]}}</div>
					</td>
					<td class="___relative tc">
						<div>{{item.rows[9]}}</div>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.rows[10]" :defaultValue="item.rows[10]"></myInput>
						<div class="___absolute toolBar" style="left: 165px;top:0; width: 180px;" v-if="target ==0">
							<div title="往指定行后面增加一行" class="___absolute tc" @click="addRow(index,2,item.heBingId)">+</div>
							<div title="删除当前行"
									 class="___absolute tc"
									 style="left: 30px;"
									 @click="deleteRow(index,item)">-
							</div>
							<div title="复制部分数据"
									 class="___absolute tc"
									 style="left: 60px;"
									 @click="copyRow(index, 'copy')">c
							</div>
							<div title="复制全部数据"
									 class="___absolute tc"
									 style="left: 90px;"
									 @click="copyRow(index, 'copyAll')">C
							</div>
							<div title="粘贴数据"
									 class="___absolute tc"
									 style="left: 120px;"
									 @click="pasteRow(index)">p
							</div>
							<div title="生成重复样"
									 class="___absolute tc"
									 style="left: 150px;"
									 @click="addSample(index)"
									 v-if="item.isPrototype">r
							</div>
						</div>
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
        selectItem: '',
        selectItemIndex: '',
        sampleOption: '',
      }
    },
    computed: {},
    props: ['ipdTemplate', 'pageNumber', 'data', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput', 'task', 'target', 'deviceData'],
    filters: {},
    methods: {
      changeNum(index) {
        let item1 = this.data.valueData.point[index].rows[3];
        let item2 = this.data.valueData.point[index].rows[4];
        let item3 = this.data.valueData.point[index].rows[5];
        let item4 = this.data.valueData.point[index].rows[6];
        let item5 = this.data.valueData.point[index].rows[7];
        let arr = this.JudgeNum([item1, item2, item3, item4, item5]);
        if (arr.length === 5) {
          let average = this.average(arr);
          this.$set(this.data.valueData.point[index].rows, 8, average);
          this.$set(this.data.valueData.point[index].rows, 9, (((average * average) / (Math.PI * 120)) * 100).toFixed46(2));
        }
      },
      addRow(index) {
        let row = JSON.parse(JSON.stringify(this.data.modelRow));
        row.pointId = window.uuid();
        row.foreverId = window.uuid();
        this.data.valueData.point.splice(index + 1, 0, row);
        this.$emit('redefinition');
      },
      deleteRow(index) {
        if (this.data.valueData.point.length > 1) {
          this.$confirm('确认删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            modal: false,
          }).then(({}) => {
            this.data.valueData.point.splice(index, 1);
            this.$emit("redefinition");
          });
        }
      },
      copyRow(index, copyName) {
        let obj = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
        sessionStorage.setItem("copy", copyName);
        sessionStorage.setItem("cyhjRowData", JSON.stringify(obj));
      },
      pasteRow(index) {
        let newObjData = JSON.myParse(sessionStorage.getItem("cyhjRowData"));
        newObjData.pointId = window.uuid();
        newObjData.foreverId = window.uuid();
        let keys = Object.keys(this.data.valueData.point[index]);
        let copy = sessionStorage.getItem("copy");
        keys.forEach(item => {
          if (copy === "copyAll") {
            this.data.valueData.point[index][item] = newObjData[item];
          } else {
            let noCopy = this.data.noCopyArr;
            let result = noCopy.some(key => key === item);
            if (newObjData[item] && result === false) {
              this.data.valueData.point[index][item] = newObjData[item];
            }
          }
        });
        setTimeout(() => {
          this.$eventBus.$emit("showText");
        }, 10);
      },
      addSample(index) {
        this.selectItem = this.data.valueData.point[index];
        this.selectItemIndex = index;
        this.sampleOption = true;
      },
    },
    mounted() {
    }
  };
</script>

<style>
	/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
	.btn2 {
		width: 50px;
		height: 32px;
		line-height: 32px;
		background: gray;
		cursor: pointer;
		user-select: none;
		color: white;
		border-radius: 2px;
	}

	.red {
		color: red;
	}

</style>
