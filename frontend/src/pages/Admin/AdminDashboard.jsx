
import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import ProtectedRouter from "../../components/common/ProtectedRouter";

const AdminDashboard = () => {

    // Statistics Data
    const stats = [
        {
            title: "Total Orders",
            value: "1245",
            growth: "↑ 12%",
            color: "success"
        },
        {
            title: "Total Sales",
            value: "₹2,48,320",
            growth: "↑ 18%",
            color: "success"
        },
        {
            title: "Total Users",
            value: "842",
            growth: "↑ 10%",
            color: "success"
        },
        {
            title: "Pending Orders",
            value: "36",
            growth: "↓ 5%",
            color: "danger"
        }
    ];

    // Recent Orders Data
    const orders = [
        { id: "RJM1245", amount: 298, status: "Delivered" },
        { id: "RJM1244", amount: 332, status: "Preparing" },
        { id: "RJM1243", amount: 245, status: "Out for Delivery" },
        { id: "RJM1242", amount: 678, status: "Pending" },
        { id: "RJM1241", amount: 412, status: "Delivered" }
    ];

    // Sales Chart Data
    const sales = [
        { day: "6 Aug", value: 220 },
        { day: "7 Aug", value: 380 },
        { day: "8 Aug", value: 280 },
        { day: "9 Aug", value: 310 },
        { day: "10 Aug", value: 420 },
        { day: "11 Aug", value: 400 },
        { day: "12 Aug", value: 550 },
        { day: "13 Aug", value: 580 }
    ];


    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
                return "success";

            case "Preparing":
                return "danger";

            case "Out for Delivery":
                return "info";

            case "Pending":
                return "warning";

            default:
                return "secondary";
        }
    };

    return (
        <AdminLayout>

            {/* STATISTICS CARDS */}
            <div className="row g-3 mb-4">

                {stats.map((item, index) => (
                    <div className="col-6 col-xl-3" key={index}>

                        <div className="admin-stat-card p-3 h-100">

                            <p className="text-secondary mb-2">
                                {item.title}
                            </p>

                            <h3 className="fw-bold mb-3">
                                {item.value}
                            </h3>

                            <span className={`text-${item.color} fw-semibold`}>
                                {item.growth}
                            </span>

                        </div>

                    </div>
                ))}

            </div>

            {/* SALES CHART + RECENT ORDERS */}
            <div className="row g-3">

                {/* SALES OVERVIEW */}
                <div className="col-12 col-xl-7">

                    <div className="admin-panel p-3 h-100">

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-semibold mb-0">
                                Sales Overview
                            </h5>

                            <select className="form-select form-select-sm admin-select">
                                <option>Last 7 days</option>
                                <option>Last 30 days</option>
                                <option>Last 12 months</option>
                            </select>
                        </div>

                        {/* Simple Sales Chart */}
                        <div className="sales-chart">

                            <div className="chart-labels">
                                <span>600</span>
                                <span>450</span>
                                <span>300</span>
                                <span>150</span>
                                <span>0</span>
                            </div>

                            <div className="chart-area">

                                <svg
                                    viewBox="0 0 700 300"
                                    preserveAspectRatio="none"
                                    className="sales-svg"
                                >
                                    <defs>
                                        <linearGradient
                                            id="salesGradient"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#ea1627"
                                                stopOpacity="0.7"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#ea1627"
                                                stopOpacity="0.02"
                                            />
                                        </linearGradient>
                                    </defs>

                                    {[50, 110, 170, 230, 290].map((y, i) => (
                                        <line
                                            key={i}
                                            x1="0"
                                            y1={y}
                                            x2="700"
                                            y2={y}
                                            stroke="#26343d"
                                            strokeDasharray="5 5"
                                        />
                                    ))}

                                    <polygon
                                        points={`0,${300 - sales[0].value / 2}
                                        ${sales.map((item, index) =>
                                            `${index * 100},${300 - item.value / 2}`
                                        ).join(" ")}
                                        700,300 0,300`}
                                        fill="url(#salesGradient)"
                                    />

                                    <polyline
                                        points={sales.map((item, index) =>
                                            `${index * 100},${300 - item.value / 2}`
                                        ).join(" ")}
                                        fill="none"
                                        stroke="#ea1627"
                                        strokeWidth="5"
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                    />

                                    {sales.map((item, index) => (
                                        <circle
                                            key={index}
                                            cx={index * 100}
                                            cy={300 - item.value / 2}
                                            r="5"
                                            fill="#ea1627"
                                        />
                                    ))}

                                </svg>

                                <div className="d-flex justify-content-between chart-days">
                                    {sales.map((item, index) => (
                                        <small key={index}>{item.day}</small>
                                    ))}
                                </div>

                            </div>
                        </div>

                    </div>

                </div>


                {/* RECENT ORDERS */}
                <div className="col-12 col-xl-5">

                    <div className="admin-panel p-3 h-100">

                        <h5 className="fw-semibold mb-3">
                            Recent Orders
                        </h5>

                        <div className="table-responsive">

                            <table className="table admin-table align-middle">

                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {orders.map((order) => (
                                        <tr key={order.id}>

                                            <td>{order.id}</td>

                                            <td>₹{order.amount}</td>

                                            <td>
                                                <span className={`badge text-bg-${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </AdminLayout>
    );
};

export default ProtectedRouter(AdminDashboard, 'admin');
