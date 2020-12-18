<template>
  <div
    class="box historyValue"
    style="background: #fff; max-width: 98%; margin: 0 2px"
  >
    <!--数字框-->
    <section
      :class="{ redBox: showRedBox }"
      v-if="isNumBox"
      ref="box"
      v-html="value"
      :contenteditable="edit"
      id="sec1"
      @focus="isLocked = true"
      @blur="checkEmpty"
      @keyup="changeNum"
    ></section>

    <!--下拉框-->
    <section class="edit-div" v-else-if="pulldown != null">
      <select @change="getPulldown()" ref="sel">
        <!--<option :selected="isSel(index)" :value="item" :key="index" v-for="(item, index) in pulldown">
						{{item}}
				</option>-->
        <option :value="item" :key="index" v-for="(item, index) in pulldown">
          {{ item }}
        </option>
      </select>
    </section>

    <!--下拉框-->
    <section class="edit-div" v-else-if="pulldownTwo != null">
      <select @change="getPulldown()" ref="sel">
        <option
          :value="item.id"
          :key="index"
          v-for="(item, index) in pulldownTwo"
        >
          {{ item.name }}
        </option>
      </select>
    </section>

    <!--时间框-->
    <section
      class="edit-div"
      v-html="value"
      v-else-if="isTimeBox"
      @click="showTimeBox"
    ></section>

    <!--计算框-->
    <div
      class="edit-div"
      v-else-if="isComputer"
      :contenteditable="edit"
      v-html="value"
    ></div>

    <!--普通文本框-->
    <div
      :class="{ 'edit-div': true, redBox: showRedBox }"
      v-else
      id="textbox11"
      v-html="value"
      ref="textbox"
      :contenteditable="edit"
      @blur="changeText"
      @focus="onfocus"
    ></div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: "divModel",
  data() {
    return {
      isLocked: false,
      timer: "",
      checkResult: false,
      nowClass: "checkB",
      obj: {
        name: 1,
      },
      showRedBox: false,
      timerId2: "",
      detectionLimitObj: "",
    };
  },
  watch: {
    nowTime(val) {
      this.$emit("change", val);
    },
    computers: {
      deep: true,
      immediate: true,
      handler: function () {
        this.getComputerValue();
      },
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: [String, Date, Number, Array],
    nowTime: [String, Date],
    isNumBox: {
      //如果为true 只能输入数值
      type: Boolean,
      default: false,
    },
    isTimeBox: {
      //如果为true 时间框
      type: Boolean,
      default: false,
    },
    mustWrite: {
      type: Boolean,
      default: false,
    },
    pulldown: {
      type: Array,
      default: null,
    },

    pulldownTwo: {
      type: Array,
      default() {
        return null;
      },
    },

    ind: {
      type: String,
    },
    edit: {
      type: Boolean,
      default: true,
    },
    checkBoxObj: {
      type: Object,
      default() {
        return null;
      },
    },
    isComputer: {
      type: Boolean,
      default() {
        return false;
      },
    },
    computers: {
      type: Array,
      default() {
        return [];
      },
    },
    computerFormula: {
      type: String,
      default() {
        return null;
      },
    },
  },
  computed: {},
  methods: {
    onfocus(){
      if(this.value==='请检测员现场核实，感谢配合！'){
        this.value=''
      }
    },
    isSel(index) {
      if (index === 0) {
        return true;
      } else {
        return false;
      }
    },
    checkEmpty() {
      // let content = this.$refs.box.textContent;

      let value = this.$refs.box.textContent;

      if (this.isNumBox && isNaN(value)) {
        this.$message.warning("请输入正确的值");
        this.$refs.box.textContent = "";
        // this.$refs.box.textContent = Number(value.replace(/[^\d.]/g, ""));
      }
      this.$emit("change", this.$refs.box.textContent);
    },
    changeNum(e) {
      // let keycode = [37, 38, 39, 40, 9];  //按了数组中的键, 不执行后面的代码
      // let result = keycode.includes(e.keyCode);
      // if (result) return;
      // let key = Number(e.key) || ['Decimal', 'Backspace'].includes(e.key);  //数值字符串转换成数值,其它转换成NAN
      // var reg = /^[0-9]+.?[0-9]*$|true/;
      // if (reg.test(key)) {
      //   this.$emit('change', this.$refs.box.innerText);
      // } else {
      //   let box = this.$refs.box;
      //   box.innerText = box.innerText.replace(/[^.0123456789]/ig, "");
      //   this.$emit('change', box.innerText);
      // }
    },
    changeText() {
      var that = this;
      var content = that.$refs.textbox.innerText;
      if (this.mustWrite && content == "") {
        this.showRedBox = true;
      } else {
        this.showRedBox = false;
      }
      that.$emit("change", content);
    },
    showTimeBox() {
      this.$emit("showTimeBox");
    },
    getPulldown() {
      if (this.ind) {
        this.$emit("change", this.$refs.sel.value + this.ind);
      } else {
        this.$emit("change", this.$refs.sel.value);
      }
    },
    getComputerValue() {
      if (this.isComputer && this.computers.length > 0) {
        let computerFormula = this.computerFormula;
        var computeredValue = 0;
        switch (computerFormula) {
          case "gs0":
            this.computers[0] = this.computers[0] != "" ? this.computers[0] : 1;
            this.computers[1] = this.computers[1] != "" ? this.computers[1] : 1;
            computeredValue = this.computers[0] * this.computers[1];
            this.$emit("change", computeredValue);
            break;
          case "gs1":
            let V = Number(this.computers[0]);
            let t = Number(this.computers[1]);
            let p = Number(this.computers[2]);
            let A0 = Number(this.computers[3]);
            let A = Number(this.computers[4]);
            let multiple = Number(this.computers[5]);
            let Bs = Number(this.computers[6]);
            let obj = this.computers[7];
            let index = this.computers[8];
            let result =
              (((A - Number(this.computers[3])) * Bs) /
                (V * (273 / (273 + t)) * (p / 101))) *
              multiple;
            if (isNaN(result)) result = 0;
            result = Number(result.toFixed46(index, true, true));
            if(obj.sysCysxhy&&obj.sysFxsqyp&&!isNaN(obj.sysCysxhy)&&!isNaN(obj.sysFxsqyp)){
              result = result*(Number(obj.sysCysxhy) / Number(obj.sysFxsqyp))
            }
            obj.sysConcentrationCount = result;
            let limi2 = Number(this.detectionLimitObj.detectionLimit);
            if (result < limi2) {
              this.$emit("change", "< " + limi2);
            } else {
              this.$emit("change", result);
            }
            break;
          case "gs2":
            let sysConcentration = this.computers[0];
            if (isNaN(sysConcentration)) sysConcentration = 0;
            this.$emit("change", Number(sysConcentration).toFixed46(2));
            break;
          case "gs3":
            let sysConcentration1 = Number(this.computers[0]);
            let sysConcentration2 = Number(this.computers[1]);
            let sysConcentration3 = (sysConcentration1 + sysConcentration2) / 2;
            if (isNaN(sysConcentration3)) sysConcentration3 = 0;
            this.$emit("change", sysConcentration3.toFixed46(2));
            break;
          case "gs4":
            let sysConcentration4 = Number(this.computers[0]);
            let sysConcentration5 = Number(this.computers[1]);
            let item = this.computers[2];
            let sysConcentration6 = (sysConcentration4 + sysConcentration5) / 2;
            let sysConcentration7 = Math.abs(
              sysConcentration4 - sysConcentration5
            );
            let sysConcentration8 =
              (sysConcentration7 / sysConcentration6) * 100;
            if (isNaN(sysConcentration8)) sysConcentration8 = 0;
            let limi = Number(this.detectionLimitObj.detectionLimit);
            item.sysDifferenceCount = sysConcentration8;
            if (sysConcentration8 > limi) {
              this.$emit("change", sysConcentration8.toFixed(1));
            } else {
              this.$emit("change", "/");
            }
            break;
          case "gs5":
            let V1 = Number(this.computers[0]);
            let t1 = Number(this.computers[1]);
            let p1 = Number(this.computers[2]);
            let blankNong = Number(this.computers[3]);
            let jieNong = Number(this.computers[4]);
            let result2 =
              ((jieNong - blankNong) * 100) /
              (V1 * (273 / (273 + t1)) * (p1 / 101));
            if (isNaN(result2)) result2 = 0;
            this.$emit("change", result2.toFixed(3));
            break;
          case "gs6":
            let allValue = 0;
            this.computers.forEach((item, index) => {
              if (index != 0) {
                allValue += Number(item);
              }
            });
            let allValueTwo = Number(this.computers[0]) - allValue;
            if (isNaN(allValueTwo)) allValueTwo = 0;
            this.$emit("change", allValueTwo.toFixed(2));
            break;
          case "gs7":
            try {
              let regressionEquationValue1 = this.computers[0];
              let regressionEquationValue2 = this.computers[1];
              let regressionEquationValue3 = this.computers[2];
              let sysArea = this.computers[3];
              let shizi = "(" + sysArea;
              switch (regressionEquationValue2) {
                case "+":
                  shizi += "-";
                  break;
                case "-":
                  shizi += "+";
                  break;
              }
              shizi +=
                regressionEquationValue3 + ")/" + regressionEquationValue1;
              let nongResult = eval(shizi);
              if (isNaN(nongResult)) nongResult = 0;
              let rr = nongResult;
              this.$emit("change", rr.toFixed(3));
              break;
            } catch (e) {
              break;
            }
          case "gs8":
            let sysSuckConcentration = [];
            let sysBlankConcentration = [];
            this.computers[0].forEach((item, index) => {
              if (index <= 8) {
                sysSuckConcentration.push(item.suckConcentration);
                sysBlankConcentration.push(item.blankConcentration);
              }
            });
            let sysSuckConcentrationResult = 0;
            sysSuckConcentration.forEach((item, index) => {
              if (index <= 8) {
                let sysBlankConcentrationValue =
                  Number(sysBlankConcentration[index]) > Number(item)
                    ? 0
                    : Number(sysBlankConcentration[index]);
                sysSuckConcentrationResult +=
                  Number(item) - sysBlankConcentrationValue;
              }
            });
            try {
              let v8 = Number(this.computers[0][9].volume);
              let t8 = Number(this.computers[0][9].temperature);
              let p8 = Number(this.computers[0][9].atmosphericPressure);
              let xs = Number(this.computers[2]);
              let result3 =
                ((Number(sysSuckConcentrationResult) * 100) /
                  (v8 * (273 / (273 + t8)) * (p8 / 101))) *
                xs;
              if (isNaN(result3)) {
                result3 = 0;
              }
              if (result3 < Number(this.detectionLimitObj.detectionLimit)) {
                this.computers[1].sysConcentrationCount = result3.toFixed46(2);
                this.$emit(
                  "change",
                  `< ${this.detectionLimitObj.detectionLimit}`
                );
              } else {
                this.computers[1].sysConcentrationCount = result3.toFixed46(2);
                this.$emit("change", Number(result3.toFixed46(3)));
              }

              break;
            } catch (e) {
              this.$emit("change", 0);
              break;
            }
            break;
          case "gs10":
            this.$emit("change", this.computers[0].toFixed46(2));
            break;
          case "gs11":
            if (this.computers[0]) {
              if (typeof this.computers[0] !== "string") {
                this.$emit("change", Number(this.computers[0]).toFixed46(2));
              } else {
                this.$emit("change", this.computers[0]);
              }
            } else {
              this.$emit("change", 0);
            }
            break;
          case "gs12":
            this.$emit("change", this.computers[0].toFixed(3));
            break;
          case "gs13":
            this.$emit("change", this.computers[0].toFixed(1));
            break;
          case "gs14":
            if (this.computers[0]) {
              if (typeof this.computers[0] === "string") {
                this.$emit("change", this.computers[0]);
              } else {
                this.$emit("change", Number(this.computers[0]).toFixed46(2));
              }
              break;
            }
          case "gs15":
            this.$emit("change", this.computers[0]);
            break;
        }
      }
    },
  },
  mounted() {
    if (this.pulldown) {
      this.$refs.sel.value = this.value;
    }
    if (sessionStorage.getItem("detectionLimitObj")) {
      this.detectionLimitObj = JSON.myParse(
        sessionStorage.getItem("detectionLimitObj")
      );
    }
  },
  destroyed() {
    let that = this;
    if (that.timerId) {
      clearInterval(that.timerId);
    }
    if (that.timerId2) {
      clearInterval(that.timerId2);
    }
  },
};
</script>
<style lang="less" scoped>
.edit-div {
  &[contenteditable="true"] {
    &:empty:before {
      display: block;
      color: #ccc;
    }
  }
}

.redBox {
  border: 1px solid red;
}

.checkB {
  width: 15px;
  height: 15px;
  border: 1px solid black;
  cursor: pointer;
}

.checkA {
  width: 15px;
  height: 15px;
  background: #00ff00;
  border: 1px solid black;
  cursor: pointer;
}

.box section,
.box div {
  word-wrap: break-word !important;
}
</style>
