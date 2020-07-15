export default {
  Adaptive: function(argumentArr, normNumber) {
    //定义方法:  基于argumentArr的height属性下的相关属性, 并根据normNumber(标准),
    //将argumentArr变为一个数组里面嵌套多个数组的格式
    try {
      let result = [];

      let sum_temporary = 0;
      let arr_temporary = [];
      argumentArr.reduce((front, val, i, self) => {
        if (val.data.height._normal.carried) {
          let value = val.data.height._normal.value(val.data.valueData);
          if (front + value < normNumber + sum_temporary) {
            arr_temporary.push(val);
          } else {
            result.push([...arr_temporary]);
            arr_temporary = [val];
            sum_temporary = front;
          }
          if (i == self.length - 1) result.push(arr_temporary);
          return front + value;
        } else {
          let value = val.data.height._short.value(
            val.data.valueData,
            NumberOfDetectors
          );
          if (front + value < normNumber + sum_temporary) {
            arr_temporary.push(val);
          } else {
            result.push([...arr_temporary]);
            arr_temporary = [val];
            sum_temporary = front;
          }
          if (i == self.length - 1) result.push(arr_temporary);
          return front + value;
        }
      }, 0);
      return result;
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  dataRefresh: function(_vm) {
    //重新下载实例数据, 刷新页面的实例数据
    _ajax({
      url: _vm.url + "/queryAllTask",
      method: "post",
      success: (data) => {
        let result = [];
        data.tasks.forEach((val) => {
          let json = {
            id: "",
            name: "",
            content: null,
            detailData: null,
          };
          json.id = val.id;
          json.name = val.projectName;
          json.content = JSON.myParse(val.testProjectList);
          json.detailData = JSON.myParse(val.data);
          result.push(json);
        });
        _vm.templateList = result;
        _vm.ableInput = false;
        alert("数据上传成功!");
      },
    });
  },
};
