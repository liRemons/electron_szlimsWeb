<template>
  <div class="___relative">
    <div :class="{ eventCover: !ableInput }"></div>
    <table class="myTable">
      <tr>
        <td width="80" :rowspan="data.valueData.point.length + 1">空白样品</td>
        <td width="300">检测项目</td>
        <td width="100">样品编号</td>
        <td width="200">样品名称</td>
        <td width="80">样品数量</td>
        <td width="150">备注</td>
      </tr>
      <tr v-for="(item, index) in data.valueData.point" :key="item.pointId">
        <td>
          <selectModel
            @returnVal="getTestProjectArr"
            v-if="target === '0'"
            :single="false"
            :rows="false"
            :special="index"
            :Judge="true"
            @getList="getListArr"
            :input="false"
            :multiSelect="true"
            style="line-height: 32px"
            :receive="''"
            :transmitText="
              item.testProjects.length > 0
                ? item.testProjects.map((ite) => ite.name).toString()
                : ''
            "
            :list="selectTestProjectArr"
            :Obj="'name'"
          >
          </selectModel>
          <div v-else>
            {{
              item.testProjects.length > 0
                ? item.testProjects.map((ite) => ite.name).toString()
                : ""
            }}
          </div>
        </td>
        <td>
          <div v-if="!item.noGenerateNew">
            {{ item.sampleNum ? item.sampleNum : "" }}
          </div>
          <div v-else>
            <querySelect
              v-model="item.sampleNum"
              v-if="target === '0'"
              :num="index"
              :list="beUseBlank"
              :defaultValue="item.sampleNum"
              @getSelectItem="returnVal2"
              :name="'sampleNum'"
              @getList="getListArr"
            >
            </querySelect>
            <div v-else>
              {{ item.sampleNum ? item.sampleNum : "" }}
            </div>
          </div>
        </td>
        <td>
          <selectModel
            style="line-height: 32px"
            @returnVal="(a) => returnVal(a, index)"
            :Judge="true"
            v-if="!item.showInput"
            :special="index"
            :transmitText="item.sampleName"
            :multi-select="false"
            :input="false"
            :receive="'sampleName'"
            :single="true"
            :rows="false"
            :list="['现场空白', '运输空白', '对照空白', '试剂空白', '其他']"
            :Obj="''"
          >
          </selectModel>
          <myInput
            v-else
            style="text-align: center"
            v-model="item.sampleName"
          ></myInput>
        </td>
        <td>
          <myInput
            style="text-align: center"
            v-model="item.sampleQuantity"
          ></myInput>
        </td>
        <td>
          <myInput v-model="item.remark" style="text-align: center"></myInput>
          <!--<div class="___absolute toolBar" v-if="target === '0'" :style="{ top: index * 32 + 35 + 'px', width: 4 * 30 + 'px'}">
							<div class="___relative">
									<div class="___absolute btnHover" style="width: 30px; cursor: pointer;" @click="add(index)">+</div>
									<div class="___absolute btnHover" :style="{width: '30px', cursor: 'pointer', left: '30px'}" @click="deleteRow(index)">-</div>
									<div class="___absolute btnHover" title="选择今日被使用的空白编号" :style="{width: '30px', cursor: 'pointer', left: '60px'}" @click="judageNew(item)">b</div>
									<div class="___absolute btnHover" title="生成新的空白编号" :style="{width: '30px', cursor: 'pointer', left: '90px'}" @click="generateSampleNum(item)">B</div>
							</div>
					</div>-->
          <div
            class="___absolute"
            style="left: 905px"
            v-if="btnFlag && ableInput"
          >
            <utilBar
              :data="data"
              :index="index"
              :barNum="[0, 1]"
              :jsonString="jsonString"
              class="___absolute"
              style="left: 245px; top: -28px"
            >
            </utilBar>
            <div
              class="___absolute myBtn"
              title="选择今日被使用的空白编号"
              :style="{
                width: '30px',
                cursor: 'pointer',
                left: '325px',
                top: '-28px',
              }"
              @click="judageNew(item)"
            >
              b
            </div>
            <div
              class="___absolute myBtn"
              title="生成新的空白编号"
              :style="{
                width: '30px',
                cursor: 'pointer',
                left: '365px',
                top: '-28px',
              }"
              @click="generateSampleNum(item)"
            >
              B
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { querySameDayBlankSample, querySampleNum } from "@/api/local";

export default {
  name: "project_blankSample",
  props: ["data", "jsonString", "target", "btnFlag", "ableInput"],
  data() {
    return {
      selectTestProjectArr: [],
      nowYear: "",
      numObj: "",
      beUseBlank: [],
    };
  },
  watch: {},
  methods: {
    getTestProjectArr(name, a, index, b, selectArr) {
      this.data.valueData.point[index].testProjects = [...selectArr];
    },
    generateSampleNum(item) {
      if (item.sampleNum) {
        return;
      }
      item.noGenerateNew = false;
      this.$forceUpdate();

      let data = {
        sampleNumType: 4,
        sampleNumSize: 1,
      };
      querySampleNum(data).then((res) => {
        if (res.success) {
          let sampleNums = res.sampleNums;
          item.sampleNum = sampleNums[0];
        }
      });

      // if (window.sampleNum4 !== "") {
      //   window.sampleNum4 += 1;
      //   item.sampleNum = `KB${this.nowYear}${this.PrefixInteger(window.sampleNum4, 5)}`;
      // } else {
      //   let number = this.jsonString[0].data.valueData.sampleNum4 ? Number(this.jsonString[0].data.valueData.sampleNum4) : this.numObj.sampleNum_kb;
      //   window.sampleNum4 = number + 1;
      //   item.sampleNum = `KB${this.nowYear}${this.PrefixInteger(window.sampleNum4, 5)}`;
      // }
    },
    PrefixInteger(num, n) {
      return (Array(n).join(0) + num).slice(-n);
    },
    add(index) {
      let keys = Object.keys(this.data.valueData.point[index]);
      let obj = {};
      keys.forEach((key) => {
        obj[key] = "";
      });
      obj.pointId = uuid();
      this.data.valueData.point.splice(index + 1, 0, Object.assign({}, obj));
      this.$emit("redefinition");
    },
    deleteRow(index, item) {
      if (this.data.valueData.point.length > 1) {
        this.$confirm("确认删除吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          modal: false,
        }).then(({}) => {
          this.data.valueData.point.splice(index, 1);
          this.$emit("deleteSample", item);
        });
      }
    },

    getBeUseSample() {
      querySameDayBlankSample()
        .then((res) => {
          this.beUseBlank = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    returnVal2(index, valueObj) {
      this.data.valueData.point[index].sampleNum = valueObj.sampleNum;
    },
    judageNew(item) {
      item.noGenerateNew = true;
      this.$forceUpdate();
    },
    getListArr() {
      let testProjectArr = this.jsonString.filter(
        (item) =>
          item.data.height._normal.carried &&
          item.data.valueData.testProjectType === 2 &&
          item.data.valueData.sysTestProjectName !== "project_sysdong"
      );

      this.selectTestProjectArr = testProjectArr.map((item) => {
        return {
          id: item.data.valueData.testProjectId,
          name: item.data.valueData.testProjectChineseName,
        };
      });
    },
    returnVal(a, b) {
      if(a=='其他'){
        this.data.valueData.point[b].showInput=true
        this.$forceUpdate()
        return
      }
      this.data.valueData.point[b].sampleName = a;
    },
  },

  mounted() {
    this.nowYear = new Date().getFullYear().toString().substring(2, 4);
    this.numObj = JSON.myParse(sessionStorage.getItem("numObj"));
    this.getBeUseSample();
    this.data.valueData.point.forEach((item) => {
      item.showInput == undefined && (item.showInput = false);
    });
  },
  beforeDestroy() {
    window.sampleNum4 = "";
  },
};
</script>

<style scoped>
</style>
