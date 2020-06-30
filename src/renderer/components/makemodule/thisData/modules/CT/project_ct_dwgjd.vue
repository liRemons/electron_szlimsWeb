// 定位光精度
<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable" style="margin-bottom: 10px;">
				<tr class="tl">
					<td colspan="5">
						<span class="ml10">{{data.valueData.testProjectChineseName}}</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">标准要求</span>
					</td>
				</tr>
				<tr>
					<td colspan="5" style="text-align: left;padding-left: 10px;">
						<span>验收：±2mm内；状态±3mm内。</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">检测及计算方法</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="5" style="padding-left:10px;line-height: 20px;text-indent: 2em;">
            <span
										style="white-space: normal;"
						>将Catphan500体模中的层厚模块摆放于扫描野中心，使内定位光对准体模上方和侧面的白点，去除定位像后，选择合适的条件进行单次轴扫，获得内定位光标记层的图像。读取图像，调节至最小窗宽，测量最高窗位及背景CT值，调节窗位至半高宽（最高窗位与背景CT值的平均值），观察斜线图像是否左右对称，如果不对称，调节床位后继续扫描，调节至同一窗宽窗位并观察，至斜线图像左右对称为止，记录第一次扫描和最后一次扫描时扫描床的位置，相差即为定位光精度。</span>
					</td>
				</tr>
				<tr>
					<td colspan="5">
						<span class="bold">检测结果</span>
					</td>
				</tr>
				<tr>
					<td rowspan="2">窗宽窗位</td>
					<td>窗宽</td>
					<td>最高窗位</td>
					<td>背景CT 值</td>
					<td>半高宽</td>
				</tr>
				<tr>
					<td>
						<myInput
										:style="{color:(data.valueData.A>1?'red':'#000'),textAlign: 'center'}"
										v-model="data.valueData.A"
										@change.native="verify(data.valueData.A)"
										:defaultValue="data.valueData.A"
						></myInput>
					</td>
					<td>
						<myInput
										style="text-align: center"
										v-model="data.valueData.B"
										@change.native="changeNum(data.valueData)"
										:defaultValue="data.valueData.B"
						></myInput>
					</td>
					<td>
						<myInput
										style="text-align: center"
										v-model="data.valueData.C"
										@change.native="changeNum(data.valueData)"
										:defaultValue="data.valueData.C"
						></myInput>
					</td>
					<td>
						{{data.valueData.D}}

					</td>
				</tr>
				<tr>
					<td rowspan="2">床位及相应图像</td>
					<td>扫描床初始位置</td>
					<td>初始位置图像</td>
					<td>扫描床最终位置</td>
					<td>最终位置图像</td>
				</tr>
				<tr>
					<td>
						<myInput
										style="text-align: center"
										v-model="data.valueData.E"
										:defaultValue="data.valueData.E"
										@change.native="changeChuangNum(data.valueData)"
						></myInput>
					</td>
					<td>
						<selectModel
										@returnVal="returnVal"
										:Judge="true"
										:special="'0'"
										:transmitText="data.valueData.initialPosition"
										:multi-select="false"
										:receive="'id'"
										:single="true"
										:rows="false"
										:list="['左右对称', '顺时针', '逆时针']"
										:Obj="''"
						></selectModel>
					</td>
					<td>
						<myInput
										v-if="data.valueData.initialPosition!='左右对称'"
										style="text-align: center"
										v-model="data.valueData.F"
										:defaultValue="data.valueData.F"
										@change.native="changeChuangNum(data.valueData)"
						></myInput>
						<span v-else>/</span>
					</td>
					<td>
						<el-checkbox
										v-if="data.valueData.initialPosition!='左右对称'"
										v-model="data.valueData.lastPosition"
										@change='changeChuangNum(data.valueData)'
						>左右对称
						</el-checkbox>
						<span v-else>/</span>
					</td>
				</tr>
				<tr>
					<td>定位光精度/mm</td>
					<td colspan="4">
						{{data.valueData.result}}
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
        showInput: false
      };
    },
    computed: {},
    props: [
      "ipdTemplate",
      "pageNumber",
      "data",
      "thisPageIndex",
      "jsonString",
      "showing",
      "watchSign",
      "isTemplate",
      "ableInput",
      "task",
      "target",
      "deviceData"
    ],
    filters: {},
    methods: {
      returnVal(val, name, index) {
        this.data.valueData.initialPosition = val;
        if (this.data.valueData.E != "") {
          if (val == "左右对称") {
            this.data.valueData.result = 0;
          } else {
            this.changeChuangNum(this.data.valueData)
          }
        } else {
          this.data.valueData.G = "请录入扫描床初始位置！";
        }
      },
      noShowInput(el, index) {
        el.target.value = el.target.value.replace(" ", "");
        let val = el.target.value;
        this.data.valueData.deviceType = val;
        if (val === "") {
          this.showInput = false;
        }
        this.$forceUpdate();
      },
      err(msg) {
        this.$notify({
          type: "error",
          message: msg
        });
      },
      verify(i) {
        i = Number(i);
        if (i > 1 || i < 0) {
          this.err('录入值错误')
        }
      },
      isNumber(val) {
        if (parseFloat(val).toString() == "NaN") {
          return false;
        } else {
          return true;
        }
      },
      changeNum(item) {
        if (this.isNumber(item.B) && this.isNumber(item.C)) {
          item.D = ((Number(item.B) + Number(item.C)) / 2).toFixed46(this.size([item.B, item.C]));
        } else {
          item.D = '';
        }
      },
      changeChuangNum(item) {
        console.log(item.lastPosition);
        if (item.E != "") {
          if (item.F != "" && item.lastPosition) {
            item.result = Number(item.F) - Number(item.E);
          } else {
            item.result = "请选择最终图像位置！";
          }
        } else {
          item.result = "请输入扫描床初始位置";
        }
      }
    },
    mounted() {
    }
  };
</script>

<style>
</style>
