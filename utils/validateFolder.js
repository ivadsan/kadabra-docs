import fs from "fs";

export const validateFolder = (path) => {
  return fs.existsSync(path);
};
