import React from "react";
import { ArrowRight, ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { footerSections } from "../../data/static/footerData";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-primary text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-white/15 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div>
            <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
              <span className="h-px w-7 bg-secondary" />
              Make room for good things
            </p>
            <h2 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Your next favourite
              <span className="font-serif font-normal italic text-secondary">
                {" "}
                is out there.
              </span>
            </h2>
          </div>

          <Link
            to="/shop/products"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-secondary hover:text-white"
          >
            <ShoppingBag size={16} />
            Explore the collection
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8 lg:py-14">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-primary">
                E
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Rashmi Enterprises
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/65">
              A considered collection of fashion, footwear, beauty, electronics
              and home essentials, all in one place.
            </p>
          </div>

          {footerSections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.link}
                      className="group inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Rashmi Enterprises. All rights
            reserved.
          </p>
          <p className="font-medium tracking-wide text-white/70">
            Quality products. Better shopping.
          </p>
        </div>
      </div>
    </footer>
  );
}
