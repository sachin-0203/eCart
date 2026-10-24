import { NavLink } from "react-router-dom";

import { mobileLinks } from "../../data/navbarData";

export default function MobileBottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border-color bg-background
                 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(11,46,89,0.08)]
                 lg:hidden"
    >
      <div className="mx-auto grid h-16 w-full max-w-lg grid-cols-7">
        {mobileLinks.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={name}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1
               transition-colors duration-200 ${
                 isActive
                   ? "text-secondary"
                   : "text-text-secondary hover:text-secondary"
               }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={18} strokeWidth={isActive ? 2.0 : 1.6} />
                <span className="whitespace-nowrap text-[9px] font-medium">
                  {name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
