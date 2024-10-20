import fs from "fs";
import { validateFolder } from "../utils/validateFolder.js";

export function createFile(folderPath, fileName, fileContent) {
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
