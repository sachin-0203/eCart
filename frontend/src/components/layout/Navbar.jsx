import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  Menu,
  Search,
  X,
  ShoppingCart,
  UserRound,
  UserRoundPlus,
  House,
  Shirt,
} from "lucide-react";

import ProfileMenu from "../auth/ProfileMenu";
import MobileBottomNav from "./MobileBottomNav";

import { navLinks, mobileLinks } from "../../data/static/navbarData";
import { useCart } from "../../context/CartContext";
import AuthModal from "../auth/AuthModel";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, userEmail, username, profileSrc, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  const handleProfileToggle = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleProfileClose = () => {
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    logout();
    setShowProfileMenu(false);
    setIsOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsOpen((prev) => !prev);
    setShowProfileMenu(false);
  };

  const handleCart = () => {
    if (!user) {
      setAuthView("login");
      setShowModal(true);
    } else navigate("/cart");
  };

  useEffect(() => {
    if (user) {
      setShowModal(false);
    }

    if (!user) {
      setShowProfileMenu(false);
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-color bg-background shadow-[0_2px_14px_rgba(11,46,89,0.08)]">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6 xl:gap-7 xl:px-8">
        {/* Mobile Menu Button */}
        {/* {!isDesktop && (
          <button
            type="button"
            onClick={handleMobileMenuToggle}
            className="rounded-md p-2 text-primary transition duration-300 hover:bg-surface"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )} */}

        {/*  LOGO  */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="eCart home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
            E
          </div>
          {/* <div className="leading-tight">
            <p className="text-2xl font-semibold tracking-wide text-primary">
              eCart
            </p>
          </div> */}
        </Link>

        {isDesktop ? (
          <>
            {/* DESKTOP NAVIGATION */}
            <nav className="flex flex-1 items-center justify-between gap-4">
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
                        `group relative flex items-center px-5 py-5 text-[13px] font-bold uppercase tracking-wide text-primary transition-all duration-300 hover:text-secondary ${
                          isActive ? "text-secondary" : ""
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span className="relative inline-flex items-center">
                          <span>{link.name}</span>

                          <span
                            className={`absolute -bottom-8 left-0 h-[4px]  bg-secondary transition-all duration-300 ${
                              isActive || isHovered ? "w-full" : "w-0"
                            }`}
                          />
                          {link.badge && (
                            <span className="absolute -right-7 -top-1 text-[10px] font-bold text-secondary">
                              {link.badge}
                            </span>
                          )}
                        </span>
                      )}
                    </NavLink>

                    {/* Desktop Dropdown */}
                    {/* {link.sections && (
                      <div
                        className={`absolute left-1/2 top-full z-50 mt-0 w-[560px] -translate-x-1/2 rounded-b-2xl border border-border-color bg-background p-5 shadow-[0_20px_60px_rgba(11,46,89,0.15)] transition-all duration-300 ${
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
                    )} */}
                  </div>
                );
              })}
            </nav>

            {/* =====================================================
                DESKTOP ACTIONS
                ===================================================== */}
            <div className="flex shrink-0 items-center gap-5">
              {/* Search */}
              <label className="flex w-64 items-center gap-3 rounded-xl border border-border-color bg-surface px-4 py-3 text-sm text-text-secondary 2xl:w-80">
                <Search size={20} className="shrink-0 text-text-secondary" />

                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent text-primary outline-none placeholder:text-text-secondary"
                />
              </label>

              <button
                type="button"
                onClick={handleCart}
                className="relative flex min-w-12 flex-col items-center gap-1 text-primary cursor-pointer "
                aria-label={`Bag${cartCount > 0 ? `, ${cartCount} items` : ""}`}
              >
                <ShoppingCart size={22} strokeWidth={1.7} />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
                <span className="text-xs font-semibold">Bag</span>
              </button>

              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleProfileToggle}
                    className="flex min-w-12 flex-col items-center gap-1 text-primary"
                    aria-label="Open profile menu"
                    aria-expanded={showProfileMenu}
                  >
                    {profileSrc ? (
                      <img
                        src={profileSrc}
                        alt="Profile"
                        className={`h-[22px] w-[22px] rounded-full object-cover transition-all ${showProfileMenu ? "scale-95" : ""}`}
                      />
                    ) : (
                      <UserRound size={22} strokeWidth={1.7} />
                    )}
                    <span className="text-xs font-semibold">Profile</span>
                  </button>

                  {showProfileMenu && (
                    <ProfileMenu
                      name={user}
                      username={username}
                      mail={userEmail}
                      onLogout={handleLogout}
                      onClose={handleProfileClose}
                    />
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleBegin}
                  className="flex min-w-12 flex-col items-center gap-1 text-primary"
                >
                  <UserRound size={22} strokeWidth={1.7} />
                  <span className="text-xs font-semibold">Profile</span>
                </button>
              )}

              {/* <button
                type="button"
                className="flex min-w-12 flex-col items-center gap-1 text-primary"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart size={22} strokeWidth={1.7} />
                <span className="text-xs font-semibold">Wishlist</span>
              </button> */}

              
            </div>
          </>
        ) : (
          /* =====================================================
             MOBILE HEADER ACTIONS

             Cart + Profile are OUTSIDE the hamburger menu
             ===================================================== */
          <>
            <div className="ml-auto flex items-center gap-1">
            {/* =====================================================
                MOBILE CART
                ===================================================== */}
            <button
              onClick={handleCart}
              className="relative rounded-full p-2 text-primary/80 transition hover:bg-surface cursor-pointer "
              aria-label="Cart"
            >
              <ShoppingCart size={20} strokeWidth={1.8} />

              {cartCount > 0 && (
                <span className="absolute right-1 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* =====================================================
                MOBILE PROFILE / LOGIN
                ===================================================== */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={handleProfileToggle}
                  className="rounded-full transition"
                  aria-label="Open profile menu"
                  aria-expanded={showProfileMenu}
                >
                  {profileSrc ? (
                    <img
                      src={profileSrc}
                      alt={"Profile"}
                      className={`object-cover ${showProfileMenu ? "scale-95" : ""} h-8 w-8  overflow-hidden rounded-full duration-100 transition-all`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-2">
                      <UserRound size={24} strokeWidth={1.8} />
                    </div>
                  )}
                </button>

                {showProfileMenu && (
                  <ProfileMenu
                    name={user}
                    username={username}
                    mail={userEmail}
                    onLogout={handleLogout}
                    onClose={handleProfileClose}
                  />
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleBegin}
                className="rounded-full p-2 text-primary transition hover:bg-surface"
                aria-label="Profile"
              >
                <UserRoundPlus size={20} strokeWidth={1.6} />
              </button>
            )}
            </div>
            <label className="order-last flex min-h-11 w-full basis-full items-center gap-2 rounded-xl border border-border-color bg-surface px-3 text-sm text-text-secondary transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <Search size={19} className="shrink-0 text-text-secondary" />

              <input
                type="text"
                placeholder="Search products, brands and more"
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-primary outline-none placeholder:text-text-secondary sm:text-sm"
              />
            </label>
          </>
        )}
      </div>

      {!isDesktop && <MobileBottomNav />}

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        defaultView={authView}
      />
    </header>
  );
}
