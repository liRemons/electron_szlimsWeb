// 均匀性
<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative">
			<div :class="{eventCover:!ableInput}"></div>
			<table class="myTable" style="margin-bottom: 10px;">
				<tr class="tl">
					<td colspan="7">
						<span class="ml10">{{data.valueData.testProjectChineseName}}</span>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<span class="bold">标准要求</span>
					</td>
				</tr>
				<tr>
					<td colspan="7" style="text-align: left;padding-left: 10px;">
						<span>验收：±5HU内；状态：±6HU内；稳定性：与基线值相差±2HU内。</span>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<span class="bold">检测及计算方法</span>
					</td>
				</tr>
				<tr class="tl">
					<td colspan="7" style="padding-left:10px;line-height: 20px;text-indent: 2em;">
            <span
										style="white-space: normal;"
						>选择和测量CT值（水）的扫描图像，在图像圆周相当于钟表时针3，6，9，12点的方向，距模体影像边沿约10mm处，选取直径约为测试模体图像直径10%的RAOI，分别测量这个四个ROI的平均CT值，其中与CT值（水）的图像中心平均CT值的最大差值作为均匀性的测量值。</span>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<span class="bold">检测结果</span>
					</td>
				</tr>
				<tr>
					<td rowspan="2">检测条件</td>
					<td>管电压</td>
					<td>
						<span>{{data.valueData.a}}kV</span>
					</td>
					<td>管电流</td>
					<td>
						<span>{{data.valueData.b}}{{data.valueData.bunit}}</span>
					</td>
					<td>曝光时间</td>
					<td>
						<span>{{data.valueData.c}}s</span>
					</td>
				</tr>
				<tr>
					<td>SFOV</td>
					<td>
						<span>{{data.valueData.d}}mm</span>
					</td>
					<td>层厚</td>
					<td>
						<span :style="{color: ((data.valueData.e<5||data.valueData.e>10)?'red':'#000')}">{{data.valueData.e}}</span>
						<span>mm</span>
					</td>
					<td>CTDI 显示值</td>
					<td>
						<span :style="{ color: (data.valueData.f>50?'red':'#000')}">{{data.valueData.f}}</span>
						<span>mGy</span>
					</td>
				</tr>

				<tr>
					<td rowspan="3">检测结果</td>
					<td>测量位置</td>
					<td>中心</td>
					<td>上方</td>
					<td>右侧</td>
					<td>下方</td>
					<td>左侧</td>
				</tr>
				<tr>
					<td>平均CT值（HU）</td>
					<td>{{data.valueData.A}}</td>
					<td>
						<myInput
										style="text-align: center"
										@change.native="changeNum(data.valueData,'F')"
										v-model="data.valueData.B"
										:defaultValue="data.valueData.B"
						></myInput>
					</td>
					<td>
						<myInput
										style="text-align: center"
										@change.native="changeNum(data.valueData,'G')"
										v-model="data.valueData.C"
										:defaultValue="data.valueData.C"
						></myInput>
					</td>
					<td>
						<myInput
										style="text-align: center"
										@change.native="changeNum(data.valueData,'H')"
										v-model="data.valueData.D"
										:defaultValue="data.valueData.D"
						></myInput>
					</td>
					<td>
						<myInput
										style="text-align: center"
										@change.native="changeNum(data.valueData,'I')"
										v-model="data.valueData.E"
										:defaultValue="data.valueData.E"
						></myInput>
					</td>
				</tr>
				<tr>
					<td>与中心差值</td>
					<td>/</td>
					<td>{{data.valueData.F}}</td>
					<td>{{data.valueData.G}}</td>
					<td>{{data.valueData.H}}</td>
					<td>{{data.valueData.I}}</td>
				</tr>
				<tr>
					<td>均匀性（HU）</td>
					<td colspan="6">{{data.valueData.result}}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
  import bus from "@/utils/bus.js";

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
      returnVal(val, item, index) {
        item.bunit = val;
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
      changeNum(item, num) {
        switch (num) {
          case "F":
            if (Number(item.B) != "" || Number(item.A) != "")
              item.F = (Number(item.B) - Number(item.A)).toFixed46(1);
            break;
          case "G":
            if (Number(item.C) != "" || Number(item.A) != "")
              item.G = (Number(item.C) - Number(item.A)).toFixed46(1);
            break;
          case "H":
            if (Number(item.D) != "" || Number(item.A) != "")
              item.H = (Number(item.D) - Number(item.A)).toFixed46(1);
            break;
          case "I":
            if (Number(item.E) != "" || Number(item.A) != "")
              item.I = (Number(item.E) - Number(item.A)).toFixed46(1);
            break;
          default:
            break;
        }
        console.log(item.F, item.G, item.H, item.I);
        if (item.F !== "" && item.G !== "" && item.H !== "" && item.I !== "") {
          console.log("执行了吗");
          let maxNum = Math.max(
                  Math.abs(item.F),
                  Math.abs(item.G),
                  Math.abs(item.H),
                  Math.abs(item.I)
          );
          item.result = [item.F, item.G, item.H, item.I].find(
                  i => maxNum == Math.abs(i)
          );
        }
      }
    },
    mounted() {
      bus.$on("resetCtData", () => {
        let shuiData = this.jsonString.find(i => i.data.name == "project_ct_ctzs");
        if (shuiData) {
          let data = shuiData.data.valueData;
          let currdata = this.data.valueData;
          currdata.a = data.a;
          currdata.bunit = data.bunit;
          currdata.b = data.b;
          currdata.c = data.c;
          currdata.d = data.d;
          currdata.e = data.e;
          currdata.f = data.f;
          currdata.A = data.result;
        }
      });
    }
  };
</script>

<style>
</style>
