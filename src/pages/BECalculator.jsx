import React, { useState } from "react";

const BreakevenCalculator = () => {
  const [selectedItem, setSelectedItem] = useState("Coffee"); // Default selection
  const [data, setData] = useState({
    Coffee: {
      fixedCost: "",
      variableCost: "",
      sellingPrice: "",
      unitsSold: 245,
      breakevenPoint: null,
    },
    Tea: {
      fixedCost: "",
      variableCost: "",
      sellingPrice: "",
      unitsSold: 198,
      breakevenPoint: null,
    },
    Vada: {
      fixedCost: "",
      variableCost: "",
      sellingPrice: "",
      unitsSold: 142,
      breakevenPoint: null,
    },
  });

  const handleInputChange = (field, value) => {
    setData((prevData) => ({
      ...prevData,
      [selectedItem]: {
        ...prevData[selectedItem],
        [field]: value,
      },
    }));
  };

  const calculateBreakevenPoint = () => {
    const { fixedCost, variableCost, sellingPrice } = data[selectedItem];
    if (!fixedCost || !variableCost || !sellingPrice) {
      alert("Please fill in all fields.");
      return;
    }
    if (parseFloat(sellingPrice) <= parseFloat(variableCost)) {
      alert("Selling price must be greater than variable cost.");
      return;
    }

    const breakeven =
      parseFloat(fixedCost) /
      (parseFloat(sellingPrice) - parseFloat(variableCost));

    setData((prevData) => ({
      ...prevData,
      [selectedItem]: {
        ...prevData[selectedItem],
        breakevenPoint: Math.ceil(breakeven),
      },
    }));
  };

  const { fixedCost, variableCost, sellingPrice, unitsSold, breakevenPoint } =
    data[selectedItem];
  const breakevenProgress = breakevenPoint
    ? Math.min((unitsSold / breakevenPoint) * 100, 100)
    : 0;

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center tracking-tight">
        Breakeven Calculator
      </h1>

      {/* Dropdown to Select Item */}
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Select Item
        </label>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          <option value="Coffee">Coffee</option>
          <option value="Tea">Tea</option>
          <option value="Vada">Vada</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Cost Details */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Cost Details ({selectedItem})
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Enter the cost details below to calculate the breakeven point for{" "}
            {selectedItem}.
          </p>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Total Fixed Costs (₹)
              </label>
              <input
                type="number"
                value={fixedCost}
                onChange={(e) =>
                  handleInputChange("fixedCost", e.target.value)
                }
                placeholder="e.g., 1000"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Variable Cost per Unit (₹)
              </label>
              <input
                type="number"
                value={variableCost}
                onChange={(e) =>
                  handleInputChange("variableCost", e.target.value)
                }
                placeholder="e.g., 5"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Selling Price per Unit (₹)
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) =>
                  handleInputChange("sellingPrice", e.target.value)
                }
                placeholder="e.g., 15"
                className="w-full px-4 py-3 border rounded-lg shadow-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>
          <button
            onClick={calculateBreakevenPoint}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg shadow-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            Calculate Breakeven Point
          </button>
        </div>

        {/* Right Section - Breakeven Analysis */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Breakeven Analysis ({selectedItem})
          </h2>
          <div className="space-y-6">
            {/* Breakeven Progress */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Breakeven Progress
              </label>
              <div className="relative w-full bg-gray-200 rounded-full h-6 shadow-inner">
                <div
                  className="absolute top-0 left-0 h-6 bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${breakevenProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {unitsSold} units sold out of {breakevenPoint || "N/A"} units
                needed.
              </p>
            </div>

            {/* Breakeven Summary */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Summary
              </h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>
                  <strong>Fixed Costs:</strong> ₹{fixedCost || "N/A"}
                </li>
                <li>
                  <strong>Variable Costs per Unit:</strong> ₹
                  {variableCost || "N/A"}
                </li>
                <li>
                  <strong>Selling Price per Unit:</strong> ₹
                  {sellingPrice || "N/A"}
                </li>
                <li>
                  <strong>Breakeven Point:</strong>{" "}
                  {breakevenPoint !== null ? `${breakevenPoint} units` : "N/A"}
                </li>
                <li>
                  <strong>Current Units Sold:</strong> {unitsSold} units
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakevenCalculator;
