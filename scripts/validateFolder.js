const fs = require("fs");

function validateFolder(path) {
  return fs.existsSync(path);
}

module.exports = validateFolder;
