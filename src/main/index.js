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
      enabled: arg !== "doc-entering" || process.env.NODE_ENV == "development",
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
  // event.preventDefault();
  // event.sender.send('action', 'exiting');
});
ipcMain.on('reqaction', (event, arg) => {
  console.log('zhu jin cheng:', arg)
  switch(arg){
    case 'exit':
      app.exit()  // 退出所有窗口，注意这里使用 app.quit() 无效
      break;
  }
});

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
mkdir("./data");
ipcMain.on("mkdir", function(event, arg) {
  mkdir(`./data/${arg.staffPhone}`);
});

// 读取文件
ipcMain.on("readFile", function(event, arg) {
  // arg是从渲染进程返回来的数据
  fs.readFile(
    `./data/${arg.staffPhone}/${arg.taskId}.json`,
    "utf8",
    (err, data) => {
      if (err) {
        event.sender.send("readFileEvent", false);
      } else {
        event.sender.send("readFileEvent", data);
      }
    }
  );
});
// 读取文件夹
ipcMain.on("readDir", function(event, arg) {
  fs.readdir(`./data/${arg.staffPhone}`, (err, files) => {
    if (err) {
      event.sender.send("readDirEvent", false);
    } else {
      event.sender.send("readDirEvent", files);
    }
  });
});

ipcMain.on("writeFile", function(event, arg) {
  fs.writeFile(
    `./data/${arg.staff.staffPhone}/${arg.taskId}.json`,
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
  fs.unlink(`./data/${arg.staffPhone}/${arg.taskId}.json`, (err, data) => {
    if (err) {
      event.sender.send("delFileEvent", false);
    } else {
      event.sender.send("delFileEvent", true);
    }
  });
});
ipcMain.on("delDir", function(event, arg) {
  delDir("./data");
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
