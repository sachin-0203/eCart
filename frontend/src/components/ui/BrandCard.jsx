import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
  return (
    <Link
      to={brand.link || "#"}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Brand Image */}
      <div className="flex h-32 items-center justify-center overflow-hidden bg-white p-5">
        <img
          src={brand.image}
          alt={brand.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Brand Name */}
      <div className="border-t border-slate-100 px-3 py-3 text-center">
        <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary">
          {brand.name}
        </h3>
      </div>
    </Link>
  );
};

export default BrandCard;