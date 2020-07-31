<template>
  <div class="local-container">
    <local-list class="list" @showUploadBox="showUploadBox" />
    <el-dialog :visible.sync="uploadShow">
      <upload
        @close="uploadShow = false"
        :now="0"
        :multipleSelection="multipleSelection"
      ></upload>
    </el-dialog>
  </div>
</template>

<script>
import LocalList from "./components/LocalList";
import Upload from "@/views/components/upload/Upload";

export default {
  data() {
    return {
      uploadShow: false,
      multipleSelection: [],
    };
  },
  components: {
    LocalList,
    Upload,
  },

  methods: {
    //显示上传窗口
    showUploadBox(multipleSelection) {
      this.uploadShow = true;
      this.multipleSelection = multipleSelection;
    },
  },
};
</script>



<style rel="stylesheet/scss" lang="scss" scoped>
.local {
  &-container {
    .list {
      margin-top: 10px;
    }
  }
}
</style>
