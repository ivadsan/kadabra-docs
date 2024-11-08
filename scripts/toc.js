import path from "path";
import fs from "fs";
import { getCategories, getCategoryDocs } from "../cli/category.js";
import { FILE, PATH } from "../constants/app.js";
import { validateFolder } from "../utils/validateFolder.js";
import { deleteRecursive } from "../utils/deleteRecursive.js";
import { createFolder } from "../utils/createFolder.js";
import { createFile } from "../utils/createFile.js";

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

const generateDocumentTOC = (categoryDocsPath, documentDocsPath) => {
  const documentPath = path.join(
    PATH.DOCS,
    categoryDocsPath,
    documentDocsPath,
    FILE.DEFAULT_FILENAME
  );

  const documentDirPath = path.join(
    PATH.DIRECTORY,
    categoryDocsPath,
    documentDocsPath
  );
  if (validateFolder(documentPath)) {
    try {
      const fileContent = fs.readFileSync(documentPath, "utf-8");
      const lines = fileContent.split("\n");

      const toc = [];
      let currentLevel1 = null;
      let currentLevel2 = null;

      lines.forEach((line) => {
        const trimmedLine = line.trim();

        if (trimmedLine.startsWith("# ")) {
          // Nivel 1
          currentLevel1 = { title: trimmedLine, topics: [] };
          toc.push(currentLevel1);
          currentLevel2 = null; // Reiniciamos niveles inferiores
        } else if (trimmedLine.startsWith("## ") && currentLevel1) {
          // Nivel 2
          currentLevel2 = { title: trimmedLine, topics: [] };
          currentLevel1.topics.push(currentLevel2);
        } else if (trimmedLine.startsWith("### ") && currentLevel2) {
          // Nivel 3
          currentLevel2.topics.push({ title: trimmedLine });
        }
      });
      const jsonData = JSON.stringify(toc, null, 2);
      createFile(documentDirPath, FILE.TOC, jsonData);
    } catch (error) {
      console.error("Error reading file for table of contents:", error);
      return;
    }
  }
  return;
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
            generateDocumentTOC(category.path, document.path);
          }
        });
      }
    }
  });
};

buildDirectoryTree();
