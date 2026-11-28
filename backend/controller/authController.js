import { cartModel, productModel, userModel } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// user register
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body
        const isExist = await userModel.findOne({ email })
        if (isExist) {
            res.json({
                success: false,
                code: 400,
                message: 'User Alredy Registerd?',
                error: true
            })
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10)
            const data = new userModel({ name, email, password: hashPassword, phone })
            const userData = await data.save()
            res.json({
                success: true,
                code: 200,
                message: 'Congrutulation You Are Registerd',
                data: userData,
                error: false
            })

        }


    } catch (error) {
        res.json({
            success: false,
            code: 500,
            message: 'Internal Server Error?',
            error: true
        })
    }

}

//get User data
export const getUser = async (req, res) => {
    try {
        const data = await userModel.find()
        return res.json({
            success: true,
            code: 200,
            message: "User Fetched Successfully",
            data,
            error: false
        })
    }
    catch (error) {
        return res.json({
            success: false,
            code: 500,
            message: "Internal Server Error",
            error: true
        })
    }
}

// Delete User 
export const deleteUser = async (req, res) => {
    try {
        const { _id } = req.params
        const result = await userModel.deleteOne({ _id })

        return res.json({
            success: true,
            code: 200,
            message: "Delete User!",
            result,
            error: false
        })
    }
    catch (error) {
        return res.json({
            success: false,
            code: 500,
            message: "Internal Server Error",
            error: true
        })
    }

}

// user login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await userModel.findOne({ email })
        if (data) {
            const isMatch = await bcrypt.compare(password, data.password)
            if (isMatch) {

                const payload = { _id: data._id, email: data.email, role: data.role }
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
                res.json({
                    success: true,
                    code: 200,
                    message: 'You Are Login Successfully!',
                    data: data,
                    token,
                    error: false
                })
            }
            else {
                res.json({
                    success: false,
                    code: 400,
                    message: 'User Not Found & Password Incorrect?',
                    error: true
                })
            }
        }
        else {
            res.json({
                success: false,
                code: 400,
                message: 'User Not Found?',
                error: true
            })
        }

    } catch (error) {
        res.json({
            success: false,
            code: 500,
            message: 'Internal Server Error?',
            error: true
        })
    }

}

// Get User Profile
export const getUserProfileData = async (req, res) => {
    try {
        const userId = req.user._id;
        const data = await userModel.findById(userId);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User Profile Get Successfully",
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Admin Insert Products 
export const productsController = async (req, res) => {
    try {
        const { name, price, category, size } = req.body
        let { image } = req.files

        // Check Product Already Exists
        const existProduct = await productModel.findOne({ name })

        if (existProduct) {
            return res.json({
                success: false,
                code: 400,
                message: 'Product Already Exists',
                error: true
            })
        }

        // Upload Image
        await image.mv('./uploads/' + image.name)

        const data = new productModel({ name, image: image.name, price, category, size })
        const result = await data.save()
        return res.json({
            success: true,
            code: 201,
            message: 'Product Added Successfully',
            error: false,
            result
        })
    }
    catch (error) {
        return res.json({
            success: false,
            code: 500,
            message: 'Internal Server Error?',
            error: true
        })
    }
}

// Get A Products 
export const getProductData = async (req, res) => {
    try {
        const data = await productModel.find()
        return res.json({
            success: true,
            code: 200,
            message: "Products Fetched Successfully",
            data,
            error: false
        })
    }
    catch (error) {
        return res.json({
            success: false,
            code: 500,
            message: "Internal Server Error",
            error: true
        })
    }
}

// Delete a Products
export const deleteProducts = async (req, res) => {
    try {
        const { _id } = req.params
        const result = await productModel.deleteOne({ _id })
        return res.json({
            success: true,
            code: 200,
            message: "Delete Products!",
            result,
            error: false
        })
    }
    catch (error) {
        return res.json({
            success: false,
            code: 500,
            message: "Internal Server Error",
            error: true
        })
    }

}

// Update Products
export const updateProducts = async (req, res) => {
    try {
        const { _id } = req.params
        const { name, price, category, size } = req.body
        let { image } = req.files

        const existProduct = await productModel.findOne({
            name,
            _id: { $ne: _id }
        })

        if (existProduct) {
            return res.json({
                success: false,
                code: 400,
                message: "Product Already Exists",
                error: true
            })
        }

        await image.mv('./uploads/' + image.name)
        const data = await productModel.updateOne({ _id }, { $set: { name, image: image.name, price, category, size } })

        return res.json({
            success: true,
            code: 200,
            message: "Update Products!",
            data,
            error: false
        })
    }
    catch (error) {
        return res.json({
            success: false,
            code: 500,
            message: "Internal Server Error",
            error: true
        })
    }

}

// Get ProductDetial
export const getProductDetial = async (req, res) => {
    try {
        const { _id } = req.params;

        const product = await productModel.findById(_id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found!",
                error: true
            });
        }

        return res.json({
            success: true,
            code: 200,
            message: "Product Details Fetched!",
            data: product,
            error: false
        });

    } catch (error) {
        return res.json({
            success: false,
            code: 500,
            message: "Internal Server Error",
            error: true
        });
    }
};

//Add To Cart
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user._id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID required!"
            });
        }

        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found!"
            });
        }

        const cartItem = await cartModel.findOneAndUpdate(
            { userId, productId },
            { $inc: { quantity: 1 } },
            { returnDocument: "after", upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: "Product added to cart!",
            data: cartItem,
            error: false
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Cart Detial 
export const getMyCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const data = await cartModel.find({ userId }).populate("productId");

        return res.status(200).json({
            success: true,
            message: "Cart fetched successfully!",
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// REMOVE CART ITEM
export const removeCartItem = async (req, res) => {
    try {
        const { _id } = req.body;
        const userId = req.user._id;

        const data = await cartModel.findOneAndDelete({ _id, userId });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found!",
                else: true
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product removed from cart!",
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// UPDATE QUANTITY
export const updateCartQuantity = async (req, res) => {
    try {
        const { _id } = req.body;
        const { quantity } = req.body;
        const userId = req.user._id;

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1!"
            });
        }

        const cartItem = await cartModel.findOneAndUpdate(
            { _id, userId },
            { $set: { quantity } },
            { returnDocument: "after" }
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found!"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Quantity updated!",
            data: cartItem
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Clear Quantity
export const clearMyCart = async (req, res) => {
    try {
        const userId = req.user._id;

        await cartModel.deleteMany({ userId });

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


