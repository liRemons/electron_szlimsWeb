<template>
  <div class="___relative historyParent" style="padding-top: 20px;">
    <div :class="{ eventCover: !ableInput }"></div>
    <table border="1" class="myTableReset _normalHeight_">
      <tr>
        <th align="left" colspan="3" class="p20 historyTitle">
          {{ data.valueData.testProjectChineseName }}
        </th>
      </tr>
      <tr>
        <th class="p20 tc" colspan="3">标准要求</th>
      </tr>
      <tr>
        <td class="p20 tl" colspan="3" style="line-height: 16px;">
          验收&状态：口内机：1.5mmAl；口外机：1.8mmAl@60kV，2.1mmAl@70kV，
          2.3mmAl@80kV，2.5mmAl@90kV，2.7mmAl@100kV，3.0mmAl@110kV，3.2mmAl@120kV，
          3.3mmAl@125kV。对于标准中未直接写明的管电压档位利用内差法计算标准要求。
        </td>
      </tr>
      <tr>
        <th class="p20 tc" colspan="3">检测及计算方法</th>
      </tr>
      <tr>
        <td class="p20 tl" colspan="3">
          采用直读法，可选择管电压指示的偏离项目时检测的管电压下进行测量。
        </td>
      </tr>

      <tr>
        <th colspan="3">检测结果</th>
      </tr>
      <tr>
        <td>曝光模式</td>
        <td>管电压/kV</td>
        <td>HVL/mmAl</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point">
        <td>
          <selectModel
            @returnVal="(a) => change(a, item)"
            :Judge="true"
            class="___absolute"
            style="top: 0px"
            :special="1"
            :receive="''"
            :single="true"
            :rows="false"
            :transmitText="item.rows[2]"
            :list="resolvingPower"
            :Obj="''"
          >
          </selectModel>
        </td>
        <td>
          <divModel
            v-model="item.rows[0]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
        </td>
        <td class="___relative">
          <divModel
            v-model="item.rows[1]"
            style="width: 100%; text-align: center;"
            class="moduleInput hide focusBg"
          ></divModel>
          <div
            class="__functionBox"
            v-if="
              index != data.valueData.point.length - 1 &&
              ipdTemplate == 'ipdTemplate' &&
              data.valueData.point.length > 1 &&
              target == 0
            "
            style="right: -70px; width: 20px; z-index: 100;"
          >
            <div
              class="__functionButton6"
              @dblclick="reduce(index)"
              style="right: 0;"
            >
              <span>-</span>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <div
      class="__functionBox"
      v-if="ipdTemplate == 'ipdTemplate' && target == 0"
    >
      <div
        class="__functionButton6"
        @dblclick="reduce(data.valueData.point.length - 1)"
        style="right: 30px;"
      >
        <span>-</span>
      </div>
      <div class="__functionButton6" @click="increase">
        <span>+</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {};
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
    // 曝光模式
    change(a, b) {
      b.rows[2] = a;
    },
    reduce(index) {
      if (this.data.valueData.point.length > 1) {
        this.data.valueData.point.splice(index, 1);
        this.$emit("redefinition");
      }
    },
    increase() {
      let obj = {
        rows: ["", ""],
      };
      this.data.valueData.point.push(obj);
      this.$emit("redefinition");
    },
  },
  computed:{
  ...mapState({
      resolvingPower: (state) => state.StomatologyLinkage.resolvingPower,
    })
  },
  components: {
    
  },
  mounted() {},
};
</script>


<style scoped>
</style>
