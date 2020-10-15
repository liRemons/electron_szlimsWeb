<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <p>{{ data.valueData.correct }}:</p>
      <table class="myTable">
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>天气</span>
          </td>
          <td class="___relative tc" style="width: 130px">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="''"
                v-if="!data.valueData.showInput"
                :transmitText="data.valueData.weather"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="['晴', '阴', '雨', '自定义']"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="data.valueData.weather"
                @change.native="
                  (el) => {
                    noShowInput(el);
                  }
                "
              ></myInput>
            </div>
            <div v-else>{{ data.valueData.weather }}</div>
          </td>
          <td class="___relative" style="width: 210px">
            <span class="ml5">温度：</span>
            <myInput
              style="text-align: center; width: 50px"
              v-model="data.valueData.temperature[0]"
              :defaultValue="data.valueData.temperature[0]"
            ></myInput>
            <span>至</span>
            <myInput
              style="text-align: center; width: 50px"
              v-model="data.valueData.temperature[1]"
              :defaultValue="data.valueData.temperature[1]"
            ></myInput>
            <span>℃</span>
          </td>
          <td class="___relative tc" style="width: 220px">
            <span class="ml5">湿度：</span>
            <myInput
              style="text-align: center; width: 50px"
              v-model="data.valueData.humidity[0]"
              :defaultValue="data.valueData.humidity[0]"
            ></myInput>
            <span>至</span>
            <myInput
              style="text-align: center; width: 50px"
              v-model="data.valueData.humidity[1]"
              :defaultValue="data.valueData.humidity[1]"
            ></myInput>
            <span>%（RH）</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
      sampleOption: "",
    };
  },
  computed: {},
  props: [
    "ipdTemplate",
    "pageNumber",
    "data",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "task",
    "target",
    "deviceData",
  ],
  filters: {},
  methods: {
    returnVal(val, name, index) {
      if (val !== "自定义") {
        this.data.valueData.weather = val;
      } else {
        this.data.valueData.showInput = true;
        this.data.valueData.weather = " ";
        this.$forceUpdate();
      }
    },
    noShowInput(el) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.data.valueData.weather = val;
      if (val === "") {
        this.data.valueData.showInput = false;
      }
      this.$forceUpdate();
    },
  },
  mounted() {},
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
.btn2 {
  width: 50px;
  height: 32px;
  line-height: 32px;
  background: gray;
  cursor: pointer;
  user-select: none;
  color: white;
  border-radius: 2px;
}
</style>
