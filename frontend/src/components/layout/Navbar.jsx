import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  Search,
  X,
  ShoppingCart,
  UserRoundPlus,
} from "lucide-react";

import { navLinks } from "../../data/navbarData";
import { useCart } from "../../context/CartContext";
import AuthModal from "../auth/AuthModel";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;

      setIsDesktop(desktop);

      if (desktop) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleBegin = () => {
    if (!user) {
      setAuthView("login");
      setShowModal(true);
    }
  };

  useEffect(() => {
    if (user) {
      setShowModal(false);
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-color bg-background shadow-[0_2px_14px_rgba(11,46,89,0.08)]">
      <div className="mx-auto flex max-w-full items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            E
          </div>

          <div className="leading-tight">
            <p className="text-2xl font-semibold tracking-wide text-primary md:text-4xl">
              eCart
            </p>

            <p className="text-sm text-text-secondary">
              Fashion • Home • Tech
            </p>
          </div>
        </Link>

        {isDesktop ? (
          <>
            <nav className="flex flex-1 items-center justify-center gap-6">
              {navLinks.map((link) => {
                const isHovered = hoveredLink === link.name;

                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setHoveredLink(link.name)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setHoveredLink(null)}
                      className={({ isActive }) =>
                        `group relative my-3 flex items-center gap-1 px-1 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-all duration-300 hover:text-secondary ${
                          isActive ? "text-secondary" : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span className="relative inline-flex items-center">
                          <span>{link.name}</span>

                          <ChevronDown
                            size={18}
                            className="transition-transform duration-300 group-hover:rotate-180"
                          />

                          <span
                            className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-secondary transition-all duration-300 ${
                              isActive || isHovered ? "w-full" : "w-0"
                            }`}
                          />
                        </span>
                      )}
                    </NavLink>

                    {link.sections && (
                      <div
                        className={`absolute left-1/2 top-full z-50 mt-3 w-[560px] -translate-x-1/2 rounded-2xl border border-border-color bg-background p-5 shadow-[0_20px_60px_rgba(11,46,89,0.15)] transition-all duration-300 ${
                          isHovered
                            ? "visible translate-y-0 opacity-100"
                            : "invisible translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="space-y-3">
                          {link.sections.map((section) => (
                            <div key={section.title}>
                              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                                {section.title}
                              </p>

                              <div className="flex flex-wrap gap-2">
                                {section.items.map((item) => (
                                  <span
                                    key={item}
                                    className="rounded-full bg-surface px-3 py-1 text-sm text-text-secondary transition hover:bg-primary hover:text-white"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-border-color bg-surface px-3 py-2 text-sm text-text-secondary">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search"
                  className="w-32 bg-transparent text-primary outline-none placeholder:text-text-secondary"
                />
              </div>

              { user && <Link
                to="/cart"
                className="relative rounded-full p-2 text-primary transition hover:bg-surface"
              >
                <ShoppingCart size={22} />

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>}

              {user ? (
                <button
                  type="button"
                  onClick={logout}
                  className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-primary-hover"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Logout
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleBegin}
                  className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-secondary-hover"
                >
                  <UserRoundPlus size={17} />
                  Sign Up / Log In
                </button>
              )}
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto rounded-full bg-surface p-2 text-primary transition duration-300 hover:bg-border-color"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {!isDesktop && (
        <nav
          className={`absolute left-0 top-full z-40 flex h-screen w-80 flex-col gap-3 border-t border-border-color bg-background px-6 py-8 shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-3 flex items-center gap-2 rounded-full border border-border-color bg-surface px-3 py-2 text-lg text-text-secondary">
            <Search size={25} />

            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-primary outline-none placeholder:text-text-secondary"
            />
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-3 py-3 text-base font-semibold text-primary transition-all duration-300 ${
                  isActive
                    ? "bg-[#FFF0F4] text-secondary"
                    : "hover:bg-surface"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button
            type="button"
            className="mt-4 rounded-full bg-accent px-5 py-2.5 text-lg font-semibold text-primary transition-all duration-300 hover:bg-accent-hover"
          >
            Shop Now
          </button>

          {user ? (
            <button
              type="button"
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-primary-hover"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                handleBegin();
                setIsOpen(false);
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-secondary-hover"
            >
              <UserRoundPlus size={20} />
              Sign Up / Log In
            </button>
          )}

          {user && <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="relative mt-2 flex items-center justify-center gap-2 rounded-full border border-border-color px-5 py-2.5 font-semibold text-primary transition-all duration-300 hover:bg-surface"
          >
            <ShoppingCart size={20} />
            Cart

            {cartCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>}
        </nav>
      )}

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        defaultView={authView}
      />
    </header>
  );
}