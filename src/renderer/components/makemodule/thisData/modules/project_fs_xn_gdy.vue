<template>
  <div class="___relative" style="padding-top: 20px;">
    <div :class="{ eventCover: !ableInput }"></div>
    <table border="1" class="myTableReset _normalHeight_">
      <tr>
        <th align="left" class="p20">
          {{ data.valueData.testProjectChineseName }}
        </th>
      </tr>
      <tr>
        <th class="p20 tc">标准要求</th>
      </tr>
      <tr>
        <td class="p20 tl" style="line-height: 16px;">
          验收&状态：管电压≥60kV@全景机和管电压固定的牙片机；管电压≥50kV@管电压可调的牙片机；相邻档管电压增量不超过5kV@分档调节的牙片机和全景机。
        </td>
      </tr>
      <tr>
        <th class="p20 tc">检测及计算方法</th>
      </tr>
      <tr>
        <td class="p20 tl">
          观察并记录设备的最低管电压；如管电压采用分档调节，观察并记录相邻档的管电压增量。
        </td>
      </tr>
      <tr>
        <th class="p20">检测结果</th>
      </tr>
      <tr>
        <td align="left" class="p20 ___relative" style="height: 32px;">
          <el-checkbox
            @change="changeNum2"
            v-model="data.valueData.check1"
            :disabled="disabled.disCheck1"
            >管电压固定，管电压：</el-checkbox
          >
          <div
            class="___absolute t0"
            style="width: 70px; height: 32px; left: 190px;"
          >
            <divModel
              v-if="data.valueData.check1"
              v-model="data.valueData.voltage1"
              style="
                width: 50px;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
              "
              class="Full moduleInput hide focusBg"
            ></divModel>
            <span class="___absolute right0">kV</span>
          </div>
        </td>
      </tr>
      <tr>
        <td align="left" class="p20 ___relative">
          <el-checkbox
            @change="changeNum"
            v-model="data.valueData.check2"
            :disabled="disabled.disCheck2"
            >管电压可调，最低管电压：</el-checkbox
          >
          <div
            class="___absolute t0"
            style="width: 70px; height: 36px; left: 200px;"
          >
            <divModel
              v-if="data.valueData.check2"
              v-model="data.valueData.voltage2"
              style="
                width: 50px;
                text-align: center;
                border-bottom: 1px solid black;
                height: 28px;
              "
              class="Full moduleInput hide focusBg"
            ></divModel>
            <span class="___absolute right0">kV</span>
          </div>
          <el-checkbox
            @change="changeNum"
            style="margin-left: 50px;"
            :disabled="disabled.disCheck3"
            v-model="data.valueData.check3"
          >
            分档可调：相临管电压增量：
          </el-checkbox>
          <div
            class="___absolute t0"
            style="width: 70px; height: 32px; left: 520px;"
          >
            <divModel
              v-if="data.valueData.check3"
              v-model="data.valueData.voltage3"
              style="
                width: 50px;
                text-align: center;
                height: 28px;
                border-bottom: 1px solid black;
              "
              class="Full moduleInput hide focusBg"
            ></divModel>
            <span class="___absolute right0">kV</span>
          </div>
        </td>
      </tr>
      <tr>
        <th class="p20 tc">备注说明</th>
      </tr>
      <tr>
        <td class="___relative">
          <div style="height: 32px;">
            <divModel
              v-model="data.valueData.remarks"
              style="width: 100%; text-align: center;"
              class="Full moduleInput hide focusBg"
            ></divModel>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: { disCheck3: false, disCheck2: false, disCheck1: false },
    };
  },
  watch: {
    "data.valueData.check2": function (val) {
      if (val) {
        this.dis("disCheck1", "disCheck3", "disCheck2");
      } else {
        this.disFalse();
      }
    },
    "data.valueData.check3": function (val) {
      if (val) {
        this.dis("disCheck1", "disCheck2", "disCheck3");
      } else {
        this.disFalse();
      }
    },
    "data.valueData.check1": function (val) {
      if (val) {
        this.dis("disCheck2", "disCheck3", "disCheck1");
      } else {
        this.disFalse();
      }
    },
  },
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
    "target",
  ],
  methods: {
    dis(disTrue, disTrue1, disFalse) {
      this.disabled[disTrue] = true;
      this.disabled[disFalse] = false;
      this.disabled[disTrue1] = true;
    },
    disFalse() {
      this.disabled.disCheck1 = false;
      this.disabled.disCheck2 = false;
      this.disabled.disCheck3 = false;
    },
    changeNum() {
      this.data.valueData.voltage2 = this.data.valueData.check2
        ? this.data.valueData.voltage2
        : "";
      this.data.valueData.voltage3 = this.data.valueData.check3
        ? this.data.valueData.voltage3
        : "";
    },
    changeNum2() {
      this.data.valueData.voltage1 = this.data.valueData.check1
        ? this.data.valueData.voltage1
        : "";
    },
  },
  components: {},
  mounted() {
    this.disFalse();
    if (this.data.valueData.check1) {
      this.dis("disCheck2", "disCheck3", "disCheck1");
    } else if (this.data.valueData.check2) {
      this.dis("disCheck1", "disCheck3", "disCheck2");
    } else if(this.data.valueData.check3){
      this.dis("disCheck1", "disCheck2", "disCheck3");
    }
  },
};
</script>


<style scoped>
</style>
