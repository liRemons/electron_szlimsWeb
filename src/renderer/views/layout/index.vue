<template >
  <el-container style="height: 100%">
    <el-header height="auto">
      <div class="header">
        <span style="line-height: 24px; padding-left: 20px"
          >瑞达智能检验检测管理系统-检验检测平台V{{ version }} （{{
            $isUpdate ? "正式版" : "测试版"
          }}）</span
        >
        <div style="-webkit-app-region: no-drag">
          <span v-if="staffName">登录人：{{ staffName }}</span>
          <img
            @click="$emit('clean')"
            src="@/assets/icon/clean.png"
            style="padding-top: 1px"
            v-if="$route.path == '/login'"
          />
          <el-tooltip
            class="item"
            content="检查更新"
            placement="bottom"
            v-if="$isUpdate"
          >
            <img
              src="@/assets/icon/upload.png"
              @click="$emit('update')"
              style="padding-top: 1px; width: 25px"
            />
          </el-tooltip>
          <img @click="$emit('mini')" src="@/assets/icon/mini.png" />
          <img
            @click="$emit('max')"
            v-if="!isMax"
            src="@/assets/icon/big.png"
          />
          <img
            v-else
            @click="$emit('minisize')"
            src="@/assets/icon/small.png"
          />
          <img @click="$emit('close')" src="@/assets/icon/close.png" />
        </div>
      </div>
      <div
        class="header_bottom"
        v-if="$route.path !== '/' && $route.path !== '/login'"
      >
        <div style="display: flex">
          <span class="sysTitle"> 瑞达智能检验检测管理系统-检验检测平台 </span>
          <el-menu
            @select="handleSelect"
            :default-active="activeItem()"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item
              :index="item.path"
              v-for="(item, index) in getMenu()"
              :key="index + 'route'"
              >{{ item.name }}</el-menu-item
            >
          </el-menu>
        </div>

        <span @click="toHome" class="goHome">返回主界面</span>
      </div>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>


<script>
import { getToken } from "@/utils/auth";
export default {
  props: ["version", "isMax", "staffName"],
  data() {
    return {
      menu: [
        { name: "录入", path: "entering", type: 0 },
        { name: "审核", path: "review", type: 0 },
        { name: "上传", path: "upload", type: 0 },
        { name: "接样", path: "pickUp", type: 1, role: ["实验室接样人"] },
        {
          name: "配标",
          path: "curve",
          type: 1,
          role: ["理化检验员", "理化检验审核员"],
        },
        {
          name: "分析项管理",
          path: "analysisItem",
          type: 1,
          role: ["微生物检验员", "微生物检验审核员"],
        },
        {
          name: "分析",
          path: "analysis",
          type: 1,
          role: [
            "放射检验员",
            "理化检验员",
            "微生物检验员",
            "放射检验审核员",
            "理化检验审核员",
            "微生物检验审核员",
          ],
        },
        {
          name: "审核",
          path: "upload",
          type: 1,
          role: ["放射检验审核员", "理化检验审核员", "微生物检验审核员"],
        },
      ],
    };
  },
  mounted() {
    sessionStorage.setItem("TolocalNo", 1);
  },
  computed: {
    menuState() {
      return this.$route.path.indexOf("local") === -1 ? false : true;
    },
  },
  methods: {
    activeItem() {
      return sessionStorage.getItem("nowRouter");
    },
    getMenu() {
      let power =
        JSON.parse(getToken()).modList &&
        JSON.parse(getToken()).modList.split(",");
      let menu = [];
      if (sessionStorage.getItem("ToggleBlock") === "local") {
        menu = this.menu.filter((item) => item.type == 0);
      } else {
        menu = this.menu.filter((item) => item.type == 1);
      }
      let name = this.$route.name;
      let arr = ["local-doc-entering", "doc-entering"];

      // 人员权限   ========START

      if (power) {
        const { redirectedFrom, path } = this.$route;
        let routerPath = path.split(redirectedFrom)[1];
        let nowRoterMenu = menu.filter(
          (item) => "/" + item.path === routerPath
        );
        if (nowRoterMenu.length) {
          if (!nowRoterMenu[0].role) return menu;
          if (nowRoterMenu[0].role.length) {
            let newRole = nowRoterMenu[0].role.filter((item) =>
              power.includes(item)
            );
            if (!newRole.length) {
              this.$message.warning("您无权限访问此页面，请联系管理员添加");
              this.$router.replace("/");
              return;
            }
          }
        }

        // 菜单显示;
        if (power.length) {
          menu = menu.filter((item) => {
            if (!item.role || !item.role.length) {
              return true;
            } else {
              return item.role.filter((a) => power.includes(a)).length;
            }
          });
        }
      }

      // ======= end

      if (arr.includes(name)) {
        return [];
      } else {
        return menu;
      }
      this.$forceUpdate();
    },
    handleSelect(data, path) {
      sessionStorage.setItem("page", 1);
      sessionStorage.setItem("TolocalNo", 1);
      sessionStorage.removeItem("analysisInitial_index");
      sessionStorage.removeItem("laboratoryUpload_initialIndex");
      sessionStorage.removeItem("flag");
      sessionStorage.removeItem("laboratoryUploadTab");
      sessionStorage.removeItem("analysis");
      sessionStorage.setItem("nowRouter", data);
    },
    toHome() {
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
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
  color: #ffffff;
}
.el-main {
  padding: 0;
  text-align: center;
  -webkit-app-region: no-drag;
}
.header {
  background: #373942;
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  img {
    width: 24px;
    cursor: pointer;
    padding: 0 2px;
  }
}
.header_bottom {
  background: #545c64;
  -webkit-app-region: no-drag;
  display: flex;
  justify-content: space-between;
  .sysTitle {
    letter-spacing: 6px;
    font-weight: 500;
    text-align: left;
    line-height: 60px;
    font-size: 18px;
    padding-left: 20px;
  }
  .goHome {
    line-height: 60px;
    font-size: 18px;
    padding-right: 20px;
    cursor: pointer;
  }
}
.el-menu.el-menu--horizontal {
  border: 0;
}
.el-menu-demo {
  margin-left: 30px;
}
</style>