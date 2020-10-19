import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  ipcMain,
  globalShortcut,
} from "electron";
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
    show: false,
    frame: false,
    // transparent为true后导致窗口放大缩小失败  原因isMaximized()始终返回fasle，官方仍未解决
    transparent: true,
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
  let num;
  mainWindow.webContents.session.on(
    "will-download",
    (event, item, webContents) => {
      // const filePath = path.join(app.getPath("downloads"), item.getFilename());
      // item.setSavePath(filePath);

      item.on("updated", (event, state) => {
        num = ((item.getReceivedBytes() / item.getTotalBytes()) * 100).toFixed(
          2
        );

        if (state === "progressing") {
          mainWindow.webContents.send("getScheduleEvent", [
            num,
            item.getSavePath(),
          ]);
          if (item.isPaused()) {
          } else {
            //这里是主战场
          }
        } else if (state === "interrupted") {
          console.log("终止下载");
        }
      });
      item.on("done", (event, state) => {
        if (state === "completed") {
          mainWindow.webContents.send("getScheduleEvent", [
            "下载成功",
            item.getSavePath(),
          ]);
        } else if (state === "cancelled") {
          mainWindow.webContents.send("getScheduleEvent", [
            "取消下载",
            item.getSavePath(),
          ]);
        } else {
          //...
        }
      });
    }
  );
}

// 注册右键菜单
ipcMain.on("sigShowRightClickMenu", (event, arg) => {
  // 生成菜单
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "刷新",
      enabled:
        arg !== "local-doc-entering" || process.env.NODE_ENV == "development",
      role: "reload",
      accelerator: "CommandOrControl+F5",
    })
  );
  menu.append(new MenuItem({ label: "复制", role: "copy" }));
  menu.append(new MenuItem({ label: "粘贴", role: "paste" }));
  menu.append(new MenuItem({ label: "剪切", role: "cut" }));
  menu.append(new MenuItem({ label: "全选", role: "selectall" }));
  menu.append(
    new MenuItem({
      label: "检查元素",
      role: "toggledevtools",
      accelerator: "CommandOrControl+F12",
    })
  );
  menu.append(new MenuItem({ label: "最小化", role: "minimize" }));

  const win = BrowserWindow.fromWebContents(event.sender);
  menu.popup(win);
});

app.on("ready", () => {
  createWindow();
  FingerAction(mainWindow);
  // 开发模式下注册快捷键
  if (process.env.NODE_ENV == "development") {
    globalShortcut.register("CommandOrControl+F12", () => {
      mainWindow.webContents.openDevTools();
    });
    globalShortcut.register("CommandOrControl+F5", () => {
      mainWindow.webContents.reload();
    });
  }
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
// 对文件进行增删改查函数
// =========================================start
// 创建文件夹
function mkdir(fileName) {
  fs.exists(fileName, function(e) {
    if (e) {
    } else {
      fs.mkdir(fileName, function(err) {
        if (err) {
          return console.error(err);
        }
      });
    }
  });
}
// 读取文件夹
function readdir(path, event) {
  fs.readdir(path, (err, files) => {
    if (err) {
      event.sender.send("readDirEvent", false);
    } else {
      event.sender.send("readDirEvent", files);
    }
  });
}
// 读文件
function readFile(path, event) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      event.sender.send("readFileEvent", false);
    } else {
      event.sender.send("readFileEvent", data);
    }
  });
}
// 写文件
function writeFile(path, data, event) {
  fs.writeFile(path, JSON.stringify(data), "utf8", (err, data) => {
    if (err) {
      event.sender.send("writeFileEvent", false);
    } else {
      event.sender.send("writeFileEvent", true);
    }
  });
}
// 清除文件夹
function delDir(path) {
  let files = [];
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
    fs.rmdirSync(path);
  }
}
// ========================================end

// 注册或发送的事件
// ========================================start

// 顶部菜单操作START+++++++++++
ipcMain.on("unmaximize", (event, arg) => {
  mainWindow.unmaximize();
  event.sender.send("isMaximized", false);
});
ipcMain.on("max", (event, arg) => {
  mainWindow.maximize();
  event.sender.send("isMaximized", true);
});
ipcMain.on("mini", (event, arg) => {
  mainWindow.minimize();
});

ipcMain.on("close", (event, arg) => {
  mainWindow.close();
});
// END+++++++++++++++++

// 模拟localStorage  START++++++++++++
// 存数据
ipcMain.on("setStorage", (event, arg) => {
  let file = path.join(
    `C:/Program Files/szlimsLocal/${arg.staffPhone}`,
    "localStorage.json"
  );
  writeFile(file, arg.data, event);
});
// 取数据
ipcMain.on("getStorage", (event, staffPhone) => {
  let file = path.join(
    `C:/Program Files/szlimsLocal/${staffPhone}`,
    "localStorage.json"
  );
  readFile(file, event);
});

// END +++++++++++++++++++
mkdir("./data");
mkdir(`C:/Program Files/szlimsLocal/`);
ipcMain.on("mkdir", function(event, arg) {
  mkdir(`./data/${arg.staffPhone}`);
  mkdir(`C:/Program Files/szlimsLocal/${arg.staffPhone}`);
});

// 读取文件
ipcMain.on("readFile", function(event, arg) {
  readFile(`./data/${arg.staffPhone}/${arg.taskId}.json`, event);
});
// 读取文件夹
ipcMain.on("readDir", function(event, arg) {
  readdir(`./data/${arg.staffPhone}`, event);
});
// 写文件
ipcMain.on("writeFile", function(event, arg) {
  writeFile(`./data/${arg.staff.staffPhone}/${arg.taskId}.json`, arg, event);
});
// 删除单个文件
ipcMain.on("delFile", function(event, arg) {
  fs.unlink(`./data/${arg.staffPhone}/${arg.taskId}.json`, (err, data) => {
    if (err) {
      event.sender.send("delFileEvent", false);
    } else {
      event.sender.send("delFileEvent", true);
    }
  });
});
// 清理缓存，将创建的文件及文件夹全部删除
ipcMain.on("delDir", function(event, arg) {
  delDir("./data");
  delDir("C:/Program Files/szlimsLocal");
  mkdir(`C:/Program Files/szlimsLocal/`);
  mkdir("./data");
});

// =========================================end
