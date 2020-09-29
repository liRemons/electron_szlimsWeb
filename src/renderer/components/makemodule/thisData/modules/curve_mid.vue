<template>
  <div class="___relative">
    <div id="Layer1" class="eventCover" v-if="false"></div>
    <table style="width: 1140px" border="1" class="curveTable">
      <tr>
        <td colspan="3">
          温度:
          <divModel
            style="width: 60%"
            class="block"
            :edit="!isCopy"
            v-model="data.valueData.temperature"
          ></divModel
          >℃
        </td>
        <td colspan="3">
          湿度:
          <divModel
            style="width: 60%"
            class="block"
            :edit="!isCopy"
            v-model="data.valueData.humidity"
          ></divModel
          >%RH
        </td>
        <td colspan="4">
          溶液温度：
          <divModel
            style="width: 60%"
            class="block"
            :edit="!isCopy"
            v-model="data.valueData.solutionTemperature"
          ></divModel
          >℃
        </td>
      </tr>
    </table>
    <table
      class="curveTable"
      border="1"
      style="width: 1140px; line-height: 30px"
    >
      <tr>
        <td colspan="10" class="tl">计量器具：</td>
      </tr>
      <tr>
        <td colspan="3" class="tl05"> 
          <el-checkbox
            :disabled="isCopy"
            @change="(data) => change(data, 1)"
            v-model="data.valueData.checked[0]"
          ></el-checkbox>
          电子天平：
        </td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[0]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[0]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="tl05">
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[1]"
            @change="(data) => change(data, 2)"
          ></el-checkbox>
          容量瓶：
        </td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[1]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[1]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="tl05">
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[2]"
            @change="(data) => change(data, 3)"
          ></el-checkbox>
          单标吸管：
        </td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[2]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[2]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="tl05">
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[3]"
            @change="(data) => change(data, 4)"
          ></el-checkbox>
          移液管：
        </td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[3]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[3]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="tl05">
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[4]"
            @change="(data) => change(data, 5)"
          ></el-checkbox>
          移液枪：
        </td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[4]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[4]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="tl05">
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[5]"
            @change="(data) => change(data, 6)"
          ></el-checkbox>
          微量进样器：
        </td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[5]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[5]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="tl05">
          <el-checkbox
            :disabled="isCopy"
            v-model="data.valueData.checked[6]"
            @change="(data) => change(data, 7)"
          ></el-checkbox>
          注射器：
        </td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.guiGeArr[6]"
          ></divModel>
        </td>
        <td>编号:</td>
        <td colspan="3">
          <divModel
            :edit="!isCopy"
            v-model="data.valueData.biaoHaoArr[6]"
          ></divModel>
        </td>
      </tr>
      <tr>
        <td colspan="3" class="tl05">依据标准：</td>
        <td colspan="7" @click="selectMethods">
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
  queryStandardByMaterialId,
} from "@/api/laboratory";
export default {
  name: "curve_mid",
  props: ["data", "target", "jsonString",'onlyRead'],
  data() {
    return {
      dialogVisible: false,
      standardDialog: false,
      tableData: [],
      type: null,
      selectData: null,
      standardSelectData: null,
      standardTableData: [],
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
    },
  },
  computed: {
    isCopy() {
      if (this.$route.query.copy) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    selectMethods() {
      let arr = this.jsonString.filter((item) => item.to == "curve_head");
      let data = arr[0].data.valueData.point.map((item) => item.id);
      queryStandardByMaterialId(data).then((res) => {
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
        queryBySysDeviceType(type).then((res) => {
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
        this.data.valueData.standard = `${this.standardSelectData.standardNum}${this.standardSelectData.standardName}`;
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
    },
  },
};
</script>

<style scoped>
</style>
