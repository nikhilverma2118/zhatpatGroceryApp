
import React from "react";
import { NavLink } from "react-router-dom";

const UserLayout = ({ children }) => {

    const menu = [
        { name: "Home", icon: "🏠", path: "/dashboard" },
        { name: "My Orders", icon: "📦", path: "/my-orders" },
        { name: "Cart", icon: "🛒", path: "/cart" },
        { name: "Profile", icon: "👤", path: "/profile" },
        { name: "Help & Support", icon: "🎧", path: "/support" }
    ];

    return (
        <div className="user-layout">

            {/* SIDEBAR */}
            <aside className="user-sidebar">

                <div className="user-logo d-flex flex-column gap-2">
                    <img src="/logo.png" alt="JHATPAT Logo" />
                </div>

                <nav className="user-menu">
                    {menu.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `user-menu-link ${isActive ? "active" : ""}`
                            }
                        >
                            <span>{item.icon}</span>
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
                {/* bootom content */}
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

            {/* MAIN CONTENT */}
            <div className="user-main">

                {/* NAVBAR */}
                <header className="user-navbar">
                    {/* left section */}
                    <div className="user-greeting">
                        <h5>Hello, Nikhil 👋</h5>
                        <small>Good to see you again!</small>
                    </div>
                    {/* right section */}
                    <div className="user-nav-right">
                        <div className="user-search">
                            <span>🔍</span>
                            <input
                                type="text"
                                placeholder="Search products..."
                            />
                        </div>

                        <div className="user-location">
                            📍 Home - 110001
                        </div>

                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="user-content">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default UserLayout;
