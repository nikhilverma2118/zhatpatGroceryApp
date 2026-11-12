import express from 'express'
import { loginController, productsController, registerController } from '../controller/authController.js';
import middleware from '../middleware/AuthMiddleware.js';

const router = express.Router()


//=> Public Router
router.post("/register", registerController)
router.post("/login", loginController)

// =>Protected Router

// ->Admin Route
router.post("/allProducts", middleware('admin'), productsController)

// ->User Route




export default router;