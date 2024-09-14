const fs = require("fs");
const { PATH } = require("../constants/app");

function generateTOC() {
  console.time();
  console.log("Start reading files...");

  const files = fs.readdirSync(PATH.DOCS);
  let contents = [];

  if (files.length > 0) {
    console.log(files.length);
  }

  console.log("End reading files...");
  console.timeEnd();
}

module.exports = generateTOC;
