const { PATH, FILE } = require("../constants/app");
const createFolder = require("./createFolder");
const makePrettyURL = require("./makePrettyURL");
const createFile = require("./createFile");

const createCategory = (value) => {
  if (!value) {
    console.log("The field cannot be empty");
    return false;
  }
  if (value.length > 100) {
    console.log("Category must be less than 100 characters");
    return false;
  }
  const prettyURL = makePrettyURL(value);
  const folderPathDocs = `${PATH.DOCS}/${prettyURL}`;
  const folderPathAssets = `${PATH.ASSETS}/${prettyURL}`;

  if (createFolder(folderPathDocs)) {
    if (createFolder(folderPathAssets)) {
      return createFile(folderPathDocs, FILE.DEFAULT_FILENAME, `# ${value}`);
    }
  }

  return false;
};

module.exports = createCategory;
