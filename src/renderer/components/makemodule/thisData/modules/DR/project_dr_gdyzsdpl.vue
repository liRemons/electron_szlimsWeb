<template>
  <div style="line-height: 30px;" class="___relative project_dr_gdyzsdpl">
    <div :class="{ eventCover:!ableInput }"></div>
    <div style="text-align: center;">
      <div
        style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;"
      >
        管电压指示的偏离
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;"
      >
        标准要求
      </div>
      <div
        style="border: 1px solid black; border-top: none; min-height: 30px;"
        class="tl"
      >
        {{ getContent(0) }}
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        检测及计算方法
      </div>
      <div
      class="tl"
        style="border: 1px solid black; border-top: none; padding: 2px; min-height: 20px;line-height:20px"
      >
        {{ getContent(1) }}
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        检测结果
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td :colspan="focus ? 2 : 1">检测条件</td>
          <td colspan="2">测量值</td>
          <td rowspan="2">校准平均值/kV</td>
          <td rowspan="2" v-if="deviation">偏差/kV</td>
          <td rowspan="2" v-if="relativeDeviation">相对偏差/%</td>
        </tr>
        <tr class="delLine">
          <td v-if="focus">焦点</td>
          <td>预设管电压</td>
          <td>测量值/kV</td>
          <td>校准因子</td>
        </tr>
      </table>

      <table class="myTable">
        <tr
          v-for="(item, index) of data.valueData.bigFocus"
          :class="{ delLine: index === 0 }"
        >
          <td rowspan="12" v-if="index === 0 && focus">
            <el-checkbox disabled v-model="data.valueData.bigFocusChecked"
              >大焦点</el-checkbox
            >
          </td>
          <td rowspan="3" v-if="item.toRow3">
            <myInput
              reg="[^0-9./]"
              @change.native="changeNum(index, 'bigFocus', item.getIndex)"
              v-model="item.rows[0]"
            ></myInput>
          </td>
          <td>
            <myInput
              reg="[^0-9./]"
              @change.native="changeNum(index, 'bigFocus', item.getIndex)"
              v-model="item.rows[1]"
            ></myInput>
          </td>
          <td>
            <span>{{ item.rows[2] }}</span>
          </td>
          <td rowspan="3" v-if="item.toRow3">
            <span>{{ item.rows[4] }}</span>
          </td>
          <td rowspan="3" v-if="item.toRow3 && deviation">
            <span>{{ item.rows[5] }}</span>
          </td>
          <td rowspan="3" v-if="item.toRow3 && relativeDeviation">
            <span>{{ item.rows[6] }}</span>
          </td>
        </tr>
      </table>

      <table class="myTable">
        <tr
          v-for="(item, index) of data.valueData.smallFocus"
          :class="{ delLine: index === 0 }"
        >
          <td rowspan="12" v-if="index === 0 && focus">
            <el-checkbox disabled v-model="data.valueData.smallFocusChecked"
              >小焦点</el-checkbox
            >
          </td>
          <td rowspan="3" v-if="item.toRow3">
            <myInput
              reg="[^0-9./]"
              @change.native="changeNum(index, 'smallFocus', item.getIndex)"
              v-model="item.rows[0]"
              v-if="
                data.valueData.smallFocusChecked &&
                  (item.getIndex == 0 || rxppsy_ys_flag)
              "
            ></myInput>
          </td>
          <td>
            <myInput
              reg="[^0-9./]"
              @change.native="changeNum(index, 'smallFocus', item.getIndex)"
              v-model="item.rows[1]"
              v-if="
                data.valueData.smallFocusChecked &&
                  (item.getIndex == 0 || rxppsy_ys_flag)
              "
            ></myInput>
          </td>
          <td>
            <span>{{ item.rows[2] }}</span>
          </td>
          <td rowspan="3" v-if="item.toRow3">
            <span>{{ item.rows[4] }}</span>
          </td>
          <td rowspan="3" v-if="item.toRow3 && deviation">
            <span>{{ item.rows[5] }}</span>
          </td>
          <td rowspan="3" v-if="item.toRow3 && relativeDeviation">
            <span>{{ item.rows[6] }}</span>
          </td>
        </tr>
      </table>

      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        备注
      </div>
      <div style="border: 1px solid black; border-top: none;">
        <myInput v-model="data.valueData.note"></myInput>
      </div>
    </div>
    <div
      class="___absolute myBtn tc"
      style="width:160px;left:750px;bottom:0"
      @click="dialogVisible = true"
      v-if="target == 0"
    >
      修改预设管电压/备注
    </div>
    <el-dialog
      append-to-body
      title="选择原因"
      :visible.sync="dialogVisible"
      width="700px"
    >
      <el-radio-group v-model="radio">
        <el-radio
          class="mt20"
          v-for="item in radioData"
          :label="item.label"
          :key="item.label + 'label'"
          >{{ item.title }}</el-radio
        >
      </el-radio-group>
      <div class="mt20 tc">
        <el-button round @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" round @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "project_dr_gdyzsdpl",
  data() {
    return {
      content1:
        "验收检测时应分别对大小焦点进行测量，状态检测时只测量大焦点即可，管电压测量60kV、80kV、100kV、120kV或电压接近这些值的档位，管电流应设置为允许的最大管电流的50%或多一些。对于加载条件的选择应结合设备实际情况以用户实际需要为准。校准值=测量值×校准因子（校准因子依计量部门证书按线性内插法求得），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压，相对偏差=（偏差/预设管电压）×100%。",
      content2:
        "校准值=测量值×校准因子（校准因子依计量部门证书按线性内插法求得），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压，相对偏差=（偏差/预设管电压）×100%。",
      content3:
        "将管电压探测器置于支撑台胸壁侧内4cm处X射线束轴上，光野大于测量探头面积。选定管电压，曝光选用的靶/滤过、有无压迫器及附加滤过应与测试仪器相对应，设置约30mAs，进行曝光，读取管电压测量值，每种焦点需要至少测三档（25～32kV）。管电压偏差=管电压测量值-管电压设置值。校准值=测量值×校准因子（校准因子为1），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压。 ",
      content4:
        "将管电压探测器置于支撑台胸壁侧内4cm处X射线束轴上，光野大于测量探头面积。选定管电压，曝光选用的靶/滤过、有无压迫器及附加滤过应与测试仪器相对应，设置约30mAs，进行曝光，读取管电压测量值，对双焦点设备，验收检测时必须测量双焦点，小焦点只测28kV档，大焦点应至少测四档（25～32kV）。状态应至少测四个不同档管电压。管电压偏差=管电压测量值-管电压设置值。校准值=测量值×校准因子（校准因子为1），校准平均值=各校准值之和/测量次数，偏差=校准平均值-预设管电压。 ",
      focus: true,
      deviation: true,
      relativeDeviation: true,
      checked: true,
      bigFocusChecked: true,
      dialogVisible: false,
      radio: 1,
      radioData: [
        {
          label: 1,
          title:
            "该设备无大小焦点之分/该设备大焦点无法曝光/该设备小焦点无法曝光"
        },
        {
          label: 2,
          title: "该设备无 自动下拉单选60/80/100/120 kV电压档，改为相邻电压档"
        },
        {
          label: 3,
          title:
            "该设备最大管电压为自动获取主要参数中的电压kV，无法选择自动下拉单选60/80/100/120kV电压档"
        }
      ],
      detectionObjects: "",
      row0Flag: true,
      type: "",
      rxppsy_ys_flag: true
    };
  },
  props: ["data","ableInput", "jsonString", "target"],
  computed: {
    ...mapState({
      deviceFactor: state => state.StomatologyLinkage.deviceFactor,
      JudgePhotography: state => state.StomatologyLinkage.JudgePhotography
    }),
    mode() {
      return this.jsonString
        .find(item => item.to === "project_jcxcxx")
        .data.valueData.point.map(item => item.exposureMode);
    }
  },
  watch: {
    deviceFactor(val) {
      if (val instanceof Array && val.length > 0) {
        this.data.valueData.factorArr = val;
        this.reset();
      }
    },
    JudgePhotography() {
      this.judge();
    }
  },
  methods: {
    confirm() {
      this.dialogVisible = false;
      this.data.valueData.note = this.radioData[this.radio - 1].title;
    },
    reset() {
      this.data.valueData.bigFocus.forEach((item, index) => {
        this.changeNum(index, "bigFocus", item.getIndex);
        this.changeNum(index, "smallFocus", item.getIndex);
      });
    },
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    changeNum(index, key, getIndex, e) {
      if (this.type == "验收检测" && key == "bigFocus"&&this.data.valueData.bigFocus[index].rows[0]!=='') {
        if (!this.deviation) {
          let n = Number(this.data.valueData.bigFocus[index].rows[0]);
          if ((n < 25 || n > 32) && n !== "") {
            this.$message.error("预设管电压应在25kV-32kV之间");
            return;
          }
        }
      }
      let B = parseFloat(this.data.valueData[key][index].rows[1]);
      if (
        this.isNumber(B) &&
        this.data.valueData.factorArr instanceof Array &&
        this.data.valueData.factorArr.length > 0 &&
        this.isNumber(this.data.valueData[key][getIndex].rows[0])
      ) {
        let C = this.getFactor(B, this.data.valueData.factorArr);
        this.$set(this.data.valueData[key][index].rows, 2, C);
        if (this.isNumber(C)) {
          this.$set(this.data.valueData[key][index].rows, 3, B * C);
        } else {
          this.$set(this.data.valueData[key][index].rows, 3, "");
        }
      } else {
        this.$set(this.data.valueData[key][index].rows, 2, "");
      }
      let num1 = parseFloat(this.data.valueData[key][getIndex].rows[3]);
      let num2 = parseFloat(this.data.valueData[key][getIndex + 1].rows[3]);
      let num3 = parseFloat(this.data.valueData[key][getIndex + 2].rows[3]);

      let val1 = parseFloat(this.data.valueData[key][getIndex].rows[1]);
      let val2 = parseFloat(this.data.valueData[key][getIndex + 1].rows[1]);
      let val3 = parseFloat(this.data.valueData[key][getIndex + 2].rows[1]);
      if (this.isNumber(val1) && this.isNumber(val2) && this.isNumber(val3)) {
        this.$set(
          this.data.valueData[key][getIndex].rows,
          4,
          ((num1 + num2 + num3) / 3).toFixed46(
            this.sizeMin([val1, val2, val3]),
            false,
            true
          )
        );
      } else {
        this.$set(this.data.valueData[key][getIndex].rows, 4, "");
      }

      if (
        this.isNumber(this.data.valueData[key][getIndex].rows[0]) &&
        this.isNumber(this.data.valueData[key][getIndex].rows[4])
      ) {
        let A = parseFloat(this.data.valueData[key][getIndex].rows[0]);
        let E = parseFloat(this.data.valueData[key][getIndex].rows[4]);
        this.$set(
          this.data.valueData[key][getIndex].rows,
          5,
          (E - A).toFixed46(2, false, true)
        );
      } else {
        this.$set(this.data.valueData[key][getIndex].rows, 5, "");
      }

      if (
        this.isNumber(this.data.valueData[key][getIndex].rows[0]) &&
        this.isNumber(this.data.valueData[key][getIndex].rows[5])
      ) {
        let A = parseFloat(this.data.valueData[key][getIndex].rows[0]);
        let F = parseFloat(this.data.valueData[key][getIndex].rows[5]);
        this.$set(
          this.data.valueData[key][getIndex].rows,
          6,
          ((F / A) * 100).toFixed46(2, false, true)
        );
      } else {
        this.$set(this.data.valueData[key][getIndex].rows, 6, "");
      }
    },
    init() {
      let detectionObjects = this.jsonString.find(
        (item, index) => item.to === "project_jbxx"
      ).data.valueData.detectionObjects;
      let focusArr = ["口内牙片机", "牙科全景机", "口腔CT"];
      let deviationArr = ["乳腺DR", "乳腺CR", "乳腺屏片摄影设备"];
      let relativeDeviationArr = [
        "DR",
        "CR",
        "屏片X射线摄影设备",
        "胃肠机",
        "乳腺DR",
        "乳腺CR",
        "乳腺屏片摄影设备"
      ];
      this.focus = !focusArr.includes(detectionObjects);
      this.deviation = !deviationArr.includes(detectionObjects);
      this.relativeDeviation = relativeDeviationArr.includes(detectionObjects);
    },
    getContent(flag) {
      if (flag === 0) {
        return this.getDetailContent();
      } else {
        return this.getDetailContent2();
      }
    },
    getDetailContent() {
      let myarr = this.mode;
      let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
      let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影"];
      let arr3 = ["口腔三维扫描"];
      let arr4 = ["乳腺DR摄影", "乳腺CR摄影", "乳腺屏片摄影"];
      if (this.computeObj.intersect(myarr, arr1).length > 0) {
        return "验收&状态：±5.0%或±5.0kV内，以较大者控制。";
      } else if (this.computeObj.intersect(myarr, arr2).length > 0) {
        return "验收&状态：±10%内。";
      } else if (this.computeObj.intersect(myarr, arr3).length > 0) {
        return "验收&状态：±≤10%。";
      } else if (this.computeObj.intersect(myarr, arr4).length > 0) {
        return "验收&状态：±1.0kV内。";
      } else {
        return "";
      }
    },
    getDetailContent2() {
      let myarr = this.mode;

      let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
      let arr2 = ["口内牙片摄影", "全景扫描", "头颅摄影", "口腔三维扫描"];
      let arr3 = ["乳腺DR摄影", "乳腺CR摄影"];
      let arr4 = ["乳腺屏片摄影"];
      if (this.computeObj.intersect(myarr, arr1).length > 0) {
        return this.content1;
      } else if (this.computeObj.intersect(myarr, arr2).length > 0) {
        return this.content2;
      } else if (this.computeObj.intersect(myarr, arr3).length > 0) {
        return this.content3;
      } else if (this.computeObj.intersect(myarr, arr4).length > 0) {
        return this.content4;
      } else {
        return "";
      }
    },
    judge() {
      // 检测类型
       this.rxppsy_ys_flag = true;
      this.type = this.detectionType(
        this.jsonString.filter(item => item.to == "project_jbxx")[0].data
          .valueData.purposeDetection
      );
      // 检测项目
      let arr = this.jsonString.filter(item => item.to == "project_jcxcxx");
      this.detectionObjects = arr[0].data.valueData.point[0].exposureMode;
      // 大小焦点打钩
      this.$set(this.data.valueData, "bigFocusChecked", true);
      this.$set(this.data.valueData, "smallFocusChecked", true);
      let arr1 = ["DR摄影", "CR摄影", "点片摄影", "屏片摄影"];
      let bigFocus = this.data.valueData.bigFocus;
      let smallFocus = this.data.valueData.smallFocus;
      if (arr1.includes(this.detectionObjects)) {
        // 如果检测对象是DR摄影、CR摄影、屏片摄影、点片摄影。最多会测量四档管电压的结果
        if (this.type == "状态检测") {
          // 如果是状态检测，大焦点需要打钩（可填写检测数据），小焦点不可填检测数据。
          // 大焦点预设80，但是可以由现场检测人员进行修改（修改仅限把电压改成相邻档（对应原因2）），大焦点剩下的三行里必须要填写一行数据， 否者报错（报错文字：未测临床常用其他管电压）
          this.data.valueData.smallFocusChecked = false;
          bigFocus[0].rows[0] = 80;
        } else {
          // 如果是验收检测，大小焦点都需要测量（在系统上即两个都打钩，可以填写检测数据）且大小焦点预设值固定为60/80/100/120
          // 但是可以由现场检测人员进行修改（第一种情况没有大小焦点之分（对应修改原因1），第二种情况是没有60/80/100/120这几档，把电压改成相邻档（对应修改原因2），第三种是最高管电压不到120或者100或者80（对应修改原因3）），修改需要填写原因。
          [...new Set(bigFocus.map(item => item.getIndex))].forEach((a, b) => {
            bigFocus[a].rows[0] = 60 + b * 20;
          });
          [...new Set(smallFocus.map(item => item.getIndex))].forEach(
            (a, b) => {
              smallFocus[a].rows[0] = 60 + b * 20;
            }
          );
        }
      }
      let arr2 = ["乳腺屏片摄影"];
      if (arr2.includes(this.detectionObjects)) {
        // 乳腺屏片摄影。
        if (this.type == "验收检测") {
          // 如果是验收检测，大小焦点都需要测量（即两个都打钩，可填写检测数据）大焦点至少需要测量四档管电压，如果少了一个需要提示报错（报错文字：验收检测大焦点至少需测量四个管电压档）。
          // 小焦点固定测量28kV（系统自动填写28kV），其他三行不能填写数据。
          smallFocus[0].rows[0] = 28;
          this.rxppsy_ys_flag = false;
        }
      }
      let arr3=['乳腺CR','乳腺DR']
      if(arr3.includes(this.detectionObjects)){
        
      }
    }
  },

  mounted() {
    this.init();
    this.$nextTick(() => {
      this.judge();
    });
  }
};
</script>

<style scoped>
</style>
