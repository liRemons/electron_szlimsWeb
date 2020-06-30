<template>
  <div
    class="___relative hoverFinger"
    style="width: 100%;height:32px; cursor: pointer"
  >
    <div v-if="Judge" class="___relative">
      <div
        v-if="input && test"
        @dblclick="showSelet(1)"
        style="width:100%;height:32px;"
      >
        <divModel
          v-model="showText"
          style="width:100%;"
          class="Full hide focusBg tc"
        ></divModel>
      </div>
      <div
        v-if="!input"
        @click="showSelet(2)"
        class="_normalInput_ ___relative tc"
        :class="rows ? 'rowsInput4' : ''"
        style="width: 100%;height:32px;"
      >
        <div class="___absolute" style="width: 90%">
          {{ showText }}
        </div>
        <div class="___absolute" style="width: 10%; margin-left: 78%;">
          <i v-if="!show" class="el-icon-caret-right"></i>
          <i v-else class="el-icon-caret-bottom"></i>
        </div>
      </div>
      <div
        class="instrumentSelcet ___absolute"
        v-if="show"
        style="width: 100%;top:32px;left:-1px; z-index: 9999999;user-select: none;"
      >
        <div
          style="padding: 9px 10px 9px 10px;"
          :class="{
            selected: showSelected(item),
            selected2: checkSelect(item)
          }"
          v-for="(item, index) in list"
          @click.stop="statr(index)"
        >
          {{ Obj != "" ? item[Obj] : item }}
        </div>
      </div>
    </div>
    <div v-else class="___relative">
      {{ showText }}
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "list",
    "Obj",
    "rows",
    "single",
    "receive",
    "special",
    "input",
    "factor",
    "transmitText",
    "Judge",
    "watchTransmitText",
    "disabled",
    "multiSelect",
    "repeat"
  ],
  data() {
    return {
      test: true,
      show: false,
      selection: [],
      showText: "",
      transmitJudge: true,
      selectedObj: "",
      multiArr: []
    };
  },
  filters: {},
  methods: {
    showSelet(flag) {
      this.$emit("getList");
      //禁用
      if (!this.disabled) {
        if (flag === 1) {
          this.show = !this.show;
        } else if (flag === 2) {
          this.show = !this.show;
        } else if (flag === 3) {
          this.show = false;
        }
      }
    },
    statr(index) {
      this.show = false;
      if (this.single) {
        this.selection = [
          this.Obj != "" ? this.list[index][this.Obj] : this.list[index]
        ];
        this.selectedObj = this.list[index];
      } else if (this.multiSelect) {
        let str =
          this.Obj !== "" ? this.list[index][this.Obj] : this.list[index];
        let index2 = "";
        if (this.selection.length > 0) {
          index2 = this.multiArr.findIndex(
            item => item.id == this.list[index].id
          );
        }
        if (index2 !== -1 && index2 !== "") {
          this.selection.splice(index2, 1);
          this.multiArr.splice(index2, 1);
        } else {
          this.selection.push(str);
          this.multiArr.push(this.list[index]);
        }
      } else {
        let str =
          this.Obj != "" ? this.list[index][this.Obj] : this.list[index];
        if (this.selection.findIndex(x => x === str) != -1) {
          this.selection.splice(
            this.selection.findIndex(x => x === str),
            1
          );
        } else {
          this.selection.push(str);
        }
      }
      this.showText = this.selection.toString();
      if (this.repeat !== undefined && this.repeat.length > 0) {
        let pointData = [];
        this.repeat[3].forEach((item, index) => {
          if (
            item.to === this.repeat[1] &&
            item.data.valueData.multipleId === this.repeat[2]
          ) {
            item.data.valueData.point.forEach((val, num) => {
              if (val[this.repeat[0]] !== "") {
                pointData.push(val[this.repeat[0]] + "");
              }
            });
          }
        });
        if (pointData.includes(this.showText)) {
          this.showText = "";
          this.$notify({
            title: "错误",
            type: "error",
            message: "请勿重复选择"
          });
        }
      }
      this.$emit(
        "returnVal",
        this.showText,
        this.receive,
        this.special,
        this.selectedObj,
        this.multiArr
      );
    },
    give() {
      this.showText = this.transmitText;
      this.transmitJudge = false;
    },
    showSelected(item) {
      let index = this.multiArr.findIndex(item2 => item2.id === item.id);
      if (index !== -1) {
        return true;
      } else {
        return false;
      }
    },
    checkSelect(item) {
      if (this.Obj) {
        if (item[this.Obj] === this.transmitText) {
          return true;
        } else {
          return false;
        }
      } else {
        if (item === this.transmitText) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  components: {},
  watch: {
    showText(val) {
      if (this.factor && this.transmitJudge) {
        this.transmitJudge = true;
        if (val > 1) {
          this.showText = 1;
          this.test = false;
        }
        this.$emit("returnVal", this.showText, this.receive, this.special);
        setTimeout(() => {
          this.test = true;
        }, 10);
      }
    },
    transmitText(newValue) {
      if (this.watchTransmitText) {
        this.showText = newValue;
        this.transmitJudge = false;
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.give();
    }, 100);

    this.$eventBus.$on("referSelectModel", () => {
      setTimeout(() => {
        this.give();
      }, 100);
    });
  }
};
</script>

<style lang="less" scoped>
.box_warpper {
}

.selected {
  background: lightblue;
}

.selected2 {
  background: lightblue;
}
</style>
