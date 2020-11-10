<template >
  <div>
    <table class="myTable">
      <tr>
        <th colspan="8">本底测量</th>
      </tr>
      <tr>
        <th colspan="5">测量读数</th>
        <th colspan="3">计算结果</th>
      </tr>
      <tr
        v-for="(item, index) in data.valueData.point"
        :key="index + 'project_fh_bd'"
      >
        <td
          v-for="(i, a) in item.row"
          :colspan="i | colspan"
          :key="a + 'project_fh_bd_2'"
          style="line-height: 30px"
          class="___relative tc"
        >
          <span v-if="index === 0 || index == 2 || isShow(i) || a == 6">{{
            i
          }}</span>
          <divModel
            v-else
            v-model="item.row[a]"
            style="width: 100%"
            class="Full warp2 rowsInput2 hide focusBg tc"
          ></divModel>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  props: ["data", "target"],
  filters: {
    colspan(data) {
      let arr = ["最小值", "平均值", "最大值", "本底范围"];
      return arr.includes(data) ? 2 : 1;
    },
  },
  methods: {
    isShow(data) {
      let arr = ["最小值", "平均值", "最大值", "本底范围"];
      return arr.includes(data);
    },
  },
};
</script>