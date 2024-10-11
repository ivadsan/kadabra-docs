const fs = require("fs");
const { PATH } = require("../constants/app");

function listCategories() {
  const categories = fs.readdirSync(PATH.DOCS);
  let categoriesList = [];

  if (categories.length > 0) {
    categories.forEach((category) => {
      let path = `${PATH.DOCS}/${category}/README.md`;
      let file = fs.readFileSync(path, "utf-8");
      categoriesList.push({
        key: category,
        value: file.split("\n")[0].split("#")[1].trim(),
      });
    });
    console.log(categoriesList);
  }
}

module.exports = listCategories;
