<template>
	<div>
		<!--<component :is="testprojectName"></component>-->
	</div>
</template>

<script>
  import heads from "@/components/makemodule/thisData/dataJs/heads.js";
  import modules from "@/components/makemodule/thisData/dataJs/modules.js";

  export default {
    name: "showReviewTemplate",
    data() {
      return {
        modules,
        heads
      }
    },
    computed: {
      testprojectData() {
        return this.$store.state.laboratory.labtemplate[0];
      },
      testprojectName() {
        return this.$store.state.laboratory.labtemplate[0].modelName;
      }
    },
    methods: {
      initTemplate() {
        let templateNames = ["head_sysjq", "project_sysjq_standard", this.testprojectName];
        let templateObjArr = [];
        templateNames.forEach(templateName => {
          let testProjectTemplate = modules.find(item => item.name === templateName);
          if (!testProjectTemplate) {
            testProjectTemplate = heads.find(item => item.name === templateName);
          }
          let templateObj = this.deepCopy(testProjectTemplate);
          if (templateObj) {
            let json = {
              to: templateObj.name,
              type: null,
              data: templateObj
            };
            templateObjArr.push(json);
          }
        });
      },
      deepCopy(target) {
        let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
        function _deepCopy(target) {
          if ((typeof target !== 'object') || !target) {
            return target;
          }
          for (let i = 0; i < copyed_objs.length; i++) {
            if (copyed_objs[i].target === target) {
              return copyed_objs[i].copyTarget;
            }
          }
          let obj = {};
          if (Array.isArray(target)) {
            obj = [];//处理target是数组的情况
          }
          copyed_objs.push({target: target, copyTarget: obj})
          Object.keys(target).forEach(key => {
            if (obj[key]) {
              return;
            }
            obj[key] = _deepCopy(target[key]);
          });
          return obj;
        }
        return _deepCopy(target);
      }
    },
    mounted() {
      this.initTemplate();
    }
  }
</script>

<style scoped>

</style>
