<template>
    <div>
        <h1 style="margin-bottom: 10px;">签名</h1>
        <canvas id="myCanvas" style="border:1px solid #000000;"></canvas>

        <div style="text-align: right;">
            <el-button @click="clear">清除</el-button>
            <el-button type="primary" @click="download">保存</el-button>
        </div>
    </div>
</template>

<script>
import draw from '@/utils/draw'
export default {
    name: 'signature',
    data() {
        return {
            point: {},
            draw: {}
        }
    },
    methods: {
        download() {
            this.$emit('download', this.draw);
        },
        clear() {
            this.draw.clear()
        }
    },
    mounted() {
        const canvas = document.getElementById('myCanvas');
        this.draw = new draw(canvas, 0);
    }
}
</script>

<style>
#myCanvas {
    width: 100%;
    height: 100%;
}
</style>
