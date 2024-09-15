const fs = require("fs");
const validateFolder = require("./validateFolder");

/**
 * Creates a folder at the specified path if it does not already exist.
 *
 * @param {string} path - The directory path where the folder should be created.
 * @returns {boolean} - Returns true if the folder was successfully created,
 *                      or false if the folder already exists or if an error occurred.
 */

function createFolder(path) {
  let isFolderCreated = false;
  if (!validateFolder(path)) {
    try {
      fs.mkdirSync(path, { recursive: true });
      isFolderCreated = true;
      console.log("Directory created successfully!");
    } catch (err) {
      return console.error(err);
    }
  }
  return isFolderCreated;
}

module.exports = createFolder;
