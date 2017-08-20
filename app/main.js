const { app, BrowserWindow, dialog } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  // console.log('Electron is ready...');
  mainWindow = new BrowserWindow({ show: false });
  mainWindow.loadURL(`file://${__dirname}/index.html`);   // Create and populate the window

  const getFileFromUser = () => {
    const files = dialog.showOpenDialog({                 // Trigger file open dialog
      properties: ['openFile']                            // configuration object
    });
    if (!files) { return; }                               // return if no files

    console.log(files);                                   // Log files to console
  }


  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    getFileFromUser();
  });
});
