import { app, BrowserWindow, Menu, ipcMain } from "electron";
var fs = require("fs");
const path = require("path");
/**
 * Set `__static` path to static files in production  hahah
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== "development") {
  global.__static = require("path")
    .join(__dirname, "/static")
    .replace(/\\/g, "\\\\");
}
global.shareObject = {
  token: "",
};
const winURL =
  process.env.NODE_ENV === "development"
    ? `http://127.0.0.1:9080`
    : `file://${__dirname}/index.html`;

let mainWindow;

import { FingerAction } from "./finger";
function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    // useContentSize: true,
    // height: 1080,
    // width: 1200,
    // minWidth: 1200,
    // minHeight: 660,
    // fullscreen: true, // 全屏?
    show: false,

    frame: false,
    backgroundColor: "#ffffff",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.maximize();
  mainWindow.loadURL(winURL);

  mainWindow.on("ready-to-show", function() {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.webContents.session.on(
    "will-download",
    (event, item, webContents) => {
      // item.setSavePath();
      item.on("updated", (event, state) => {
        if (state === "progressing") {
          ipcMain.on("getSchedule", (event, arg) => {
            event.sender.send(
              "getScheduleEvent",
              ((item.getReceivedBytes() / item.getTotalBytes()) * 100).toFixed(
                2
              ) + "%"
            );
          });
          if (item.isPaused()) {
          } else {
            //这里是主战场
          }
        } else if (state === "interrupted") {
          console.log("终止下载");
        } else if (state === "completed") {
        }
      });
      item.once("done", (event, state) => {
        if (state === "completed") {
          console.log("下载完成");
        } else if (state == "cancelled") {
          console.log("取消下载");
        } else {
          //...
        }
      });
    }
  );
}

app.on("ready", () => {
  createWindow();
  FingerAction(mainWindow);
  // mainWindow.webContents.openDevTools();

  // MSerialPort(mainWindow);

  // 开始websocker 视频处理
  // WebsockerRelay('supersecret', 8081, 8082)
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("mini", (event, arg) => {
  console.log("最小化事件触发了", arg); // prints "ping"
  mainWindow.minimize();
});

ipcMain.on("close", (event, arg) => {
  console.log("关闭事件触发了", arg); // prints "ping"
  mainWindow.close();
});
//控制键盘F12控制台
ipcMain.on("openDevTools", (event, arg) => {
  mainWindow.webContents.openDevTools();
});
ipcMain.on("reload", (event, arg) => {
  mainWindow.webContents.reload();
});
fs.exists("./data", function(e) {
  if (e) {
  } else {
    fs.mkdir("./data", function(err) {
      if (err) {
        return console.error(err);
      }
    });
  }
});

// 读取文件
ipcMain.on("readFile", function(event, arg) {
  // arg是从渲染进程返回来的数据
  fs.readFile(`./data/${arg.taskId}.json`, "utf8", (err, data) => {
    if (err) {
      event.sender.send("readFileEvent", false);
    } else {
      event.sender.send("readFileEvent", data);
    }
  });
});
// 读取文件夹
ipcMain.on("readDir", function(event, arg) {
  fs.readdir("./data", (err, files) => {
    if (err) {
      event.sender.send("readDirEvent", false);
    } else {
      event.sender.send("readDirEvent", files);
    }
  });
});

ipcMain.on("writeFile", function(event, arg) {
  fs.writeFile(
    `./data/${arg.taskId}.json`,
    JSON.stringify(arg),
    "utf8",
    (err, data) => {
      if (err) {
        event.sender.send("writeFileEvent", false);
      } else {
        event.sender.send("writeFileEvent", true);
      }
    }
  );
});
ipcMain.on("delFile", function(event, arg) {
  fs.unlink(`./data/${arg.taskId}.json`, (err, data) => {
    if (err) {
      event.sender.send("delFileEvent", false);
    } else {
      event.sender.send("delFileEvent", true);
    }
  });
});
ipcMain.on("delDir", function(event, arg) {
  let files = [];
  let path = "./data";
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach((file, index) => {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
  }
  fs.exists("./data", function(e) {
    if (e) {
    } else {
      fs.mkdir("./data", function(err) {
        if (err) {
          return console.error(err);
        }
      });
    }
  });
});
/*隐藏electron创建的菜单栏*/
// Menu.setApplicationMenu(null);

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
