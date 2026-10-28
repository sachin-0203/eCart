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
import DecorationHomepage from "../features/decoration/DecorationHomepage";
import ElectronicHomepage from "../features/electronics/ElectronicHomepage";

import Products from "../pages/product/ProductsPage";
import ProductDetailsPage from "../pages/product/ProductDetailsPage";
import CartPage from "../pages/cart/CartPage";
import ComingSoonPage from "../pages/ComingSoonPage";

// Admin Pages ------------------------------
import AdminLayout from "../features/admin/AdminLayout";
import ProductManagementPage from "../features/admin/pages/product/ProductManagementPage";
import ProductFormPage from "../features/admin/pages/product/ProductFormPage";
import LeadManagementPage from "../features/admin/pages/lead/LeadManagementPage";
import OrderManagementPage from "../features/admin/pages/order/OrderManagementPage";
import CartManagementPage from "../features/admin/pages/cart/CartManagementPage";
import DashboardPage from "../features/admin/pages/DashboardPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>

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
          <Route path="decoration" element={<DecorationHomepage />} />
        </Route>
        <Route path="cart" element={<CartPage />} />
        <Route path="coming-soon" element={<ComingSoonPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductManagementPage />} />
        <Route path="products/new" element={<ProductFormPage />} />
        <Route path="products/:productId/edit" element={<ProductFormPage />} />
        <Route path="leads" element={<LeadManagementPage />} />
        <Route path="orders" element={<OrderManagementPage />} />
        <Route path="carts" element={<CartManagementPage />} />
      </Route>

    </>,
  ),
);

export default router;
