import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { autoUpdater } from 'electron-updater'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Paths
process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

let win: BrowserWindow | null = null

// Function to create the window
function createWindow(bounds?: Electron.Rectangle) {
  const opts: Electron.BrowserWindowConstructorOptions = {
    width: bounds?.width ?? 1600,
    height: bounds?.height ?? 1080,
    ...(bounds && { x: bounds.x, y: bounds.y }),
    icon: path.join(__dirname, '..', 'src', 'assets', 'icons', 'arve_icon.ico'), // Windows
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#ffffff00',
      symbolColor: '#aaa',
      height: 31
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  }

  win = new BrowserWindow(opts)
  win.setMenuBarVisibility(false)

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  // send a message once renderer is ready
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // forward maximize/unmaximize events
  win.on('maximize', () => win?.webContents.send('window-state-changed', true))
  win.on('unmaximize', () => win?.webContents.send('window-state-changed', false))
}

// Recreate window on OS theme change to pick up new symbolColor
nativeTheme.on('updated', () => {
  if (!win) return
  const bounds = win.getBounds()
  win.close()
  win = null
  createWindow(bounds)
})

// IPC handlers for your custom window controls
ipcMain.on('minimize', () => win?.minimize())
ipcMain.on('maximize', () => {
  if (win?.isMaximized()) win.unmaximize()
  else win?.maximize()
})
ipcMain.on('close', () => win?.close())

// Standard macOS behavior
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// When the app is ready
app.whenReady().then(() => {
  createWindow()

  // Check for updates when app is ready
  autoUpdater.checkForUpdatesAndNotify()

  // Listen for update events
  autoUpdater.on('update-available', () => {
    win?.webContents.send('update_available')  // Notify renderer about available update
  })

  autoUpdater.on('update-downloaded', () => {
    win?.webContents.send('update_downloaded')  // Notify renderer about downloaded update
  })
})

// IPC handler to restart the app and install the update
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()  // Restart and install the update
})

// Set up the feed URL (GitHub releases, adjust accordingly)
autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'damir-zuy',
  repo: 'Arve',
  // optional: specify the URL of your release feed if it's not on GitHub
  // url: 'https://your-server.com/updates'
})
