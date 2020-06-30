<template>
	<div class="box_warpper tc">
		<div class="heightCenter3" style="height:32px;width: 100%;">
			<span>{{time | toDot}}</span>&nbsp;
			<el-date-picker
							class="time"
							v-model="time"
							@change="changeTime"
							type="datetime"
							:editable="false"
							:clearable="false"
							size="mini"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="选择日期时间">
			</el-date-picker>
		</div>
	</div>
</template>

<script>
  export default {
    props: ['showTime'],
    data() {
      return {
        time: '',
      }
    },
    filters: {
      toDot(time) {
        if (time) {
          return time.split(' ')[0]
        }
      }
    },
    methods: {
      changeTime(val) {
        this.time = val;
        this.$emit('setTime', val)
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
    }
  }
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
