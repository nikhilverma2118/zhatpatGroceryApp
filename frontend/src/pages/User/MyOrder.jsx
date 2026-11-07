import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'

const MyOrder = () => {
    return (
        <div>
            MyOrder
        </div>
    )
}

export default ProtectedRouter(MyOrder ,'user')
