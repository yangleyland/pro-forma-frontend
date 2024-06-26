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
import useYearOverYear from "../../store/useYearOverYear";
import useAuthStore from "../../store/useAuthStore";
import useAllSitesYearOverYear from "../../store/useAllSitesYearOverYear";

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

const formatAsCurrency = (value) => {
  const roundedValue = Math.round(value);
  const absValue = Math.abs(roundedValue)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return roundedValue < 0 ? `-$${absValue}` : `$${absValue}`;
};

const CapitalCostsGraph = () => {
  const { costOfElectricVehicles } = useYearOverYear();
  const { costOfElectricVehicles:yearOverYearTotalCapitalCosts } = useAllSitesYearOverYear();
  const { controlsData } = useAuthStore();
  const data = transformData(costOfElectricVehicles);
  const data2 = transformData(yearOverYearTotalCapitalCosts);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Capital Costs</CardTitle>
        <CardDescription>{controlsData && controlsData.site}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer className="" width="100%" height={200}>
          <LineChart data={data} margin={{ left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis tickFormatter={formatAsCurrency}>
              <Label
                value="Total Costs ($)"
                angle={-90}
                position="insideLeft"
                offset={-40}
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip formatter={formatAsCurrency} />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalCosts"
              stroke="#6a7b9e"
              name="Selected Site Total Costs ($)"
            />
            <Line
              type="monotone"
              dataKey="totalCosts"
              stroke="#82ca9d"
              name="All Sites Total Costs ($)"
              data={data2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CapitalCostsGraph;
