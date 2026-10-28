import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  AlertCircle,
  LoaderCircle,
  PackageOpen,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { deleteProduct, getProducts } from "../../api/productApi";
import AdminLoading from "../../components/AdminLoading";
import AdminSearch from "../../components/AdminSearch";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const inventoryOptions = [
  { value: "all", label: "All" },
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [inventoryFilter, setInventoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      setProducts(await getProducts());
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch = [
        product.title,
        product.brand,
        product.category,
        product.slug,
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedSearch));
      const matchesInventory =
        inventoryFilter === "all" ||
        (inventoryFilter === "in-stock" && product.in_stock) ||
        (inventoryFilter === "out-of-stock" && !product.in_stock);
      return matchesSearch && matchesInventory;
    });
  }, [products, search, inventoryFilter]);

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.title}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      setProducts((current) =>
        current.filter((item) => item.id !== product.id),
      );
      toast.success("Product deleted.");
    } catch (error) {
      toast.error("Could not delete product", { description: error.message });
    } finally {
      setDeletingId(null);
    }
  };

  const inStockCount = products.filter((product) => product.in_stock).length;
  const outOfStockCount = products.length - inStockCount;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
            Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Products
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Create, update, and manage your store catalog.
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          <Plus size={18} />
          Add product
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Total products",
            value: products.length,
            tone: "text-slate-950",
            accent: "from-slate-900 to-slate-700",
          },
          {
            label: "In stock",
            value: inStockCount,
            tone: "text-emerald-700",
            accent: "from-emerald-500 to-emerald-600",
          },
          {
            label: "Out of stock",
            value: outOfStockCount,
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
            <p className={`mt-3 text-2xl font-bold ${stat.tone}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <AdminSearch
                value={search}
                onChange={setSearch}
                placeholder="Search by product, brand, or slug"
                label="Search products"
              />
            </div>
            <div className="inline-flex flex-wrap items-center gap-1 rounded-md bg-gray-200 p-1 shadow-inner ring-1 ring-white/10">
              {inventoryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setInventoryFilter(option.value)}
                  className={`rounded-sm px-2  py-1 text-sm font-medium transition ${
                    inventoryFilter === option.value
                      ? "bg-white/90 text-slate-900 shadow-sm"
                      : "text-slate-800 hover:text-black "
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <AdminLoading label="Arranging your catalog" />
        ) : loadError ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <AlertCircle className="text-red-500" size={30} />
            <h2 className="mt-3 font-semibold text-slate-900">
              Could not load products
            </h2>
            <p className="mt-1 max-w-lg text-sm text-slate-500">{loadError}</p>
            <button
              type="button"
              onClick={loadProducts}
              className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <PackageOpen className="text-slate-300" size={36} />
            <h2 className="mt-3 font-semibold text-slate-900">
              {products.length
                ? "No matching products"
                : "Your catalog is empty"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {products.length
                ? "Try a different search or inventory filter."
                : "Add your first product to start building the catalog."}
            </p>
            {!products.length && (
              <Link
                to="/admin/products/new"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <Plus size={16} /> Add product
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Product</th>
                    <th className="px-5 py-4 font-semibold">Category</th>
                    <th className="px-5 py-4 font-semibold">Price</th>
                    <th className="px-5 py-4 font-semibold">Inventory</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {visibleProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900 flex  flex-col gap-0.5 items-start ">
                          <img
                            className="size-12 object-cover rounded-md "
                            src={product.images[0].image} alt="product-image" 
                          />
                          <span>
                            {product.title}
                          </span>
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {product.brand} · {product.slug}
                        </p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        <span>{product.category}</span>
                        <span className="block text-xs text-slate-400">
                          {product.sub_category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {currency.format(Number(product.price))}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.stock}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            product.in_stock
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {product.in_stock ? "In stock" : "Out of stock"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/admin/products/${product.id}/edit`}
                            aria-label={`Edit ${product.title}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700"
                          >
                            <Pencil size={16} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            disabled={deletingId === product.id}
                            aria-label={`Delete ${product.title}`}
                            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:border-red-200 hover:text-red-600 disabled:opacity-50"
                          >
                            {deletingId === product.id ? (
                              <LoaderCircle
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
              Showing {visibleProducts.length} of {products.length} products
            </p>
          </>
        )}
      </section>
    </div>
  );
}
