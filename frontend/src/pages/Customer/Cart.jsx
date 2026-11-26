import ProtectedRouter from '../../components/common/ProtectedRouter'
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from '../../context/CartContext';

const Cart = () => {

  // Fetch Cart Data from Backend Using Context
  const { cartItems, setCartItems, fetchCart } = useCart();

  const token = JSON.parse(localStorage.getItem('loginToken'))

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = async (_id) => {

    const confirmDelete = window.confirm("Are you sure you want to delete this user?")
    if (!confirmDelete) {
      return
    }

    try {
      const result = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/remove-cart-item`,
        {
          data: { _id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (result.data.success) {
        alert(result.data.message)
        fetchCart()

      }

    }
    catch (error) {
      console.log(error.response.data)
    }


  };

  // Total Amount
  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.productId?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="cart-page container-fluid">

      {/* Header */}
      <header className="cart-header px-5 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 d-flex align-items-center gap-2">
          My Cart
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

      {/* Cart Items */}
      <div className="cart-content">

        <div className="cart-items">
          {cartItems.map((item) => {
            const product = item.productId;

            return (
              <div className="cart-card" key={item._id}>

                {/* Product Image */}
                <div className="cart-image">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product.image}`}
                    alt={product?.name}
                  />
                </div>

                {/* Product Info */}
                <div className="cart-product-info">
                  <button
                    className="cart-remove "
                    onClick={() => removeItem(item._id)}
                  >
                    ×
                  </button>

                  <h6>{product?.name}</h6>

                  <p className="cart-price">
                    ₹{product?.price}/{product?.size}
                  </p>

                  <div className="cart-quantity">
                    <button onClick={() => decreaseQuantity(item._id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="cart-item-total">
                  ₹{(product?.price || 0) * item.quantity}
                </div>

              </div>
            );
          })}

          {cartItems.length === 0 && (
            <div className="cart-empty">
              <i className="bi bi-cart3"></i>
              <h5>Your cart is empty !</h5>
              <Link to="/products" className="btn btn-danger mt-3">
                Shop Now
              </Link>
            </div>
          )}
        </div>

        {/* Checkout Section */}
        {cartItems.length > 0 && (
          <div className="cart-checkout">
            <div className="cart-total-row">
              <h6>Total Amount</h6>
              <h5>₹{totalAmount}</h5>
            </div>

            <button
              className="cart-checkout-btn"
              onClick={() => console.log("Proceed to Checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default ProtectedRouter(Cart, 'user')
