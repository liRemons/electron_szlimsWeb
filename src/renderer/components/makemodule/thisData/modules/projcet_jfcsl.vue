<template>
  <div
    :class="{ _normalHeight_: true }"
    class="___relative"
    :id="data.valueData.testProjectId"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt20">
      <div
        style="
          border: 1px solid black;
          width: 710px;
          height: 32px;
          line-height: 32px;
        "
        class="tc"
      >
        <p>机房窗数量</p>
      </div>
      <div
        v-show="show && btnFlag"
        class="___absolute el-icon-arrow-down"
        style="
          left: 760px;
          top: 0px;
          color: gray;
          font-size: 28px;
          cursor: pointer;
          width: 50px;
          height: 50px;
        "
        @click="toFold"
      ></div>
      <div
        v-show="!show && btnFlag"
        class="___absolute el-icon-arrow-right"
        style="
          left: 760px;
          top: 0px;
          color: gray;
          font-size: 28px;
          cursor: pointer;
          width: 50px;
          height: 50px;
        "
        @click="toNoFold"
      ></div>
      <div v-if="showList">
        <div
          class="___relative ___module_frame_Box"
          style="border-top: solid 1px black;"
        >
          <div class="___relative">
            <div class="___relative borderBottom">
              <div style="width: 50px;" class="borderRight">
                <div class="tc" style="height: 32px;">
                  <span>序号</span>
                </div>
              </div>
            </div>
            <div
              style="width: 440px; left: 50px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>名称</span>
            </div>
            <div
              style="width: 220px; left: 490px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>窗尺寸</span>
            </div>
            <!--<div style="width:170px;left:370px;" class="tc borderRight ___absolute t0 Full">
                            <span>毗邻场所</span>
                        </div>
                        <div style="width:170px;right: 0" class="tc ___absolute t0 Full">
                            <span>居留因子</span>
                        </div>-->
          </div>

          <div
            class="___relative"
            :class="
              index != data.valueData.point.length - 1 ? 'borderBottom' : ''
            "
            style="line-height: 32px;"
            v-for="(item, index) in data.valueData.point"
            :key="index + 'b'"
          >
            <div class="___relative">
              <div style="width: 50px;" class="borderRight">
                <div class="tc" style="height: 34px;">
                  <span>{{ item.index }}</span>
                </div>
              </div>
            </div>
            <div
              style="width: 440px; left: 50px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <divModel
                v-model="item.rows[0]"
                style="width: 100%; text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
            <div
              style="width: 220px; left: 490px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <div class="___absolute Full" style="width: 50%;">
                <divModel
                  v-model="item.rows[1]"
                  :computers="isInteger(item.rows[1], index, 1)"
                  style="
                    width: 60%;
                    text-align: center;
                    height: 30px;
                    border-bottom: 1px solid black;
                  "
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
                <span class="___absolute" style="right: 10px;">cm*</span>
              </div>
              <div class="___absolute Full" style="width: 50%; left: 50%;">
                <divModel
                  v-model="item.rows[2]"
                  :computers="isInteger(item.rows[2], index, 2)"
                  style="
                    width: 60%;
                    text-align: center;
                    height: 30px;
                    border-bottom: 1px solid black;
                  "
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
                <span class="___absolute" style="right: 10px;">cm</span>
              </div>
            </div>
            <!-- <div style="width:170px;left:370px; line-height: 16px;" class="tc borderRight ___absolute t0 Full">
                            <divModel v-model="item.rows[3]" style="width:100%;text-align: center;"
                                      class="Full warp2 rowsInput2 hide focusBg"></divModel>
                        </div>
                        <div @click="getIndex(index)" style="width:170px;right: 0" class="tc ___absolute t0 Full">
                            <selectModel v-if="JudgePhotography"
                                         @returnVal="returnVal"
                                         :special="2"
                                         :receive="''"
                                         :single="true"
                                         :rows="false"
                                         :input="true"
                                         :factor="true"
                                         :transmitText="item.rows[4]"
                                         :Judge="JudgePhotography"
                                         :list="factorList" :Obj="''">
                            </selectModel>
                            <div v-else>不涉及</div>
                        </div>-->

            <div
              class="__functionBox"
              v-if="
                index != data.valueData.point.length - 1 &&
                ipdTemplate == 'ipdTemplate' &&
                target == 0
              "
              style="top: 6px; right: -70px; width: 20px; z-index: 100;"
            >
              <div
                class="__functionButton6"
                @dblclick="reduce(index)"
                style="right: 0;"
              >
                <span>-</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="__functionBox"
          style="right: -155px; width: 110px;"
          v-if="ipdTemplate == 'ipdTemplate' && target == 0"
        >
          <!-- ******** 功能模块 ********** -->
          <div
            class="__functionButton6"
            @dblclick="reduce(data.valueData.point.length - 1)"
            style="left: 5px;"
          >
            <span>-</span>
          </div>
          <div
            class="__functionButton6"
            @click="sure"
            style="left: 30px; font-size: 14px;"
          >
            <span class="el-icon-search"></span>
          </div>
          <div class="__functionButton6" @click="increase" style="left: 60px;">
            <span>+</span>
          </div>
          <div
            class="__functionButton6"
            title="清除数据"
            @dblclick="computeObj.deleteRow('actionsWindowArr')"
          >
            <span>d</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      patternIndex: "",
      factorList: [
        "1",
        "0.25",
        "0.5",
        "0.2",
        "0.125",
        "0.0625",
        "0.05",
        "0.025"
      ],
      showList: true,
      show: true
    };
  },
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
    "target",
    "importData",
    "btnFlag"
  ],
  methods: {
    isInteger(val, index, rowIndex) {
      if (val % 1 !== 0) {
        this.$message.warning("请输入整数");
        this.$nextTick(() => {
          this.data.valueData.point[index].rows[rowIndex] = "";
          this.$forceUpdate();
        });
      }
    },
    reduce(index) {
      if (this.data.valueData.point.length > 1) {
        this.data.valueData.point.splice(index, 1);
        this.$emit("redefinition");
      }
    },
    //折叠
    toFold() {
      this.showList = false;
      this.show = false;
      this.data.valueData.moFold = true;

      this.$emit("redefinition");
    },

    //展开
    toNoFold() {
      this.showList = true;
      this.show = true;
      this.data.valueData.moFold = false;
      this.$emit("redefinition");
    },
    deleteRow() {
      this.$store.dispatch("actionsWindowArr", []);
    },
    sure() {
      if (!this.importData.isCreate) {
        this.$message.error("检测现场信息未生成表格");
        return;
      }
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (item.data.name === "projcet_jfcsl") {
          dataArr.push(...item.data.valueData.point);
        }
      });
      let nameArr = [];
      dataArr.forEach((item, index) => {
        if (item.hasOwnProperty("myId") === false) {
          item.myId = uuid();
        }

        nameArr.push(item.rows[0]);
      });
      if (nameArr.every(item => item != "")) {
        let set = new Set(nameArr);
        if (Array.from(set).length < nameArr.length) {
          this.err("名称不能重复");
        } else {
          let completeArr = [];
          let direction = ["上侧", "下侧", "左侧", "右侧", "中部"];
          dataArr.forEach((item, index) => {
            let cubicMetre =
              parseFloat(item.rows[1]) * parseFloat(item.rows[2]);

            if (cubicMetre >= 400) {
              let rows = [];
              direction.forEach((val, num) => {
                let obj = [
                  item.rows[0] +"(" + val + ")",
                  item.rows[3],
                  item.rows[4],
                  "",
                  "",
                  "",
                  "",
                  "",
                  "",
                  item.myId + "_" + num
                ];
                rows.push({ rows: obj });
              });
              completeArr.push(...rows);
            } else {
              let rows = [
                item.rows[0],
                item.rows[3],
                item.rows[4],
                "",
                "",
                "",
                "",
                "",
                "",
                item.myId + "_" + completeArr.length
              ];
              completeArr.push({ rows: [...rows] });
            }
          });
          console.log(completeArr)
          this.$notify({
            type: "success",
            message: "生成成功"
          });
          this.$store.dispatch("actionsWindowArr", completeArr);
        }
      } else {
        this.err("名称不能为空");
      }
    },
    err(msg) {
      this.$notify({
        type: "error",
        message: msg
      });
    },
    increase() {
      let obj = {
        rows: ["", "", "", "", ""]
      };
      this.data.valueData.point.push(obj);
      this.$emit("redefinition");
    },

    returnVal(val, obj, special) {
      if (special == 1) {
        this.data.valueData.point[this.patternIndex][obj] = val;
      } else if (special == 2) {
        this.data.valueData.point[this.patternIndex].rows[4] = val;
      } else {
        this.data.valueData[obj] = val;
      }
    },
    getIndex(index) {
      this.patternIndex = index;
    }
  },
  computed: {
    ...mapState({
      JudgePhotography: state => state.StomatologyLinkage.JudgePhotography
    })
  },
  mounted() {}
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
