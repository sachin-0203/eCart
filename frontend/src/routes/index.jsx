import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Products from '../pages/Products'
import About from '../pages/About'
import Contact from '../pages/Contact'
import MenHomepage from '../features/men/MenHomepage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/men" element={<MenHomepage />} />
    </Route>
  )
)

export default router
