<template>
  <div class="layout-container">
    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="7">
            <span class="title" style="font-family: SimSun"
              >深圳市瑞达智能检测系统用户端</span
            >
          </el-col>
          <el-col :span="12">
            <el-menu
              mode="horizontal"
              @select="storageRouter"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              style="user-select: none"
              :default-active="activeItem"
              router
            >
              <template
                v-if="menuState && $route.path.split('/')[2] !== 'doc-entering'"
              >
                <el-menu-item index="entering" @click="storageRouter()"
                  >录入</el-menu-item
                >
                <el-menu-item index="review" @click="storageRouter()"
                  >审核</el-menu-item
                >
                <el-menu-item index="upload" @click="storageRouter()"
                  >上传</el-menu-item
                >
              </template>
              <template
                v-if="
                  !menuState && $route.path.split('/')[2] !== 'doc-entering'
                "
              >
                <el-menu-item index="pickUp" @click="storageRouter()"
                  >接样</el-menu-item
                >
                <el-menu-item index="curve" @click="storageRouter()"
                  >配标</el-menu-item
                >
                <el-menu-item index="analysisItem" @click="storageRouter()"
                  >分析项管理</el-menu-item
                >
                <el-menu-item index="analysis" @click="storageRouter()"
                  >分析</el-menu-item
                >
                <el-menu-item index="upload" @click="storageRouter()"
                  >审核</el-menu-item
                >
              </template>
            </el-menu>
          </el-col>
          <el-col :span="4">
            <div class="back" @click="back">
              <span class="cancel">返回主界面</span>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <div style="height: 60px"></div>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
      uploadShow: false,
      multipleSelection: [],
    };
  },
  methods: {
    storageRouter() {
      sessionStorage.setItem("TolocalNo", 1);
      sessionStorage.removeItem("analysisInitial_index");
      sessionStorage.removeItem("laboratoryUpload_initialIndex");
      sessionStorage.removeItem("flag");
      sessionStorage.removeItem("laboratoryUploadTab");
      sessionStorage.removeItem("analysis");
      let path = this.$route.path.split("/")[2];
      if (this.menuState) {
        switch (path) {
          case "entering":
            sessionStorage.setItem("nowRouter", "entering");
            break;
          case "review":
            sessionStorage.setItem("nowRouter", "review");
            break;
          case "upload":
            sessionStorage.setItem("nowRouter", "upload");
            break;
        }
      } else {
        switch (path) {
          case "pickUp":
            sessionStorage.setItem("nowRouter", "pickUp");
            break;
          case "curve":
            sessionStorage.setItem("nowRouter", "curve");
            break;
          case "analysis":
            sessionStorage.setItem("nowRouter", "analysisLabel");
            break;
          case "upload":
            sessionStorage.setItem("nowRouter", "upload");
            break;
          case "analysisItem":
            sessionStorage.setItem("nowRouter", "analysisItem");
            break;
        }
      }
    },
    back() {
      if (this.$route.path) {
        if (this.$route.path.split("0")[0] == "/local/doc-entering/") {
          this.$confirm("此处返回可能造成您的数据丢失, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error",
          })
            .then(() => {
              this.$router.push("/");
            })
            .catch(() => {});
          return;
        } else {
          this.$router.push("/");
        }
      }
    },
  },
  computed: {
    activeItem() {
      return sessionStorage.getItem("nowRouter");
    },
    menuState() {
      return this.$route.path.indexOf("local") === -1 ? false : true;
    },
  },
  created() {
    this.storageRouter();
  },
  mounted() {},
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 999;
  overflow: hidden;
  background: #545c64;
}
.layout {
  &-container {
    .el-header {
      background-color: rgb(84, 92, 100);
      .title {
        color: #fff;
        margin: 0;
        line-height: 60px;
        letter-spacing: 4px;
        font-weight: 500;
        text-align: left;
        font-size: 1.6em;
      }
      .back {
        line-height: 60px;
        text-align: right;
        a {
          color: #fff;
          font-size: 1.2em;
        }
        a:hover {
          color: bisque;
        }
      }
    }
  }
}
.cancel {
  color: #fff;
  cursor: pointer;
  font-size: 1.5em;
}
.cancel:hover {
  color: #19caad;
}
.tabDiv {
  width: 100%;
}
</style>
