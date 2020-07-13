import { ipcMain, BrowserWindow } from "electron";
// const Finger = require("C:/Users/Administrator/AppData/Local/finger/finger");
import Finger from './finger/finger'
// const Finger = require("./finger/finger");
function FingerAction(mainWindow) {
  // 0  false    1 true
  Finger.openDevice(0, 0, 0, (res) => {
    console.log("[Finger.openDevice]  = " + res);
  });
  Finger.linkDevice((res) => {
    console.log("[Finger.linkDevice]  = " + res);
  });

  //登记指纹

  //参考模板，右手食指
  let captureFinger;
  ipcMain.on("getUser", async (event, arg) => {
    captureFinger = arg;
    //匹配指纹
    // Finger.enrolFpChar()
    Finger.genFpChar();
    await start();
  });

  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function start() {
    mainWindow.webContents.send("Finger_MSG", {
      msg: "开始匹配",
      code: -1,
    });
    console.log("开始匹配！");
    let finish = false;
    let result = 0;
    while (!finish) {
      Finger.getWorkMsg((res) => {
        if (res < 0) return;
        console.log("[Finger.getWorkMsg]  = " + res);

        //FPM_PLACE=02		&&请按手指
        if (res == 2) {
          console.log("请按手指");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "请按手指",
            code: res,
          });
        }
        if (res == 3) {
          console.log("请抬起手指");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "请抬起手指",
            code: res,
          });
        }
        if (res == 4) {
          console.log("采集图像完成");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "采集图像完成",
            code: res,
          });
        }
        if (res == 5) {
          console.log("采集特征点");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "采集特征点",
            code: res,
          });
          Finger.getFpStrByGen((res) => {
            mainWindow.webContents.send("Finger_MSG", {
              msg: "匹配模板",
              code: res,
            });
            Finger.matchTemplateEx(res, captureFinger, (res) => {
              console.log("比对结果:" + res);
              mainWindow.webContents.send("Finger_MSG", {
                msg: "比对结果",
                code: res,
              });
              finish = 1;
              result = res;
            });
          });
        }
        if (res == 6) {
          console.log("登记指纹");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "登记指纹",
            code: res,
          });
          Finger.getFpStrByEnl((a) => {
            console.log(a);
            mainWindow.webContents.send("Finger_MSG", {
              msg: "指纹信息",
              code: a,
            });
          });
        }
        if (res == 7) {
          console.log("新的指纹图像");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "新的指纹图像",
            code: res,
          });
        }
        if (res == 8) {
          console.log("超时");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "超时",
            code: res,
          });
          finish = 1;
          result = 0;
        }
        if (res == 9) {
          console.log("IMGVAL");
          mainWindow.webContents.send("Finger_MSG", {
            msg: "IMGVAL",
            code: res,
          });
        }
      });

      if (finish == 1) return result;

      await sleep(500);
    }
  }
}

export { FingerAction };
