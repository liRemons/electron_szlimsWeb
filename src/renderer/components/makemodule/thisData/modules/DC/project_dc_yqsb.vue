<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <p>{{ data.valueData.correct }}:</p>
      <table class="myTable">
        <tr>
          <td class="___relative tc" style="width: 120px">
            <span>检测用途</span>
          </td>
          <td class="___relative tc" style="width: 130px">
            <span>仪器编号</span>
          </td>
          <td class="___relative tc" style="width: 130px">
            <span>仪器型号</span>
          </td>
          <td class="___relative tc" style="width: 200px">
            <span>仪器名称</span>
          </td>
          <td class="___relative tc" style="width: 100px">
            <span>频率范围</span>
          </td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td class="___relative tc">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                :special="index"
                v-if="!item.showInput"
                :transmitText="item.rows[0]"
                :multi-select="false"
                :receive="'id'"
                :single="true"
                :rows="false"
                :list="['电场强度', '环境温湿度', '距离测量', '自定义']"
                :Obj="''"
              >
              </selectModel>
              <myInput
                style="text-align: center"
                v-else
                v-model="item.rows[0]"
                @change.native="
                  (el) => {
                    noShowInput(el, index);
                  }
                "
              ></myInput>
            </div>
            <div v-else>{{ item.rows[0] }}</div>
          </td>
          <td class="___relative tc">
            <querySelect
              v-model="item.rows[1]"
              v-if="target === '0'"
              ref="querySelect"
              :num="index"
              :list="deviceData"
              :defaultValue="item.rows[1]"
              @getSelectItem="returnVal2"
              :name="'deviceNum'"
            >
            </querySelect>
            <div v-else>
              {{ item.rows[1] }}
            </div>
          </td>
          <td class="___relative tc">
            <div>{{ item.rows[2] }}</div>
          </td>
          <td class="___relative tc">
            <div>{{ item.rows[3] }}</div>
          </td>
          <td class="___relative tc">
            <div>{{ item.rows[4] }}</div>
            <div
              class="___absolute toolBar"
              style="left: 157px; top: 0; width: 180px"
              v-if="target == 0"
            >
              <div
                title="往指定行后面增加一行"
                class="___absolute tc"
                @click="addRow(index)"
              >
                +
              </div>
              <div
                title="删除当前行"
                class="___absolute tc"
                style="left: 30px"
                @click="deleteRow(index, item)"
              >
                -
              </div>
              <div
                title="复制部分数据"
                class="___absolute tc"
                style="left: 60px"
                @click="copyRow(index, 'copy')"
              >
                c
              </div>
              <div
                title="复制全部数据"
                class="___absolute tc"
                style="left: 90px"
                @click="copyRow(index, 'copyAll')"
              >
                C
              </div>
              <div
                title="粘贴数据"
                class="___absolute tc"
                style="left: 120px"
                @click="pasteRow(index)"
              >
                p
              </div>
              <div
                title="生成重复样"
                class="___absolute tc"
                style="left: 150px"
                @click="addSample(index)"
                v-if="item.isPrototype"
              >
                r
              </div>
            </div>
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
        this.data.valueData.point[index].rows[0] = val;
      } else {
        this.data.valueData.point[index].showInput = true;
        this.data.valueData.point[index].rows[0] = " ";
        this.$forceUpdate();
      }
    },
    returnVal2(index, val) {
      this.data.valueData.point[index].rows[1] = val.deviceNum;
      this.data.valueData.point[index].SampleTools = val.id;
      this.$set(this.data.valueData.point[index].rows, 2, val.deviceModel);
      this.$set(this.data.valueData.point[index].rows, 3, val.deviceName);
      this.$set(this.data.valueData.point[index].rows, 4, val.frequency);
      this.data.valueData.point[index].deviceObj = val;
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.data.valueData.point[index].rows[3] = val;
      if (val === "") {
        this.data.valueData.point[index].showInput = false;
      }
      this.$forceUpdate();
    },
    generateSampleNum(item) {
      this.$eventBus.$emit(
        "generateSamplenum",
        item,
        this.data.valueData.multipleId
      );
    },
    addRow(index) {
      let row = JSON.parse(JSON.stringify(this.data.modelRow));
      row.pointId = window.uuid();
      row.foreverId = window.uuid();
      this.data.valueData.point.splice(index + 1, 0, row);
      this.$emit("redefinition");
    },
    deleteRow(index, item) {
      if (this.data.valueData.point.length > 1) {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false,
        }).then(({}) => {
          this.data.valueData.point.splice(index, 1);
          this.$emit("deleteSample", item);
        });
      }
    },
    copyRow(index, copyName) {
      let obj = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
      sessionStorage.setItem("copy", copyName);
      sessionStorage.setItem("cyhjRowData", JSON.stringify(obj));
    },
    pasteRow(index) {
      let newObjData = JSON.myParse(sessionStorage.getItem("cyhjRowData"));
      newObjData.pointId = window.uuid();
      newObjData.foreverId = window.uuid();
      let keys = Object.keys(this.data.valueData.point[index]);
      let copy = sessionStorage.getItem("copy");
      keys.forEach((item) => {
        if (copy === "copyAll") {
          this.data.valueData.point[index][item] = newObjData[item];
        } else {
          let noCopy = this.data.noCopyArr;
          let result = noCopy.some((key) => key === item);
          if (newObjData[item] && result === false) {
            this.data.valueData.point[index][item] = newObjData[item];
          }
        }
      });
      setTimeout(() => {
        this.$eventBus.$emit("showText");
      }, 10);
    },
    addSample(index) {
      this.selectItem = this.data.valueData.point[index];
      this.selectItemIndex = index;
      this.sampleOption = true;
    },
  },
  mounted() {
    console.log("仪器设备", this.data);
  },
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
