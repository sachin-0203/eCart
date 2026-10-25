import { useEffect, useRef, useState } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { getProductImageUrl } from "../api/productImagesApi";

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
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const previewUrls = useRef(new Set());

  useEffect(() => {
    setForm(createInitialForm(initialProduct));
    setExistingImages(
      (initialProduct?.images ?? []).map((image) => ({
        ...image,
        removed: false,
        replacementFile: null,
        replacementPreviewUrl: null,
      })),
    );
  }, [initialProduct]);

  useEffect(
    () => () => {
      previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrls.current.clear();
    },
    [],
  );

  const createPreviewUrl = (file) => {
    const url = URL.createObjectURL(file);
    previewUrls.current.add(url);
    return url;
  };

  const revokePreviewUrl = (url) => {
    if (!url) return;
    URL.revokeObjectURL(url);
    previewUrls.current.delete(url);
  };

  const updateField = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const addImages = (event) => {
    const selectedImages = Array.from(event.target.files ?? []);
    if (selectedImages.length) {
      const newImages = selectedImages.map((file) => ({
        file,
        previewUrl: createPreviewUrl(file),
        uploaded: false,
      }));
      setImages((current) => [...current, ...newImages]);
    }
    event.target.value = "";
  };

  const removeSelectedImage = (imageToRemove) => {
    revokePreviewUrl(imageToRemove.previewUrl);
    setImages((current) =>
      current.filter((image) => image !== imageToRemove),
    );
  };

  const selectReplacement = (imageId, file) => {
    if (!file) return;
    const previewUrl = createPreviewUrl(file);
    const previousImage = existingImages.find((image) => image.id === imageId);
    revokePreviewUrl(previousImage?.replacementPreviewUrl);
    setExistingImages((current) =>
      current.map((image) => {
        if (image.id !== imageId) return image;
        return { ...image, replacementFile: file, replacementPreviewUrl: previewUrl };
      }),
    );
  };

  const markImageUploaded = (uploadedFile, uploadedImage) => {
    const uploadedPreview = images.find((image) => image.file === uploadedFile);
    revokePreviewUrl(uploadedPreview?.previewUrl);
    setImages((current) =>
      current.filter((image) => image.file !== uploadedFile),
    );
    if (uploadedImage) {
      setExistingImages((current) => [
        ...current,
        {
          ...uploadedImage,
          removed: false,
          replacementFile: null,
          replacementPreviewUrl: null,
        },
      ]);
    }
  };

  const markImageReplaced = (imageId, updatedImage) => {
    const replacedImage = existingImages.find((image) => image.id === imageId);
    revokePreviewUrl(replacedImage?.replacementPreviewUrl);
    setExistingImages((current) =>
      current.map((image) => {
        if (image.id !== imageId) return image;
        return {
          ...updatedImage,
          removed: false,
          replacementFile: null,
          replacementPreviewUrl: null,
        };
      }),
    );
  };

  const markImageRemoved = (imageId) => {
    setExistingImages((current) => current.filter((image) => image.id !== imageId));
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

    await onSubmit(
      {
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
          .filter(
            (size, index, availableSizes) => availableSizes.indexOf(size) === index,
          ),
        short_description: form.short_description.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        old_price: Number(form.old_price),
        discount_percentage: Number(form.discount_percentage),
        rating: Number(form.rating),
        review_count: Number(form.review_count),
        stock: Number(form.stock),
        in_stock: form.in_stock,
      },
      images.filter((image) => !image.uploaded).map((image) => image.file),
      markImageUploaded,
      {
        replacements: existingImages
          .filter((image) => !image.removed && image.replacementFile)
          .map(({ id, replacementFile }) => ({ id, file: replacementFile })),
        removedImageIds: existingImages
          .filter((image) => image.removed)
          .map((image) => image.id),
        markImageReplaced,
        markImageRemoved,
      },
    );
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
          <h2 className="text-lg font-bold text-slate-900">Product images</h2>
          <p className="mt-1 text-sm text-slate-500">
            Select the front image first. Images upload in the order listed below.
          </p>
        </div>
        <label className="block text-sm font-semibold text-slate-700">
          Choose product images
          <input
            className={inputClass}
            type="file"
            accept="image/*"
            multiple
            onChange={addImages}
          />
        </label>
        {(existingImages.length > 0 || images.length > 0) && (
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {existingImages.map((image) => {
              const activeImages = existingImages.filter(
                (item) => !item.removed,
              );
              const activeIndex = activeImages.indexOf(image);
              const previewUrl =
                image.replacementPreviewUrl ||
                getProductImageUrl(image.image);
              return (
                <li
                  key={`existing-${image.id}`}
                  className={`overflow-hidden rounded-xl border ${
                    image.removed ? "border-red-200 opacity-60" : "border-slate-200"
                  }`}
                >
                  <img
                    src={previewUrl}
                    alt={`${form.title || "Product"} ${image.replacementFile ? "replacement preview" : "image preview"}`}
                    className="h-44 w-full bg-slate-50 object-contain"
                  />
                  <div className="space-y-2 p-3">
                    <p className="text-sm font-semibold text-slate-800">
                      {image.removed
                        ? "Marked for removal"
                        : activeIndex === 0
                          ? "Front image"
                          : `Image ${activeIndex + 1}`}
                    </p>
                    {image.replacementFile && (
                      <p className="truncate text-xs text-slate-500">
                        Replacement: {image.replacementFile.name}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {image.removed ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExistingImages((current) =>
                              current.map((item) =>
                                item.id === image.id
                                  ? { ...item, removed: false }
                                  : item,
                              ),
                            )
                          }
                          className="text-xs font-semibold text-cyan-700 hover:text-cyan-900"
                        >
                          Undo remove
                        </button>
                      ) : (
                        <>
                          <label className="cursor-pointer text-xs font-semibold text-cyan-700 hover:text-cyan-900">
                            Replace image
                            <input
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={(event) => {
                                selectReplacement(
                                  image.id,
                                  event.target.files?.[0],
                                );
                                event.target.value = "";
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setExistingImages((current) =>
                                current.map((item) =>
                                  item.id === image.id
                                    ? { ...item, removed: true }
                                    : item,
                                ),
                              )
                            }
                            className="text-xs font-semibold text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
            {images.map(({ file, previewUrl }, index) => {
              const frontImage =
                existingImages.every((image) => image.removed) && index === 0;
              const imageNumber =
                existingImages.filter((image) => !image.removed).length +
                index +
                1;
              return (
                <li
                  key={`${file.name}-${file.lastModified}-${index}`}
                  className="overflow-hidden rounded-xl border border-slate-200"
                >
                  <img
                    src={previewUrl}
                    alt={`${form.title || "Product"} upload preview`}
                    className="h-44 w-full bg-slate-50 object-contain"
                  />
                  <div className="flex items-center justify-between gap-2 p-3">
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-800">
                        {frontImage ? "Front image" : `Image ${imageNumber}`}
                      </span>
                      <span className="block truncate text-xs text-slate-500">
                        {file.name}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        removeSelectedImage(images[index])
                      }
                      className="shrink-0 text-xs font-semibold text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
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
