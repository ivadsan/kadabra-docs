import { getCategories, getCategoryDocs } from "../cli/category.js";
import { FILE, PATH } from "../constants/app.js";
import { validateFolder } from "../utils/validateFolder.js";
import { deleteRecursive } from "../utils/deleteRecursive.js";
import { createFolder } from "../utils/createFolder.js";
import { createFile } from "../utils/createFile.js";
import path from "path";

const generateCategoryToc = (categories) => {
  return categories.map((category) => {
    const documents = getCategoryDocs(category.key);
    return {
      path: category.key,
      categoryName: category.value,
      documents,
    };
  });
};

const buildDirectoryTree = () => {
  const categories = getCategories();
  if (!categories.length) return [];

  const toc = generateCategoryToc(categories);

  if (validateFolder(PATH.DIRECTORY)) {
    deleteRecursive(PATH.DIRECTORY);
  }
  createFolder(PATH.DIRECTORY);

  const jsonData = JSON.stringify(toc, null, 2);
  createFile(PATH.DIRECTORY, FILE.DIR_MAIN, jsonData);

  toc.map((category) => {
    const categoryPath = path.join(PATH.DIRECTORY, category.path);
    const { documents } = category;
    if (createFolder(categoryPath)) {
      if (documents.length > 0) {
        documents.map((document) => {
          const documentPath = path.join(categoryPath, document.path);
          if (createFolder(documentPath)) {
            //
          }
        });
      }
    }
  });
};

buildDirectoryTree();
