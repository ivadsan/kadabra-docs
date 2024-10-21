import path from "path";
import { search, confirm, input } from "@inquirer/prompts";
import { createCategory, getCategories } from "./category.js";
import { PATH, FILE } from "../constants/app.js";
import { makePrettyURL } from "../utils/makePrettyURL.js";
import { validateInput } from "../utils/validateInput.js";
import { createFile } from "../utils/createFile.js";
import { createFolder } from "../utils/createFolder.js";

export const createDocument = async () => {
  console.clear();
  const categories = await getCategories();

  if (!categories.length) {
    const answer = await confirm({
      message: `Categories not found (Press Enter to continue, Ctrl+C to exit)`,
      default: true,
    });

    if (answer) {
      await createCategory();
    } else {
      console.log(`\n\u{1F7E1} Returning to menu\n`);
      return false;
    }
  }

  try {
    const categorySelected = await search({
      message: "Select a category or type to search for one",
      pageSize: 10,
      source: async (input) => {
        if (!input) {
          return categories.map((category) => ({
            name: category.value,
            value: category.key,
          }));
        }

        const filteredCategories = categories.filter((category) =>
          category.key.includes(input.toLowerCase())
        );

        return filteredCategories.map((category) => {
          return {
            name: category.value,
            value: category.key,
          };
        });
      },
    });

    if (categorySelected) {
      const value = await input({
        message: "Enter the name of the Document",
      });

      const isValid = validateInput(value);
      if (!isValid) return false;

      const prettyURL = makePrettyURL(value);
      const folderPathDocs = path.join(PATH.DOCS, categorySelected, prettyURL);
      const folderPathAssets = path.join(
        PATH.ASSETS,
        categorySelected,
        prettyURL
      );

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
        console.log("\n\u{1F7E1} Failed to create the Document\n");
        return false;
      }

      console.log(`\n\u2705 Document '${value}' created!\n`);
      return true;
    }
  } catch (err) {
    console.error(err);
  }
};
