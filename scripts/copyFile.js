const fs = require("fs");
const path = require("path");

function copyFile(srcFile, destFolder) {
  if (!fs.existsSync(destFolder)) {
    fs.mkdirSync(destFolder, { recursive: true });
  }

  const destFile = path.join(destFolder, path.basename(srcFile));

  fs.copyFile(srcFile, destFile, (err) => {
    if (err) {
      console.error("Error copying file:", err);
      return;
    }
    console.log(`File copied to ${destFile}`);
  });
}

module.exports = copyFile;
