import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { navLinks } from "../../data/navBarData";

export default function Navbar() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-[0_2px_14px_rgba(0,0,0,0.06)]">
      <div className="mx-auto flex max-w-full items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0b2e59] text-lg font-bold text-white">
            E
          </div>
          <div className="leading-tight">
            <p className="text-2xl md:text-4xl font-semibold tracking-wide text-gray-900">
              eCart
            </p>
            <p className="text-sm text-gray-500">Fashion • Home • Tech</p>
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
                        `group relative flex items-center gap-1 px-1 py-3  font-semibold uppercase tracking-[0.18em] text-gray-700 transition-all duration-300 hover:text-[#ff3f6c] my-3 ${
                          isActive ? "text-[#ff3f6c]" : ""
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
                            className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#ff3f6c] transition-all duration-300 ${
                              isActive  || isHovered ? "w-full" : "w-0"
                            }`}
                          />
                        </span>
                      )}
                    </NavLink>

                    {link.sections && (
                      <div
                        className={`absolute left-1/2 top-full mt-3 w-[560px] -translate-x-1/2 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-300 ${
                          isHovered
                            ? "visible translate-y-0 opacity-100"
                            : "invisible translate-y-2 opacity-0"
                        }`}
                      >
                        <div className="grid grid-cols-[1.2fr_0.8fr] gap-5">
                          <div className="space-y-3">
                            {link.sections.map((section) => (
                              <div key={section.title}>
                                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#0b2e59]">
                                  {section.title}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {section.items.map((item) => (
                                    <span
                                      key={item}
                                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="rounded-2xl bg-gradient-to-br from-[#0b2e59] to-[#1d4f90] p-4 text-white">
                            <p className="text-xs uppercase tracking-[0.2em] text-sky-200">
                              Featured
                            </p>
                            <p className="mt-2 text-lg font-semibold">
                              {link.banner}
                            </p>
                            <button className="mt-4 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0b2e59] transition hover:scale-105">
                              Explore now
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-32 bg-transparent outline-none placeholder:text-gray-400"
                />
              </div>
              <button className="rounded-full bg-[#ff3f6c] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e53b67]">
                Shop Now
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto rounded-full bg-gray-100 p-2 text-gray-700 transition duration-300 hover:bg-gray-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {!isDesktop && (
        <nav
          className={`absolute left-0 top-full z-40 flex h-screen w-80 flex-col gap-3 border-t border-gray-200 bg-white px-6 py-8 shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-3 flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-lg text-gray-500">
            <Search size={25} />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent outline-none placeholder:text-gray-400"
            />
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-3 py-3 text-base font-semibold text-gray-700 transition-all duration-300 ${
                  isActive ? "bg-[#fff0f4] text-[#ff3f6c]" : "hover:bg-gray-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button className="text-lg mt-4 rounded-full bg-[#ff3f6c] px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-[#e53b67]">
            Shop Now
          </button>
        </nav>
      )}
    </header>
  );
}
