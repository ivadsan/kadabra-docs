import fs from "fs";

export const deleteRecursive = (path) => {
  try {
    fs.rmSync(path, { recursive: true, force: true });
    console.log("Folder successfully deleted.");
  } catch (error) {
    console.error("Error deleting folder:", error);
  }
};
