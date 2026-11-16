import express from 'express'
import { deleteProducts, deleteUser, getProductData, getUser, loginController, productsController, registerController, updateProducts } from '../controller/authController.js';
import middleware from '../middleware/AuthMiddleware.js';


const router = express.Router()


//=> Public Router.................
router.post("/register", registerController)
router.post("/login", loginController)

// =>Protected Router...............

// Admin Route
router.get('/get-user', middleware('admin'), getUser)
router.delete('/delete-user/:_id', deleteUser)
router.post("/addProducts", middleware('admin'), productsController)
router.delete('/del-products/:_id', middleware('admin'), deleteProducts)
router.put('/update-products/:_id', middleware('admin'), updateProducts)


// User Route



// Common Routes
router.get('/get-products', getProductData)





export default router;