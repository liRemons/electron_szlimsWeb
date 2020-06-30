<template>
	<!-- 空气采样器法  17列 -->
	<div class="___relative">
		<div :class="{eventCover: target !== '1'}"></div>
		<projectHead v-if="headShow()" :data="data" :target="target" :col="10"></projectHead>
		<project_wsw_blank :data="data"></project_wsw_blank>
		<table class="myTable">
			<tr class="delLine">
				<td rowspan="2">样品编号</td>
				<td rowspan="2">样品名称</td>
				<td colspan="3">各稀释度接种LST肉汤阳性管数</td>
				<td colspan="3">各稀释度接种BGLB肉汤阳性管数</td>
				<td rowspan="2">报告结果（MPN/mL）</td>
			</tr>
			<tr>
				<td>0.1</td>
				<td>0.01</td>
				<td>0.001</td>
				<td>0.1</td>
				<td>0.01</td>
				<td>0.001</td>
			</tr>
			<tr v-for="(item, index) in data.valueData.point" :key="item.pointId">
				<td @click="generateSampleNum(data.valueData.point)">{{name(item)}}</td>
				<td @click="getDetailData">
					<span>{{item.sampleName}}</span>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item1"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item2"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item3"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item4"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item5"></myInput>
				</td>
				<td>
					<myInput :reg="'[^0-9/]'" @change.native="report(item)" v-model="item.item6"></myInput>
				</td>
				<td>
					<div style="height:100%">{{item.sysReport}}</div>
				</td>
			</tr>
		</table>
		<div
						style="border: 1px solid black; line-height: 32px; text-align: left; padding-left: 10px; border-top: none;"
		>备注: {{data.valueData.remarks}}
		</div>
	</div>
</template>

<script>
  import projectHead from "./project_head";

  export default {
    name: "project_wsw_jl_mbpjsf",
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
      report(item) {
        var rm = new Map();
        rm.set("0,0,0", "<3.0");
        rm.set("0,0,1", "3.0");
        rm.set("0,1,0", "3.0");
        rm.set("0,1,1", "6.1");
        rm.set("0,2,0", "6.2");
        rm.set("0,3,0", "9.4");
        rm.set("1,0,0", "3.6");
        rm.set("1,0,1", "7.2");
        rm.set("1,0,2", "11");
        rm.set("1,1,0", "7.4");
        rm.set("1,1,1", "11");
        rm.set("1,2,0", "11");
        rm.set("1,2,1", "15");
        rm.set("1,3,0", "16");
        rm.set("2,0,0", "9.2");
        rm.set("2,0,1", "14");
        rm.set("2,0,2", "20");
        rm.set("2,1,0", "15");
        rm.set("2,1,1", "20");
        rm.set("2,1,2", "27");
        rm.set("2,2,0", "21");
        rm.set("2,2,1", "28");
        rm.set("2,2,2", "35");
        rm.set("2,3,0", "29");
        rm.set("2,3,1", "36");
        rm.set("3,0,0", "23");
        rm.set("3,0,1", "38");
        rm.set("3,0,2", "64");
        rm.set("3,1,0", "43");
        rm.set("3,1,1", "75");
        rm.set("3,1,2", "120");
        rm.set("3,1,3", "160");
        rm.set("3,2,0", "93");
        rm.set("3,2,1", "150");
        rm.set("3,2,2", "210");
        rm.set("3,2,3", "290");
        rm.set("3,3,0", "240");
        rm.set("3,3,1", "460");
        rm.set("3,3,2", "1100");
        rm.set("3,3,3", ">1100");

        let item4 = Number(item.item4 == "/" ? 0 : item.item4);
        let item5 = Number(item.item5 == "/" ? 0 : item.item5);
        let item6 = Number(item.item6 == "/" ? 0 : item.item6);
        if (
                !Number.isNaN(item4) &&
                !Number.isNaN(item5) &&
                !Number.isNaN(item6)
        ) {
          let report = rm.get([item4, item5, item6].toString());
          if (report != undefined) {
            item.sysReport = report;
          } else {
            item.sysReport = "录入值无效";
          }
        } else {
          item.sysReport = "录入值无效";
        }
        this.$forceUpdate();
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
      returnVal(showText, receive, special) {
        this.data.valueData.point[special][receive] = showText;
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

      returnVal2(index, val) {
        this.data.valueData.point[index]["SampleTools"] = val.id;
        this.data.valueData.point[index].deviceNum = val.deviceNum;
      },

      getSampleQuantity(value) {
        if (value === "中央布点") {
          this.myCaiSampleNum = 1;
        } else if (value === "对称布点") {
          this.myCaiSampleNum = 2;
        } else if (value === "对角线布点") {
          this.myCaiSampleNum = 3;
        } else if (value === "梅花布点") {
          this.myCaiSampleNum = 5;
        } else {
          this.myCaiSampleNum = "";
        }
      },

      addSample(index) {
        this.selectItem = this.data.valueData.point[index];
        this.selectItemIndex = index;
        this.sampleOption = true;
      },

      clearPingXing() {
        this.jsonString.forEach(item => {
          if (item.data.valueData.testProjectId === this.data.valueData.testProjectId) {
            let result = item.data.valueData.point.some(item2 => item2.foreverId === this.selectItem.foreverId);

            if (result) {
              let arr = item.data.valueData.point.filter(item3 => item3.foreverId !== this.selectItem.foreverId);
              item.data.valueData.point = arr;
            }
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

      this.$eventBus.$on("getDevice", device => {
        this.devices = device;
      });
    }
  };
</script>

<style scoped>
</style>
