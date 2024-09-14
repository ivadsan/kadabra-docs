const fs = require("fs");

function createFolder(path) {
  fs.mkdir(path, { recursive: true }, (err) => {
    if (err) {
      return console.error(err);
    }
    console.log("Directory created successfully!");
  });
}

module.exports = createFolder;
