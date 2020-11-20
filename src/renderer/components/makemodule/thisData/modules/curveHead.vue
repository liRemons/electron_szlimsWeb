<template>
  <div class="___relative">
    <table
      class="curveTable"
      style="width: 1140px; line-height: 30px"
      border="1"
    >
      <tr>
        <td colspan="2">标准物质</td>
        <td>
          标准值
          <CurveUnit
            :unit="data.valueData.unit"
            :type="1"
            @change="
              (val) => {
                data.valueData.unit = val;
              }
            "
          ></CurveUnit>
        </td>
        <td colspan="2">国标号(或批号)</td>
        <td colspan="2">实验室编号</td>
        <td>生产日期</td>
        <td>失效效期</td>
        <td>基体</td>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        :key="item.id + index + 'head'"
      >
        <td colspan="2">
          <el-select
            value-key="id"
            v-model="item.materialNameData"
            @change="(val) => changeMaterial(val, index)"
            @focus="focusMaterial"
            placeholder=""
          >
            <el-option
              :disabled="disabledArr.includes(a.id)"
              v-for="a in materialList"
              :key="a.id"
              :label="a.materialName"
              :value="a"
            >
            </el-option>
          </el-select>
        </td>
        <td>{{ item.standardValue }}</td>
        <td colspan="2">{{ item.batchNum }}</td>
        <td colspan="2">{{ item.laboratoryNum }}</td>
        <td>{{ item.invalidTime && item.invalidTime.split(" ")[0] }}</td>
        <td>{{ item.purchaseTime && item.purchaseTime.split(" ")[0] }}</td>
        <td class="___relative">
          {{ item.matrix }}
          <div
            class="___absolute"
            style="top: 0; right: -80px; width: 80px; text-align: left"
          >
            <div class="rowOption tc" @click="addRow(index)">+</div>
            <div class="rowOption tc" @click="delRow(index)">-</div>
            <el-button
              v-if="!onlyRead && index == 0"
              @click="create"
              size="mini"
              icon="el-icon-search"
              circle
            ></el-button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
import { queryAllMaterial } from "@/api/laboratory";
export default {
  name: "curveHead",
  props: ["data", "target", "jsonString", "onlyRead"],
  data() {
    return {
      disabledArr: [],
      materialList: [],
      canEdit: false,
    };
  },
  methods: {
    // 选择器
    changeMaterial(data, index) {
      Object.keys(this.data.valueData.point[index]).forEach((item) => {
        item !== "materialNameData" &&
          (this.data.valueData.point[index][item] = data[item]);
      });
    },

    // 得到焦点
    focusMaterial() {
      let headPoint = this.__getPoint("curve_head");
      this.disabledArr = [
        ...new Set(headPoint.map((item) => item.id).filter((item) => item)),
      ];
    },
    // 置空
    empty(index) {
      let obj = Object.assign({}, this.data.valueData.point[index]);
      Object.keys(obj).forEach((item) => {
        item !== "materialNameData" ? (obj[item] = "") : (obj[item] = {});
      });
      return obj;
    },
    // 新增
    addRow(index) {
      let obj = this.empty(index);
      this.data.valueData.point.push(obj);
      bus.$emit("reset");
    },
    // 删除
    delRow(index) {
      let headPoint = this.__getPoint("curve_head");
      headPoint.length > 1 && this.data.valueData.point.splice(index, 1);
      bus.$emit("reset");
    },
    // 生成foot
    create() {
      let headPoint = this.__getPoint("curve_head"),
        footPointData = {}, //单个 curve_foot point 对象数据
        footPoint = [], // 根据当前界面生成的foot point
        Index = [], // 所有curve_foot组件索引，用来重置 jsonString
        foot = this.jsonString.find((item) => item.to === "curve_foot");
      // 所有 curve_foot 索引
      this.jsonString.forEach((item, index) => {
        item.to === "curve_foot" && Index.push(index);
      });
      let name = headPoint
        .map((item) => item.materialName)
        .filter((item) => item.includes("TVOC"));
      if (Index.length > 1) {
        let length = Index.slice(-1) - Index[0];
        this.jsonString.splice(Index[0] + 1, length);
      }
      Object.keys(Object.assign({}, foot.data.valueData.point[0])).forEach(
        (item) => {
          footPointData[item] = "";
        }
      );
      footPointData.noUse = true;
      footPointData.count = 1;
      // 选择标准物质为TVOC，可能为 50325 标准
      if (name.length >= 1 && name.length !== headPoint.length) {
        this.$message.warning("检测到您选择了TVOC，不支持选择多个");
        this.jsonString[Index[0]].data.valueData.point = [footPointData];
        return;
      }
      headPoint.forEach((item, index) => {
        footPoint[index] = JSON.parse(JSON.stringify(footPointData));
        Object.keys(footPointData).forEach((a) => {
          if (item.hasOwnProperty(a)) footPoint[index][a] = item[a];
        });
      });
      this.jsonString[Index[0]].data.valueData.point = footPoint;
      bus.$emit("reset");
    },
    async getMaterialSel() {
      let res = await queryAllMaterial();
      if (res.success) {
        this.materialList = res.datas;
      } else {
        this.$message.error(res.msg);
      }
    },
  },
  mounted() {
    this.getMaterialSel();
  },
};
</script>

<style scoped>
</style>
