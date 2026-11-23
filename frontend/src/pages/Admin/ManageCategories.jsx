import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ManageCategories = () => {

    const [products, setProducts] = useState([])

    //Get All Products
    const getProducts = async () => {
        const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-products`)
        setProducts(result?.data?.data || [])
    }

    useEffect(() => {
        getProducts()
    }, [])

    // Categories Array
    const categories = [
        { name: "Fruits", icon: "🍎" },
        { name: "Vegetables", icon: "🥦" },
        { name: "Dairy", icon: "🥛" },
        { name: "Bakery", icon: "🍞" },
        { name: "Grocery", icon: "🌾" },
        { name: "Masala & Dry Fruits", icon: "🌶️" },
        { name: "Snacks And Namkeen", icon: "🥨" },
        { name: "Beverages", icon: "🥤" },
        { name: "Household & Cleaning", icon: "🧹" },
        { name: "Personal Care", icon: "🧼" },
        { name: "Baby Care", icon: "🍼" }
    ];

    return (
        <>
            <div className="user-main bg-black text-light">

                {/* NAVBAR */}
                <header className="user-navbar">
                    {/* left section */}
                    <div className="user-greeting d-flex gap-2 align-items-center">
                        <div>
                            <h5>Welcome Zhatpat 👋</h5>
                            <small>Good to see you again!</small>
                        </div>
                        <div>
                            <Link
                                to="/admin-dashboard"
                                className="btn btn-outline-danger btn-sm"
                            >
                                ← Dashboard
                            </Link>
                        </div>
                    </div>
                    {/* right section */}
                    <div className="user-nav-right">
                        <div className="user-search">
                            <span>🔍</span>
                            <input
                                type="text"
                                placeholder="Search products..."
                            />
                        </div>

                        <div className="user-location">
                            📍 Home - 110001
                        </div>

                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="user-content">
                    {/* BANNER */}
                    <section className="grocery-banner">
                        <div className="banner-content">
                            <h2>Fresh Grocery</h2>
                            <h3>Delivered in Minutes</h3>

                            <button className="btn banner-btn">
                                Shop Now
                            </button>
                        </div>
                    </section>

                    {/* CATEGORIES */}
                    <section className="dashboard-section">
                        <h4 className="section-title">All Categories</h4>

                        <div className="row g-3">
                            {categories.map((category, index) => (
                                <div
                                    className="col-6 col-sm-4 col-md-3 col-lg"
                                    key={index}
                                >
                                    <div className="category-card">
                                        <div className="category-icon">
                                            {category.icon}
                                        </div>
                                        <p>{category.name}</p>

                                    </div>
                                </div>
                            ))}

                        </div>

                    </section>

                    {/* Fruits */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Fruits
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Fruits")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Vegetables */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Vegetables
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Vegetables")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Dairy */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Dairy
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Dairy")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Bakery */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Bakery
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Bakery")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Grocery */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Grocery
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Grocery")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Masala & Dry Fruits */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Masala & Dry Fruits
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Masala & Dry Fruits")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Snacks And Namkeen */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Snacks And Namkeen
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === " Snacks And Namkeen")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Beverages */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Beverages
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Beverages")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Household & Cleaning */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Household & Cleaning
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Household & Cleaning")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Personal Care */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Personal Care
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Personal Care")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                    {/* Baby Care */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Baby Care
                        </h4>

                        <div className="row g-3 mb-3">

                            {products
                                .filter((product) => product.category === "Baby Care")
                                .slice(-5)
                                .reverse()
                                .map((product) => (
                                    <div
                                        className="col-6 col-sm-4 col-md-4 col-lg"
                                        key={product._id}
                                    >
                                        <div className="product-card d-flex flex-column justify-content-between">
                                            <img
                                                className="img-fluid"
                                                src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                            />

                                            <div className="product-info">
                                                <h6>{product.name}</h6>
                                                <p>₹{product.price}/{product.size}</p>

                                                <button className="btn add-cart-btn btn-outline-danger">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                        </div>

                    </section>

                </main>

            </div>

        </>
    )
}

export default ProtectedRouter(ManageCategories, 'admin')
