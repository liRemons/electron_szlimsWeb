<template>
  <div class="timepickerModel tc">
    <div class="heightCenter3" style="height: 32px; width: 100%;">
      <span>{{ time }}</span
      >&nbsp;
      <el-time-picker
        style="width: 100%; height: 30px;"
        class="time"
        v-model="time"
        value-format="HH:mm"
        @change="changeTime"
        size="mini"
      ></el-time-picker>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showTime", "data"],
  data() {
    return {
      time: "",
    };
  },
  filters: {
    toDot(time) {
      if (time) {
        return time.split(" ")[1];
      }
    },
  },
  methods: {
    changeTime(val) {
      this.time = new Date().format("yyyy-MM-dd") + " " + val;
      this.$emit("setTime", val);
      this.data.SamplingTime =
        new Date().format("yyyy-MM-dd") + " " + this.data.time;
    },
  },
  watch: {
    showTime(val) {
      this.time = val;
    },
  },
  components: {},
  mounted() {
    this.time = this.showTime;
  },
};
</script>

<style lang="less" scoped>

</style>
