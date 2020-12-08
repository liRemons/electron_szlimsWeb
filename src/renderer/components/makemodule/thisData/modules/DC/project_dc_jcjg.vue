<template>
  <div>
    <table class="myTable">
      <tr>
        <td colspan="14">检测结果</td>
      </tr>
      <tr>
        <td rowspan="2">序号</td>
        <td colspan="2" rowspan="2">检测点位</td>
        <td colspan="2" rowspan="2">检测参数</td>
        <td colspan="5">检测数据</td>
        <td colspan="2" rowspan="2">RMS<br />平均值</td>
        <td colspan="2" rowspan="2">功率密度 <br />(μW/cm2)</td>
      </tr>
      <tr>
        <td>n1</td>
        <td>n2</td>
        <td>n3</td>
        <td>n4</td>
        <td>n5</td>
      </tr>
      <template v-for="item in 3">
        <tr>
          <td rowspan="2"></td>
          <td rowspan="2" colspan="2"></td>
          <td colspan="2"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td rowspan="2" colspan="2"></td>
          <td rowspan="2" colspan="2"></td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </table>
  </div>
</template>