
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ProtectedRouter from '../../components/common/ProtectedRouter'
import axios from 'axios'


// Yup Validation Schema
const productSchema = yup.object({

    name: yup.string()
        .required('Product name is required'),

    image: yup.mixed()
        .test(
            'required',
            'Product image is required',
            (value) => value && value.length > 0
        ),

    category: yup.string()
        .required('Please select category'),

    price: yup.number()
        .typeError('Price must be a number')
        .positive('Price must be greater than 0')
        .required('Price is required'),

    size: yup.string()
        .required('Product size is required')

})


const ManageProducts = () => {

    const token = JSON.parse(localStorage.getItem('loginToken'))
    const [showModal, setShowModal] = useState(false)
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [editId, setEditId] = useState(null)


    const getProducts = async () => {
        const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-products`)
        setProducts(result?.data?.data || [])
    }

    useEffect(() => {
        getProducts()
    }, [])

    // =>Auto fill Update data in the form 
    const updateProduct = (item) => {
        setEditId(item._id)
        setValue("name", item.name)
        setValue("category", item.category)
        setValue("price", item.price)
        setValue("size", item.size)

        setShowModal(true)
    }

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(productSchema),
        defaultValues: {
            name: '',
            category: '',
            price: '',
            size: ''
        }
    })

    // => Get Data 
    const onSubmit = async (data) => {
        try {
            if (data?.image?.length === 0) {
                alert("Please Upload The File")
                return
            }

            const formData = new FormData()

            formData.append('name', data.name)
            formData.append('category', data.category)
            formData.append('price', data.price)
            formData.append('size', data.size)
            formData.append('image', data.image[0])

            const result = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/addProducts`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (result.data.success) {
                alert(result.data.message)
                getProducts()
                setShowModal(false)
                reset()
            }

        } catch (error) {
            console.log(result?.data.message)
        }
    }

    // => Delete Data
    const deleteProduct = async (_id) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this user?")
        if (!confirmDelete) {
            return
        }

        try {
            const result = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/del-products/${_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (result.data.success == true) {
                alert("Product Deleted Successfully")
                console.log(result.data.message)
                getProducts()
            }

        } catch (error) {
            console.log(result.data.message)
        }
    }

    //Update Data 
    const updateProductData = async (data) => {
        try {

            const formData = new FormData()

            formData.append("name", data.name)
            formData.append("category", data.category)
            formData.append("price", data.price)
            formData.append("size", data.size)

            if (data.image?.[0]) {
                formData.append("image", data.image[0])
            }

            const result = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/update-products/${editId}`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (result.data.success) {
                alert(result.data.message)
                setShowModal(false)
                reset()
                setEditId(null)
                getProducts()
            }
            else {
                alert(result.data.message)
            }

        } catch (error) {
            console.log(result?.data?.message)
        }
    }

    //=> Search Products
    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )

    return (

        <div className="products-page">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

                <div className="d-flex align-items-center gap-3">
                    <h4 className="fw-bold mb-0">
                        Products
                    </h4>

                    <Link
                        to="/admin-dashboard"
                        className="btn btn-outline-danger btn-sm"
                    >
                        ← Dashboard
                    </Link>
                </div>

                {/* add products module button */}
                <button
                    className="btn btn-danger px-3"
                    onClick={() => setShowModal(true)}
                >
                    + Add Product
                </button>

            </div>

            {/* Search */}
            <div className="mb-3">

                <input
                    type="text"
                    className="form-control product-search"
                    placeholder="🔍 Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>
            {/* Products Table */}
            <div className="table-responsive product-table-wrapper">
                <table className="table align-middle product-table mb-0">
                    <thead className='text-center'>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody className='text-center'>

                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((item) => (

                                <tr key={item.id}>

                                    <td>
                                        <div className="product-emoji ">
                                            <img className="img-fluid" src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${item?.image}`} />

                                        </div>
                                    </td>

                                    <td className="fw-semibold">
                                        {item.name}
                                    </td>

                                    <td>
                                        {item.category}
                                    </td>

                                    <td>
                                        ₹{item.price}
                                    </td>

                                    <td>
                                        {item.size}
                                    </td>

                                    <td>
                                        <span className="badge bg-success-subtle text-success">
                                            Active
                                        </span>
                                    </td>

                                    <td>
                                        <div className='d-flex justify-content-center gap-3'>
                                            <span onClick={() => updateProduct(item)} className="badge btn bg-primary-subtle text-primary ">
                                                Edit
                                            </span>

                                            <span onClick={() => deleteProduct(item._id)} className="badge btn bg-danger-subtle text-danger">
                                                del
                                            </span>
                                        </div>
                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-4"
                                >
                                    No Products Found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

            {/* Add Product Modal */}
            {showModal && (

                <div className="product-modal-overlay">

                    <div className="product-modal">

                        {/* Modal Header */}
                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h5 className="fw-bold mb-0">
                                {editId ? "Update Product" : "Add New Product"}
                            </h5>

                            <button
                                className="btn-close"
                                onClick={() => {
                                    setShowModal(false)
                                    setEditId(null)
                                    reset()
                                }}
                            ></button>

                        </div>

                        {/* Product Form */}
                        <form onSubmit={handleSubmit(editId ? updateProductData : onSubmit)}>

                            {/* Product Name */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter product name"
                                    {...register('name')}
                                />

                                <small className="text-danger">
                                    {errors.name?.message}
                                </small>

                            </div>


                            {/* Product Image */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Product Image
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    {...register('image')}
                                />

                                <small className="text-danger">
                                    {errors.image?.message}
                                </small>

                            </div>


                            {/* Product Category */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    className="form-select"
                                    {...register('category')}
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="Fruits">
                                        Fruits
                                    </option>

                                    <option value="Vegetables">
                                        Vegetables
                                    </option>

                                    <option value="Dairy">
                                        Dairy
                                    </option>

                                    <option value="Bakery">
                                        Bakery
                                    </option>

                                    <option value="Grocery">
                                        Masala & Dry Fruits
                                    </option>

                                    <option value="Grocery">
                                        Snacks And Namkeen
                                    </option>

                                    <option value="Grocery">
                                        Beverages
                                    </option>

                                    <option value="Grocery">
                                        Household & Cleaning
                                    </option>

                                    <option value="Grocery">
                                        Personal Care
                                    </option>
                                    
                                    <option value="Grocery">
                                        Baby Care
                                    </option>

                                </select>

                                <small className="text-danger">
                                    {errors.category?.message}
                                </small>

                            </div>


                            {/* Product Price */}
                            <div className="mb-3">

                                <label className="form-label">
                                    Product Price (₹)
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter price"
                                    {...register('price')}
                                />

                                <small className="text-danger">
                                    {errors.price?.message}
                                </small>

                            </div>


                            {/* Product Size */}
                            <div className="mb-4">

                                <label className="form-label">
                                    Product Size
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Example: 1 kg, 500 g, 1 litre"
                                    {...register('size')}
                                />

                                <small className="text-danger">
                                    {errors.size?.message}
                                </small>

                            </div>


                            {/* Form Buttons */}
                            <div className="d-flex justify-content-end gap-2">

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        setShowModal(false)
                                        setEditId(null)
                                        reset()
                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-danger"
                                >
                                    {editId ? ' Update Product' : ' Add Product'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    )

}


export default ProtectedRouter(ManageProducts, 'admin')
