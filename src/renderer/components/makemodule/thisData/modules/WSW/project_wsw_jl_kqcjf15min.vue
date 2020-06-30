<template>
	<!-- 空气沉降法  12 列-->
	<div class="___relative">
		<div :class="{eventCover: target !== '1'}"></div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<project_wsw_blank :data="data"></project_wsw_blank>
		<table class="myTable">
			<tr class="delLine">
				<td rowspan="2" colspan="2">样品编号</td>
				<td rowspan="2" colspan="2">样品名称</td>
				<td rowspan="2">
					暴露时间
					<br/>（min）
				</td>
				<td rowspan="2">样品数量</td>
				<td colspan="5">
					<div style="width:60px;display: inline-block;vertical-align:middle;">
						<div v-if="target == 1" style="line-height:32px;">
							<selectModel @returnVal="returnVal"
													 :Judge="true"
													 :special="0"
													 v-if="!showInput"
													 :transmitText="data.valueData.sysDilutionDegree"
													 :multi-select="false"
													 :receive="'id'"
													 :single="true"
													 :rows="false"
													 :list="['37','28','25','44','42','56','/','自定义']"
													 :Obj="''">
							</selectModel>
							<myInput style="text-align: center" v-else v-model="data.valueData.sysDilutionDegree"
											 @change.native="(el) => {noShowInput(el,0)}"></myInput>
						</div>
						<div v-else>{{data.valueData.sysDilutionDegree}}</div>
					</div>
					<span>℃培养</span>
					<div style="width:60px;display: inline-block;vertical-align:middle;">
						<div v-if="target == 1" style="line-height:32px;">
							<selectModel @returnVal="returnVal"
													 :Judge="true"
													 :special="1"
													 v-if="!showInput2"
													 :transmitText="data.valueData.sysDilutionHour"
													 :multi-select="false"
													 :receive="'id'"
													 :single="true"
													 :rows="false"
													 :list="['24h','45h','3d','5d','7d','/','自定义']"
													 :Obj="''">
							</selectModel>
							<myInput style="text-align: center" v-else v-model="data.valueData.sysDilutionHour"
											 @change.native="(el) => {noShowInput(el,1)}"></myInput>
						</div>
						<div v-else>{{data.valueData.sysDilutionHour}}</div>
					</div>
					h后平皿计数（CFU）
				</td>
				<td rowspan="2" colspan="2">
					报告值
					<br/>CFU/皿·15min
				</td>
			</tr>
			<tr class="delLine">
				<td>1</td>
				<td>2</td>
				<td>3</td>
				<td>4</td>
				<td>5</td>
			</tr>
			<tr v-for="(item, index) in data.valueData.point" :key="item.pointId">
				<td colspan="2" @click="generateSampleNum(data.valueData.point)">{{name(item)}}</td>
				<td colspan="2" @click="getDetailData">
					<span>{{item.sampleName}}</span>
				</td>
				<td>{{item.exposureTime}}</td>
				<td>
					<span>{{item.dishSize}}</span>
				</td>
				<td>
					<myInput v-if="item.dishSize>=1" :reg="'[^0-9/]'" @change.native="report(item)"
									 v-model="item.item1"></myInput>
					<span v-else>/</span>
				</td>
				<td>
					<myInput v-if="item.dishSize>=2" :reg="'[^0-9/]'" @change.native="report(item)"
									 v-model="item.item2"></myInput>
					<span v-else>/</span>
				</td>
				<td>
					<myInput v-if="item.dishSize>=3" :reg="'[^0-9/]'" @change.native="report(item)"
									 v-model="item.item3"></myInput>
					<span v-else>/</span>
				</td>
				<td>
					<myInput v-if="item.dishSize>=4" :reg="'[^0-9/]'" @change.native="report(item)"
									 v-model="item.item4"></myInput>
					<span v-else>/</span>
				</td>
				<td>
					<myInput v-if="item.dishSize>=5" :reg="'[^0-9/]'" @change.native="report(item)"
									 v-model="item.item5"></myInput>
					<span v-else>/</span>
				</td>

				<td colspan="2">
					<div style="height:100%">{{item.sysReport}}</div>
				</td>
			</tr>
			<tr>
				<td colspan="2" style="border-right:none">备注:</td>
				<td colspan="11" style="border-left:none">
					<myInput v-model="data.valueData.remarks"></myInput>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
  import projectHead from "./project_head";

  export default {
    name: "project_wsw_jl_kqcyqf",
    props: [
      "ipdTemplate",
      "data",
      "pageNumber",
      "thisPageIndex",
      "jsonString",
      "showing",
      "watchSign",
      "isTemplate",
      "ableInput",
      "bs",
      "target",
      "detectionLimitObj"
    ],
    components: {
      projectHead
    },
    data() {
      return {
        selectItem: "",
        selectItemIndex: "",
        sampleOption: false,
        myCaiSample: "",
        myCaiSampleNum: "",
        showInput: false,
        showInput2: false,
        ggcspoint: [],
        nowShowTimeBox: "",
        devices: []
      };
    },
    computed: {
      myggcspoint() {
        if (this.ggcspoint.length > 0) {
          return this.ggcspoint.map(item => item.sampleAddress);
        } else {
          return [];
        }
      }
    },
    watch: {
      myggcspoint() {
        this.data.valueData.point.forEach(item => {
          if (item.SampleAddress == "") {
            item.SampleAddress = this.myggcspoint[0];
          }
        });
      }
    },
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
      returnVal(val, name, index) {
        if (val !== '自定义') {
          let keyArr = ['sysDilutionDegree', 'sysDilutionHour'];
          this.data.valueData[keyArr[index]] = val;
        } else {
          let showInputArr = ['showInput', 'showInput2'];
          let keyArr = ['sysDilutionDegree', 'sysDilutionHour'];
          this[showInputArr[index]] = true;
          this.data.valueData[keyArr[index]] = ' ';
          this.$forceUpdate();
        }
      },
      noShowInput(el, index) {
        el.target.value = el.target.value.replace(' ', '');
        let val = el.target.value;
        this.data.valueData.antenna = val;
        if (val === '') {
          let showInputArr = ['showInput', 'showInput2'];
          this[showInputArr[index]] = false;
        }
        this.$forceUpdate();
      },
      report(item) {
        let that = this;
        let dl = this.detectionLimitObj.detectionLimit;
        console.log("dl这玩意是检出值", dl);
        let item1 = Number(item.item1 == "" ? "/" : item.item1);
        let item2 = Number(item.item2 == "" ? "/" : item.item2);
        let item3 = Number(item.item3 == "" ? "/" : item.item3);
        let item4 = Number(item.item4 == "" ? "/" : item.item4);
        let item5 = Number(item.item5 == "" ? "/" : item.item5);
        let volume = Number(item.volume);
        if (!Number.isNaN(volume) && volume != 0) {
          if (
                  item1 != 0 ||
                  item2 != 0 ||
                  item3 != 0 ||
                  item4 != 0 ||
                  item5 != 0
          ) {
            let arr = [item1, item2, item3, item4, item5].filter(i =>
                    that.isNumber(i)
            );
            // 求数组的平均值
            const average = arr =>
                    arr.reduce((acc, val) => acc + val, 0) / arr.length;

            item.sysReport = Math.ceil(average(arr));
            item.sysReport = Number(item.sysReport).checkValue(dl);
          } else {
            item.sysReport = "<" + dl;
          }
        } else {
          item.sysReport = "暴露时间（min) 值无效";
        }
      },
      name(item) {
        let name = `${item.sampleNum}${
                item.sampleNumIndex ? item.sampleNumIndex : ""
                }${item.parallelLetter ? item.parallelLetter : ""}`;
        return name.replace(/\s*/g, "");
      },
      addRow(index) {
        let row = JSON.parse(JSON.stringify(this.data.modelRow));
        row.pointId = window.uuid();
        row.foreverId = window.uuid();
        this.data.valueData.point.splice(index + 1, 0, row);
        this.$emit("redefinition");
      },
      deleteRow(index, item) {
        if (this.data.valueData.point.length > 1) {
          this.$confirm('确认删除吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            modal: false,
          }).then(({}) => {
            this.data.valueData.point.splice(index, 1);
            this.$emit("deleteSample", item);
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

      clearPingXing() {
        this.jsonString.forEach(item => {
          let result = item.data.valueData.point.some(
                  item2 => item2.foreverId === this.selectItem.foreverId
          );

          if (result) {
            let arr = item.data.valueData.point.filter(
                    item3 => item3.foreverId !== this.selectItem.foreverId
            );
            item.data.valueData.point = arr;
          }
        });
      },
      getDetailData() {
        let ggcs = this.jsonString.find(item => item.to == "head_ggcs");
        if (ggcs) {
          this.ggcspoint = ggcs.data.valueData.point;
        }
      },
      toShowTimeBox(index) {
        if (this.target === "0" && this.task.docPass !== 1) {
          if (this.nowShowTimeBox === index) {
            this.nowShowTimeBox = null;
            return;
          }
          this.nowShowTimeBox = index;
        }
      },
      changeTime(item) {
        item.SamplingTime = new Date().format("yyyy-MM-dd") + " " + item.time;
        this.nowShowTimeBox = null;
      },
      generateSampleNum(item) {
        this.$eventBus.$emit("generateSamplenum", item, this.data.valueData.multipleId);
      },

      sureSampleNum() {
        if (this.selectItem.sampleNum == "") {
          this.$notify({
            type: "warning",
            message: "样品编号为空"
          });
          return;
        }

        if (this.myCaiSample === "" || this.myCaiSampleNum === "") {
          return;
        }

        this.selectItem.SamplePoint = this.myCaiSample;
        this.selectItem.sampleQuantity = this.myCaiSampleNum;
        this.sampleOption = false;
        this.myCaiSample = "";
        this.myCaiSampleNum = "";

        let arr = [];
        if (this.selectItem.sampleQuantity == 1) {
          this.clearPingXing();
          let obj = JSON.parse(JSON.stringify(this.selectItem));
          obj.sampleNumIndex = "";
          this.data.valueData.point.splice(this.selectItemIndex, 0, obj);
        } else {
          this.clearPingXing();
          for (let i = 0; i < this.selectItem.sampleQuantity; i++) {
            let obj = JSON.myParse(JSON.stringify(this.selectItem));
            obj.pointId = window.uuid();
            let num = i + 1;
            obj.sampleNumIndex = "-" + num;

            if (num !== 1) {
              obj.isPrototype = false;
            }
            arr.push(obj);
          }

          this.data.valueData.point.splice(this.selectItemIndex, 0, ...arr);
        }

        this.$emit("redefinition");
      }
    },
    mounted() {
      this.getDetailData();
      this.data.valueData.point.forEach(p => {
        p.volume = "15";
      });
      this.$eventBus.$on("getDevice", device => {
        this.devices = device;
      });
    }
  };
</script>

<style scoped>
</style>
