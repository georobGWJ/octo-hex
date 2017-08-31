const { remote, ipcRenderer } = require('electron');          // allow remote to Main process
const mainProcess = remote.require('./main.js')               // link to Main process


// Caching DOM selectors
const rawView = document.querySelector('#raw-content');
const renderedView = document.querySelector('#rendered-content');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveFileButton = document.querySelector('#save-file');
const closeFileButton = document.querySelector('#close-file');

openFileButton.addEventListener('click', () => {
  mainProcess.getFileFromUser();
});

// TODO: Add listener to get cursor location in raw textbox and
// set cursor location in rendered textbox to same

// TODO: Add listener to get cursor location in rendered textbox and
// set cursor location in raw textbox to same

// TODO: Add formatting function to print 'hex' version of
// raw content as arbitrary width (4, 8, 16, etc.)
// ex. 2f00 2b23 743c 7a6b

// TODO: Add 'translator' boxes in control panel that show
// what the value would be if it's chars, if its an int,
// if it's a float, if it's a double, etc.

// TODO: Make the raw textarea uneditable

// TODO: Write a function that updates the raw textarea if
// the rendered area is updated.

// TODO: Add logic so that when a file is opened, a copy of it
// is made and this is what's worked on to preserve the
// integrity of the original file.

ipcRenderer.on('file-opened', (event, file, raw) => {
  rawView.value = raw.toString('hex');
  renderedView.value = raw.toString();
  console.log('ipcRenderer rendering!!!');
});
