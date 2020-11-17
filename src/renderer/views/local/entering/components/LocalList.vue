<template>
  <el-card>
    <div style="min-height: 60vh">
      <el-table
        v-loading="listLoading"
        ref="multipleTable"
        :data="localDataFenYe[nowShowPage]"
        :row-style="cancelRow"
        @row-dblclick="goOneTemplate"
        highlight-current-row
        @selection-change="haoCaiSelectionChange"
        @current-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column
        ><el-table-column
          type="index"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column label="安排检测时间" width="180">
          <template slot-scope="scope">{{
            scope.row.needTime | getTime
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
          prop="checkUnitContact"
          label="联系人"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="checkUnitPhone"
          label="联系电话"
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
          width="200"
          prop="reason"
          label="原始记录表不通过原因"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column width="200" label="附件下载">
          <template slot-scope="props">
            <a
              v-show="props.row.docDisplayUrl"
              download=""
              :href="imgUrl + '/' + props.row.docDisplayUrl"
              >附件下载</a
            >
          </template>
        </el-table-column>
        <el-table-column width="130" label="删除数据">
          <template slot-scope="props">
            <el-button
              icon="el-icon-delete"
              @click="delData(props.row.taskId)"
              type="danger"
              round
              size="mini"
              >删除数据</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-bottom: 10vh; margin-top: 10px">
      <el-pagination
        @current-change="changeCurrentPage"
        @size-change="handleSizeChange"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="pageCount"
      >
      </el-pagination>
    </div>

    <el-dialog :modal="false" title="耗材信息" :visible.sync="showHaocai">
      <el-radio-group v-model="radioJudge">
        <el-radio-button label="1">任务单</el-radio-button>
        <el-radio-button label="2">耗材单</el-radio-button>
      </el-radio-group>
      <div></div>
      <el-table
        height="800px"
        v-show="radioJudge === '1'"
        :data="dataTasks"
        class="mt20"
        width="100%"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column
          label="单位名称"
          prop="checkUnitName"
        ></el-table-column>
        <el-table-column
          label="检测项目"
          prop="testProjectName"
        ></el-table-column>
        <el-table-column label="检测依据">
          <template slot-scope="scope">{{
            `${scope.row.standardNum}${scope.row.standardUseTerms}`
          }}</template>
        </el-table-column>
        <el-table-column
          label="检测数量"
          prop="planTestingSize"
        ></el-table-column>
      </el-table>
      <el-table
        height="800px"
        v-show="radioJudge === '2'"
        :data="dataConsumables"
        class="mt20"
        width="100%"
      >
        <el-table-column type="index" label="序号" width="70"></el-table-column>
        <el-table-column label="检测日期" prop="needTime"></el-table-column>
        <el-table-column
          label="耗材名称"
          prop="consumablesName"
        ></el-table-column>
        <el-table-column
          label="耗材数量"
          prop="consumablesSize"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <div class="btn">
      <el-button @click="toggleSelection()">取消选择</el-button>
      <el-button @click="toUpdateTaskReturn" type="danger">打回</el-button>
      <el-button @click="searchHaoCai" type="primary">查看</el-button>
      <el-button @click="goTemplates()" type="primary">录入</el-button>
    </div>
    <div class="synchronization">
      <el-button
        @click="synchronization"
        icon="el-icon-refresh"
        type="primary"
        round
        >同步</el-button
      >
      <el-button icon="el-icon-delete" @click="emptyData" type="danger" round
        >清空数据</el-button
      >
    </div>
  </el-card>
</template>

<script>
import { getToken } from "@/utils/auth";
import { Loading } from "element-ui";
import {
  getLocalData,
  updateTaskReturn,
  queryTaskMaterialStatistics,
  queryTaskIsOpen,
  getAllMan,
  queryListType,
  getQueryByDeviceTypeName,
  queryDeviceByDeviceTypeId,
  updateTaskData,
} from "@/api/local";
import { getTaskById } from "@/api/entering";
import store from "@/store";

export default {
  data() {
    return {
      radioJudge: "1",
      localData: [], //存储整个table的数据
      multipleSelection: [], //存储被选择的数据
      haoCaiMultipleSelection: [],
      listLoading: false,
      nowShowPage: 0,
      pageSize: 10,
      localDataFenYe: [],
      dataTasks: [],
      dataConsumables: [],
      showHaocai: false,
    };
  },
  computed: {
    pageCount() {
      return this.localData.length;
    },
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
    //获取table数据
    getList() {
      if (sessionStorage.getItem("TolocalNo") == 0) {
        this.synchronization();
        return;
      }
      this.readFile(JSON.parse(getToken()), "enteringList");
      this.readFileEvent().then((res) => {
        if (res) {
          this.localData = JSON.parse(res).list.filter((task) => {
            return (
              task.pass == "未录入" ||
              task.pass == "未通过" ||
              task.pass == "正在录入"
            );
          });
          this.localDataFenYe = this.toTwoArr(this.localData, this.pageSize);
        }
      });
    },
    // 从服务器获取数据
    getUploadingList(loading) {
      let staffPhone = JSON.myParse(getToken()).staffPhone;
      getLocalData(staffPhone).then((response) => {
        sessionStorage.getItem("TolocalNo", 1);
        this.localData = response.data.filter((task) => {
          return (
            task.pass == "未录入" ||
            task.pass == "未通过" ||
            task.pass == "正在录入"
          );
        });

        this.localDataFenYe = this.toTwoArr(this.localData, this.pageSize);
        let fileData = JSON.parse(JSON.stringify(this.localData));
        let arr = [];
        fileData.map((item, index) => {
          arr[index] = { taskId: item.taskId, taskList: item };
        });
        let name = [];
        let DeviceTypeId = [];
        arr.map((item) => {
          name.push(item.taskList.name);
          DeviceTypeId.push({
            deviceTypeId: item.taskList.deviceTypeId,
            subCompanyId: item.taskList.subCompanyId,
          });
        });

        name = [...new Set([...name])];
        let promiseArr = [];
        for (let i = 0; i < name.length; i++) {
          promiseArr.push(
            getQueryByDeviceTypeName({ deviceTypeName: name[i] })
          );
        }
        Promise.all(promiseArr)
          .then((res) => {
            promiseArr = [];
            arr.map((item) => {
              res.map((a) => {
                if (a.datas.length) {
                  item.taskList.name == a.datas[0].deviceTypeName
                    ? (item["getQueryByDeviceTypeName"] = a)
                    : "";
                }
              });
            });
            let DeviceTypeIdPromise = [];
            for (let i = 0; i < DeviceTypeId.length; i++) {
              DeviceTypeIdPromise.push(
                queryDeviceByDeviceTypeId(DeviceTypeId[i])
              );
            }
            Promise.all(DeviceTypeIdPromise)
              .then((DeviceTypeIdRes) => {
                arr.forEach((item) => {
                  DeviceTypeIdRes.forEach((a) => {
                    a.data.forEach((item) => {
                      if (
                        item.purpose === "公共卫生" &&
                        item.deviceFactor.length > 1
                      ) {
                        item.deviceFactor.sort((a, b) => {
                          if (
                            Number(!a.measure1 ? 0 : a.measure1) >
                            Number(!b.measure1 ? 0 : b.measure1)
                          ) {
                            return 1;
                          } else {
                            return -1;
                          }
                        });
                      }
                    });
                    item.taskList.deviceTypeId == a.deviceTypeId
                      ? (item["device"] = a)
                      : "";
                  });
                });
                this.getId(arr, loading);
              })
              .catch((err) => {
                this.$message.error("同步失败");
                loading.close();
              });
          })
          .catch((err) => {
            this.$message.error("同步失败");
            loading.close();
          });

        // let json = { task: this.localData[0] };
      });
    },
    // 同步
    synchronization() {
      this.$confirm(
        "此操作不可逆，同步操作会将本地已有数据上传，请确认本地数据无误！！！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          const loading = Loading.service({
            lock: true,
            text: "加载中.....",
            target: "#content",
            background: "rgba(0, 0, 0, 0.7)",
          });
          // 如果已有列表则先上传数据再下载数据
          this.readFile(JSON.parse(getToken()), "enteringList");
          this.readFileEvent().then((res) => {
            if (res) {
              let uploadingPromiseArr = [];
              let staffPhone = JSON.myParse(getToken()).staffPhone;
              getLocalData(staffPhone)
                .then((response) => {
                  let uploadTask = response.data.filter((item) => {
                    return item.pass == "已上传";
                  });
                  let state = response.data.filter((item) => {
                    return (
                      item.pass == "未录入" ||
                      item.pass == "未通过" ||
                      item.pass == "正在录入"
                    );
                  });
                  JSON.parse(res).list.forEach((item) => {
                    state.forEach((a) => {
                      if (item.taskId == a.taskId) {
                        item.data
                          ? uploadingPromiseArr.push(
                              updateTaskData(item.taskId, item.data)
                            )
                          : "";
                      }
                    });
                  });
                  Promise.all(uploadingPromiseArr)
                    .then((uploadingRes) => {
                      uploadTask.forEach((a) => {
                        this.delFile(a.taskId, JSON.parse(getToken()));
                      });
                      this.getUploadingList(loading);
                    })
                    .catch((err) => {
                      this.$message.error("同步失败");
                      loading.close();
                      return;
                    });
                })
                .catch((err) => {
                  loading.close();
                });
              // return;
            } else {
              this.getUploadingList(loading);
            }
          });
        })
        .catch(() => {
          
          return;
        });
    },
    getId(data, loading) {
      let promiseGetTaskById = [];
      data.forEach((item) => {
        promiseGetTaskById.push(getTaskById(item.taskId));
      });
      Promise.all(promiseGetTaskById)
        .then((res) => {
          this.listLoading = false;
          data.map((item) => {
            item["tasks"] = res.filter((a) => {
              return item.taskId == a.tasks[0].id;
            });
            item.tasks = item.tasks[0];
          });
          let writeFileEventPromise = [];
          data.map((item) => {
            this.whrite(item, JSON.parse(getToken()));
            writeFileEventPromise.push(this.writeFileEvent());
          });
          Promise.all(writeFileEventPromise)
            .then((a) => {
              this.$message.success("同步成功");
              loading.close();
            })
            .catch((err) => {
              this.$message.error("同步失败");
              loading.close();
              return;
            });
          let enteringList = {
            taskId: "enteringList",
            list: [],
          };
          let noPass = {
            taskId: "noPass",
            list: [],
          };
          this.readFile(JSON.parse(getToken()), "noPass");
          this.readFileEvent().then((reson) => {
            let ids = [];
            if (reson) {
              noPass.list = JSON.parse(reson).list;
              ids = noPass.list.map((item) => item.taskId);
            }

            data.forEach((item) => {
              if (
                item.tasks.tasks[0].docPass == 1 &&
                (ids.length ? !ids.includes(item.tasks.tasks[0].id) : true)
              ) {
                noPass.list.push({
                  taskId: item.tasks.tasks[0].id,
                });
              }
            });
            this.whrite(noPass, JSON.parse(getToken()));
          });

          let enteringListInit = JSON.parse(JSON.stringify(data));
          enteringListInit.map((item) => {
            item.taskList["data"] = item.tasks.tasks[0].data;
            delete item.taskList.testProjectList;
            delete item.taskList.assessArr;
            enteringList.list.push(item.taskList);
          });
          this.whrite(enteringList, JSON.parse(getToken()));
          this.writeFileEvent().then((res) => {});
        })
        .catch((err) => {
           loading.close();
          this.$message.error("同步失败");
          return;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    // 切换选中状态 或取消选择
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection();
    },

    toUpdateTaskReturn() {
      let staffId = JSON.myParse(getToken()).id;
      let ids = this.haoCaiMultipleSelection.map((item) => item.taskId);
      if (ids.length <= 0) {
        this.$notify({
          message: "请选择打回任务！",
          type: "warning",
        });
        return;
      }
      this.$prompt("请输入打回原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        modal: false,
        inputType: "textarea",
      })
        .then(({ value }) => {
          let reason = value;
          let arr = this.localData.filter((item) => !ids.includes(item.taskId));
          let enteringList = {
            taskId: "enteringList",
            list: arr,
          };
          updateTaskReturn(staffId, ids, reason).then((res) => {
            if (res.success) {
              this.$notify({
                message: res.msg,
                type: "success",
              });
              this.localData;
              // sessionStorage.setItem("TolocalNo", 0);
              this.whrite(enteringList, JSON.parse(getToken()));
              this.writeFileEvent().then((res) => {
                this.getList();
              });

              ids.map((a) => {
                this.delFile(a, JSON.parse(getToken()));
              });
            } else {
              this.$notify({
                message: res.msg,
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },
    searchHaoCai() {
      let ids = this.haoCaiMultipleSelection.map((item) => item.taskId);
      if (ids.length <= 0) {
        this.$notify({
          type: "warning",
          message: "请选择任务",
        });
        return;
      }
      queryTaskMaterialStatistics(ids)
        .then((res) => {
          if (res.success) {
            this.dataTasks = res.data_tasks;
            this.dataConsumables = res.data_consumables;
            this.showHaocai = true;
          } else {
            this.$notify({
              type: "error",
              message: "查询耗材失败",
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //获取被选择的行
    handleSelectionChange(val) {
      this.multipleSelection = [val];
    },
    haoCaiSelectionChange(val) {
      this.haoCaiMultipleSelection = val;
    },
    cancelRow(obj) {
      if (obj.row.pass === "未通过") {
        return { color: "red" };
      }
    },
    // 单个跳转到模板页面
    goOneTemplate(row) {
      let version = sessionStorage.getItem("version");
      if (this.$isUpdate) {
        if (version.updateVersion !== version.version) {
          this.$message.warning("请更新到最新版本再进行录入");
          return;
        }
      }
      this.readFile(JSON.parse(getToken()), "enteringList");
      this.readFileEvent().then((res) => {
        let list = JSON.parse(res).list;
        list.forEach((item) => {
          if (item.taskId == row.taskId && item.pass == "未录入") {
            item.pass = "正在录入";
          }
        });
        let enteringList = {
          taskId: "enteringList",
          list: list,
        };
        this.whrite(enteringList, JSON.parse(getToken()));
        this.writeFileEvent().then(() => {
          this.readFile(JSON.parse(getToken()), row.taskId);
          this.readFileEvent().then((response) => {
            if (response) {
              this.$store.dispatch("actionsSetTestprojectId", true);
              store.dispatch("TemplateAction", "update"); //取出以选择的行id
              this.$router.push(`/local/doc-entering/0/${row.taskId}`);
            } else {
              this.$message.error("离线数据暂无本条记录，请点击同步后再试");
            }
          });
        });
      });
    },

    // 多个跳转到模板页面
    goTemplates() {
      let version = sessionStorage.getItem("version");
      if (this.$isUpdate) {
        if (version.updateVersion !== version.version) {
          this.$message.warning("请更新到最新版本再进行录入");
          return;
        }
      }
      if (this.multipleSelection.length > 0) {
        // let ids = this.multipleSelection.map(item => {  //取出以选择的行id
        //   return item.taskId;
        // });
        let that = this;
        let data = {
          taskId: that.multipleSelection[0].taskId,
          staffId: JSON.myParse(getToken()).id,
        };
        this.readFile(JSON.parse(getToken()), data.taskId);
        this.readFileEvent().then((r) => {
          if (r) {
            queryTaskIsOpen(data)
              .then((res) => {
                that.$store.dispatch("actionsSetTestprojectId", true);
                that.$router.push(`/local/doc-entering/0/${ids.toString()}`);
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            this.$message.error("离线数据暂无本条记录，请点击同步后再试");
          }
        });
      } else {
        this.$notify({
          type: "warning",
          message: "请选择任务!",
        });
      }
    },

    changeCurrentPage(nowPage) {
      this.nowShowPage = nowPage - 1;
    },
    toTwoArr(arr, num) {
      let baseArray = arr;

      baseArray.sort((item, nextItem) => {
        let time = new Date(item.needTime).getTime();
        let nextTime = new Date(nextItem.needTime).getTime();
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
    delData(id) {
      this.$confirm(
        "此操作将永久删除本地此条数据且不可恢复, 请操作前确认本地数据已上传或已失效！！！",
        "重要提醒",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(() => {
        this.delFile(id, JSON.parse(getToken()));
        this.localData.map((item, index) => {
          if (item.taskId == id) {
            this.localData.splice(index, 1);
          }
        });
        let arr = {
          taskId: "enteringList",
          list: this.localData,
        };
        this.whrite(arr, JSON.parse(getToken()));
        this.writeFileEvent((res) => {
          this.$message.success("删除成功");
          this.localDataFenYe[this.nowShowPage].forEach((item, index) => {
            item.taskId == id
              ? this.localDataFenYe[this.nowShowPage].splice(index, 1)
              : "";
          });
        });
        this.$message.success("删除成功");
        this.localDataFenYe[this.nowShowPage].forEach((item, index) => {
          item.taskId == id
            ? this.localDataFenYe[this.nowShowPage].splice(index, 1)
            : "";
        });
      });
    },
    emptyData() {
      this.$confirm(
        "此操作将永久删除本地所有数据且不可恢复, 请操作前确认本地数据已上传或已失效！！！",
        "重要提醒",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(() => {
        this.readDir(JSON.parse(getToken()));
        this.readDirEvent().then((res) => {
          res.forEach((item) => {
            if (item !== "noPass.json")
              this.delFile(item.split(".")[0], JSON.parse(getToken()));
          });
          this.$message.success("删除成功");
          this.localDataFenYe = [];
        });
      });
    },
  },
  created() {
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
.synchronization {
  position: fixed;
  top: 100px;
  right: 80px;
}
</style>
