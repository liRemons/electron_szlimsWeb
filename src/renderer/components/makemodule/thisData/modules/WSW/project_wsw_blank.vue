<template>
  <table class="myTable">
    <tr v-for="(item, index) in data.valueData.testResults" class="delLine">
      <td v-if="item.noEdit">
        <div v-if="item.noEdit">
          <selectModel
            style="line-height: 32px"
            @returnVal="(a) => returnVal2(a, index)"
            :Judge="true"
            :special="1"
            :transmitText="item.sampleNum"
            :multi-select="false"
            :receive="'sampleNum'"
            :single="true"
            :rows="false"
            :list="['实验室空白对照', '阳性对照', '阴性对照']"
            :Obj="''"
          >
          </selectModel>
        </div>

        <!-- <myInput v-else v-model="item.sampleNum"></myInput> -->
      </td>
      <td class="___relative" style="line-height: 32px" v-if="item.noEdit">
        <selectModel
          @returnVal="(a) => returnVal(a, index)"
          :Judge="true"
          :special="1"
          v-if="item.showInput"
          :transmitText="item.testResult"
          :multi-select="false"
          :receive="'id'"
          :single="true"
          :rows="false"
          :list="['未检出', '无菌落生长', '自定义']"
          :Obj="''"
        >
        </selectModel>
        <myInput
          v-else
          v-model="item.testResult"
          class="___absolute"
          style="left: 0px; top: 1px"
        ></myInput>
        <div
          class="___absolute myBtn"
          style="left: 600px; top: -0px"
          @click="addRow(index)"
        >
          +
        </div>
        <div
          class="___absolute myBtn"
          style="left: 640px; top: -0px"
          @click="delRow(index)"
        >
          -
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "project_wsw_blank",
  props: ["data"],
  data() {
    return {
      flag: true,
    };
  },
  methods: {
    addRow(index) {
      let row = { sampleNum: "", testResult: "", noEdit: true };
      this.data.valueData.testResults.push(row);
    },
    delRow(index) {
      let item = this.data.valueData.testResults[index];
      if (item.sampleNum.indexOf("KB") !== -1) {
        this.$notify({
          type: "warning",
          message: "不能刪除KB系列的空白样品！",
        });
        return;
      } else {
        this.data.valueData.testResults.splice(index, 1);
      }
    },
    returnVal(a, b) {
      if (a == "自定义") {
        this.data.valueData.testResults[b].showInput = false;
      } else {
        this.data.valueData.testResults[b].testResult = a;
      }
    },
    returnVal2(a, b) {
      if (a == "自定义") {
        this.data.valueData.testResults[b].showInput2 = false;
      } else {
        this.data.valueData.testResults[b].sampleNum = a;
      }
    },
  },
  mounted() {
    let blanks = [];
    // return
    try {
      if (
        this.$parent.$props.target === "1" &&
        this.data.valueData.testResults.length <= 1
      ) {
        this.data.valueData.testResults = [this.data.valueData.testResults[0]]; //清空数据
        this.data.valueData.point.forEach((item, index) => {
          item.myBlankSample.forEach((val, num) => {
            if (
              !blanks.some((v, i) => {
                return v.sampleNum === val.sampleNum;
              })
            ) {
              blanks.push({
                sampleNum: val.sampleNum,
                testResult: "",
                noEdit: true,
                blankSampleId: val.id,
              });
            }
          });
        });
        this.data.valueData.testResults.push(...blanks);
      }
    } catch (e) {
      blanks = [];
    }
    this.data.valueData.testResults.forEach((item) => {
      if (item.showInput == undefined) {
        item.showInput = true;
      }
      if (item.showInput2 == undefined) {
        item.showInput2 = true;
      }
    });
  },
};
</script>

<style scoped>
</style>
