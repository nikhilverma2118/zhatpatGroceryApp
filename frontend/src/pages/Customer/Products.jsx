import React, { useEffect, useState } from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../../context/CartContext'

const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery", "Masala & Dry Fruits", "Snacks & Namkeen", "Beverages", "Household & Cleaning", "Personal Care", "Baby Care"]

function Products() {

  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('loginToken'))
  const { cartItems, fetchCart } = useCart();

  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [search, setSearch] = useState("")

  // Fetch products from backend
  const getProducts = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-products`)
      setProducts(result?.data?.data || [])
    } catch (error) {
      console.log("Products fetch error:", error)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // Search + Category Filter
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory

    const searchMatch = product.name?.toLowerCase().includes(search.toLowerCase())

    return categoryMatch && searchMatch

  })

  const getProductsDetial = (_id) => {
    navigate(`/product-detial/${_id}`)
  }

  const addToCart = async (_id) => {

    try {
      const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/add-to-cart`, { productId: _id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (result.data.success) {
        fetchCart()
        alert(result.data.message)
      }

    } catch (error) {
      console.log(error.response.data)
    }

  }

  return (
    <div className="fv-page">

      {/* Header */}
      <header className="cart-header px-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          Fruits & Vegetables
          <span className="position-relative">
            <i className="bi bi-cart3"></i>

            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "8px" }}>
              {cartItems.length}
            </span>
          </span>
        </h5>

        <Link to="/dashboard" className="btn btn-outline-danger btn-sm">
          ← Dashboard
        </Link>
      </header>

      {/* Search */}
      <div className="fv-search-wrapper">
        <div className="fv-search">
          <i className="bi bi-search"></i>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button onClick={() => setSearch("")}>
              <i className="bi bi-x-circle"></i>
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="fv-category-wrapper">
        <div className="fv-category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`fv-category-btn ${selectedCategory === category ? "active" : ""
                }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <main className="fv-products-container container-fluid">
        <div className="fv-products-grid">

          {filteredProducts.map((product) => (
            <div className="fv-product-card" key={product._id}>
              <div className="fv-product-image " onClick={(() => getProductsDetial(product._id))}>
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product.image}`}
                  alt={product.name}
                />
              </div>

              <div className="fv-product-info">
                <h6>{product.name}</h6>

                <p className="fv-product-size">{product.size}</p>

                <p className="fv-product-price">
                  ₹{product.price}
                </p>

                <button onClick={() => { addToCart(product._id) }} className="fv-add-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-5">
            <h5>No products found 😔</h5>
          </div>
        )}
      </main>

    </div>
  )
}

export default ProtectedRouter(Products, 'user')
