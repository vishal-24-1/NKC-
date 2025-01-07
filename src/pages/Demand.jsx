import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const Demand = () => {
  const [selectedFranchise, setSelectedFranchise] = useState("all");
  const [dayType, setDayType] = useState("normal");

  const franchiseData = {
    all: [
      { item: "Coffee", demand: 120, trend: "up" },
      { item: "Tea", demand: 95, trend: "up" },
      { item: "Cookies", demand: 150, trend: "steady" },
      { item: "Snacks", demand: 80, trend: "down" },
      { item: "Other", demand: 50, trend: "up" },
    ],
    franchise1: [
      { item: "Coffee", demand: 100, trend: "up" },
      { item: "Tea", demand: 80, trend: "steady" },
      { item: "Cookies", demand: 120, trend: "up" },
      { item: "Snacks", demand: 70, trend: "down" },
      { item: "Other", demand: 40, trend: "steady" },
    ],
    franchise2: [
      { item: "Coffee", demand: 140, trend: "up" },
      { item: "Tea", demand: 110, trend: "up" },
      { item: "Cookies", demand: 180, trend: "steady" },
      { item: "Snacks", demand: 90, trend: "up" },
      { item: "Other", demand: 60, trend: "up" },
    ],
  };

  const futureDemandDataSets = {
    normal: {
      all: [
        { label: "Coffee", data: [120], backgroundColor: "#FF6384" },
        { label: "Tea", data: [95], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [150], backgroundColor: "#FFCE56" },
      ],
      franchise1: [
        { label: "Coffee", data: [100], backgroundColor: "#FF6384" },
        { label: "Tea", data: [80], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [120], backgroundColor: "#FFCE56" },
      ],
      franchise2: [
        { label: "Coffee", data: [140], backgroundColor: "#FF6384" },
        { label: "Tea", data: [110], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [180], backgroundColor: "#FFCE56" },
      ],
    },
    festive: {
      all: [
        { label: "Coffee", data: [150], backgroundColor: "#FF6384" },
        { label: "Tea", data: [110], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [200], backgroundColor: "#FFCE56" },
      ],
      franchise1: [
        { label: "Coffee", data: [130], backgroundColor: "#FF6384" },
        { label: "Tea", data: [90], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [160], backgroundColor: "#FFCE56" },
      ],
      franchise2: [
        { label: "Coffee", data: [180], backgroundColor: "#FF6384" },
        { label: "Tea", data: [130], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [250], backgroundColor: "#FFCE56" },
      ],
    },
    weekend: {
      all: [
        { label: "Coffee", data: [140], backgroundColor: "#FF6384" },
        { label: "Tea", data: [100], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [180], backgroundColor: "#FFCE56" },
      ],
      franchise1: [
        { label: "Coffee", data: [110], backgroundColor: "#FF6384" },
        { label: "Tea", data: [85], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [130], backgroundColor: "#FFCE56" },
      ],
      franchise2: [
        { label: "Coffee", data: [160], backgroundColor: "#FF6384" },
        { label: "Tea", data: [120], backgroundColor: "#36A2EB" },
        { label: "Cookies", data: [210], backgroundColor: "#FFCE56" },
      ],
    },
  };

  const [futureDemandData, setFutureDemandData] = useState({
    labels: ["Next Week"],
    datasets: futureDemandDataSets.normal.all,
  });

  useEffect(() => {
    setFutureDemandData({
      labels: ["Next Week"],
      datasets: futureDemandDataSets[dayType][selectedFranchise],
    });
  }, [selectedFranchise, dayType]);

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center">Demand Overview</h1>
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <p className="text-gray-700 text-center md:text-left mb-4 md:mb-0">
          Here is a simple view of the current and predicted demand for popular items. Each item shows its current demand and the trend (increasing, decreasing, or steady).
        </p>
        <select
          value={selectedFranchise}
          onChange={(e) => setSelectedFranchise(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Franchises</option>
          <option value="franchise1">Franchise 1</option>
          <option value="franchise2">Franchise 2</option>
        </select>
      </div>
      <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">Item</th>
            <th className="px-4 py-3 text-left">Current Demand</th>
            <th className="px-4 py-3 text-left">Trend</th>
          </tr>
        </thead>
        <tbody>
          {franchiseData[selectedFranchise].map((data, index) => (
            <tr
              key={index}
              className={
                index % 2 === 0
                  ? "bg-gray-100 border-b border-gray-300 hover:bg-indigo-50 transition"
                  : "bg-white border-b border-gray-300 hover:bg-indigo-50 transition"
              }
            >
              <td className="px-4 py-3 text-gray-800 font-semibold">{data.item}</td>
              <td className="px-4 py-3 text-gray-800">{data.demand}</td>
              <td
                className={`px-4 py-3 font-bold flex items-center gap-2 ${
                  data.trend === "up"
                    ? "text-green-500"
                    : data.trend === "down"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {data.trend === "up" ? "Increasing ⬆" : data.trend === "down" ? "Decreasing ⬇" : "Steady →"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Select Day Type</h2>
          <select
            value={dayType}
            onChange={(e) => setDayType(e.target.value)}
            className="border border-gray-300 rounded-lg px-6 py-3 text-gray-700 w-full mb-6 shadow-sm focus:ring-2 focus:ring-indigo-500 bg-indigo-50 hover:bg-indigo-100 transition"
          >
            <option value="normal">Normal Day</option>
            <option value="festive">Festive Day</option>
            <option value="weekend">Weekend</option>
          </select>
          <div className="space-y-4">
            <p className="text-gray-600 text-base flex items-center gap-2">
              <span className="text-yellow-500">⚡</span> Coffee demand increases on weekends by 15%.
            </p>
            <p className="text-gray-600 text-base flex items-center gap-2">
              <span className="text-yellow-500">⚡</span> Tea is steady in normal conditions, spiking on festive days.
            </p>
            <p className="text-gray-600 text-base flex items-center gap-2">
              <span className="text-yellow-500">⚡</span> Cookies are always a bestseller during holidays.
            </p>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Future Demand Prediction</h2>
          <Bar
            data={futureDemandData}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: true,
                  position: "top",
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Next Week",
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Predicted Demand",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Demand;
