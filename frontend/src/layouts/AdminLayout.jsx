
import React from "react";
import { NavLink } from "react-router-dom";

const AdminLayout = ({ children }) => {

    const menu = [
        { name: "Dashboard", icon: "📊", path: "/admin-dashboard" },
        { name: "Products", icon: "📦", path: "/manage-products" },
        { name: "Categories", icon: "🗂️", path: "/manage-categories" },
        { name: "Orders", icon: "🛒", path: "/manage-order" },
        { name: "Users", icon: "👥", path: "/manage-user" },
        { name: "Delivery Partners", icon: "🛵", path: "/admin-delivery" },
    ];

    return (
        <div className="admin-layout">

            {/* SIDEBAR */}
            <aside className="admin-sidebar">

                <div className="text-center py-3 mb-3">
                    <img
                        src="/logo.png"
                        alt="JHATPAT"
                        className="admin-logo"
                    />
                </div>

                <nav className="d-flex flex-column gap-2">

                    {menu.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `admin-menu-link ${isActive ? "active" : ""}`
                            }
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </NavLink>
                    ))}

                </nav>

                <button
                    className="admin-logout"
                    onClick={() => {
                        localStorage.removeItem("loginToken");
                        localStorage.removeItem("role");
                        window.location.href = "/login";
                    }}
                >
                    🚪 Logout
                </button>

            </aside>


            {/* MAIN AREA */}
            <div className="admin-main">

                {/* NAVBAR */}
                <header className="admin-navbar">

                    <h4 className="mb-0 fw-bold">
                        Admin Dashboard
                    </h4>

                    <div className="d-flex align-items-center gap-3">
                        <span>👤 Admin</span>

                        <div className="admin-avatar">
                            A
                        </div>
                    </div>

                </header>


                {/* PAGE CONTENT */}
                <main className="admin-content">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default AdminLayout;
