import express from 'express'
import { addToCart, clearMyCart, deleteProducts, deleteUser, getMyCart, getProductData, getProductDetial, getUser, getUserProfileData, loginController, productsController, registerController, removeCartItem, updateCartQuantity, updateProducts } from '../controller/authController.js';
import middleware from '../middleware/AuthMiddleware.js';


const router = express.Router()


//=> Public Router.................
router.post("/register", registerController)
router.post("/login", loginController)

// =>Protected Router...............

// Admin Route
router.get('/get-user', middleware('admin'), getUser)
router.delete('/delete-user/:_id', middleware('admin'), deleteUser)
router.post("/addProducts", middleware('admin'), productsController)
router.delete('/del-products/:_id', middleware('admin'), deleteProducts)
router.put('/update-products/:_id', middleware('admin'), updateProducts)
router.get("/get-admin-profile", middleware('admin'), getUserProfileData);


// User Route
router.get('/get-products-detial/:_id', middleware('user'), getProductDetial)
router.post("/add-to-cart", middleware('user'), addToCart);
router.get("/get-cart-data", middleware('user'), getMyCart);
router.delete("/remove-cart-item", middleware('user'), removeCartItem);
router.put("/update-cart-quantity", middleware('user'), updateCartQuantity);
router.delete("/clear-my-cart", middleware('user'), clearMyCart);
router.get("/get-user-profile", middleware('user'), getUserProfileData);




// Common Routes
router.get('/get-products', getProductData)





export default router;