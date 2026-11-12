
import jwt from 'jsonwebtoken'

const middleware = (allowedRole) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            if (!authHeader) {
                return res.send({
                    success: false,
                    code: 401,
                    message: 'Token Required',
                    error: true
                })
            }

            const rowToken = authHeader.split(' ')
            const token = rowToken[1]

            if (!token || rowToken[0] !== 'Bearer') {
                return res.send({
                    success: false,
                    code: 401,
                    message: 'Invalid Authorization Format',
                    error: true
                })
            }

            jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {

                if (err) {
                    return res.send({
                        success: false,
                        code: 401,
                        message: 'Invalid token',
                        error: true
                    })
                }

                req.user = decode

                // Role Check
                if (req.user.role !== allowedRole) {
                    return res.send({
                        success: false,
                        code: 403,
                        message: 'Access Denied',
                        error: true
                    })
                }

                next()
            })

        } catch (error) {
            return res.send({
                success: false,
                code: 500,
                message: error.message,
                error: true
            })
        }
    }
}

export default middleware
