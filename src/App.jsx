import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Demand from "./pages/Demand";
import Inventory from "./pages/Inventory";
import Recipes from "./pages/Recipes";
import BreakevenCalculator from "./pages/BECalculator";
import BEV from "./pages/BEV";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";

const Sidebar = () => (
  <nav className="w-64 bg-gradient-to-b from-gray-50 to-gray-200 shadow-xl flex flex-col p-6 fixed h-full">
    <div className="text-3xl font-extrabold text-gray-900 tracking-tight border-b border-gray-300 pb-4">Nellai Coffee</div>
    <ul className="flex-1 space-y-4 mt-6">
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"}`
          }
        >
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/demand"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"}`
          }
        >
          Demand
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"}`
          }
        >
          Inventory
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"}`
          }
        >
          Recipes
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/becalculator"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"}`
          }
        >
          Breakeven Calculator
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/bev"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"
            }`
          }
        >
          BEV Analysis
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"}`
          }
        >
          Analytics
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block px-4 py-3 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition-colors duration-300 ${isActive ? "bg-gray-300 font-bold text-gray-900 shadow-inner" : "text-gray-700"}`
          }
        >
          Settings
        </NavLink>
      </li>
    </ul>
    <div className="border-t border-gray-300 pt-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">A</div>
        <div>
          <div className="text-sm font-semibold text-gray-800">Admin User</div>
          <div className="text-xs text-gray-500">admin@nellai.com</div>
        </div>
      </div>
    </div>
  </nav>
);

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-10 bg-white shadow-inner rounded-tl-xl ml-64">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/demand" element={<Demand />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/becalculator" element={<BreakevenCalculator />} />
            <Route path="/BEV" element={<BEV />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
