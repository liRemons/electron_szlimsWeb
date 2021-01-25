<template>
  <div>
   <div style="text-align: left;padding:10px">
      <el-radio-group v-model="radio" @change="changeRadio">
      <el-radio-button :label="1">未接样</el-radio-button>
      <el-radio-button :label="7">已接样</el-radio-button>
    </el-radio-group>
   </div>
    <div>
      <el-carousel
        trigger="click"
        indicator-position="outside"
        :autoplay="false"
        style="height: 100%"
      >
        <el-carousel-item :key="1" label="理化" >
          <div style="margin-bottom: 10px; height: 100%; overflow-y: auto">
            <my-table
              ref="myt"
              :data="dataLihua"
              style="min-height: 65vh"
              :title="'理化'"
              @toQuerySubmittedSample="toQuerySubmittedSample"
            ></my-table>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="2" label="放射">
          <div style="margin-bottom: 20px; height: 100%; overflow-y: auto">
            <my-table
              :data="dataFangshe"
              style="min-height: 65vh"
              :title="'放射'"
              @toQuerySubmittedSample="toQuerySubmittedSample"
            ></my-table>
          </div>
        </el-carousel-item>
        <el-carousel-item :key="3" label="微生物">
          <div style="margin-bottom: 20px; height: 100%; overflow-y: auto">
            <my-table
              :data="dataWeishenghu"
              style="min-height: 65vh"
              :title="'微生物'"
              @toQuerySubmittedSample="toQuerySubmittedSample"
            ></my-table>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div style="position: fixed; right: 3vw; top: 90vh; z-index: 2001">
      <el-button @click="clearSelected">取消选择</el-button>
      <!-- <el-button type="danger" @click="cancelSamples">退样</el-button> -->
      <el-button type="primary" @click="entry" :disabled="radio==7">接样</el-button>
    </div>
  </div>
</template>

<script>
import {
  querySubmittedSample,
  updateSampleStateReason,
} from "@/api/laboratory";
import { receiveSample } from "@/api/laboratory";
import { getToken } from "@/utils/auth";
import myTable from "@/views/components/myTable";

export default {
  data() {
    return {
      radio: 1,
      template: [], //检测项目数组
      samplesArr: [],
      dataFangshe: [],
      dataWeishenghu: [],
      dataLihua: [],
      select: [],
      tab: "",
      defaultProps: {
        children: "value",
        label: "name",
      },
    };
  },
  mounted() {
    this.toQuerySubmittedSample();
  },
  components: {
    myTable,
  },
  methods: {
    changeRadio(data){
     this.toQuerySubmittedSample()
    },
    //接样
    entry() {
      let ids = this.getIds();
      if (ids.length <= 0) return;

      let labPickSampleStaffId = JSON.myParse(getToken()).id;
      receiveSample(labPickSampleStaffId, ids.toString()).then((res) => {
        if (res.success) {
          this.toQuerySubmittedSample(); //重新获取新数据
          this.$notify({
            message: res.msg,
            type: "success",
          });
        } else {
          this.$notify({
            message: res.msg,
            type: error,
          });
        }
      });
    },

    getIds() {
      let ids = [];

      let arr = ["dataWeishenghu", "dataFangshe", "dataLihua"];
      for (let i = 0; i < arr.length; i++) {
        this[arr[i]].forEach((item) => {
          item.value.forEach((item2) => {
            if (item2.isSelected) {
              ids.push(item2.id);
            }
          });
        });
      }

      if (ids.length <= 0) {
        this.$notify({
          type: "warning",
          message: "请选择样品！",
        });
        return [];
      } else {
        return ids;
      }
    },
    clearSelected() {
      this.$eventBus.$emit("clearSelect");
    },

    toQuerySubmittedSample() {
       this.dataWeishenghu =[]
       this.dataFangshe=[]
       this.dataLihua=[]
      querySubmittedSample(this.radio).then((res) => {
        if (res.dataWeishenghu) {
          this.dataWeishenghu = res.dataWeishenghu;
        }
        if (res.dataFangshe) {
          this.dataFangshe = res.dataFangshe;
        }
        if (res.dataLihua) {
          this.dataLihua = res.dataLihua;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.laboratory {
  &-container {
    margin: 1.2%;
  }
}

.title {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding-bottom: 8px;
  text-indent: 8px;
}
</style>

<style>
.el-carousel__container {
  min-height: 68vh !important;
}
</style>
