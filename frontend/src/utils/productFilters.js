export const normalizeText = (value = "") => {
  const text =
    value && typeof value === "object"
      ? value.name ?? value.title ?? value.id ?? ""
      : value;

  return String(text ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
};

export const formatLabel = (value = "") =>
  value
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export const matchesDepartmentFilter = (product, department) => {
  if (!department) return true;

  const productDepartment = normalizeText(
    product.department ?? product.product_type,
  );
  const selectedDepartment = normalizeText(department);

  return (
    productDepartment === selectedDepartment ||
    (selectedDepartment === "kids" && productDepartment === "children")
  );
};

export const matchesCategoryFilter = (product, category) => {
  if (!category) return true;

  const normalizedCategory = normalizeText(category);
  const candidates = [
    product.subCategory,
    product.category_name,
    product.parent_category_name,
    product.category,
  ].filter(Boolean);

  return candidates.some(
    (value) => normalizeText(value) === normalizedCategory,
  );
};

export const matchesBrandFilter = (product, brand) => {
  if (!brand) return true;

  return normalizeText(product.brand_name ?? product.brand) === normalizeText(brand);
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
    const category = [
      product.subCategory,
      product.category_name,
      product.category,
    ].find((value) => typeof value === "string" && value);

    if (category) categories.add(category);
  });

  return Array.from(categories).sort((a, b) => a.localeCompare(b));
};
