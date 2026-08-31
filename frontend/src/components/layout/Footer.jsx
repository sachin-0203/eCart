import React from "react";
import { Link } from "react-router-dom";
import { footerSections } from "../../data/footerData";

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white">
      {/* =========================
          MAIN FOOTER
      ========================== */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        {/* =========================
            BRAND SECTION
        ========================== */}
        <div className="lg:col-span-1">
          <Link to="/" className="inline-block">
            <h2 className="text-2xl font-bold text-primary">
              Rashmi Enterprises
            </h2>
          </Link>

          <p className="mt-4 text-sm leading-6 text-sky-100">
            Discover quality products across fashion, footwear, beauty,
            electronics, accessories, and home essentials — all in one place.
          </p>

          <Link
            to="/shop/products"
            className="mt-6 inline-block rounded-lg bg-secondary px-5 py-2 font-medium transition-all duration-300 hover:bg-primary-hover"
          >
            Explore Collection
          </Link>
        </div>

        {/* =========================
            FOOTER SECTIONS
        ========================== */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              {section.title}
            </h3>

            <ul className="space-y-3 text-sm text-sky-100">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.link}
                    className="transition duration-300 hover:text-primary-hover"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* =========================
          BOTTOM BAR
      ========================== */}
      <div className="border-t border-sky-700">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-center text-sm text-sky-100 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} Rashmi Enterprises. All rights
            reserved.
          </p>

          <p className="text-sky-300">Quality products. Better shopping.</p>
        </div>
      </div>
    </footer>
  );
}
