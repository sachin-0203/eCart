import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
  return (
    <Link
      to={brand.link || "#"}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Brand Image */}
      <div className="h-40 w-full flex items-center justify-center overflow-hidden">
        <img
          src={brand.image}
          alt={brand.name}
          className="max-h-28 max-w-[80%] w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Brand Name */}
      <div className="border-t border-slate-100 px-3  text-center">
        <h3 className="text-xs font-bold uppercase tracking-wide text-text-primary">
          {brand.name}
        </h3>
      </div>
    </Link>
  );
};

export default BrandCard;