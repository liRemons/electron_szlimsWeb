<template>
  <div>
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt20">
      <p style="line-height: 16px;">三、检测数据</p>
      <p style="line-height: 16px;">3.1机房屏蔽体现场调查</p>
      <p style="line-height: 16px;">
        {{ data.valueData.testProjectChineseName }}的检测结果
      </p>

      <div
        :class="{ _normalHeight_: true }"
        class="___relative"
        :id="data.valueData.testProjectId"
      >
        <div
          style="border: 1px solid black;width: 710px;height: 32px; line-height: 32px;"
          class="tc"
        >
          <p>工作人员操作位和管线洞口</p>
        </div>

        <div
          v-show="show&&btnFlag"
          class="___absolute  el-icon-arrow-down"
          style="left: 760px; top: 0px; color:gray; font-size: 28px; cursor: pointer; width: 50px; height: 50px;"
          @click="toFold"
        ></div>
        <div
          v-show="!show&&btnFlag"
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
                style="width:630px;left:80px;"
                class="tc borderRight ___absolute t0 Full"
              >
                <span>名称</span>
              </div>
              <!--            <div style="width:350px;left:230px" class="tc borderRight ___absolute t0 Full">
                                <span>毗邻场所</span>
                            </div>
                            <div style="width:130px;right: 0" class="tc ___absolute t0 Full">
                                <span>居留因子</span>
                            </div>-->
            </div>
            <div
              class="___relative"
              :class="
                index != data.valueData.point.length - 1 ? 'borderBottom' : ''
              "
              v-for="(item, index) in data.valueData.point"
            >
              <div class="___relative">
                <div style="width: 80px;" class="borderRight">
                  <div class="tc ___relative" style="height:32px;">
                    <span>{{ item.index }}</span>
                  </div>
                </div>
              </div>
              <div
                style="width:630px;left:80px;"
                class="tc borderRight ___absolute t0 Full"
              >
                <divModel
                  v-model="item.rows[0]"
                  style="width:100%;text-align: center;"
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
              </div>
              <!-- <div style="width:350px;left:230px" class="tc borderRight ___absolute t0 Full">
                                <divModel v-model="item.rows[1]" style="width:100%;text-align: center;"
                                          class="Full warp2 rowsInput2 hide focusBg"></divModel>
                            </div>-->
              <!--   <div @click.stop="getIndex(index)" style="width:130px;right: 0" class="tc ___absolute t0 Full">
                                <selectModel v-if="JudgePhotography"
                                             @returnVal="returnVal"
                                             :special="2"
                                             :receive="''"
                                             :single="true"
                                             :rows="false"
                                             :input="true"
                                             :factor="true"
                                             :transmitText="item.rows[2]"
                                             :Judge="JudgePhotography"
                                             :list="factorList" :Obj="''">
                                </selectModel>
                                <div v-else>
                                    不涉及
                                </div>
                            </div>
                            -->
              <div
                class="__functionBox"
                v-if="
                  index != data.valueData.point.length - 1 &&
                    ipdTemplate == 'ipdTemplate' &&
                    target == 0
                "
                style="top:6px;right:-70px;width: 20px;z-index:100"
              >
                <div
                  class="__functionButton6"
                  @dblclick.stop="reduce(index)"
                  style="right:0;"
                >
                  <span>-</span>
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
              style="left: 5px;"
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
            <div
              class="__functionButton6"
              @click="increase"
              style="left: 60px;"
            >
              <span>+</span>
            </div>
            <div
              class="__functionButton6"
              title="清除数据"
              @dblclick="computeObj.deleteRow('actionsWorkArr')"
            >
              <span>d</span>
            </div>
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
    "importData",
    "btnFlag"
  ],
  methods: {
    reduce(index) {
      if (this.data.valueData.point.length > 1) {
        this.data.valueData.point.splice(index, 1);
        this.$emit("redefinition");
      }
    },
    increase() {
      this.$store.dispatch("actionsWorkNum");
      let obj = {
        rows: ["管线洞口" + this.workNum, "", ""]
      };
      let nameArr = [];
      this.jsonString.forEach((item, index) => {
        nameArr.push(item.data.name);
      });
      let index = nameArr
        .reverse()
        .findIndex((item, index) => item === "projcet_gzwyzwtgxdk");
      this.jsonString[
        this.jsonString.length - 1 - index
      ].data.valueData.point.push(obj);
      this.$emit("redefinition");
    },
    sure() {
      if (!this.importData.isCreate) {
        this.$message.error("检测现场信息未生成表格");
        return;
      }
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (item.data.name === "projcet_gzwyzwtgxdk") {
          dataArr.push(...item.data.valueData.point);
        }
      });
      let completeArr = [];
      dataArr.forEach((item, index) => {
        if (item.hasOwnProperty("myId") === false) {
          item.myId = uuid();
        }

        let rows = [
          item.rows[0],
          item.rows[1],
          item.rows[2],
          "",
          "",
          "",
          "",
          "",
          "",
          item.myId
        ];
        completeArr.push({ rows: [...rows] });
      });
      this.$notify({
        type: "success",
        message: "生成成功"
      });
      this.$store.dispatch("actionsWorkArr", completeArr);
    },
    returnVal(val, obj, special) {
      if (special == 1) {
        this.data.valueData.point[this.patternIndex][obj] = val;
      } else if (special == 2) {
        this.data.valueData.point[this.patternIndex].rows[2] = val;
      } else {
        this.data.valueData[obj] = val;
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
    getIndex(index) {
      this.patternIndex = index;
    },
    showScalableTitle() {
      this.data.height._normal.carried = true;
      this.data.showScalableTitle = false;
    }
  },
  computed: {
    ...mapState({
      JudgePhotography: state => state.StomatologyLinkage.JudgePhotography,
      workNum: state => state.StomatologyLinkage.workNum
    })
  },
  mounted() {
  }
};
</script>

<style>
/* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
