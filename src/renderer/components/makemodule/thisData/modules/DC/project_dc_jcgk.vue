<template>
  <div>
    <p>{{ data.valueData.correct }}:</p>
    <table class="myTable">
      <tr>
        <td>受检设备名称</td>
        <td>电压</td>
        <td>电流</td>
        <td>有功功率(P)</td>
        <td>无功功率(Q)</td>
      </tr>
      <tr v-for="item in data.valueData.point" style="line-height: 32px;">
        <td>
          <selectModel
            @returnVal="(a) => returnVal(a, item)"
            :Judge="true"
            :special="''"
            v-if="item.showInput"
            :transmitText="item.deviceName"
            :multi-select="false"
            :receive="'deviceName'"
            :single="true"
            :rows="false"
            :list="['主变器', '架空线', '地下线', '自定义']"
            :Obj="''"
          >
          </selectModel>
          <myInput
            @input="(e) => changeInput(e, item)"
            v-else
            v-model="item.deviceName"
          ></myInput>
        </td>
        <td>
          <div style="display:flex">
            <myInput v-model="item.V"></myInput>
            <selectModel
              @returnVal="(a) => returnVal2(a, item, 'Vunit')"
              :Judge="true"
              :special="''"
              :transmitText="item.Vunit"
              :multi-select="false"
              :receive="'Vunit'"
              :single="true"
              :rows="false"
              :list="['kV', 'V']"
              :Obj="''"
            >
            </selectModel>
          </div>
        </td>
        <td>
          <div style="display:flex">
            <myInput v-model="item.I"></myInput>
            <selectModel
              @returnVal="(a) => returnVal2(a, item, 'Iunit')"
              :Judge="true"
              :special="''"
              :transmitText="item.Iunit"
              :multi-select="false"
              :receive="'Iunit'"
              :single="true"
              :rows="false"
              :list="['mA', 'A']"
              :Obj="''"
            >
            </selectModel>
          </div>
        </td>
        <td>
          <div style="display:flex">
            <myInput v-model="item.P"></myInput>
            <selectModel
              @returnVal="(a) => returnVal2(a, item, 'Punit')"
              :Judge="true"
              :special="''"
              :transmitText="item.Punit"
              :multi-select="false"
              :receive="'Punit'"
              :single="true"
              :rows="false"
              :list="['kW', 'W']"
              :Obj="''"
            >
            </selectModel>
          </div>
        </td>
        <td class="___relative">
          <div style="display:flex">
            <myInput v-model="item.Q"></myInput>
            <selectModel
              @returnVal="(a) => returnVal2(a, item, 'Qunit')"
              :Judge="true"
              :special="''"
              :transmitText="item.Qunit"
              :multi-select="false"
              :receive="'Qunit'"
              :single="true"
              :rows="false"
              :list="['kVqr', 'Vqr']"
              :Obj="''"
            >
            </selectModel>
          </div>
          <div
            class="___absolute toolBar"
            style="left: 180px; top: 0; width: 60px"
            v-if="target == 0"
          >
            <div
              title="往指定行后面增加一行"
              class="___absolute tc"
              @click="add(index)"
            >
              +
            </div>
            <div
              title="删除当前行"
              class="___absolute tc"
              style="left: 30px"
              @click="del(index)"
            >
              -
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "target"],
  methods: {
    returnVal(e, item) {
      if (e === "自定义") {
        item.showInput = false;
        item.deviceName = "";
      } else {
        item.deviceName = e;
      }
    },
    returnVal2(e, item, keys) {
      item[keys] = e;
    },
    changeInput(e, item) {
      if (e === "") {
        item.showInput = true;
      }
    },
    add(data) {},
    del() {},
  },
};
</script>
