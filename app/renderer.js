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
renderedView.addEventListener('keyup', () => {
  // console.log("key-up!");
  // var cursorPosition = renderedView.prop("selectionStart");
  var cursorPosition = renderedView.selectionStart;
  rawView.selectionStart = cursorPosition;
  //var x = renderedView.cols;
  //var y = renderedView.rows;
  //console.log(x + ", " + y + "\n");
  console.log(cursorPosition + "\n");
})

// Aila (Ayla?) bartender at lost n found
// Gabby - 3d printed candy sudo room
// Jenny, Rob - Sudo room delegates

// TODO: Add listener to get cursor location in rendered textbox and
// set cursor location in raw textbox to same

function binToString(binData) {
  var prettyString = '';
  for (var i = 0; i < binData.length; i++) {
    if (binData[i] == 0)
      // Append a space if char is null
      prettyString += ' '
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
// TODO: Add 'translator' boxes in control panel that show
// what the value would be if it's chars, if its an int,
// if it's a float, if it's a double, etc.

// TODO: Make the raw textarea uneditable but hightlight current hex value

// TODO: Write a function that updates the raw textarea if
// the rendered area is updated.

// TODO: Add logic so that when a file is opened, a copy of it
// is made and this is what's worked on to preserve the
// integrity of the original file.

ipcRenderer.on('file-opened', (event, file, raw) => {
  rawView.value = update_raw_textarea(raw); // raw.toString('hex');
  renderedView.value = binToString(raw);
  // console.log('ipcRenderer rendering!!!');
});
