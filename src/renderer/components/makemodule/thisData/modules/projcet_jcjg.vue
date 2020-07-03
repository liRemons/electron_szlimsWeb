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
        <p>机房门情况</p>
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
              <div style="width: 50px;" class="borderRight">
                <div class="tc" style="height:32px;">
                  <span>序号</span>
                </div>
              </div>
            </div>
            <div
              style="width:250px;left:50px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>名称</span>
            </div>
            <div
              style="width:125px;left:300px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>门上是否有窗</span>
            </div>
            <div
              style="width:175px;left:425px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>门上窗尺寸</span>
            </div>
            <div
              style="width:110px;left:600px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <span>是否有门把手</span>
            </div>
            <!--<div style="width:100px;left:510px;" class="tc borderRight ___absolute t0 Full">
                            <span>毗邻场所</span>
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
            style="line-height: 64px"
            v-for="(item, index) in data.valueData.point"
          >
            <div class="___relative">
              <div style="width: 50px;" class="borderRight">
                <div class="tc" style="height:64px;">
                  <span>{{ item.index }}</span>
                </div>
              </div>
            </div>
            <div
              style="width:250px;left:50px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <divModel
                v-model="item.rows[0]"
                style="width:100%;text-align: center; line-height: 32px;"
                class="Full warp2 rowsInput2 hide focusBg"
              ></divModel>
            </div>
            <div
              style="width:125px;left:300px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <el-radio v-model="item.rows[1]" label="是"></el-radio>
              <el-radio v-model="item.rows[1]" label="否"></el-radio>
            </div>
            <div
              style="width:175px;left:425px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <div class="___absolute Full" style="width: 50%">
                <divModel
                  v-if="item.rows[1] === '是'"
                  v-model="item.rows[2]"
                  style="width:60%;text-align: center; border-bottom: 1px solid black; height: 50px;"
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
                <span class="___absolute" style="right:10px;">cm*</span>
              </div>
              <div class="___absolute Full" style="width: 50%;left:50%">
                <divModel
                  v-if="item.rows[1] === '是'"
                  v-model="item.rows[3]"
                  style="width:60%;text-align: center; height: 50px; border-bottom: 1px solid black;"
                  class="Full warp2 rowsInput2 hide focusBg"
                ></divModel>
                <span class="___absolute" style="right:10px;">cm</span>
              </div>
            </div>
            <div
              style="width:110px;left:600px;"
              class="tc borderRight ___absolute t0 Full"
            >
              <el-radio v-model="item.rows[4]" label="是"></el-radio>
              <el-radio v-model="item.rows[4]" label="否"></el-radio>
            </div>
            <!-- <div style="width:100px;left:510px; line-height: 16px;" class="tc borderRight ___absolute t0 Full">
                            <divModel v-model="item.rows[5]" style="width:100%;text-align: center;"
                                      class="Full warp2 rowsInput2 hide focusBg"></divModel>
                        </div>
                        <div style="width:100px;right: 0" class="tc ___absolute t0 Full">
                            <selectModel v-if="JudgePhotography"
                                         @returnVal="returnVal"
                                         :special="2" :receive="index"
                                         :single="true"
                                         :rows="false"
                                         :input="true"
                                         :factor="true"
                                         :transmitText="item.rows[6]"
                                         :Judge="JudgePhotography"
                                         :list="factorList" :Obj="''">
                            </selectModel>
                            <div v-else>
                                不涉及
                            </div>
                        </div>-->
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
                @click="reduce(index)"
                style="right:0;"
              >
                <p class="spanButton1">-</p>
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
            @dblclick="computeObj.deleteRow('actionsDoorArr')"
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
    "importData",
    "ableInput",
    "target",
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
      let obj = {
        rows: ["", "", "", "", "", "", ""]
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
      this.$emit("referSelectModel");
      this.$emit("redefinition");
    },
    sure() {
      if (!this.importData.isCreate) {
        this.$message.error("检测现场信息未生成表格");
        return;
      }
      // return
      let dataArr = [];
      this.jsonString.forEach((item, index) => {
        if (item.data.name === "projcet_jcjg") {
          dataArr.push(...item.data.valueData.point);
        }
      });
      let nameArr = [];
      dataArr.forEach((item, index) => {
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
            let door = [];
            let window = [];
            let handle = [];
            if (item.hasOwnProperty("myId") === false) {
              item.myId = uuid();
            }
            direction.forEach((val, num) => {
              let obj = [
                item.rows[0] + "(" + val + ")",
                item.rows[5],
                item.rows[6],
                "",
                "",
                "",
                "",
                "",
                "",
                item.myId + "_" + num
              ];
              door.push({ rows: obj });
            });
            if (item.rows[1] === "是") {
              let cubicMetre =
                parseFloat(item.rows[2]) * parseFloat(item.rows[3]);
              if (cubicMetre >= 400) {
                direction.forEach((val, num) => {
                  let obj = [
                    item.rows[0] + "上窗(" + val + ")",
                    item.rows[5],
                    item.rows[6],
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    item.myId + "_" + (Number(door.length) + Number(num))
                  ];
                  window.push({ rows: obj });
                });
              }
            }
            if (item.rows[4] === "是") {
              handle = [
                {
                  rows: [
                    item.rows[0] + "(门把手)",
                    item.rows[5],
                    item.rows[6],
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    item.myId +
                      "_" +
                      (Number(door.length) + Number(window.length))
                  ]
                }
              ];
            }
            completeArr.push(...door, ...handle, ...window);
          });
          this.$notify({
            type: "success",
            message: "生成成功"
          });
          this.$store.dispatch("actionsDoorArr", completeArr);
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
        this.data.valueData.point[this.patternIndex][obj] = val;
      } else if (special == 2) {
        this.data.valueData.point[obj].rows[6] = val;
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
