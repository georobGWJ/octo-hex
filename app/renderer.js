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

ipcRenderer.on('file-opened', (event, file, raw) => {
  rawView.value = raw;
  renderedView.value = raw.toString();
});
