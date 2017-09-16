const { remote, ipcRenderer } = require('electron');          // allow remote to Main process
const mainProcess = remote.require('./main.js')               // link to Main process


// Caching DOM selectors
const rawView = document.querySelector('#raw-content');
const renderedView = document.querySelector('#rendered-content');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveFileButton = document.querySelector('#save-file');
const closeFileButton = document.querySelector('#close-file');
const charDisplay = document.querySelector('#form_char');
const intDisplay = document.querySelector('#form_int');
const floatDisplay = document.querySelector('#form_float');
const doubleDisplay = document.querySelector('#form_double');

// Globals
var globalRaw;

openFileButton.addEventListener('click', () => {
  mainProcess.getFileFromUser();
});

// TODO: Add listener to get cursor location in raw textbox and
// set cursor location in rendered textbox to same
renderedView.addEventListener('keyup', () => {
  // console.log("key-up!");
  // var cursorPosition = renderedView.prop("selectionStart");
  // TODO: Create working buffer that is separate from the raw buffer.
  // TODO: Add logic to the working buffer to update it based on
  //       updates of the rendered content.
  var cursorPosition = renderedView.selectionStart;
  rawView.selectionStart = cursorPosition;
  // rawView.value = update_raw_textarea();  // this won't currently work
  charDisplay.value = String.fromCharCode(globalRaw[cursorPosition]);
  // TODO: Consider adding Big Endian support
  intDisplay.value = globalRaw.readIntLE(cursorPosition, 4);
  floatDisplay.value = globalRaw.readFloatLE(cursorPosition);
  doubleDisplay.value = globalRaw.readDoubleLE(cursorPosition);
  // console.log(cursorPosition + "\n");
})

// Ayla - bartender at lost and found
// Gabby - 3d printed candy sudo room
// Jenny, Rob - Sudo room delegates

// TODO: Add listener to get cursor location in rendered textbox and
// set cursor location in raw textbox to same

function binToString(binData) {
  var prettyString = '';
  for (var i = 0; i < binData.length; i++) {
    if (binData[i] == 0)
      // Append a space if char is null
      prettyString += ' ';
    else if (binData[i] == 10)
      // Special char for newlines '\n'
      prettyString += String.fromCharCode(parseInt(172));
    else if (binData[i] == 9)
      // Special char for horizontal tabs '\t'
      prettyString += String.fromCharCode(parseInt(187));
    else
      // Append the actual character
      prettyString += String.fromCharCode(parseInt(binData[i]));
  }
  return prettyString;
}

// DONE: Add formatting function to print 'hex' version of
// raw content as arbitrary width (4, 8, 16, etc.)
// ex. 2f00 2b23 743c 7a6b
function update_raw_textarea(raw_data) {
  // TODO: Refactor this to make it more elegant
  var result = '';
  var j = 1;
  for (var i = 0; i < raw_data.length; i++) {
    if (j % 5 == 0) {
      result += '  ';
      i--;
    } else if (raw_data[i].toString(16) == 0) {
      result += '00 ';
    } else {
      if (raw_data[i].toString(16).length == 1) {
        result +=' ';
      }
      result += raw_data[i].toString(16);
      result += ' ';
    }
    j++;
  }
  return result;
}


// TODO: Make the raw textarea uneditable but hightlight current hex value

// TODO: Write a function that updates the raw textarea if
// the rendered area is updated.

// TODO: Add logic so that when a file is opened, a copy of it
// is made and this is what's worked on to preserve the
// integrity of the original file.

ipcRenderer.on('file-opened', (event, file, raw) => {
  globalRaw = raw;
  rawView.value = update_raw_textarea(raw); // raw.toString('hex');
  renderedView.value = binToString(raw);
  // console.log('ipcRenderer rendering!!!');
});
