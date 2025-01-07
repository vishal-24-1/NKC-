// Dashboard.jsx
import React, { useState } from "react";
import {
  Bar,
  Line,
} from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("today");
  const [franchise, setFranchise] = useState("all");

  const generateRandomData = (length, min, max) =>
    Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);

  const barData = {
    labels: ["Coffee", "Tea", "Cookies", "Snacks", "Other"],
    datasets: [
      {
        label: "Sales by Category",
        data: generateRandomData(5, 50, 150),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const lineData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Revenue Trends",
        data: generateRandomData(7, 200, 800),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const franchiseBarData = {
    labels: ["Franchise 1", "Franchise 2", "Franchise 3", "Franchise 4"],
    datasets: [
      {
        label: "Franchise Performance",
        data: generateRandomData(4, 20, 50),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const barTimeData = {
    labels: ["Morning", "Afternoon", "Evening", "Night"],
    datasets: [
      {
        label: "Customer Visits by Time",
        data: generateRandomData(4, 30, 120),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const aiInsights = [
    `Demand for tea is expected to rise by ${generateRandomData(1, 15, 30)[0]}% over the weekend due to weather conditions.`,
    `Filter coffee sales are projected to increase by ${generateRandomData(1, 10, 25)[0]}% during morning hours (6 AM - 10 AM).`,
    "Suggest adding more cookie stock to meet the predicted demand spike on Friday.",
    "AI indicates snacks are gaining popularity among evening customers.",
    `Franchise ${franchise === "all" ? "performance" : franchise} is trending higher for tea sales this week.`,
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select
            className="border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select
            className="border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            value={franchise}
            onChange={(e) => setFranchise(e.target.value)}
          >
            <option value="all">All Franchises</option>
            <option value="franchise1">Franchise 1</option>
            <option value="franchise2">Franchise 2</option>
          </select>
        </div>
      </header>

      {/* Sales Analytics Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-4 bg-blue-100 border border-blue-200 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-blue-800">Total Revenue</h2>
          <p className="text-2xl font-bold text-blue-900">₹{generateRandomData(1, 100000, 500000)[0]}</p>
          <p className="text-sm text-blue-700">+18% from last month</p>
        </div>
        <div className="p-4 bg-green-100 border border-green-200 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-green-800">Orders</h2>
          <p className="text-2xl font-bold text-green-900">{generateRandomData(1, 500, 2000)[0]}</p>
          <p className="text-sm text-green-700">+10% from last week</p>
        </div>
        <div className="p-4 bg-yellow-100 border border-yellow-200 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-yellow-800">Average Order Value</h2>
          <p className="text-2xl font-bold text-yellow-900">₹{generateRandomData(1, 100, 500)[0]}</p>
          <p className="text-sm text-yellow-700">+5% from yesterday</p>
        </div>
        <div className="p-4 bg-purple-100 border border-purple-200 rounded-lg shadow-md">
          <h2 className="text-sm font-semibold text-purple-800">Items Sold</h2>
          <p className="text-2xl font-bold text-purple-900">{generateRandomData(1, 1000, 5000)[0]}</p>
          <p className="text-sm text-purple-700">+12% from yesterday</p>
        </div>
      </section>

      {/* AI Insights Section */}
      <section className="p-8 bg-yellow-100 border border-yellow-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">AI Insights</h2>
        <ul className="space-y-3">
          {aiInsights.map((insight, index) => (
            <li key={index} className="text-yellow-700 text-base font-medium">
              ⚡ {insight}
            </li>
          ))}
        </ul>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex items-center">
          <div className="mx-auto w-full text-center">
            <h2 className="text-lg font-semibold text-gray-900">Sales by Category</h2>
            <div className="h-64">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex items-center">
          <div className="mx-auto w-full text-center">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>
            <div className="h-64">
              <Line data={lineData} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex items-center">
          <div className="mx-auto w-full text-center">
            <h2 className="text-lg font-semibold text-gray-900">Franchise Performance</h2>
            <div className="h-64">
              <Bar data={franchiseBarData} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex items-center">
          <div className="mx-auto w-full text-center">
            <h2 className="text-lg font-semibold text-gray-900">Customer Visits by Time</h2>
            <div className="h-64">
              <Bar data={barTimeData} options={{ responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
