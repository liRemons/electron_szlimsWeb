<template>
  <div
    class="___relative"
    style="text-align: center;line-height: 30px; padding-top: 10px;"
  >
    <div :class="{ eventCover: target !== '0' }"></div>

    <div>
      <div
        style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 10px;"
      >
        输出量重复性
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        标准要求
      </div>
      <div
        style="border: 1px solid black; border-top: none; line-height: 20px; min-height: 32px;"
        class="tl"
      >
        {{ this.getContent(0) }}
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        检测及计算方法
      </div>
      <div
        style="border: 1px solid black; border-top: none; padding: 5px; min-height: 22px;"
      >
        {{ this.getContent(1) }}
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        检测结果
      </div>
      <div
        style="border: 1px solid black; padding: 5px; text-align: left; padding-left: 15px; border-top: none;"
      >
        检测条件：<redStar></redStar
        ><myInput
          style="width: 80px; border-bottom: 1px solid black; padding: 0"
          v-model="data.valueData.condition1"
          :reg="'[^0-9/]'"
        ></myInput
        >kV， <redStar></redStar
        ><myInput
          style="width: 80px; padding: 0; border-bottom: 1px solid black"
          v-model="data.valueData.condition2"
          :reg="'[^0-9/]'"
        ></myInput
        >mAs
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 160px;">名称</td>
          <td>1<redStar></redStar></td>
          <td>2<redStar></redStar></td>
          <td>3<redStar></redStar></td>
          <td>4<redStar></redStar></td>
          <td>5<redStar></redStar></td>
          <td style="width: 170px;">
            输出量重复性（{{ data.valueData.repeatNum }}%）
          </td>
        </tr>
        <tr>
          <td>
            {{ data.valueData.point[0].name }}
          </td>
          <td>
            <myInput
              :reg="'[^0-9/]'"
              v-model="data.valueData.point[0].v1"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9/]'"
              v-model="data.valueData.point[0].v2"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9/]'"
              v-model="data.valueData.point[0].v3"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9/]'"
              v-model="data.valueData.point[0].v4"
            ></myInput>
          </td>
          <td>
            <myInput
              :reg="'[^0-9/]'"
              v-model="data.valueData.point[0].v5"
            ></myInput>
          </td>
          <td>
            <div>{{ data.valueData.repeatNum2 }}</div>
          </td>
        </tr>
      </table>

      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        备注
      </div>
      <div style="border: 1px solid black;border-top: none;">
        <myInput
          style="text-align: center;"
          v-model="data.valueData.note"
        ></myInput>
      </div>
      <div
        class="___absolute myBtn"
        style="left: 750px; top: 0px; width: 65px;"
        @click="sure"
        v-if="target === '0'"
      >
        完成
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project_dr_sclcfx",
  props: ["data", "jsonString", "target"],
  data() {
    return {
      content1:
        "调节焦点到探测器的距离为100cm，照射野为10cm×10cm，中心线束与台面垂直，调节至无附加滤过，以适当管电流积（如20mAs）照射5次，输出量重复性CV=1/K ̅  √(∑▒(K_i-K ̅ )^2⁄((n-1) ))×100%。",
      content2:
        "将探测器置于靠近限束筒出口的位置，确保探测器位于主射束中心轴并使探测器表面与主射束中心轴垂直。以设备常用成人曝光条件下曝光，连续曝光5次，输出量重复性CV=1/K ̅  √(∑▒(K_i-K ̅ )^2⁄((n-1) ))×100%。  ",
      content3:
        "摘去乳房压迫器，将探测器置于支撑台胸壁侧内4cm处X射线束轴上，探测器有效点位于乳房支撑台上方10cm处。选用28kV，40～80mAs，重复曝光5次，输出量重复性CV=1/K ̅  √(∑▒(K_i-K ̅ )^2⁄((n-1) ))×100%。",
      content4:
        "摘去乳房压迫器，将探测器置于支撑台胸壁侧内4cm处X射线束轴上，探测器有效点位于乳房支撑台上方10cm处。选用28kV，30～50mAs，重复曝光5次，输出量重复性CV=1/K ̅  √(∑▒(K_i-K ̅ )^2⁄((n-1) ))×100%。"
    };
  },
  computed: {
    mode() {
      return this.jsonString
        .find(item => item.to === "project_jcxcxx")
        .data.valueData.point.map(item => item.exposureMode);
    },
    limiArr() {
      if (
        this.mode.indexOf("乳腺CR摄影") !== -1 ||
        this.mode.indexOf("乳腺DR摄影") !== -1
      ) {
        return [40, 80];
      } else if (this.mode.indexOf("乳腺屏片摄影") !== -1) {
        return [30, 50];
      } else {
        return [];
      }
    }
  },
  watch: {
    "data.valueData.point": {
      deep: true,
      handler: function(val) {
        this.setValue1(val);
        this.setValue2(val);
      }
    },
    "data.valueData.condition2": function(newVal) {
      if (this.limiArr.length > 0) {
        if (newVal < this.limiArr[0] || newVal > this.limiArr[1]) {
          this.$notify({
            type: "error",
            message: `该值需在${this.limiArr[0]}-${this.limiArr[1]}之间`
          });
        }
      }
    }
  },
  methods: {
    getContent(flag) {
      if (flag === 0) {
        return this.getDetailContent();
      } else {
        return this.getDetailContent2();
      }
    },
    sure() {
      let myMustWrite = [
        "condition1",
        "condition2",
        ["v1", "v2", "v3", "v4", "v5"]
      ];
      this.computeObj.checkMustWrite(
        this.data.valueData,
        myMustWrite,
        "已完成",
        "有必填字段未填写！"
      );
    },
    getDetailContent() {
      let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
      let arr2 = ["口内牙片摄影"];
      let arr3 = ["乳腺屏片摄影"];
      let arr4 = ["乳腺CR摄影"];
      let arr5 = ["乳腺DR摄影"];
      if (this.computeObj.intersect(this.mode, arr1).length > 0) {
        return "验收&状态&稳定性：≤10%。";
      } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
        return "验收&状态&稳定性：≤5%。";
      } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {
        return "验收&状态&稳定性：≤5%。";
      } else if (this.computeObj.intersect(this.mode, arr4).length > 0) {
        return "验收&状态：＜5%。";
      } else if (this.computeObj.intersect(this.mode, arr5).length > 0) {
        return "验收&状态：≤5%。";
      } else {
        return "";
      }
    },
    getDetailContent2() {
      let arr1 = ["DR摄影", "CR摄影", "屏片摄影", "点片摄影"];
      let arr2 = ["口内牙片摄影"];
      let arr3 = ["乳腺DR摄影", "乳腺CR摄影"];
      let arr4 = ["乳腺屏片摄影"];
      if (this.computeObj.intersect(this.mode, arr1).length > 0) {
        return this.content1;
      } else if (this.computeObj.intersect(this.mode, arr2).length > 0) {
        return this.content2;
      } else if (this.computeObj.intersect(this.mode, arr3).length > 0) {
        return this.content3;
      } else if (this.computeObj.intersect(this.mode, arr4).length > 0) {
        return this.content4;
      } else {
        return "";
      }
    },
    setValue1(val) {
      let sum = this.computeObj.sum(
        val[0].v1,
        val[0].v2,
        val[0].v3,
        val[0].v4,
        val[0].v5
      );
      this.data.valueData.repeatNum = sum / 5;
    },
    setValue2(val) {
      let k1 = this.data.valueData.repeatNum;
      let k2 = this.computeObj.sum(
        val[0].v1,
        val[0].v2,
        val[0].v3,
        val[0].v4,
        val[0].v5
      );
      let n = 5;
      let val1 = 1 / k1;

      let val2Up = (k2 - k1) * (k2 - k1);
      let val2Down = n - 1;

      let val2 = Math.sqrt(val2Up - val2Down);

      let val3 = val1 * val2 * 100;

      this.data.valueData.repeatNum2 = val3.toFixed(3);
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>