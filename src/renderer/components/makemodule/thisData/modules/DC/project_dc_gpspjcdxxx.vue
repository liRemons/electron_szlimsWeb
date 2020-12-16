<template>
  <div>
    <p>{{ data.valueData.correct }}:</p>
    <table class="myTable">
      <tr>
        <td colspan="2">检测设备名称</td>
        <td>主要波源/检测频率</td>
        <td>类型</td>
      </tr>
      <tr v-for="item in data.valueData.point" style="line-height: 32px;">
        <td colspan="2"></td>
        <td></td>
        <td class="___relative">
          <selectModel
            :Judge="true"
            :special="''"
            :transmitText="item.detectionType"
            :multi-select="false"
            :receive="'detectionType'"
            :single="true"
            :rows="false"
            :list="['射频', '工频', '射频+工频']"
            :Obj="''"
          >
          </selectModel>
          <div
            class="___absolute toolBar"
            style="left: 220px; top: 0; width: 60px"
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
  props: ["data",'target'],
  methods: {
    add(){},
    del(){},
  },
};
</script>
