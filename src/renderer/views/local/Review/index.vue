<template>
  <div class="local-container">
    <local-list class="list" />
  </div>
</template>

<script>
import LocalList from "./components/LocalList";

export default {
  components: {
    LocalList,
  },
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.local {
  &-container {
    .list {
      margin-top: 10px;
    }
  }
}
</style>
