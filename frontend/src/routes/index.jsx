import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import HomeLiving from "../features/home/HomeLiving";
import MenHomepage from "../features/men/MenHomepage";
import KidsHomepage from "../features/kids/KidsHomepage";
import WomenHomepage from "../features/women/WomenHomepage";
import BeautyHomepage from "../features/beauty/BeautyHomepage";
import ElectronicHomepage from "../features/electronics/ElectronicHomepage";

import Products from "../pages/product/ProductsPage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import CartPage from "../pages/cart/CartPage";
import ComingSoonPage from "../pages/ComingSoonPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop">
        <Route path="products" element={<Products />} />
        <Route path="products-details" element={<ProductDetailsPage />} />
        <Route path="men" element={<MenHomepage />} />
        <Route path="women" element={<WomenHomepage />} />
        <Route path="kids" element={<KidsHomepage />} />
        <Route path="home-living" element={<HomeLiving />} />
        <Route path="beauty" element={<BeautyHomepage />} />
        <Route path="electronics" element={<ElectronicHomepage />} />
      </Route>
      <Route path="cart" element={<CartPage />} />
      <Route path="coming-soon" element={<ComingSoonPage />} />
    </Route>,
  ),
);

export default router;
