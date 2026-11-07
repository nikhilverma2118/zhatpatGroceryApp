import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'


const Address = () => {
    return (
        <div>
            Address
        </div>
    )
}

export default ProtectedRouter(Address, 'user')
