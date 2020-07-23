<template>
  <div>
    <!-- <div id = "panel" style="background-color: brown; width: 300px;height:200px"></div> -->
    <canvas width="640" height="360" style="display: none;"></canvas>
    <!--真正的播放摄像头拍到的影像-->
    <div class="outcontent" v-if="vidioFlag">
      <video
        ref="video"
        v-if="vidioFlag"
        autoplay
        width="400px"
        height="400px"
      ></video>
      <div id="takePhoto" @click="takePhoto">
        <i class="el-icon-camera-solid"></i>
      </div>
      <img id="willshow" width="64" height="36" @click="showPhoto" />
      <img id="showPhoto" width="100%" height="100%" @click="showPhoto" />
    </div>
    <el-button @click="getCamera">打开</el-button>
    <el-button @click="getCameracolse">关闭</el-button>
  </div>
</template>

<script>
const remote = require("electron").remote;
const ipcRenderer = require("electron").ipcRenderer;
const dialog = remote.dialog;
const Menu = remote.Menu;
const fs = require("fs");
export default {
  data() {
    return {
      photoData: "",
      video: "",
      vidioFlag: false,
    };
  },
  created() {
    window.onresize = function () {
      document.getElementsByTagName("body")[0].style.height =
        window.innerHeight + "px";
    };
  },
  methods: {
    getCameracolse() {
      if (!this.$refs["video"].srcObject) return;
      let stream = this.$refs["video"].srcObject;
      let tracks = stream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
      this.$refs["video"].srcObject = null;
      this.vidioFlag = false;
    },
    getCamera() {
      this.vidioFlag = true;
      setTimeout(() => {
        document.getElementsByTagName("body")[0].style.height =
          window.innerHeight + "px";
        this.video = window.document.querySelector("video");
        let this_ = this;
        window.navigator.mediaDevices
          .getUserMedia({
            video: { facingMode: "user", width: 640, height: 360 }, // 调用前置摄像头并设置尺寸大小 后置摄像头使用video: { facingMode: { exact: "environment" }
          })
          .then((stream) => {
            this_.video.srcObject = stream;
            this_.video.play();
          })
          .catch((err) => {
            console.log(`连接视频流错误: ${err}`);
          });
      }, 1000);
    },
    //拍照
    takePhoto() {
      this.video = window.document.querySelector("video");
      var now_time = new Date().getTime();
      var file_path = String(now_time) + ".jpg";
      let canvas = window.document.querySelector("canvas");
      //将当前的视频图像绘制在 canvas 上
      canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 360);
      //获取  base64 格式的图像数据
      this.photoData = canvas
        .toDataURL("image/png")
        .replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      // 将照片以base64的方式生成缩略图
      const willshow = document.getElementById("willshow");
      console.log(willshow.src);
      willshow.src = "data:image/png;base64," + this.photoData;
      //显示保存对话框保存图像
      console.log(willshow.src);
    },

    // 查看照片
    showPhoto() {
      const showPhoto = document.getElementById("showPhoto");
      showPhoto.src = "data:image/png;base64," + this.photoData;
      if (
        showPhoto.style.display === "none" ||
        showPhoto.style.display === ""
      ) {
        showPhoto.style.display = "block";
      } else {
        showPhoto.style.display = "none";
      }
    },
  },
};
</script>

<style  scoped>
body {
  margin: 0;
  padding: 0;
  width: 100%;
}
.outcontent {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.video {
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
}

#takePhoto {
  position: absolute;
  left: 90%;
  top: 50%;
  margin: 0;
  padding: 0;
}

#willshow {
  position: absolute;
  left: 90%;
  top: 80%;
  margin: 0;
  padding: 0;
  /* border: solid 1px black; */
}

#showPhoto {
  position: absolute;
  left: 0;
  top: 0;
  display: none;
}

#takePhoto:hover {
  cursor: pointer;
}
#willshow:hover {
  cursor: pointer;
}
</style>
</style>