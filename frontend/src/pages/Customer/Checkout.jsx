import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'

const Checkout = () => {
  return (
    <div>
      Checkout
    </div>
  )
}

export default ProtectedRouter(Checkout , 'user')
