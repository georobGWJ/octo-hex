const {app, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('ready', () => {
  console.log('Electron is ready...');
  mainWindow = new BrowserWindow();     // Create the window
  mainWindow.webContents.loadURL(`file://${__dirname}/index.html`);   // Populate the window
  
});
