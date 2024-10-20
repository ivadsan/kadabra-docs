import fs from "fs";
import { PATH } from "../constants/app.js";

export const generateTOC = () => {
  console.time();
  console.log("Start reading files...");

  const files = fs.readdirSync(PATH.DOCS);
  let contents = [];

  if (files.length > 0) {
    console.log(files.length);
  }

  console.log("End reading files...");
  console.timeEnd();
};
