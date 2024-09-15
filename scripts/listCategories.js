const fs = require("fs");
const { PATH } = require("../constants/app");

function listCategories() {
  const categories = fs.readdirSync(PATH.DOCS);

  if (categories.length > 0) {
    categories.forEach((category) => {
      console.log(category);
    });
  }
}

module.exports = listCategories;
