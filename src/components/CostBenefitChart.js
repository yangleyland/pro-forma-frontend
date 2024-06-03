// src/CostBenefitChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import useYearOverYear from "../store/useYearOverYear";

const transformData = (annualCostBenefit, cumulativeCostBenefit) => {
  const data = [];

  Object.keys(annualCostBenefit).forEach(year => {
    data.push({
      year: parseInt(year, 10),
      annualCostBenefit: annualCostBenefit[year],
      cumulativeCostBenefit: cumulativeCostBenefit[year]
    });
  });

  return data;
};

const CostBenefitChart = () => {
  const { annualCostBenefit, cumulativeCostBenefit } = useYearOverYear();
  const data = transformData(annualCostBenefit, cumulativeCostBenefit);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Benefit Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cumulativeCostBenefit"
              stroke="#8884d8"
              name="Cumulative Cost Benefit"
            />
            <Line
              type="monotone"
              dataKey="annualCostBenefit"
              stroke="#82ca9d"
              name="Annual Cost Benefit"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostBenefitChart;
