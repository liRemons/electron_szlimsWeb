<template>
  <div class="tc">
    <p style="margin: 30px 0">点位图</p>
    <div style="border: 1px solid #000; margin-top: 20px">
      <img
        style="max-height: 550px"
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
    console.log(this.data);
  },
};
</script>