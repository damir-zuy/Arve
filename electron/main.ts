import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const require = createRequire(import.meta.url)
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

function createWindow(bounds?: Electron.Rectangle) {
  const opts: Electron.BrowserWindowConstructorOptions = {
    width: bounds?.width ?? 1600,
    height: bounds?.height ?? 1080,
    // preserve last position if available
    ...(bounds && { x: bounds.x, y: bounds.y }),
    icon: path.join(__dirname, '..', 'src', 'assets', 'icons', 'arve_icon.ico'), // Windows
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#ffffff00',
      symbolColor: '#aaa',
      height: 31,
      vibrancy: 'dark', // 'light' | 'dark' | 'medium-light' | 'ultra-dark'
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
  win.on('maximize',   () => win?.webContents.send('window-state-changed', true))
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
  else                   win?.maximize()
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

app.whenReady().then(() => {
  createWindow()
})
