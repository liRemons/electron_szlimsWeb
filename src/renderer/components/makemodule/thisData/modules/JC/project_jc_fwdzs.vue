<template>
	<div>
		<div :class="{_normalHeight_:true}" class="___relative">
			<div :class="{eventCover:!ableInput}"></div>
			<div style="border: 1px solid black; line-height: 32px; text-align: left; padding-left: 10px; border-top: none;border-bottom:none">
				检测项目：{{data.valueData.testProjectChineseName}}{{data.valueData.detectionLimitPieces}} &nbsp;&nbsp;&nbsp;&nbsp; 检测依据:{{data.valueData.xcStandardNum}}
				&nbsp;&nbsp;{{data.valueData.standardUseTerms}}
			</div>
			<table class="myTable">
				<tr>
					<td class="___relative tc" style="width: 100px;">
						<span>样品编号</span>
					</td>
					<td class="___relative tc" style="width: 200px;">
						<span>检测地点</span>
					</td>
					<td class="___relative tc" style="width: 70px;">
						<span>检测点位</span>
					</td>
					<td class="___relative tc" style="width: 60px;">
						<span>Lₐ₁</span>
					</td>
					<td class="___relative tc" style="width: 60px;">
						<span>Lₐ₂</span>
					</td>
					<td class="___relative tc" style="width: 60px;">
						<span>Lₐ₃</span>
					</td>
					<td class="___relative tc" style="width: 60px;">
						<span>Lₐ₄</span>
					</td>
					<td class="___relative tc" style="width: 60px;">
						<span>Lₐ₅</span>
					</td>
					<td class="___relative tc" style="width: 70px;">
						<span>检测结果</span>
					</td>
					<td class="___relative tc" style="width: 70px;line-height:16px;">
						<span>检测结果<br>平均值</span>
					</td>
					<td class="___relative tc" style="width: 80px;">
						<span>检测时间</span>
					</td>
					<td class="___relative tc" style="width: 90px;">
						<span>仪器编号</span>
					</td>
					<td class="___relative tc" style="width: 100px;">
						<span>备注</span>
					</td>
				</tr>
				<tr v-for="(item,index) in data.valueData.point">
					<td
									v-if="item.noShow"
									:rowspan="item.heBingLength"
									@click="generateSampleNum(data.valueData.point)">
						<span>{{item.sampleNum + '' + item.sampleNumIndex}}</span>
					</td>
					<td v-if="item.noShow" class="___relative tc" :rowspan="item.heBingLength">
						<selectModel
										@returnVal="returnVal"
										:single="true"
										:rows="false"
										:disabled="task.docPass === 1 || target != 0"
										:special="index"
										:Judge="true"
										:input="false"
										:receive="'SampleAddress'"
										:factor="true"
										:watchTransmitText="true"
										:transmitText="item.SampleAddress"
										:list="myggcspoint"
										:Obj="''"></selectModel>
					</td>
					<td class="___relative tc">
						<myInput style="text-align: center" v-model="item.point" :defaultValue="item.point"></myInput>
					</td>
					<td class="___relative tc">
						<myInput
										style="text-align: center"
										v-model="item.valL[0]"
										:defaultValue="item.valL[0]"
										@change.native="changeNum(index)"></myInput>
					</td>
					<td class="___relative tc">
						<myInput
										style="text-align: center"
										v-model="item.valL[1]"
										:defaultValue="item.valL[1]"
										@change.native="changeNum(index)"></myInput>
					</td>
					<td class="___relative tc">
						<myInput
										style="text-align: center"
										v-model="item.valL[2]"
										:defaultValue="item.valL[2]"
										@change.native="changeNum(index)"></myInput>
					</td>
					<td class="___relative tc">
						<myInput
										style="text-align: center"
										v-model="item.valL[3]"
										:defaultValue="item.valL[3]"
										@change.native="changeNum(index)"></myInput>
					</td>
					<td class="___relative tc">
						<myInput
										style="text-align: center"
										v-model="item.valL[4]"
										:defaultValue="item.valL[4]"
										@change.native="changeNum(index)"></myInput>
					</td>
					<td v-if="item.noShow" class="___relative tc" :rowspan="item.heBingLength">
						<span>{{item.result}}</span>
					</td>
					<td v-if="item.noShow" class="___relative tc" :rowspan="item.heBingLength">
						<span>{{item.resultAverage}}</span>
					</td>
					<td v-if="item.noShow" class="___relative tc" :rowspan="item.heBingLength">
						<timePickerModel   :data="item" :showTime="item.time" @setTime="time=>item.time=time"/>
						<div class="___absolute toolBar"
								 v-if="target === '0'"
								 style="left: 325px;top:0; width: 62px;">
							<div title="往指定行后面增加一行" class="___absolute tc" @click="addRow(index,1)">+</div>
							<div title="删除当前行"
									 class="___absolute tc"
									 style="left: 30px;"
									 @click="deleteRow(index)">-
							</div>
						</div>
					</td>
					<td v-if="item.noShow" class="___relative tc" :rowspan="item.heBingLength">
						<querySelect
										v-model="item.deviceNum"
										v-if="target === '0'"
										ref="querySelect"
										:num="index"
										:list="deviceData"
										:defaultValue="item.deviceNum"
										@reset="reset"
										@getSelectItem="returnVal2"
										:name="'deviceNum'"
						></querySelect>
						<div v-else>{{item.deviceNum}}</div>
					</td>
					<td v-if="item.noShow" class="___relative tc" :rowspan="item.heBingLength">
						<myInput
										style="text-align: center"
										v-model="item.remarks"
										:defaultValue="item.remarks"
										@change.native="getIdPoint([{key:'remarks',value:item.remarks}],item.heBingId)"
						></myInput>
						<div class="___absolute toolBar" style="left: 220px;top:0; width: 180px;">
							<div
											title="往指定行后面增加一行"
											class="___absolute tc"
											@click="addRow(index,2,item.heBingId)">+
							</div>
							<div
											title="删除当前行"
											class="___absolute tc"
											style="left: 30px;"
											@click="deleteRow(index,item)">-
							</div>
							<div
											title="复制部分数据"
											class="___absolute tc"
											style="left: 60px;"
											@click="copyRow(index, 'copy')">c
							</div>
							<div
											title="复制全部数据"
											class="___absolute tc"
											style="left: 90px;"
											@click="copyRow(index, 'copyAll')">C
							</div>
							<div
											title="粘贴数据"
											class="___absolute tc"
											style="left: 120px;"
											@click="pasteRow(index)">p
							</div>
							<div
											title="生成重复样"
											class="___absolute tc"
											style="left: 150px;"
											@click="addSample(index)">r
							</div>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<el-dialog :visible.sync="sampleOption" width="60%" :modal="false" :title="'操作'">
			<el-form :inline="true">
				<el-row>
					<el-col :span="12">
						<el-form-item label="采样布点">
							<el-select v-model="myCaiSample" placeholder="请选择采样布点" @change="getSampleQuantity">
								<el-option :label="item" :value="item" v-for="item in factorList"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="样品数量">
							<el-input
											placeholder="请输入样品数量"
											@keyup.native="myCaiSampleNum = myCaiSampleNum.replace(/[^\d]/g,'')"
											:disabled="myCaiSample !== '其它' && myCaiSample !== '均匀布点'"
											v-model="myCaiSampleNum"
							></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div style="text-align: right; margin-right: 50px;">
				<el-button
								style="margin-top: 15px; margin-left:470px;"
								type="primary"
								@click="sureSampleNum"
				>确定
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        selectItem: "",
        selectItemIndex: "",
        sampleOption: false,
        myCaiSample: "",
        myCaiSampleNum: "",
        factorList: [
          "中央布点",
          "对称布点",
          "对角线布点",
          "梅花布点",
          "均匀布点",
          "其它"
        ],
        myggcspoint: []
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
      getIdPoint(keyArr, id) {
        this.jsonString.forEach((item, index) => {
          if (item.data.name === "project_jc_fwtzs" && this.data.valueData.multipleId === item.data.valueData.multipleId) {
            item.data.valueData.point.forEach((val, num) => {
              if (val.heBingId === id) {
                keyArr.forEach((v, i) => {
                  item.data.valueData.point[num][v.key] = v.value;
                });
              }
            });
          }
        });
      },
      isNumber(val) {
        if (parseFloat(val).toString() == "NaN") {
          return false;
        } else {
          return true;
        }
      },
      judgeNum(arr) {
        let calculation = [];
        arr.forEach((item, index) => {
          if (this.isNumber(item)) {
            calculation.push(item);
          }
        });
        return calculation;
      },
      getIdenticalPoint(heBingId) {
        let dataArr = [];
        this.jsonString.forEach((item, index) => {
          if (item.data.name === "project_jc_fwtzs") {
            dataArr.push(...item.data.valueData.point.filter((val, num) => val.heBingId === heBingId))
          }
        });
        return dataArr
      },
      detectionResult(heBingId) {
        let dataArr = [];
        this.jsonString.forEach((item, index) => {
          if (item.data.name === "project_jc_fwtzs" && this.data.valueData.multipleId === item.data.valueData.multipleId) {
            dataArr.push(...item.data.valueData.point.filter((val, num) => val.heBingId === heBingId));
          }
        });
        let num = dataArr.length;
        let cumulative = 0;
        dataArr.forEach((item, index) => {
          if (this.judgeNum(item.valL).length === 5) {
            let L1 = Math.pow(10, 0.1 * item.valL[0]);
            let L2 = Math.pow(10, 0.1 * item.valL[1]);
            let L3 = Math.pow(10, 0.1* item.valL[2]);
            let L4 = Math.pow(10, 0.1 * item.valL[3]);
            let L5 = Math.pow(10, 0.1 * item.valL[4]);
            let value =
                    10 * Math.log10(L1 + L2 + L3 + L4 + L5) - 10 * Math.log10(5);
            cumulative += value;
          } else {
            num--;
          }
        });
        cumulative = num > 0 ? cumulative : "";
        if (this.isNumber(cumulative)) {
          let lastNum = cumulative / num;
          dataArr.forEach((item, index) => {
            if (item.heBingId === heBingId) {
              dataArr[index].result = lastNum.toFixed46(1);
            }
          });
        }
      },
      reset() {
        this.data.valueData.point.forEach((item, index) => {
          this.changeNum(index);
        });
      },
      getResultAverageArr(sampleNum) {
        if (sampleNum) {
          let dataArr = [];
          this.jsonString.forEach((item, index) => {
            if (item.data.name === "project_jc_fwtzs" && this.data.valueData.multipleId === item.data.valueData.multipleId) {
              dataArr.push(...item.data.valueData.point.filter((val, num) => val.sampleNum.split('-')[0] === sampleNum.split('-')[0]))
            }
          });
          let resultAverageArr = [];
          dataArr.forEach((item, index) => {
            if (item.sampleNum && item.noShow) {
              if (item.sampleNum.split('-')[0] === sampleNum.split('-')[0] && this.isNumber(item.result)) {
                resultAverageArr.push(item.result)
              }
            }
          });
          dataArr.forEach((item, index) => {
            if (item.sampleNum && item.sampleNum.split('-')[0] === sampleNum.split('-')[0] && this.isNumber(item.result)) {
              let average = this.average(resultAverageArr);
              if (this.isNumber(average)) {
                dataArr[index].resultAverage = average.toFixed46(this.sizeMin(resultAverageArr), false, true);
              }
            }
          })
        }
      },
      changeNum(index) {
        if (this.getIdenticalPoint(this.data.valueData.point[index].heBingId).every((item, index, array) => {
          return this.JudgeNum(item.valL).length === 5
        })) {
          this.detectionResult(this.data.valueData.point[index].heBingId);
          this.getResultAverageArr(this.data.valueData.point[index].sampleNum);
        } else {
          let keyArr = [{
            key: 'result',
            value: ''
          }, {
            key: 'resultAverage',
            value: ''
          }];
          this.getIdPoint(keyArr, this.data.valueData.point[index].heBingId);
        }
      },
      returnVal2(index, val) {
        let SampleTools = "";
        let deviceNum = "";
        SampleTools = val.id;
        deviceNum = val.deviceNum;
        let keyArr = [
          {
            key: "SampleTools",
            value: SampleTools
          },
          {
            key: "deviceNum",
            value: deviceNum
          }
        ];
        this.getIdPoint(keyArr, this.data.valueData.point[index].heBingId);
      },
      decompose(data, Judge) {
        let arr = [];
        data.forEach((item, index) => {
          let obj = {};
          if (Judge === 1) {
            obj.value = item.measure1 + "/" + item.Amendment;
          } else {
            obj.value = item.Amendment;
            obj.key = [item.measure1, item.measure2];
          }
          arr.push(obj);
        });
        return arr;
      },

      generateSampleNum(item) {
        this.$eventBus.$emit(
                "generateSamplenum",
                item,
                this.data.valueData.multipleId
        );
      },
      addRow(index, Judge, heBingId) {
        let row = {};
        if (Judge === 1) {
          row = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
          row.point = "";
          row.valL = ["", "", "", "", ""];
          let id =
                  "project_jc_fwtzs-" +
                  this.pageNumber +
                  "-" +
                  this.thisPageIndex +
                  "-" +
                  index;
          this.data.valueData.point.splice(index + 1, 0, row);
          if (this.data.valueData.point[index].heBingId !== "") {
            this.data.valueData.point[
            index + 1
                    ].heBingId = this.data.valueData.point[index].heBingId;
          } else {
            this.data.valueData.point[index + 1].heBingId = id;
          }
        } else if (Judge === 2) {
          let id =
                  "project_jc_fwtzs-" + this.pageNumber + "-" + this.thisPageIndex;
          let subscript = parseFloat(heBingId.split("-")[3]);
          let num = "";
          this.data.valueData.point.forEach((v, n) => {
            if (v.heBingId === id + "-" + subscript) {
              num = n + 1;
            }
          });
          num = num !== "" ? num : this.data.valueData.point.length;
          if (this.data.valueData.point.length === num) {
            row = JSON.parse(JSON.stringify(this.data.modelRow));
          } else {
            row = JSON.parse(JSON.stringify(this.data.valueData.point[num]));
            row.point = "";
            row.valL = ["", "", "", "", ""];
          }
          row.pointId = window.uuid();
          row.foreverId = window.uuid();

          row.SampleAddress = this.data.valueData.point[index].SampleAddress;
          this.data.valueData.point.splice(num, 0, row);
          this.data.valueData.point[num].heBingId = id + "-" + (subscript + 1);
        }
        this.$emit("redefinition");
      },
      deleteRow(index, item) {
        if (this.data.valueData.point.length > 1) {
          this.$confirm("确认删除吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            modal: false
          }).then(({}) => {
            this.data.valueData.point.splice(index, 1);
            this.$emit("deleteSample", item);
          });
        }
      },
      heBing() {
        let idArr = [];
        this.data.valueData.point.forEach((item, index) => {
          if (item.heBingId !== "") {
            idArr.push(item.heBingId);
          }
        });
        let setIdArr = Array.from(new Set(idArr));
        let sequence = 0;
        setIdArr.forEach((item, index) => {
          let merge = 0;
          let inside = sequence;
          let position = this.data.valueData.point
                  .slice(sequence)
                  .findIndex((val, num) => item === val.heBingId);
          let pointSliceData = this.data.valueData.point.slice(sequence);
          for (let i = 0; i < pointSliceData.length; i++) {
            if (pointSliceData[i].heBingId === item) {
              pointSliceData[i].noShow = false;
              merge++;
              sequence++;
            } else {
              break;
            }
          }
          this.data.valueData.point.slice(inside)[position].noShow = true;
          this.data.valueData.point.slice(inside)[position].heBingLength = merge;
        });
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
          let obj = JSON.parse(JSON.stringify(this.selectItem));
          let index = this.data.valueData.point.findIndex(
                  (item, index) => item.foreverId === obj.foreverId
          );
          this.clearPingXing();
          obj.foreverId = window.uuid();
          obj.sampleNumIndex = "";
          let id = obj.heBingId.split("-");
          obj.heBingId = id[0] + "-" + id[1] + "-" + id[2] + "-" + index;
          this.data.valueData.point.splice(index, 0, obj);
        } else {
          this.clearPingXing();
          for (let i = 0; i < this.selectItem.sampleQuantity; i++) {
            let obj = JSON.myParse(JSON.stringify(this.selectItem));
            let id =
                    "project_jc_fwtzs-" +
                    this.pageNumber +
                    "-" +
                    this.thisPageIndex +
                    "-" +
                    (this.data.valueData.point.length + i);
            obj.pointId = window.uuid();
            obj.heBingId = id + "-" + obj.foreverId;
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
      clearPingXing() {
        this.jsonString.forEach(item => {
          if (
                  item.data.valueData.testProjectId ===
                  this.data.valueData.testProjectId
          ) {
            let result = item.data.valueData.point.some(
                    item2 => item2.foreverId === this.selectItem.foreverId
            );
            if (result) {
              let arr = item.data.valueData.point.filter(
                      item3 => item3.foreverId !== this.selectItem.foreverId
              );
              item.data.valueData.point = arr;
            }
          }
        });
      },
      returnVal(showText, receive, special, selectedObj) {
        this.data.valueData.point[special][receive] = showText;
      }
    },
    watch: {
      "data.valueData.heBingChange": function () {
        this.heBing();
      }
    },
    mounted() {
      setTimeout(() => {
        this.heBing();
      }, 10);

      this.$eventBus.$on("getSampleAddres", address => {
        this.myggcspoint = address;
        this.data.valueData.point.forEach(item => {
          if (item.SampleAddress == "") {
            item.SampleAddress = this.myggcspoint[0];
          }
        });
      });
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
</style>
