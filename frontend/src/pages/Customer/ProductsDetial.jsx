import React, { useEffect, useState } from "react";
import ProtectedRouter from '../../components/common/ProtectedRouter'
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductsDetial() {

  const token = JSON.parse(localStorage.getItem('loginToken'))
  const { _id } = useParams();

  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("kg");
  const [descriptionOpen, setDescriptionOpen] = useState(true);
  const [detailsOpen, setDetailsOpen] = useState(false);


  // Get single product from backend

  const getProductDetail = async () => {

    try {
      const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-products-detial/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setProduct(result?.data?.data);
    }
    catch (error) {
      console.log("eror");
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);



  // Quantity increase
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Quantity decrease
  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // Add to cart
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

  // Buy now
  const buyNow = () => {
    console.log("Buy Now:", product, quantity, unit);
  };

  return (
    <div className="pd-page container-fluid g-0">

      <header className="fv-header w-100 text-light">
        <h5 className="fv-title"><Link to="/products" className="text-decoration-none text-light">Products Detials</Link></h5>

        <Link to="/dashboard" className="btn btn-outline-danger btn-sm">
          ← Dashboard
        </Link>
      </header>

      {/* Product Layout */}
      <div className="row pd-layout px-2 ">

        {/* Image */}
        <div className="col-12 col-md-6 pd-image-column">
          <div className="pd-image-box">
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${product.image}`}
              alt={product.name}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-12 col-md-6 pd-info-column px-3">

          <h2 className="pd-name">{product.name}</h2>

          <h4 className="pd-price">
            ₹{product.price}/{product.size}
          </h4>

          {/* Rating */}
          <div className="pd-rating">
            <span className="pd-star">★</span>
            <span>4.5</span>
            <span className="pd-review"> (2k reviews)</span>
          </div>

          {/* Product Tags */}
          <div className="pd-tags">
            <span>✦ Fresh</span>
            <span>✦ Organic</span>
            <span>✦ Premium Quality</span>
          </div>

          {/* Quantity */}
          <div className="pd-quantity-section">
            <label>Select Quantity</label>

            <div className="pd-quantity-row">

              <div className="pd-counter">
                <button onClick={decreaseQuantity}>−</button>

                <span>{quantity}</span>

                <button onClick={increaseQuantity}>+</button>
              </div>

              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="pcs">pcs</option>
                <option value="dozen">dozen</option>
              </select>

            </div>
          </div>

          {/* Buttons */}
          <div className="pd-buttons">
            <button className="pd-add-cart" onClick={() => { addToCart(product._id) }}>
              Add to Cart
            </button>

            <button className="btn pd-buy-now btn-outline-danger" onClick={buyNow}>
              Buy Now
            </button>
          </div>

          {/* Description */}
          <div className="pd-accordion">
            <div
              className="pd-accordion-header"
              onClick={() => setDescriptionOpen(!descriptionOpen)}
            >
              <span>Description</span>
              <i className={`bi ${descriptionOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </div>

            {descriptionOpen && (
              <div className="pd-accordion-body">
                {product.description || `${product.name} is fresh and carefully selected for quality.`}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="pd-accordion">
            <div
              className="pd-accordion-header"
              onClick={() => setDetailsOpen(!detailsOpen)}
            >
              <span>Product Details</span>
              <i className={`bi ${detailsOpen ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
            </div>

            {detailsOpen && (
              <div className="pd-accordion-body">
                <p><b>Name:</b> {product.name}</p>
                <p><b>Category:</b> {product.category}</p>
                <p><b>Price:</b> ₹{product.price}</p>
                <p><b>Size:</b> {product.size}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProtectedRouter(ProductsDetial, 'user')

