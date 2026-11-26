import React, { useEffect, useState } from "react";
import UserLayout from "../../layouts/UserLayout";
import ProtectedRouter from "../../components/common/ProtectedRouter";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Dashboard = () => {

    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('loginToken'))
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
                alert(result.data.message)
            }

        } catch (error) {
            console.log(error.response.data)
        }

    }

    return (
        <>
            <UserLayout>

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
                                className="col-6 col-sm-4 col-md-3 col-lg "
                                key={index}
                            >
                                <Link to='/products' className="text-decoration-none text-light">
                                    <div className="category-card ">
                                        <div className="category-icon">
                                            {category.icon}
                                        </div>
                                        <p>{category.name}</p>

                                    </div>
                                </Link>
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
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
                                    <div className="product-card d-flex flex-column justify-content-between " >
                                        <img
                                            className="img-fluid" onClick={(() => getProductsDetial(product._id))}
                                            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product?.image}`}
                                        />

                                        <div className="product-info">
                                            <h6>{product.name}</h6>
                                            <p>₹{product.price}/{product.size}</p>

                                            <button onClick={() => { addToCart(product._id) }} className="btn add-cart-btn btn-outline-danger">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                    </div>

                </section>

            </UserLayout>
        </>
    );
};

export default ProtectedRouter(Dashboard, 'user');
