<template>
  <input
    class="box tc"
    style="border: none; width: 95%;  margin: 1px 0"
    ref="myBox"
    :placeholder="placeholder"
    @change="toInput"
    @blur="limit"
    :style="
      disable
        ? { background: '#FFCCFF', height: (height - 2 || 27) + 'px' }
        : { height: (height - 2 || 27) + 'px' }
    "
  />
</template>

<script>
export default {
  name: "querySelect",
  props: ["reg", "placeholder", "defaultValue", "height"],
  data() {
    return {
      inputPop: "",
    };
  },
  computed: {
    disable() {
      return this.$attrs.disabled;
    },
  },
  watch: {
    defaultValue(val) {
      this.$refs.myBox.value = val;
    },
  },
  methods: {
    toInput(e) {
      let value = e.target.value;
      this.inputPop = JSON.parse(JSON.stringify(value));
      this.$emit("input", value);
    },
    limit(e) {
      // 改来改去，md自己随便输吧，不限制了
      if (this.reg) {
        this.reg == "[^0-9./]" && isNaN(e.target.value)
          ? this.$message.warning("请输入正确的值")
          : "";
        // ? (this.$refs.myBox.value = Number(
        //     e.target.value.replace(/[^(\-?)\d+(\.\d+)]/g, "")
        //   ))
        // : "";
        this.$emit("input", this.$refs.myBox.value);
        // let value = e.target.value;
        // let val = new RegExp(this.reg, 'g');
        // e.target.value = value.replace(val, '');
      }
    },
  },
  mounted() {
    this.$eventBus.$on("myInputRefre", () => {
      setTimeout(() => {
        this.$forceUpdate();
      }, 100);
    });
  },
};
</script>

<style scoped>
.box {
}

.box::-ms-clear {
  width: 20px;
  padding: 0;
  margin: 0;
  color: gray;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
