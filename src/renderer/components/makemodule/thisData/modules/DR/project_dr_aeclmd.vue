<template>
  <div style="line-height: 30px; padding-top: 10px;" class="___relative">
    <div :class="{ eventCover:!ableInput }"></div>
    <div>
      <div style="text-align: center;">
        <div
          style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;"
        >
          AEC灵敏度（{{data.valueData.title}}）
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;"
        >
          标准要求
        </div>
        <div style="border: 1px solid black; border-top: none;">
          验收：建立基线值；状态：基线值±25.0%内。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测及计算方法
        </div>
        <div
        class="tl"
          style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;"
        >
          70kV，1mmCu滤过，选择所有的电离室，在AEC条件下曝光，记录mA，s，或mAs或DDI值。偏差=（检测结果-基线值）/基线值×100%。
        </div>
        <div
          style="border: 1px solid black;font-weight: bolder; border-top: none;"
        >
          检测结果
        </div>
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td>SID/cm</td>
          <td style="width: 100px;">滤线栅是否取出</td>
          <td>器官曝光程序</td>
          <td>附加滤过</td>
          <td>检测指标</td>
          <td>检测结果</td>
          <td style="text-align: left; padding-left: 5px; width: 105px;">
            <p v-if="state === '状态检测'">
              <el-radio
                v-model="data.valueData.radioVal"
                @click.native.prevent="
                  computeObj.clearRadio('基线值', data.valueData, 'radioVal')
                "
                label="基线值"
              ></el-radio>
            </p>
            <p>
              <el-radio
                v-model="data.valueData.radioVal"
                @click.native.prevent="
                  computeObj.clearRadio(
                    '建立基线值',
                    data.valueData,
                    'radioVal'
                  )
                "
                label="建立基线值"
              ></el-radio>
            </p>
          </td>
          <td>偏差/%</td>
        </tr>
        <tr>
          <td>
            <myInput v-model="data.valueData.arr2[0]"></myInput>
          </td>
          <td>
            <selectModel
              @returnVal="returnVal"
              :Judge="true"
              :special="2"
              :multi-select="false"
              :receive="'AECNum'"
              :transmitText="data.valueData.arr2[1]"
              :single="true"
              :rows="false"
              :list="['是', '否']"
              :Obj="''"
            >
            </selectModel>
          </td>
          <td>
            <myInput v-model="data.valueData.arr2[2]"></myInput>
          </td>
          <td>
            mmAl
            <br />
            mmCu
          </td>
          <td style="text-align: left; padding-left: 5px;">
            <p>
              <el-radio
                v-model="data.valueData.baseValue"
                @click.native.prevent="
                  computeObj.clearRadio('mA、s', data.valueData, 'baseValue')
                "
                label="mA、s"
              ></el-radio>
            </p>
            <p>
              <el-radio
                v-model="data.valueData.baseValue"
                @click.native.prevent="
                  computeObj.clearRadio('mAs', data.valueData, 'baseValue')
                "
                label="mAs"
              ></el-radio>
            </p>
            <p>
              <el-radio
                v-model="data.valueData.baseValue"
                @click.native.prevent="
                  computeObj.clearRadio('DDI值', data.valueData, 'baseValue')
                "
                label="DDI值"
              ></el-radio>
            </p>
          </td>
          <td>
            <myInput
              v-model="data.valueData.arr2[3]"
              @keyup.native="
                el => {
                  setEValue(el, 0);
                }
              "
            ></myInput>
          </td>
          <td>
            <myInput
              v-model="data.valueData.arr2[4]"
              @keyup.native="
                el => {
                  setEValue(el, 1);
                }
              "
            ></myInput>
          </td>
          <td>
            <div v-if="data.valueData.radioVal === '建立基线值'">/</div>
            <div v-else>{{ data.valueData.arr2[5] }}</div>
          </td>
        </tr>
      </table>

      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none; text-align: center;"
      >
        备注
      </div>
      <div style="border: 1px solid black;border-top: none; text-align: left; ">
        <div>
          <p>
            <el-radio
              v-model="data.valueData.note"
              @click.native.prevent="
                computeObj.clearRadio(
                  '新标准实施后首次检测，建立基线值。',
                  data.valueData,
                  'note'
                )
              "
              :disabled="data.valueData.radioVal === '基线值'"
              label="新标准实施后首次检测，建立基线值。"
            ></el-radio>

            <el-radio
              v-model="data.valueData.note"
              v-if="state === '状态检测'"
              :disabled="data.valueData.radioVal === '基线值'"
              @click.native.prevent="
                computeObj.clearRadio(
                  '无法确认建立基线值的检测条件，建立基线值。',
                  data.valueData,
                  'note'
                )
              "
              label="无法确认建立基线值的检测条件，建立基线值。"
            ></el-radio>
          </p>
        </div>
      </div>
      <div
        class="___absolute myBtn"
        style="left: 750px; top: 0px; width: 65px; text-align: center;"
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
  name: "project_dr_aeclmd",
  props: ["data","ableInput", "jsonString", "target"],
  computed: {
    state() {
      return this.computeObj.judgeState(
        this.jsonString.find(item => item.to === "project_jbxx").data.valueData
          .purposeDetection
      );
    }
  },
  watch: {
    "data.valueData.radioVal": function(val) {
      if (val === "建立基线值") {
        this.data.valueData.arr2[5] = "";
      } else if (val === "基线值") {
        this.data.valueData.note = "";
      }
      this.setEValue("", 2);
    }
  },
  methods: {
    returnVal(nowVal) {
      this.data.valueData.arr2[1] = nowVal;
    },
    sure() {
      if (this.data.valueData.baseValue === "") {
        this.$notify({
          type: "warning",
          message: "检测指标 三个必须选择一个"
        });
      } else {
        if (
          this.state === "状态检测" &&
          this.data.valueData.radioVal === "建立基线值" &&
          this.data.valueData.note === ""
        ) {
          this.$notify({
            type: "warning",
            message: "备注必须二选一"
          });
        } else {
          this.$notify({
            type: "success",
            message: "已完成"
          });
        }
      }
    },
    setEValue(el, flag) {
      if (this.data.valueData.radioVal === "基线值") {
        try {
          let c = "";
          let d = "";
          if (flag === 0) {
            c = el.target.value;
            d = this.data.valueData.arr2[4];
          } else if (flag === 1) {
            c = this.data.valueData.arr2[3];
            d = el.target.value;
          } else if (flag === 2) {
            c = this.data.valueData.arr2[3];
            d = this.data.valueData.arr2[4];
          }
          c = Number(c);
          d = Number(d);
          let e = ((c - d) * 100) / d;
          this.data.valueData.arr2[5] = e.toFixed(2);
        } catch (e) {
          this.data.valueData.arr2[5] = "";
        }
      }
    }
  }
};
</script>

<style scoped>
</style>