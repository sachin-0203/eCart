// Men
export {
  categories as menCategories,
  brandCollections as menBrandCollections,
  collections as menCollections,
} from "./MensData";

// Women
export {
  categories as womenCategories,
  brandCollections as womenBrandCollections,
  collections as womenCollections,
  topwear as womenTopwear,
  bottomwear as womenBottomwear,
  ethnicWear as womenEthnicWear,
  footwear as womenFootwear,
  beauty as womenBeauty,
  accessories as womenAccessories,
} from "./WomensData";

// Kids
export {
  categories as kidsCategories,
  brandCollections as kidsBrandCollections,
  collections as kidsCollections,
  topwear as kidsTopwear,
  bottomwear as kidsBottomwear,
  ethnicWear as kidsEthnicWear,
  footwear as kidsFootwear,
  toys as kidsToys,
  schoolEssentials as kidsSchoolEssentials,
} from "./KidsData";

// Home & Living
export {
  homeHeroCards,
  homeProducts as homeLivingProducts,
} from "./homeLivingData";

// General shop products
export {
  fashionProducts,
  footwearProducts,
  beautyProducts,
  electronicsProducts,
  homeProducts as shopHomeProducts,
  accessoriesProducts,
  allProducts,
  featuredProducts,
} from "./productsData";

// Categories
export { categoriesData } from "./categoriesData";

// Grouped export for convenient access
import * as men from "./MensData";
import * as women from "./WomensData";
import * as kids from "./KidsData";
import {
  homeHeroCards as homeLivingHeroCards,
  homeProducts as homeLivingProductsGrouped,
} from "./homeLivingData";
import { allProducts as shopAllProducts } from "./productsData";
import * as shop from "./productsData";
import { categoriesData as allCategoriesData } from "./categoriesData";

export const ecommerceProducts = [
  ...shopAllProducts,
  ...homeLivingProductsGrouped,
];

export const ecommerceData  = {
  men,
  women,
  kids,
  homeLiving: {
    homeHeroCards: homeLivingHeroCards,
    homeProducts: homeLivingProductsGrouped,
  },
  shop,
  categories: allCategoriesData,
  ecommerceProducts,
};

export default ecommerceData;
