<template>
  <el-card>
    <div align="left">
      <h3 v-if="data.length > 0">{{ title }}</h3>
      <h3 v-else>{{ title }} ( <span style="color: red">暂无数据</span> )</h3>
    </div>
    <div class="tableHead">
      <!--一级表头-->
      <div style="flex: 0.25" class="colName">序号</div>
      <div style="flex: 0.16" class="colName">
        <el-checkbox
          v-model="allRowValue"
          v-if="data.length > 0"
          @change="changeAllRowValue"
        ></el-checkbox>
      </div>
      <div style="flex: 3; margin-left: 18px" class="colName">送检日期</div>
      <div style="flex: 3; margin-left: 5px" class="colName">检测项目</div>
      <div style="flex: 3" class="colName">检测依据</div>
      <div style="flex: 0.4" class="colName"></div>
    </div>
    <div v-if="data.length > 0">
      <div class="tableBody" v-for="(item, index) in data" :key="index">
        <div class="tableRow" style="user-select: none">
          <!--一级值-->
          <div style="flex: 0.25" class="colVal">{{ index + 1 }}</div>
          <div style="flex: 0.15">
            <el-checkbox
              v-model="item.isSelected"
              @change="
                single ? isSingle(item) : changeCheckBox(item.isSelected)
              "
            ></el-checkbox>
          </div>
          <i
            @click="toggleChildTable('oneLevel' + index)"
            style="flex: 0.15"
            :class="arrow('oneLevel' + index)"
          ></i>
          <div style="flex: 3" class="colVal">{{ item.inspectionTime }}</div>

          <div style="flex: 3" class="colVal">{{ item.name }}</div>
          <div style="flex: 3" class="colVal">
            {{ item.standardNum }} {{ item.standardUseTerms }}
          </div>
          <div style="flex: 0.4" class="colName">
            <el-button
              type="danger"
              @click="wtReturnSample(item)"
              size="mini"
              v-if="item.projectName == '委托送样'"
              >退样</el-button
            >
            <span style="color: red" v-if="showTitle(item.value)">被退回</span>
          </div>
        </div>
        <div v-show="showChildTable('oneLevel' + index)">
          <div class="tableHead">
            <!--二级头-->
            <div style="flex: 1; margin-left: 190px" class="colName">序号</div>
            <div style="flex: 1.8; margin-left: 0px" class="colName">
              样品编号
            </div>
            <div style="flex: 1.7; margin-left: 40px" class="colName">
              样品名称
            </div>
            <div style="flex: 2; margin-left: 25px" class="colName">
              样品数量
            </div>
            <div style="flex: 1; margin-left: 0px" class="colName">
              样品载体
            </div>
            <div
              style="flex: 1; margin-left: 0px"
              class="colName"
              v-if="$route.path == '/laboratory/pickUp'"
            >
              操作
            </div>
            <div
              style="flex: 1"
              class="colName"
              v-if="$route.path == '/laboratory/analysis'"
            >
              退回原因
            </div>
          </div>
          <div
            class="tableBody"
            v-for="(item2, index2) in item.value"
            :key="item2.id"
          >
            <div
              class="tableRow"
              :style="{ color: item2.sampleState === 6 ? 'red' : 'black' }"
            >
              <!--二级值-->
              <div style="flex: 0.85; margin-left: 200px">
                {{ index2 + 1 }}
              </div>

              <div style="flex: 2" class="colVal">
                {{ item2.sampleNum
                }}{{ item2.sampleNumIndex ? item2.sampleNumIndex : "" }}
              </div>
              <div style="flex: 2" class="colVal">{{ item2.sampleName }}</div>
              <div style="flex: 2" class="colVal">{{ item2.dishSize }}</div>
              <div
                style="flex: 1"
                class="colVal"
                v-if="$route.path == '/laboratory/analysis'"
              >
                {{ item2.sampleCarrier }}
              </div>
              <div style="flex: 1" class="colName">
                <span v-if="item2.sampleState === 6" style="color: red">{{
                  item2.reason
                }}</span>
                <span v-else></span>
              </div>
              <div
                v-if="
                  item.projectName !== '委托送样' &&
                  $route.path == '/laboratory/pickUp'
                "
                style="flex: 1"
              >
                <el-button
                  type="danger"
                  @click="cancelSamples(item2.id)"
                  size="mini"
                  >退样</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="min-height: 40vh"></div>
  </el-card>
</template>

<script>
import {
  updateSampleStateReason,
  updateEntrustGiveSampleReturn,
} from "@/api/laboratory";
import { getToken } from "@/utils/auth";
export default {
  name: "myTable",
  props: ["data", "title", "single"],
  data() {
    return {
      showOneLevelTable: [],
      checked: [],
      allRowValue: false,
    };
  },
  watch: {
    data: {
      handler: function () {
        let clearResult = this.$store.state.laboratory.clearSelect;
        if (clearResult) {
          this.data.forEach((item) => {
            item.isSelected = "";
            item.value.forEach((item2) => {
              item2.isSelected = "";
            });
          });
          this.$forceUpdate();
          this.$store.dispatch("ClearSelect", false);
        }
      },
      deep: true,
    },
  },
  computed: {},
  methods: {
    cancelSamples(id) {
      this.$prompt("请输入打回原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "格式不正确",
        inputType: "textarea",
        showInput: true,
      })
        .then(({ value }) => {
          let labPickSampleStaffId = JSON.myParse(getToken()).id;
          updateSampleStateReason(id, 9, labPickSampleStaffId, value).then(
            (res) => {
              if (res.success) {
                this.$notify({
                  message: res.msg,
                  type: "success",
                });
                this.$emit("toQuerySubmittedSample");
              } else {
                this.$notify({
                  message: res.msg,
                  type: error,
                });
              }
            }
          );
        })
        .catch(() => {});
    },
    toggleChildTable(rowIndex) {
      let result = this.showOneLevelTable.indexOf(rowIndex);
      if (result != -1) {
        this.showOneLevelTable.splice(result, 1);
      } else {
        this.showOneLevelTable.push(rowIndex);
      }
    },
    showChildTable(rowIndex) {
      let result = this.showOneLevelTable.indexOf(rowIndex);
      if (result != -1) {
        return true;
      } else {
        return false;
      }
    },
    //图标
    arrow(rowIndex) {
      let result = this.showOneLevelTable.indexOf(rowIndex);
      if (result != -1) {
        return "el-icon el-icon-arrow-down icon";
      } else {
        return "el-icon el-icon-arrow-right icon";
      }
    },
    showTitle(rowArr) {
      return rowArr.some((item) => item.sampleState === 6);
    },
    isSingle(item) {
      this.$forceUpdate();
    },
    changeCheckBox(flag) {
      this.$forceUpdate();
      if (flag) {
        this.data.forEach((item) => {
          if (item.isSelected === true) {
            item.value.forEach((item2) => {
              if (item2.isSelected !== true) {
                item2.isSelected = true;
              }
            });
          }
        });
      } else {
        this.data.forEach((item) => {
          if (item.isSelected === false) {
            item.value.forEach((item2) => {
              if (item2.isSelected !== false) {
                item2.isSelected = false;
              }
            });
          }
        });
      }
    },
    changeCheckBox2() {
      this.$forceUpdate();

      this.data.forEach((item) => {
        if (item.isSelected === true) {
          if (item.value.length >= 0) {
            let result = item.value.every((item2) => item2.isSelected == false);
            if (result) {
              item.isSelected = false;
            }
          }
        } else {
          if (item.value.length >= 0) {
            let result = item.value.every((item2) => item2.isSelected == true);
            if (result) {
              item.isSelected = true;
            }
          }
        }
      });
    },
    changeAllRowValue(val) {
      this.data.forEach((item) => {
        item.isSelected = val;
        item.value.forEach((item2) => {
          item2.isSelected = val;
        });
      });
    },
    wtReturnSample(data) {
      console;
      let ids = data.value.map((item) => item.id);
      let staffId = JSON.myParse(getToken()).id;
      this.$prompt("将打回此项目下的所有样品，请输入打回原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
        inputErrorMessage: "不能为空",
        inputType: "textarea",
        showInput: true,
      }).then(({ value }) => {
        fn(value);
      });

      async function fn(value) {
        let res = await updateEntrustGiveSampleReturn(
          ids.join(","),
          staffId,
          value
        );
        if (res.success) {
          this.$message.success(res.msg);
          this.$emit("toQuerySubmittedSample");
        } else {
          this.$message.error(res.msg);
        }
      }
    },
  },
  mounted() {
    this.$eventBus.$on("clearSelect", () => {
      this.allRowValue = "";
      this.data.forEach((item) => {
        item.isSelected = "";
        item.value.forEach((item2) => {
          item2.isSelected = "";
        });
      });
      this.$forceUpdate();
    });
    this.data.map((item) => {
      this.$set(item, "unfoldSign", false);
    });
  },
};
</script>

<style scoped>
.tableHead,
.tableRow {
  display: flex;
  font-size: 14px;
}

.icon {
  line-height: 50px;
}

.colName {
  color: #9691bd;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}

.tableBody {
}

.tableRow {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f4f0e7;
}

.colVal {
}
</style>
