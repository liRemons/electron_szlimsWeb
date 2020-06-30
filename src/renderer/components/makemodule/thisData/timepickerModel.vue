<template>
  <div class="box_warpper tc">
    <div class="heightCenter3" style="height:32px;width: 100%;">
      <span>{{ time }}</span
      >&nbsp;
      <el-time-picker
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
      time: ""
    };
  },
  filters: {
    toDot(time) {
      if (time) {
        return time.split(" ")[1];
      }
    }
  },
  methods: {
    changeTime(val) {
      this.time = new Date().format("yyyy-MM-dd") + " " + val;
      this.$emit("setTime", val);
      this.data.SamplingTime =
        new Date().format("yyyy-MM-dd") + " " + this.data.time;
    }
  },
  watch: {
    showTime(val) {
      this.time = val;
    }
  },
  components: {},
  mounted() {
    this.time = this.showTime;
  }
};
</script>

<style lang="less" scoped>
.box_warpper {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 32px;

  .time {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
  }
}
</style>
