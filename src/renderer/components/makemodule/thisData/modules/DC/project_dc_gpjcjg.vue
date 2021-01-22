<template>
  <div class="_normalHeight_">
    <p>{{ data.valueData.correct }}</p>
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
        <td style="font-size:12px">算数平均值</td>
      </tr>
      <template
        class="___relative"
        v-for="(item, index) in data.valueData.point"
      >
        <tr :key="item.pointNum + 'a'">
          <td rowspan="2">{{ item.pointNum }}</td>
          <td
            rowspan="2"
            colspan="3"
            style="height:64px !important"
            class="___relative"
          >
            <textarea
              v-if="target == 0"
              style="
                  height: 100% !important;
                  width: 98%;
                  margin-top:10px;
                  border: none;
                  resize: none;
                "
              v-model="item.pointDescribe"
            />

            <span v-else>{{ item.pointDescribe }}</span>
            <div
              class="___absolute toolBar"
              style="left: 700px; top: 0; width: 60px"
              v-if="target == 0"
            >
              <div title="新增一行" class="___absolute tc" @click="add(item)">
                +
              </div>
              <div
                title="删除当前行"
                class="___absolute tc"
                style="left: 30px"
                @dblclick="del(index)"
              >
                -
              </div>
            </div>
          </td>
          <td
            v-for="(a, b) in item.rows[0]"
            :style="{
              whiteSpace: b == 0 && 'normal',
              lineHeight: b == 0 && '15px',
              fontSize: b == 0 && '12px',
            }"
            :key="b + 'rows0'"
          >
            <span v-if="[0, 6].includes(b)"> {{ a }}</span>
            <myInput
              v-else
              v-model="item.rows[0][b]"
              @input="(e) => changeNum(e, 0, index, 0)"
            ></myInput>
          </td>
        </tr>
        <tr :key="item.pointNum + 'b'">
          <td
            v-for="(a, b) in item.rows[1]"
            :style="{
              whiteSpace: b == 0 && 'normal',
              lineHeight: b == 0 && '15px',
              fontSize: b == 0 && '12px',
            }"
            :key="b + 'rows1'"
          >
            <span v-if="[0, 6].includes(b)"> {{ a }}</span>
            <myInput
              v-else
              v-model="item.rows[1][b]"
              @input="(e) => changeNum(e, 2, index, 1)"
            ></myInput>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>
<script>
export default {
  props: ["data", "target", "jsonString"],
  methods: {
    add(data) {
      let obj = Object.assign({}, data);
      for (let keys in obj) {
        keys !== "rows" && (obj[keys] = "");
      }
      obj.rows = [
        ["电场强度\nE(V/m)", "", "", "", "", "", ""],
        ["磁感应强度\nB(μT)", "", "", "", "", "", ""],
      ];
      this.data.valueData.point.push(obj);
      this.$emit("redefinition");
    },
    del(index) {
      let point = this.__getPoint(this.jsonString, "project_dc_gpjcjg");
      point.length > 1 && this.data.valueData.point.splice(index, 1);
      this.$emit("redefinition");
    },
    changeNum(e, n, index, rowsIndex) {
      let numArr = this.data.valueData.point[index].rows[rowsIndex].slice(1, 6);
      numArr = numArr.map((item) => Number(item));
      this.data.valueData.point[index].rows[rowsIndex][6] = this[
        "IntegerAdd" + n
      ]((this.$utils.SUM(numArr) / 5).toFixed46(n == 0 ? 1 : n));
    },
  },
};
</script>
