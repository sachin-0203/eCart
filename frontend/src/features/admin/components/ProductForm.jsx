import { useEffect, useState } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { Link } from "react-router-dom";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10";

function Field({ label, name, error, ...props }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input className={inputClass} name={name} {...props} />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function Toggle({ label, name, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 accent-cyan-600"
      />
    </label>
  );
}

const textFields = [
  {
    name: "title",
    label: "Product name",
    placeholder: "e.g. Classic Cotton T-Shirt",
    required: true,
    maxLength: 200,
  },
  {
    name: "slug",
    label: "URL slug",
    placeholder: "e.g. classic-cotton-t-shirt",
    required: true,
    maxLength: 200,
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "e.g. Roadster",
    required: true,
    maxLength: 50,
  },
  {
    name: "category",
    label: "Category",
    placeholder: "e.g. Fashion",
    required: true,
    maxLength: 100,
  },
  {
    name: "sub_category",
    label: "Subcategory",
    placeholder: "e.g. T-Shirts",
    required: true,
    maxLength: 200,
  },
];

const numberFields = [
  {
    name: "price",
    label: "Price",
    placeholder: "e.g. 499.00",
    min: 0,
    step: "0.01",
    required: true,
  },
  {
    name: "old_price",
    label: "Compare-at price",
    placeholder: "e.g. 799.00",
    min: 0,
    step: "0.01",
    required: true,
  },
  {
    name: "discount_percentage",
    label: "Discount (%)",
    placeholder: "e.g. 37.50",
    min: 0,
    max: 100,
    step: "0.01",
    required: true,
  },
  {
    name: "rating",
    label: "Rating (0–5)",
    placeholder: "e.g. 4.5",
    min: 0,
    max: 5,
    step: "0.1",
    required: true,
  },
  {
    name: "review_count",
    label: "Review count",
    placeholder: "e.g. 128",
    min: 0,
    step: 1,
    required: true,
  },
  {
    name: "stock",
    label: "Inventory quantity",
    placeholder: "e.g. 25",
    min: 0,
    step: 1,
    required: true,
  },
];

const createInitialForm = (product) => ({
  title: product?.title ?? "",
  slug: product?.slug ?? "",
  brand: product?.brand ?? "",
  category: product?.category ?? "",
  sub_category: product?.sub_category ?? "",
  product_type: product?.product_type ?? "",
  sizes: Array.isArray(product?.sizes) ? product.sizes.join(", ") : "",
  price: product?.price ?? "",
  old_price: product?.old_price ?? "",
  discount_percentage: product?.discount_percentage ?? "",
  rating: product?.rating ?? "",
  review_count: product?.review_count ?? "",
  short_description: product?.short_description ?? "",
  description: product?.description ?? "",
  stock: product?.stock ?? "",
  in_stock: product?.in_stock ?? true,
  featured: product?.featured ?? false,
  bestseller: product?.bestseller ?? false,
});

export default function ProductForm({
  initialProduct,
  isSaving,
  onSubmit,
  submitLabel,
}) {
  const [form, setForm] = useState(() => createInitialForm(initialProduct));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(createInitialForm(initialProduct));
  }, [initialProduct]);

  const updateField = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.title.trim()) nextErrors.title = "Product name is required.";
    if (!form.slug.trim()) nextErrors.slug = "URL slug is required.";
    if (!form.short_description.trim()) {
      nextErrors.short_description = "Short description is required.";
    }
    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    await onSubmit({
      ...form,
      title: form.title.trim(),
      slug: form.slug.trim(),
      brand: form.brand.trim(),
      category: form.category.trim(),
      sub_category: form.sub_category.trim(),
      product_type: form.product_type,
      sizes: form.sizes
        .split(",")
        .map((size) => size.trim())
        .filter(Boolean)
        .filter((size, index, availableSizes) => availableSizes.indexOf(size) === index),
      short_description: form.short_description.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      old_price: Number(form.old_price),
      discount_percentage: Number(form.discount_percentage),
      rating: Number(form.rating),
      review_count: Number(form.review_count),
      stock: Number(form.stock),
      in_stock: form.in_stock,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">Product details</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add the name, URL, and catalog placement for this product.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {textFields.map((field) => (
            <Field
              key={field.name}
              {...field}
              value={form[field.name]}
              onChange={updateField}
              error={errors[field.name]}
            />
          ))}
          <label className="block text-sm font-semibold text-slate-700">
            Product type
            <select
              className={inputClass}
              name="product_type"
              value={form.product_type}
              onChange={updateField}
            >
              <option value="">Not specified / not applicable</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="children">Children</option>
              <option value="unisex">Unisex</option>
            </select>
          </label>
          <div>
            <Field
              label="Available sizes (optional)"
              name="sizes"
              placeholder="e.g. XS, S, M, L, XL"
              value={form.sizes}
              onChange={updateField}
            />
            <p className="mt-1 text-xs font-normal text-slate-500">
              Enter each size separated by a comma. Leave blank if sizes do not apply.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">Pricing & inventory</h2>
          <p className="mt-1 text-sm text-slate-500">
            Set the current price, review metrics, and available stock.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {numberFields.map((field) => (
            <Field
              key={field.name}
              {...field}
              type="number"
              value={form[field.name]}
              onChange={updateField}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900">Descriptions & visibility</h2>
          <p className="mt-1 text-sm text-slate-500">
            Help shoppers understand the product and control its storefront labels.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
            Short description
            <textarea
              className={inputClass}
              name="short_description"
              placeholder="e.g. Soft, breathable cotton tee for comfortable everyday wear."
              value={form.short_description}
              onChange={updateField}
              rows={2}
              required
            />
            {errors.short_description && (
              <span className="mt-1 block text-xs text-red-600">
                {errors.short_description}
              </span>
            )}
          </label>
          <label className="block text-sm font-semibold text-slate-700 sm:col-span-2">
            Full description
            <textarea
              className={inputClass}
              name="description"
              placeholder="Describe the product’s materials, fit, key features, and care instructions."
              value={form.description}
              onChange={updateField}
              rows={5}
              required
            />
            {errors.description && (
              <span className="mt-1 block text-xs text-red-600">
                {errors.description}
              </span>
            )}
          </label>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Toggle
            label="In stock"
            name="in_stock"
            checked={form.in_stock}
            onChange={updateField}
          />
          <Toggle
            label="Featured"
            name="featured"
            checked={form.featured}
            onChange={updateField}
          />
          <Toggle
            label="Bestseller"
            name="bestseller"
            checked={form.bestseller}
            onChange={updateField}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse justify-between gap-3 sm:flex-row">
        <Link
          to="/admin/products"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? (
            <LoaderCircle className="animate-spin" size={17} />
          ) : (
            <Save size={17} />
          )}
          {isSaving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
