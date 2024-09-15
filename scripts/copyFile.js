const fs = require("fs");
const path = require("path");

function copyFile(srcFile, destFolder) {
  const destFile = path.join(destFolder, path.basename(srcFile));
  try {
    fs.copyFileSync(srcFile, destFile);
    console.log(`File copied to ${destFile}`);
  } catch (err) {
    console.error("Error copying file:", err);
    return;
  }
}

module.exports = copyFile;
