import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Eye,
  FolderTree,
  ImagePlus,
  LoaderCircle,
  Pencil,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";
import { toast } from "sonner";
import ImageUploadField from "../../components/ImageUploadField";
import {
  createCategory,
  getCategories,
  getCategoryImageUrl,
  updateCategory,
} from "../../api/categoryApi";

const initialForm = {
  name: "",
  parent: "",
  is_active: true,
};

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [editingForm, setEditingForm] = useState({
    name: "",
    parent: "",
    is_active: true,
  });
  const [editingImage, setEditingImage] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [loadError, setLoadError] = useState("");

  const loadCategories = useCallback(async ({ signal } = {}) => {
    setIsLoading(true);
    setLoadError("");

    try {
      const data = await getCategories({ includeInactive: true });
      setCategories(data);
    } catch (error) {
      if (!signal?.aborted) setLoadError(error.message);
    } finally {
      if (!signal?.aborted) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadCategories({ signal: controller.signal });

    return () => controller.abort();
  }, [loadCategories]);

  const activeCategoryCount = useMemo(
    () => categories.filter((category) => category.is_active).length,
    [categories],
  );

  const parentOptions = useMemo(() => {
    if (editingCategoryId === null) return categories;

    const excludedIds = new Set([Number(editingCategoryId)]);
    let foundDescendant = true;

    while (foundDescendant) {
      foundDescendant = false;
      categories.forEach((category) => {
        if (
          excludedIds.has(Number(category.parent)) &&
          !excludedIds.has(Number(category.id))
        ) {
          excludedIds.add(Number(category.id));
          foundDescendant = true;
        }
      });
    }

    return categories.filter(
      (category) => !excludedIds.has(Number(category.id)),
    );
  }, [categories, editingCategoryId]);

  const resetForm = () => {
    setEditingCategoryId(null);
    setForm(initialForm);
    setImageFile(null);
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category.id);
    setForm({
      name: category.name,
      parent: category.parent ? String(category.parent) : "",
      is_active: category.is_active,
    });
    setImageFile(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = form.name.trim();

    if (!name) {
      toast.error("Category name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const categoryData = {
        name,
        parent: form.parent || null,
        is_active: form.is_active,
        image: imageFile,
      };

      if (editingCategoryId !== null) {
        const categoryToUpdate = categories.find(
          (category) => category.id === editingCategoryId,
        );
        if (!categoryToUpdate) {
          throw new Error("This category is no longer available.");
        }

        const updatedCategory = await updateCategory(
          categoryToUpdate.slug,
          categoryData,
        );
        setCategories((current) =>
          current.map((category) =>
            category.id === updatedCategory.id ? updatedCategory : category,
          ),
        );
        toast.success("Category updated successfully.");
      } else {
        const createdCategory = await createCategory(categoryData);
        setCategories((current) => [createdCategory, ...current]);
        toast.success("Category added successfully.");
      }

      resetForm();
      event.target.reset();
    } catch (error) {
      toast.error(
        editingCategoryId !== null
          ? "Could not update category"
          : "Could not add category",
        { description: error.message },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (category) => {
    setEditingForm({
      name: category.name,
      parent: category.parent ? String(category.parent) : "",
      is_active: category.is_active,
    });
    setEditingImage(null);
    setDialog({ category, mode: "edit" });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const name = editingForm.name.trim();

    if (!name) {
      toast.error("Category name is required.");
      return;
    }

    setUpdatingId(dialog.category.id);
    try {
      const updatedCategory = await updateCategory(dialog.category.id, {
        ...editingForm,
        name,
        image: editingImage,
      });
      setCategories((current) =>
        current.map((item) =>
          item.id === updatedCategory.id ? updatedCategory : item,
        ),
      );
      setDialog(null);
      toast.success("Category updated.");
    } catch (error) {
      toast.error("Could not update category", { description: error.message });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActive = async (category) => {
    setTogglingId(category.id);
    try {
      const updatedCategory = await updateCategory(category.id, {
        is_active: !category.is_active,
      });
      setCategories((current) =>
        current.map((item) =>
          item.id === updatedCategory.id ? updatedCategory : item,
        ),
      );
      toast.success(
        `Category ${updatedCategory.is_active ? "activated" : "deactivated"}.`,
      );
    } catch (error) {
      toast.error("Could not update category status", { description: error.message });
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
            Category management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Categories
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Organize your storefront by category and subcategory.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Total categories",
            value: categories.length,
            tone: "text-slate-950",
            accent: "from-slate-900 to-slate-700",
          },
          {
            label: "Active",
            value: activeCategoryCount,
            tone: "text-emerald-700",
            accent: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Inactive",
            value: categories.length - activeCategoryCount,
            tone: "text-amber-700",
            accent: "from-amber-400 to-amber-500",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className={`mb-3 h-1.5 w-16 rounded-full bg-gradient-to-r ${stat.accent}`} />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {stat.label}
            </p>
            <p className={`mt-3 text-2xl font-bold ${stat.tone}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_1.8fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
              <FolderTree size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {editingCategoryId !== null ? "Edit category" : "Add category"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingCategoryId !== null
                  ? "Update this storefront category."
                  : "Create a new storefront category."}
              </p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-[minmax(0,1fr)_8rem] items-start gap-4">
              <div className="space-y-5">
                <div>
                  <label htmlFor="category-name" className="mb-2 block text-sm font-medium text-slate-700">
                    Category name
                  </label>
                  <input
                    id="category-name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="e.g. Home Living"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
                <div>
                  <label htmlFor="category-parent" className="mb-2 block text-sm font-medium text-slate-700">
                    Parent category
                  </label>
                  <select
                    id="category-parent"
                    value={form.parent}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, parent: event.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  >
                    <option value="">Root category</option>
                    {categories
                      .filter((category) => category.id !== Number(form.parent))
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>
                <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, is_active: event.target.checked }))
                    }
                    className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                  />
                  Active category
                </label>
              </div>
              <ImageUploadField
                id="category-image"
                label="Category image"
                file={imageFile}
                onChange={setImageFile}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" size={16} />
                  {editingCategoryId !== null ? "Saving changes..." : "Adding category..."}
                </>
              ) : (
                <>
                  {editingCategoryId !== null ? (
                    <>
                      <Save size={16} />
                      Save changes
                    </>
                  ) : (
                    <>
                      <ImagePlus size={16} />
                      Add category
                    </>
                  )}
                </>
              )}
            </button>
            {editingCategoryId !== null && (
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <X size={16} />
                Cancel editing
              </button>
            )}
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Category list</h2>
              <p className="text-sm text-slate-500">Latest storefront categories</p>
            </div>
            <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {categories.length} total
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-500">
              <LoaderCircle className="animate-spin" size={18} />
              Loading categories...
            </div>
          ) : loadError ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
              <AlertCircle className="text-red-500" size={30} />
              <h3 className="mt-3 font-semibold text-slate-900">Could not load categories</h3>
              <p className="mt-1 text-sm text-slate-500">{loadError}</p>
              <button
                type="button"
                onClick={() => loadCategories()}
                className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Try again
              </button>
            </div>
          ) : categories.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
              <ShieldCheck className="text-slate-300" size={32} />
              <h3 className="mt-3 font-semibold text-slate-900">No categories yet</h3>
              <p className="mt-1 text-sm text-slate-500">Add your first category to start organizing products.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      {category.image ? (
                        <img
                          src={getCategoryImageUrl(category.image)}
                          alt={category.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Tag className="text-slate-400" size={20} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-slate-900">{category.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {category.parent_name ? `Parent: ${category.parent_name}` : "Root category"} · {category.is_active ? "Active" : "Inactive"}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDialog({ category, mode: "view" })}
                      aria-label={`View ${category.name}`}
                      title="View category"
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditDialog(category)}
                      aria-label={`Edit ${category.name}`}
                      title="Edit category"
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(category)}
                      disabled={togglingId === category.id}
                      aria-pressed={category.is_active}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        category.is_active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                    >
                      {togglingId === category.id
                        ? "Saving..."
                        : category.is_active
                          ? "Deactivate"
                          : "Activate"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {dialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDialog(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-dialog-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
                  {dialog.mode === "view" ? "Category details" : "Update category"}
                </p>
                <h2 id="category-dialog-title" className="mt-2 text-2xl font-bold text-slate-950">
                  {dialog.category.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDialog(null)}
                aria-label="Close category details"
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {dialog.mode === "view" ? (
              <div className="space-y-5 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    {dialog.category.image ? (
                      <img
                        src={getCategoryImageUrl(dialog.category.image)}
                        alt={dialog.category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Tag className="text-slate-400" size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{dialog.category.name}</p>
                    <p className="text-sm text-slate-500">Slug: {dialog.category.slug}</p>
                    <p className="text-sm text-slate-500">
                      {dialog.category.parent_name
                        ? `Parent: ${dialog.category.parent_name}`
                        : "Root category"}
                    </p>
                    <p className="text-sm text-slate-500">
                      Status: {dialog.category.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openEditDialog(dialog.category)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Pencil size={16} />
                  Edit category
                </button>
              </div>
            ) : (
              <form className="space-y-5 p-6" onSubmit={handleUpdate}>
                <div className="grid grid-cols-[minmax(0,1fr)_8rem] items-start gap-4">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="edit-category-name" className="mb-2 block text-sm font-medium text-slate-700">
                        Category name
                      </label>
                      <input
                        id="edit-category-name"
                        type="text"
                        value={editingForm.name}
                        onChange={(event) =>
                          setEditingForm((current) => ({ ...current, name: event.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-category-parent" className="mb-2 block text-sm font-medium text-slate-700">
                        Parent category
                      </label>
                      <select
                        id="edit-category-parent"
                        value={editingForm.parent}
                        onChange={(event) =>
                          setEditingForm((current) => ({
                            ...current,
                            parent: event.target.value,
                          }))
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      >
                        <option value="">Root category</option>
                        {categories
                          .filter((category) => category.id !== dialog.category.id)
                          .map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={editingForm.is_active}
                        onChange={(event) =>
                          setEditingForm((current) => ({
                            ...current,
                            is_active: event.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                      />
                      Active category
                    </label>
                  </div>
                  <ImageUploadField
                    id="edit-category-image"
                    label="Category image"
                    file={editingImage}
                    existingImageUrl={
                      dialog.category.image
                        ? getCategoryImageUrl(dialog.category.image)
                        : ""
                    }
                    onChange={setEditingImage}
                  />
                </div>
                <button
                  type="submit"
                  disabled={updatingId === dialog.category.id}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updatingId === dialog.category.id ? (
                    <>
                      <LoaderCircle className="animate-spin" size={16} />
                      Saving...
                    </>
                  ) : (
                    "Save changes"
                  )}
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
