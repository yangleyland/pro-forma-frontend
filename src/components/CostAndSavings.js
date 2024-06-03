// src/ComparisonBarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,Label, LabelList } from 'recharts';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "./ui/card";

const data = [
  { name: 'Cumulative Cost', value: 1485566 },
  { name: 'Cumulative Savings', value: 1149666 },
];

const ComparisonBarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Benefit Analysis</CardTitle>
      </CardHeader>
      <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">

          </XAxis>
          <YAxis>
            {/* <Label value="Value" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} /> */}
          </YAxis>
          <Tooltip />

          <Bar dataKey="value" fill="#8884d8">
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ComparisonBarChart;
