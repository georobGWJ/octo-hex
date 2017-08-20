const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

let mainWindow = null;

app.on('ready', () => {
  // console.log('Electron is ready...');
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadURL(`file://${__dirname}/index.html`);   // Create and populate the window

  const getFileFromUser = exports.getFileFromUser = () => {
    const files = dialog.showOpenDialog(mainWindow, {     // Trigger file open dialog
      properties: ['openFile']                            // configuration object
    });
    if (!files) { return; }                               // return if no files

    const file = files[0];                                // pull the first file from the array
    const content = fs.readFileSync(file).toString();

    console.log(content);                                 // Log files to console
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    getFileFromUser();
  });
});
