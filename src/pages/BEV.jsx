import React, { useState, useMemo } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Box,
  Slider,
} from "@mui/material";
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
import { Line } from "react-chartjs-2";

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


const Dashboard = () => {
  // State for input fields
  const [fixedCosts, setFixedCosts] = useState({ electricity: 0, other: 0 });
  const [variableCosts, setVariableCosts] = useState({ tea: 0, coffee: 0, vada: 0 });
  const [sellingPrices, setSellingPrices] = useState({ tea: 0, coffee: 0, vada: 0 });

  // Forecasted values for the next 7 days
  const [forecastedValues, setForecastedValues] = useState({
    tea: [500, 400, 670, 650, 500, 550, 600],
    coffee: [450, 200, 350, 400, 410, 500, 480],
    vada: [250, 300, 450, 550, 500, 350, 300],
  });

  // Predicted profit (adjustable by the user)
  const [predictedProfit, setPredictedProfit] = useState(0);

  // State for actual sales volume inputs
  const [actualSalesVolume, setActualSalesVolume] = useState({
    tea: 0,
    coffee: 0,
    vada: 0,
  });

  // Derived values
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

  const totalCost = useMemo(() => totalFixedCost + totalVariableCost, [
    totalFixedCost,
    totalVariableCost,
  ]);

  const day1ForecastedValues = useMemo(
    () => ({
      tea: forecastedValues.tea[0],
      coffee: forecastedValues.coffee[0],
      vada: forecastedValues.vada[0],
    }),
    [forecastedValues]
  );

  const totalForecastedDay1 = useMemo(
    () =>
      day1ForecastedValues.tea +
      day1ForecastedValues.coffee +
      day1ForecastedValues.vada,
    [day1ForecastedValues]
  );

  const weightages = useMemo(() => {
    if (totalForecastedDay1 <= 0) return { tea: 0, coffee: 0, vada: 0 };
    return {
      tea: day1ForecastedValues.tea / totalForecastedDay1,
      coffee: day1ForecastedValues.coffee / totalForecastedDay1,
      vada: day1ForecastedValues.vada / totalForecastedDay1,
    };
  }, [totalForecastedDay1, day1ForecastedValues]);

  const breakEvenVolumes = useMemo(() => {
    const calculateBreakEvenVolume = (sellingPrice, weightage) => {
      if (sellingPrice <= 0 || weightage <= 0 || totalCost <= 0) return 0;
      return Math.ceil((totalCost * weightage) / sellingPrice);
    };

    return {
      tea: calculateBreakEvenVolume(sellingPrices.tea, weightages.tea),
      coffee: calculateBreakEvenVolume(sellingPrices.coffee, weightages.coffee),
      vada: calculateBreakEvenVolume(sellingPrices.vada, weightages.vada),
    };
  }, [sellingPrices, weightages, totalCost]);

  const predictedProfitValue = useMemo(() => {
    const teaProfit =
      day1ForecastedValues.tea * sellingPrices.tea -
      breakEvenVolumes.tea * sellingPrices.tea;
    const coffeeProfit =
      day1ForecastedValues.coffee * sellingPrices.coffee -
      breakEvenVolumes.coffee * sellingPrices.coffee;
    const vadaProfit =
      day1ForecastedValues.vada * sellingPrices.vada -
      breakEvenVolumes.vada * sellingPrices.vada;

    return teaProfit + coffeeProfit + vadaProfit;
  }, [day1ForecastedValues, sellingPrices, breakEvenVolumes]);

  const costPrices = useMemo(() => ({
    tea: 0.6 * sellingPrices.tea,
    coffee: 0.6 * sellingPrices.coffee,
    vada: 0.6 * sellingPrices.vada,
  }), [sellingPrices]);

  const wastage = useMemo(() => {
    const teaWastage =
      Math.max(0, day1ForecastedValues.tea - actualSalesVolume.tea) * (costPrices.tea || 0);
    const coffeeWastage =
      Math.max(0, day1ForecastedValues.coffee - actualSalesVolume.coffee) * (costPrices.coffee || 0);
    const vadaWastage =
      Math.max(0, day1ForecastedValues.vada - actualSalesVolume.vada) * (costPrices.vada || 0);
  
    return teaWastage + coffeeWastage + vadaWastage;
  }, [day1ForecastedValues, actualSalesVolume, costPrices]);
  

  const handleProfitAdjustment = (value) => {
    setPredictedProfit(value);
  };

  const forecastedTrendData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Tea Forecast",
        data: forecastedValues.tea,
        borderColor: "#4caf50",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Coffee Forecast",
        data: forecastedValues.coffee,
        borderColor: "#2196f3",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Vada Forecast",
        data: forecastedValues.vada,
        borderColor: "#ff5722",
        fill: false,
        tension: 0.4,
      },
    ],
  };
  // State for desired profit input
const [desiredProfit, setDesiredProfit] = useState(0);

// Quantities needed to achieve desired profit
const quantitiesForDesiredProfit = useMemo(() => {
  if (!desiredProfit || desiredProfit <= 0) return { tea: 0, coffee: 0, vada: 0 };

  const profitPerUnit = {
    tea: sellingPrices.tea - costPrices.tea,
    coffee: sellingPrices.coffee - costPrices.coffee,
    vada: sellingPrices.vada - costPrices.vada,
  };

  const profitContributions = {
    tea: (weightages.tea || 0) * desiredProfit,
    coffee: (weightages.coffee || 0) * desiredProfit,
    vada: (weightages.vada || 0) * desiredProfit,
  };

  return {
    tea: Math.ceil(profitContributions.tea / (profitPerUnit.tea || 1)),
    coffee: Math.ceil(profitContributions.coffee / (profitPerUnit.coffee || 1)),
    vada: Math.ceil(profitContributions.vada / (profitPerUnit.vada || 1)),
  };
}, [desiredProfit, sellingPrices, costPrices, weightages]);
  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Break-Even Analysis Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ backgroundColor: "#E3F2FD", color: "#0D47A1" }}>
                  <Typography variant="h6" gutterBottom>
                    Total Cost
                  </Typography>
                  <Typography variant="h5">₹{totalCost}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ backgroundColor: "#E8F5E9", color: "#1B5E20" }}>
                  <Typography variant="h6" gutterBottom>
                    Predicted Profit
                  </Typography>
                  <Typography variant="h5">₹{predictedProfitValue}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
                  <Typography variant="h6" gutterBottom>
                    Wastage
                  </Typography>
                  <Typography variant="h5">₹{wastage}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Forecasted Trend Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Forecasted Sales Trend (Next 7 Days)
              </Typography>
              <Line data={forecastedTrendData} />
            </CardContent>
          </Card>
        </Grid>

        {/* Cost Inputs Section */}
        <Grid item xs={12}>
          <Card style={{ backgroundColor: "#e9f7f6" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cost Inputs
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="body1" gutterBottom>
                    Fixed Costs
                  </Typography>
                  <TextField
                    label="Electricity Cost"
                    value={fixedCosts.electricity}
                    onChange={(e) =>
                      setFixedCosts((prev) => ({
                        ...prev,
                        electricity: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                  <TextField
                    label="Other Fixed Costs"
                    value={fixedCosts.other}
                    onChange={(e) =>
                      setFixedCosts((prev) => ({
                        ...prev,
                        other: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="body1" gutterBottom>
                    Variable Costs
                  </Typography>
                  <TextField
                    label="Tea Variable Cost"
                    value={variableCosts.tea}
                    onChange={(e) =>
                      setVariableCosts((prev) => ({
                        ...prev,
                        tea: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                  <TextField
                    label="Coffee Variable Cost"
                    value={variableCosts.coffee}
                    onChange={(e) =>
                      setVariableCosts((prev) => ({
                        ...prev,
                        coffee: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                  <TextField
                    label="Vada Variable Cost"
                    value={variableCosts.vada}
                    onChange={(e) =>
                      setVariableCosts((prev) => ({
                        ...prev,
                        vada: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                  <Typography variant="body1" gutterBottom>
                    Selling Prices
                  </Typography>
                  <TextField
                    label="Tea Price"
                    value={sellingPrices.tea}
                    onChange={(e) =>
                      setSellingPrices((prev) => ({
                        ...prev,
                        tea: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                  <TextField
                    label="Coffee Price"
                    value={sellingPrices.coffee}
                    onChange={(e) =>
                      setSellingPrices((prev) => ({
                        ...prev,
                        coffee: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                  <TextField
                    label="Vada Price"
                    value={sellingPrices.vada}
                    onChange={(e) =>
                      setSellingPrices((prev) => ({
                        ...prev,
                        vada: parseFloat(e.target.value) || 0,
                      }))
                    }
                    fullWidth
                    type="number"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Actual Sales Volume Section */}
        <Grid item xs={12}>
          <Card style={{ backgroundColor: "#f7e9e9" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Actual Sales Volume
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  label="Tea Actual Sales"
                  value={actualSalesVolume.tea}
                  onChange={(e) =>
                    setActualSalesVolume((prev) => ({
                      ...prev,
                      tea: parseFloat(e.target.value) || 0,
                    }))
                  }
                  fullWidth
                  type="number"
                />
                <TextField
                  label="Coffee Actual Sales"
                  value={actualSalesVolume.coffee}
                  onChange={(e) =>
                    setActualSalesVolume((prev) => ({
                      ...prev,
                      coffee: parseFloat(e.target.value) || 0,
                    }))
                  }
                  fullWidth
                  type="number"
                />
                <TextField
                  label="Vada Actual Sales"
                  value={actualSalesVolume.vada}
                  onChange={(e) =>
                    setActualSalesVolume((prev) => ({
                      ...prev,
                      vada: parseFloat(e.target.value) || 0,
                    }))
                  }
                  fullWidth
                  type="number"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
              {/* Break-Even Calculator */}
        <Grid item xs={12} style={{ marginTop: "30px" }}>
          <Card display="flex" flexDirection="column" gap={2} style={{ backgroundColor: "#f3e9f7" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Break-Even Calculator
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="body1" gutterBottom>
                Total Fixed Cost: ₹{totalFixedCost}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Variable Cost: ₹{totalVariableCost}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Cost (Fixed + Variable): ₹{totalCost}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Predicted Profit: ₹{predictedProfitValue}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Tea Break-Even Volume: {breakEvenVolumes.tea}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Coffee Break-Even Volume: {breakEvenVolumes.coffee}
              </Typography>
              <Typography variant="body1">
                Vada Break-Even Volume: {breakEvenVolumes.vada}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
              {/* Desired Profit Section */}
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Card display="flex" flexDirection="column" gap={2} style={{ backgroundColor: "#f0f7e9" }}>
            <CardContent >
              <Typography variant="h6" gutterBottom>
                Desired Profit
              </Typography>
              <TextField
                label="Enter Desired Profit"
                value={desiredProfit}
                onChange={(e) => setDesiredProfit(parseFloat(e.target.value) || 0)}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
              <Divider style={{ margin: "20px 0" }} />
              <Typography variant="body1" gutterBottom>
                To achieve a profit of ₹{desiredProfit}, you need to sell:
              </Typography>
              <Typography variant="body2" gutterBottom>
                Tea: {quantitiesForDesiredProfit.tea} units
              </Typography>
              <Typography variant="body2" gutterBottom>
                Coffee: {quantitiesForDesiredProfit.coffee} units
              </Typography>
              <Typography variant="body2">
                Vada: {quantitiesForDesiredProfit.vada} units
              </Typography>
            </CardContent>
          </Card>
        </Grid>

    </Container>
  );
};

export default Dashboard;
