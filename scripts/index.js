const copyFile = require("./copyFile");
const createFolder = require("./createFolder");
const generateTOC = require("./generateTOC");
const { PATH } = require("../constants/app");
const validateFolder = require("./validateFolder");

if (!validateFolder(PATH.DOCS)) {
  createFolder(PATH.EXAMPLE_FOLDER);
  copyFile(PATH.EXAMPLE_FILE, PATH.EXAMPLE_FOLDER);
}

generateTOC();
