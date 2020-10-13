<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <div
        class="___relative"
        :style="thisPageIndex === 0 ? '' : { borderTop: 'none' }"
        style="border: 1px solid black; border-bottom: none"
      >
        <span class="ml5">运营商名称: </span>
        <div class="___absolute t0" style="width: 100px; left: 75px">
          <div v-if="target == 0">
            <selectModel
              @returnVal="returnVal"
              :Judge="true"
              v-if="!data.valueData.showInput || !data.valueData.correct"
              :special="'title'"
              :multi-select="false"
              :transmitText="data.valueData.correct"
              :receive="'name'"
              :single="true"
              :rows="false"
              :list="operateList"
              :Obj="'name'"
            >
            </selectModel>
            <myInput
              style="text-align: center"
              v-else
              v-model="data.valueData.correct"
              @change.native="
                (el) => {
                  noShowInput(el, 0);
                }
              "
            ></myInput>
          </div>
          <div v-else>&nbsp;{{ data.valueData.correct }}</div>
        </div>
        <div
          class="___absolute toolBar"
          style="left: 764px; top: 0; width: 60px"
          v-if="target === '0'"
        >
          <div
            title="往指定行后面增加一行"
            class="___absolute tc"
            @click="addRow('', 2, '')"
          >
            +
          </div>
          <div
            title="删除当前行"
            class="___absolute tc"
            style="left: 30px"
            @click="deleteRow('', 1)"
          >
            -
          </div>
        </div>
      </div>
      <table class="myTable">
        <tr>
          <td>服务</td>
          <td>频段</td>
          <td>电场强度E(V/m)</td>
          <td>综合场强值Eₛ(V/m)</td>
        </tr>
        <tr v-for="(item, index) in data.valueData.point">
          <td class="___relative tc">
            <div v-if="target == 0">
              <selectModel
                @returnVal="returnVal"
                :Judge="true"
                v-if="data.valueData.showInput"
                :special="index"
                :multi-select="false"
                :transmitText="item.service"
                :receive="''"
                :single="true"
                :rows="false"
                :list="data.valueData.filterOperateList"
                :Obj="'v2'"
              >
              </selectModel>
              <div v-else>{{ item.service }}</div>
            </div>
            <div v-else>{{ item.service }}</div>
          </td>
          <td>{{ item.frequencyBand }}</td>
          <td class="___relative tc">
            <div>{{ item.electricField }}</div>
            <div
              class="___absolute toolBar"
              v-if="data.valueData.showInput"
              style="left: 410px; top: 0; width: 60px"
            >
              <div
                title="往指定行后面增加一行"
                class="___absolute tc"
                @click="addRow(index, 1, item.heBingId)"
              >
                +
              </div>
              <div
                title="删除当前行"
                class="___absolute tc"
                style="left: 30px"
                @click="deleteRow(index, 2)"
              >
                -
              </div>
            </div>
          </td>
          <td
            v-if="item.noShow"
            class="___relative tc"
            :rowspan="item.heBingLength"
          >
            <div>{{ item.fieldStrength }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import dcmodules from "@/components/makemodule/thisData/dataJs/sonModules/dc.js";
export default {
  data() {
    return {
      selectItem: "",
      selectItemIndex: "",
      myCaiSample: "",
      myCaiSampleNum: "",
      operateList: [
        { name: "移动", Identification: "Cmcc" },
        { name: "联通", Identification: "Unicom" },
        { name: "电信", Identification: "Tele" },
        { name: "运联通", Identification: "Yunliantong" },
        { name: "北迅", Identification: "Northcom" },
        { name: "自定义", Identification: "" },
      ],
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
    // 新的数据
    newPoint() {
      let data;
      dcmodules.forEach((item) => {
        item.name === "project_dc_yysmc" && (data = this.deepCopy(item));
      });
      data.valueData.multipleId = window.uuid();
      data.valueData.pointId = this.data.valueData.pointId;
      data.valueData.foreverId = this.data.valueData.foreverId;
      return {
        to: data.name,
        type: null,
        data: data,
      };
    },
    returnVal(val, name, index, obj) {
      if (index === "title") {
        this.data.valueData.point = [];
        if (val !== "自定义") {
          this.data.valueData.correct = val;
          this.reset(obj.Identification);
        } else {
          let dataArr = [];
          this.jsonString.forEach((item, index) => {
            if (
              item.to === "project_dc_dchjxpclbg" &&
              this.data.valueData.pointId === item.data.valueData.pointId
            ) {
              dataArr.push(...item.data.valueData.point);
            }
            if (
              item.to === "project_dc_yysmc" &&
              item.data.valueData.multipleId === this.data.valueData.multipleId
            ) {
              item.data.valueData.point = [];
            }
          });
          this.data.valueData.showInput = true;
          this.data.valueData.correct = " ";
          let row = JSON.parse(JSON.stringify(this.data.modelRow));
          row.pointId = this.data.valueData.pointId;
          row.foreverId = this.data.valueData.foreverId;
          row.heBingId = "project_dc_yysmc-0-0-0";
          this.data.valueData.point.push(row);
          let Identification = [
            "Cmcc",
            "Unicom",
            "Tele",
            "Yunliantong",
            "Northcom",
          ];
          dataArr.forEach((item, index) => {
            if (
              Identification.every((val, num) => {
                return item.v2 ? !item.v2.includes(val) : false;
              })
            ) {
              this.data.valueData.filterOperateList.push(item);
            }
          });
          this.$forceUpdate();
        }
        this.$emit("redefinition");
      } else {
        let arr = [obj.v4, obj.v5, obj.v6, obj.v7, obj.v8];
        this.data.valueData.point[index].frequencyBand = obj.v3;
        this.data.valueData.point[index].electricField = parseFloat(
          this.average(arr)
        ).toFixed46(2);
        this.data.valueData.point[index].fieldStrength = "";
        this.detectionResult();
      }
    },
    getIdPoint(keyArr, id) {
      this.jsonString.forEach((item, index) => {
        if (
          item.data.name === "project_dc_yysmc" &&
          item.data.valueData.multipleId === this.data.valueData.multipleId
        ) {
          keyArr.forEach((v, i) => {
            item.data.valueData[v.key] = v.value;
          });
        }
      });
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(" ", "");
      let val = el.target.value;
      this.data.valueData.correct = val;
      if (val === "") {
        this.data.valueData.showInput = false;
        this.reset("undefined");
      }
      let keyArr = [
        {
          key: "correct",
          value: val,
        },
      ];
      this.getIdPoint(keyArr);
      this.$forceUpdate();
    },
    reset(Identification) {
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (
          item.to === "project_dc_dchjxpclbg" &&
          this.data.valueData.pointId === item.data.valueData.pointId
        ) {
          dataArr.push(...item.data.valueData.point);
        }
        if (
          item.to === "project_dc_yysmc" &&
          item.data.valueData.multipleId === this.data.valueData.multipleId
        ) {
          item.data.valueData.point = [];
        }
      });
      dataArr.forEach((item, index) => {
        if (item.v2 && item.v2.includes(Identification)) {
          let arr = [item.v4, item.v5, item.v6, item.v7, item.v8];
          this.data.valueData.point.push({
            pointId: this.data.valueData.pointId,
            foreverId: this.data.valueData.foreverId, //永久的id 用于重复样
            noShow: true,
            heBingId: "project_dc_yysmc-0-0-0",
            heBingLength: "",
            service: item.v2,
            frequencyBand: item.v3,
            electricField: parseFloat(this.average(arr)).toFixed46(2),
            fieldStrength: "",
          });
        }
      });
      this.data.valueData.filterOperateList = [];
      this.detectionResult();
    },
    detectionResult() {
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (
          item.data.name === "project_dc_yysmc" &&
          item.data.valueData.multipleId === this.data.valueData.multipleId
        ) {
          dataArr.push(...item.data.valueData.point);
        }
      });
      let num = dataArr.length;
      let cumulative = 0;
      dataArr.forEach((item, index) => {
        if (this.isNumber(item.electricField)) {
          let value = item.electricField * item.electricField;
          cumulative += value;
        } else {
          num--;
        }
      });
      cumulative = num > 0 ? cumulative : "";
      if (this.isNumber(cumulative)) {
        let lastNum = Math.sqrt(cumulative);
        dataArr.forEach((item, index) => {
          dataArr[index].fieldStrength = lastNum.toFixed46(2);
        });
      }
    },
    addRow(index, Judge, heBingId) {
      let row = {};
      if (Judge === 1) {
        row = JSON.parse(JSON.stringify(this.data.valueData.point[index]));
        row.service = "";
        row.frequencyBand = "";
        row.electricField = "";
        let id =
          "project_dc_yysmc-" +
          this.pageNumber +
          "-" +
          this.thisPageIndex +
          "-" +
          index;
        this.data.valueData.point.splice(index + 1, 0, row);
        if (this.data.valueData.point[index].heBingId !== "") {
          this.data.valueData.point[
            index + 1
          ].heBingId = this.data.valueData.point[index].heBingId;
        } else {
          this.data.valueData.point[index + 1].heBingId = id;
        }
      } else if (Judge === 2) {
        let lastIndex;
        let smcData = this.newPoint();
        this.jsonString.forEach((item, index) => {
          this.data.valueData.pointId === item.data.valueData.pointId &&
            (lastIndex = index);
        });
        // 将新表格插入到此点位模板最后面
        this.jsonString.splice(lastIndex + 1, 0, smcData);
      }
      this.$emit("redefinition");
    },
    deleteRow(index, Judge) {
      if (this.data.valueData.point.length) {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false,
        }).then(() => {
          let pointIndex = [];
          if (Judge === 1) {
            let data = this.jsonString.filter(
              (item) =>
                item.to === "project_dc_yysmc" &&
                this.data.valueData.pointId === item.data.valueData.pointId
            );
            let ids = data.map((item) => item.data.valueData.multipleId);
            // 取出当前的表格索引
            this.jsonString.forEach((item, index) => {
              if (
                item.to === "project_dc_yysmc" &&
                item.data.valueData.multipleId ===
                  this.data.valueData.multipleId
              ) {
                pointIndex.push(index);
              }
            });

            const del = () => {
              this.data.valueData.correct = "";
              if (pointIndex.length > 1) {
                let count = Math.max(...pointIndex) - Math.min(...pointIndex);
                this.jsonString.splice(pointIndex[0], count + 1);
              } else {
                this.jsonString.splice(pointIndex[0], 1);
              }
            };
            // 判断当前的数量，只有一个不删除
            if ([...new Set(ids)].length > 1) {
              del();
            } else {
              del();
              let smcData = this.newPoint();
              this.jsonString.splice(pointIndex[0], 0, smcData);
            }
          } else if (Judge === 2) {
            this.data.valueData.point.splice(index, 1);
          }
          this.$emit("redefinition");
        });
      }
    },
    heBing() {
      let idArr = [];
      this.data.valueData.point.forEach((item, index) => {
        if (item.heBingId !== "") {
          idArr.push(item.heBingId);
        }
      });
      let setIdArr = Array.from(new Set(idArr));
      let sequence = 0;
      setIdArr.forEach((item, index) => {
        let merge = 0;
        let inside = sequence;
        let position = this.data.valueData.point
          .slice(sequence)
          .findIndex((val, num) => item === val.heBingId);
        let pointSliceData = this.data.valueData.point.slice(sequence);
        for (let i = 0; i < pointSliceData.length; i++) {
          if (pointSliceData[i].heBingId === item) {
            pointSliceData[i].noShow = false;
            merge++;
            sequence++;
          } else {
            break;
          }
        }
        this.data.valueData.point.slice(inside)[position].noShow = true;
        this.data.valueData.point.slice(inside)[position].heBingLength = merge;
      });
    },
  },
  watch: {
    "data.valueData.heBingChange": function () {
      this.heBing();
    },
  },
  mounted() {
    setTimeout(() => {
      this.heBing();
    }, 10);
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
</style>
