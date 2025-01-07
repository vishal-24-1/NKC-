// Analytics.jsx
import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const Analytics = () => {
    const [timeRange, setTimeRange] = useState("All Time");

    const franchisePerformance = {
        "All Time": [
            {
                name: "Anna Nagar",
                status: "Top Performer",
                revenue: 145250,
                orders: 1286,
                avgOrderValue: 113,
                growth: 12,
            },
            {
                name: "KK Nagar",
                status: "Growing",
                revenue: 128750,
                orders: 1124,
                avgOrderValue: 115,
                growth: 8,
            },
            {
                name: "Tirunelveli",
                status: "New",
                revenue: 98500,
                orders: 892,
                avgOrderValue: 110,
                growth: 15,
            },
        ],
        "Last 7 Days": [
            {
                name: "Anna Nagar",
                status: "Top Performer",
                revenue: 50250,
                orders: 286,
                avgOrderValue: 113,
                growth: 5,
            },
            {
                name: "KK Nagar",
                status: "Growing",
                revenue: 48750,
                orders: 274,
                avgOrderValue: 115,
                growth: 4,
            },
            {
                name: "Tirunelveli",
                status: "New",
                revenue: 38500,
                orders: 192,
                avgOrderValue: 110,
                growth: 7,
            },
        ],
        "Last 30 Days": [
            {
                name: "Anna Nagar",
                status: "Top Performer",
                revenue: 125250,
                orders: 986,
                avgOrderValue: 113,
                growth: 10,
            },
            {
                name: "KK Nagar",
                status: "Growing",
                revenue: 115750,
                orders: 874,
                avgOrderValue: 115,
                growth: 9,
            },
            {
                name: "Tirunelveli",
                status: "New",
                revenue: 98500,
                orders: 692,
                avgOrderValue: 110,
                growth: 12,
            },
        ],
    };

    const revenueComparisonData = {
        "All Time": {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [
                {
                    label: "Anna Nagar",
                    data: [48000, 52000, 54000, 56000, 58000, 60000, 62000],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
                {
                    label: "KK Nagar",
                    data: [40000, 42000, 45000, 47000, 50000, 53000, 55000],
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                },
                {
                    label: "Tirunelveli",
                    data: [30000, 32000, 34000, 36000, 38000, 40000, 42000],
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        },
        "Last 7 Days": {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [
                {
                    label: "Anna Nagar",
                    data: [12000, 14000, 16000, 18000, 20000, 22000, 24000],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
                {
                    label: "KK Nagar",
                    data: [11000, 13000, 15000, 17000, 19000, 21000, 23000],
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                },
                {
                    label: "Tirunelveli",
                    data: [9000, 10000, 11000, 12000, 13000, 14000, 15000],
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        },
        "Last 30 Days": {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [
                {
                    label: "Anna Nagar",
                    data: [32000, 34000, 36000, 38000, 40000, 42000, 44000],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                },
                {
                    label: "KK Nagar",
                    data: [30000, 32000, 34000, 36000, 38000, 40000, 42000],
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                },
                {
                    label: "Tirunelveli",
                    data: [25000, 27000, 29000, 31000, 33000, 35000, 37000],
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        },
    };

    return (
        <div className="space-y-8 px-6 py-6 bg-gray-100">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">Franchise Performance Comparison</h1>
                <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                    <option value="All Time">All Time</option>
                    <option value="Last 7 Days">Last 7 Days</option>
                    <option value="Last 30 Days">Last 30 Days</option>
                </select>
            </div>

            {/* Franchise Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {franchisePerformance[timeRange].map((franchise, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-lg font-bold text-gray-800">{franchise.name}</h2>
                        <p className="text-sm text-blue-600">{franchise.status}</p>
                        <p className="text-gray-700 mt-2">Revenue: ₹{franchise.revenue.toLocaleString()}</p>
                        <p className="text-gray-700">Orders: {franchise.orders}</p>
                        <p className="text-gray-700">Avg. Order Value: ₹{franchise.avgOrderValue}</p>
                        <p className={`mt-2 ${franchise.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                            Growth: {franchise.growth > 0 ? `+${franchise.growth}%` : `${franchise.growth}%`}
                        </p>
                    </div>
                ))}
            </div>


            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue Comparison</h2>
                    <Line
                        data={revenueComparisonData[timeRange]}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Weekly Revenue Trends",
                                },
                            },
                        }}
                    />
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-lg">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Volume Trends</h2>
                    <Bar
                        data={revenueComparisonData[timeRange]}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: "top",
                                },
                                title: {
                                    display: true,
                                    text: "Order Volumes by Day",
                                },
                            },
                        }}
                    />
                </div>
            </div>
            {/* Profit & Loss Analysis */}
            <div className="space-y-8 mt-10">
                <h2 className="text-2xl font-bold text-gray-800">Profit & Loss Analysis</h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-green-100 text-green-800 shadow-md rounded-lg p-6 text-center">
                        <p className="text-sm font-semibold">Total Revenue</p>
                        <p className="text-2xl font-bold">₹45,250</p>
                        <p className="text-sm">+15% vs target</p>
                    </div>

                    <div className="bg-red-100 text-red-800 shadow-md rounded-lg p-6 text-center">
                        <p className="text-sm font-semibold">Total Costs</p>
                        <p className="text-2xl font-bold">₹32,180</p>
                        <p className="text-sm">+8% vs target</p>
                    </div>

                    <div className="bg-blue-100 text-blue-800 shadow-md rounded-lg p-6 text-center">
                        <p className="text-sm font-semibold">Net Profit</p>
                        <p className="text-2xl font-bold">₹13,070</p>
                        <p className="text-sm">+22% vs target</p>
                    </div>

                    <div className="bg-orange-100 text-orange-800 shadow-md rounded-lg p-6 text-center">
                        <p className="text-sm font-semibold">Wastage Loss</p>
                        <p className="text-2xl font-bold">₹4,520</p>
                        <p className="text-sm">-12% vs target</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit/Loss by Item</h3>
                        <Bar
                            data={{
                                labels: ["Coffee", "Regular Tea", "Dum Tea", "Vada", "Paniyaram"],
                                datasets: [
                                    {
                                        label: "Revenue",
                                        data: [15000, 12000, 11000, 8000, 7000],
                                        backgroundColor: "rgba(75, 192, 192, 0.8)",
                                    },
                                    {
                                        label: "Cost",
                                        data: [10000, 8000, 9000, 6000, 5000],
                                        backgroundColor: "rgba(255, 99, 132, 0.8)",
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: "top",
                                    },
                                    title: {
                                        display: true,
                                        text: "Profit/Loss by Item",
                                    },
                                },
                            }}
                        />
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Wastage Analysis</h3>
                        <Bar
                            data={{
                                labels: ["Sold", "Wastage", "Samples"],
                                datasets: [
                                    {
                                        label: "Percentage",
                                        data: [70, 15, 15],
                                        backgroundColor: ["rgba(75, 192, 192, 0.8)", "rgba(255, 99, 132, 0.8)", "rgba(255, 206, 86, 0.8)"],
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                    title: {
                                        display: true,
                                        text: "Wastage Analysis",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Analytics;
