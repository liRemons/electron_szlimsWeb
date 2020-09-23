<template>
  <transition name="bounce">
    <div class="update">
      <div class="close">
        <i class="el-icon-circle-close" @click="$emit('close')"></i>
      </div>
      <div class="top">
        <div class="img">
          <img src="../assets/img/update.png" alt="" />
        </div>
      </div>

      <div class="title">检测到更新 V {{ updateVersion }}</div>
      <div class="main">
        <div class="mian_title">
          本次更新内容
        </div>
        <div class="text" v-html="updateMain.replace(/\n|\r\n/g, '<br>')"></div>
        <div class="download">
          <a @click="$emit('download')" :href="apkUrl" :download="apkUrl"
            >下载更新</a
          >
          <p>为防止数据丢失，请安装前先将本地数据同步上传</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["updateMain", "apkUrl", "updateVersion"],
  methods: {}
};
</script>

<style lang="scss" scoped>
.update {
  box-shadow: 0px 0px 10px #858484af;
  width: 400px;
  height: 500px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 150px;
  z-index: 100;
  margin-left: -200px;
  border-radius: 5px;
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 20px;
    cursor: pointer;
  }
}
.top {
  display: flex;
  justify-content: space-around;
}
.img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 10px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.title {
  font-size: 16px;
  font-weight: bold;
  margin: 15px 0;
}
.main {
  padding: 0 30px;
  .mian_title {
    margin: 10px 0;
    font-size: 14px;
    color: #409eff;
  }
  .text {
    text-align: left;
    line-height: 20px;
    height: 200px;
    overflow-y: auto;
  }
}
.download {
  a {
    background: #409eff;
    color: #fff;
    display: inline-block;
    width: 150px;
    line-height: 40px;
    margin-top: 30px;
    border-radius: 150px;
  }
  a:hover {
    text-decoration: none;
  }
  p {
    color: #ff4040;
    font-size: 12px;
    margin-top: 10px;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.text::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 4px;
  // scrollbar-arrow-color: red;
}
.text::-webkit-scrollbar-thumb {
  border-radius: 5px;
  /*滚动条里面小方块*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #e0edfb;

  // scrollbar-arrow-color: red;
}
.text::-webkit-scrollbar-thumb:hover {
  background: #beddfb;
}
.text::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0);
}
</style>