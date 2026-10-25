import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* Public Router */}
          <Route path='/' element={<>home</>} />
          <Route path='/navbar' element={<>navbar</>} />

          {/* auth */}
          <Route path='/register' element={<>Registe</>} />
          <Route path='/login' element={<>Login</>} />

          {/* user */}
          <Route path='/dashboard' element={<>Dashboard</>} />
          <Route path='/profile' element={<>Profile</>} />
          <Route path='/myorder' element={<>MyOrder</>} />
          <Route path='/products' element={<>Products</>} />
          <Route path='/product-detial' element={<>ProductDetial</>} />
          <Route path='/cart' element={<>Cart</>} />
          <Route path='/checkout' element={<>Checkout</>} />
          <Route path='/order-traking' element={<>Order Traking</>} />
          <Route path='/address' element={<>Address</>} />

          {/* admin */}
          <Route path='/admin-dashboard' element={<>Admin dashboard</>} />
          <Route path='/manage-products' element={<>manage products</>} />
          <Route path='/manage-categories' element={<>manage Categories</>} />
          <Route path='/manage-order' element={<>manage Order</>} />
          <Route path='/manage-user' element={<>manage User</>} />

          {/* Common router */}
          <Route path='/loader' element={<>Loader</>} />

          {/* Header and Footer */}
          <Route path='/footer' element={<>footer</>} />
          <Route path='/bottom-nav' element={<>bottom nav</>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
