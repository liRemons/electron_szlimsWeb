<template>
  <div>
    <table class="myTable">
      <tr>
        <td rowspan="2">点位序号</td>
        <td rowspan="2" colspan="3">检测点位描述</td>
        <td rowspan="2">检测参数</td>
        <td colspan="6">检测结果</td>
      </tr>
      <tr>
        <td>n₁</td>
        <td>n₂</td>
        <td>n₃</td>
        <td>n₄</td>
        <td>n₅</td>
        <td>算数平均值</td>
      </tr>
      <template v-for="item in data.valueData.point">
        <tr>
          <td rowspan="2">{{ item.no }}</td>
          <td rowspan="2" colspan="3">
            <textarea
              v-if="target == 0"
              style="
                  text-align: center;
                  height: 64px !important;
                  width: 98%;
                  border: none;
                  resize: none;
                "
              class="editHistoryValue"
              v-model="data.valueData.checkUnitAddress"
            />
          </td>
          <td rowspan="2"></td>
          <td v-for="a in item.rows[0]"></td>
        </tr>
        <tr>
          <td v-for="a in item.rows[1]"></td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script>
export default {
  props: ["data", "target"],
};
</script>
