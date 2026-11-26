import ProtectedRouter from '../../components/common/ProtectedRouter'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {

  const token = JSON.parse(localStorage.getItem('loginToken'))
  const [cartItems, setCartItems] = useState([]);

  // Fetch Cart Data from Backend
  const getCart = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-cart-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(result?.data?.data || []);
    }
    catch (error) {
      console.log("Cart fetch error:", error);
    }
  };


  useEffect(() => {
    getCart();
  }, []);

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
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // Total Amount
  const totalAmount = cartItems.reduce((total, item) => {
    return total + (item.productId?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="cart-page container-fluid">

      {/* Header */}
      <header className="cart-header px-5" >
        <h5>My Cart</h5>
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
                    src={`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}/uploads/${product?.image}`}
                    alt={product?.name}
                  />
                </div>

                {/* Product Info */}
                <div className="cart-product-info">
                  <button
                    className="cart-remove"
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
              <h5>Your cart is empty</h5>
              <Link to="/products" className="btn btn-danger">
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
