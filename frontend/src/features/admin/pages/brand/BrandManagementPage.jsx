import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, ImagePlus, LoaderCircle, ShieldCheck, Tag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createBrand, deleteBrand, getBrandImageUrl, getBrands } from "../../api/brandApi";

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
  const [deletingId, setDeletingId] = useState(null);
  const [loadError, setLoadError] = useState("");

  const loadBrands = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");

    try {
      const data = await getBrands();
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

  const handleDelete = async (brand) => {
    if (!window.confirm(`Delete "${brand.name}"? This action cannot be undone.`)) {
      return;
    }

    setDeletingId(brand.id);

    try {
      await deleteBrand(brand.id);
      setBrands((current) => current.filter((item) => item.id !== brand.id));
      toast.success("Brand deleted.");
    } catch (error) {
      toast.error("Could not delete brand", { description: error.message });
    } finally {
      setDeletingId(null);
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

            <div>
              <label htmlFor="brand-logo" className="mb-2 block text-sm font-medium text-slate-700">
                Brand logo
              </label>
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
                <input
                  id="brand-logo"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setLogoFile(event.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                />
              </div>
              {logoFile && (
                <p className="mt-2 text-xs text-slate-500">
                  Selected file: {logoFile.name}
                </p>
              )}
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

                  <button
                    type="button"
                    onClick={() => handleDelete(brand)}
                    disabled={deletingId === brand.id}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Trash2 size={14} />
                    {deletingId === brand.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
