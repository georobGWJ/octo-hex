const { app, BrowserWindow } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  console.log('Electron is ready...');
  mainWindow.loadURL(`file://${__dirname}/index.html`);   // Create and populate the window

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
