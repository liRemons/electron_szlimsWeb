<template>
  <div id="myBox">
    <div class="toggleNowPage">
      <el-radio-group
        v-model="nowPage"
        @change="getNewData"
        style="width: 400px; text-align: left;"
      >
        <el-radio-button label="待审核"></el-radio-button>
        <el-radio-button label="已审核"></el-radio-button>
      </el-radio-group>
    </div>
    <div style="min-height: 70vh;">
      <el-carousel
        trigger="click"
        indicator-position="outside"
        :autoplay="false"
        @change="changeCarousel"
        :initial-index="laboratoryUpload_initialIndex"
      >
        <el-carousel-item :key="1" label="理化">
          <div style="margin-bottom: 10px; height: 66vh; overflow-y: auto;">
            <my-table
              ref="myt"
              style="min-height: 65vh;"
              :data="dataLihua"
              :single="true"
              :title="'理化'"
            ></my-table>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="2" label="放射">
          <div style="margin-bottom: 20px; height: 66vh; overflow-y: auto;">
            <my-table
              :data="dataFangshe"
              style="min-height: 65vh;"
              :title="'放射'"
            ></my-table>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="3" label="微生物">
          <div style="margin-bottom: 20px; height: 66vh; overflow-y: auto;">
            <my-table
              :data="dataWeishenghu"
              style="min-height: 65vh;"
              :title="'微生物'"
            ></my-table>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div style="position: fixed; right: 3vw; top: 90vh;">
      <el-button @click="clearSelected">取消选择</el-button>
      <el-button type="primary" @click="entry">{{
        nowPage === "待审核" ? "审核" : "查看"
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { querySubmittedSample, querySysSampleData } from "@/api/laboratory";
import myTable from "@/views/components/myTable";
import store from "@/store";

export default {
  data() {
    return {
      laboratoryUpload_initialIndex: 0,
      template: [], //检测项目数组
      samplesArr: [],
      dataWeishenghu: [],
      nowPage: "待审核",
      dataFangshe: [],
      dataLihua: [],
      select: [],
      defaultProps: {
        children: "value",
        label: "name"
      }
    };
  },
  components: {
    myTable
  },
  mounted() {
      sessionStorage.getItem('laboratoryUploadTab')
        ? (this.nowPage = sessionStorage.getItem('laboratoryUploadTab'))
        : "";
      this.getNewData(this.nowPage);
      sessionStorage.getItem('laboratoryUpload_initialIndex')
        ? (this.laboratoryUpload_initialIndex = Number(
            sessionStorage.getItem('laboratoryUpload_initialIndex')
          ))
        : "";
  },
  updata() {
    that.$refs["tree"].filter(val);
  },
  methods: {
    changeCarousel(index) {
      sessionStorage.setItem('laboratoryUpload_initialIndex',index) ;
    },
    //获取所有树的数据
    toQuerySubmittedSample(sampleState) {
      querySubmittedSample(sampleState).then(res => {
        if (res.dataWeishenghu) this.dataWeishenghu = res.dataWeishenghu;
        if (res.dataFangshe) this.dataFangshe = res.dataFangshe;
        if (res.dataLihua) this.dataLihua = res.dataLihua;
      });
    },

    selected(nodes) {
      let arr = ["tree", "tree1", "tree2"];
      this.select = [];
      this.template = [];
      for (let j = 0; j < arr.length; j++) {
        if (
          this.$refs[[arr[j]]] &&
          this.$refs[arr[j]].getCheckedNodes().length > 0
        ) {
          let selectedNodes = this.$refs[arr[j]].getCheckedNodes();
          let select = selectedNodes.filter(
            item => item.testProjectId != undefined
          );
          this.select = this.select.concat(select);
          let template = selectedNodes.filter(
            item => item.hasOwnProperty("id") && item.hasOwnProperty("value")
          );
          for (let i = 0; i < template.length; i++) {
            this.template.push(template[i]);
          }
        }
      }
    },
    clearSelected() {
      this.$eventBus.$emit("clearSelect");
    },

    entry() {
      this.template = [];
      let arr = ["dataWeishenghu", "dataFangshe", "dataLihua"];
      for (let i = 0; i < arr.length; i++) {
        this[arr[i]].forEach(item => {
          if (item.isSelected) {
            this.template.push(item);
          }
        });
      }
      if (this.template.length == 0) {
        this.$notify({
          type: "warning",
          message: "请选择分析样品"
        });
      }

      for (let i = 0; i < this.template.length; i++) {
        let id = this.template[i].id;
        let result = this.template.every(item => {
          return id === item.id;
        });
        if (!result) {
          let msg = "请选择相同检测项目";
          this.$notify({
            type: "warning",
            message: msg
          });
          return;
        }
      }

      /*=====================================================*/
      let sampleNums = this.template[0].value.map(item => item.sysSampleId);
    //   let sampleNumsz = [];
    //   this.template.map(item=>{
    //     item.value.map(a=>{
    //       sampleNumsz.push(a.sysSampleId)
    //     })
    //   })
    //  sampleNums=[sampleNumsz[3]]
      querySysSampleData(sampleNums).then(res => {
        if (res.success) {
          store.dispatch("TemplateAction", "update");
          store.dispatch("ChangeHasReviewData", res);
          store.dispatch("UpdateLabTemplate", this.template);
          res.samples.forEach(item => {
            try {
              item.myBlankSample = JSON.parse(item.blankSampleArr);
            } catch (e) {
              item.myBlankSample = [];
            }
          });
          if (this.nowPage === "待审核") {
            sessionStorage.setItem("isSelect", "0");
          } else {
            sessionStorage.setItem("isSelect", "1");
          }
          this.$router.push(`/laboratory/doc-entering/4`);
        } else {
          this.$notify({
            type: "warning",
            message: "获取数据失败!"
          });
        }
      });

      /*======================================================*/
    },
    getNewData(newVal) {
      console.log(newVal);
      sessionStorage.setItem('laboratoryUploadTab',newVal) 
      if (newVal === "待审核") {
        this.$store.dispatch("ClearSelect", true);
        this.toQuerySubmittedSample(4);
      } else {
        this.$store.dispatch("ClearSelect", true);
        this.toQuerySubmittedSample(5);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.toggleNowPage {
  margin-bottom: 15px;
  padding-right: 85vw;
}
</style>
