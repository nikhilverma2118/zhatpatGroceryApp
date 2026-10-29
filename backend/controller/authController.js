import { userModel } from "../model/userModel.js"
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

// user login

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await userModel.findOne({ email })
        if (data) {
            const isMatch = await bcrypt.compare(password, data.password)
            if (isMatch) {

                const payload = { email: data.email }
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
                    message: 'User Not Found?',
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

