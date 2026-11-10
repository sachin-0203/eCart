import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CircleUserRound,
  LoaderCircle,
  LogOut,
  Mail,
  Package,
  Phone,
  Save,
  ShieldCheck,
  ShoppingBag,
  UserRound,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

const emptyProfile = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
};

const getProfileFormData = (profileDetails, user, userEmail) => ({
  username: profileDetails.username || user || "",
  first_name: profileDetails.first_name || "",
  last_name: profileDetails.last_name || "",
  email: profileDetails.email || userEmail || "",
  phone_number: profileDetails.phone_number || "",
});

const getProfileErrorMessage = (error) => {
  const data = error.response?.data;

  if (typeof data === "string") return data;
  if (typeof data?.detail === "string") return data.detail;

  if (data && typeof data === "object") {
    const message = Object.entries(data)
      .map(([field, messages]) => {
        const detail = Array.isArray(messages) ? messages.join(" ") : String(messages);
        return `${field.replaceAll("_", " ")}: ${detail}`;
      })
      .join(" ");

    if (message) return message;
  }

  return error.message || "Your profile could not be updated. Please try again.";
};

const inputClassName =
  "mt-2 block w-full rounded-xl border border-border-color bg-white px-4 py-3 text-sm text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-primary focus:ring-4 focus:ring-primary/10";

export default function ProfilePage() {
  const {
    user,
    userEmail,
    authLoading,
    profileDetails,
    profileSrc,
    updateProfile,
    logout,
    accessToken,
  } = useAuth();
  const [formData, setFormData] = useState(emptyProfile);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(getProfileFormData(profileDetails, user, userEmail));
  }, [profileDetails, user, userEmail]);

  if (authLoading) {
    return (
      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-surface/60 px-4">
        <div role="status" className="flex items-center gap-3 text-sm font-medium text-text-secondary">
          <LoaderCircle size={19} className="animate-spin text-primary" />
          Loading your account...
        </div>
      </main>
    );
  }

  if (!user || !accessToken) {
    return <Navigate to="/" replace />;
  }

  const savedFormData = getProfileFormData(profileDetails, user, userEmail);
  const isDirty = Object.keys(emptyProfile).some((field) => formData[field] !== savedFormData[field]);
  const displayName =
    [formData.first_name, formData.last_name].filter(Boolean).join(" ") ||
    formData.username ||
    user;
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleReset = () => {
    setFormData(savedFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      await updateProfile(formData);
      toast.success("Your profile has been updated.");
    } catch (error) {
      toast.error(getProfileErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-5rem)] bg-surface/60 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Your account</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Profile &amp; settings</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
              Keep your personal details up to date for a smoother shopping experience.
            </p>
          </div>
          <Link
            to="/shop/products"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary transition hover:text-secondary"
          >
            Continue shopping <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="space-y-5">
            <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-[#174b79] p-6 text-white shadow-[0_18px_45px_rgba(11,46,89,0.16)]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Account overview</span>
                <ShieldCheck size={18} className="text-white/80" />
              </div>

              <div className="mt-7 flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 text-lg font-bold text-white">
                  {profileSrc ? (
                    <img src={profileSrc} alt="" className="h-full w-full object-cover" />
                  ) : (
                    initials || <CircleUserRound size={30} strokeWidth={1.6} />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold">{displayName}</h2>
                  <p className="mt-1 truncate text-sm text-white/70">{formData.email}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm text-white/90">
                <Check size={16} className="text-emerald-300" />
                Account details are securely managed
              </div>
            </section>

            <section className="rounded-3xl border border-border-color bg-white p-5 shadow-sm">
              <p className="px-1 text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">Quick links</p>
              <nav className="mt-3 space-y-1">
                <Link
                  to="/shop/products"
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-primary transition hover:bg-surface"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <ShoppingBag size={17} />
                  </span>
                  Continue shopping
                  <ChevronRight size={16} className="ml-auto text-text-secondary transition group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/cart"
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-primary transition hover:bg-surface"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <Package size={17} />
                  </span>
                  View your cart
                  <ChevronRight size={16} className="ml-auto text-text-secondary transition group-hover:translate-x-0.5" />
                </Link>
              </nav>
              <div className="my-3 border-t border-border-color" />
              <button
                type="button"
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50">
                  <LogOut size={17} />
                </span>
                Sign out
                <ChevronRight size={16} className="ml-auto" />
              </button>
            </section>

            <div className="rounded-2xl border border-border-color/80 bg-white/70 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck size={17} className="mt-0.5 shrink-0 text-primary" />
                <p className="text-xs leading-5 text-text-secondary">
                  Your information is used to manage your account and make checkout easier.
                </p>
              </div>
            </div>
          </aside>

          <section className="overflow-hidden rounded-3xl border border-border-color bg-white shadow-sm">
            <div className="border-b border-border-color px-5 py-5 sm:px-8 sm:py-6">
              <div className="flex items-start gap-4">
                <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary sm:flex">
                  <UserRound size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">Personal information</h2>
                  <p className="mt-1 text-sm text-text-secondary">Edit the details associated with your account.</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-8">
              <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="first_name" className="text-sm font-semibold text-primary">First name</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    value={formData.first_name}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="Your first name"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="text-sm font-semibold text-primary">Last name</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    value={formData.last_name}
                    onChange={handleChange}
                    maxLength={150}
                    placeholder="Your last name"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="username" className="text-sm font-semibold text-primary">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={formData.username}
                    onChange={handleChange}
                    maxLength={150}
                    required
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label htmlFor="phone_number" className="text-sm font-semibold text-primary">Phone number</label>
                  <div className="relative">
                    <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone_number}
                      onChange={handleChange}
                      maxLength={15}
                      placeholder="Add a phone number"
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary">Email address</label>
                  <div className="relative">
                    <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={254}
                      required
                      className={`${inputClassName} pl-11`}
                    />
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">This email is used to sign in to your account.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border-color pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-text-secondary">
                  {isDirty ? "You have unsaved changes." : "Your profile is up to date."}
                </p>
                <div className="flex flex-col-reverse gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={!isDirty || saving}
                    className="rounded-xl border border-border-color px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Discard changes
                  </button>
                  <button
                    type="submit"
                    disabled={!isDirty || saving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={16} />
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
