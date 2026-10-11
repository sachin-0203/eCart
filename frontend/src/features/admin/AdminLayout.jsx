import { useState } from "react";
import { LayoutDashboard, Package2, Store, Menu, UsersRound } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const navItems = [
  { label: "Overview", to: "/admin", icon: LayoutDashboard, end: true },
  { label: "Products", to: "/admin/products", icon: Package2 },
  { label: "Leads", to: "/admin/leads", icon: UsersRound },
];

export default function AdminLayout() {
const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

return (
  <div className="min-h-screen bg-slate-100 text-slate-900">
    <Toaster position="top-right" richColors />

    <aside
      className={`fixed inset-y-0 left-0 z-30 hidden flex-col bg-slate-950 text-white transition-all duration-300 md:flex ${
        sidebarCollapsed ? "w-[72px]" : "w-64"
      }`}
    >
      <Link
        to="/admin"
        className={`flex h-20 items-center border-b border-white/10 transition-all ${
          sidebarCollapsed
            ? "justify-center px-2"
            : "gap-3 px-6"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-slate-950">
          <Store size={21} />
        </span>

        {!sidebarCollapsed && (
          <span>
            <span className="block text-lg font-bold">eCart</span>
            <span className="block text-xs text-slate-400">
              Admin workspace
            </span>
          </span>
        )}
      </Link>

      <nav className="space-y-2 px-3 py-7">
        {!sidebarCollapsed && (
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Workspace
          </p>
        )}

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            title={sidebarCollapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center rounded-xl py-3 text-sm font-medium transition ${
                sidebarCollapsed
                  ? "justify-center px-3"
                  : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-cyan-400 text-slate-950"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <item.icon size={18} />

            {!sidebarCollapsed && (
              <span>{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      <Link
        to="/"
        title={sidebarCollapsed ? "Back to storefront" : undefined}
        className={`mt-auto flex border-t border-white/10 py-5 text-sm text-slate-400 transition hover:text-white ${
          sidebarCollapsed
            ? "justify-center px-3"
            : "px-6"
        }`}
      >
        {sidebarCollapsed ? (
          <span className="text-lg">←</span>
        ) : (
          "← Back to storefront"
        )}
      </Link>
    </aside>

    <div
      className={`min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? "md:pl-[72px]" : "md:pl-64"
      }`}
    >
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Sidebar Toggle */}
          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                setSidebarCollapsed((prev) => !prev)
              }
              className="hidden rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 md:block"
              aria-label={
                sidebarCollapsed
                  ? "Expand sidebar"
                  : "Collapse sidebar"
              }
            >
              <Menu size={21} />
            </button>

            {/* Mobile Logo */}
            <Link
              to="/admin"
              className="font-bold tracking-tight text-slate-900 md:hidden"
            >
              eCart Admin
            </Link>

            <p className="hidden text-sm text-slate-500 md:block">
              Store management
            </p>
          </div>

          {/* Storefront */}
          <Link
            to="/"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950"
          >
            View storefront
          </Link>
        </div>
      </header>

      <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-3 md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive
                  ? "bg-slate-950 text-white"
                  : "bg-slate-100 text-slate-600"
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-10">
        <Outlet />
      </main>
    </div>
  </div>
);

}
