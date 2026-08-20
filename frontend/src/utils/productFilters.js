export const normalizeText = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();

export const formatLabel = (value = "") =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const matchesDepartmentFilter = (product, department) => {
  if (!department) return true;

  return normalizeText(product.department) === normalizeText(department);
};

export const matchesCategoryFilter = (product, category) => {
  if (!category) return true;

  const normalizedCategory = normalizeText(category);
  const candidates = [product.subCategory, product.category].filter(Boolean);

  return candidates.some(
    (value) => normalizeText(value) === normalizedCategory,
  );
};

export const matchesBrandFilter = (product, brand) => {
  if (!brand) return true;

  return normalizeText(product.brand) === normalizeText(brand);
};

export const filterProducts = (
  products,
  { department, category, brand } = {},
) =>
  products.filter(
    (product) =>
      matchesDepartmentFilter(product, department) &&
      matchesCategoryFilter(product, category) &&
      matchesBrandFilter(product, brand),
  );

export const getDepartmentCategories = (products, department) => {
  const scopedProducts = department
    ? products.filter((product) => matchesDepartmentFilter(product, department))
    : products;

  const categories = new Set();

  scopedProducts.forEach((product) => {
    if (product.subCategory) categories.add(product.subCategory);
  });

  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};
