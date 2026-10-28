import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  CircleDollarSign,
  Package2,
  ShoppingBag,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { getCarts } from "../api/cartApi";
import { getLeads } from "../api/leadsApi";
import { getOrders } from "../api/orderApi";
import { getProducts } from "../api/productApi";
import AdminLoading from "../components/AdminLoading";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const dayKey = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

const RingStat = ({ label, value, total, color }) => {
  const percentage = total ? Math.round((value / total) * 100) : 0;
  const circumference = 2 * Math.PI * 39;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-[92px] w-[92px] shrink-0">
        <svg viewBox="0 0 100 100" className="-rotate-90">
          <circle
            cx="50"
            cy="50"
            r="39"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="9"
          />
          <circle
            cx="50"
            cy="50"
            r="39"
            fill="none"
            stroke={color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percentage / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900">
          {percentage}%
        </span>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {value} of {total}
        </p>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const [products, leads, orders, carts] = await Promise.all([
        getProducts(),
        getLeads(),
        getOrders(),
        getCarts(),
      ]);
      setData({ products, leads, orders, carts });
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const activity = useMemo(() => {
    if (!data) return [];
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));
      return {
        date,
        key: dayKey(date),
        label: new Intl.DateTimeFormat("en", { weekday: "short" }).format(date),
        orders: 0,
        leads: 0,
      };
    });

    data.orders.forEach((order) => {
      const bucket = days.find((day) => day.key === dayKey(order.created_at));
      if (bucket) bucket.orders += 1;
    });
    data.leads.forEach((lead) => {
      const bucket = days.find((day) => day.key === dayKey(lead.created_at));
      if (bucket) bucket.leads += 1;
    });
    return days;
  }, [data]);

  if (isLoading) return <AdminLoading label="Preparing your store dashboard" />;

  if (loadError) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 text-center">
        <AlertCircle className="text-red-500" size={32} />
        <h1 className="mt-4 text-xl font-bold text-slate-900">
          Dashboard data is unavailable
        </h1>
        <p className="mt-2 max-w-lg text-sm text-slate-500">{loadError}</p>
        <button
          type="button"
          onClick={loadDashboard}
          className="mt-5 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Try again
        </button>
      </div>
    );
  }

  const { products, leads, orders, carts } = data;
  const inStock = products.filter((product) => product.in_stock).length;
  const newLeads = leads.filter((lead) => lead.status === "new").length;
  const resolvedLeads = leads.filter((lead) => lead.status === "resolved").length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;
  const revenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  const maxActivity = Math.max(
    1,
    ...activity.flatMap((day) => [day.orders, day.leads]),
  );
  const metrics = [
    {
      label: "Catalog products",
      value: products.length,
      detail: `${inStock} currently in stock`,
      icon: Package2,
      iconStyle: "bg-cyan-50 text-cyan-700",
    },
    {
      label: "Orders",
      value: orders.length,
      detail: `${deliveredOrders} delivered`,
      icon: ShoppingBag,
      iconStyle: "bg-violet-50 text-violet-700",
    },
    {
      label: "Customer leads",
      value: leads.length,
      detail: `${newLeads} need follow-up`,
      icon: UsersRound,
      iconStyle: "bg-amber-50 text-amber-700",
    },
    {
      label: "Active carts",
      value: carts.length,
      detail: "Carts created",
      icon: ShoppingCart,
      iconStyle: "bg-emerald-50 text-emerald-700",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full border border-cyan-300/20" />
        <div className="pointer-events-none absolute -right-2 -top-14 h-48 w-48 rounded-full border border-cyan-300/20" />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
              Store overview
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Your business, at a glance.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
              A live snapshot of your catalog, orders, customer leads, and carts.
            </p>
          </div>
          <Link
            to="/admin/products"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:self-auto"
          >
            Manage catalog <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${metric.iconStyle}`}
            >
              <metric.icon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {metric.label}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-xl font-bold tracking-tight text-slate-950">
                  {metric.value.toLocaleString("en-IN")}
                </p>
                <p className="truncate text-[11px] text-slate-500">
                  {metric.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-950">Store activity</h2>
              <p className="mt-1 text-sm text-slate-500">
                Orders and incoming leads over the last seven days
              </p>
            </div>
            <div className="flex gap-4 text-xs font-medium text-slate-500">
              <span className="inline-flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-cyan-500" /> Orders
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="h-2.5 w-2.5 rounded-full bg-violet-400" /> Leads
              </span>
            </div>
          </div>
          <div className="mt-8 grid h-52 grid-cols-7 gap-3 border-b border-slate-100">
            {activity.map((day) => (
              <div
                key={day.key}
                className="flex flex-col items-center justify-end gap-3"
              >
                <div className="flex h-40 w-full items-end justify-center gap-1.5 border-b border-dashed border-slate-100">
                  <div
                    title={`${day.orders} orders`}
                    className="w-3 rounded-t-md bg-cyan-500 transition-all"
                    style={{
                      height: `${Math.max(4, (day.orders / maxActivity) * 100)}%`,
                    }}
                  />
                  <div
                    title={`${day.leads} leads`}
                    className="w-3 rounded-t-md bg-violet-400 transition-all"
                    style={{
                      height: `${Math.max(4, (day.leads / maxActivity) * 100)}%`,
                    }}
                  />
                </div>
                <span className="pb-3 text-xs text-slate-400">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="font-bold text-slate-950">Health indicators</h2>
            <p className="mt-1 text-sm text-slate-500">
              Progress across key store workflows
            </p>
          </div>
          <div className="mt-6 space-y-5">
            <RingStat
              label="Products in stock"
              value={inStock}
              total={products.length}
              color="#06b6d4"
            />
            <RingStat
              label="Leads resolved"
              value={resolvedLeads}
              total={leads.length}
              color="#8b5cf6"
            />
            <RingStat
              label="Orders delivered"
              value={deliveredOrders}
              total={orders.length}
              color="#10b981"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 p-6 text-white shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <CircleDollarSign size={22} />
            </span>
            <div>
              <p className="text-sm font-medium text-cyan-50">
                Gross order value
              </p>
              <p className="mt-1 text-3xl font-bold">{currency.format(revenue)}</p>
            </div>
          </div>
          <p className="mt-5 text-xs text-cyan-50">
            Excludes cancelled orders · {orders.length} total orders
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold text-slate-950">Follow-up queue</h2>
              <p className="mt-1 text-sm text-slate-500">
                Leads that still need a response
              </p>
            </div>
            <Link
              to="/admin/leads"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
            >
              View leads <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-4 rounded-xl bg-amber-50 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-600">
              {newLeads ? (
                <ArrowDownRight size={20} />
              ) : (
                <UsersRound size={20} />
              )}
            </span>
            <p className="text-sm text-slate-700">
              <strong className="text-2xl text-slate-950">{newLeads}</strong>
              <span className="ml-2">
                {newLeads === 1 ? "new enquiry" : "new enquiries"} awaiting review
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
