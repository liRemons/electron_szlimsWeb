<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <p>{{ data.valueData.correct }}:</p>
      <table class="myTable">
        <tr>
          <td
            class="___relative tc"
            rowspan="2"
            style="width: 50px; line-height: 16px"
          >
            <span>点位<br />序号</span>
          </td>
          <td class="___relative tc" colspan="2" style="width: 100px">
            <span>与天线的距离(m)</span>
          </td>
          <td class="___relative tc" colspan="6" style="width: 350px">
            <span>电场强度(V/m)</span>
          </td>
          <td
            class="___relative tc"
            rowspan="2"
            style="width: 70px; line-height: 16px"
          >
            <span>功率密度S<br />(μW/cm2)</span>
          </td>
          <td class="___relative tc" rowspan="2" style="width: 120px">
            检测点位名称
          </td>
        </tr>
        <tr>
          <td>水平</td>
          <td>垂直</td>
          <td>E₁</td>
          <td>E₂</td>
          <td>E₃</td>
          <td>E₄</td>
          <td>E₅</td>
          <td>E</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td class="___relative tc">
            <div class="___absolute leftBtn" style="top: 0; left: -80px">
              <el-tooltip content="导入数据" placement="top" :open-delay="500">
                <el-button
                  v-if="
                    (item.rows[8] >= 12 || item.rows[9] >= 40) &&
                      target == 0 &&
                      data.valueData.specifications !== '工频'
                  "
                  @click="dcUpload(item)"
                  size="mini"
                  icon="el-icon-folder-add"
                  circle
                >
                </el-button>
              </el-tooltip>
              <input
                v-if="inputFile"
                type="file"
                @change="fileImport"
                id="file"
                style="display: none"
              />
            </div>
            {{ item.rows[0] }}
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.rows[1]"
              :defaultValue="item.rows[1]"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.rows[2]"
              :defaultValue="item.rows[2]"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.rows[3]"
              @change.native="changeNum(index)"
              :defaultValue="item.rows[3]"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.rows[4]"
              @change.native="changeNum(index)"
              :defaultValue="item.rows[4]"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.rows[5]"
              @change.native="changeNum(index)"
              :defaultValue="item.rows[5]"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.rows[6]"
              @change.native="changeNum(index)"
              :defaultValue="item.rows[6]"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              v-model="item.rows[7]"
              @change.native="changeNum(index)"
              :defaultValue="item.rows[7]"
            ></myInput>
          </td>
          <td>{{ item.rows[8] }}</td>
          <td>{{ item.rows[9] }}</td>
          <td class="___relative tc">
            <myInput
              v-model="item.rows[10]"
              :defaultValue="item.rows[10]"
            ></myInput>
            <div
              class="___absolute toolBar"
              style="left: 165px; top: 0; width: 180px"
              v-if="target == 0"
            >
              <div
                v-if="index == data.valueData.point.length - 1"
                title="往指定行后面增加一行"
                class="___absolute tc"
                @click="addRow(index, 2, item.heBingId)"
              >
                +
              </div>
              <div
                title="删除当前行"
                class="___absolute tc"
                style="left: 30px"
                @click="deleteRow(index, item)"
              >
                -
              </div>
              <div
                title="复制部分数据"
                class="___absolute tc"
                style="left: 60px"
                @click="copyRow(index, 'copy')"
              >
                c
              </div>
              <div
                title="复制全部数据"
                class="___absolute tc"
                style="left: 90px"
                @click="copyRow(index, 'copyAll')"
              >
                C
              </div>
              <div
                title="粘贴数据"
                class="___absolute tc"
                style="left: 120px"
                @click="pasteRow(index)"
              >
                p
              </div>
              <div
                title="生成重复样"
                class="___absolute tc"
                style="left: 150px"
                @click="addSample(index)"
                v-if="item.isPrototype"
              >
                r
              </div>
              <div
                title="生成点位"
                class="___absolute tc"
                style="left: 150px"
                v-if="data.valueData.specifications !== '工频'"
                @click="create(item, index)"
              >
                <i class="el-icon-search"></i>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import dcmodules from "@/components/makemodule/thisData/dataJs/sonModules/dc.js";
export default {
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
      sampleOption: "",
      inputFile: false,
      pointId: "",
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
  filters: {},

  methods: {
    // 上传文件=====================START
    dcUpload(data) {
      let arr = [],
        pointArr = [];
      this.jsonString.forEach((item) => {
        if (data.pointId === item.data.valueData.pointId) {
          if (item.to === "project_dc_dchjxpcl") {
            arr.push(item);
          }
          if (item.to === "project_dc_dchjxpclbg") {
            pointArr.push(item);
          }
        }
      });
      let pointNum;
      if (arr.length) {
        pointNum = arr[0].data.valueData.pointNum;
      }
      if (!pointNum) {
        this.$message.warning("您还未生成点位");
        return;
      }
      const open = () => {
        this.inputFile = true;
        this.pointId = data.pointId;
        this.$nextTick(() => {
          document.querySelector("#file").click();
        });
      };
      if (pointArr.length) {
        let point = pointArr.map((item) => item.data.valueData.point).flat();
        if (point.length === 1 && !point[0].v2) {
          open();
          return;
        }
      }
      this.$confirm("点击上传会将原有数据覆盖，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        open();
      });
    },
    fileImport() {
      //获取读取文件的File对象
      var selectedFile = document.getElementById("file").files[0];
      var reader = new FileReader();
      reader.readAsBinaryString(selectedFile);
      let this_ = this;
      reader.onload = (e) => {
        let persons = [];
        var data = e.target.result;
        var workbook = XLSX.read(data, { type: "binary" });
        for (var sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            let fromTo = workbook.Sheets[sheet]["!ref"];
            persons = persons.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            );
            break;
          }
        }
        // 格式化数据
        let newArr = persons.map((item) => {
          return {
            v1: item["索引"],
            v2: item["服务"],
            v3: item["频段"],
            v4: item.E1.split(" ")[0],
            v5: item.E2.split(" ")[0],
            v6: item.E3.split(" ")[0],
            v7: item.E4.split(" ")[0],
            v8: item.E5.split(" ")[0],
            v9: item.E1.split(" ")[1],
          };
        });
        if (this.pointId && newArr.length) {
          this.$store.commit("CHANGE_DCHJXPCLBG", {
            pointId: this.pointId,
            point: newArr,
          });
        } else {
          this.$message.error("解析失败");
        }
        this.inputFile = false;
      };
    },
    // ========================= END
    create(data, index) {
      if (!data.rows[0]) {
        this.$message.warning("点位未填写");
        return;
      }

      if (data.rows[1] == "" || data.rows[2] == "") {
        this.$message.warning("天线距离缺失");
        return;
      }
      if (
        data.rows[3] &&
        data.rows[4] &&
        data.rows[5] &&
        data.rows[6] &&
        data.rows[7]
      ) {
      } else {
        this.$message.warning("电场强度缺失");
        return;
      }
      if (!data.rows[10]) {
        this.$message.warning("检测点位名称缺失");
        return;
      }

      let createRepeatArr = [
          "project_dc_dchjxpcl",
          "project_dc_dchjxpclbg",
          "project_dc_dctj",
          "project_dc_yysmc",
        ],
        empty = [];
      // 获取所有将要清空的模块位置
      const initEmpty = () => {
        this.jsonString.forEach((item, index) => {
          if (
            createRepeatArr.includes(item.to) &&
            item.data.valueData.pointId === data.pointId
          ) {
            empty.push(index);
          }
        });
      };
      // 清空事件
      const emptyEvent = () => {
        this.jsonString.splice(
          Math.min(...empty),
          Math.max(...empty) - Math.min(...empty) + 1
        );
        this.$emit("redefinition");
        return;
      };
      // 生成事件
      const createEvent = () => {
        let createArr = [];
        let NewDcmodules = this.deepCopy(dcmodules);
        let dchjcl = this.jsonString.filter(
          (item) => item.to == "project_dc_dchjcl"
        );
        let project_deleteReason = this.jsonString.findIndex(
          (item) => item.to === "project_deleteReason"
        );
        // 总的点位
        let point = dchjcl.map((item) => item.data.valueData.point).flat();
        let pointNum = point.map((item) => item.rows[0]);
        let newPointNum = [...new Set(pointNum)];
        if (newPointNum.length !== pointNum.length) {
          this.$message.warning("有重复的点位");
          return;
        }
        NewDcmodules.forEach((item) => {
          createRepeatArr.forEach((a) => {
            if (item.name === a) {
              item.valueData.pointNum = data.rows[0];
              item.valueData.level = data.rows[1];
              item.valueData.vertical = data.rows[2];
              item.valueData.pointName = data.rows[10];
              item.valueData.foreverId = data.foreverId;
              item.valueData.pointId = data.pointId;
              item.valueData.multipleId = window.uuid();
              createArr.push({
                type: item.type,
                to: item.name,
                data: this.deepCopy(item),
              });
            }
          });
        });
        // 此处获取当前点位前一位的点位ID

        let prevPoint, lastIndex;
        if (data.index !== 1) {
          // 获取最后一个出现的位置
          prevPoint = point.filter((item) => item.index == data.index - 1)[0];
          let pointIdArr = this.jsonString.map(
            (item) => item.data.valueData.pointId
          );
          lastIndex = pointIdArr.lastIndexOf(prevPoint.pointId);
        }

        let now = this.jsonString.filter(
          (item) => item.data.valueData.pointId === data.pointId
        );
        // 如果未生成过点位
        if (now.length === 0) {
          lastIndex > 0
            ? this.jsonString.splice(lastIndex + 1, 0, ...createArr)
            : this.jsonString.push(...createArr);
          this.$emit("redefinition");
          return;
        }
        // 如果已生成过这个点位
        this.jsonString.forEach((item) => {
          let val = item.data.valueData;
          if (val.foreverId && val.pointId) {
            if (val.pointId === data.pointId) {
              createRepeatArr.forEach((a) => {
                if (item.to === a) {
                  val.pointNum = data.rows[0];
                  val.level = data.rows[1];
                  val.vertical = data.rows[2];
                  val.pointName = data.rows[10];
                  val.foreverId = data.foreverId;
                  val.pointId = data.pointId;
                }
              });
            }
          }
        });
        this.$emit("redefinition");
      };
      // 满足条件则不生成，如果之前生成过，则删除==========
      if (data.rows[8] < 12 && data.rows[9] < 40) {
        initEmpty();
        if (empty.length) {
          this.$confirm("此操作将此点位选频测量的数据清空, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            emptyEvent();
          });
        }
        return;
      }
      // 下面是不满足条件生成============
      this.$confirm(
        "是否生成：此操作不可逆，若点击取消会将此点位选频测量的数据清空, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          distinguishCancelAndClose: true,
        }
      )
        .then(() => {
          createEvent();
        })
        .catch((action) => {
          // 清空
          if (action === "cancel") {
            initEmpty();
            emptyEvent();
          }
        });
    },
    changeNum(index) {
      let item1 = this.data.valueData.point[index].rows[3];
      let item2 = this.data.valueData.point[index].rows[4];
      let item3 = this.data.valueData.point[index].rows[5];
      let item4 = this.data.valueData.point[index].rows[6];
      let item5 = this.data.valueData.point[index].rows[7];
      let arr = this.JudgeNum([item1, item2, item3, item4, item5]);
      if (arr.length === 5) {
        let average = this.average(arr);
        this.$set(
          this.data.valueData.point[index].rows,
          8,
          average.toFixed46(2)
        );
        this.$set(
          this.data.valueData.point[index].rows,
          9,
          (((average * average) / (Math.PI * 120)) * 100).toFixed46(2)
        );
      }
    },
    addRow(index) {
      let row = JSON.parse(JSON.stringify(this.data.modelRow));
      row.pointId = window.uuid();
      row.foreverId = window.uuid();
      this.data.valueData.point.splice(index + 1, 0, row);
      this.$emit("redefinition");
    },
    deleteRow(index, data) {
      let pointIdArr = this.jsonString.map(
        (item) => item.data.valueData.pointId
      );
      let first = pointIdArr.findIndex((item) => item === data.pointId);
      let end = pointIdArr.lastIndexOf(data.pointId);
      if (this.data.valueData.point.length > 1) {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false,
        }).then(({}) => {
          if (first > 0) {
            this.jsonString.splice(first, end - first + 1);
          }
          this.data.valueData.point.splice(index, 1);
          this.$emit("redefinition");
        });
      }
    },
    copyRow(index, copyName) {
      let obj = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
      sessionStorage.setItem("copy", copyName);
      sessionStorage.setItem("cyhjRowData", JSON.stringify(obj));
    },
    pasteRow(index) {
      let newObjData = JSON.myParse(sessionStorage.getItem("cyhjRowData"));
      newObjData.pointId = window.uuid();
      newObjData.foreverId = window.uuid();
      let keys = Object.keys(this.data.valueData.point[index]);
      let copy = sessionStorage.getItem("copy");
      keys.forEach((item) => {
        if (copy === "copyAll") {
          this.data.valueData.point[index][item] = newObjData[item];
        } else {
          let noCopy = this.data.noCopyArr;
          let result = noCopy.some((key) => key === item);
          if (newObjData[item] && result === false) {
            this.data.valueData.point[index][item] = newObjData[item];
          }
        }
      });
      setTimeout(() => {
        this.$eventBus.$emit("showText");
      }, 10);
    },
    addSample(index) {
      this.selectItem = this.data.valueData.point[index];
      this.selectItemIndex = index;
      this.sampleOption = true;
    },
  },
  mounted() {
    let dchjcl = this.jsonString.filter(
      (item) => item.to == "project_dc_dchjcl"
    );

    // 总的点位
    let point = dchjcl.map((item) => item.data.valueData.point).flat();
    let createRepeatArr = [
      "project_dc_dchjxpcl",
      "project_dc_dchjxpclbg",
      "project_dc_dctj",
      "project_dc_yysmc",
    ];
    if (point.length === 1) {
      this.jsonString.forEach((item) => {
        createRepeatArr.forEach((a) => {
          if (item.to === a) {
            item.data.valueData.pointId = point[0].pointId;
            item.data.valueData.foreverId = point[0].foreverId;
          }
        });
      });
    }
  },
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
