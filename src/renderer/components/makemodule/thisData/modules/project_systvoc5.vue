<template>
	<table class="myTable" border="1" ref="ben">
		<tr>
			<td>检测日期</td>
			<td colspan="4">
				<div>
					<divModel v-model="data.valueData.sysTestingTime"
										style="height: 30px; line-height: 30px;"
										:edit="false"
					></divModel>
				</div>
			</td>
			<td :colspan="1">至</td>
			<td :colspan="4">
				<div>
					{{data.valueData.sysTestingEndTime}}
				</div>
			</td>
		</tr>
		<tr>
			<td style="width: 100px;">检测环境</td>
			<td>
				<divModel :edit="target != 4" v-model="data.valueData.sysTemperature"></divModel>
			</td>
			<td>℃；</td>
			<td>
				<divModel :edit="target != 4" v-model="data.valueData.sysHumidity"></divModel>
			</td>
			<td style="padding-left: 10px" align="left" colspan="6">%RH</td>
		</tr>
		<tr>
			<td>检测仪器</td>
			<td colspan="9" align="left" style="padding-left: 20px;">
				<div>
					<div style="padding-left: 10px;">{{testDeviceCheckBoxMsg}}</div>
				</div>
			</td>
		</tr>
		<tr>
			<td>样品状态</td>
			<td colspan="2" align="left" style="padding-left: 20px;">
				<el-radio-group v-model="data.valueData.sysSampleState" :disabled="target == 4">
					<el-radio :label="'正常'">正常</el-radio>
					<el-radio :label="'其他'">其他</el-radio>
				</el-radio-group>
			</td>
			<td colspan="7">
				<divModel :edit="target != 4"></divModel>
			</td>
		</tr>
	</table>
</template>

<script>
  import {queryByPurpose} from "@/api/laboratory";

  export default {
    name: "project_sysan5.vue",
    props: ['data', 'target'],
    data() {
      return {
        devices: [],
        testTiem: ""
      }
    },
    mounted() {
      queryByPurpose('实验室').then(res => {
        if (res.success) {
          this.devices = res.data;
          console.log('获取设备成功2');
        } else {
          console.log('获取设备失败');
        }
      });
      setTimeout(() => {
        this.$forceUpdate();
      }, 200)
    },
    computed: {
      testDeviceCheckBoxMsg() {
        let str = "";
        this.data.valueData.testDeviceCheckBox.forEach((item, index) => {
          if (index !== this.data.valueData.testDeviceCheckBox.length - 1) {
            str += item.deviceName + ' ' + item.deviceModel + ' ' + item.deviceNum + ','
          } else {
            str += item.deviceName + ' ' + item.deviceModel + ' ' + item.deviceNum
          }
        });
        return str
      }
    }
  }
</script>

<style scoped>

</style>
