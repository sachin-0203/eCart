import React from "react";
import { categoriesData } from "../../data/categoriesData";

const CategorySection = () => {
 return (
    <section className="bg-background px-6 py-16 lg:px-20">

      <div className="mb-12 text-center">

        <h2 className="text-4xl font-bold text-text-primary">
          Shop By Category
        </h2>

        <p className="mt-4 text-text-secondary">
          Explore trending collections across multiple categories
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {categoriesData.map((category) => (
          <div
            key={category.id}
            className="group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg"
          >

            <div className="overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-6">

              <h3 className="text-2xl font-semibold text-text-primary">
                {category.title}
              </h3>

              <button className="mt-4 text-primary transition hover:text-primary-hover">
                Explore Category →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  ); 
};

export default CategorySection;

