import fs from "fs";
import path, { join } from "path";
import { confirm, input } from "@inquirer/prompts";

import { PATH, FILE } from "../constants/app.js";
import { CONFIG } from "../constants/config.js";
import { validateFolder } from "../utils/validateFolder.js";
import { createFolder } from "../utils/createFolder.js";
import { makePrettyURL } from "../utils/makePrettyURL.js";
import { createFile } from "../utils/createFile.js";
import { validateInput } from "../utils/validateInput.js";

export const createCategory = async () => {
  const value = await input({
    message: "Enter the name of the category",
  });

  const isValid = validateInput(value);

  if (!isValid) return false;

  const prettyURL = makePrettyURL(value);
  const folderPathDocs = path.join(PATH.DOCS, prettyURL);
  const folderPathAssets = path.join(PATH.ASSETS, prettyURL);

  if (!createFolder(folderPathDocs)) {
    console.log(
      `\n\u{1F7E1} Failed to create the folder for docs: ${folderPathDocs}\n`
    );
    return false;
  }

  if (!createFolder(folderPathAssets)) {
    console.log(
      `\n\u{1F7E1} Failed to create the folder for assets: ${folderPathAssets}\n`
    );
    return false;
  }

  const fileCreated = createFile(
    folderPathDocs,
    FILE.DEFAULT_FILENAME,
    `# ${value}`
  );

  if (!fileCreated) {
    console.log("\n\u{1F7E1} Failed to create the category file\n");
    return false;
  }

  console.log(`\n\u2705 Category '${value}' created!\n`);
  return true;
};

export const getCategories = () => {
  try {
    const categories = fs.readdirSync(PATH.DOCS);
    if (!categories.length) return [];
    const categoriesList = categories
      .map((category) => {
        const categoryPath = path.join(
          PATH.DOCS,
          category,
          FILE.DEFAULT_FILENAME
        );
        if (!validateFolder(categoryPath)) return null;
        const categoryFile = fs.readFileSync(categoryPath, "utf-8");
        const fileFirstLine = categoryFile.split("\n")[0];
        const categoryName = fileFirstLine.startsWith("#")
          ? fileFirstLine.split("#")[1].trim()
          : "Untitled";
        return {
          key: category,
          value: categoryName,
        };
      })
      .filter(Boolean);

    categories.sort((a, b) => {
      if (a.value < b.value) return -1;
      if (a.value > b.value) return 1;
      return 0;
    });

    return categoriesList;
  } catch (err) {
    console.error(`\n\u274C ${err}\n`);
    return [];
  }
};

const paginateCategories = async (categories, pageSize = CONFIG.PAGE_SIZE) => {
  let currentPage = 0;

  const paginate = async () => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const currentCategories = categories.slice(start, end);

    console.clear();
    console.log(
      `Categories (Page ${currentPage + 1}/${Math.ceil(
        categories.length / pageSize
      )}):\n`
    );
    currentCategories.forEach((category, index) => {
      console.log(`${start + index + 1}. ${category.value}`);
    });

    if ((currentPage + 1) * pageSize < categories.length) {
      const answer = await confirm({
        message: `Show the next page? (Press Enter to continue, Ctrl+C to exit)\n`,
        default: true,
      });

      if (answer) {
        currentPage++;
        await paginate();
      } else {
        console.log(`\n\u{1F7E1} Finishing pagination\n`);
      }
    } else {
      console.log(`\n\u{1F7E1} No more categories to display.\n`);
    }
  };

  await paginate();
};

export const listCategories = async () => {
  const categories = getCategories();
  if (!categories.length) {
    console.log(
      `\n\u{1F7E1} No categories found. Please create a category to start.\n`
    );
  } else {
    await paginateCategories(categories);
  }
};

export const getCategoryDocs = (categoryKey) => {
  const categoryPath = path.join(PATH.DOCS, categoryKey);
  try {
    const documents = fs
      .readdirSync(categoryPath, "utf-8")
      .filter((document) => document != FILE.DEFAULT_FILENAME);
    if (!documents.length) return [];

    const listOfDocs = documents
      .map((document) => {
        try {
          const docPath = path.join(
            categoryPath,
            document,
            FILE.DEFAULT_FILENAME
          );

          if (!validateFolder(docPath)) return null;

          const docFile = fs.readFileSync(docPath, "utf-8");
          const fileFirstLine = docFile.split("\n")[0];
          const documentName = fileFirstLine.startsWith("#")
            ? fileFirstLine.split("#")[1].trim()
            : "Untitled";

          return {
            path: document,
            documentName,
          };
        } catch (err) {
          console.error(err);
          return null;
        }
      })
      .filter(Boolean);

    return listOfDocs;
  } catch (err) {
    console.error(err);
  }
};
