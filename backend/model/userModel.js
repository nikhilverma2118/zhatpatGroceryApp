import { Schema, mongoose } from "mongoose";


// Register User Data
const registerUser = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true,
            unique: true
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);
export const userModel = mongoose.model("User", registerUser);


//Products Data 
const productsData = new Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    size: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const productModel = mongoose.model('AllProducts', productsData)
