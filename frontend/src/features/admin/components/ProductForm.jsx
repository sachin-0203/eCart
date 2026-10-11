import { useState } from "react";
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
  { name: "title", label: "Product name", required: true, maxLength: 200 },
  { name: "slug", label: "URL slug", required: true, maxLength: 200 },
  { name: "brand", label: "Brand", required: true, maxLength: 50 },
  { name: "category", label: "Category", required: true, maxLength: 100 },
  {
    name: "sub_category",
    label: "Subcategory",
    required: true,
    maxLength: 200,
  },
];

const numberFields = [
  { name: "price", label: "Price", min: 0, step: "0.01", required: true },
  {
    name: "old_price",
    label: "Compare-at price",
    min: 0,
    step: "0.01",
    required: true,
  },
  {
    name: "discount_percentage",
    label: "Discount (%)",
    min: 0,
    max: 100,
    step: "0.01",
    required: true,
  },
  {
    name: "rating",
    label: "Rating (0–5)",
    min: 0,
    max: 5,
    step: "0.1",
    required: true,
  },
  {
    name: "review_count",
    label: "Review count",
    min: 0,
    step: 1,
    required: true,
  },
  { name: "stock", label: "Inventory quantity", min: 0, step: 1, required: true },
];

export default function ProductForm({
  initialProduct,
  isSaving,
  onSubmit,
  submitLabel,
}) {
  const [form, setForm] = useState(() => ({
    title: initialProduct?.title ?? "",
    slug: initialProduct?.slug ?? "",
    brand: initialProduct?.brand ?? "",
    category: initialProduct?.category ?? "",
    sub_category: initialProduct?.sub_category ?? "",
    price: initialProduct?.price ?? "",
    old_price: initialProduct?.old_price ?? "",
    discount_percentage: initialProduct?.discount_percentage ?? 0,
    rating: initialProduct?.rating ?? 0,
    review_count: initialProduct?.review_count ?? 0,
    short_description: initialProduct?.short_description ?? "",
    description: initialProduct?.description ?? "",
    stock: initialProduct?.stock ?? 0,
    in_stock: initialProduct?.in_stock ?? true,
    featured: initialProduct?.featured ?? false,
    bestseller: initialProduct?.bestseller ?? false,
  }));
  const [errors, setErrors] = useState({});

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
