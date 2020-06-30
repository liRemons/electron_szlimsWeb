<template>
	<div id="box pageBox" style="margin-top: 30px;">
		<div id="Layer1" class="eventCover" style="margin-top: 120px;" v-if="onlyRead"></div>
		<div :class="{curvePage: true}"
				 style="padding: 30px; margin-bottom: 20px;"
				 v-for="(page, index) in pages">
			<componet v-for="template in page" :jsonString="jsonString" :is="template.to" :data="template.data"
								:target="target"></componet>
		</div>
	</div>
</template>

<script>
  import modules from "@/components/makemodule/thisData/dataJs/modules.js";
  import Methods from "../methods.js";

  let {Adaptive} = Methods;
  import bus from '@/utils/bus.js'

  export default {
    data() {
      return {
        jsonString: [],
        modules,
        pages: "",
        onlyRead: false,
        showModel: false
      };
    },
    props: ['templateContent', 'target'],
    methods: {
      testShow() {
        let contentArray = [];
        let newSolutionPreparationData = "";
        if (this.$route.query.isEdit === "true") {
          let newSolutionPreparationDataStr = sessionStorage.getItem('newSolutionPreparationData');
          this.onlyRead = this.$route.query.solutionPass === '0' ? false : true;

          newSolutionPreparationData = JSON.myParse(newSolutionPreparationDataStr);
          contentArray = newSolutionPreparationData.map(item => item.testProject);
        } else {
          contentArray = this.templateContent;
        }


        let obj = [];
        for (let i = 0; i < contentArray.length; i++) {
          let result1 = this.modules.find(mod => mod.name === contentArray[i]);
          if (result1) {
            obj.push(result1);
          }
        }

        let middleArr = JSON.myParse(JSON.stringify(obj));

        middleArr.forEach((val, i) => {
          val.height._normal.value = obj[i].height._normal.value;
          if (obj[i].height._short)
            val.height._short.value = obj[i].height._short.value;
          let json = {
            to: val.name,
            type: null,
            data: val
          };
          this.jsonString.push(json);
        });

        if (this.$route.query.isEdit === "true") {
          this.jsonString.forEach((item, index) => {
            item.data.valueData = newSolutionPreparationData[index];
          })
        }
        this.pages = Adaptive(this.jsonString, 828);
      },
      reset() {
        this.pages = Adaptive(this.jsonString, 828);
      },
      redefinition(needPorjectName) {
        let redefinitionArr = [];
        this.jsonString.forEach((item, index) => {
          let obj = {};
          let findIndex = redefinitionArr.findIndex((val) => val.to === item.to && val.data.valueData.multipleId === item.data.valueData.multipleId);
          if (findIndex == -1) {
            obj = JSON.myParse(JSON.stringify(item));
            obj.data.height = this.jsonString[index].data.height;
            redefinitionArr.push(obj)
          } else {
            let point = JSON.myParse(JSON.stringify(item.data.valueData.point));
            redefinitionArr[findIndex].data.valueData.point = [...redefinitionArr[findIndex].data.valueData.point, ...point]
          }
        });
        let decompose = [];
        let height = redefinitionArr[0].data.switch ? 1010 : 828;
        redefinitionArr.forEach((item, index) => {
          let projcet = {
            to: item.to,
            type: null,
            data: JSON.myParse(JSON.stringify(item.data))
          };

          let surplusPoint = [];
          projcet.data.valueData.point = [];
          let point = [];
          if (needPorjectName != '' && needPorjectName === item.to) {
            point = this.syntheticData
          } else {
            point = item.data.valueData.point
          }
          let lastProject = Adaptive(decompose, height);
          let surplusHiehgt = 0;
          if (lastProject.length > 0) {
            lastProject[lastProject.length - 1].forEach((v, i) => {
              let num = 0;
              if (v.data.height._normal.confirm) {
                num = v.data.height._normal.fixed
              } else {
                num = v.data.height._normal.carried ? v.data.height._normal.value(v.data.valueData) : 0
              }
              surplusHiehgt += num
            });
            surplusHiehgt = surplusHiehgt > 0 ? height - surplusHiehgt : height;
          } else {
            surplusHiehgt = height;
          }
          if (item.data.height._normal.confirm) {
            projcet.data.valueData.point = JSON.myParse(JSON.stringify(point));
            decompose.push(projcet);
            decompose[decompose.length - 1].data.height = item.data.height;
          } else if (surplusHiehgt >= projcet.data.height._normal.fixed + 32) {
            let several = Math.floor((surplusHiehgt - projcet.data.height._normal.fixed) / 32);
            if (several > 2) {
              several -= 2
            }
            if (point.length > several) {
              projcet.data.valueData.point = JSON.myParse(JSON.stringify(point.slice(0, several)));
              decompose.push(projcet);
              decompose[decompose.length - 1].data.height = item.data.height;
              surplusPoint = JSON.myParse(JSON.stringify(point.slice(several)));
            } else {
              projcet.data.valueData.point = JSON.myParse(JSON.stringify(point));
              decompose.push(projcet);
              decompose[decompose.length - 1].data.height = item.data.height;
            }
          } else {
            surplusPoint = JSON.myParse(JSON.stringify(point));
          }

          let totalSubsidiary = Math.ceil((height - projcet.data.height._normal.fixed) / 32);
          if (totalSubsidiary > 2) {
            totalSubsidiary -= 2
          }
          let fatherData = [];
          let sonData = [];
          surplusPoint.forEach((val, num) => {
            sonData.push(val);
            if (sonData.length == totalSubsidiary || (surplusPoint.length - 1) == num) {
              fatherData.push(sonData);
              sonData = []
            }
          });
          fatherData.forEach((val, num) => {
            let projcetSubsidiary = JSON.myParse(JSON.stringify(projcet));
            projcetSubsidiary.data.valueData.point = val;
            decompose.push(projcetSubsidiary);
            decompose[decompose.length - 1].data.height = item.data.height;
          });
        });
        this.jsonString = decompose;
        this.reset();
      }
    },

    created() {
      this.testShow();
    },
    mounted() {
      bus.$on('reset', () => {
        this.redefinition();
      });
      bus.$on('changOnlyRead', (valDatas, onlyRead) => {
        this.onlyRead = onlyRead;
        this.jsonString.forEach((item, index) => {
          item.data.valueData = valDatas[index];
        })
      });
    }
  };
</script>

<style>

</style>
