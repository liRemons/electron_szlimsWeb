export function _getPastMonth(n) {
  //获取前n个月的日期,格式:'年-月',类型:字符串
  var y = new Date().getFullYear();
  var m = new Date().getMonth() + 1;

  if (m <= n % 12) {
    var month =
      12 - ((n % 12) - m) > 10
        ? 12 - ((n % 12) - m)
        : "0" + (12 - ((n % 12) - m));
    return y - 1 - parseInt(n / 12) + "-" + month;
  } else {
    var month = m - (n % 12) > 10 ? m - (n % 12) : "0" + (m - (n % 12));
    return y - parseInt(n / 12) + "-" + month;
  }
}

export function _getPastWeek(n) {
  //获取前n周的日期,格式:'年-月-日,年-月-日',类型:字符串
  var weekDay = new Date().getDay();
  var timeChuo = new Date().getTime();

  if (weekDay == 0) {
    var date_from = new Date(
      timeChuo - (13 + 7 * (n - 1)) * 24 * 60 * 60 * 1000
    );
    var date_to = new Date(timeChuo - (7 + 7 * (n - 1)) * 24 * 60 * 60 * 1000);
    var Month_from =
      date_from.getMonth() + 1 > 9
        ? date_from.getMonth() + 1
        : "0" + (date_from.getMonth() + 1);
    var Day_from =
      date_from.getDate() > 9 ? date_from.getDate() : "0" + date_from.getDate();
    var Month_to =
      date_to.getMonth() + 1 > 9
        ? date_to.getMonth() + 1
        : "0" + (date_to.getMonth() + 1);
    var Day_to =
      date_to.getDate() > 9 ? date_to.getDate() : "0" + date_to.getDate();
    return (
      date_from.getFullYear() +
      "-" +
      Month_from +
      "-" +
      Day_from +
      "," +
      date_to.getFullYear() +
      "-" +
      Month_to +
      "-" +
      Day_to
    );
  } else {
    var date_from = new Date(
      timeChuo - (weekDay + 6 + 7 * (n - 1)) * 24 * 60 * 60 * 1000
    );
    var date_to = new Date(
      timeChuo - (weekDay + 7 * (n - 1)) * 24 * 60 * 60 * 1000
    );
    var Month_from =
      date_from.getMonth() + 1 > 9
        ? date_from.getMonth() + 1
        : "0" + (date_from.getMonth() + 1);
    var Day_from =
      date_from.getDate() > 9 ? date_from.getDate() : "0" + date_from.getDate();
    var Month_to =
      date_to.getMonth() + 1 > 9
        ? date_to.getMonth() + 1
        : "0" + (date_to.getMonth() + 1);
    var Day_to =
      date_to.getDate() > 9 ? date_to.getDate() : "0" + date_to.getDate();
    return (
      date_from.getFullYear() +
      "-" +
      Month_from +
      "-" +
      Day_from +
      "," +
      date_to.getFullYear() +
      "-" +
      Month_to +
      "-" +
      Day_to
    );
  }
}

export function _maxDate(str) {
  //获取某个月的最大天数.  参数的格式必须为'年-月'或者'年-月-......'
  if (typeof str !== "string" || str.indexOf("-") == -1) {
    console.log(
      "参数错误! _maxDate()方法的参数必须为一个字符串, 其格式必须为 '年-月' 或者 '年-月-xxx'. 如'2018-08', '2018-8-10 15:5:20', ..."
    );
    return;
  }
  return (
    str +
    "-" +
    new Date(
      parseInt(str.split("-")[0]),
      parseInt(str.split("-")[1]),
      0
    ).getDate()
  );
}

export function _dateFormat(dateObj, string) {
  //格式化日期
  var json_inf = {
    "y+": dateObj.getFullYear(),
    "M+":
      dateObj.getMonth() + 1 > 9
        ? dateObj.getMonth() + 1
        : "0" + (dateObj.getMonth() + 1),
    "d+": dateObj.getDate() > 9 ? dateObj.getDate() : "0" + dateObj.getDate(),
    "h+":
      dateObj.getHours() > 9 ? dateObj.getHours() : "0" + dateObj.getHours(),
    "m+":
      dateObj.getMinutes() > 9
        ? dateObj.getMinutes()
        : "0" + dateObj.getMinutes(),
    "s+":
      dateObj.getSeconds() > 9
        ? dateObj.getSeconds()
        : "0" + dateObj.getSeconds(),
    "q+": Math.floor((dateObj.getMonth() + 3) / 3),
    "w+": dateObj.getDay(),
    "S+": function() {
      if (dateObj.getMilliseconds() < 10) {
        return "00" + dateObj.getMilliseconds();
      } else if (
        dateObj.getMilliseconds() > 9 &&
        dateObj.getMilliseconds() < 100
      ) {
        return "0" + dateObj.getMilliseconds();
      } else {
        return dateObj.getMilliseconds();
      }
    },
  };
  for (var key in json_inf) {
    var re = new RegExp(key);
    if (re.test(string)) {
      string = string.replace(re, json_inf[key]);
    }
  }
  return string;
}

// 获取当前的日期
export function _currentDate() {
  // 获取当前日期
  var date = new Date();

  // 获取当前月份
  var nowMonth = date.getMonth() + 1;

  // 获取当前是几号
  var strDate = date.getDate();

  // 添加分隔符“-”
  var seperator = "-";

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  return date.getFullYear() + seperator + nowMonth + seperator + strDate;
}

// 获取明天的日期
export function _tomorrowDate() {
  // 获取当前日期
  var date = new Date();

  // 获取当前月份
  var nowMonth = date.getMonth() + 1;

  // 获取当前是几号
  var strDate = date.getDate() + 1; // 加一天

  // 添加分隔符“-”
  var seperator = "-";

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  return date.getFullYear() + seperator + nowMonth + seperator + strDate;
}

export function currentTime() {
    let myDate = new Date();
    let years = myDate.getFullYear();
    let month = myDate.getMonth();
    let day = myDate.getDate();
    let hours = myDate.getHours();
    let minutes = myDate.getMinutes();
    let seconds = myDate.getSeconds();
    month = month + 1;
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    let time = years + '-' + month + '-' + day + ' ' + hours + '时' + minutes + '分' + seconds+'秒'
    return time;
}
