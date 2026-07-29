import React from "react";
import { Link } from "react-router-dom";

const BrandCard = ({ brand }) => {
  return (
    <Link
      to={brand.link || "#"}
      className="group block overflow-hidden rounded-xl bg-white shadow-md"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-t-2xl border">
        <img
          src={brand.image}
          alt={brand.title}
          className="h-50 w-full object-cover transition-transform duration-500 "
        />
      </div>

      {/* Content */}
      <div className="py-2 text-center">
        <h2 className="font-black uppercase tracking-wide text-text-primary">
          {brand.title}
        </h2>

        <p className="text-xs font-medium text-text-secondary px-5">
          {brand.subtitle}
        </p>
      </div>
    </Link>
  );
};

export default BrandCard;