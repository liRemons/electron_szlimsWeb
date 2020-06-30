<template>
	<div class="___relative showTemplateBox" id="showTemplateBox">
		<div id="Layer1" class="eventCover"></div>
		<div id="box pageBox">
			<div v-for="(page, index) in showing"
					 :style="templateStyle"
					 :class="{pageClass:true, pageMarginTop: index === 0, pageMarginBottom: index === showing.length - 1}">
				<div style="text-align: right; letter-spacing: 5px; margin-bottom: 10px;">第{{index + 1}}页/共{{showing.length}}页
				</div>
				<component v-for="template of page"
									 :is="template.to"
									 :jsonString="templateJson"
									 :data="template.data"
									 :target="999"
									 :ggcspoint="[]"
									 :task="task">
				</component>
			</div>
		</div>
	</div>
</template>

<script>
  import {getTaskById} from "@/api/entering";
  import {setToken} from '@/utils/auth'
  import heads from "@/components/makemodule/thisData/dataJs/heads.js";
  import modules from "@/components/makemodule/thisData/dataJs/modules.js";
  import Methods from "@/views/docEntering/methods.js";

  let {Adaptive} = Methods;

  export default {
    name: "index",
    computed: {
      taskId() {
        return this.$route.params.templateData;
      },
      templateName() {
        return this.taskData.map(item => item.testProject);
      },

      templateStyle() {
        if (this.templateJson[0].data.switch) {
          //竖版原始记录表样式
          return {width: '710px', marginLeft: '30vw', minHeight: '1010px', background: 'white'};
        } else {
          //横版原始记录表样式
          return {width: '1100px', marginLeft: '20vw', minHeight: '800px', background: 'white'};
        }
      }
    },
    data() {
      return {
        task: "",
        taskData: "",
        heads,
        modules,
        templateJson: [],
        showing: ""
      }
    },
    methods: {
      initTemplate() {
        let obj = [];
        for (let i = 0; i < this.templateName.length; i++) {
          let result = this.modules.find(mod => mod.name === (this.templateName[i] || this.templateName[i].name));
          if (result) {
            obj.push(result);
          } else {
            let result2 = this.heads.find(mod => mod.name === (this.templateName[i] || this.templateName[i].name));
            if (result2) {
              obj.push(result2);
            } else {
              console.log("实例中的模块名字有误!");
            }
          }
        }
        let templateArr = JSON.myParse(JSON.stringify(obj));
        templateArr.forEach((template, index) => {
          template.valueData = this.taskData[index];
          template.height._normal.value = obj[index].height._normal.value;
          if (obj[index].height.hasOwnProperty('_short')) {
            template.height._short.value = obj[index].height._short.value;
          }

          template.height._normal.carried = true;

          let json = {
            to: template.name,
            type: null,
            data: template
          };
          this.templateJson.push(json);
        });
        this.reset();
      },

      reset() {
        let arr = Adaptive(this.templateJson, this.templateJson[0].data.switch ? 1010 : 670);
        console.log(this.showing);

        this.showing = arr[0].length > 0 ? arr : arr.slice(1)
      }
    },
    mounted() {
      setToken("");

      getTaskById(this.taskId).then(res => {
        this.task = res.tasks[0];
        this.taskData = JSON.myParse(res.tasks[0].data);
        if (this.taskData) {
          this.initTemplate();
        } else {
          this.$notify({
            message: '没有该任务数据！',
            type: 'warning'
          })
        }
      });

    }
  }
</script>

<style>

	.pageClass {
		margin-bottom: 40px;
		z-index: 0;
		box-shadow: rgba(0, 0, 0, .2) 0 1px 5px 0px;
		padding: 50px 20px 20px 20px;
	}

	.pageMarginTop {
		margin-top: 150px;
	}

	.pageMarginBottom {
		margin-bottom: 100px;
	}
</style>
