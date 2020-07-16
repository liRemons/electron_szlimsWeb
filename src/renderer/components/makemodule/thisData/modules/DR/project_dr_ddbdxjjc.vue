<template>
  <div style="line-height: 30px; padding-top: 10px;" class="___relative">
    <div :class="{ eventCover: target !== '0' }"></div>
    <div>
      <div style="text-align: center;">
        <div
          style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;"
        >
          低对比度细节检测（{{data.valueData.title}}）
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          标准要求
        </div>
        <div style="border: 1px solid black; border-top: none;" class="tl">
          验收：建立基线值；状态：与基线值比较不超过2个细节变化。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测及计算方法
        </div>
        <div
          style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;"
          class="tl"
        >
          有可能的话取出滤线栅。选取合适的SID、管电压和滤过，入射空气比释动能分别选取约1μGy、5μGy、10μGy，进行三次曝光获取影像，并记录检测结果，验收检测控模体说明书判断或建立基线值，状态检测与基线值进行比较。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测结果
        </div>
        <div style="border: 1px solid black; border-top: none; padding: 4px;">
          <div class="___relative">
            <div
              class="___absolute"
              style="left: 6px; width:90px; text-align: left;"
            >
              使用的模体：
            </div>
            <selectModel
              @returnVal="returnVal"
              :Judge="true"
              class="___absolute"
              style="width: 275px;left: 90px; border-bottom: 1px solid black;"
              :special="1"
              :multi-select="false"
              :transmit-text="data.valueData.modelName"
              :receive="'id'"
              :single="true"
              :rows="false"
              :list="list"
              :Obj="''"
            >
            </selectModel>
          </div>
        </div>
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td colspan="2">剂量水平</td>
          <td>1μGy</td>
          <td>5μGy</td>
          <td>10μGy</td>
        </tr>
        <tr>
          <td rowspan="2">基线值</td>
          <td>细节数</td>
          <td>
            <myInput
              v-model="data.valueData.point[0].v1"
              v-if="result"
            ></myInput>
            <div v-else>/</div>
          </td>
          <td>
            <myInput
              v-model="data.valueData.point[0].v2"
              v-if="result"
            ></myInput>
            <div v-else>/</div>
          </td>
          <td>
            <myInput
              v-model="data.valueData.point[0].v3"
              v-if="result"
            ></myInput>
            <div v-else>/</div>
          </td>
        </tr>
        <tr>
          <td>对比度</td>
          <td>
            <myInput
              v-model="data.valueData.point[1].v1"
              v-if="result"
            ></myInput>
            <div v-else>/</div>
          </td>
          <td>
            <myInput
              v-model="data.valueData.point[1].v2"
              v-if="result"
            ></myInput>
            <div v-else>/</div>
          </td>
          <td>
            <myInput
              v-model="data.valueData.point[1].v3"
              v-if="result"
            ></myInput>
            <div v-else>/</div>
          </td>
        </tr>
        <tr>
          <td rowspan="2">检测结果</td>
          <td>细节数</td>
          <td>
            <myInput v-model="data.valueData.point[2].v1"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.point[2].v2"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.point[2].v3"></myInput>
          </td>
        </tr>
        <tr>
          <td>对比度</td>
          <td>
            <myInput v-model="data.valueData.point[3].v1"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.point[3].v2"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.point[3].v3"></myInput>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <p>
              <el-checkbox v-model="data.valueData.checkboxsValue[0]">
                建立基线值
              </el-checkbox>
            </p>
            <p>
              <el-checkbox v-model="data.valueData.checkboxsValue[1]">
                细节数变化
              </el-checkbox>
            </p>
          </td>
          <td>
            <myInput
              v-model="data.valueData.point[4].v1"
              v-if="data.valueData.checkboxsValue[1] && state === '状态检测'"
            ></myInput>
            <div v-else>{{ data.valueData.point[4].v1 }}</div>
          </td>
          <td>
            <myInput
              v-model="data.valueData.point[4].v2"
              v-if="data.valueData.checkboxsValue[1] && state === '状态检测'"
            ></myInput>
            <div v-else>{{ data.valueData.point[4].v2 }}</div>
          </td>
          <td>
            <myInput
              v-model="data.valueData.point[4].v3"
              v-if="data.valueData.checkboxsValue[1] && state === '状态检测'"
            ></myInput>
            <div v-else>{{ data.valueData.point[4].v3 }}</div>
          </td>
        </tr>
      </table>

      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none; text-align: center;"
      >
        备注
      </div>
      <div style="border: 1px solid black;border-top: none; text-align: left;">
        <p style="margin-left: 200px;">
          <el-checkbox
            v-model="data.valueData.note[0]"
            @change="changeNote"
            :disabled="state === '验收检测'"
            >新标准实施后首次检测，建立基线值。
          </el-checkbox>
        </p>
        <p style="margin-left: 200px;">
          <el-checkbox
            v-model="data.valueData.note[1]"
            @change="changeNote"
            :disabled="state === '验收检测'"
            >无法确认建立基线值的检测条件，建立基线值。
          </el-checkbox>
        </p>
      </div>
      <div
        class="___absolute myBtn"
        style="left: 750px; top: 0px; width: 65px; text-align: center;"
        @click="sure"
        v-if="target === '0'"
      >
        完成
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project_dr_ddbdxjjc",
  props: ["data", "jsonString", "target"],
  data() {
    return {
      list: [
        "低对比度测试卡",
        "IEC低对比度模体",
        "UAB低对比度模体",
        "TO-16或TO-20低对比度细节模体",
        "CDRAD低对比度模体",
        "DIGI-13多功能检验模体"
      ]
    };
  },
  watch: {
    "data.valueData.point": {
      deep: true,
      handler: function(point) {
        let item = point[3];
        if (!this.data.valueData.checkboxsValue[1]) {
          this.data.valueData.point[4].v1 = item.v1;
          this.data.valueData.point[4].v2 = item.v2;
          this.data.valueData.point[4].v3 = item.v3;
        }
      }
    },
    "data.valueData.checkboxsValue": function(val) {
      if (val[1]) {
        this.data.valueData.point[4].v1 = "";
        this.data.valueData.point[4].v2 = "";
        this.data.valueData.point[4].v3 = "";
      } else {
        this.data.valueData.point[4].v1 = this.data.valueData.point[3].v1;
        this.data.valueData.point[4].v2 = this.data.valueData.point[3].v2;
        this.data.valueData.point[4].v3 = this.data.valueData.point[3].v3;
      }
      this.$eventBus.$emit("myInputRefre");
    }
  },
  computed: {
    state() {
      return this.detectionType(
        this.jsonString.find(item => item.to === "project_jbxx").data.valueData
          .purposeDetection
      );
    },
    noteResult() {
      return this.data.valueData.note.some(item => item);
    },
    result() {
      return this.noteResult || this.state !== "验收检测";
    }
  },
  methods: {
    returnVal(val) {
      this.data.valueData.modelName = val;
    },
    sure() {
      if (
        this.state === "状态检测" &&
        this.data.valueData.note.every(item => item === false)
      ) {
        let result = true;
        for (let i = 0; i < 4; i++) {
          let item = this.data.valueData.point[i];
          if (item.v1 === "" || item.v2 === "" || item.v3 === "") {
            result = false;
          }
        }

        if (result === false) {
          this.$notify({
            type: "warning",
            message: "基线值和检测结果的数值都要填写"
          });
        } else {
          this.$notify({
            type: "success",
            message: "已完成"
          });
        }
      } else {
        this.$notify({
          type: "success",
          message: "已完成"
        });
      }
    },
    changeNote(flag) {
      if (flag) {
        for (let i = 0; i < 2; i++) {
          this.data.valueData.point[i].v1 = "";
          this.data.valueData.point[i].v2 = "";
          this.data.valueData.point[i].v3 = "";
        }
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>