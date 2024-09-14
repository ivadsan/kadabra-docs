const validateFolder = require("./validateFolder");
const copyFile = require("./copyFile");
const generateTOC = require("./generateTOC");
const { PATH } = require("../constants/app");

if (!validateFolder(PATH.DOCS)) {
  copyFile(PATH.EXAMPLE_FILE, PATH.EXAMPLE_FOLDER);
}

generateTOC();
