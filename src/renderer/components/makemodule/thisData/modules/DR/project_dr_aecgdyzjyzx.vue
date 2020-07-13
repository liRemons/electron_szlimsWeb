<template>
  <div style="line-height: 30px; padding-top: 10px;" class="___relative">
    <div :class="{ eventCover: target !== '0' }"></div>
    <div>
      <div style="text-align: center;">
        <div
          style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;"
        >
          AEC管电压之间一致性（探测器1）
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;"
        >
          标准要求
        </div>
        <div style="border: 1px solid black; border-top: none;" class="tl">
          验收：建立基线值；状态：±25.0%内。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测及计算方法
        </div>
        <div
          style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;"
        >
          1mmCu滤过，有可能的话在无滤线栅无床面衰减条件下，分别设置70kV、80kV、90kV和100kV，在AEC条件下曝光，分别测量4个电压档的影像探测器表面入射空气比释动能，记录剂量值或DDI值，并计算平均值。偏差=（平均值-基线值）/基线值×100%。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测结果
        </div>
        <div style="border: 1px solid black; border-top: none; padding: 5px;">
          滤线栅是否取出
          <el-radio
            label="是"
            v-model="data.valueData.arr[0]"
            @click.native.prevent="
              computeObj.clearRadio('是', data.valueData.arr, 0)
            "
            style="width: 20px; margin-left: 10px;"
          ></el-radio>
          <el-radio
            label="否"
            v-model="data.valueData.arr[0]"
            @click.native.prevent="
              computeObj.clearRadio('否', data.valueData.arr, 0)
            "
            style="width: 20px;"
          ></el-radio
          >，SID=
          <myInput
            style="width: 60px; border-bottom: 1px solid black; padding: 0"
            v-model="data.valueData.arr[1]"
          ></myInput
          >cm， 器官曝光程序<myInput
            style="width: 60px; border-bottom: 1px solid black; padding: 0"
            v-model="data.valueData.arr[2]"
          ></myInput
          >，附加滤过<myInput
            style="width: 60px; border-bottom: 1px solid black; padding: 0"
            v-model="data.valueData.arr[3]"
          ></myInput
          >。
        </div>
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td style="width: 140px;">检测指标</td>
          <td>70kV</td>
          <td>80kV</td>
          <td>90kV</td>
          <td>100kV</td>
          <td>平均值</td>
          <td style="width: 160px;">基线值</td>
          <td>偏差/%</td>
        </tr>
        <tr>
          <td style="text-align: left; padding: 20px;">
            <p>
              <el-radio
                v-model="data.valueData.point[0].v1"
                @click.native.prevent="
                  computeObj.clearRadio(
                    '剂量值/μGy',
                    data.valueData.point[0],
                    'v1'
                  )
                "
                label="剂量值/μGy"
              ></el-radio>
            </p>
            <p>
              <el-radio
                v-model="data.valueData.point[0].v1"
                @click.native.prevent="
                  computeObj.clearRadio('DDI值', data.valueData.point[0], 'v1')
                "
                label="DDI值"
              ></el-radio>
            </p>
          </td>
          <td>
            <myInput v-model="data.valueData.point[0].v2"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.point[0].v3"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.point[0].v4"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.point[0].v5"></myInput>
          </td>
          <td>
            {{ data.valueData.point[0].v6 }}
          </td>
          <td style="text-align: left; padding-left: 10px;">
            <p>
              <el-radio
                v-model="data.valueData.point[0].v7"
                @click.native.prevent="
                  computeObj.clearRadio(
                    '建立基线值',
                    data.valueData.point[0],
                    'v7'
                  )
                "
                label="建立基线值"
              ></el-radio>
            </p>
            <p>
              <el-radio
              v-if="state=='状态检测'"
                v-model="data.valueData.point[0].v7"
                @click.native.prevent="
                  computeObj.clearRadio(
                    '基线值=',
                    data.valueData.point[0],
                    'v7'
                  )
                "
                label="基线值="
                style="width: 50px;"
              ></el-radio>
              <myInput
                v-if="data.valueData.point[0].v7 === '基线值='"
                style="border-bottom: 1px solid black; width: 65px;"
                v-model="data.valueData.point[0].v9"
              >
              </myInput>
            </p>
          </td>
          <td>
            <div v-if="data.valueData.point[0].v7 === '建立基线值'">
              /
            </div>
            <div v-else>
              {{ data.valueData.point[0].v8 }}
            </div>
          </td>
        </tr>
      </table>

      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none; text-align: center;"
      >
        备注
      </div>
      <div style="border: 1px solid black;border-top: none;">
        <el-radio
          v-model="data.valueData.note"
          label="新标准实施后首次检测，建立基线值。"
          >新标准实施后首次检测，建立基线值。</el-radio
        >
        <el-radio
          v-model="data.valueData.note"
          label="无法确认建立基线值的检测条件，建立基线值。"
          >无法确认建立基线值的检测条件，建立基线值。</el-radio
        >
        <!-- <myInput
          v-model="data.valueData.note"
          style="text-align: center;"
        ></myInput> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project_dr_aecgdyzjyzx",
  props: ["data", "jsonString", "target"],
  watch: {
    "data.valueData.point": {
      deep: true,
      handler: function(arr) {
        let item = arr[0];
        let avg = this.computeObj.sum(item.v2, item.v3, item.v4, item.v5) / 4;
        this.data.valueData.point[0].v6 = avg.toFixed(2);

        if (this.data.valueData.point[0].v7 === "建立基线值") {
          this.data.valueData.point[0].v9 = "";
        } else if (this.data.valueData.point[0].v7 === "基线值=") {
          let e = this.data.valueData.point[0].v6;
          let f = this.data.valueData.point[0].v9;
          let g = (((e - f) * 100) / f).toFixed(2);
          this.data.valueData.point[0].v8 = g;
        }
      }
    }
  },
  computed: {
    state() {
      return this.detectionType(
        this.jsonString.find(item => item.to === "project_jbxx").data.valueData
          .purposeDetection
      );
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>