<template>
  <div
    :class="{ _normalHeight_: true }"
    class="___relative"
    v-if="data.height._normal.carried"
    :id="data.valueData.testProjectId"
  >
    <div :class="{ eventCover: !ableInput }"></div>
    <div class="modules_1_tableBox ___relative mt20">
      <div
        style="border: 1px solid black;width: 710px;height: 32px; line-height: 32px;"
        class="tc"
      >
        <p>机房楼上和楼下关注点情况</p>
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
              style="width:180px;left:80px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>名称</span>
            </div>
            <div
              style="width:150px;left:260px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>关注点</span>
            </div>
            <div
              style="width:200px;left:410px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>毗邻场所</span>
            </div>
            <div style="width:100px;right: 0" class="tc ___absolute t0 Full">
              <span>居留因子</span>
            </div>
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
              style="width:180px;left:80px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <selectModel
                @returnVal="returnVal"
                :special="1"
                :receive="index"
                :single="true"
                :rows="false"
                :Judge="true"
                :list="namArr"
                :transmitText="item.rows[0]"
                :Obj="''"
              ></selectModel>
            </div>
            <div
              style="width:150px;left:260px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <divModel
                v-model="item.rows[1]"
                style="width:100%;text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
            <div
              style="width:200px;left:410px; line-height: 16px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <divModel
                v-model="item.rows[2]"
                style="width:100%;text-align: center;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
            <div
              style="width:100px;right: 0"
              @click="getIndex(index)"
              class="tc ___absolute t0 Full"
            >
              <selectModel
                v-if="JudgePhotography"
                @returnVal="returnVal"
                :special="2"
                :receive="''"
                :single="true"
                :rows="false"
                :input="true"
                :factor="true"
                :transmitText="item.rows[3]"
                :Judge="JudgePhotography"
                :list="factorList"
                :Obj="''"
              >
              </selectModel>
              <div v-else>
                不涉及
              </div>
            </div>
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
                @dblclick="reduce(index)"
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
          <div class="__functionButton6" @click="increase" style="left: 60px;">
            <span>+</span>
          </div>
          <div
            class="__functionButton6"
            title="清除数据"
            @dblclick="computeObj.deleteRow('actionsbuildingArr')"
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
      namArr: ["机房上方", "机房下方"],
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
    "btnFlag"
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
        rows: ["", "", "", ""]
      };
      this.data.valueData.point.push(obj);
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
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (item.data.name === "projcet_jflslxgzdqk") {
          dataArr.push(...item.data.valueData.point);
        }
      });

      let nameArr = [];
      dataArr.forEach((item, index) => {
        nameArr.push(item.rows[0]);
        if (item.hasOwnProperty("myId") === false) {
          item.myId = uuid();
        }
      });
      if (nameArr.every(item => item != "")) {
        let set = new Set(nameArr);
        if (Array.from(set).length < nameArr.length) {
          this.err("名称不能重复");
        } else {
          let completeArr = [];
          dataArr.forEach((item, index) => {
            let remarks = "";
            if (item.rows[1] === "顶棚" || item.rows[1] === "楼板") {
              remarks = item.rows[1];
            } else {
              remarks = item.rows[2];
            }

            let obj = [
              item.rows[0] + "(" + remarks + ")",
              item.rows[2],
              item.rows[3],
              "",
              "",
              "",
              "",
              "",
              "",
              item.myId
            ];
            completeArr.push({ rows: obj });
          });
          this.$notify({
            type: "success",
            message: "生成成功"
          });
          this.$store.dispatch("actionsbuildingArr", completeArr);
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

    returnVal(val, obj, special) {
      if (special == 1) {
        this.data.valueData.point[obj].rows[0] = val;
      } else if (special == 2) {
        this.data.valueData.point[this.patternIndex].rows[3] = val;
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
