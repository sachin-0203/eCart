import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Eye,
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
  createBrand,
  getBrandImageUrl,
  getBrands,
  updateBrand,
} from "../../api/brandApi";

const initialForm = {
  name: "",
  is_active: true,
};

export default function BrandManagementPage() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [logoFile, setLogoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [editingForm, setEditingForm] = useState({ name: "", is_active: true });
  const [editingLogo, setEditingLogo] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);
  const [loadError, setLoadError] = useState("");

  const loadBrands = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const data = await getBrands({ includeInactive: true });
      setBrands(data);
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrands();
  }, [loadBrands]);

  const activeBrandCount = useMemo(
    () => brands.filter((brand) => brand.is_active).length,
    [brands],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = form.name.trim();

    if (!name) {
      toast.error("Brand name is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const createdBrand = await createBrand({
        name,
        is_active: form.is_active,
        logo: logoFile,
      });

      setBrands((current) => [createdBrand, ...current]);
      setForm(initialForm);
      setLogoFile(null);
      event.target.reset();
      toast.success("Brand added successfully.");
    } catch (error) {
      toast.error("Could not add brand", { description: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (brand) => {
    setEditingForm({ name: brand.name, is_active: brand.is_active });
    setEditingLogo(null);
    setDialog({ brand, mode: "edit" });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const name = editingForm.name.trim();

    if (!name) {
      toast.error("Brand name is required.");
      return;
    }

    setUpdatingId(dialog.brand.id);
    try {
      const updatedBrand = await updateBrand(dialog.brand.id, {
        ...editingForm,
        name,
        logo: editingLogo,
      });
      setBrands((current) =>
        current.map((item) => (item.id === updatedBrand.id ? updatedBrand : item)),
      );
      setDialog(null);
      toast.success("Brand updated.");
    } catch (error) {
      toast.error("Could not update brand", { description: error.message });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleActive = async (brand) => {
    setTogglingId(brand.id);
    try {
      const updatedBrand = await updateBrand(brand.id, {
        is_active: !brand.is_active,
      });
      setBrands((current) =>
        current.map((item) => (item.id === updatedBrand.id ? updatedBrand : item)),
      );
      toast.success(`Brand ${updatedBrand.is_active ? "activated" : "deactivated"}.`);
    } catch (error) {
      toast.error("Could not update brand status", { description: error.message });
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
            Brand management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Brands
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Keep your storefront brand list up to date.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Total brands",
            value: brands.length,
            tone: "text-slate-950",
            accent: "from-slate-900 to-slate-700",
          },
          {
            label: "Active",
            value: activeBrandCount,
            tone: "text-emerald-700",
            accent: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Inactive",
            value: brands.length - activeBrandCount,
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
              <Tag size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Add brand</h2>
              <p className="text-sm text-slate-500">Create a new storefront brand.</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-[minmax(0,1fr)_8rem] items-start gap-4">
              <div className="space-y-5">
                <div>
                  <label htmlFor="brand-name" className="mb-2 block text-sm font-medium text-slate-700">
                    Brand name
                  </label>
                  <input
                    id="brand-name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, name: event.target.value }))
                    }
                    placeholder="e.g. Apple"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-cyan-400 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  />
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
                  Active brand
                </label>
              </div>
              <ImageUploadField
                id="brand-logo"
                label="Brand logo"
                file={logoFile}
                onChange={setLogoFile}
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
                  Adding brand...
                </>
              ) : (
                <>
                  <ImagePlus size={16} />
                  Add brand
                </>
              )}
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Brand list</h2>
              <p className="text-sm text-slate-500">Latest storefront brands</p>
            </div>
            <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {brands.length} total
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-slate-500">
              <LoaderCircle className="animate-spin" size={18} />
              Loading brands...
            </div>
          ) : loadError ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
              <AlertCircle className="text-red-500" size={30} />
              <h3 className="mt-3 font-semibold text-slate-900">Could not load brands</h3>
              <p className="mt-1 text-sm text-slate-500">{loadError}</p>
              <button
                type="button"
                onClick={loadBrands}
                className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Try again
              </button>
            </div>
          ) : brands.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
              <ShieldCheck className="text-slate-300" size={32} />
              <h3 className="mt-3 font-semibold text-slate-900">No brands yet</h3>
              <p className="mt-1 text-sm text-slate-500">Add your first brand to start curating products.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                      {brand.logo ? (
                        <img
                          src={getBrandImageUrl(brand.logo)}
                          alt={brand.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Tag className="text-slate-400" size={20} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-slate-900">{brand.name}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {brand.is_active ? "Active" : "Inactive"} · {brand.slug}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDialog({ brand, mode: "view" })}
                      aria-label={`View ${brand.name}`}
                      title="View brand"
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openEditDialog(brand)}
                      aria-label={`Edit ${brand.name}`}
                      title="Edit brand"
                      className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggleActive(brand)}
                      disabled={togglingId === brand.id}
                      aria-pressed={brand.is_active}
                      className={`rounded-lg px-3 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        brand.is_active
                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      }`}
                    >
                      {togglingId === brand.id
                        ? "Saving..."
                        : brand.is_active
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
            aria-labelledby="brand-dialog-title"
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
                  {dialog.mode === "view" ? "Brand details" : "Update brand"}
                </p>
                <h2 id="brand-dialog-title" className="mt-2 text-2xl font-bold text-slate-950">
                  {dialog.brand.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDialog(null)}
                aria-label="Close brand details"
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {dialog.mode === "view" ? (
              <div className="space-y-5 p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    {dialog.brand.logo ? (
                      <img
                        src={getBrandImageUrl(dialog.brand.logo)}
                        alt={dialog.brand.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Tag className="text-slate-400" size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{dialog.brand.name}</p>
                    <p className="text-sm text-slate-500">Slug: {dialog.brand.slug}</p>
                    <p className="text-sm text-slate-500">
                      Status: {dialog.brand.is_active ? "Active" : "Inactive"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openEditDialog(dialog.brand)}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Pencil size={16} />
                  Edit brand
                </button>
              </div>
            ) : (
              <form className="space-y-5 p-6" onSubmit={handleUpdate}>
                <div className="grid grid-cols-[minmax(0,1fr)_8rem] items-start gap-4">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="edit-brand-name" className="mb-2 block text-sm font-medium text-slate-700">
                        Brand name
                      </label>
                      <input
                        id="edit-brand-name"
                        type="text"
                        value={editingForm.name}
                        onChange={(event) =>
                          setEditingForm((current) => ({ ...current, name: event.target.value }))
                        }
                        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      />
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
                      Active brand
                    </label>
                  </div>
                  <ImageUploadField
                    id="edit-brand-logo"
                    label="Brand logo"
                    file={editingLogo}
                    existingImageUrl={
                      dialog.brand.logo ? getBrandImageUrl(dialog.brand.logo) : ""
                    }
                    onChange={setEditingLogo}
                  />
                </div>
                <button
                  type="submit"
                  disabled={updatingId === dialog.brand.id}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {updatingId === dialog.brand.id ? (
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
