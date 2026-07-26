import summerDressImage from "../assets/images/products/fashion/casual-summer-dress.jpg";
import woolJacketImage from "../assets/images/products/fashion/winter-wool-jacket.jpg";
import tshirtImage from "../assets/images/products/fashion/classic-cotton-tshirt.jpg";
import denimJeansImage from "../assets/images/products/fashion/premium-denim-jeans.jpg";

import runningShoesImage from "../assets/images/products/footwear/premium-running-shoes.jpg";
import casualSneakersImage from "../assets/images/products/footwear/casual-sneakers.jpg";
import formalShoesImage from "../assets/images/products/footwear/formal-dress-shoes.jpg";
import sandalsImage from "../assets/images/products/footwear/comfortable-sandals.jpg";

import faceCreamImage from "../assets/images/products/beauty/moisturizing-face-cream.jpg";
import lipstickImage from "../assets/images/products/beauty/lipstick-collection.jpg";
import antiAgingSerumImage from "../assets/images/products/beauty/anti-aging-serum.jpg";
import hairCareImage from "../assets/images/products/beauty/hair-shampoo-conditioner.jpg";

import wirelessHeadphonesImage from "../assets/images/products/electronics/wireless-headphones.jpg";
import smartphoneChargerImage from "../assets/images/products/electronics/smartphone-charger.jpg";
import usbCableImage from "../assets/images/products/electronics/usb-c-cable-pack.jpg";
import smartwatchImage from "../assets/images/products/electronics/smartwatch.jpg";

import bedSheetImage from "../assets/images/products/home/cotton-bed-sheet-set.jpg";
import knifeSetImage from "../assets/images/products/home/kitchen-knife-set.jpg";
import cookwareImage from "../assets/images/products/home/stainless-steel-cookware.jpg";
import pillowCoversImage from "../assets/images/products/home/decorative-pillow-covers.jpg";

import leatherBeltImage from "../assets/images/products/accessories/leather-belt.jpg";
import wristWatchImage from "../assets/images/products/accessories/wrist-watch.jpg";
import sunglassesImage from "../assets/images/products/accessories/sunglasses.jpg";
import backpackImage from "../assets/images/products/accessories/backpack.jpg";

// Fashion Products
export const fashionProducts = [
  {
    id: 101,
    slug: "classic-cotton-tshirt",
    title: "Classic Cotton T-Shirt",
    category: "Fashion",

    price: 499,
    oldPrice: 799,
    discountPercentage: 38,

    rating: 4.5,

    featured: true,

    image: tshirtImage,
  },

  {
    id: 102,
    slug: "premium-denim-jeans",
    title: "Premium Denim Jeans",
    category: "Fashion",

    price: 1999,
    oldPrice: 2999,
    discountPercentage: 33,

    rating: 4.7,

    featured: false,

    image: denimJeansImage,
  },

  {
    id: 103,
    slug: "casual-summer-dress",
    title: "Casual Summer Dress",
    category: "Fashion",

    price: 1499,
    oldPrice: 2499,
    discountPercentage: 40,

    rating: 4.6,

    featured: false,

    image: summerDressImage,
  },

  {
    id: 104,
    slug: "winter-wool-jacket",
    title: "Winter Wool Jacket",
    category: "Fashion",

    price: 3499,
    oldPrice: 4999,
    discountPercentage: 30,

    rating: 4.8,

    featured: false,

    image: woolJacketImage,
  },
];


// Footwear Products
export const footwearProducts = [
  {
    id: 201,
    slug: "premium-running-shoes",
    title: "Premium Running Shoes",
    category: "Footwear",

    price: 4999,
    oldPrice: 7999,
    discountPercentage: 38,

    rating: 4.8,

    featured: true,

    image: runningShoesImage,
  },

  {
    id: 202,
    slug: "casual-sneakers",
    title: "Casual Sneakers",
    category: "Footwear",

    price: 2999,
    oldPrice: 4999,
    discountPercentage: 40,

    rating: 4.5,

    featured: false,

    image: casualSneakersImage,
  },

  {
    id: 203,
    slug: "formal-dress-shoes",
    title: "Formal Dress Shoes",
    category: "Footwear",

    price: 5999,
    oldPrice: 8999,
    discountPercentage: 33,

    rating: 4.7,

    featured: false,

    image: formalShoesImage,
  },

  {
    id: 204,
    slug: "comfortable-sandals",
    title: "Comfortable Sandals",
    category: "Footwear",

    price: 799,
    oldPrice: 1299,
    discountPercentage: 38,

    rating: 4.4,

    featured: false,

    image: sandalsImage,
  },
];


// Beauty Products
export const beautyProducts = [
  {
    id: 301,
    slug: "moisturizing-face-cream",
    title: "Moisturizing Face Cream",
    category: "Beauty",

    price: 899,
    oldPrice: 1499,
    discountPercentage: 40,

    rating: 4.6,

    featured: true,

    image: faceCreamImage,
  },

  {
    id: 302,
    slug: "lipstick-collection",
    title: "Lipstick Collection",
    category: "Beauty",

    price: 599,
    oldPrice: 999,
    discountPercentage: 40,

    rating: 4.5,

    featured: false,

    image: lipstickImage,
  },

  {
    id: 303,
    slug: "anti-aging-serum",
    title: "Anti-Aging Serum",
    category: "Beauty",

    price: 1299,
    oldPrice: 1999,
    discountPercentage: 35,

    rating: 4.8,

    featured: false,

    image: antiAgingSerumImage,
  },

  {
    id: 304,
    slug: "hair-shampoo-conditioner",
    title: "Hair Shampoo & Conditioner",
    category: "Beauty",

    price: 699,
    oldPrice: 1199,
    discountPercentage: 42,

    rating: 4.5,

    featured: false,

    image: hairCareImage,
  },
];


// Electronics Products
export const electronicsProducts = [
  {
    id: 401,
    slug: "wireless-headphones",
    title: "Wireless Headphones",
    category: "Electronics",

    price: 2999,
    oldPrice: 4999,
    discountPercentage: 40,

    rating: 4.7,

    featured: true,

    image: wirelessHeadphonesImage,
  },

  {
    id: 402,
    slug: "smartphone-charger",
    title: "Smartphone Charger",
    category: "Electronics",

    price: 799,
    oldPrice: 1499,
    discountPercentage: 47,

    rating: 4.4,

    featured: false,

    image: smartphoneChargerImage,
  },

  {
    id: 403,
    slug: "usb-c-cable-pack",
    title: "USB-C Cable Pack",
    category: "Electronics",

    price: 599,
    oldPrice: 999,
    discountPercentage: 40,

    rating: 4.5,

    featured: false,

    image: usbCableImage,
  },

  {
    id: 404,
    slug: "smartwatch",
    title: "Smartwatch",
    category: "Electronics",

    price: 5999,
    oldPrice: 8999,
    discountPercentage: 33,

    rating: 4.8,

    featured: false,

    image: smartwatchImage,
  },
];


// Home & Living Products
export const homeProducts = [
  {
    id: 501,
    slug: "cotton-bed-sheet-set",
    title: "Cotton Bed Sheet Set",
    category: "Home & Living",

    price: 1499,
    oldPrice: 2499,
    discountPercentage: 40,

    rating: 4.6,

    featured: true,

    image: bedSheetImage,
  },

  {
    id: 502,
    slug: "kitchen-knife-set",
    title: "Kitchen Knife Set",
    category: "Home & Living",

    price: 2999,
    oldPrice: 4499,
    discountPercentage: 33,

    rating: 4.7,

    featured: false,

    image: knifeSetImage,
  },

  {
    id: 503,
    slug: "stainless-steel-cookware",
    title: "Stainless Steel Cookware",
    category: "Home & Living",

    price: 3999,
    oldPrice: 5999,
    discountPercentage: 33,

    rating: 4.8,

    featured: false,

    image: cookwareImage,
  },

  {
    id: 504,
    slug: "decorative-pillow-covers",
    title: "Decorative Pillow Covers",
    category: "Home & Living",

    price: 799,
    oldPrice: 1299,
    discountPercentage: 38,

    rating: 4.5,

    featured: false,

    image: pillowCoversImage,
  },
];


// Accessories Products
export const accessoriesProducts = [
  {
    id: 601,
    slug: "leather-belt",
    title: "Leather Belt",
    category: "Accessories",

    price: 599,
    oldPrice: 999,
    discountPercentage: 40,

    rating: 4.5,

    featured: true,

    image: leatherBeltImage,
  },

  {
    id: 602,
    slug: "wrist-watch",
    title: "Wrist Watch",
    category: "Accessories",

    price: 1999,
    oldPrice: 3499,
    discountPercentage: 43,

    rating: 4.7,

    featured: false,

    image: wristWatchImage,
  },

  {
    id: 603,
    slug: "sunglasses",
    title: "Sunglasses",
    category: "Accessories",

    price: 1499,
    oldPrice: 2999,
    discountPercentage: 50,

    rating: 4.6,

    featured: false,

    image: sunglassesImage,
  },

  {
    id: 604,
    slug: "backpack",
    title: "Backpack",
    category: "Accessories",

    price: 2499,
    oldPrice: 3999,
    discountPercentage: 38,

    rating: 4.8,

    featured: false,

    image: backpackImage,
  },
];


// Combine all products
export const allProducts = [
  ...fashionProducts,
  ...footwearProducts,
  ...beautyProducts,
  ...electronicsProducts,
  ...homeProducts,
  ...accessoriesProducts,
];


// Featured Products
export const featuredProducts = allProducts.filter(
  (product) => product.featured
);