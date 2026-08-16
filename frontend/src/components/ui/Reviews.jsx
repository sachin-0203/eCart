import React from "react";
import { Star } from "lucide-react";
import customerReviews from "../../data/Reviews";

const ProductReviews = ({ product }) => {
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  if (!reviews.length) {
    return (
      <section className="mt-12 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-text-primary">
          Customer Reviews
        </h2>

        <p className="mt-4 text-text-secondary">
          No reviews yet.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-text-primary">
        Customer Reviews
      </h2>

      <div className="mt-6 space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-text-primary">
                  {review.user}
                </p>

                {review.verified && (
                  <span className="text-xs text-green-600">
                    Verified Purchase
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />

                <span className="text-sm font-medium">
                  {review.rating}
                </span>
              </div>
            </div>

            <h3 className="mt-3 font-semibold text-text-primary">
              {review.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              {review.comment}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              {review.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductReviews;