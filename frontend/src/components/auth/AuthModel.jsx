import { X } from "lucide-react";
import LoginForm from "./LoginPage";

export default function AuthModal({
  isOpen,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 px-4 py-6">
      <div className="relative w-full max-w-md rounded-2xl border border-border-color bg-white p-5 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-primary"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
            E
          </div>

          <div>
            <h2 className="text-xl font-bold text-primary">eCart</h2>
            <p className="text-xs text-text-secondary">Secure access</p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
