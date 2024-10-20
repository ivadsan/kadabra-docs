import fs from "fs";
import path from "path";

export const copyFile = (srcFile, destFolder) => {
  const destFile = path.join(destFolder, path.basename(srcFile));
  try {
    fs.copyFileSync(srcFile, destFile);
    console.log(`File copied to ${destFile}`);
  } catch (err) {
    console.error("Error copying file:", err);
    return;
  }
};
