import { copyFile } from "../utils/copyFile.js";
import { createFolder } from "../utils/createFolder.js";
import { generateTOC } from "./generateTOC.js";
import { PATH } from "../constants/app.js";
import { validateFolder } from "../utils/validateFolder.js";

if (!validateFolder(PATH.DOCS)) {
  createFolder(PATH.EXAMPLE_FOLDER);
  copyFile(PATH.EXAMPLE_FILE, PATH.EXAMPLE_FOLDER);
}

try {
  generateTOC();
} catch (err) {
  console.error("Error generating the table of contents:", err);
}
