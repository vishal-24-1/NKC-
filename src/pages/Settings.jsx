// Settings.jsx
import React, { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    lowStockAlerts: true,
    dailyReports: false,
    orderUpdates: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="space-y-8 px-6 py-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 text-center">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500">Photo</span>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                Change Photo
              </button>
            </div>
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full mt-1 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="Admin User"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full mt-1 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="admin@nellai.com"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Franchise Settings */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Franchise Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Franchise Name</label>
              <input
                type="text"
                className="w-full mt-1 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="Anna Nagar Branch"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Location</label>
              <input
                type="text"
                className="w-full mt-1 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="12, Anna Nagar, Chennai"
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700">Contact Number</label>
              <input
                type="text"
                className="w-full mt-1 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value="+91 9876543210"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Low Stock Alerts</span>
              <button
                onClick={() => handleToggle("lowStockAlerts")}
                className={`px-4 py-2 rounded-lg transition ${
                  settings.lowStockAlerts ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400"
                } text-white font-medium`}
              >
                {settings.lowStockAlerts ? "Enabled" : "Disabled"}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Daily Reports</span>
              <button
                onClick={() => handleToggle("dailyReports")}
                className={`px-4 py-2 rounded-lg transition ${
                  settings.dailyReports ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400"
                } text-white font-medium`}
              >
                {settings.dailyReports ? "Enabled" : "Disabled"}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Order Updates</span>
              <button
                onClick={() => handleToggle("orderUpdates")}
                className={`px-4 py-2 rounded-lg transition ${
                  settings.orderUpdates ? "bg-green-500 hover:bg-green-600" : "bg-gray-300 hover:bg-gray-400"
                } text-white font-medium`}
              >
                {settings.orderUpdates ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Security Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">New Password</label>
                <input
                  type="password"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                Update Password
              </button>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h3 className="text-yellow-800 font-semibold">Security Recommendations</h3>
            <ul className="list-disc list-inside text-yellow-700 mt-2">
              <li>Use at least 8 characters</li>
              <li>Include uppercase and lowercase letters</li>
              <li>Add numbers and special characters</li>
              <li>Avoid using common phrases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
