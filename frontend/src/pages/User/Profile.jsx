import React from 'react'
import ProtectedRouter from '../../components/common/ProtectedRouter'

const Profile = () => {
    return (
        <div>
            Profile
        </div>
    )
}

export default  ProtectedRouter(Profile , 'user')
