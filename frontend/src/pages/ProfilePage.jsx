import { LogOut, Mail, Phone, UserRound } from "lucide-react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, userEmail, logout, accessToken } = useAuth();

  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border-color bg-background shadow-[0_20px_60px_rgba(11,46,89,0.08)]">
        <div className="bg-gradient-to-r from-primary to-secondary px-6 py-10 text-white">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white shadow-lg backdrop-blur-sm">
                <UserRound size={30} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/80">Profile</p>
                <h1 className="mt-2 text-3xl font-bold">{user}</h1>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border-color bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Account details</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserRound size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Username</p>
                  <p className="mt-1 text-base font-semibold text-primary">{user}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Email</p>
                  <p className="mt-1 text-base font-semibold text-primary">{userEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">Phone</p>
                  <p className="mt-1 text-base font-semibold text-primary">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border-color bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">Quick actions</p>

            <div className="mt-5 space-y-3">
              <Link
                to="/shop/products"
                className="block rounded-xl border border-border-color bg-background px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary/40 hover:text-secondary"
              >
                Continue Shopping
              </Link>

              <Link
                to="/cart"
                className="block rounded-xl border border-border-color bg-background px-4 py-3 text-sm font-semibold text-primary transition hover:border-primary/40 hover:text-secondary"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
