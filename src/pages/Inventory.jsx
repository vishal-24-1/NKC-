import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Inventory = () => {
  const [selectedFranchise, setSelectedFranchise] = useState("all");

  const inventoryData = {
    all: [
      { item: "Coffee", stock: 50, unit: "kg", threshold: 20 },
      { item: "Tea", stock: 30, unit: "kg", threshold: 15 },
      { item: "Milk", stock: 100, unit: "liters", threshold: 50 },
      { item: "Sugar", stock: 40, unit: "kg", threshold: 20 },
      { item: "Cookies", stock: 25, unit: "packs", threshold: 10 },
    ],
    franchise1: [
      { item: "Coffee", stock: 40, unit: "kg", threshold: 20 },
      { item: "Tea", stock: 25, unit: "kg", threshold: 15 },
      { item: "Milk", stock: 90, unit: "liters", threshold: 50 },
      { item: "Sugar", stock: 35, unit: "kg", threshold: 20 },
      { item: "Cookies", stock: 15, unit: "packs", threshold: 10 },
    ],
    franchise2: [
      { item: "Coffee", stock: 60, unit: "kg", threshold: 25 },
      { item: "Tea", stock: 40, unit: "kg", threshold: 20 },
      { item: "Milk", stock: 120, unit: "liters", threshold: 60 },
      { item: "Sugar", stock: 50, unit: "kg", threshold: 30 },
      { item: "Cookies", stock: 30, unit: "packs", threshold: 15 },
    ],
  };

  const inventory = inventoryData[selectedFranchise];
  const lowStockItems = inventory.filter((item) => item.stock < item.threshold);

  const stockUsageTrends = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: inventory.map((item) => ({
      label: item.item,
      data: [
        Math.max(item.stock - 10, 0),
        Math.max(item.stock - 20, 0),
        Math.max(item.stock - 30, 0),
        item.stock,
      ],
      backgroundColor: `rgba(${Math.floor(Math.random() * 180)}, ${Math.floor(Math.random() * 180)}, ${Math.floor(Math.random() * 255)}, 0.8)`,
    })),
  };

  return (
    <div className="space-y-8 px-6 py-6 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center">Inventory Dashboard</h1>

      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-700 text-lg">
          Switch between franchises to view inventory data specific to each location.
        </p>
        <select
          value={selectedFranchise}
          onChange={(e) => setSelectedFranchise(e.target.value)}
          className="border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        >
          <option value="all">All Franchises</option>
          <option value="franchise1">Franchise 1</option>
          <option value="franchise2">Franchise 2</option>
        </select>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Stock Levels</h2>
        <table className="w-full text-left border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Unit</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="px-4 py-3 font-medium">{item.item}</td>
                <td className={`px-4 py-3 ${item.stock < item.threshold ? "text-red-600 font-bold" : ""}`}>
                  {item.stock}
                </td>
                <td className="px-4 py-3">{item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Low Stock Alerts</h2>
        {lowStockItems.length > 0 ? (
          <ul className="list-disc pl-6 space-y-2">
            {lowStockItems.map((item, index) => (
              <li key={index} className="text-gray-700">
                <span className="font-bold">{item.item}</span> is running low with only{" "}
                <span className="font-bold text-red-600">{item.stock}</span> {item.unit} left.
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">All stock levels are healthy. No alerts at the moment.</p>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Stock Usage Trends</h2>
        <Bar
          data={stockUsageTrends}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
                labels: {
                  color: "gray",
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Weeks",
                  color: "gray",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Stock Level",
                  color: "gray",
                },
                grid: {
                  color: "rgba(200,200,200,0.2)",
                },
              },
            },
          }}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Restock Suggestions</h2>
        {lowStockItems.length > 0 ? (
          lowStockItems.map((item, index) => (
            <p key={index} className="text-gray-700">
              Consider restocking <span className="font-bold">{item.item}</span> to at least{" "}
              <span className="font-bold text-blue-600">{item.threshold * 2} {item.unit}</span>.
            </p>
          ))
        ) : (
          <p className="text-gray-700">No immediate restocking required. Inventory is sufficient.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;
