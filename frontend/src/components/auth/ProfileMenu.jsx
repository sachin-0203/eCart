import React, { useEffect, useRef } from "react";
import { LogOut, UserRound, X } from "lucide-react";

export default function ProfileMenu({
  name,
  username,
  mail,
  onLogout,
  onClose,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full z-[100] mt-3 w-72 rounded-2xl border border-border-color bg-background p-4 shadow-[0_20px_60px_rgba(11,46,89,0.18)]"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-primary">
          My Profile
        </p>

        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1.5 text-text-secondary transition hover:bg-surface hover:text-primary"
          aria-label="Close profile"
        >
          <X size={18} />
        </button>
      </div>

      {/* Profile Information */}
      <div className="rounded-xl bg-surface p-4">
        <div className="flex items-center gap-3">
          {/* Profile Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
            <UserRound size={23} />
          </div>

          {/* User Details */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold text-primary">
              {name || "User"}
            </p>

            {username && (
              <p className="truncate text-sm text-text-secondary">
                {username}
              </p>
            )}

            {mail && (
              <p className="mt-0.5 truncate text-xs text-text-secondary">
                {mail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={onLogout}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
      >
        <LogOut size={17} />
        Logout
      </button>
    </div>
  );
}