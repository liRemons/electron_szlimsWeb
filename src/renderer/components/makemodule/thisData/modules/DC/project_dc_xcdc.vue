<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <input
        type="file"
        v-if="inputFlag"
        :id="'project_dc_xcdc-filename' + pageNumber + '-' + thisPageIndex"
        accept="image/*"
        @change="changFile"
        style="display: none"
      />
      <p>{{ data.valueData.correct }}:</p>
      <table class="myTable">
        <tr v-for="(item, index) in data.valueData.point">
          <td class="___relative tc" style="width: 120px">
            <span>{{ item.title }}</span>
          </td>
          <td class="___relative tc" style="width: 560px" v-if="target === '0'">
            <span :class="item.state === 0 ? 'red' : ''">{{
              item.state | toDot
            }}</span>

            <div
              v-if="target === '0'"
              class="___absolute toolBar"
              style="top: 0; width: 120px; left: 635px"
            >
              <div
                title="上传图片"
                @click="upload(index, item.title)"
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
              <div
                title="缺失"
                @click="item.state = 2"
                class="___absolute tc"
                style="left: 90px"
              >
                <i class="el-icon-close"></i>
              </div>
            </div>
            <div
              class="___absolute toolBar"
              v-if="item.title === '现场检测照片'"
              style="left: 760px; top: 0; width: 60px"
            >
              <div
                title="往指定行后面增加一行"
                class="___absolute tc"
                @click="addRow(index)"
              >
                +
              </div>
              <div
                title="删除当前行"
                class="___absolute tc"
                style="left: 30px"
                @click="deleteRow(index)"
              >
                -
              </div>
            </div>
          </td>
          <td class="___relative tc" v-else style="width: 560px">
            <span :class="item.state === 0 ? 'red' : ''">{{
              item.state | toDot
            }}</span>
          </td>
        </tr>
      </table>
    </div>

    <viewer v-if="imgUrl" class="viewer" :images="[hostUrl + imgUrl]">
      <img
        :id="'project_dc_xcdc-show' + pageNumber"
        v-for="item in [hostUrl + imgUrl]"
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
import Viewer from "viewerjs";
import lrz from "lrz";

export default {
  data() {
    return {
      inputFlag: true,
      currencyIndex: "",
      selectItem: "",
      selectItemIndex: "",
      sampleOption: "",
      title: "",
      imgUrl: "",
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
    toDot(index) {
      let arr = ["待上传", "已上传", "现场不具备拍照条件"];
      return arr[index];
    },
  },
  methods: {
    upload(index, title) {
      this.inputFlag = false;
      this.$nextTick(() => {
        this.inputFlag = true;
        setTimeout(() => {
          this.data.valueData.point[index].Identification = "Identification";
          this.title = title;
          this.currencyIndex = index;
          document
            .getElementById(
              "project_dc_xcdc-filename" +
                this.pageNumber +
                "-" +
                this.thisPageIndex
            )
            .click();
        }, 100);
      });
    },
    changFile() {
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (item.data.name === "project_dc_xcdc") {
          dataArr.push(...item.data.valueData.point);
        }
      });
      let dataLength = dataArr.length;
      let index = "";
      for (let i = 0; i < dataLength; i++) {
        if (dataArr[i].hasOwnProperty("Identification")) {
          delete dataArr[i].Identification;
          index = i;
          break;
        }
      }
      let that = this;
      let filename = document.getElementById(
        "project_dc_xcdc-filename" + this.pageNumber + "-" + this.thisPageIndex
      );
      let files = filename.files[0];
      let imgName = "";
      if (that.title === "现场检测照片") {
        imgName = that.title + "-" + index;
      } else {
        imgName = that.title;
      }
      lrz(files).then((results) => {
        let fromData = new FormData();
        fromData.append("file", results.formData.get("file"));
        fromData.append("taskId", that.task.id);
        fromData.append("imageName", imgName);
        taskXcImage(fromData).then((res) => {
          if (res.data.success) {
            that.$notify({
              type: "success",
              message: res.data.msg,
            });
            that.data.valueData.point[that.currencyIndex].img = res.data.url;
            that.data.valueData.point[that.currencyIndex].state = 1;
          } else {
            that.$notify({
              type: "error",
              message: res.data.msg,
            });
          }
        });
      });
    },
    deleteSrue(index) {
      this.$confirm("删除图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.data.valueData.point[index].img = "";
        this.data.valueData.point[index].state = 0;
      });
    },
    show(index) {
      let img = this.data.valueData.point[index].img;
      if (img) {
        this.imgUrl = img;
        this.$nextTick(() => {
          document
            .getElementById("project_dc_xcdc-show" + this.pageNumber)
            .click();
        });
      } else {
        this.$message.error("暂无图片");
      }
    },
    addRow(index) {
      let row = JSON.parse(JSON.stringify(this.data.modelRow));
      row.pointId = window.uuid();
      row.foreverId = window.uuid();
      this.data.valueData.point.splice(index + 1, 0, row);
      this.$emit("redefinition");
    },
    deleteRow(index) {
      if (this.data.valueData.point.length > 1) {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false,
        }).then(({}) => {
          let title = this.data.valueData.point[index].title;
          let title1 = this.data.valueData.point[index - 1].title;
          if (title === "现场检测照片" && title1 === "现场检测照片") {
            this.data.valueData.point.splice(index, 1);
            this.$emit("redefinition");
          }
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
