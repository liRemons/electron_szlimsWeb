<template>
  <div style="display: inline-block">
    <el-popover
      placement="right"
      width="400"
      trigger="click"
      v-model="popoverFlag"
    >
      <el-form ref="form" inline size="mini">
        <el-form-item>
          <el-select v-model="value" placeholder="请选择" @change="change">
            <el-option
              v-for="(item, index) in unitArr"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="value === '其他'">
          <el-input placeholder="请输入内容" v-model="input">
            <template slot="append"
              ><span @click="confirm(input)">确定</span></template
            >
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="reference"> ({{ unit }}) </span>
    </el-popover>
  </div>
</template>

<script>
export default {
  props: {
    unit: String,
    type: Number,
  },
  data() {
    return {
      value: "",
      popoverFlag: false,
      input: "",
      unitArr: [],
    };
  },
  mounted() {
    switch (this.type) {
      case 1:
        this.unitArr = [
          "μg/μL",
          "μg/mL",
          "mg/mL",
          "g/L",
          "mg/L",
          "μg",
          "g",
          "%",
          "其他",
        ];
        break;
      case 2:
        this.unitArr = ["μg", "g", "μL", "mL", "其他"];
        break;
      case 3:
        this.unitArr = ["mL", "L", "其他"];
        break;
      default:
        break;
    }
  },
  methods: {
    change(val) {
      if (val !== "其他") {
        this.value = val;
        this.$emit("change", val);
        this.popoverFlag = false;
      }
    },
    confirm(val) {
      this.value = val;
      this.$emit("change", val);
      this.popoverFlag = false;
    },
  },
};
</script>