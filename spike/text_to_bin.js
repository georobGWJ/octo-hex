let words = "There were 42 magnificent elephants.";
let bin8words = Buffer.from(words, "utf8");
let bin16words = Buffer.from(words, "utf16le");


console.log('Original Words:\n')
console.log(words);

console.log('\nConverted to Buffers:\n')
console.log(bin8words);
console.log(bin16words);

console.log('\nBuffers Converted back to words:\n')
console.log(bin8words.toString());
console.log(bin16words.toString());
