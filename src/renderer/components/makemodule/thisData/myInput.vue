<template>
	<input   class="box" style="border:none;width:95%" ref="myBox" :placeholder="placeholder" @change="toInput" @blur="limit"
				 :style="disable ? {background: '#FFCCFF'} : {}"></input>
</template>

<script>
export default {
  name: "querySelect",
  props: ["reg", "placeholder", "defaultValue"],
  computed: {
    disable() {
      return this.$attrs.disabled;
    }
  },
  watch: {
    defaultValue(val) {
      this.$refs.myBox.value = val;
    }
  },
  methods: {
    toInput(e) {
      let value = e.target.value;
      this.$emit("input", value);
    },
    limit(e) {
      if (this.reg) {
        this.reg == "[^0-9./]"
          ? (this.$refs.myBox.value = Number(
              e.target.value.replace(/[^(\-?)\d+(\.\d+)]/g, "")
            ))
          : "";
        this.$emit("input", this.$refs.myBox.value);
        // let value = e.target.value;
        // let val = new RegExp(this.reg, 'g');
        // e.target.value = value.replace(val, '');
      }
    }
  },
  mounted() {
    this.$eventBus.$on("myInputRefre", () => {
      setTimeout(() => {
        this.$forceUpdate();
      }, 100);
    });
  }
};
</script>

<style scoped>
.box {
  height: 29px;
  width: 100%;
  border: none;
  text-align: center;
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
