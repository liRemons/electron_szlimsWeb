<template>
  <div style="width:100%;display:inline-block">
    <input
      class="box"
      style="width:100%;"
      ref="mySearchBox"
      :style="{height:height+'px',lineHeight:height+'px'}"
      :defaultVal="defaultValue"
      @input="toInput"
      @focus="showList = true"
      @blur="showList = false"
    />

    <div style="position: relative">
      <transition>
        <ul class="myul" v-show="showList" v-if="filterList.length > 0">
          <li
            v-for="(item, index) in filterList"
            @click="selectItem(item)"
            :key="index + 'a'"
          >
            {{ item[name] }}
          </li>
        </ul>
        <ul class="myul" v-show="showList" v-else>
          <li>未找到数据</li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus.js";
export default {
  name: "querySelect",
  props: {
    list: {
      type: Array
    },
    name: {
      type: String
    },
    num: {
      type: Number
    },
    defaultValue: {
      type: String,
      default: ""
    },
    height:{
      type:String,
      default:'32'
    }
  },
  computed: {
    filterList() {
      if (this.keyWords === "") {
        return this.list;
      } else {
        let newList = this.list.filter(
          item => item[this.name].indexOf(this.keyWords) !== -1
        );
        return newList;
      }
    },
    searchBox() {
      let mySearchBox = this.$refs["mySearchBox"];
      return mySearchBox;
    }
  },
  data() {
    return {
      showList: false,
      keyWords: ""
    };
  },
  watch: {
    defaultValue(val) {
      this.$emit("reset");
      this.searchBox.value = val;
    }
  },
  methods: {
    toInput(e) {
      let value = e.target.value;
      this.keyWords = value;
    },
    selectItem(item) {
      this.searchBox.value = item[this.name];
      this.$emit("getSelectItem", this.num, item);
    }
  },
  mounted() {
    this.searchBox.value = this.defaultValue;
    this.$eventBus.$on("showText", () => {
      this.searchBox.value = this.defaultValue;
    });
  }
};
</script>

<style scoped>
.box {
  height: 32px;
  width: 90%;
  text-align: center;
  border: none;
}
.myul {
  animation: myfirst 0.2s;
  position: absolute;
  margin: 0 auto;
  background: #c2ccd0;
  border-radius: 5px;
  max-height: 500px;
  overflow-y: auto;
  z-index: 999;
  padding: 10px 0px 8px 0px;
}
.myul li {
  height: 30px;
  padding: 10px 20px 10px 20px;
  line-height: 30px;
  border-radius: 3px;
}

.myul li:hover {
  background: white;
}

@keyframes myfirst {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
