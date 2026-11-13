import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'

const ManageOrder = () => {
    return (
        <div>
            ManageOrder
        </div>
    )
}

export default ProtectedRouter(ManageOrder, 'admin')
