import {
  matchesDepartmentFilter,
  normalizeText,
} from "./productFilters";

const getCategoryId = (category) =>
  category && typeof category === "object" ? category.id : category;

export const getProductCategories = (
  categories,
  products,
  department,
) => {
  const scopedProducts = products.filter((product) =>
    matchesDepartmentFilter(product, department),
  );
  const assignedIds = new Set();
  const assignedNames = new Set();

  scopedProducts.forEach((product) => {
    const categoryId = getCategoryId(product.category);
    if (categoryId !== null && categoryId !== undefined) {
      assignedIds.add(String(categoryId));
    }

    [
      product.subCategory,
      product.category_name,
      product.parent_category_name,
      typeof product.category === "string" ? product.category : "",
    ].forEach((name) => {
      if (typeof name === "string" && name) {
        assignedNames.add(normalizeText(name));
      }
    });
  });

  const availableIds = new Set(assignedIds);
  categories.forEach((category) => {
    if (
      assignedIds.has(String(category.id)) &&
      category.parent !== null &&
      category.parent !== undefined
    ) {
      availableIds.add(String(category.parent));
    }
  });

  return categories.filter(
    (category) =>
      availableIds.has(String(category.id)) ||
      assignedNames.has(normalizeText(category.name)),
  );
};
