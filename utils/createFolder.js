import fs from "fs";
import { validateFolder } from "./validateFolder.js";

/**
 * Creates a folder at the specified path if it does not already exist.
 *
 * @param {string} path - The directory path where the folder should be created.
 * @returns {boolean} - Returns true if the folder was successfully created,
 *                      or false if the folder already exists or if an error occurred.
 */

export const createFolder = (path) => {
  let isFolderCreated = false;
  if (!validateFolder(path)) {
    try {
      fs.mkdirSync(path, { recursive: true });
      isFolderCreated = true;
    } catch (err) {
      console.error(`\n\u274C ${err}\n`);
    }
  }
  return isFolderCreated;
};
