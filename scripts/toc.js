import { getCategories, getCategoryDocs } from "../cli/category.js";

const mainToc = async () => {
  const categories = await getCategories();
  if (!categories.length) return [];
  const toc = categories.map((category) => {
    const documents = getCategoryDocs(category.key);
    return {
      path: category.key,
      categoryName: category.value,
      documents,
    };
  });
  return toc;
};

console.log(await mainToc());
