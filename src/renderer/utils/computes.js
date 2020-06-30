let computeObj = {};

computeObj.getBase64Image = function (img) {
  let canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  let dataURL = canvas.toDataURL("image/png");
  return dataURL;
};

computeObj.size = function (arr) { //判断平均值的小数点后的位数
  let j;
  if ((arr[0] + '').split('.').length > 1) {
    j = (arr[0] + '').split('.')[1].length
  } else {
    j = 0
  }
  for (let i = 1; i < arr.length; i++) {
    if ((arr[i] + '').split('.').length > 1) {
      if ((arr[i] + '').split('.')[1].length > j) {
        j = (arr[i] + '').split('.')[1].length;
      }
    }
  }
  return j;
};


//计算相对相差
computeObj.difference = function (val, val2, lessReport) {
  val = Number(val);
  val2 = Number(val2);
  let val3 = Math.abs(val - val2).toFixed46(this.size([val, val2]));
  let val4 = ((val + val2) / 2).toFixed46(this.size([val, val2]));
  let val5 = (val3 / val4) * 100;
  let result = [];
  if (lessReport) {
    result = ['/'];
  } else {
    if (val5 < 0.1) {
      result = ['< 0.10'];
    } else {
      val5 = val5.toFixed46(2, true, true);
      result = [val5];
    }
  }
  result.push(val5);
  return result;
};


//控制是否合并单元格
computeObj.toRowspan = function (row, index, data) {
  let nextRow = data.valueData.point[index + 1];
  if (!nextRow) {
    return false;
  }

  try {
    let result1 = row.parallelLetter.indexOf('-A');
    let result2 = nextRow.parallelLetter.indexOf('-B');
    if (result1 !== -1 && result2 !== -1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

//如果不是平行样显示, 否则不显示
computeObj.toRowspan2 = function (row) {
  try {
    let result1 = row.parallelLetter.indexOf('-A');
    let result2 = row.parallelLetter.indexOf('-B');
    if (result1 === -1 && result2 === -1) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return true;
  }

};


//获取交集
computeObj.intersect = function (a, b) {
  let set1 = new Set(a),
          set2 = new Set(b);
  return [...new Set([...set1].filter(x => set2.has(x)))];
};

//获取并集
computeObj.unionArray = function (a, b) {
  let tempArray = [];
  for (let i = 0; i < arguments.length; i++) {
    tempArray.push(...new Set(arguments[i]))
  }
  return [...new Set(tempArray)]
};


//求和
computeObj.sum = function () {
  let tempArray = [...arguments];
  let num = 0;
  for (let i = 0; i < tempArray.length; i++) {
    let n = tempArray[i] ? tempArray[i] : 0;
    num += Number(n);
  }
  return num;
};


//只显示时分
computeObj.myTime = function (row) {
  try {
    let arr = row.time.split(':');

    if (arr.length && arr.length > 1) {
      return arr[0] + ':' + arr[1];
    } else {
      return ''
    }
  } catch (e) {
    return ' '
  }

};

//复制检测项目下所有样品
computeObj.copyAllSample = function (valueData) {
  try {
    sessionStorage.setItem('allSample', JSON.stringify(valueData))
  } catch (e) {
    return ' '
  }
};

//粘贴检测项目下所有样品
computeObj.pasteAllSample = function (valueData) {
  try {
    let allSample = JSON.parse(sessionStorage.getItem('allSample'));
    console.log(allSample);
    if (valueData.testProject !== allSample.testProject) {
      myVue.$notify({
        type: 'warning',
        message: '只能粘贴相同采样模块'
      });
      return
    } else {
      allSample.point.forEach(item => {
        item.pointId = uuid();
        item.foreverId = uuid();
        if (valueData.multipleId === allSample.multipleId) {
          item.sampleNum = '';
          item.sampleNumIndex = '';
        }
        valueData.point.push(item);
      });
      myVue.$eventBus.$emit('redefinition');
    }
  } catch (e) {
    return ' '
  }
};

//放射清除生成的数据
computeObj.deleteRow = function (clearArrName) {
  myVue.$store.dispatch(clearArrName, []);
  myVue.$notify({
    type: 'success',
    message: '清除数据成功'
  })
};

//检查是否有数据空字符串，并提示
computeObj.checkMustWrite = function (valueData, mustWriteArr, successMsg, errorMsg) {
  let result = true;
  mustWriteArr.forEach(key => {
    if (typeof (key) == 'string') {
      if (valueData[key] === "") {
        result = false;
      }
    } else if (key instanceof Array) {
      key.forEach(key2 => {
        valueData.point.forEach(item => {
          if (item[key2] === "") {
            result = false;
          }
        });
      })
    }
  });

  if (result) {
    myVue.$notify({
      type: 'success',
      message: successMsg
    })
  } else {
    myVue.$notify({
      type: 'error',
      message: errorMsg
    })
  }
};


//判断是状态检测还是验收检测
computeObj.judgeState = function (stateName) {
  let yanShouTest = ["卫生验收", "监督", "比对", "科研"]; //拥有验收检测权限
  let stateTest = ["状态"]; //拥有状态检测权限
  let result = yanShouTest.findIndex(item => item === stateName);
  if (result !== -1) {
    return '验收检测';
  } else {
    let result2 = stateTest.findIndex(item => item === stateName);
    if (result2 !== -1) {
      return '状态检测';
    } else {
      return -1;
    }
  }
};

//取消radio
computeObj.clearRadio = function (val, obj, key) {
  if (val === obj[key]) {
    if (obj instanceof Array) {
      obj.splice(key, 1, '');
    } else {
      obj[key] = '';
    }
  } else {
    if (obj instanceof Array) {
      obj.splice(key, 1, val);
    } else {
      obj[key] = val;
    }
  }
};


//获取图片base64
computeObj.getImg = function (src, fn) {
  let image = new Image();
  image.crossOrigin = '';
  image.src = src;
  let that = this;
  new Promise((resolve, reject) => {
    try {
      image.onload = () => {
        resolve()
      }
    } catch (e) {
      reject()
    }
  }).then((data) => {
    fn(that.getBase64Image(image));
  });
};

export default computeObj;
