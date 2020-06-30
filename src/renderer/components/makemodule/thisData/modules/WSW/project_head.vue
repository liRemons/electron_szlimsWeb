<template>
	<div>
		<table class="myTable">
			<tr class="delLine">
				<td>
					<span style="color: red;">*</span>检测日期
				</td>
				<td :colspan="4">
					<div v-if="target === '1'">
						<div @click="toShowTimeBox" style="height: 30px; line-height: 30px;">{{timeText}}</div>
						<div class="timeBox2" v-show="showTime">
							<el-date-picker
											style="width: 300px;"
											v-model="data.valueData.sysTestingTime"
											type="datetime"
											:clearable="false"
											@change="changeTime"
											:picker-options="pickerOptions"
											format="yyyy年MM月dd日 HH时mm分ss秒"
											value-format="yyyy-MM-dd HH:mm:ss"
							></el-date-picker>
						</div>
					</div>
					<div v-else>{{data.valueData.sysTestingTime}}</div>
				</td>
				<td :colspan="1">至</td>
				<td :colspan="col - 6">
					<div v-if="target === '1'">
						<div @click="toShowTimeBox2" style="height: 30px; line-height: 30px;">{{timeText2}}</div>
						<div class="timeBox" v-show="showTime2">
							<el-date-picker
											style="width: 300px;"
											v-model="data.valueData.sysTestingEndTime"
											@change="changeTime2"
											:clearable="false"
											type="datetime"
											format="yyyy年MM月dd日 HH时mm分ss秒"
											value-format="yyyy-MM-dd HH:mm:ss"
											:picker-options="pickerOptions1"
							></el-date-picker>
						</div>
					</div>
					<div v-else>{{data.valueData.sysTestingEndTime}}</div>
				</td>
			</tr>
			<tr>
				<td style="width: 100px;">检测环境</td>
				<td>
					<divModel v-model="data.valueData.sysTemperature" :edit="canEdit" :isNumBox="true"></divModel>
				</td>
				<td>℃；</td>
				<td>
					<divModel v-model="data.valueData.sysHumidity" :edit="canEdit" :isNumBox="true"></divModel>
				</td>
				<td style="padding-left: 10px" align="left" :colspan="col - 4">%RH</td>
			</tr>

			<tr>
				<td>样品状态</td>
				<td colspan="2" align="left" style="padding-left: 20px;">
					<el-radio-group
									@change="changeState"
									v-model="data.valueData.sysSampleState"
									:disabled="target == 4">
						<el-radio :label="'正常'">正常</el-radio>
						<el-radio :label="'其他'">其他</el-radio>
					</el-radio-group>
				</td>
				<td :colspan="col - 3" align="left" style="padding-left: 10px;">
					<divModel
									v-if="data.valueData.sysSampleState === '其他'"
									:edit="target != 4"
									v-model="data.valueData.sysSampleStateDetail"
					></divModel>
				</td>
			</tr>
			<tr>
				<td>
					<span style="color: red;">*</span>检测仪器
				</td>
				<td :colspan="col - 1" align="left" style="padding-left: 20px; line-height: 32px;">
					<selectModel
									@returnVal="returnVal"
									v-if="canEdit"
									:Judge="true"
									:special="1"
									:multi-select="true"
									:receive="'id'"
									:single="false"
									:rows="false"
									:list="devices"
									:Obj="'showName'"
					></selectModel>
					<div v-else>{{showDevice}}</div>
				</td>
			</tr>
			<tr>
				<td colspan="5">质控措施</td>
				<td colspan="5">检测结果</td>
			</tr>
			<!--<tr v-for="(item, index) in data.valueData.qualityControl" :key="index">
				<td colspan="5">
					<myInput v-model="item.name"></myInput>
				</td>
				<td colspan="5">
					<myInput v-model="item.sysResult"></myInput>

					<div class="__functionBox3" :style="{top: ((5+index) * 33) + 'px', left: '1110px'}">
						&lt;!&ndash; ******** 功能模块 ********** &ndash;&gt;
						<div class="__functionButton6" style="margin-top: 3px;" @click="increase">
							<span>+</span>
						</div>
						&lt;!&ndash;增加一行 &ndash;&gt;
						<div
							class="__functionButton7"
							@dblclick="reduce(data.valueData.qualityControl.length-1)"
						>
							<span>-</span>
						</div>
						&lt;!&ndash;增加一行 &ndash;&gt;
					</div>
				</td>
			</tr>-->
		</table>
	</div>
</template>

<script>
  import {queryByPurpose} from "@/api/laboratory";

  export default {
    name: "project_head.vue",
    data() {
      return {
        showTime: false,
        showTime2: false,
        devices: [],
        testTiem: "",
				testTiem2: "",
				pickerOptions:{},
				pickerOptions1:{},
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      };
    },
    computed: {
      canEdit() {
        if (this.target === "1") {
          return true;
        } else {
          return false;
        }
      },
      showDevice() {
        try {
          return this.data.valueData.testDeviceCheckBox
                  .map(item => item.deviceName + " " + item.deviceModel + " " + item.deviceNum)
                  .toString();
        } catch (e) {
          return ''
        }
      },
      getPickerOptions1() {
        let that = this;
        return {
          disabledDate(time) {
            if (that.data.valueData.sysTestingTime) {
              let time2 = that.data.valueData.sysTestingTime.replace(/-/g, "/");
              return time.getTime() < new Date(time2).getTime();
            } else {
              return time.getTime() < Date.now() - 8.64e7;
            }
          }
        };
      },
      timeText() {
        return this.data.valueData.sysTestingTime;
      },

      timeText2() {
        return this.data.valueData.sysTestingEndTime;
      }
    },
    props: ["data", "target", "col"],
    methods: {
      reduce(index) {
        if (this.data.valueData.qualityControl.length <= 1) {
          this.$notify({
            type: "warning",
            message: "最后一行不可删除！"
          });
          return;
        }
        this.data.valueData.qualityControl.splice(index, 1);
      },
      increase() {
        let obj = {
          name: "",
          sysResult: ""
        };
        this.data.valueData.qualityControl.push(obj);
      },
      toShowTimeBox() {
        this.showTime = !this.showTime;
      },
      toShowTimeBox2() {
        this.showTime2 = !this.showTime2;
      },
      changeTime() {
        this.showTime = false;
        this.data.valueData.sysTestingEndTime = '';
      },
      changeTime2() {
        this.showTime2 = false;
      },
      changeState(val) {
        console.log(1, val);
        if (val === "正常") {
          console.log(2);
          this.data.valueData.sysSampleStateDetail = "";
        }
      },
      returnVal(a, b, c, d, valueArr) {
        this.data.valueData.testDeviceCheckBox = valueArr.map(item => item.id);
      }
    },

    mounted() {
			let this_ = this;
    this.pickerOptions = {
      disabledDate(time) {
        return (
          time.getTime() <
          new Date(this_.$store.state.laboratory.inspectionTime)
          // || time.getTime() > Date.now()
        );
      }
    };
    this.pickerOptions1 = {
      disabledDate(time) {
        return (
          time.getTime() <
          new Date(this_.data.valueData.sysTestingTime)
          // || time.getTime() > Date.now()
        );
      }
    };
      queryByPurpose("实验室").then(res => {
        if (res.success) {
          this.devices = res.data;
          this.devices.forEach(item => {
            item.showName =
                    item.deviceName + " " + item.deviceModel + " " + item.deviceNum;
          });
        } else {
          console.log("获取设备失败");
        }
      });
    }
  };
</script>

<style lang="less" scoped>
	/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
	.__functionBox3 {
		width: 56px;
		height: 27px;
		box-shadow: 1px 1px black;
		background: rgba(0, 0, 0, 0.3);
		position: absolute;
		right: -109px;
		top: 245px;
		bottom: 1px;
	}
</style>
