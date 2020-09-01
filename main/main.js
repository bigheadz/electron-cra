const { app, BrowserWindow, ipcMain, Menu, Tray } = require("electron");
const path = require("path");
require(path.join(__dirname, "/log"));
const mainLog = global.log.scope("main");

const develop = process.env.NODE_ENV === "development" ;

//判断当前的版本号之类的， 以做必要的升级等操作
// checkUpdate();

process.on("exit", () => {
  mainLog.log("exit");
});

// configuration
// ignore certificate
app.commandLine.appendSwitch("--ignore-certificate-errors", "true");

const debugConfigRender = process.env.NODE_ENV === "development" ? true : true;

let mainWindow = null;
let tray = null;

const showAndFocusWindow = () => {
  if (mainWindow == null || mainWindow.isDestroyed()) {
    createMainWindow();
  } else {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    mainWindow.show();
  }
};

const initTray = () => {
  tray = new Tray(path.join(__dirname, "/icon.png"))
  // tray = new Tray(appIcon);
  const trayContextMenu = Menu.buildFromTemplate(
    [
      {
        label: "open",
        click: () => {
          showAndFocusWindow();
        },
      },
      develop && {
        label: "test",
        click: () => {
          // require(path.join(
          //   __dirname,
          //   "/createTestWindow"
          // )).createTestWindow();
        },
      },
      {
        label: "exit", //intl.get("exit"),
        click: () => {
          tray.destroy();
          app.quit();
        },
      },
    ].filter((o) => o !== false)
  );
  tray.setToolTip("electron with cra");

  tray.on("click", () => {
    showAndFocusWindow();
  });
  tray.on("right-click", () => {
    tray.popUpContextMenu(trayContextMenu);
  });
};

const createMainWindow = () => {
  mainLog.log("create Main window");
  mainWindow = new BrowserWindow({
    // 20 用于阴影
    show: false,
    webPreferences: {
      devTools: debugConfigRender,
      nodeIntegration: true,
      // preload: path.join(__dirname, "/preload.js"),
      enableRemoteModule: true,
    },
  });
  // mainWindow.setIgnoreMouseEvents(false);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  /**
   * loadURL 分为两种情况
   *  1.开发环境，指向 react 的开发环境地址
   *  2.生产环境，指向 react build 后的 index.html
   */
  const remotePath = process.env.DEBUG_RENDER_PATH;
  const startUrl =
    process.env.NODE_ENV === "development"
      ? remotePath || "http://localhost:3000/index.html"
      : path.join(__dirname, "/../build/index.html");
  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
};

// mainLog.log("logs path", app.getPath("logs"));

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  return;
}

//当第二个实例被执行并且调用的时候， 尝试显示配置界面
app.on("second-instance", (event, commandLine, workingDirectory) => {
  showAndFocusWindow();
});

app.on("ready", () => {
  mainLog.log("app on ready"); // start server
  initTray()
});

app.on("window-all-closed", function () {
  // if (process.platform !== "darwin") app.quit();
  mainLog.log("window-all-closed but still alive");
});

app.on("activate", function () {
  if (mainWindow === null) createMainWindow();
});

app.on("quit", function () {
  mainLog.log("app quit");
});

function hideWindow() {
  if (mainWindow) mainWindow.minimize();
}

//event
ipcMain.on("window-min", function () {
  hideWindow();
});
ipcMain.on("window-close", function () {
  if (mainWindow) mainWindow.close();
});

function getWindow() {
  return mainWindow;
}

// 模拟crash
// setTimeout(() => {
//   process.crash();
// }, 1000 * 10);

process.on("uncaughtException", (error) => {
  mainLog.error(
    "uncaughtException",
    error.stack || JSON.stringify(error, null, 4)
  );
});

// nonexistentFunc();

global.getWindow = getWindow;
global.hideWindow = hideWindow;
