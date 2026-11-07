import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRouter = (WrappedComponent, allowedRole) => {
  return (props) => {
    const token = JSON.parse(localStorage.getItem('loginToken'))
    const role = JSON.parse(localStorage.getItem('role'))

    if (!token) return <Navigate to='/login' replace />

    if (role !== allowedRole) {
      return <Navigate to='/unauthorized' replace />
    }

    return <WrappedComponent {...props} />

  }
}

export default ProtectedRouter
