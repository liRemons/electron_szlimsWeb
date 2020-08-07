<template>
  <div style="line-height: 30px; padding-top: 10px;" class="___relative">
    <div :class="{ eventCover:!ableInput }"></div>
    <div style="text-align: center;">
      <div
        style="border: 1px solid black;font-weight: bolder; text-align: left; padding-left: 15px;"
      >
        信号传递特性（STP）（{{data.valueData.title}}）
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none; line-height: 20px;"
      >
        标准要求
      </div>
      <div style="border: 1px solid black; border-top: none;" class="tl">
        验收：R2≥0.98；状态&稳定性：R2≥0.95。
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        检测及计算方法
      </div>
      <div
        style="border: 1px solid black; border-top: none; padding: 5px; line-height: 20px;"
        class="tl"
      >
        有可能的话取出滤线栅，SID等于或尽量接近180cm，70kV，1mmCu滤过，入射空气比释动能分别选取约1μGy、5μGy、10μGy、20μGy和30μGy，实际检测条件参考曝光参数选择，曝光后，读取每幅影像中心约10cm×10cmROI的平均像素值。进行P和K的拟合计算R2。
      </div>
      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        检测结果
      </div>
      <table class="myTable">
        <tr class="delLine">
          <td>K/μGy</td>
          <td>
            {{ data.valueData.arr1[0] }}
          </td>
          <td>
            {{ data.valueData.arr1[1] }}
          </td>
          <td>
            {{ data.valueData.arr1[2] }}
          </td>
          <td>
            {{ data.valueData.arr1[3] }}
          </td>
          <td>
            {{ data.valueData.arr1[4] }}
          </td>
        </tr>
        <tr>
          <td>P</td>
          <td>
            <myInput v-model="data.valueData.arr2[0]"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.arr2[1]"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.arr2[2]"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.arr2[3]"></myInput>
          </td>
          <td>
            <myInput v-model="data.valueData.arr2[4]"></myInput>
          </td>
        </tr>
      </table>

      <table class="myTable">
        <tr class="delLine">
          <td
            style="width: 100px; text-align: left; padding-left: 15px; padding: 5px;"
            colspan="4"
          >
            拟合公式：P=
            <myInput
              v-model="data.valueData.gs1"
              style="width: 250px; border-bottom: 1px solid black;"
              :disabled="
                data.valueData.noteState !== '其他' ||
                  data.valueData.noteState === ''
              "
            ></myInput
            >R²=
            <myInput
              v-model="data.valueData.gs2"
              style="width: 100px; border-bottom: 1px solid black;"
              :disabled="
                data.valueData.noteState !== '其他' ||
                  data.valueData.noteState === ''
              "
            ></myInput>
          </td>
        </tr>
      </table>

      <div
        style="border: 1px solid black;font-weight: bolder; border-top: none;"
      >
        备注
      </div>
      <div
        style="border: 1px solid black; border-top: none; padding: 15px; text-align: left;"
      >
        <el-radio
          v-model="data.valueData.noteState"
          @click.native.prevent="
            computeObj.clearRadio('线性关系', data.valueData, 'noteState')
          "
          label="线性关系"
        ></el-radio>
        <el-radio
          v-model="data.valueData.noteState"
          @click.native.prevent="
            computeObj.clearRadio('对数关系', data.valueData, 'noteState')
          "
          label="对数关系"
        ></el-radio>
        <el-radio
          v-model="data.valueData.noteState"
          @click.native.prevent="
            computeObj.clearRadio('指数关系', data.valueData, 'noteState')
          "
          label="指数关系"
        ></el-radio>
        <el-radio
          v-model="data.valueData.noteState"
          @click.native.prevent="
            computeObj.clearRadio('其他', data.valueData, 'noteState')
          "
          label="其他"
        ></el-radio>

        <myInput
          v-model="data.valueData.noteOther"
          style="width: 250px; border-bottom: 1px solid black; padding: 0"
          v-if="data.valueData.noteState === '其他'"
        ></myInput>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "project_dr_xhcttx",
  props: ["data","ableInput", "jsonString", "target"],
  computed: {
    tcqData() {
      try {
        return this.jsonString.find(item => item.to === "project_dr_tcq").data
          .valueData;
      } catch (e) {
        return "";
      }
    }
  },
  watch: {
    "data.valueData.noteState": function(val) {
      if (val !== "其他") {
        this.data.valueData.noteOther = "";
      }
      this.option();
    },
    tcqData: {
      deep: true,
      handler: function(valData) {
        try {
          if (this.data.valueData.title == "探测器1") {
            this.data.valueData.arr1[0] = valData.point[0].v6;
            this.data.valueData.arr1[1] = valData.point[1].v6;
            this.data.valueData.arr1[2] = valData.point[2].v6;
            this.data.valueData.arr1[3] = valData.point[3].v6;
            this.data.valueData.arr1[4] = valData.point[4].v6;
          } else {
            this.data.valueData.arr1[0] = valData.point2[0].v6;
            this.data.valueData.arr1[1] = valData.point2[1].v6;
            this.data.valueData.arr1[2] = valData.point2[2].v6;
            this.data.valueData.arr1[3] = valData.point2[3].v6;
            this.data.valueData.arr1[4] = valData.point2[4].v6;
          }

          this.option();

          this.$forceUpdate();
        } catch (e) {}
      }
    },
    "data.valueData.arr2": {
      deep: true,
      handler: function() {
        try {
          this.option();
        } catch (e) {}
      }
    }
  },
  methods: {
    isNumber(val) {
      if (parseFloat(val).toString() == "NaN") {
        return false;
      } else {
        return true;
      }
    },
    option() {
      let arr1 = [...this.data.valueData.arr1];
      let arr2 = [...this.data.valueData.arr2];
      let val = this.data.valueData.noteState;
      if (val === "线性关系") {
        this.lineFitting(arr1, arr2);
      } else if (val === "对数关系") {
        this.logFitting(arr1, arr2);
      } else if (val === "指数关系") {
        this.expFitting(arr1, arr2);
      }
    },
    // 对数的拟合曲线
    logFitting(x, y) {
      this.toNumArr(x, y);
      let yem = 0.0;
      let y1 = 0.0;
      let xem = 0.0;
      let x1 = 0.0;
      let x2 = 0.0;
      let x3 = 0.0;
      let avgx = 0.0;
      let avgy = 0.0;
      let dxy = 0.0;
      let dx2 = 0.0;
      let dy2 = 0.0;
      let y2 = 0.0;

      for (let i = 0; i < y.length; i++) {
        yem += y[i];
      }
      avgy = yem / y.length;
      for (let i = 0; i < y.length; i++) {
        y2 += y[i] - avgy;
      }
      for (let i = 0; i < y.length; i++) {
        y1 += y[i] * Math.log(x[i]);
      }
      for (let i = 0; i < x.length; i++) {
        xem += x[i];
      }
      avgx = xem / x.length;
      for (let i = 0; i < x.length; i++) {
        x1 += Math.log(x[i]);
      }
      for (let i = 0; i < x.length; i++) {
        x2 += Math.log(x[i]) * Math.log(x[i]);
      }
      for (let i = 0; i < x.length; i++) {
        if (i == 0) {
          x3 = Math.log(x[i]);
        } else {
          x3 *= Math.log(x[i]);
        }
      }
      for (let i = 0; i < x.length; i++) {
        dxy += (x[i] - avgx) * (y[i] - avgy);
      }
      for (let i = 0; i < x.length; i++) {
        dx2 += (x[i] - avgx) * (x[i] - avgx);
      }
      for (let i = 0; i < y.length; i++) {
        dy2 += (y[i] - avgy) * (y[i] - avgy);
      }
      let A = (
        (yem - ((x.length * y1 - yem * x1) / (x.length * x2 - x1 * x1)) * x1) /
        x.length
      ).toFixed(4);
      let B = ((x.length * y1 - yem * x1) / (x.length * x2 - x1 * x1)).toFixed(
        4
      );
      let fb = "";
      if (B >= 0) {
        fb = "+" + B + "";
      } else {
        fb = "-" + B;
      }
      let ysum = 0;
      for (let i = 0; i < y.length; i++) {
        ysum += y[i];
      }
      let yavg = ysum / y.length;
      let sss = 0.0;
      for (let i = 0; i < x.length; i++) {
        sss += Math.pow(
          y[i] - (parseFloat(A) + parseFloat(B) * Math.log(x[i])),
          2
        );
      }
      let ssreg = 0.0;
      for (let i = 0; i < x.length; i++) {
        ssreg += (y[i] - yavg) * (y[i] - yavg);
      }
      let R2 = (1 - sss / ssreg).toFixed(4);
      this.data.valueData.gs1 = A + fb + "*lnk";
      this.data.valueData.gs2 = this.isNumber(R2) ? R2 : 0;
    },

    //线性公式y=ax+b
    lineFitting(x, y) {
      //分别为公式，R的平方值
      this.toNumArr(x, y);

      let size = x.length;
      let xmean = 0.0;
      let ymean = 0.0;
      let xNum = 0.0;
      let yNum = 0.0;
      let xyNum = 0;
      let xNum2 = 0;
      let yNum2 = 0;
      let rss = 0;
      let tss = 0;
      let result = [];

      for (let i = 0; i < size; i++) {
        xmean += x[i];
        ymean += y[i];
        xNum2 += x[i] * x[i];
        yNum2 += y[i] * y[i];
        xyNum += x[i] * y[i];
      }
      xNum = xmean;
      yNum = ymean;
      xmean /= size;
      ymean /= size;

      let sumx2 = 0.0;
      let sumxy = 0.0;
      for (let i = 0; i < size; i++) {
        sumx2 += (x[i] - xmean) * (x[i] - xmean);
        sumxy += (y[i] - ymean) * (x[i] - xmean);
      }

      let b = sumxy / sumx2;
      let a = ymean - b * xmean;

      result[0] = a;
      result[1] = b;
      let correlation =
        (xyNum - (xNum * yNum) / size) /
        Math.sqrt(
          (xNum2 - (xNum * xNum) / size) * (yNum2 - (yNum * yNum) / size)
        );

      console.log("相关系数：" + correlation);
      result[2] = correlation;

      for (let i = 0; i < size; i++) {
        rss += (y[i] - (a + b * x[i])) * (y[i] - (a + b * x[i]));
        tss += (y[i] - ymean) * (y[i] - ymean);
      }

      let r2 = 1 - rss / (size - 1 - 1) / (tss / (size - 1));
      result[3] = r2;
      result[4] = x.length;
      result[5] = x.length - 1 - 1;
      let format = result[0].toFixed(4);
      let s = "";
      if (format >= 0) {
        s = " +" + format;
      } else {
        s = " -" + format;
      }
      let xsum = 0;
      for (let i = 0; i < x.length; i++) {
        xsum += x[i];
      }
      let xavg = xsum / x.length; //x的平均值
      let x2 = 0;
      for (let i = 0; i < x.length; i++) {
        x2 += (x[i] - xavg) * (x[i] - xavg);
      }
      let xrange = Math.sqrt(x2 / x.length); //x的标准差

      let ysum = 0;
      for (let i = 0; i < y.length; i++) {
        ysum += y[i];
      }
      let yavg = ysum / y.length; //y的平均值
      let y2 = 0;
      for (let i = 0; i < y.length; i++) {
        y2 += (y[i] - yavg) * (y[i] - yavg);
      }
      let yrange = Math.sqrt(y2 / y.length); //y的标准差

      let ori = 0;
      for (let i = 0; i < x.length; i++) {
        ori += ((x[i] - xavg) / xrange) * ((y[i] - yavg) / yrange);
      }
      let R2 = Math.pow(ori / x.length, 2);
      // console.log("拟合优度R的平方为" + R2.toFixed(4));
      // console.log("公式：" + "y=" + result[1].toFixed(4) + "* X" + s);
      // y=ax+b
      this.data.valueData.gs1 =
        (this.isNumber(result[1].toFixed(4)) ? result[1].toFixed(4) : 0) +
        "* X " +
        (this.isNumber(s) ? s : 0);
      this.data.valueData.gs2 = this.isNumber(R2.toFixed(4))
        ? R2.toFixed(4)
        : 0;
    },

    // 计算指数
    expFitting(x, y) {
      this.toNumArr(x, y);
      let oriY = [];
      for (let i = 0; i < y.length; i++) {
        oriY[i] = y[i];
      }
      let size = x.length;
      let xmean = 0.0;
      let ymean = 0.0;
      let rss = 0;
      let tss = 0;
      let result = [];

      for (let i = 0; i < size; i++) {
        xmean += x[i];
        y[i] = Math.log(y[i]);
        ymean += y[i];
      }
      xmean /= size;
      ymean /= size;

      let sumx2 = 0.0;
      let sumxy = 0.0;
      for (let i = 0; i < size; i++) {
        sumx2 += (x[i] - xmean) * (x[i] - xmean);
        sumxy += (y[i] - ymean) * (x[i] - xmean);
      }

      let b = sumxy / sumx2;
      let a = ymean - b * xmean;

      for (let i = 0; i < size; i++) {
        rss += (y[i] - (a + b * x[i])) * (y[i] - (a + b * x[i]));
        tss += (y[i] - ymean) * (y[i] - ymean);
      }

      let r2 = 1 - rss / (size - 1 - 1) / (tss / (size - 1));

      a = Math.exp(a);
      result[0] = a;
      result[1] = b;
      result[2] = x.length;
      result[3] = x.length - 2;
      result[4] = r2;
      let B = result[1].toFixed(4);
      let A = result[0].toFixed(4);
      let ysum = 0;
      for (let i = 0; i < oriY.length; i++) {
        ysum += oriY[i];
      }
      let yavg = ysum / oriY.length; //y的平均值
      let sss = 0;
      for (let i = 0; i < x.length; i++) {
        sss += Math.pow(oriY[i] - A * Math.exp(B * x[i]), 2);
      }
      let ssreg = 0;
      for (let i = 0; i < x.length; i++) {
        ssreg += (oriY[i] - yavg) * (oriY[i] - yavg);
      }
      let R2 = 1 - sss / ssreg;
      // console.log("拟合优度R的平方为===" + R2.toFixed(4));  //拟合优度
      // console.log("Y=" + A + "*e^(" + B + "*X)");
      this.data.valueData.gs1 =
        (this.isNumber(A) ? A : 0) +
        "*e^(" +
        (this.isNumber(B) ? B : 0) +
        "*X)";
      this.data.valueData.gs2 = this.isNumber(R2.toFixed(4))
        ? R2.toFixed(4)
        : 0;
    },

    toNumArr() {
      [...arguments].forEach(arr => {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Number(arr[i]);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>