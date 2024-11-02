import fs from "fs";

export const deleteRecursive = (path) => {
  try {
    fs.rmSync(path, { recursive: true, force: true });
    console.log("\n\u2705 Folder successfully deleted.\n");
  } catch (error) {
    console.error("\n\u{1F7E1} Error deleting folder:", error, "\n");
  }
};
