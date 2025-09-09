const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, "../../queue.js"), "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  //   console.log("File content:", data);
});
fs.readdir(path.join(__dirname, "../../"), (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }
  console.log("Files in directory:", files);
});
console.log("File read successfully!");
//doubles a number and pass to callback and print
function doubleNumber(num, callback) {
  const doubleNumber = num * 2;
  callback(doubleNumber);
}
doubleNumber(5, (result) => {
  console.log(result, "double of number");
});

// create function downloadFile(fileName,callback) that simulates downloading a file with a
// setTimeout after 2 seconds
// and calls the callback with the file name after 2 seconds.

function downloadFile(fileName, callback) {
  setTimeout(() => {
    console.log(`Downloading ${fileName}...`);
    callback(fileName);
    callback;
  }, 2000);
}
downloadFile("example.txt", (fileName) => {
  console.log(`File ${fileName} downloaded successfully!`);
});

function addNumbers(a, b, callback) {
  setTimeout(() => {
    console.log(`Adding ${a} and ${b}...`);
    const sum = a + b;
    callback(sum);
  }, 2000);
}

addNumbers(5, 10, (result) => {
  console.log(`The sum is: ${result}`);
});
