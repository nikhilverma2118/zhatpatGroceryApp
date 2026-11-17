import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
        { name: "Snacks", icon: "🍪" },
        { name: "Beverages", icon: "🥤" },
        { name: "Household", icon: "🧴" },
        { name: "Personal Care", icon: "🧼" }
    ];

    // Products Array
    // const products = [
    //     {
    //         id: 1,
    //         name: "Fresh Apple",
    //         price: 120,
    //         unit: "1 Kg",
    //         image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400"
    //     },
    //     {
    //         id: 2,
    //         name: "Amul Milk",
    //         price: 28,
    //         unit: "250 ml",
    //         image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400"
    //     },
    //     {
    //         id: 3,
    //         name: "Brown Bread",
    //         price: 40,
    //         unit: "1 Pack",
    //         image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?w=400"
    //     },
    //     {
    //         id: 4,
    //         name: "Maggi Noodles",
    //         price: 14,
    //         unit: "1 Pack",
    //         image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400"
    //     },
    //     {
    //         id: 5,
    //         name: "Fresh Onion",
    //         price: 30,
    //         unit: "1 Kg",
    //         image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400"
    //     }
    // ];

    return (
        <>
            <div className="user-main bg-black text-light">

                {/* NAVBAR */}
                <header className="user-navbar">
                    {/* left section */}
                    <div className="user-greeting">
                        <h5>Welcome Zhatpat 👋</h5>
                        <small>Good to see you again!</small>
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


                    {/* FEATURED PRODUCTS */}
                    <section className="dashboard-section">

                        <h4 className="section-title">
                            Featured Products
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
                                        <div className="product-card">
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
