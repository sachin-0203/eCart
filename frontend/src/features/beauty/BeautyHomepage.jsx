import CategoryLandingPage from "../catalog/CategoryLandingPage";
import ecommerceData from "../../data/mock/allProduct";
import antiAgingSerumImage from "../../assets/images/products/beauty/anti-aging-serum.jpg";
import hairCareImage from "../../assets/images/products/beauty/hair-shampoo-conditioner.jpg";
import lipstickImage from "../../assets/images/products/beauty/lipstick-collection.jpg";
import beautyCategoryImage from "../../assets/images/categories/beautyImg.jpg";
import { filterProducts } from "../../utils/productFilters";

const makeProductLink = (category) =>
  `/shop/products?department=beauty&category=${encodeURIComponent(category)}`;

const heroSlides = [
  {
    eyebrow: "Your everyday glow",
    title: "A little care,",
    highlight: "a lot of confidence.",
    description:
      "Discover skincare, makeup, and haircare favourites for your daily routine.",
    image: beautyCategoryImage,
    imageAlt: "Beauty and skincare essentials",
    action: "Shop beauty",
    to: "/shop/products?department=beauty",
  },
  {
    eyebrow: "Care that feels good",
    title: "Find your",
    highlight: "new favourites.",
    description:
      "Explore thoughtful essentials to help you feel fresh, confident, and ready for the day.",
    image: antiAgingSerumImage,
    imageAlt: "Skincare serum and beauty products",
    action: "Explore skincare",
    to: makeProductLink("Skincare"),
  },
];

const categories = [
  {
    title: "Skincare",
    image: antiAgingSerumImage,
    link: makeProductLink("Skincare"),
  },
  {
    title: "Makeup",
    image: lipstickImage,
    link: makeProductLink("Makeup"),
  },
  {
    title: "Haircare",
    image: hairCareImage,
    link: makeProductLink("Haircare"),
  },
];

const collections = [
  {
    title: "Skincare Favourites",
    subtitle: "Hydration and daily care",
    image: antiAgingSerumImage,
    link: makeProductLink("Skincare"),
  },
  {
    title: "Makeup Essentials",
    subtitle: "Easy colour for every day",
    image: lipstickImage,
    link: makeProductLink("Makeup"),
  },
  {
    title: "Haircare Routine",
    subtitle: "Nourish from root to tip",
    image: hairCareImage,
    link: makeProductLink("Haircare"),
  },
];

const products = filterProducts(ecommerceData.ecommerceProducts, {
  department: "beauty",
});

export default function BeautyHomepage() {
  return (
    <CategoryLandingPage
      title="Beauty"
      description="Everyday care and beauty essentials, curated for your routine."
      heroSlides={heroSlides}
      categories={categories}
      collections={collections}
      products={products}
    />
  );
}
