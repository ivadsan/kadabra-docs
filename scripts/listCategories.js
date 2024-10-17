const fs = require("fs");
const { PATH, FILE } = require("../constants/app");
const path = require("path");
const validateFolder = require("./validateFolder");
const { confirm } = require("@inquirer/prompts");

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
  } catch (err) {
    console.error(`\n\u274C ${err}\n`);
    return [];
  }
}

async function paginateCategories(categories, pageSize = 5) {
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
}

async function listCategories() {
  const categories = getCategories();
  if (!categories.length) {
    console.log(
      `\n\u{1F7E1} No categories found. Please create a category to start.\n`
    );
  } else {
    await paginateCategories(categories);
  }
}

module.exports = { listCategories };
