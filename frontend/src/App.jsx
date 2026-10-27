import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Customer/Home.jsx'
import Navbar from './components/header/Navbar.jsx'

// auth
import StartPage from './pages/Auth/StartPage.jsx'
import Resister from './pages/Auth/Register.jsx'
import Login from './pages/Auth/Login.jsx'

// user
import Products from './pages/Customer/Products.jsx'
import ProductsDetial from './pages/Customer/ProductsDetial.jsx'
import Cart from './pages/Customer/Cart.jsx'
import Checkout from './pages/Customer/Checkout.jsx'
import OrderTraking from './pages/Customer/OrderTracking.jsx'
import Dashboard from './pages/User/Dashboard.jsx'
import MyOrder from './pages/User/MyOrder.jsx'
import Address from './pages/User/Address.jsx'
import Profile from './pages/User/Profile.jsx'

// admin
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import ManageCategories from './pages/Admin/ManageCategories.jsx'
import ManageOrder from './pages/Admin/ManageOrder.jsx'
import ManageProducts from './pages/Admin/ManageProducts.jsx'
import ManageUser from './pages/Admin/ManageUser.jsx'

// common router
import Loader from './components/common/Loader.jsx'

// header and footer
import Footer from './components/header/Footer.jsx'
import BootomNav from './components/header/BootomNav.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Public Router */}
          <Route path='/' element={<Home />} />
          <Route path='/navbar' element={<Navbar />} />

          {/* auth */}
          <Route path='/StartPage' element={<StartPage />} />
          <Route path='/register' element={<Resister />} />
          <Route path='/login' element={<Login />} />

          {/* user */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/myorder' element={<MyOrder />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product-detial' element={<ProductsDetial />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order-traking' element={<OrderTraking />} />
          <Route path='/address' element={<Address />} />

          {/* admin */}
          <Route path='/admin-dashboard' element={<AdminDashboard />} />
          <Route path='/manage-products' element={<ManageProducts />} />
          <Route path='/manage-categories' element={<ManageCategories />} />
          <Route path='/manage-order' element={<ManageOrder />} />
          <Route path='/manage-user' element={<ManageUser />} />

          {/* Common router */}
          <Route path='/loader' element={<Loader />} />

          {/* Header and Footer */}
          <Route path='/footer' element={<Footer />} />
          <Route path='/bottom-nav' element={<BootomNav />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
