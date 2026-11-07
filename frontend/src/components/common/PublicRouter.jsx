import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRouter = (WrappedComponent) => {
    return (props) => {
        const token = JSON.parse(localStorage.getItem('loginToken'))
        const Authrole = JSON.parse(localStorage.getItem('role'))
        if (token) {
            if (Authrole == 'admin') {
                return <Navigate to='/admin-dashboard' replace />
            }
            else {
                return <Navigate to='/dashboard' replace />
            }
        }

        return <WrappedComponent {...props} />
    }
}

export default PublicRouter
