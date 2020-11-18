<template>
  <div class="box">
    <div class="add" style="text-align: left; margin: 10px 0">
      <el-button icon="plus" type="primary" @click="add" size="small"
        >新增配制记录</el-button
      >
    </div>
    <el-card>
      <div style="min-height: 71vh">
        <el-table
          ref="multipleTable"
          :data="curveList"
          style="width: 100%"
          @row-dblclick="editConfig"
          tooltip-effect="dark"
          min-height="71vh;"
          :row-key="getRowKeys"
          :expand-row-keys="expands"
          @expand-change="expandchange"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table
                tooltip-effect="dark"
                :data="props.row.curves"
                style="width: 100%; margin-left: 50px"
                @row-dblclick="
                  (row, col, e) => editCurve(row, col, e, props.row)
                "
              >
                <el-table-column type="index" width="50px;"></el-table-column>
                <el-table-column
                  prop="curveNum"
                  width="200px;"
                  label="曲线编号"
                ></el-table-column>
                <el-table-column
                  prop="regressionEquation"
                  width="300px;"
                  label="回归方程"
                ></el-table-column>
                <el-table-column
                  prop="coefficient"
                  width="300px;"
                  label="相关系数"
                ></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="delCurve(scope.row)"
                      size="small"
                      :disabled="props.row.solutionPass === 1"
                      type="danger"
                      >删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope">{{ scope.row.createtime }}</template>
          </el-table-column>
          <el-table-column
            prop="staffName"
            label="创建人"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="solutionNum"
            label="标准应用液编号"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            prop="solutionPass"
            label="状态"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.solutionPass | filterState }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button
                icon="plus"
                type="primary"
                @click="toShowAddCurve(scope.row)"
                size="small"
                :disabled="
                  forbidCurve(scope.row) || scope.row.solutionPass === 1
                "
                >生成曲线
              </el-button>
              <el-button
                @click="copyConfig(scope.row)"
                size="small"
                type="success"
                >复制</el-button
              >
              <el-button
                @click="delConfig(scope.row)"
                :disabled="scope.row.solutionPass === 1"
                size="small"
                type="danger"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </div>
    </el-card>

    <el-dialog
      :title="getTitle"
      v-if="showAddCurve"
      :visible.sync="showAddCurve"
      size="tiny"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form
        :inline="true"
        :rules="rules"
        ref="materialTable"
        :model="addCurve"
        :label-position="'right'"
        label-width="120px"
      >
        <el-row>
          <el-col :span="10">
            <el-form-item label="曲线记录编号:" prop="curveNum">
              <el-input
                v-model="addCurve.curveNum"
                placeholder="曲线记录编号"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="标准物质:" prop="materialId">
              <el-select
                multiple
                v-model="addCurve.materialId"
                @change="changeMaterial"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in materialList"
                  :label="item.materialName"
                  :key="index"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- <div class="addBut">
          <el-button @click="addBiaoZhunArr">新增标准系列</el-button>
        </div> -->
        <el-row v-for="(item, index) in addCurve.series" :key="index">
          <el-col :offset="4" :span="8" v-if="item.response != response">
            <el-input
              disabled
              v-model="item.testProject"
              @input="
                item.testProject = item.testProject.replace(/[^\d.]/g, '')
              "
            ></el-input>
          </el-col>
          <el-col :span="8" v-if="item.response != response">
            <el-input v-model="item.response"></el-input>
          </el-col>
          <el-col :span="2" v-if="item.response != response">
            <!-- <el-button type="danger" @click="delBiaoZhunArr(index)"
              >删除</el-button
            > -->
          </el-col>
          <el-col :offset="4" :span="8" v-if="item.response == response">
            <el-input
              v-model="item.testProject"
              placeholder="请输入检测项目名称"
            ></el-input>
          </el-col>
          <el-col :span="8" v-if="item.response == response">
            <el-input
              v-model="item.response"
              :disabled="true"
              placeholder="响应值"
            ></el-input>
          </el-col>
        </el-row>
        <el-button type="primary" style="margin: 20px 0" @click="generate"
          >生成</el-button
        >
        <el-row>
          <el-col :pull="3" style="margin-left: 22px">
            <el-form-item label="回归方程:" prop="regressionEquationValue1">
              Y=(
              <el-input
                style="width: 240px"
                @input="
                  addCurve.regressionEquationValue1 = addCurve.regressionEquationValue1.replace(
                    /[^\d.]/g,
                    ''
                  )
                "
                v-model="addCurve.regressionEquationValue1"
              >
              </el-input>
              )*X
            </el-form-item>
            <el-form-item prop="regressionEquationValue2">
              <el-select
                v-model="addCurve.regressionEquationValue2"
                style="width: 100px"
              >
                <el-option
                  v-for="(item, index) in operation"
                  :label="item"
                  :key="index"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="regressionEquationValue3">
              <el-input
                style="width: 240px"
                @input="
                  addCurve.regressionEquationValue3 = addCurve.regressionEquationValue3.replace(
                    /[^\d.]/g,
                    ''
                  )
                "
                v-model="addCurve.regressionEquationValue3"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="相关系数:" prop="coefficient">
              <el-input
                v-model="addCurve.coefficient"
                @input="
                  addCurve.coefficient = addCurve.coefficient.replace(
                    /[^\d.]/g,
                    ''
                  )
                "
                placeholder="相关系数"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddCurve = false">取消</el-button>
        <el-button v-if="isAdd" type="primary" @click="toAddCurve"
          >新增</el-button
        >
        <el-button v-else type="primary" @click="toEditCurve">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCurveList } from "@/api/laboratory";
import { addForCurve } from "@/api/laboratory";
import {
  queryAllMaterial,
  deleteSolution,
  deleteCurve,
} from "@/api/laboratory";
import { updateCurve } from "@/api/laboratory";
import { getToken } from "@/utils/auth";

export default {
  data() {
    return {
      curveCbyndPoint: "",
      expands: [],
      pageIndex: 1,
      pageSize: 10,
      count: 0,
      curveList: [],
      showAddCurve: false,
      isAdd: true,
      rowData: "",
      testProject: "",
      response: "响应值",
      materialList: [],
      operation: ["+", "-"],
      addCurve: {
        curveNum: "",
        materialId: "",
        coefficient: "",
        regressionEquationValue1: "",
        regressionEquationValue2: "",
        regressionEquationValue3: "",
        series: [
          {
            testProject: "",
            response: "响应值",
          },
          {
            testProject: "",
            response: "",
          },
        ],
      },
      rules: {
        curveNum: [
          { required: true, message: "请输入曲线记录编号", trigger: "blur" },
        ],
        materialId: [
          { required: true, message: "请输入标准物质", trigger: "change" },
        ],
        regressionEquationValue1: [
          { required: true, message: "请输入回归方程", trigger: "blur" },
        ],
        regressionEquationValue2: [
          { required: true, message: "请选择运算符", trigger: "change" },
        ],
        regressionEquationValue3: [
          { required: true, message: "请输入回归方程", trigger: "blur" },
        ],
        coefficient: [
          { required: true, message: "请输入计算公式", trigger: "blur" },
        ],
      },
    };
  },
  filters: {
    filterState(index) {
      let arr = ["未审核", "已审核"];
      return arr[index];
    },
  },
  computed: {
    getTitle() {
      if (this.isAdd) {
        return "新增曲线";
      } else {
        return "修改曲线";
      }
    },
  },
  methods: {
    changeMaterial(val) {
      let point = [];
      this.curveCbyndPoint.forEach((item) => {
        val.forEach((a) => {
          if (item.id === a) {
            point.push(item.rows);
          }
        });
      });

      let rows = [];
      function isBlank(val) {
        if (val == null || val == "") {
          return true;
        }
      }
      // 保存结果的数组
      let result = [];
      // 遍历json
      for (let key in point) {
        // 遍历数组的每一项
        point[key].forEach((value, index) => {
          if (isBlank(result[index])) {
            result[index] = 0;
          }
          result[index] = (result[index] + Number(value)).toFixed46(3);
        });
      }
      let series0 = JSON.parse(JSON.stringify(this.addCurve.series[0]));
      this.addCurve.series = [];
      result.forEach((item) => {
        this.addCurve.series.push({
          testProject: item,
          response: "",
        });
      });
      this.addCurve.series.unshift(series0);
    },
    getRowKeys(row) {
      return row.id;
    },
    expandchange(row, expandedRows) {
      let arr = [];
      expandedRows.map((item) => {
        arr.push(item.id);
      });
      this.expands = arr;
    },
    //曲线列表
    add() {
      let content = [
        "curve_head",
        "curve_mid",
        "curve_foot",
        "curve_cby",
        "curve_cbynd",
      ];
      this.$router.push(`/laboratory/doc-entering/5`);
      sessionStorage.setItem("templateContent", JSON.stringify(content));
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    editConfig(row) {
      sessionStorage.setItem(
        "newSolutionPreparationData",
        row.solutionPreparationData
      );
      this.$router.push({
        path: "/laboratory/doc-entering/5",
        query: {
          isEdit: true,
          solutionId: row.id,
          solutionPass: row.solutionPass,
          solutionNum: row.solutionNum,
        },
      });
    },

    copyConfig(row) {
      sessionStorage.setItem(
        "newSolutionPreparationData",
        row.solutionPreparationData
      );
      this.$router.push({
        path: "/laboratory/doc-entering/5",
        query: {
          isEdit: true,
          solutionId: row.id,
          copy: true,
          solutionPass: 0,
        },
      });
    },

    delCurve(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCurve(row.id).then((res) => {
            if (res.success) {
              this.$notify({
                type: "success",
                message: res.msg,
              });
              this.getList();
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {});
    },

    getList() {
      getCurveList(this.pageIndex, this.pageSize).then((res) => {
        if (res.success) {
          this.curveList = res.datas;
          this.count = res.total;
        } else {
          this.$notify({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    //显示新增曲线
    toShowAddCurve(row) {
      this.rowData = row;
      this.curveCbyndPoint = JSON.myParse(row.materialArr);
      let curvesMaterialId = row.curves
        .map((item) => item.materialId.split(","))
        .flat();
      this.materialList = this.curveCbyndPoint.filter(
        (item) => !curvesMaterialId.includes(item.id)
      );
      this.addCurve = {
        curveNum: "",
        materialId: "",
        coefficient: "",
        regressionEquationValue1: "",
        regressionEquationValue2: "",
        regressionEquationValue3: "",
        series: [
          {
            testProject: "",
            response: "响应值",
          },
          {
            testProject: "",
            response: "",
          },
        ],
      };
      this.isAdd = true;
      this.showAddCurve = true;
    },

    delConfig(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteSolution(row.id).then((res) => {
            if (res.success) {
              this.$notify({
                type: "success",
                message: res.msg,
              });
              this.getList();
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          });
        })
        .catch(() => {});
    },

    forbidCurve(row) {
      row.materialArr = row.materialArr.replace(/[\r\n]/g, "");
      let materialArr = JSON.myParse(row.materialArr);
      let curves = row.curves;
      if (materialArr.length === curves.length) {
        return true;
      } else {
        return false;
      }
    },

    addBiaoZhunArr() {
      let series = this.addCurve.series;
      series.push({
        testProject: "",
        response: "",
      });
    },

    delBiaoZhunArr(index) {
      this.addCurve.series.splice(index, 1);
    },
    toAddCurve() {
      let addCurve = this.addCurve;
      this.$refs["materialTable"].validate((valid) => {
        if (valid) {
          addForCurve(
            addCurve.curveNum,
            addCurve.materialId,
            this.regressionEquation(),
            addCurve.coefficient,
            JSON.stringify(this.addCurve.series),
            addCurve.regressionEquationValue1,
            addCurve.regressionEquationValue2,
            addCurve.regressionEquationValue3,
            this.rowData.id
          ).then((res) => {
            if (res.success) {
              this.$notify({
                type: "success",
                message: res.msg,
              });
              this.showAddCurve = false;
              this.getList();
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          });
        } else {
          this.$notify({
            type: "warning",
            message: "有必填项未填",
          });
          return false;
        }
      });
    },
    editCurve(row, col, e, propsRow) {
      this.curveCbyndPoint = JSON.myParse(propsRow.materialArr);
      let CurvesMaterialId = propsRow.curves
        .map((item) => (item.id !== row.id ? item.materialId.split(",") : ""))
        .flat()
        .filter((item) => item);
      this.materialList = this.curveCbyndPoint.filter(
        (item) => !CurvesMaterialId.includes(item.id)
      );
      let materialIdArr = row.materialId.split(",");
      this.addCurve.materialId = materialIdArr;
      this.isAdd = false;
      this.showAddCurve = true;
      this.changeMaterial(materialIdArr);
      this.addCurve.series = JSON.parse(row.series);

      let arr = [
        "regressionEquation",
        "regressionEquationValue1",
        "regressionEquationValue3",
        "coefficient",
        "materialName",
        "curveNum",
        "id",
      ];
      arr.forEach((item) => {
        this.addCurve[item] = row[item];
      });
      this.addCurve.regressionEquationValue2 = row.regressionEquationValue2.split(
        row.regressionEquationValue3
      )[0];
    },
    toEditCurve() {
      let addCurve = this.addCurve;
      this.$refs["materialTable"].validate((valid) => {
        if (valid) {
          updateCurve(
            addCurve.id,
            addCurve.curveNum,
            addCurve.materialId,
            this.regressionEquation(),
            addCurve.coefficient,
            JSON.stringify(this.addCurve.series),
            addCurve.regressionEquationValue1,
            addCurve.regressionEquationValue2,
            addCurve.regressionEquationValue3
          ).then((res) => {
            if (res.success) {
              this.$notify({
                type: "success",
                message: res.msg,
              });
              this.showAddCurve = false;
              this.getList();
            } else {
              this.$notify({
                type: "error",
                message: res.msg,
              });
            }
          });
        } else {
          this.$notify({
            type: "warning",
            message: "有必填项未填",
          });
        }
      });
    },

    toStringify2(arr) {
      let myArr = [];
      for (let j = 0; j < arr.length; j++) {
        let obj = arr[j];
        for (let i in obj) {
          let name = i + "";
          let key = arr[i] + "";
        }
      }
    },
    regressionEquation() {
      if (
        this.addCurve.regressionEquationValue2 === "+" &&
        (this.addCurve.regressionEquationValue3.includes("-") ||
          this.addCurve.regressionEquationValue3.includes("+"))
      ) {
        return `Y=${this.addCurve.regressionEquationValue1}*X${this.addCurve.regressionEquationValue3}`;
      } else {
        return `Y=${this.addCurve.regressionEquationValue1}*X${this.addCurve.regressionEquationValue2}${this.addCurve.regressionEquationValue3}`;
      }
    },
    // 以下为公式————————————————————————————————————————————
    // 对数的拟合曲线
    logFitting(x, y) {
      let yem = 0.0,
        y1 = 0.0,
        xem = 0.0,
        x1 = 0.0,
        x2 = 0.0,
        x3 = 0.0,
        avgx = 0.0,
        avgy = 0.0,
        dxy = 0.0,
        dx2 = 0.0,
        dy2 = 0.0,
        y2 = 0.0;

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
      let R2 = parseFloat((1 - sss / ssreg).toFixed(4));
      return [
        this.isNumber(R2.toFixed46(4)) ? R2.toFixed46(4) : 0,
        A + fb + "*lnX",
        A,
        fb,
      ];
    },
    //线性公式y=ax+b
    lineFitting(x, y) {
      //分别为公式，R的平方值
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
      if (format > 0) {
        s = "+" + format;
      } else {
        s = format;
      }
      this.addCurve.regressionEquationValue3 = format;
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
      R2 = this.isNumber(R2.toFixed46(4)) ? R2.toFixed46(4) : 0;
      let A = this.isNumber(result[1].toFixed46(4))
        ? result[1].toFixed46(4)
        : 0;
      let B = this.isNumber(parseFloat(s)) ? s : 0;
      return [R2, A + "* X" + (B !== 0 ? B : ""), A, B];
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
      // R2 = this.isNumber(R2.toFixed46(4)) ? R2.toFixed46(4) : 0;
      R2 = this.isNumber(R2.toFixed(4)) ? R2.toFixed(4) : 0;
      let valA = this.isNumber(parseFloat(A)) ? A : 0;
      let valB = this.isNumber(parseFloat(B)) ? B : 0;
      return [R2, valA + "*e^(" + valB + "*X)", valA, valB];
    },
    generate() {
      let arr = JSON.parse(JSON.stringify(this.addCurve.series));
      arr.map((item, index) => {
        if (item.response == "响应值") {
          arr.splice(index, 1);
        }
      });
      let KcontentArr = arr.map((item) => Number(item.testProject));
      let absorbanceNewArr = arr.map((item) => Number(item.response));

      let Kcontent = this.JudgeNum(KcontentArr);
      let absorbanceArr = this.JudgeNum(absorbanceNewArr);
      let logFitting = this.logFitting(Kcontent, absorbanceArr);
      let lineFitting = this.lineFitting(Kcontent, absorbanceArr);
      let expFitting = this.expFitting(Kcontent, absorbanceArr);
      let finttIngArr = [logFitting, lineFitting, expFitting];
      let index = "";
      let a = Math.max(...finttIngArr.map((item) => item[0]));
      index = finttIngArr.findIndex((item, index) => item[0] === a);
      let b = finttIngArr[index][1];
      this.addCurve.coefficient = Math.sqrt(finttIngArr[index][0]).toFixed46(4);
      this.addCurve.regressionEquationValue1 = finttIngArr[index][2];
      this.addCurve.regressionEquationValue2 = finttIngArr[index][3].split(
        `${this.addCurve.regressionEquationValue2}`
      )[0];
    },
    // 公式结束——————————————————————————————
  },
  mounted() {
    this.getList();
    this.toStringify2([
      { name: 1, age: 2 },
      { name: 3, age: 4 },
    ]);
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.add {
  margin-bottom: 10px;
}

.seriesTitle {
  margin-bottom: 10px;
}

.addBut {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
