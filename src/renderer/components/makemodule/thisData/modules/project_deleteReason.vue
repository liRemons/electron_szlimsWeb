<template>
	<div :class="{ _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
		<div v-for="item in data.valueData.point" class="___relative" style="line-height: 32px;">
			{{item.reason}}
		</div>
	</div>
</template>

<script>
  export default {
    name: "project_deleteReason",
    props: ['data'],
    mounted() {
    }
  }
</script>

<style scoped>

</style>
