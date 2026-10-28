import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, ShoppingBag } from "lucide-react";
import { getOrders } from "../../api/orderApi";
import AdminLoading from "../../components/AdminLoading";
import AdminSearch from "../../components/AdminSearch";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-sky-50 text-sky-700",
  shipped: "bg-violet-50 text-violet-700",
  delivered: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-rose-50 text-rose-700",
};

const statusLabels = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export default function OrderManagementPage() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      setOrders(await getOrders());
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const totalRevenue = useMemo(
    () =>
      orders
        .filter((order) => order.status !== "cancelled")
        .reduce((sum, order) => sum + Number(order.total_amount || 0), 0),
    [orders],
  );

  const visibleOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orders.filter((order) => {
      const productTitles = (order.items || [])
        .map((item) => item.product?.title)
        .filter(Boolean)
        .join(" ");
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [String(order.id), order.status, productTitles]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesSearch && (statusFilter === "all" || order.status === statusFilter);
    });
  }, [orders, search, statusFilter]);

  const countByStatus = (status) =>
    orders.filter((order) => order.status === status).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
            Fulfilment
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Orders
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review recent orders and monitor the flow from purchase to delivery.
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          {
            label: "Total orders",
            value: orders.length,
            tone: "text-slate-950",
            accent: "from-slate-900 to-slate-700",
          },
          {
            label: "Pending",
            value: countByStatus("pending"),
            tone: "text-amber-700",
            accent: "from-amber-400 to-amber-500",
          },
          {
            label: "Confirmed",
            value: countByStatus("confirmed"),
            tone: "text-sky-700",
            accent: "from-sky-500 to-sky-600",
          },
          {
            label: "Shipped",
            value: countByStatus("shipped"),
            tone: "text-violet-700",
            accent: "from-violet-500 to-violet-600",
          },
          {
            label: "Revenue",
            value: currency.format(totalRevenue),
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
            <p className={`mt-3 text-xl font-bold ${stat.tone}`}>
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
                placeholder="Search by order ID or product"
                label="Search orders"
              />
            </div>
            <div className="inline-flex flex-wrap items-center gap-1 rounded-md bg-gray-200 p-1 shadow-inner ring-1 ring-white/10">
              {[
                { value: "all", label: "All" },
                ...Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setStatusFilter(option.value)}
                  className={`rounded-sm px-2 py-1 text-sm font-medium transition ${
                    statusFilter === option.value
                      ? "bg-white/90 text-slate-900 shadow-sm"
                      : "text-slate-800 hover:text-black"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isLoading ? (
          <AdminLoading label="Loading orders" />
        ) : loadError ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <AlertCircle className="text-red-500" size={30} />
            <h2 className="mt-3 font-semibold text-slate-900">Could not load orders</h2>
            <p className="mt-1 max-w-lg text-sm text-slate-500">{loadError}</p>
            <button
              type="button"
              onClick={loadOrders}
              className="mt-4 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        ) : visibleOrders.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
            <ShoppingBag className="text-slate-300" size={36} />
            <h2 className="mt-3 font-semibold text-slate-900">
              {orders.length ? "No matching orders" : "No orders yet"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {orders.length
                ? "Try a different search or status filter."
                : "Orders placed by customers will appear here."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Order</th>
                  <th className="px-5 py-4 font-semibold">Items</th>
                  <th className="px-5 py-4 font-semibold">Total</th>
                  <th className="px-5 py-4 font-semibold">Placed</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleOrders.map((order) => {
                  const itemNames = (order.items || []).map((item) => item.product?.title).filter(Boolean);

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-900">#{order.id}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          {itemNames.length} product{itemNames.length === 1 ? "" : "s"}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-wrap gap-2">
                          {itemNames.slice(0, 3).map((title) => (
                            <span
                              key={`${order.id}-${title}`}
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
                        {currency.format(Number(order.total_amount || 0))}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[order.status] ?? "bg-slate-100 text-slate-700"}`}
                        >
                          {statusLabels[order.status] ?? order.status}
                        </span>
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
