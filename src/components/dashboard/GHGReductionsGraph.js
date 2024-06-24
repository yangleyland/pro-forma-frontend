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
  Label,
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
import useAllSitesCalcs from "../../store/useAllSitesCalcs";
import useAuthStore from "../../store/useAuthStore";

const transformData = (ghgReductions) => {
  const data = [];

  Object.keys(ghgReductions).forEach((year) => {
    data.push({
      year: parseInt(year, 10),
      ghgReductions: ghgReductions[year],
    });
  });

  return data;
};

const GHGReductionsGraph = () => {
  const { controlsData } = useAuthStore();
  const { ghgReductions } = useProFormaCalcs();
  const { ghgReductions: allSitesGHGReductions } = useAllSitesCalcs();
  const maxGHGReductions = Math.max(...Object.values(allSitesGHGReductions));
  const yAxisMax = Math.ceil(maxGHGReductions / 5) * 5;

  // Rest of the code...

  const data = transformData(ghgReductions);
  const allSitesData =transformData(allSitesGHGReductions);
  

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>GHG Reductions</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              domain={[0, yAxisMax]}
              tickFormatter={(value) => Math.round(value)}
            >
              <Label
                value="GHG Reductions (MTCO2e)"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle", fontSize: "0.8rem" }}
              />
            </YAxis>
            <Tooltip formatter={(value) => Math.round(value)} />
            <Legend />
            <Line
              type="monotone"
              dataKey="ghgReductions"
              stroke="#88a37f"
              name="GHG Reductions (MTCO2e)"
            />
            {allSitesData && (
              <Line
                type="monotone"
                data={allSitesData}
                dataKey="ghgReductions"
                stroke="#82ca9d"
                name="All Sites GHG Reductions (MTCO2e)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GHGReductionsGraph;
