import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'


const OrderTracking = () => {
    return (
        <div>
            OrderTracking
        </div>
    )
}

export default ProtectedRouter(OrderTracking , 'user')
