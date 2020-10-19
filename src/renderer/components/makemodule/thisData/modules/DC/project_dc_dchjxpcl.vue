<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div :class="{ _normalHeight_: true }" class="___relative">
      <input
        type="file"
        v-if="inputFile"
        id="project_dc_dchjxpcl-filename"
        accept="image/*"
        multiple="multiple"
        @change="changFile"
        style="display: none"
      />
      <div :class="{ eventCover: !ableInput }"></div>
      <p>电磁环境选频测量:</p>
      <table class="myTable ___relative">
        <div
          class="___absolute"
          :id="
            data.valueData.pointNum
              ? 'point' + data.valueData.pointNum.split('#')[0]
              : ''
          "
          style="top: -100px"
        ></div>
        <!-- <tr>
          <td>对应检测编号</td>
          <td colspan="3">
            <myInput
              style="text-align: center"
              v-model="data.valueData.testNum"
              :defaultValue="data.valueData.testNum"
            ></myInput>
          </td> -->
        </tr>
        <tr>
          <td>对应点位序号</td>
          <td colspan="3">
            {{ data.valueData.pointNum }}
          </td>
        </tr>
        <tr>
          <td>对应点位名称</td>
          <td colspan="3">{{ data.valueData.pointName }}</td>
        </tr>
        <tr>
          <td>点位与天线距离</td>
          <td colspan="3">
            水平：{{ data.valueData.level }} m; 垂直：{{
              data.valueData.vertical
            }}
            m
          </td>
        </tr>
        <tr>
          <td colspan="4">原始记录数据仪器截图</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.imgList">
          <td>{{ item.title }}</td>
          <td colspan="3" class="___relative tc">
            <span :class="item.img.length > 0 ? '' : 'red'">{{
              item.img | toDot
            }}</span>
            <div
              class="___absolute toolBar"
              style="top: 0; width: 90px; left: 600px"
              v-if="target == 0"
            >
              <div
                title="上传图片"
                @click="upload(index, item.name)"
                class="___absolute tc"
              >
                +
              </div>
              <div
                title="查看图片"
                @click="show(index)"
                class="___absolute tc"
                style="left: 30px"
              >
                <i class="el-icon-search"></i>
              </div>
              <div
                title="删除图片"
                @click="deleteSrue(index)"
                class="___absolute tc"
                style="left: 60px"
              >
                <i class="el-icon-delete"></i>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <el-dialog
      title="删除"
      :visible.sync="deleteImg"
      width="400px"
      :modal="false"
    >
      <div v-if="deleteImg">
        <el-radio
          v-for="(item, index) in data.valueData.imgList[currencyIndex].img"
          v-model="radio"
          :label="index"
          :key="index + 'label'"
        >
          {{ item.name }}
        </el-radio>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="deleteConfirm()">确定</el-button>
        <el-button @click="deleteImg = false">取消</el-button>
      </div>
    </el-dialog>
    <viewer v-if="imgUrl.length" class="viewer" :images="imgUrl">
      <img
        id="viewer_xpcl"
        v-for="item in imgUrl"
        :src="item"
        ref="img"
        style="display: none"
        :key="item.index"
      />
    </viewer>
  </div>
</template>

<script>
import { taskXcImage } from "@/api/local";
import lrz from "lrz";

export default {
  data() {
    return {
      radio: 0,
      currencyIndex: 0,
      deleteImg: false,
      selectItem: "",
      selectItemIndex: "",
      sampleOption: "",
      title: "",
      fullscreenLoading: false,
      inputFile: true,
      imgUrl: [],
    };
  },
  computed: {},
  props: [
    "ipdTemplate",
    "pageNumber",
    "data",
    "thisPageIndex",
    "jsonString",
    "showing",
    "watchSign",
    "isTemplate",
    "ableInput",
    "task",
    "target",
    "deviceData",
  ],
  filters: {
    toDot(arr) {
      if (arr.length > 0) {
        return arr.map((item, index) => item.name).toString();
      } else {
        return "待上传";
      }
    },
  },
  methods: {
    changFile() {
      let that = this;
      this.fullscreenLoading = true;
      let nameIndex =
        this.data.valueData.imgList[this.currencyIndex].img.length + 1;
      let filename = document.getElementById("project_dc_dchjxpcl-filename");
      let files = filename.files;
      let filesLength = files.length;
      let lrzArr = [];
      for (let k = 0; k < filesLength; k++) {
        lrzArr.push(lrz(files[k]));
      }
      Promise.all(lrzArr).then((resultsArr) => {
        let promiseAll = [];
        let imgNameArr = [];
        let compressFiles = resultsArr.map((item, index) => {
          return item.file;
        });
        let compressLength = compressFiles.length;
        for (let i = 0; i < compressLength; i++) {
          let imgName =
            that.data.valueData.pointNum +
            "-" +
            that.title +
            "-" +
            (nameIndex + i);
          imgNameArr.push({ name: imgName, url: "" });
          let fromData = new FormData();
          fromData.append("file", compressFiles[i]);
          fromData.append("taskId", that.task.id);
          fromData.append("imageName", imgName.replace(/#/g, "-"));
          promiseAll.push(taskXcImage(fromData));
        }
        Promise.all(promiseAll).then((posts) => {
          if (
            posts.every((item, index) => {
              return item.data.success;
            })
          ) {
            this.$notify({
              type: "success",
              message: posts[0].data.msg,
            });
            posts.forEach((item, index) => {
              imgNameArr[index].url = item.data.url;
            });

            this.inputFile = false;
            this.$nextTick(() => {
              this.data.valueData.imgList[this.currencyIndex].img.push(
                ...imgNameArr
              );
              this.$forceUpdate();
              this.inputFile = true;
            });
          } else {
            that.$notify({
              type: "error",
              message: posts[0].data.msg,
            });
          }
          that.fullscreenLoading = false;
        });
      });
    },
    upload(index, title) {
      this.currencyIndex = index;
      this.title = title;
      document.getElementById("project_dc_dchjxpcl-filename").click();
    },
    deleteConfirm() {
      this.deleteImg = false;
      this.data.valueData.imgList[this.currencyIndex].img.splice(this.radio, 1);
    },
    deleteSrue(index) {
      this.radio = 0;
      this.currencyIndex = index;
      this.deleteImg = true;
    },
    show(index) {
      let imgArr = this.data.valueData.imgList[index].img;
      if (imgArr.length) {
        this.imgUrl = imgArr.map((item) => this.hostUrl + item.url);
        this.$nextTick(() => {
          document.getElementById("viewer_xpcl").click();
        });
      } else {
        this.$notify({
          type: "error",
          message: "请先上传图片",
        });
      }
    },
  },
  mounted() {},
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
.btn2 {
  width: 50px;
  height: 32px;
  line-height: 32px;
  background: gray;
  cursor: pointer;
  user-select: none;
  color: white;
  border-radius: 2px;
}

.red {
  color: red;
}
</style>
