import express from 'express'
import { addToCart, deleteProducts, deleteUser, getProductData, getProductDetial, getUser, loginController, productsController, registerController, updateProducts } from '../controller/authController.js';
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


// User Route
router.get('/get-products-detial/:_id', middleware('user'), getProductDetial)
router.post("/add-to-cart", middleware('user'), addToCart);




// Common Routes
router.get('/get-products', getProductData)





export default router;