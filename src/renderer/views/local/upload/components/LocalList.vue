<template>
  <el-card id="imgTooles">
    <div style="text-align: left; padding-left: 10px; margin: 10px 0;">
      <el-radio-group v-model="flag" @change="getNewData">
        <el-radio-button :label="0">未上传</el-radio-button>
        <el-radio-button :label="1">已上传</el-radio-button>
      </el-radio-group>
    </div>
    <div style="min-height: 60vh;">
      <el-table
        v-loading="listLoading"
        ref="multipleTable"
        :data="localDataFenYe[nowShowPage]"
        @row-dblclick="goOneTemplate"
        tooltip-effect="dark"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="审核时间" width="150">
          <template slot-scope="scope">{{
            scope.row.checkTime | getTime
          }}</template>
        </el-table-column>
        <el-table-column
          prop="checkUnitName"
          label="受检单位名称"
          show-overflow-tooltip
          width="150"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="检测对象"
          width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="检测地点"
          width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>

        <el-table-column label="状态" prop="pass" width="80"></el-table-column>

        <el-table-column label="签名" align="center" width="130">
          <template slot-scope="scope">
            <el-button
              v-if="!flag"
              size="mini"
              type="success"
              @click="writeName(scope.row)"
              >{{ scope.row.unitUrl ? "签名(已上传)" : "签名(未上传)" }}
            </el-button>
            <viewer
              v-if="flag && scope.row.unitUrl"
              class="viewer"
              :images="[hostUrl + scope.row.unitUrl]"
            >
              <img
                style="display: inline-block; height: 50px;"
                v-for="item in [hostUrl + scope.row.unitUrl]"
                :src="item"
                :key="item.index"
              />
            </viewer>
          </template>
        </el-table-column>
        <el-table-column label="点位图操作" width="220" v-if="!flag">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.isDocImg"
              @change="changeIsDocImg(scope.row)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="点位图" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="!flag"
              size="mini"
              type="success"
              @click="uploadDianWei(scope.row)"
              >{{
                scope.row.pointUrl ? "现场照片(已上传)" : "现场照片(未上传)"
              }}
            </el-button>
            <viewer
              class="viewer"
              v-if="flag && scope.row.pointUrl"
              :images="[hostUrl + scope.row.pointUrl]"
            >
              <img
                style="display: inline-block; height: 50px;"
                v-for="item in [hostUrl + scope.row.pointUrl]"
                :src="item"
                :key="item.index"
              />
            </viewer>
          </template>
        </el-table-column>

        <el-table-column
          prop="docReason"
          label="原因"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="reason"
          label="原始记录表不通过原因"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>

    <div style="margin-bottom: 10vh; margin-top: 10px;">
      <el-pagination
        @current-change="changeCurrentPage"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, prev, pager, next, sizes"
        :total="pageCount"
      >
      </el-pagination>
    </div>
    <div class="btn">
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="goTemplates()" type="primary">{{
        !flag ? "上传" : "查看"
      }}</el-button>
    </div>
    <el-dialog :visible.sync="showSignature">
      <signature @download="toUpload" v-if="showSignature"></signature>
    </el-dialog>
    <el-dialog :visible.sync="uploadDianWeiFlag" :modal="false">
      <div style="min-height: 300px;">
        <el-upload
          :limit="1"
          :action="hostUrl + '/upload_image'"
          :data="{ taskId: [nowRow.taskId], type: [0] }"
          :on-success="fileSuccess"
          :on-error="fileError"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
        >
          <el-button size="small" type="primary">选择点位图</el-button>
          <div style="margin: 20px 0;">
            请按报告出具的方向上传图片
          </div>
        </el-upload>
      </div>
    </el-dialog>

    <!-- <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="[url]"
    /> -->
  </el-card>
</template>

<script>
import { getToken } from "@/utils/auth";
import { getLocalData, toUpdateIsDocImg, uploadImg } from "@/api/local";
import store from "@/store";
import Viewer from "viewerjs";
import "viewerjs/dist/viewer.css";
import signature from "../../../components/signature/index";

export default {
  data() {
    return {
      imgFlag: false,
      imgArr: [],
      url: "",
      showViewer: false,
      localData: [],
      multipleSelection: [],
      listLoading: false,
      localDataFenYe: [],
      nowShowPage: 0,
      nowRow: "",
      pageSize: 10,
      showSignature: false,
      uploadDianWeiFlag: false,
      flag: 0,
      options: [
        {
          value: 0,
          label: "不需要上传图片",
        },
        {
          value: 1,
          label: "现场草图(需要重新编辑后方可放入检测报告中的图片)",
        },
        {
          value: 2,
          label: "现场照片(可以直接放入检测报告的图片)",
        },
      ],
    };
  },
  components: {
    signature,
  },
  filters: {
    getTime(time) {
      try {
        let time1 = time.split(" ");
        let time2 = time1[1].split(":");
        return `${time1[0]} ${time2[0]}:${time2[1]}`;
      } catch (e) {
        return "";
      }
    },
  },
  methods: {
    handleExceed(data) {
      if (data.length) {
        this.$message.error("您已上传图片，请删除后重试");
      }
    },
    beforeUpload(file) {
      return new Promise((resolve, reject) => {
        const isJPG =
          file.type === "image/png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg";
        const isLt2M = file.size / 1024 / 1024 < 1;
        if (!isJPG) {
          this.$message.error("只能上传图片格式!");
          return reject();
        }
        if (!isLt2M) {
          this.$message.error("上传大小不能超过 1MB!");
          return reject();
        }
        resolve();
      });
    },
    closeViewer() {
      this.showViewer = false;
    },
    checkImg(data) {
      this.imgArr = [this.hostUrl + data.pointUrl];
    },
    getList() {
      this.listLoading = true;
      let staffPhone = JSON.myParse(getToken()).staffPhone;
      getLocalData(staffPhone).then((response) => {
        let localData = response.data.filter((task) => {
          return task.pass == "通过";
        });

        let localData2 = response.data.filter((task) => {
          return task.pass == "已上传";
        });
        if (this.flag === 0) {
          this.localData = localData;
        } else {
          this.localData = localData2;
        }
        this.localDataFenYe = this.toTwoArr(this.localData, this.pageSize);
        this.listLoading = false;
      });
    },
    getNewData() {
      this.getList();
      this.localDataFenYe = [];
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 切换选中状态 或取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //签名
    writeName(row) {
      this.nowRow = row;
      this.$eventBus.$emit("clearWriteName");
      this.showSignature = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 显示验证指纹弹框
    showBox() {
      if (this.multipleSelection.length <= 0) {
        this.$notify({
          message: "请选择",
          type: "warning",
        });
        return;
      }
      this.$emit("showUploadBox", this.multipleSelection);
    },
    // 单个跳转到模板页面
    goOneTemplate(row) {
      sessionStorage.setItem("flag", this.flag);
      if (row) {
        let that = this;
        if (row.unitUrl) {
          let src = "http://120.77.153.63:8033" + row.unitUrl;
          let image = new Image();
          image.crossOrigin = "";
          image.src = src;
          image.onload = function () {
            let data = that.computeObj.getBase64Image(image);
            sessionStorage.setItem("uploadBase64", data);
            store.dispatch("TemplateAction", "show");
            that.$router.push(`/local/doc-entering/3/${row.taskId}`);
          };
        } else {
          store.dispatch("TemplateAction", "show");
          // if (row.unitUrl && row.pointUrl) {
            that.$router.push(`/local/doc-entering/3/${row.taskId}`);
          // if (row.pointUrl) {
            
          // } else {
          //   this.$notify({
          //     type: "warning",
          //     message: "签名或点位图未上传",
          //   });
          // }
        }
      } else {
        this.$notify({
          type: "warning",
          message: "请选择",
        });
      }
    },
    toUpload(val) {
      let va = val.getPNGImage();
      let v2 = val.dataURLtoBlob(va);
      let data = { taskId: this.nowRow.taskId, type: 1 };
      val.upload(
        v2,
        "http://120.77.153.63:8033/upload_image",
        this.fileSuccess2,
        this.fileError2,
        data
      );
    },

    goTemplates() {
      sessionStorage.setItem("flag", this.flag);
      if (this.multipleSelection.length <= 0) {
        this.$notify({
          type: "warning",
          message: "请选择",
        });
        return;
      }
      let flag = 1;
      let ids = this.multipleSelection.map((item) => {
        return item.taskId;
      });
      if (ids.length > 1) {
        this.$message.warning("您只能选择一个任务");
        return;
      }
      this.multipleSelection.map((item) => {
        if (item.isDocImg !== 0) {
          item.pointUrl ? "" : (flag = 0);
        }
        // item.unitUrl ? "" : (flag = 0);
      });
      if (!flag) {
        this.$notify({
          type: "warning",
          message: "签名或点位图未上传",
        });
        return;
      }
      this.$router.push(`/local/doc-entering/3/${ids.toString()}`);
    },

    changeCurrentPage(nowPage) {
      this.nowShowPage = nowPage - 1;
    },
    toTwoArr(arr, num) {
      let baseArray = arr;

      baseArray.sort((item, nextItem) => {
        let time = new Date(item.checkTime).getTime();
        let nextTime = new Date(nextItem.checkTime).getTime();

        if (time > nextTime) {
          return -1;
        } else if (time < nextTime) {
          return 1;
        } else {
          return 0;
        }
      });
      let len = baseArray.length;
      let n = num;
      let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
      let res = [];
      for (let i = 0; i < lineNum; i++) {
        let temp = baseArray.slice(i * n, i * n + n);

        res.push(temp);
      }
      return res;
    },

    fileSuccess(data) {
      if (data.success) {
        this.uploadDianWeiFlag = false;
        this.$notify({
          type: "success",
          message: data.msg,
        });
        this.getList();
      } else {
        this.$notify({
          type: "error",
          message: data.msg,
        });
      }
    },
    fileError() {
      this.$notify({
        type: "error",
        message: "接口请求失败！",
      });
    },
    fileSuccess2(data) {
      data = JSON.parse(data);
      if (data.success) {
        this.showSignature = false;
        this.$notify({
          type: "success",
          message: "上传成功",
        });
        this.getList();
      } else {
        this.$notify({
          type: "error",
          message: "上传失败",
        });
      }
    },
    fileError2() {
      this.$notify({
        type: "error",
        message: "接口请求失败！",
      });
    },
    uploadDianWei(row) {
      this.nowRow = row;
      this.uploadDianWeiFlag = true;
    },
    changeIsDocImg(row) {
      toUpdateIsDocImg(row.projectId, row.isDocImg)
        .then((res) => {
          if (res.success) {
            this.showSignature = false;
            this.$notify({
              type: "success",
              message: res.msg,
            });
            this.getList();
          } else {
            this.$notify({
              type: "error",
              message: res.msg,
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    if (sessionStorage.getItem("flag")) {
      this.flag = Number(sessionStorage.getItem("flag"));
    }
  },
  computed: {
    pageCount() {
      return this.localData.length;
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style>
.viewer-button {
  right: 50px;
  top: 50px;
}
.viewer-button::before {
  content: " ";
  display: block;
  height: 40px;
  width: 40px;
  background: url("../../../../assets/icon/closeV.png");
  background-size: 100%;
  bottom: 20px;
  left: 20px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.btn {
  position: fixed;
  top: 88vh;
  right: 2vw;
  z-index: 1000;
}
</style>
