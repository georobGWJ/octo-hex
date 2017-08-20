const { app, BrowserWindow, dialog } = require('electron');
const fs = require('fs');

let mainWindow = null;

app.on('ready', () => {
  // console.log('Electron is ready...');
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadURL(`file://${__dirname}/index.html`);   // Create and populate the window


  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    getFileFromUser();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

const openFile = (file) => {
  const raw = fs.readFileSync(file);
  mainWindow.webContents.send('file-opened', file, raw);
  console.log(raw);                                 // Log files to console
};

const getFileFromUser = exports.getFileFromUser = () => {
  const files = dialog.showOpenDialog(mainWindow, {     // Trigger file open dialog
    properties: ['openFile']                            // configuration object
  });
  if (files) { openFile(files[0]); }                    // return if no files
};
