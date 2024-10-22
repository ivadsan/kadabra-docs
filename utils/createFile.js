import fs from "fs";
import { validateFolder } from "../utils/validateFolder.js";
import path from "path";

export function createFile(folderPath, fileName, fileContent) {
  let isFileCreated = false;
  if (validateFolder(folderPath)) {
    try {
      const filePath = path.join(folderPath, fileName);
      fs.writeFileSync(filePath, fileContent);
      isFileCreated = true;
    } catch (err) {
      console.error(err);
    }
  }
  return isFileCreated;
}
