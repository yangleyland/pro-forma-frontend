// src/GHGReductionsGraph.js
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
import useProFormaCalcs from "../../store/useProFormaCalcs";
const transformData = (ghgReductions) => {
  const data = [];

  Object.keys(ghgReductions).forEach(year => {
    data.push({
      year: parseInt(year, 10),
      ghgReductions: ghgReductions[year],
    });
  });

  return data;
};

const GHGReductionsGraph = () => {
    const { ghgReductions } = useProFormaCalcs();
  const data = transformData(ghgReductions);
  return (
    <Card className ="h-full">
      <CardHeader>
        <CardTitle>GHG Reductions</CardTitle>
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
              dataKey="ghgReductions"
              stroke="#88a37f"
              name="GHG Reductions"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GHGReductionsGraph;
