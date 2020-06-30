<template>
  <table class="myTable">
    <tr v-for="(item, index) in data.valueData.testResults" class="delLine">
      <td v-if="item.noEdit">
        <div v-if="item.noEdit">
          {{ item.sampleNum }}
        </div>
        <myInput v-else v-model="item.sampleNum"></myInput>
      </td>
      <td class="___relative" v-if="item.noEdit">
        <myInput
          v-model="item.testResult"
          class="___absolute"
          style="left: 0px; top: 1px;"
        ></myInput>
        <div
          class="___absolute myBtn"
          style="left: 600px; top: -0px;"
          @click="addRow(index)"
        >
          +
        </div>
        <div
          class="___absolute myBtn"
          style="left: 640px; top: -0px;"
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
  methods: {
    addRow(index) {
      let row = { sampleNum: "", testResult: "", noEdit: false };
      this.data.valueData.testResults.splice(index + 1, 0, row);
    },
    delRow(index) {
      let item = this.data.valueData.testResults[index];
      if (item.sampleNum.indexOf("KB") !== -1) {
        this.$notify({
          type: "warning",
          message: "不能刪除KB系列的空白样品！"
        });
        return;
      } else {
        this.data.valueData.testResults.splice(index, 1);
      }
    }
  },
  mounted() {
    console.log(this.data.valueData.testResults);
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
                blankSampleId: val.id
              });
            }
          });
        });
        this.data.valueData.testResults.push(...blanks);
      }
    } catch (e) {
      blanks = [];
    }
  }
};
</script>

<style scoped>
</style>
