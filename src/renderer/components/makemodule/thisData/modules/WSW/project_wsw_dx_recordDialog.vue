<template>
  <!-- 定性观察记录弹框 -->
  <div>
    <!-- name -->
    <el-tag>{{ sampleData.name }}</el-tag>
    <br />
    <el-tag class="mt10" v-show="firstDate">第一次记录日期：{{ firstDate }}</el-tag>
    <br />
    <el-tag class="mt10" v-show="lastTime">上一次记录日期：{{ lastTime }}</el-tag>
    <table class="myTable mt20">
      <tr>
        <td>分析项</td>
        <td colspan="2">观察结果</td>
      </tr>
      <tr v-for="item in sampleData.analysisItems">
        <td style="white-space: normal">{{ item.analysisItem }}</td>
        <td colspan="2">
          <el-input type="textarea" v-model="item.result"> </el-input>
        </td>
      </tr>
    </table>
    <p class="tc mt20">
      <el-button round @click="$emit('close')">取消</el-button>
      <el-button type="primary" round @click="submit">提交</el-button>
    </p>
  </div>
</template>

<script>
export default {
  props: ["sampleData"],
  data() {
    return {
      firstDate: "",
      lastTime: "",
    };
  },
  mounted() {
    let recordArr = this.sampleData.sysObservationRecordArr;
    if (recordArr && recordArr.length) {
      this.firstDate = recordArr[0].date;
      this.lastTime = recordArr[recordArr.length - 1].date;
    }
   this.sampleData.analysisItems&& this.sampleData.analysisItems.forEach((item) => {
      item.result = "";
    });
  },
  methods: {
    submit() {
      let resultArr = this.sampleData.analysisItems.map((item) => {
        return {
          result: item.result,
          analysisItem: item.analysisItem,
        };
      });
      let data = {
        id: this.sampleData.id,
        sampleNumAndIndex:this.sampleData.sampleNumAndIndex,
        resultArr,
        date: this.$utils.dateFormat("", "yyyy-MM-dd"),
      };
      this.$emit("submit", data);
    },
  },
};
</script>


<style lang="less" scoped>
/deep/.el-textarea__inner {
  border-radius: 0 !important;
}
</style>