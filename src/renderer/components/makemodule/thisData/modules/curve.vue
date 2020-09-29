<template>
  <div id="curveBox">
    <table ref="myt" class="columnName" border="1" cellspacing="0">
      <tr>
        <td>标准物质</td>
        <td>标准值</td>
        <td>国标号(或批号)</td>
        <td>实验室编号</td>
        <td>生产日期</td>
        <td>失效效期</td>
        <td style="width: 104px">基体</td>
      </tr>
      <tr
        v-for="(item, index) in solutionPreparationData.biaoZhunArr"
        :key="index"
      >
        <td width="110">
          <selectModel
            :list="solutionPreparationData.materialList"
            @returnVal="returnVal"
            :Judge="true"
            :transmitText="item.materialName"
            :receive="index"
            :Obj="'materialName'"
            :single="true"
          >
          </selectModel>
        </td>
        <td width="110">
          <divModel :edit="false" v-model="item.standardValue"></divModel>
        </td>
        <td width="110">
          <divModel :edit="false" v-model="item.batchNum"></divModel>
        </td>
        <td width="110">
          <divModel :edit="false" v-model="item.laboratoryNum"></divModel>
        </td>
        <td width="210">
          <divModel :edit="false" v-model="item.productionTime"></divModel>
        </td>
        <td width="210">
          <divModel :edit="false" v-model="item.invalidTime"></divModel>
        </td>
        <td width="210">
          <divModel :edit="false" v-model="item.matrix"></divModel>
        </td>
        <div class="rowOption" @click="addRow(index)">+</div>
        <div class="rowOption" @click="delRow(index)">-</div>
      </tr>
    </table>
    <table>
      <tr class="temperature">
        <td width="40">
          <div class="temperatureName">温度:</div>
        </td>
        <td width="65">
          <div class="temperatureValue">
            <divModel v-model="solutionPreparationData.temperature"></divModel>
          </div>
        </td>
        <td align="left" width="148">
          <div class="temperatureDan">℃</div>
        </td>
        <td width="40">
          <div class="temperatureName">湿度:</div>
        </td>
        <td width="80">
          <div class="temperatureValue">
            <divModel v-model="solutionPreparationData.humidity"></divModel>
          </div>
        </td>
        <td align="left" width="160">
          <div class="temperatureDan">%RH</div>
        </td>
        <td width="60">
          <div class="temperatureName">溶液温度：</div>
        </td>
        <td width="86">
          <div class="temperatureValue">
            <divModel
              v-model="solutionPreparationData.solutionTemperature"
            ></divModel>
          </div>
        </td>
        <td align="left" width="195">
          <div class="temperatureDan">℃</div>
        </td>
      </tr>
    </table>
    <div>
      <table class="checkTable" border="1">
        <tr>
          <td colspan="4">计量器具：</td>
        </tr>
        <tr>
          <td style="width: 100px">
            <input
              index="0"
              type="checkbox"
              class="inp"
              name="category"
              :checked="isSelected(0)"
              value="电子天平"
            />
            电子天平：
          </td>
          <td style="width: 450px">
            <divModel v-model="solutionPreparationData.guiGeArr[0]"></divModel>
          </td>
          <td style="width: 50px">编号:</td>
          <td>
            <divModel
              v-model="solutionPreparationData.biaoHaoArr[0]"
            ></divModel>
          </td>
        </tr>
        <tr>
          <td>
            <input
              index="1"
              type="checkbox"
              class="inp"
              name="category"
              :checked="isSelected(1)"
              value="今日话题"
            />容量瓶：
          </td>
          <td>
            <divModel v-model="solutionPreparationData.guiGeArr[1]"></divModel>
          </td>
          <td>编号:</td>
          <td>
            <divModel
              v-model="solutionPreparationData.biaoHaoArr[1]"
            ></divModel>
          </td>
        </tr>
        <tr>
          <td>
            <input
              index="2"
              type="checkbox"
              class="inp"
              name="category"
              :checked="isSelected(2)"
              value="今日话题"
            />单标吸管：
          </td>
          <td>
            <divModel v-model="solutionPreparationData.guiGeArr[2]"></divModel>
          </td>
          <td>编号:</td>
          <td>
            <divModel
              v-model="solutionPreparationData.biaoHaoArr[2]"
            ></divModel>
          </td>
        </tr>
        <tr>
          <td>
            <input
              index="3"
              type="checkbox"
              class="inp"
              name="category"
              :checked="isSelected(3)"
              value="今日话题"
            />移液管：
          </td>
          <td>
            <divModel v-model="solutionPreparationData.guiGeArr[3]"></divModel>
          </td>
          <td>编号:</td>
          <td>
            <divModel
              v-model="solutionPreparationData.biaoHaoArr[3]"
            ></divModel>
          </td>
        </tr>
        <tr>
          <td>
            <input
              index="4"
              type="checkbox"
              class="inp"
              name="category"
              :checked="isSelected(4)"
              value="今日话题"
            />移液枪：
          </td>
          <td>
            <divModel v-model="solutionPreparationData.guiGeArr[4]"></divModel>
          </td>
          <td>编号:</td>
          <td>
            <divModel
              v-model="solutionPreparationData.biaoHaoArr[4]"
            ></divModel>
          </td>
        </tr>
        <tr>
          <td>
            <input
              index="5"
              type="checkbox"
              class="inp"
              name="category"
              :checked="isSelected(5)"
              value="今日话题"
            />微量进样器：
          </td>
          <td>
            <divModel v-model="solutionPreparationData.guiGeArr[5]"></divModel>
          </td>
          <td>编号:</td>
          <td>
            <divModel
              v-model="solutionPreparationData.biaoHaoArr[5]"
            ></divModel>
          </td>
        </tr>
        <tr>
          <td>
            <input
              index="6"
              type="checkbox"
              class="inp"
              name="category"
              :checked="isSelected(6)"
              value="今日话题"
            />注射器：
          </td>
          <td>
            <divModel v-model="solutionPreparationData.guiGeArr[6]"></divModel>
          </td>
          <td>编号:</td>
          <td>
            <divModel
              v-model="solutionPreparationData.biaoHaoArr[6]"
            ></divModel>
          </td>
        </tr>
      </table>
      <table class="checkTable" border="1">
        <tr>
          <td style="width: 100px">依据标准：</td>
          <td>
            <divModel v-model="solutionPreparationData.standard"></divModel>
          </td>
        </tr>
      </table>
      <table class="biaoZhunTable">
        <tr>
          <td width="110">标准物质</td>
          <td width="140">取用量</td>
          <td width="140">定容体积（mL)</td>
          <td width="173">标准溶液浓度</td>
          <td width="200">标液编号</td>
          <td width="230">有效期</td>
        </tr>
        <tr
          v-for="(item, index) in solutionPreparationData.biaoZhunDownArr"
          :key="index"
        >
          <td>
            <divModel
              :edit="!item.materiaId"
              v-model="item.materialName"
            ></divModel>
          </td>
          <td>
            <divModel v-model="item.Dosage"></divModel>
          </td>
          <td>
            <divModel v-model="item.constantVolume"></divModel>
          </td>
          <td>
            <divModel v-model="item.concentration"></divModel>
          </td>
          <td>
            <divModel v-model="item.numbering"></divModel>
          </td>
          <td>
            <divModel v-model="item.validityPeriod"></divModel>
          </td>
          <div class="rowOption" @click="addRowDown(index)">+</div>
          <div class="rowOption" @click="delRowDwon(index)">-</div>
        </tr>
      </table>
    </div>

    <div
      v-if="solutionPreparationData.biaoZhunArr.length <= 0"
      class="rowOption addRow"
      @dblclick="addRow(0)"
    >
      +
    </div>
    <!-- 提高一行 -->
    <div
      v-if="solutionPreparationData.biaoZhunArr.length <= 0"
      class="rowOption delRow"
      @dblclick="delRow(0)"
    >
      -
    </div>
    <div
      v-if="solutionPreparationData.biaoZhunDownArr.length <= 0"
      class="rowOption addRowDown"
      @dblclick="addRowDown(0)"
    >
      +
    </div>
    <!-- 提高一行 -->
    <div
      v-if="solutionPreparationData.biaoZhunDownArr.length <= 0"
      class="rowOption delRowDown"
      @dblclick="delRowDwon(0)"
    >
      -
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pullDown: [],
      nowPullDown: "",
    };
  },
  props: ["solutionPreparationData"],
  watch: {
    nowPullDown(nowValue) {
      let selectArr = nowValue.split("====");
      this.$emit("selectChange", selectArr);
    },
  },
  methods: {
    isSelected(index) {
      return this.solutionPreparationData.checkBoxArr[index];
    },

    addRow(index) {
      this.solutionPreparationData.biaoZhunArr.splice(index + 1, 0, {});
    },

    delRow(index) {
      if (this.solutionPreparationData.biaoZhunArr.length > 0) {
        this.solutionPreparationData.biaoZhunArr.splice(index, 1);
      } else {
        this.$notify({
          type: "warning",
          message: "没有可删除行",
        });
      }
    },

    addRowDown(index) {
      this.solutionPreparationData.biaoZhunDownArr.splice(index + 1, 0, {});
    },

    delRowDwon(index) {
      if (this.solutionPreparationData.biaoZhunDownArr.length > 0) {
        let deleteMateriaId = this.solutionPreparationData.biaoZhunDownArr[
          index
        ].materiaId;
        let result = this.solutionPreparationData.biaoZhunArr.findIndex(
          (item) => item.id == deleteMateriaId
        );
        if (result == -1) {
          this.solutionPreparationData.biaoZhunDownArr.splice(index, 1);
        } else {
          this.$notify({
            type: "warning",
            message: "该行为自动生成, 无法删除.",
          });
        }
      } else {
        this.$notify({
          type: "warning",
          message: "没有可删除行",
        });
      }
    },

    returnVal(showText, index, special, selectedObj) {
      this.solutionPreparationData.biaoZhunArr[index] = selectedObj;
      this.$forceUpdate();
      let biaoZhunDown = this.solutionPreparationData.biaoZhunDownArr[index];
      if (biaoZhunDown) {
        biaoZhunDown.materialName = selectedObj.materialName;
        biaoZhunDown.materiaId = selectedObj.id;
      } else {
        this.solutionPreparationData.biaoZhunDownArr.splice(index + 1, 0, {
          materialName: selectedObj.materialName,
          materiaId: selectedObj.id,
        });
      }
    },
  },
  mounted: function () {
    let that = this;
    let inp = document.getElementsByClassName("inp");
    for (let i = 0; i < inp.length; i++) {
      inp[i].onclick = function (e) {
        let index = e.target.getAttribute("index");
        let result = e.target.checked;
        that.$emit("selectedBox", { index, result });
      };
    }
  },
  beforeDestroy() {},
};
</script>

<style scoped>
@import "/css/curve.css";
</style>
