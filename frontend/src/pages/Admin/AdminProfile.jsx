
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProtectedRouter from '../../components/common/ProtectedRouter'


function AdminProfile() {

    const token = JSON.parse(localStorage.getItem('loginToken'))
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    // Get Admin Profile

    const getProfile = async () => {
        try {
            const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-admin-profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (result?.data?.success) {
                setUser(result?.data?.data || {});
            }

        } catch (error) {
            console.log(result?.data?.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("loginToken");
        localStorage.removeItem("role");
        navigate("/login");
    };

    const menuItems = [
        { icon: "bi-calendar2-check", title: "My Orders", path: "/myorder" },
        { icon: "bi-gear", title: "My Cart", path: "/cart" },
        { icon: "bi-geo-alt-fill", title: "Addresses", path: "/address" },
        { icon: "bi-credit-card", title: "Payment Methods", path: "/checkout" },
        { icon: "bi-question-circle", title: "Help & Support", path: "/help" },
    ];

    return (
        <div className="profile-page">

            {/* Profile Header */}
            <div className="profile-user">
                <div className="profile-avatar">
                    <i className="bi bi-person-circle"></i>
                </div>

                <h4>{user.name || "User Name"}</h4>
                <p>{user.email || "user@email.com"}</p>
            </div>

            {/* Menu */}
            <div className="profile-menu">
                {menuItems.map((item) => (
                    <Link to={item.path} className="profile-menu-item" key={item.title}>
                        <div className="profile-menu-left">
                            <i className={`bi ${item.icon}`}></i>
                            <span>{item.title}</span>
                        </div>

                        <i className="bi bi-chevron-right profile-arrow"></i>
                    </Link>
                ))}
            </div>

            {/* Logout */}
            <button className="profile-logout" onClick={handleLogout}>
                Logout
            </button>

            {/* Bottom Navigation */}
            <nav className="profile-bottom-nav">
                <Link to="/dashboard" className="profile-nav-item">
                    <i className="bi bi-house-fill"></i>
                    <span>Home</span>
                </Link>

                <Link to="/products" className="profile-nav-item">
                    <i className="bi bi-grid"></i>
                    <span>Categories</span>
                </Link>

                <Link to="/cart" className="profile-nav-item">
                    <i className="bi bi-cart3"></i>
                    <span>Cart</span>
                </Link>

                <Link to="/myorder" className="profile-nav-item">
                    <i className="bi bi-bag-check"></i>
                    <span>Orders</span>
                </Link>

                <Link to="/profile" className="profile-nav-item active">
                    <i className="bi bi-person-circle"></i>
                    <span>Profile</span>
                </Link>
            </nav>

        </div>
    );
}

export default ProtectedRouter(AdminProfile, 'admin')
