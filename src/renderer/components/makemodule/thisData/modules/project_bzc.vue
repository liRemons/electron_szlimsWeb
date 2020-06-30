<template>
  <div id="project_bzc"
       :class="{___module_frame_Box:true, ___table:true, _normalHeight_:data.height._normal.carried, _shortHeight_:!data.height._normal.carried}">
    <div :class="{eventCover:!ableInput}"></div>
    <div class="___nodule_frame_grid_left ___table-cell">
      半值层 ( HVL ) /mmAl
    </div>
    <div class="___module_frame_grid_relative_middle">
      <div class="project_bzc_box" style="text-align:left">
        &nbsp;&nbsp;&nbsp;
        检测条件:
        <divModel style="height:22px;" class="project_bzc_smollInput ___smollInput inputBlock"
                  v-model="data.valueData.item1"></divModel>
        kV
        <divModel style="height:22px;" class="project_bzc_smollInput ___smollInput inputBlock"
                  v-model="data.valueData.item2"></divModel>
        mAs
      </div>
      <div class="project_bzc_box">
        <div class="project_bzc_cellBox1">靶/滤过</div>
        <div class="project_bzc_cellBox2">测量值 ( mmAl )</div>
        <div class="project_bzc_cellBox3">平均值</div>
      </div>
      <div class="project_bzc_box hideBottom">
        <div class="project_bzc_cellBox1">
          <div class="___shadowBottom" v-for="(val, index) in data.valueData.point">
            <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                      v-model="data.valueData.point[index].item1"></divModel>
          </div>
        </div>
        <div class="project_bzc_cellBox2">
          <div class="___relative ___shadowBottom" v-for="(val, index) in data.valueData.point">
            <div class="project_bzc_option1">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[index].item2" @keydown="filteLetter"
                        @input="toCompute(index)"></divModel>
            </div>
            <div class="project_bzc_option2">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[index].item3" @keydown="filteLetter"
                        @input="toCompute(index)"></divModel>
            </div>
            <div class="project_bzc_option3">
              <divModel :class="{_normalInput_:data.height._normal.carried, _shortInput_:!data.height._normal.carried}"
                        v-model="data.valueData.point[index].item4" @keydown="filteLetter"
                        @input="toCompute(index)"></divModel>
            </div>
          </div>
        </div>
        <div class="project_bzc_cellBox3">
          <div class="___shadowBottom" v-for="(val, index) in data.valueData.point">
            {{data.valueData.point[index].item5}}&nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="___nodule_frame_grid_right ___table-cell">{{data.valueData['计算结果']}}</div>

    <div class="__functionBox" v-if="ipdTemplate!='ipdTemplate'" v-show="!isTemplate">
      <!-- ******** 功能模块 ********** -->
      <div class="__functionCover1" v-show="data.height._normal.carried || data.isHead"></div>
      <div class="__functionCover2" v-show="!data.height._normal.carried || data.isHead"></div>
      <div class="__functionCover3" v-show="index_jsonString()==0"></div>
      <div class="__functionCover4" v-show="data.isHead || index_jsonString()==jsonString.length-1"></div>
      <div class="__functionButton1" @click="toHigh"></div>              <!-- 放大行高 -->
      <div class="__functionButton2" @click="toShort"></div>              <!-- 缩小行高 -->
      <div class="__functionButton3" @click="toUpModule"></div>           <!-- 提高一行 -->
      <div class="__functionButton4" @click="toDownModule"></div>         <!-- 下降行高 -->
      <div class="__functionButton5" @click="toDeleteModule"></div>       <!-- 删除模块 -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        index_jsonString: function () {             // 获取当前模块在jsonString中的索引
          let result = this.thisPageIndex;
          for (let i = 0; i < this.pageNumber; i++) {
            result += this.showing[i].length;
          }
          return result;
        }
      }
    },
    props: ['data', 'ipdTemplate', 'pageNumber', 'thisPageIndex', 'jsonString', 'showing', 'watchSign', 'isTemplate', 'ableInput'],
    methods: {
      toHigh() {
        this.data.height._normal.carried = true;
        this.data.height._short.carried = false;
        this.watchSign._high += 1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toShort() {
        this.data.height._normal.carried = false;
        this.data.height._short.carried = true;
        this.watchSign._short += 1;
        this.$emit('update:jsonString');
        this.$emit('update:watchSign');
      },
      toUpModule() {
        let index = this.index_jsonString();
        if (index != 0) {
          _transposition(this.jsonString, index, index - 1);
          this.$emit('update:jsonString');
          this.watchSign._down += 1;
          this.$emit('update:watchSign');
        }
      },
      toDownModule() {
        let index = this.index_jsonString();
        if (index != this.jsonString.length - 1) {
          _transposition(this.jsonString, index, index + 1);
          this.$emit('update:jsonString');
          this.watchSign._down += 1;
          this.$emit('update:watchSign');
        }
      },
      toDeleteModule() {
        let index = this.index_jsonString();

        this.jsonString.splice(index, 1);
        this.$emit('update:jsonString');
        this.watchSign._delete += 1;
        this.$emit('update:watchSign');
      },
      noPress(event) {
        event.target.blur();
      },
      filteLetter(event) {
        if ((event.keyCode < 48 && event.keyCode != 8) || (event.keyCode > 57 && event.keyCode < 96) || event.keyCode > 105) {
          _preventDefault(event);
        }
      },
      toCompute(index) {
        let num1 = parseFloat(this.data.valueData.point[index].item2);
        let num2 = parseFloat(this.data.valueData.point[index].item3);
        let num3 = parseFloat(this.data.valueData.point[index].item4);

        if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3)) {
          let result = parseInt((num1 + num2 + num3) / 3 * 100) / 100;
          this.data.valueData.point[index].item5 = result;
        } else {
          this.data.valueData.point[index].item5 = '';
        }
      }
    },
    mounted: function () {
      if (this.$route.query.Judge != 'ipdTemplate') {
        _('.__functionBox').choosable();
      }
    }
  };
</script>

<style>
  /* 所有 CSS 样式全部提取到外接单独.css文件: Css.css */
</style>
