<template>
  <div>
    <p>{{ data.valueData.correct }}:</p>
    <table class="myTable">
      <tr>
        <td colspan="2">检测设备名称</td>
        <td>主要波源/检测频率</td>
        <td>类型</td>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        style="line-height: 32px;"
      >
        <td colspan="2"><myInput v-model="item.deviceName"></myInput></td>
        <td><myInput v-model="item.value"></myInput></td>
        <td class="___relative">
          <selectModel
            @returnVal="(a) => returnVal(a, item, 'detectionType')"
            :Judge="true"
            :special="''"
            :transmitText="item.detectionType"
            :multi-select="false"
            :receive="'detectionType'"
            :single="true"
            :rows="false"
            :list="['射频', '工频', '射频+工频']"
            :Obj="''"
          >
          </selectModel>
          <div
            class="___absolute toolBar"
            style="left: 220px; top: 0; width: 60px"
            v-if="target == 0"
          >
            <div
              title="往指定行后面增加一行"
              class="___absolute tc"
              @click="add(item)"
            >
              +
            </div>
            <div
              title="删除当前行"
              class="___absolute tc"
              style="left: 30px"
              v-if="index"
              @dblclick="del(index)"
            >
              -
            </div>
            <el-button
              v-if="index === data.valueData.point.length - 1"
              class="___absolute"
              icon="el-icon-search"
              circle
              @click="createPoint"
              style="left:90px;top:5px"
              size="mini"
            ></el-button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import DCModules from "../../dataJs/sonModules/dc";
export default {
  props: ["data", "target", "jsonString"],
  methods: {
    returnVal(e, item, keys) {
      item[keys] = e;
    },
    add(data) {
      let obj = Object.assign({}, data);
      for (let keys in obj) {
        obj[keys] = "";
      }
      obj.id = uuid();
      this.data.valueData.point.push(obj);
      this.$emit("redefinition");
    },
    del(index) {
      this.data.valueData.point.splice(index, 1);
    },
    // 生成
    createPoint() {
      // 当前的有效点位
      let point = this.__getPoint(
        this.jsonString,
        "project_dc_gpspjcdxxx"
      ).filter((item) => item.deviceName && item.value && item.detectionType);
      if (!point.length) {
        this.$message.warning("请将数据填写完整");
        return;
      }
      // 找到检测结果的两个模板
      const searchModules = (name) => {
        let data = DCModules.find((item) => item.name === name);
        data.valueData.specifications = "工频";
        return {
          to: name,
          type: null,
          data,
        };
      };
      let GP = searchModules("project_dc_gpjcjg"); // 工频检测结果模块
      let SP = searchModules("project_dc_dchjcl"); // 射频检测结果模块
      let indexArr = [],
        startIndex = "",
        endIndex = "";

      // 将之前的此两个模块清空 ============   START
      this.jsonString.forEach((item, index) => {
        if (["project_dc_gpjcjg", "project_dc_dchjcl"].includes(item.to)) {
          indexArr.push(index);
        }
      });
      if (indexArr.length) {
        indexArr = [...new Set(indexArr)];
        startIndex = Math.min(...indexArr);
        endIndex = Math.max(...indexArr);
        this.jsonString.splice(startIndex, endIndex);
      }
      // ======================================== END
      // 根据类型区分后的点位
      let newPoint = [];
      point.forEach((item) => {
        item.detectionType.split("+").forEach((a) => {
          newPoint.push({
            deviceName: item.deviceName,
            type: a,
            value: item.value,
          });
        });
      });
      let pointArr = [];
      const initPoint = (obj, id) => {
        obj.data.valueData.multipleId = id;
        obj.data.valueData.foreverId = id;
        obj.data.valueData.pointId = id;
        return obj;
      };
      newPoint.forEach((item) => {
        if (item.type === "工频") {
          let id = uuid();
          GP.data.valueData.correct =
            item.deviceName + item.type + "的检测结果";
          GP = initPoint(GP, id);
          pointArr.push(this.deepCopy(GP));
        } else if (item.type === "射频") {
          let id = uuid();
          SP.data.valueData.correct =
            item.deviceName + item.type + "的检测结果";
          SP = initPoint(SP, id);
          pointArr.push(this.deepCopy(SP));
        }
      });

      let Index = this.jsonString.findIndex(
        (item) => item.to === "project_deleteReason"
      );
      if (index) {
        this.jsonString.splice(Index, 0, ...pointArr);
      } else {
        this.jsonString.push(...pointArr);
      }
      this.$emit("redefinition");
    },
  },
};
</script>
