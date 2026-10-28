import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteCart, getCarts } from "../../api/cartApi";
import AdminLoading from "../../components/AdminLoading";
import AdminSearch from "../../components/AdminSearch";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function CartManagementPage() {
  const [carts, setCarts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const loadCarts = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      setCarts(await getCarts());
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCarts();
  }, [loadCarts]);

  const totalProducts = useMemo(
    () => carts.reduce((sum, cart) => sum + (cart.items || []).length, 0),
    [carts],
  );

  const totalValue = useMemo(
    () => carts.reduce((sum, cart) => sum + Number(cart.total_price || 0), 0),
    [carts],
  );

  const visibleCarts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return carts.filter((cart) => {
      const productTitles = (cart.items || [])
        .map((item) => item.product?.title)
        .filter(Boolean)
        .join(" ");

      return (
        normalizedSearch.length === 0 ||
        [String(cart.id), productTitles]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [carts, search]);

  const handleDelete = async (cart) => {
    if (!window.confirm(`Delete cart #${cart.id}? This will remove all items in the cart.`)) {
      return;
    }

    setDeletingId(cart.id);
    try {
      await deleteCart(cart.id);
      setCarts((current) => current.filter((item) => item.id !== cart.id));
      toast.success("Cart deleted.");
    } catch (error) {
      toast.error("Could not delete cart", { description: error.message });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          Basket activity
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Carts
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Monitor active carts and the items customers are preparing to buy.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "Total carts",
            value: carts.length,
            tone: "text-slate-950",
            accent: "from-slate-900 to-slate-700",
          },
          {
            label: "Products in carts",
            value: totalProducts,
            tone: "text-sky-700",
            accent: "from-sky-500 to-sky-600",
          },
          {
            label: "Cart value",
            value: currency.format(totalValue),
            tone: "text-emerald-700",
            accent: "from-emerald-500 to-emerald-600",
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
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <AdminSearch
                value={search}
                onChange={setSearch}
                placeholder="Search cart ID or product"
                label="Search carts"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <AdminLoading label="Loading carts" />
        ) : loadError ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <AlertCircle className="text-red-500" size={30} />
            <h2 className="mt-3 font-semibold text-slate-900">Could not load carts</h2>
            <p className="mt-1 max-w-lg text-sm text-slate-500">{loadError}</p>
            <button
              type="button"
              onClick={loadCarts}
              className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        ) : visibleCarts.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <ShoppingCart className="text-slate-300" size={36} />
            <h2 className="mt-3 font-semibold text-slate-900">
              {carts.length ? "No matching carts" : "No carts yet"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {carts.length
                ? "Try a different search term."
                : "Customer carts will appear here once shoppers add products."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Cart</th>
                  <th className="px-5 py-4 font-semibold">Products</th>
                  <th className="px-5 py-4 font-semibold">Value</th>
                  <th className="px-5 py-4 font-semibold">Created</th>
                  <th className="px-5 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleCarts.map((cart) => {
                  const itemNames = (cart.items || [])
                    .map((item) => item.product?.title)
                    .filter(Boolean);

                  return (
                    <tr key={cart.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">#{cart.id}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {itemNames.length} item{itemNames.length === 1 ? "" : "s"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          {itemNames.slice(0, 3).map((title) => (
                            <span
                              key={`${cart.id}-${title}`}
                              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                            >
                              {title}
                            </span>
                          ))}
                          {itemNames.length > 3 && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                              +{itemNames.length - 3} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {currency.format(Number(cart.total_price || 0))}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(cart.created_at)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(cart)}
                          disabled={deletingId === cart.id}
                          className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 size={15} />
                          {deletingId === cart.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
