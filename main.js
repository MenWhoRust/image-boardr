const {app, BrowserWindow, ipcMain} = require('electron');
const {download} = require('electron-dl');

let win;

function createWindow() {
  win = new BrowserWindow({
    minHeight: 500,
    minWidth: 500,
    frame: false
  });
  win.loadURL(`file://${__dirname}/dist/index.html`);
}

app.on('ready', () => {
  createWindow();
});

ipcMain.on('download-btn', (e, args) => {
  download(BrowserWindow.getFocusedWindow(), args.url)
    .then(dl => console.log(dl.getSavePath()))
    .catch(console.error);
  console.log('download');
});
