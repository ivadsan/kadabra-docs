const fs = require("fs");
const validateFolder = require("./validateFolder");

function createFile(folderPath, fileName, fileContent) {
  let isFileCreated = false;
  if (validateFolder(folderPath)) {
    try {
      const filePath = `${folderPath}/${fileName}`;
      fs.writeFileSync(filePath, fileContent);
      isFileCreated = true;
    } catch (err) {
      console.error(err);
    }
  }
  return isFileCreated;
}

module.exports = createFile;
