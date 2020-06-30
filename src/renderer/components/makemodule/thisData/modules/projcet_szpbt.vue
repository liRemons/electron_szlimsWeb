<template>
  <div
    :class="{ _normalHeight_: true }"
    class="___relative"
    :id="data.valueData.testProjectId"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt20">
      <div
        style="border: 1px solid black;width: 710px;height: 32px; line-height: 32px;"
        class="tc"
      >
        <p>机房六面屏蔽体情况</p>
      </div>
      <div
        v-show="show"
        class="___absolute  el-icon-arrow-down"
        style="left: 760px; top: 0px; color:gray; font-size: 28px; cursor: pointer; width: 50px; height: 50px;"
        @click="toFold"
      ></div>
      <div
        v-show="!show"
        class="___absolute el-icon-arrow-right"
        style="left: 760px; top: 0px; color:gray; font-size: 28px; cursor: pointer; width: 50px; height: 50px;"
        @click="toNoFold"
      ></div>
      <div v-if="showList">
        <div
          class="___relative ___module_frame_Box"
          style="border-top: solid 1px black;"
        >
          <div class="___relative">
            <div class="___relative borderBottom">
              <div style="width: 80px;" class="borderRight">
                <div class="tc" style="height:32px;">
                  <span>序号</span>
                </div>
              </div>
            </div>
            <div
              style="width:340px;left:80px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>名称</span>
            </div>
            <div
              style="width:290px;left:420px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>毗邻场所数量</span>
            </div>
            <!--   <div style="width:270px;left:340px;" class="tc ___absolute t0 Full; borderRight">
                            <span>毗邻场所相邻强数量</span>
                        </div>
                        <div style="width:100px;right: 0" class="tc ___absolute t0 Full">
                            <span>居留因子</span>
                        </div>-->
          </div>
          <div
            class="___relative"
            :class="
              index != data.valueData.point.length - 1 ? 'borderBottom' : ''
            "
            style="line-height: 48px"
            :key="index"
            v-for="(item, index) in data.valueData.point"
          >
            <div class="___relative">
              <div style="width: 80px;" class="borderRight">
                <div class="tc ___relative" style="height:48px;">
                  <span>{{ item.index }}</span>
                </div>
              </div>
            </div>
            <div
              @click="getIndex(index)"
              style="width:340px;left:80px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <!--<selectModel @returnVal="returnVal"
                                         v-if="showSelect(item.rows[0])"
                                         :special="1"
                                         :receive="index"
                                         :single="true"
                                         :rows="false"
                                         :Judge="true"
                                         :list="wallArr"
                                         :transmitText="item.rows[0]"
                                         :Obj="''"></selectModel>
                            <divModel v-else v-model="item.rows[0]">

                            </divModel>-->
              <selectModel
                @returnVal="returnVal"
                :special="1"
                :receive="index"
                :single="true"
                :rows="false"
                :Judge="true"
                :list="wallArr"
                :transmitText="item.rows[0]"
                :Obj="''"
              ></selectModel>
            </div>
            <div
              style="width:290px;left:420px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <divModel
                v-model="item.rows[2]"
                :is-num-box="true"
                style="width:100%;text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
            <!--  <div style="width:270px;left:340px;" class="tc borderRight ___absolute t0 Full">
                            <divModel v-model="item.rows[2]" :is-num-box="true" style="width:96%;text-align: center; border-bottom: 1px solid black; height: 32px; left: 5px;"
                                      class="Full warp2 rowsInput2 hide focusBg"></divModel>
                        </div>
                        <div @click="getIndex(index)" style="width:100px;right: 0" class="tc ___absolute t0 Full">
                            <selectModel v-if="JudgePhotography"
                                         @returnVal="returnVal"
                                         :special="2"
                                         :receive="index"
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
                  ipdTemplate == 'ipdTemplate'&&target == 0
              "
              style="top:6px;right:-70px;width: 20px;z-index:100"
            >
              <div
                class="__functionButton6"
                @dblclick="reduce(index)"
                style="right:0;"
              >
                <p class="spanButton2" >-</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="__functionBox"
          style="right:-155px;width: 110px;"
          v-if="ipdTemplate == 'ipdTemplate' && target == 0"
        >
          <!-- ******** 功能模块 ********** -->
          <div
            class="__functionButton6"
            @dblclick="reduce(data.valueData.point.length - 1)"
            style="left:5px;"
          >
            <span>-</span>
          </div>
          <div
            class="__functionButton6"
            @click="sure"
            style="left:30px;font-size: 14px;"
          >
            <span class="el-icon-search"></span>
          </div>
          <div class="__functionButton6" @click="increase" style="left:60px;">
            <span>+</span>
          </div>
          <div
            class="__functionButton6"
            title="清除数据"
            @dblclick="computeObj.deleteRow('actionsWallArr')"
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
      wallArr: [
        "墙1",
        "墙2",
        "墙3",
        "墙4",
        "墙5",
        "墙6",
        "墙7",
        "墙8",
        "墙9",
        "墙10",
        "其他",
        "机房上方",
        "机房下方"
      ],
      show: true,
      showList: true
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
    "importData"
  ],
  methods: {
    reduce(index) {
      if (this.data.valueData.point.length > 1) {
        this.data.valueData.point.splice(index, 1);
        this.$eventBus.$emit("referSelectModel");

        this.$emit("redefinition");
      }
    },
    increase() {
      let obj = {
        rows: ["", "", "", "", ""]
      };
      this.data.valueData.point.push(obj);
      this.$forceUpdate();
      this.$emit("redefinition");
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
    sure() {
      if (!this.importData.isCreate) {
        this.$message.error("检测现场信息未生成表格");
        return;
      }
      let dataArr = [];

      this.jsonString.forEach((item, index) => {
        if (item.data.name === "projcet_szpbt") {
          dataArr.push(...item.data.valueData.point);
        }
      });
      if (dataArr.some(item => Number(item.rows[2]) > 20)) {
        this.$notify({
          type: "warning",
          message: "最多生成20行！"
        });
        return;
      }
      let nameArr = [];
      dataArr.forEach((item, index) => {
        nameArr.push(item.rows[0]);

        if (item.hasOwnProperty("myId") === false) {
          item.myId = uuid();
        }
      });

      if (nameArr.every(item => item != "")) {
        let completeArr = [];
        dataArr.forEach((item, index) => {
          let remarks = "";
          if (item.rows[1] === "墙体" || item.rows[1] === "开关") {
            remarks = item.rows[1];
          } else {
            remarks = item.rows[2];
          }
          let rows = [];
          for (let i = 0; i < Number(item.rows[2]); i++) {
            let obj = "";
            if (item.rows[0].indexOf("机房") !== -1) {
              obj = [
                item.rows[0],
                "",
                item.rows[4],
                "",
                "",
                "",
                "",
                "",
                "",
                item.myId + "_" + i
              ];
            } else {
              obj = [
                item.rows[0] + "(" + "" + ")",
                "",
                item.rows[4],
                "",
                "",
                "",
                "",
                "",
                "",
                item.myId + "_" + i
              ];
            }
            rows.push({ rows: obj, isSzpbt: true });
          }
          completeArr.push(...rows);
        });
        this.$notify({
          type: "success",
          message: "生成成功"
        });
        this.$store.dispatch("actionsWallArr", completeArr);
         this.$emit("redefinition");
      } else {
        this.err("名称不能为空");
      }
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    returnVal(val, obj, special) {
      if (special == 1) {
        if (val === "其他") {
          this.data.valueData.point[obj].rows[0] = val;
          this.$forceUpdate();
        } else {
          this.data.valueData.point[obj].rows[0] = val;
        }
      } else if (special == 2) {
        this.data.valueData.point[obj].rows[4] = val;
      } else {
        this.data.valueData[obj] = val;
      }
    },
    getIndex(index) {
      this.patternIndex = index;
    },
    err(msg) {
      this.$notify({
        type: "error",
        message: msg
      });
    },
    showSelect(val) {
      let newArr = this.wallArr.slice(0, this.wallArr.length - 1);
      newArr.push("");
      let result = newArr.findIndex(item => item === val);
      if (result !== -1) {
        return true;
      } else {
        return false;
      }
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
