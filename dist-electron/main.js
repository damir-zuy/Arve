import { nativeTheme, ipcMain, app, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win = null;
function createWindow(bounds) {
  const opts = {
    width: (bounds == null ? void 0 : bounds.width) ?? 1600,
    height: (bounds == null ? void 0 : bounds.height) ?? 1080,
    // preserve last position if available
    ...bounds && { x: bounds.x, y: bounds.y },
    icon: path.join(__dirname, "..", "src", "assets", "icons", "arve_icon.ico"),
    // Windows
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#ffffff00",
      symbolColor: "#aaa",
      height: 31,
      vibrancy: "dark"
      // 'light' | 'dark' | 'medium-light' | 'ultra-dark'
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: false,
      contextIsolation: true
    }
  };
  win = new BrowserWindow(opts);
  win.setMenuBarVisibility(false);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.on("maximize", () => win == null ? void 0 : win.webContents.send("window-state-changed", true));
  win.on("unmaximize", () => win == null ? void 0 : win.webContents.send("window-state-changed", false));
}
nativeTheme.on("updated", () => {
  if (!win) return;
  const bounds = win.getBounds();
  win.close();
  win = null;
  createWindow(bounds);
});
ipcMain.on("minimize", () => win == null ? void 0 : win.minimize());
ipcMain.on("maximize", () => {
  if (win == null ? void 0 : win.isMaximized()) win.unmaximize();
  else win == null ? void 0 : win.maximize();
});
ipcMain.on("close", () => win == null ? void 0 : win.close());
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  createWindow();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
