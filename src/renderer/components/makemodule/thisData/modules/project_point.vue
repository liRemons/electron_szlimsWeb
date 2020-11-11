<template>
  <div class="tc">
    <p style="margin: 30px 0">点位图</p>
    <div style="border: 1px solid #000; margin-top: 20px;width:100%">
      <img
        style="max-height: 550px;max-width:100%"
        :src="hostUrl + data.valueData.pointUrl"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  mounted() {
  },
};
</script>