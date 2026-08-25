import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/feature/ScrollToTop'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <Toaster />
      <ScrollToTop />
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App;