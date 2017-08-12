const fs = require('fs');
const crypto = require('crypto');  // not needed for files, just for bin example

// Write some UTF8 encoded stuff (UTF8 is the default)
let utf8stream = fs.createWriteStream('utf8.txt');
utf8stream.on('finish', () => {
  console.log('utf8.txt has been written\n')
});
utf8stream.write('UTF-8 is really, really great!\n');
utf8stream.write('That\'s why it is the default.\n' );
utf8stream.end();

// Write some UTF16 encoded stuff
let utf16stream = fs.createWriteStream('utf16.txt');
utf16stream.on('finish', () => {
  console.log('utf16.txt has been written\n')
});
utf16stream.write('UTF-16 is wide chars?\n');
utf16stream.write('We\'ll know soon!\n' );
utf16stream.end();

// Try to write some binary
let binstream = fs.createWriteStream('best.bin');
binstream.on('finish', () => {
  console.log('best.bin has been written\n')
});
// Create a random buffer of 100 bytes
let buffer = crypto.randomBytes(100);
binstream.write(buffer);
// Another way
binstream.write(crypto.randomBytes(100));
binstream.end();
