import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Products from "../pages/Products";
import About from "../pages/About";
import Contact from "../pages/Contact";
import MenHomepage from "../features/men/MenHomepage";
import WomenHomepage from "../features/women/WomenHomepage";
import KidsHomepage from "../features/kids/KidsHomepage";
import HomeLiving from "../features/home/HomeLiving";
import BeautyHomepage from "../features/beauty/BeautyHomepage";
import ElectronicHomepage from "../features/electronics/ElectronicHomepage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/shop">
        <Route path="products" element={<Products />} />
        <Route path="men" element={<MenHomepage />} />
        <Route path="women" element={<WomenHomepage />} />
        <Route path="kids" element={<KidsHomepage />} />
        <Route path="home-living" element={<HomeLiving />} />
        <Route path="beauty" element={<BeautyHomepage />} />
        <Route path="electronics" element={<ElectronicHomepage />} />
      </Route>
    </Route>,
  ),
);

export default router;
