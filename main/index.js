import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";

import { startService } from "./server";
import broadcast from "./broadcast";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    frame: false,
    width: 300,
    height: 88,
    webPreferences: { nodeIntegration: true },
    alwaysOnTop: true,
    transparent: true,
    // backgroundColor: "#AAFFFFFF",
  });

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    // console.log("ELECTRON_WEBPACK_WDS_PORT", process.env.ELECTRON_WEBPACK_WDS_PORT);
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  // if (process.platform !== "darwin") {
  app.quit();
  // }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
  startService();
  broadcast();
});

export const getWindow = () => mainWindow;
