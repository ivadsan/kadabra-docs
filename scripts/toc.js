import { getCategories } from "../cli/category.js";

export const mainToc = async () => {
  const categories = await getCategories();
};
