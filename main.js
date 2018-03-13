const {app, BrowserWindow} = require('electron');

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
