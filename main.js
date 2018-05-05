const {app, BrowserWindow, ipcMain} = require('electron');
const {download} = require('electron-dl');
const Store = require('electron-store');
const store = new Store();

let win;

function createWindow() {
  win = new BrowserWindow({
    minHeight: 500,
    minWidth: 500,
    width: store.get('winWidth', 800),
    height: store.get('winHeight', 600),
    frame: false,
    show: false
  });
  win.loadURL(`file://${__dirname}/dist/index.html`);
  win.setPosition(store.get('winXPos',400), store.get('winYPos',0));
  store.get('isMaximised') ? win.maximize() : win.restore();
}

app.on('ready', () => {
  createWindow();
  win.show();
  win.on('close', () => {
    let winSettings = {
      isMaximised: win.isMaximized(),
      winSize: win.getSize(),
      winPos: win.getPosition()
    };
    saveWinSettings(winSettings);
  });
});

ipcMain.on('download-btn', (e, args) => {
  download(BrowserWindow.getFocusedWindow(), args.url)
    .then(dl => console.log(dl.getSavePath()))
    .catch(console.error);
  console.log('download');
});

ipcMain.on('quit', (e, args) => {
  app.quit();
});

function saveWinSettings(settings) {
  console.log(settings);
  store.set('isMaximised', settings.isMaximised);
  store.set('winWidth', settings.winSize[0]);
  store.set('winHeight', settings.winSize[1]);
  store.set('winXPos', settings.winPos[0]);
  store.set('winYPos', settings.winPos[1]);
}
