// 重建层厚偏差
<template>
  <div>
    <div :class="{ _normalHeight_: true }" class="___relative">
      <div :class="{ eventCover: !ableInput }"></div>
      <table class="myTable" style="margin-bottom: 10px">
        <tr class="tl">
          <td colspan="13">
            <span class="ml10">{{
              data.valueData.testProjectChineseName
            }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="13">
            <span class="bold">标准要求</span>
          </td>
        </tr>
        <tr>
          <td colspan="13" style="text-align: left; padding-left: 10px">
            <span>
              验收：±1mm内@s＞2mm、±50%内@2mm≥s≥1mm、±0.5mm内@s＜1mm；
              <br />状态：±1mm内@s＞2mm；
              <br />稳定性：与基线值相差±20%或±1mm内，以较大者控制。
            </span>
          </td>
        </tr>
        <tr>
          <td colspan="13">
            <span class="bold">检测及计算方法</span>
          </td>
        </tr>
        <tr class="tl">
          <td
            colspan="13"
            style="padding-left: 10px; line-height: 20px; text-indent: 2em"
          >
            <span style="white-space: normal"
              >分别选择s＞2mm、2mm≥s≥1mm、和s＜1mm三种层厚，并选择合适的扫描条件扫描Catphan500体模的层厚模块中心，读取图像，调节至最小窗宽，测量最高窗位及背景CT值，调节窗位至半高宽（最高窗位与背景CT值的平均值），分别测量上、下、左、右四条标记物的影像长度，计算公式:测里层厚=标记物影像长度平均值×0.42。对于s>2mm和s
              ＞ 1mm
              的情况，偏差=测里层计算公式:测量层厚=标记物影像长度平均值×0.42。对于s>2mm和s
              ＜ 1mm
              的情况，偏差=测量层厚-标称层厚。对于2mm≥s≥1mm的情况，偏差=(测里层厚-标称层厚)/标称层厚×100%。
            </span>
          </td>
        </tr>
        <tr style="white-space: normal">
          <td rowspan="2" colspan="2">层厚范围</td>
          <td rowspan="2">标称层厚/mm</td>
          <td rowspan="2">最小窗宽</td>
          <td rowspan="2">背景CT 值</td>
          <td rowspan="2">最高窗位</td>
          <td rowspan="2">半高位</td>
          <td colspan="4">标记物影像长度</td>
          <td rowspan="2">测量层厚/mm</td>
          <td rowspan="2">偏差</td>
        </tr>
        <tr>
          <td>上</td>
          <td>下</td>
          <td>左</td>
          <td>右</td>
        </tr>
        <tr
          style="white-space: normal"
          v-for="(item, index) in data.valueData.point"
          :key="index"
        >
          <!-- <td colspan="2">{{ item.scope }}</td> -->
          <td colspan="2">
            <selectModel
              @returnVal="
                (val, name, ModelIndex) =>
                  returnVal(val, name, ModelIndex, index)
              "
              :Judge="true"
              :special="'0'"
              :transmitText="item.scope"
              :multi-select="false"
              :receive="'id'"
              :single="true"
              :rows="false"
              :list="list"
              :Obj="''"
            ></selectModel>
          </td>
          <td>
            <myInput
              :style="{
                color: item.AColor ? 'red' : '#000',
                textAlign: 'center',
              }"
              @change.native="changeNum(item, index, 'A')"
              v-model="item.A"
              :defaultValue="item.A"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              :style="{ color: Number(item.B) > 1 ? 'red' : '#000' }"
              @change.native="changeNum(item, index, 'B')"
              v-model="item.B"
              :defaultValue="item.B"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(item, index, 'E')"
              v-model="item.C"
              :defaultValue="item.C"
            ></myInput>
          </td>
          <td>
            <myInput
              :style="{
                color: Number(item.D) <= Number(item.C) ? 'red' : '#000',
                textAlign: 'center',
              }"
              style="text-align: center"
              @change.native="changeNum(item, index, 'E')"
              v-model="item.D"
              :defaultValue="item.D"
            ></myInput>
          </td>
          <td>{{ item.E }}</td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(item, index, 'J')"
              v-model="item.F"
              :defaultValue="item.F"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(item, index, 'J')"
              v-model="item.G"
              :defaultValue="item.G"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(item, index, 'J')"
              v-model="item.H"
              :defaultValue="item.H"
            ></myInput>
          </td>
          <td>
            <myInput
              style="text-align: center"
              @change.native="changeNum(item, index, 'J')"
              v-model="item.I"
              :defaultValue="item.I"
            ></myInput>
          </td>
          <td>{{ item.J }}</td>
          <td class="___relative">
            {{ item.K }}
            <!--
            <div class="___absolute leftBtn" style="top: 0; right: -100px">
              <div
                class="rowOption"
                style="display: inline-block"
                @click="addRow(index)"
              >
                +
              </div>
              <div
                class="rowOption"
                style="display: inline-block"
                @dblclick="delRow(index)"
              >
                -
              </div>
            </div> -->
          </td>
        </tr>
        <tr>
          <td colspan="13">
            <span class="bold">备注</span>
          </td>
        </tr>
        <tr class="tl">
          <td colspan="13">
            <myInput
              style="text-align: center"
              v-model="data.valueData.remark"
              :defaultValue="data.valueData.remark"
            ></myInput>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showInput: false,
      list: ['s<1mm', '2mm≥s≥1mm', 's＞2mm', '/'],
      copyList: ['s<1mm', '2mm≥s≥1mm', 's＞2mm', '/'],
    }
  },
  watch: {},
  computed: {},
  props: [
    'ipdTemplate',
    'pageNumber',
    'data',
    'thisPageIndex',
    'jsonString',
    'showing',
    'watchSign',
    'isTemplate',
    'ableInput',
    'task',
    'target',
    'deviceData',
  ],
  filters: {},
  methods: {
    addRow(index) {
      if (this.data.valueData.point.length >= 3) {
        this.$message.warning('不能再添加了')
        return
      }
      let scopeArr = this.data.valueData.point.map((item) => item.scope)
      this.$nextTick(() => {
        // let scope = "";
        // if (!scopeArr.includes("s<1mm")) {
        //   scope = "s<1mm";
        // }
        // if (!scopeArr.includes("2mm≥s≥1mm")) {
        //   scope = "2mm≥s≥1mm";
        // }
        // if (!scopeArr.includes("s＞2mm")) {
        //   scope = "s＞2mm";
        // }
        let obj = {
          scope: '/',
          A: '',
          AColor: false,
          B: '',
          C: '',
          D: '',
          E: '',
          F: '',
          G: '',
          H: '',
          I: '',
          J: '',
          K: '',
        }
        this.data.valueData.point.splice(index + 1, 0, obj)
      })
    },
    delRow(index) {
      if (this.data.valueData.point.length > 1) {
        this.data.valueData.point.splice(index, 1)
      } else {
        this.$message.warning('不能再删除了')
      }
    },
    returnVal(val, name, modelIndex, index) {
      setTimeout(() => {
        this.initModel()
      }, 100)
      if (this.data.valueData.point[index].scope)
        Object.keys(this.data.valueData.point[index]).forEach((item) => {
          let data = ['scope', 'AColor', 'index']
          if (item == 'scope') {
            this.data.valueData.point[index].scope = val
          }
          if (!data.includes(item) && val == '/') {
            this.data.valueData.point[index][item] = '/'
          } else if (!data.includes(item) && val !== '/') {
            this.data.valueData.point[index][item] = ''
          }
        })
      this.$forceUpdate()
    },
    noShowInput(el, index) {
      el.target.value = el.target.value.replace(' ', '')
      let val = el.target.value
      this.data.valueData.deviceType = val
      if (val === '') {
        this.showInput = false
      }
      this.$forceUpdate()
    },
    err(msg) {
      this.$notify({
        type: 'error',
        message: msg,
      })
    },
    isNumber(val) {
      if (parseFloat(val).toString() == 'NaN') {
        return false
      } else {
        return true
      }
    },
    changeNum(item, index, num) {
      switch (num) {
        case 'A':
          switch (index) {
            case 0:
              if (Number(item.A) > 1) {
                this.err('层厚应≤1')
                item.AColor = true
              } else {
                item.AColor = false
              }
              break
            case 1:
              if (Number(item.A) < 1 || Number(item.A) > 2) {
                this.err('1≤层厚≤2')
                item.AColor = true
              } else {
                item.AColor = false
              }
              break
            case 2:
              if (Number(item.A) <= 2) {
                this.err('2<层厚')
                item.AColor = true
              } else {
                item.AColor = false
              }
              break

            default:
              break
          }
          break
        case 'B':
          if (Number(item.B) > 1) {
            this.err('层厚应≤1')
          }
          break
        case 'E':
          if (this.isNumber(item.C) && this.isNumber(item.D)) {
            if (item.D <= item.C) {
              this.err('最高窗位必须大于背景CT值')
            }
            item.E = ((Number(item.C) + Number(item.D)) / 2).toFixed46(
              this.size([item.C, item.D])
            )
          }
          break
        case 'J':
          item.J =
            ((Number(item.F) +
              Number(item.G) +
              Number(item.H) +
              Number(item.I)) /
              4) *
            0.42
          item.J = item.J.toFixed46(2)
          let arr = ['s<1mm', 's＞2mm']
          if (arr.includes(item.scope)) {
            item.K = (Number(item.J) - Number(item.A)).toFixed46(2)
          } else {
            item.K =
              (
                ((Number(item.J) - Number(item.A)) / Number(item.A)) *
                100
              ).toFixed46(2) + '%'
          }

          // switch (index) {
          //   case 0:
          //     item.K = (Number(item.J) - Number(item.A)).toFixed46(2);
          //     break;
          //   case 1:
          //     item.K =
          //       (
          //         ((Number(item.J) - Number(item.A)) / Number(item.A)) *
          //         100
          //       ).toFixed46(1) + "%";
          //     break;
          //   case 2:
          //     item.K = (Number(item.J) - Number(item.A)).toFixed46(1);
          //     break;

          //   default:
          //     break;
          // }
          break

        case 'K':
          console.log('走到K了吗', item.K)

          break

        default:
          break
      }
    },
    initModel() {
      let list = this.data.valueData.point.map((item) => item.scope)
      this.list = this.copyList.filter((item) => {
        return !list.includes(item)
      })
      this.list.includes('/') ? '' : this.list.push('/')
    },
  },
  mounted() {
    this.initModel()
  },
}
</script>

<style></style>
