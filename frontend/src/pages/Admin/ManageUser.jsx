
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProtectedRouter from '../../components/common/ProtectedRouter'
import axios from 'axios'


const ManageUser = () => {

    const token = JSON.parse(localStorage.getItem('loginToken'))
    const [search, setSearch] = useState('')
    const [userData, setUserData] = useState([])

    const getUser = async () => {
        const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        setUserData(result?.data?.data || [])
    }

    useEffect(() => {
        getUser()
    }, [])

    const blockUser = async (_id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this user?")
        if (!confirmDelete) {
            return
        }

        try {
            const result = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/delete-user/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (result.data.success == true) {
                alert("User Deleted Successfully")
                console.log(result.data.message)
                getUser()
            }

        } catch (error) {
            console.log(result.data.message)
        }
    }

    //=> Search User
    const filteredUser = userData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )


    return (

        <div className="products-page">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                <div className="d-flex align-items-center gap-3">
                    <div className="text-center  mb-4">
                        <img
                            src="/logo.png"
                            alt="JHATPAT"
                            className="admin-logo"
                        />
                    </div>
                </div>

                <h4 className="fw-bold mb-0">
                    All Users
                </h4>

                <Link
                    to="/admin-dashboard"
                    className="btn btn-outline-danger btn-sm"
                >
                    ← Dashboard
                </Link>

            </div>

            {/* Search */}
            <div className="mb-3">

                <input
                    type="text"
                    className="form-control product-search"
                    placeholder="🔍 Search User..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>
            {/* User Table */}
            <div className="table-responsive product-table-wrapper">
                <table className="table align-middle product-table mb-0">
                    <thead className='text-center'>
                        <tr>
                            <th>S.N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>

                        {filteredUser.length > 0 ? (
                            filteredUser.map((item, index) => (

                                <tr key={item.id}>

                                    <td className="fw-semibold">
                                        {index + 1}
                                    </td>

                                    <td className="fw-semibold">
                                        {item.name}
                                    </td>

                                    <td>
                                        {item.email}
                                    </td>

                                    <td>
                                        ₹{item.phone}
                                    </td>

                                    <td>
                                        {item.role}
                                    </td>

                                    <td>
                                        <span onClick={() => blockUser(item._id)} className="badge btn bg-danger-subtle text-danger">
                                            Block Users
                                        </span>
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-4"
                                >
                                    No User Found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>


        </div>

    )

}


export default ProtectedRouter(ManageUser, 'admin')

