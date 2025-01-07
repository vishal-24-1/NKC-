import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const BEV = () => {
  const [fixedCosts, setFixedCosts] = useState({ electricity: 0, other: 0 });
  const [variableCosts, setVariableCosts] = useState({ tea: 0, coffee: 0, vada: 0 });
  const [sellingPrices, setSellingPrices] = useState({ tea: 0, coffee: 0, vada: 0 });
  const [forecastedValues, setForecastedValues] = useState({
    tea: [500, 400, 670, 650, 500, 550, 600],
    coffee: [450, 200, 350, 400, 410, 500, 480],
    vada: [250, 300, 450, 550, 500, 350, 300],
  });
  const [predictedProfit, setPredictedProfit] = useState(0);
  const [actualSalesVolume, setActualSalesVolume] = useState({
    tea: 0,
    coffee: 0,
    vada: 0,
  });
  const [desiredProfit, setDesiredProfit] = useState(0);

  const totalFixedCost = useMemo(
    () => parseFloat(fixedCosts.electricity) + parseFloat(fixedCosts.other),
    [fixedCosts]
  );

  const totalVariableCost = useMemo(
    () =>
      parseFloat(variableCosts.tea) +
      parseFloat(variableCosts.coffee) +
      parseFloat(variableCosts.vada),
    [variableCosts]
  );

  const totalCost = totalFixedCost + totalVariableCost;

  const day1ForecastedValues = {
    tea: forecastedValues.tea[0],
    coffee: forecastedValues.coffee[0],
    vada: forecastedValues.vada[0],
  };

  const totalForecastedDay1 =
    day1ForecastedValues.tea + day1ForecastedValues.coffee + day1ForecastedValues.vada;

  const weightages = totalForecastedDay1
    ? {
        tea: day1ForecastedValues.tea / totalForecastedDay1,
        coffee: day1ForecastedValues.coffee / totalForecastedDay1,
        vada: day1ForecastedValues.vada / totalForecastedDay1,
      }
    : { tea: 0, coffee: 0, vada: 0 };

  const breakEvenVolumes = {
    tea: Math.ceil((totalCost * weightages.tea) / sellingPrices.tea || 1),
    coffee: Math.ceil((totalCost * weightages.coffee) / sellingPrices.coffee || 1),
    vada: Math.ceil((totalCost * weightages.vada) / sellingPrices.vada || 1),
  };

  const wastage =
    (day1ForecastedValues.tea - actualSalesVolume.tea) * (0.6 * sellingPrices.tea || 0) +
    (day1ForecastedValues.coffee - actualSalesVolume.coffee) * (0.6 * sellingPrices.coffee || 0) +
    (day1ForecastedValues.vada - actualSalesVolume.vada) * (0.6 * sellingPrices.vada || 0);

  const quantitiesForDesiredProfit = {
    tea: Math.ceil(
      (weightages.tea * desiredProfit) /
        (sellingPrices.tea - 0.6 * sellingPrices.tea || 1)
    ),
    coffee: Math.ceil(
      (weightages.coffee * desiredProfit) /
        (sellingPrices.coffee - 0.6 * sellingPrices.coffee || 1)
    ),
    vada: Math.ceil(
      (weightages.vada * desiredProfit) /
        (sellingPrices.vada - 0.6 * sellingPrices.vada || 1)
    ),
  };

  const forecastedTrendData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      { label: "Tea", data: forecastedValues.tea, borderColor: "#4caf50", fill: false },
      { label: "Coffee", data: forecastedValues.coffee, borderColor: "#2196f3", fill: false },
      { label: "Vada", data: forecastedValues.vada, borderColor: "#ff5722", fill: false },
    ],
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Break-Even Analysis Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
          <h2 className="text-lg font-semibold">Total Cost</h2>
          <p className="text-xl font-bold">₹{totalCost}</p>
        </div>
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          <h2 className="text-lg font-semibold">Predicted Profit</h2>
          <p className="text-xl font-bold">₹{predictedProfit}</p>
        </div>
        <div className="p-4 bg-orange-100 text-orange-800 rounded-lg">
          <h2 className="text-lg font-semibold">Wastage</h2>
          <p className="text-xl font-bold">₹{wastage}</p>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Forecasted Sales Trend (Next 7 Days)</h2>
        <Line data={forecastedTrendData} />
      </div>
    </div>
  );
};

export default BEV;
