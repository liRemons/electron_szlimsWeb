<template>
  <div class="___relative">
    <div id="Layer1" class="eventCover" v-if="false"></div>
    <table class="tb" border="1">
      <tr class="temperature delLine">
        <td width="80">
          <div class="temperatureName">温度:</div>
        </td>
        <td width="65">
          <div class="temperatureValue">
            <divModel
              :edit="!isCopy"
              v-model="data.valueData.temperature"
            ></divModel>
          </div>
        </td>
        <td align="left" width="148">
          <div class="temperatureDan">℃</div>
        </td>
        <td width="80">
          <div class="temperatureName">湿度:</div>
        </td>
        <td width="80">
          <div class="temperatureValue">
            <divModel
              :edit="!isCopy"
              v-model="data.valueData.humidity"
            ></divModel>
          </div>
        </td>
        <td align="left" width="160">
          <div class="temperatureDan">%RH</div>
        </td>
        <td width="80">
          <div class="temperatureName">溶液温度：</div>
        </td>
        <td width="86">
          <div class="temperatureValue">
            <divModel
              :edit="!isCopy"
              v-model="data.valueData.solutionTemperature"
            ></divModel>
          </div>
        </td>
        <td align="left" width="330">
          <div class="temperatureDan">℃</div>
        </td>
      </tr>
    </table>

    <div
      style="height: 33px; border-left: 1px solid black; border-right: 1px solid black;width: 1128px; line-height: 33px; text-align: left; padding-left: 10px;"
    >
      计量器具：
    </div>
    <table
      class="checkTable"
      border="1"
      style="width: 1140px;line-height: 30px;"
    >
      <tr>
        <td style="width: 100px;">
          <el-checkbox
            :disabled="isCopy"
            @change="data => change(data, 1)"
            v-model="data.valueData.checked[0]"
          ></el-checkbox>
          <span>电子天平：</span>
        </td>
        <td style="width: 450px;">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[0]"
          ></divModel>
        </td>
        <td style="width: 50px;">编号:</td>
        <td style="width: 400px;">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[0]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[1]"
            @change="data => change(data, 2)"
          ></el-checkbox>
          <span>容量瓶：</span>
        </td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[1]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[1]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[2]"
            @change="data => change(data, 3)"
          ></el-checkbox>
          <span>单标吸管：</span>
        </td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[2]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[2]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[3]"
            @change="data => change(data, 4)"
          ></el-checkbox>
          <span>移液管：</span>
        </td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[3]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[3]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[4]"
            @change="data => change(data, 5)"
          ></el-checkbox>
          <span>移液枪：</span>
        </td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[4]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[4]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[5]"
            @change="data => change(data, 6)"
          ></el-checkbox>
          <span>微量进样器：</span>
        </td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[5]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[5]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td>
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[6]"
            @change="data => change(data, 7)"
          ></el-checkbox>
          <span>注射器：</span>
        </td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[6]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td>
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[6]"
          ></divModel>
        </td>
      </tr>
    </table>

    <table class="checkTable" style="width: 1140px;" border="1">
      <tr>
        <td style="width: 100px;">依据标准：</td>
        <td @click="selectMethods">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.standard"
          ></divModel>
        </td>
      </tr>
    </table>

    <!-- 仪器选择 -->
    <el-dialog :visible.sync="dialogVisible" v-if="dialogVisible" width="900px">
      <div slot="title">选择计量器具({{ type | typeF }})</div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
        border
      >
        <el-table-column property="deviceName" label="名称" width="100">
        </el-table-column>
        <el-table-column property="deviceModel" label="型号"> </el-table-column>
        <el-table-column property="deviceNum" label="编号"> </el-table-column>
        <el-table-column property="deviceManufactor" label="仪器厂家">
        </el-table-column>
        <el-table-column property="correctTime" label="校准/检定有效期">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 依据标准选择 -->
    <el-dialog
      :visible.sync="standardDialog"
      v-if="standardDialog"
      width="900px"
    >
      <div slot="title">选择依据标准</div>
      <el-table
        ref="singleTable"
        :data="standardTableData"
        highlight-current-row
        @current-change="standardChange"
        style="width: 100%"
        border
      >
        <el-table-column property="standardName" label="标准名">
        </el-table-column>
        <el-table-column property="standardNum" label="标准号">
        </el-table-column>
        <el-table-column property="standardState" label="状态">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="standardDialog = false">取 消</el-button>
        <el-button type="primary" @click="standardConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryBySysDeviceType,
  queryStandardByMaterialId
} from "@/api/laboratory";
export default {
  name: "curve_mid",
  props: ["data", "target", "jsonString"],
  data() {
    return {
      dialogVisible: false,
      standardDialog: false,
      tableData: [],
      type: null,
      selectData: null,
      standardSelectData: null,
      standardTableData: []
    };
  },
  filters: {
    typeF(val) {
      let type;
      val == 0
        ? (type = "检测仪器")
        : val == 1
        ? (type = "电子天平")
        : val == 2
        ? (type = "容量瓶")
        : val == 3
        ? (type = "单标吸管")
        : val == 4
        ? (type = "移液管")
        : val == 5
        ? (type = "移液枪")
        : val == 6
        ? (type = "微量进样器")
        : val == 7
        ? (type = "注射器")
        : "";
      return type;
    }
  },
  computed: {
    isCopy() {
      if (this.$route.query.copy) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    selectMethods() {
      let arr = this.jsonString.filter(item => item.to == "curve_head");
      let data = arr[0].data.valueData.point.map(item => item.id);
      queryStandardByMaterialId(data).then(res => {
        this.standardTableData = res.datas;
        if (res.datas.length) {
          this.standardDialog = true;
        }
      });
    },
    change(data, type) {
      this.type = type;
      this.selectData = null;
      if (data) {
        queryBySysDeviceType(type).then(res => {
          if (res.data.length) {
            this.dialogVisible = true;
            this.tableData = res.data;
          } else {
            this.$message.warning("暂未获取到计量器具信息，请手动输入");
          }
        });
      } else {
        this.data.valueData.guiGeArr[this.type - 1] = "";
        this.data.valueData.biaoHaoArr[this.type - 1] = "";
      }
    },
    standardChange(val) {
      this.standardSelectData = val;
    },
    handleCurrentChange(val) {
      this.selectData = val;
    },
    standardConfirm() {
      if (this.standardSelectData) {
        this.standardDialog = false;
        this.data.valueData.standard = `${this.standardSelectData.standardNum}(${this.standardSelectData.standardName})`;
      } else {
        this.$message.warning("您未选择");
      }
    },
    confirm() {
      if (this.selectData) {
        this.data.valueData.guiGeArr[
          this.type - 1
        ] = this.selectData.deviceModel;
        this.data.valueData.biaoHaoArr[
          this.type - 1
        ] = this.selectData.deviceNum;
        this.dialogVisible = false;
      } else {
        this.$message.warning("您未选择");
      }
    }
  }
};
</script>

<style scoped>
</style>
