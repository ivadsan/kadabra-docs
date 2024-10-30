import { getCategories, getCategoryDocs } from "../cli/category.js";
import { FILE, PATH } from "../constants/app.js";
import { validateFolder } from "../utils/validateFolder.js";
import { deleteRecursive } from "../utils/deleteRecursive.js";
import { createFolder } from "../utils/createFolder.js";
import { createFile } from "../utils/createFile.js";

const mainToc = () => {
  const categories = getCategories();
  if (!categories.length) return [];
  const toc = categories.map((category) => {
    const documents = getCategoryDocs(category.key);
    return {
      path: category.key,
      categoryName: category.value,
      documents,
    };
  });

  if (validateFolder(PATH.DIRECTORY)) {
    deleteRecursive(PATH.DIRECTORY);
  }
  createFolder(PATH.DIRECTORY);

  const jsonData = JSON.stringify(toc, null, 2);
  createFile(PATH.DIRECTORY, FILE.DIR_MAIN, jsonData);
};

mainToc();
