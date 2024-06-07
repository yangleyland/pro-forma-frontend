// src/CapitalCostsGraph.js
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
} from "../ui/card";
import useYearOverYear from "../../store/useYearOverYear";
const transformData = (totalCosts) => {
  const data = [];

  Object.keys(totalCosts).forEach((year) => {
    data.push({
      year: parseInt(year, 10),
      totalCosts: totalCosts[year],
    });
  });

  return data;
};

const CapitalCostsGraph = () => {
  const { totalCosts } = useYearOverYear();
  const data = transformData(totalCosts);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Capital Costs</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCosts"
              stroke="#6a7b9e"
              name="Total Costs"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CapitalCostsGraph;
