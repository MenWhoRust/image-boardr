const {app, BrowserWindow, ipcMain} = require('electron');
const {download} = require('electron-dl');
const Store = require('electron-store');
const windowStateKeeper = require('electron-window-state');

const store = new Store();

let win;
let mainWindowState;

function createWindow() {
  win = new BrowserWindow({
    backgroundColor: '#222222',
    minHeight: 768,
    minWidth: 1024,
    'x': mainWindowState.x,
    'y': mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    frame: false,
    show: false
  });
  win.loadURL(`file://${__dirname}/dist/index.html`);
}

app.on('ready', () => {
  mainWindowState = windowStateKeeper({
    defaultWidth: 500,
    defaultHeight: 500
  });
  createWindow();
  mainWindowState.manage(win);
  win.show();
  win.on('close', () => {
  });
});

ipcMain.on('download-btn', (e, args) => {
  download(BrowserWindow.getFocusedWindow(), args.url)
    .then(dl => console.log(dl.getSavePath()))
    .catch(console.error);
  console.log('download');
});

ipcMain.on('MaximiseMe', (e, args) => {
  if (!win.isMaximized()) {
    win.maximize()
  } else {
    win.restore();
  }
});

ipcMain.on('quit', (e, args) => {
  app.quit();
});
