import { useState, useEffect } from "react";
import LoginForm from "./LoginPage";
import SignupForm from "./SignupPage";
import { X, ShieldCheck } from "lucide-react";

export default function AuthModal({
  isOpen,
  onClose,
  defaultView = "login",
}) {
  const [view, setView] = useState(defaultView);

  useEffect(() => {
    if (isOpen) {
      setView(defaultView);
    }
  }, [isOpen, defaultView]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B2E59]/70 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#DCE6F5] bg-white shadow-[0_25px_80px_rgba(11,46,89,0.25)]">
        <div className="relative overflow-hidden bg-[#0B2E59] px-6 pb-8 pt-7 text-white">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#53EF9E]/10" />
          <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-[#DD1557]/20" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-[#DD1557] hover:rotate-90"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#53EF9E] text-lg font-bold text-[#0B2E59] shadow-lg">
              E
            </div>

            <div>
              <h2 className="text-2xl font-bold tracking-wide">
                eCart
              </h2>

              <p className="text-xs text-white/70">
                Fashion • Home • Tech
              </p>
            </div>
          </div>

          <div className="relative mt-6">
            <h1 className="text-2xl font-bold">
              {view === "login"
                ? "Welcome Back!"
                : "Create Your Account"}
            </h1>

            <p className="mt-1 text-sm text-white/70">
              {view === "login"
                ? "Sign in to continue shopping with eCart."
                : "Join eCart and discover something you love."}
            </p>
          </div>
        </div>

        <div className="bg-white px-6 pb-7 pt-6 sm:px-8">
          <div className="mb-7 flex rounded-xl bg-[#F5F8FC] p-1">
            <button
              type="button"
              onClick={() => setView("login")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${
                view === "login"
                  ? "bg-[#0B2E59] text-white shadow-md"
                  : "text-[#6991C7] hover:text-[#0B2E59]"
              }`}
            >
              Log In
            </button>

            <button
              type="button"
              onClick={() => setView("signup")}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${
                view === "signup"
                  ? "bg-[#DD1557] text-white shadow-md"
                  : "text-[#6991C7] hover:text-[#0B2E59]"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div>
            {view === "login" ? <LoginForm /> : <SignupForm />}
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#6991C7]">
            <ShieldCheck size={15} className="text-[#53EF9E]" />
            <span>Your information is securely protected</span>
          </div>
        </div>

        <div className="h-1 w-full bg-gradient-to-r from-[#0B2E59] via-[#53EF9E] to-[#DD1557]" />
      </div>
    </div>
  );
}