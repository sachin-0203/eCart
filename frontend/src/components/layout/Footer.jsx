import React from "react";
import { Link } from "react-router-dom";
import { footerSections } from "../../data/footerData";

export default function Footer() {
  return (
    <footer className="bg-sky-900 text-white">

      {/* MAIN FOOTER */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">

        {/* BRAND SECTION */}
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Bussiness Name
          </h2>

          <p className="mt-4 text-sm leading-6 text-sky-100">
            Premium footwear collections available through our Meesho
            business store. Stylish, affordable, and comfortable shoes
            for everyone.
          </p>

          <button className="mt-6 rounded-lg bg-secondary px-5 py-2 font-medium transition-all duration-300 hover:bg-primary-hover">
            Explore Collection
          </button>
        </div>

        {/* FOOTER SECTIONS */}
        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 text-lg font-semibold text-primary">
              {section.title}
            </h3>

            <ul className="space-y-3 text-sm text-sky-100">
              {section.links.map((link,index) => (
                <li key={index}>
                  <Link
                    to={"/"}
                    className="transition duration-300 hover:text-primary-hover"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-sky-700 py-5 text-center text-sm text-white">
        © 2025 Rashmi Enterprises. All rights reserved.
      </div>
    </footer>
  );
}