<template>
  <div>
    <projectHead :data="data" :target="target" :col="11"></projectHead>
  </div>
</template>

<script>
import projectHead from "../project_head";
export default {
  name: "project_systvoc1.vue",
  data() {
    return {};
  },
  components: {
    projectHead,
  },
  computed: {},
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
  methods: {},

  mounted() {},
};
</script>

<style scoped>
</style>