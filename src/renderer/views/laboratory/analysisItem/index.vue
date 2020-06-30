<template>
  <div class="box">
    <div style="text-align: left; margin-bottom: 10px;">
      <el-button
        icon="plus"
        type="primary"
        @click="openShowAnalysisDialog"
        size="small"
        >新增分析项</el-button
      >
    </div>
    <el-card>
      <div style="min-height: 71vh;">
        <el-table
          ref="multipleTable"
          :data="list"
          style="width: 100%"
          @row-dblclick="editAnalysis"
          tooltip-effect="dark"
          min-height="71vh;"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <div>
                <el-table
                  tooltip-effect="dark"
                  :data="props.row.analysis"
                  style="width: 100%; margin-left: 50px;"
                >
                  <el-table-column type="index" width="50px;"></el-table-column>
                  <el-table-column width="400px;" label="创建日期">
                    <template slot-scope="scope">{{
                      scope.row.createtime
                    }}</template>
                  </el-table-column>
                  <el-table-column
                    width="600px;"
                    prop="analysisItem"
                    label="分析项"
                  ></el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope">{{ scope.row.createtime }}</template>
          </el-table-column>
          <el-table-column
            prop="testProjectName"
            label="检测项目名称"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="testProjectNum"
            label="检测项目编号"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button
                @click="deleteAnalysis(scope.row)"
                size="small"
                type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        :title="flag === 0 ? '新增分析项' : '编辑分析项'"
        :modal="false"
        v-if="showAnalysisDialog"
        :visible.sync="showAnalysisDialog"
        size="tiny"
        width="50%"
      >
        <div style="min-height: 400px; width: 30vw; padding-left: 7vw;">
          <div v-if="flag === 0">
            <el-form label-width="120px">
              <el-form-item label="检测项目名称">
                <el-select
                  v-model="addTestProjectId"
                  style="width: 25vw;padding: 0; margin: 0!important;"
                  filterable
                  placeholder="请选择检测项目"
                >
                  <el-option
                    v-for="item in allTestProjects"
                    :key="item.id"
                    :label="item.testProjectName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <table>
            <tr>
              <td>分析项</td>
              <td>分析结果</td>
            </tr>
            <tr v-for="(item, index) in analysisItem" :key="item.id">
              <td>
                <div class="___relative">
                  <div
                    class="myBtn ___absolute"
                    @click="addAnalysisItem(index)"
                    style="left: -7vw; width: 3vw; font-size: 14px;"
                    title="添加分析项"
                  >
                    添加
                  </div>
                  <div
                    class="myBtn ___absolute"
                    @click="delAnalysisItem(index)"
                    style="left: -3.5vw; width: 3vw;  font-size: 14px;"
                    title="删除分析项"
                  >
                    删除
                  </div>
                  <myInput v-model="item.analysisItem"></myInput>
                </div>
              </td>
              <td>
                <div
                  v-for="(item2, index2) in item.analysisResultArr"
                  :key="item2.id"
                  class="___relative"
                >
                  <div
                    :class="{
                      line:
                        index2 !== item.analysisResultArr.length - 1
                          ? true
                          : false
                    }"
                  >
                    <myInput v-model="item2.result"></myInput>
                  </div>
                  <div
                    class="myBtn ___absolute"
                    @click="analysisResultOption(index, index2, 0)"
                    title="添加分析结果"
                    style="width: 2vw; right: -2.5vw; top: 0px;"
                  >
                    +
                  </div>
                  <div
                    class="myBtn ___absolute"
                    title="删除分析结果"
                    @click="analysisResultOption(index, index2, 1)"
                    style="width: 2vw; right: -5vw; top: 0px;"
                  >
                    -
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <div style="text-align: right; padding-right: 20px;">
          <el-button>取消</el-button>
          <el-button
            type="primary"
            @click="
              flag === 0 ? toAddTestProjectAnalysis() : sureEditAnalysis()
            "
            >确认</el-button
          >
        </div>
      </el-dialog>
      <!--<div style="margin-top: 10px;">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageIndex"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="count">
                </el-pagination>
            </div>-->
    </el-card>
  </div>
</template>

<script>
import {
  getAnalysisItemList,
  queryAllTestProject,
  addTestProjectAnalysis,
  delTestProjectAnalysis,
  toUpdateTestProjectAnalysis
} from "@/api/laboratory";

export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      count: 0,
      list: [],
      showAnalysisDialog: false,
      allTestProjects: [],
      flag: 0,
      addTestProjectId: "",
      analysisItem: [
        {
          analysisItem: "",
          analysisResultArr: [{ result: "", id: uuid() }],
          id: uuid()
        }
      ]
    };
  },
  filters: {},
  computed: {},
  methods: {
    getList() {
      let that = this;
      getAnalysisItemList(this.pageIndex, this.pageSize)
        .then(function(res) {
          if (res.success) {
            that.list = res.datas;
            that.count = res.total;
          } else {
            that.$notify({
              type: "error",
              message: res.msg
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAllTestProject() {
      queryAllTestProject("").then(res => {
        if (res.success) {
          this.allTestProjects = res.datas;
        } else {
          this.$notify({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    addAnalysisItem(index) {
      let analySisObj = {
        analysisItem: "",
        analysisResultArr: [{ result: "", id: uuid() }],
        id: uuid()
      };
      this.analysisItem.splice(index + 1, 0, analySisObj);
    },
    delAnalysisItem(index) {
      this.analysisItem.splice(index, 1);
    },

    analysisResultOption(index, indexSon, flag) {
      if (flag === 0) {
        let analysisResult = { result: "", id: uuid() };
        this.analysisItem[index].analysisResultArr.splice(
          indexSon + 1,
          0,
          analysisResult
        );
      } else if (flag === 1) {
        this.analysisItem[index].analysisResultArr.splice(indexSon, 1);
      }
    },
    toAddTestProjectAnalysis() {
      if (this.addTestProjectId === "") {
        this.$notify({
          type: "warning",
          message: "请选择检测项目"
        });
        return;
      }
      let analysisItemFlag = 1;
      // let 
      this.analysisItem.map(item => {
        item.analysisItem ? "" : (analysisItemFlag = 0);
      });
      if (!analysisItemFlag) {
        this.$notify({
          type: "warning",
          message: "请填写分析项"
        });
        return;
      }
      addTestProjectAnalysis(this.addTestProjectId, this.analysisItem).then(
        res => {
          if (res.success) {
            this.showAnalysisDialog = false;
            this.getList();
            this.$notify({
              type: "success",
              message: res.msg
            });
          } else {
            this.$notify({
              type: "error",
              message: res.msg
            });
          }
        }
      );
    },
    openShowAnalysisDialog() {
      this.showAnalysisDialog = true;
      this.addTestProjectId = "";
      this.flag = 0;
      this.analysisItem = [
        {
          analysisItem: "",
          analysisResultArr: [{ result: "", id: uuid() }],
          id: uuid()
        }
      ];
    },
    editAnalysis(row) {
      row = JSON.parse(JSON.stringify(row));
      this.addTestProjectId = row.id;
      let analysisItem = row.analysis;
      analysisItem.forEach(item => {
        item.analysisResultArr = JSON.parse(item.analysisResultArr);
      });
      this.analysisItem = analysisItem;
      this.flag = 1;
      this.showAnalysisDialog = true;
    },
    sureEditAnalysis() {
      toUpdateTestProjectAnalysis(
        this.addTestProjectId,
        this.analysisItem
      ).then(res => {
        if (res.success) {
          this.showAnalysisDialog = false;
          this.getList();
          this.$notify({
            type: "success",
            message: res.msg
          });
        } else {
          this.$notify({
            type: "error",
            message: res.msg
          });
        }
      });
    },
    deleteAnalysis(row) {
      this.$confirm("确认删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        modal: false
      })
        .then(({}) => {
          delTestProjectAnalysis(row.id).then(res => {
            if (res.success) {
              this.getList();
              this.$notify({
                type: "success",
                message: res.msg
              });
            } else {
              this.$notify({
                type: "error",
                message: res.msg
              });
            }
          });
        })
        .catch(() => {
          this.$notify({
            message: "取消删除！",
            type: "success"
          });
        });
    }
  },
  created() {
    this.getList();
    this.getAllTestProject();
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
table td,
table th {
  border: 1px solid #cad9ea;
  color: #666;
  height: 30px;
}
table thead th {
  background-color: #cce8eb;
  width: 100px;
}
table tr:nth-child(odd) {
  background: #fff;
}
table tr:nth-child(even) {
  background: #f5fafa;
}
.line {
  border-bottom: 1px solid #cad9ea;
}
</style>
