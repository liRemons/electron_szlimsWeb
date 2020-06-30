<template>
  <div class="local-container">
    <search />
    <local-list class="list" />
  </div>
</template>

<script>
import LocalList from "./components/LocalList";
import Search from "./components/Search";

export default {
  components: {
    Search,
    LocalList
  }
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.local {
  &-container {
    .list{
      margin-top: 10px;
    }
  }
}
</style>
