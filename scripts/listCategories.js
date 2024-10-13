const fs = require("fs");
const { PATH, FILE } = require("../constants/app");
const path = require("path");
const validateFolder = require("./validateFolder");

function getCategories() {
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
    return categoriesList;
  } catch (error) {
    console.error(error);
    return [];
  }
}

function listCategories() {
  return getCategories();
}

module.exports = { listCategories };
