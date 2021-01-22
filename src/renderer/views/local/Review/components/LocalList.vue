<template>
  <el-card>
    <div style="min-height: 60vh">
      <el-table
        v-loading="listLoading"
        ref="multipleTable"
        :data="tableData"
        @row-dblclick="goOneTemplate"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column label="录入时间" width="180">
          <template slot-scope="scope">{{
            scope.row.endTime | getTime
          }}</template>
        </el-table-column>
        <el-table-column
          prop="checkUnitName"
          label="受检单位名称"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="name" label="检测对象"></el-table-column>
        <el-table-column
          prop="address"
          label="检测地点"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="note"
          label="备注"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pass"
          label="状态"
          show-overflow-tooltip
        ></el-table-column>
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
    <div style="margin-bottom: 10vh; margin-top: 10px">
      <el-pagination
        @current-change="changeCurrentPage"
        :total="total"
        v-if="total"
        background
        :current-page="pageIndex"
      >
      </el-pagination>
    </div>
    <div class="btn">
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="toReview()" type="primary">查看</el-button>
    </div>
  </el-card>
</template>

<script>
import { getToken } from "@/utils/auth";
import { getLocalDataNew } from "@/api/local";
import { winUpdateTaskState } from "@/api/local";
import store from "@/store";

export default {
  data() {
    return {
      multipleSelection: [],
      listLoading: false,
      pageIndex: 1,
      tableData: [],
      total: 0,
    };
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
    async getList() {
      this.total = 0
      this.tableData = [];
      this.listLoading = true;
      let staffId = JSON.myParse(getToken()).id;
      let res = await getLocalDataNew(staffId, this.pageIndex, 2);
      this.total = res.total;
      this.tableData = res.data;
      this.listLoading = false;
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
    handleSelectionChange(val) {
      if (val.length > 1) {
        // this.$refs.multipleTable.toggleRowSelection(val[0]);
        this.multipleSelection = val;
      } else {
        this.multipleSelection = [val[0]];
      }
    },
    // 单个跳转到模板页面
    goOneTemplate(row) {
      store.dispatch("TemplateAction", "update");
      this.$router.push(`/local/doc-entering/2/${row.taskId}`);
    },
    // 多个跳转到模板页面
    toReview() {
      if (this.multipleSelection.length > 0) {
        let ids = this.multipleSelection.map((item) => {
          return item.taskId;
        });
        this.$router.push(`/local/doc-entering/2/${ids.toString()}`);
      } else {
        this.$notify({
          type: "warning",
          message: "请选择",
        });
      }
    },
    toTwoArr(arr, num) {
      let baseArray = arr;

      baseArray.sort((item, nextItem) => {
        let time = new Date(item.endTime).getTime();
        let nextTime = new Date(nextItem.endTime).getTime();

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
    changeCurrentPage(nowPage) {
      this.pageIndex = nowPage;
      sessionStorage.setItem("page", this.pageIndex);
      this.getList();
    },
  },
  mounted() {
    if (sessionStorage.getItem("page")) {
      this.pageIndex = sessionStorage.getItem("page");
    }
    let pageIndex = Number(sessionStorage.getItem("page"));
    pageIndex && (this.pageIndex = pageIndex);
    this.getList();
  },
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.btn {
  position: fixed;
  top: 88vh;
  right: 2vw;
}
</style>
