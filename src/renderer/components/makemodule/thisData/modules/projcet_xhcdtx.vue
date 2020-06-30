<template>
    <div class="___relative _normalHeight_">
        <div :class="{eventCover:!ableInput}"></div>
        <div class="modules_1_tableBox ___relative mt10">
            <p style="line-height: 16px;">4.10 信号传递特性（STP）</p>
            <p style="line-height: 16px;">4.10.1 标准要求</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                <p class="ml5 tl">验收：R2≥0.98；状态&稳定性：R2≥0.95。</p>
            </div>
            <p style="line-height: 16px;">4.10.2 检测及计算方法</p>
            <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;line-height: 16px;">
                <p class="ml5">有可能的话取出滤线栅，SID等于或尽量接近180cm，70kV，1mmCu滤过，入射空气比释动能分别选取约1μGy、5μGy、<br>10μGy、20μGy和30μGy，实际检测条件参考曝光参数选择，曝光后，读取每幅影像中心约10cm×10cmROI的平均像素<br>值。进行P和K的拟合计算R2。
                </p>
            </div>
            <p style="line-height: 16px;">4.10.3 检测条件、仪器示值与检测结果</p>
            <div class="___relative" v-for="(item,index) in data.valueData.point">
                <el-checkbox v-model="data.valueData.detector" @change="reset()"
                             :label="'探测器'+(index+1)"></el-checkbox>
                <div class="cover" v-if="data.valueData.detector.findIndex((val,num)=>val=='探测器'+(index+1))===-1"></div>
                <div class="___relative ___module_frame_Box" style="border-top: solid 1px black;">
                    <div class="___relative borderBottom" v-for="(val,num) in item.rows">
                        <div class="___relative tc borderRight" style="width: 120px;">
                            <span>{{val[0]}}</span>
                        </div>
                        <div class="___absolute Full t0 tc borderRight" style="width: 120px;left:120px;">
                            <divModel v-model="val[1]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full t0 tc borderRight" style="width: 120px;left:240px;">
                            <divModel v-model="val[2]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full t0 tc borderRight" style="width: 120px;left:360px;">
                            <divModel v-model="val[3]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full t0 tc borderRight" style="width: 120px;left:480px;">
                            <divModel v-model="val[4]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                        <div class="___absolute Full t0 tc right0" style="width: 110px;">
                            <divModel v-model="val[5]" style="width:100%;text-align: center;"
                                      class="Full heightCenter3 hide focusBg"></divModel>
                        </div>
                    </div>
                    <div class="___relative">
                        <span class="ml5">拟合公式:P=</span>
                        <divModel v-model="item.valP" style="width:150px;left:80px;"
                                  class="Full heightCenter3 hide focusBg"
                                  :edit="false"
                                  :is-computer="true"
                                  :computers="changeNum(item,index)"
                                  :computerFormula="'gs11'">
                        </divModel>
                        <span style="margin-left:165px;">R2=</span>
                        <divModel v-model="item.valR2"
                                  style="width:100px;left:270px;"
                                  class="Full heightCenter3 hide focusBg"
                                  :edit="false"
                                  :is-computer="true"
                                  :computers="changeNum(item,index)"
                                  :computerFormula="'gs11'">
                        </divModel>
                        <div @click="getIndex(index)" class="heightCenter3" style="width:110px;left:360px;">
                            <selectModel @returnVal="returnVal" :special="1" :receive="''"
                                         :single="true"
                                         :rows="false"
                                         :factor="true"
                                         :transmitText="item.option"
                                         :Judge="true"
                                         :list="list" :Obj="''"></selectModel>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                index: '',
                list: ['对数的拟合曲线', '线性公式', '计算指数']
            }
        },
        props: ['ipdTemplate', 'pageNumber', 'data', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
        methods: {
            changeNum(item, index) {
                let k = [], p = [];
                this.data.valueData.point[index].rows[0].slice(1).forEach((item) => {
                    if (this.isNumber(item)) {
                        k.push(parseFloat(item))
                    }
                });
                this.data.valueData.point[index].rows[1].slice(1).forEach((item) => {
                    if (this.isNumber(item)) {
                        p.push(parseFloat(item))
                    }
                });
                if (k.length == 5 && p.length == 5) {
                    this.index = index;
                    switch (this.data.valueData.point[index].option) {
                        case "对数的拟合曲线":
                            this.logFitting(k, p);
                            break;
                        case "线性公式":
                            this.lineFitting(k, p);
                            break;
                        case "计算指数":
                            this.expFitting(k, p);
                            break;
                    }
                }
            },
            reset() {
                let obj = {
                    rows: [['K/μGy', '', '', '', '', ''], ['P', '', '', '', '', '']],
                    valP: "",
                    valR2: "",
                    option: "对数的拟合曲线",
                };
                this.data.valueData.point.forEach((item, index) => {
                    let str = '探测器' + (index + 1);
                    if (this.data.valueData.detector.findIndex((val, num) => val == str) == -1) {
                        this.data.valueData.point.splice(index, 1, obj)
                    }
                });
            },
            getIndex(index) {
                this.index = index;
            },
            isNumber(val) {
                if (parseFloat(val).toString() == "NaN") {
                    return false;
                } else {
                    return true;
                }
            },
            returnVal(val, obj, special) {
                if (special == 1) {
                    this.data.valueData.point[this.index].option = val;
                }
                this.changeNum('', this.index);
            },
            // 对数的拟合曲线
            logFitting(x, y) {
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
                    y2 += (y[i] - avgy);
                }
                for (let i = 0; i < y.length; i++) {
                    y1 += y[i] * Math.log(x[i]);
                }
                for (let i = 0; i < x.length; i++) {
                    xem += x[i];
                }
                avgx = (xem) / x.length;
                for (let i = 0; i < x.length; i++) {
                    x1 += Math.log(x[i]);
                }
                for (let i = 0; i < x.length; i++) {
                    x2 += Math.log((x[i])) * Math.log((x[i]));
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
                let A = ((((yem - ((x.length * y1 - yem * x1) / (x.length * x2 - x1 * x1)) * x1))) / x.length).toFixed(4);
                let B = ((x.length * y1 - yem * x1) / (x.length * x2 - x1 * x1)).toFixed(4);
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
                    sss += Math.pow(y[i] - (parseFloat(A) + parseFloat(B) * Math.log(x[i])), 2);
                }
                let ssreg = 0.0;
                for (let i = 0; i < x.length; i++) {
                    ssreg += (y[i] - yavg) * (y[i] - yavg);
                }
                let R2 = (1 - sss / ssreg).toFixed(4);
                this.data.valueData.point[this.index].valP = A + fb + "*lnk";
                this.data.valueData.point[this.index].valR2 = this.isNumber(R2) ? R2 : 0;
            },

            //线性公式y=ax+b
            lineFitting(x, y) { //分别为公式，R的平方值
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
                let correlation = (xyNum - xNum * yNum / size) / Math.sqrt((xNum2 - xNum * xNum / size)
                    * (yNum2 - yNum * yNum / size));

                console.log("相关系数：" + correlation);
                result[2] = correlation;

                for (let i = 0; i < size; i++) {
                    rss += (y[i] - (a + b * x[i])) * (y[i] - (a + b * x[i]));
                    tss += (y[i] - ymean) * (y[i] - ymean);
                }

                let r2 = 1 - (rss / (size - 1 - 1)) / (tss / (size - 1));
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
                let xavg = xsum / x.length;//x的平均值
                let x2 = 0;
                for (let i = 0; i < x.length; i++) {
                    x2 += ((x[i] - xavg) * (x[i] - xavg));
                }
                let xrange = Math.sqrt(x2 / x.length);//x的标准差

                let ysum = 0;
                for (let i = 0; i < y.length; i++) {
                    ysum += y[i];
                }
                let yavg = ysum / y.length;//y的平均值
                let y2 = 0;
                for (let i = 0; i < y.length; i++) {
                    y2 += ((y[i] - yavg) * (y[i] - yavg));
                }
                let yrange = Math.sqrt(y2 / y.length);//y的标准差

                let ori = 0;
                for (let i = 0; i < x.length; i++) {
                    ori += (((x[i] - xavg) / xrange) * ((y[i] - yavg) / yrange));
                }
                let R2 = Math.pow(ori / x.length, 2);
                // console.log("拟合优度R的平方为" + R2.toFixed(4));
                // console.log("公式：" + "y=" + result[1].toFixed(4) + "* X" + s);
                // y=ax+b
                this.data.valueData.point[this.index].valP = (this.isNumber(result[1].toFixed(4)) ? result[1].toFixed(4) : 0) + "* X " + (this.isNumber(s) ? s : 0);
                this.data.valueData.point[this.index].valR2 = this.isNumber(R2.toFixed(4)) ? R2.toFixed(4) : 0;
            },


            // 计算指数
            expFitting(x, y) {
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

                let r2 = 1 - (rss / (size - 1 - 1)) / (tss / (size - 1));

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
                let yavg = ysum / oriY.length;//y的平均值
                let sss = 0;
                for (let i = 0; i < x.length; i++) {
                    sss += Math.pow((oriY[i] - (A * (Math.exp((B * x[i]))))), 2);
                }
                let ssreg = 0;
                for (let i = 0; i < x.length; i++) {
                    ssreg += (oriY[i] - yavg) * (oriY[i] - yavg);
                }
                let R2 = (1 - sss / ssreg);
                // console.log("拟合优度R的平方为===" + R2.toFixed(4));  //拟合优度
                // console.log("Y=" + A + "*e^(" + B + "*X)");
                this.data.valueData.point[this.index].valP = (this.isNumber(A) ? A : 0) + "*e^(" + (this.isNumber(B) ? B : 0) + "*X)";
                this.data.valueData.point[this.index].valR2 = this.isNumber(R2.toFixed(4)) ? R2.toFixed(4) : 0;
            }
        },
        mounted() {

        }
    };
</script>

<style>
    /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
