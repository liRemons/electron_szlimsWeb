<template>
  <div>
    <ul class="myul" :style="{ width: barNum.length * 40 + 'px' }">
      <li v-if="barNum && barNum.indexOf(0) !== -1">
        <div class="myBtn" @click="increase()" title="添加一行">+</div>
      </li>

      <li v-if="barNum && barNum.indexOf(1) !== -1">
        <div class="myBtn" @dblclick="openReduce()" title="删除一行">-</div>
      </li>

      <li v-if="barNum && barNum.indexOf(2) !== -1">
        <div
          class="myBtn"
          @click="openAddTow()"
          title="每个模块生成同现场调查相同数量的行"
        >
          A
        </div>
      </li>

      <li v-if="barNum && barNum.indexOf(3) !== -1">
        <div class="myBtn" @click="copyRow('copy')" title="复制部分数据">c</div>
      </li>

      <li v-if="barNum && barNum.indexOf(4) !== -1">
        <div class="myBtn" @click="copyRow('copyAll')" title="复制全部数据">
          C
        </div>
      </li>

      <li v-if="barNum && barNum.indexOf(5) !== -1">
        <div class="myBtn" @click="openPasteRow(index)" title="粘贴数据">p</div>
      </li>

      <li
        v-if="barNum && barNum.indexOf(6) !== -1"
        title="生成重复样"
        @click="addSample(index)"
      >
        <div class="___relative">
          <el-popover
            placement="top-start"
            title="生成重复样"
            width="320"
            trigger="click"
          >
            <div style="min-height: 150px">
              <el-form :inline="true">
                <el-form-item label="采样布点">
                  <el-select
                    v-model="myCaiSample"
                    @change="getSampleQuantity"
                    placeholder="请选择采样布点"
                  >
                    <el-option
                      :label="item"
                      :value="item"
                      v-for="item in factorList"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="样品数量">
                  <el-input
                    placeholder="请输入样品数量"
                    style="width: 220px"
                    @keyup.native="
                      myCaiSampleNum = myCaiSampleNum.replace(/[^\d]/g, '')
                    "
                    :disabled="
                      myCaiSample !== '其它' && myCaiSample !== '均匀布点'
                    "
                    v-model="myCaiSampleNum"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div style="text-align: right">
              <el-button type="primary" @click="sureSampleNum">确定</el-button>
            </div>
            <div class="myBtn" slot="reference" title="生成重复样">r</div>
          </el-popover>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import modules from "@/components/makemodule/thisData/dataJs/modules.js";
import { addSampleNumDelete } from "@/api/local";

export default {
  name: "index",
  props: ["data", "index", "barNum", "jsonString", "whiteList"],
  data() {
    return {
      modules: modules,
      factorList: [
        "中央布点",
        "对称布点",
        "对角线布点",
        "梅花布点",
        "均匀布点",
        "其它",
      ],
      myCaiSample: "",
      myCaiSampleNum: "",
      selectItem: "",
      selectItemIndex: "",
    };
  },
  methods: {
    //添加行
    increase() {
      let obj = JSON.parse(
        JSON.stringify(this.data.valueData.point[this.index])
      );
      obj.isPrototype = true;
      let keys = Object.keys(obj);
      let whiteList = this.whiteList instanceof Array ? this.whiteList : [];
      keys.forEach((key) => {
        let forbidDelete = ["isPrototype", ...whiteList];
        if (forbidDelete.indexOf(key) === -1) {
          if (obj[key].constructor === Array) {
            obj[key] = [];
          } else {
            obj[key] = "";
          }
        }
      });

      obj.pointId = uuid();
      obj.foreverId = uuid();
      this.data.valueData.point.splice(this.index + 1, 0, obj);
      this.$eventBus.$emit("redefinition");
      this.$message({
        message: "添加行成功!",
        type: "success",
      });
    },

    openReduce() {
      let that = this;
      this.$confirm("确定删除当前行？", "删除确认", {
        confirmButtonText: "确定",
      }).then(() => {
        that.reduce();
      });
    },

    //删除行
    reduce() {
      if (this.data.valueData.point.length <= 1) {
        this.$notify({
          type: "warning",
          message: "最后一行不可删除！",
        });
        return;
      }
      let sampleNum = this.data.valueData.point[this.index].sampleNum;
      let pointArr = [];
      this.jsonString.forEach((item, index) => {
        pointArr.push(
          ...item.data.valueData.point.filter(
            (val, num) => val.sampleNum === sampleNum
          )
        );
      });
      if (
        sampleNum !== "" &&
        sampleNum !== undefined &&
        pointArr.length === 1
      ) {
        addSampleNumDelete(sampleNum).then((res) => {
          if (res.success) {
            this.iteration(true);
          }
        });
      } else {
        this.iteration(false);
      }
    },
    iteration(Judge) {
      this.data.valueData.point.splice(this.index, 1);
      if (Judge) this.resetNum();
      this.$eventBus.$emit("redefinition");
      this.$notify({
        message: "删除行成功!",
        type: "success",
      });
    },
    resetNum() {
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (
          item.data.name === this.data.name &&
          item.data.valueData.multipleId === this.data.valueData.multipleId
        ) {
          dataArr.push(...item.data.valueData.point);
        }
      });
      let sampleNumArr = [];
      dataArr.forEach((item, index) => {
        sampleNumArr.push(item.sampleNum);
      });
      sampleNumArr = Array.from(new Set(sampleNumArr));
      let integrationArr = [];
      sampleNumArr.forEach((item, index) => {
        integrationArr.push(
          dataArr.filter((val, num) => val.sampleNum === item)
        );
      });
      integrationArr.forEach((item, index) => {
        item[0].isPrototype = true;
        if (item.length > 1) {
          item.forEach((val, num) => {
            val.sampleNumIndex = "-" + (num + 1);
          });
        } else {
          item[0].sampleNumIndex = "";
        }
      });
    },
    //复制行数据
    copyRow(copyName) {
      let obj = JSON.parse(
        JSON.stringify(this.data.valueData.point[this.index])
      );
      obj.sampleNumIndex = "";
      sessionStorage.setItem("copy", copyName);
      sessionStorage.setItem("cyhjRowData", JSON.stringify(obj));
      this.$notify({
        type: "success",
        message: "复制成功",
      });
    },

    openPasteRow(index) {
      this.$confirm("粘贴到当前行中？", "粘贴确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.pasteRow(index);
        })
        .catch(() => {});
    },

    //粘贴
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
          // && result === false
          if (newObjData[item] ) {
            this.data.valueData.point[index][item] = newObjData[item];
          }
        }
      });

      setTimeout(() => {
        this.$eventBus.$emit("showText");
      }, 10);
    },
    openAddTow() {
      let that = this;
      this.$confirm("添加一行到检测项目中？", "添加确认", {
        confirmButtonText: "确定",
        callback: (action) => {
          console.log(action);
          // action 的值为'confirm', 'cancel'或'close'
          if (action == "confirm") that.addTwo();
        },
      });
    },

    //每个模块生成同现场调查相同数量的行
    addTwo() {
      let that = this;
      if (this.jsonString) {
        let redefinitionArr = [];
        // 先取到所有的模块名字
        console.log(new Set(this.jsonString.map((j) => j.to)));
        let nameArr = Array.from(
          new Set(
            this.jsonString.map(
              (j) => j.to + "..." + j.data.valueData.multipleId
            )
          )
        );

        // 所有模块最后一个下标
        let indexArr = JSON.parse(JSON.stringify(nameArr)).fill(null);
        for (let ni = 0; ni < nameArr.length; ni++) {
          for (let jsi = 0; jsi < this.jsonString.length; jsi++) {
            if (
              this.jsonString[jsi].to +
                "..." +
                this.jsonString[jsi].data.valueData.multipleId ==
              nameArr[ni]
            ) {
              indexArr[ni] = jsi;
            }
          }
        }
        console.log("nameArr", nameArr);
        console.log("这玩意是下标indexArr", indexArr);

        for (let i = 0; i < indexArr.length; i++) {
          if (
            !this.jsonString[i].data.isHead &&
            this.jsonString[i].to.indexOf("Reason") === -1
          ) {
            let points = this.jsonString[indexArr[i]].data.valueData.point;
            let projectName = this.jsonString[indexArr[i]].to;
            if (points.length != 0) {
              let row = points[points.length - 1];
              let newRow = {};
              if (row.hasOwnProperty("heBingId")) {
                newRow = JSON.parse(
                  JSON.stringify(
                    this.modules.find(
                      (item, index) => item.name === projectName
                    ).modelRow
                  )
                );
                let decomposeId = row.heBingId.split("-");
                newRow.heBingId =
                  decomposeId[0] +
                  "-" +
                  decomposeId[1] +
                  "-" +
                  decomposeId[2] +
                  "-" +
                  (parseInt(decomposeId[3]) + 1);
              } else {
                newRow = JSON.parse(JSON.stringify(row));
                let keys = Object.keys(newRow);
                keys.forEach((key) => {
                  let forbidDelete = ["isPrototype"];
                  if (forbidDelete.indexOf(key) === -1) {
                    if (newRow[key].constructor === Array) {
                      newRow[key] = [];
                    } else {
                      newRow[key] = "";
                    }
                  }
                });
                newRow.pointId = uuid();
                newRow.foreverId = uuid();
              }

              if (newRow.hasOwnProperty("noShow")) {
                newRow.noShow = true;
              }
              newRow.SampleAddress = this.data.valueData.point[
                that.index
              ].sampleAddress;
              newRow.sampleNum = "";
              newRow.sampleNumIndex = "";
              this.jsonString[indexArr[i]].data.valueData.point.splice(
                points.length,
                0,
                newRow
              );
            }
          }
        }

        this.$eventBus.$emit("redefinition");
        this.$message({
          message: "生成检测项目行成功!",
          type: "success",
        });
      }
    },

    /*以下都是生成重复样*/
    addSample(index) {
      this.selectItem = this.data.valueData.point[index];
      this.selectItemIndex = index;
    },

    getSampleQuantity(value) {
      if (value === "中央布点") {
        this.myCaiSampleNum = 1;
      } else if (value === "对称布点") {
        this.myCaiSampleNum = 2;
      } else if (value === "对角线布点") {
        this.myCaiSampleNum = 3;
      } else if (value === "梅花布点") {
        this.myCaiSampleNum = 5;
      } else {
        this.myCaiSampleNum = "";
      }
    },

    sureSampleNum() {
      if (this.selectItem.sampleNum == "") {
        this.$notify({
          type: "warning",
          message: "样品编号为空",
        });
        return;
      }
      if (this.myCaiSample === "" || this.myCaiSampleNum === "") {
        return;
      }
      this.selectItem.SamplePoint = this.myCaiSample;
      this.selectItem.sampleQuantity = this.myCaiSampleNum;
      this.sampleOption = false;
      this.myCaiSample = "";
      this.myCaiSampleNum = "";
      let arr = [];
      if (this.selectItem.sampleQuantity == 1) {
        this.clearPingXing();
        let obj = JSON.parse(JSON.stringify(this.selectItem));
        obj.sampleNumIndex = "";
        this.data.valueData.point.splice(this.selectItemIndex, 0, obj);
      } else {
        this.clearPingXing();
        for (let i = 0; i < this.selectItem.sampleQuantity; i++) {
          let obj = JSON.myParse(JSON.stringify(this.selectItem));
          obj.pointId = window.uuid();
          let num = i + 1;
          obj.sampleNumIndex = "-" + num;
          if (num !== 1) {
            obj.isPrototype = false;
          }
          arr.push(obj);
        }
        this.data.valueData.point.splice(this.selectItemIndex, 0, ...arr);
      }
      this.$eventBus.$emit("redefinition");
    },

    clearPingXing() {
      this.jsonString.forEach((item) => {
        if (
          item.data.name === this.data.name &&
          item.data.valueData.multipleId === this.data.valueData.multipleId
        ) {
          let result = item.data.valueData.point.some(
            (item2) => item2.foreverId === this.selectItem.foreverId
          );
          if (result) {
            let arr = item.data.valueData.point.filter(
              (item3) => item3.foreverId !== this.selectItem.foreverId
            );
            item.data.valueData.point = arr;
          }
        }
      });
    },
    /*以上都是生成重复样*/
    deepCopy(target) {
      let copyed_objs = []; //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
      function _deepCopy(target) {
        if (typeof target !== "object" || !target) {
          return target;
        }
        for (let i = 0; i < copyed_objs.length; i++) {
          if (copyed_objs[i].target === target) {
            return copyed_objs[i].copyTarget;
          }
        }
        let obj = {};
        if (Array.isArray(target)) {
          obj = []; //处理target是数组的情况
        }
        copyed_objs.push({ target: target, copyTarget: obj });
        Object.keys(target).forEach((key) => {
          if (obj[key]) {
            return;
          }
          obj[key] = _deepCopy(target[key]);
        });
        return obj;
      }

      return _deepCopy(target);
    },
  },
};
</script>

<style scoped>
.myul li {
  float: left;
  width: 40px;
  user-select: none;
}
</style>
