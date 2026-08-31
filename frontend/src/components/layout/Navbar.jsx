import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  Search,
  X,
  ShoppingBag,
  UserRound,
  UserRoundPlus,
} from "lucide-react";

import ProfileMenu from "../auth/ProfileMenu";

import { navLinks } from "../../data/navbarData";
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
      <div className="mx-auto flex max-w-full items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Mobile Menu Button */}
        {!isDesktop && (
          <button
            type="button"
            onClick={handleMobileMenuToggle}
            className="rounded-full bg-surface p-2 text-primary transition duration-300 hover:bg-border-color"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/*  LOGO  */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
            E
          </div>

          <div className="leading-tight">
            <p className="text-2xl font-semibold tracking-wide text-primary md:text-4xl">
              eCart
            </p>

            <p className="text-sm text-text-secondary">Fashion • Home • Tech</p>
          </div>
        </Link>

        {isDesktop ? (
          <>
            {/* DESKTOP NAVIGATION */}
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

                    {/* Desktop Dropdown */}
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

            {/* =====================================================
                DESKTOP ACTIONS
                ===================================================== */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="flex items-center gap-2 rounded-full border border-border-color bg-surface px-3 py-2 text-sm text-text-secondary">
                <Search size={16} />

                <input
                  type="text"
                  placeholder="Search"
                  className="w-32 bg-transparent text-primary outline-none placeholder:text-text-secondary"
                />
              </div>

              {/* Desktop Cart */}
              <button
                onClick={handleCart}
                className="relative rounded-full p-2 text-primary transition hover:bg-surface"
                aria-label="Cart"
              >
                <ShoppingBag size={22} />

                {cartCount > 0 && (
                  <span className="absolute right-0 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[12px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* =====================================================
                  DESKTOP PROFILE / LOGIN
                  ===================================================== */}
              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleProfileToggle}
                    className=" cursor-pointer"
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
                      <div className="flex h-full w-full items-center justify-center">
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
                  className="flex flex-col items-center   px-2 py-2 text-sm font-semibold transition-all duration-300 "
                >
                  <UserRoundPlus size={17} />
                  <div className="text-[12px]">Profile</div>
                </button>
              )}
            </div>
          </>
        ) : (
          /* =====================================================
             MOBILE HEADER ACTIONS

             Cart + Profile are OUTSIDE the hamburger menu
             ===================================================== */
          <div className="ml-auto flex items-center gap-1">
            {/* =====================================================
                MOBILE CART
                ===================================================== */}
            <button
              onClick={handleCart}
              className="relative rounded-full p-2 text-primary transition hover:bg-surface"
              aria-label="Cart"
            >
              <ShoppingBag size={22} />

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
                className="rounded-full bg-secondary p-2 text-white transition hover:bg-secondary-hover"
                aria-label="Login"
              >
                <UserRoundPlus size={20} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* =====================================================
          MOBILE SLIDE-OUT MENU

          Profile + Cart are NOT inside this menu
          ===================================================== */}
      {!isDesktop && (
        <nav
          className={`absolute left-0 top-full z-40 flex h-screen w-80 flex-col gap-3 border-t border-border-color bg-background px-6 py-8 shadow-2xl transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Mobile Search */}
          <div className="mb-3 flex items-center gap-2 rounded-full border border-border-color bg-surface px-3 py-2 text-lg text-text-secondary">
            <Search size={25} />

            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-primary outline-none placeholder:text-text-secondary"
            />
          </div>

          {/* Mobile Navigation Links */}
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-3 py-3 text-base font-semibold text-primary transition-all duration-300 ${
                  isActive ? "bg-[#FFF0F4] text-secondary" : "hover:bg-surface"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Shop Now */}
          <button
            type="button"
            className="mt-4 rounded-full bg-accent px-5 py-2.5 text-lg font-semibold text-primary transition-all duration-300 hover:bg-accent-hover"
          >
            Shop Now
          </button>
        </nav>
      )}

      {/* =====================================================
          AUTHENTICATION MODAL
          ===================================================== */}
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        defaultView={authView}
      />
    </header>
  );
}
