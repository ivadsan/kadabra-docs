const { PATH } = require("../constants/app");
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
  const folderPath = `${PATH.DOCS}/${prettyURL}`;

  if (createFolder(folderPath)) {
    return createFile(folderPath, "README.md", `# ${value}`);
  }

  return false;
};

module.exports = createCategory;
