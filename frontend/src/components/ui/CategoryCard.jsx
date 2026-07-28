import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ image, title, link, size = 140 }) {
  const isExternal = typeof link === "string" && /^(https?:)?\/\//.test(link);

  const Content = (
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="rounded-full p-1 bg-white">
        <div
          className="rounded-full overflow-hidden border-4"
          style={{ width: size, height: size, borderColor: "#f7e6e6" }}
        >
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      <h3 className="text-base font-semibold text-slate-900 font-sans text-center">{title}</h3>
    </div>
  );

  if (!link) return Content;

  return isExternal ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {Content}
    </a>
  ) : (
    <Link to={link}>{Content}</Link>
  );
}
