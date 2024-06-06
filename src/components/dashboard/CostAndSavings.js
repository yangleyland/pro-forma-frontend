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
  } from "../ui/card";
import useYearOverYear from '../../store/useYearOverYear';





const CostAndSavings = () => {
  const { totalCosts, totalSavings } = useYearOverYear();
  
  const sumValues = (data) => {
    let sum = 0;
    for (const year in data) {
      if (year==="title"){
        continue;
      }
      sum += data[year];
    }
    return sum;
  };

  const totalCost = sumValues(totalCosts);
  const totalSaving = sumValues(totalSavings);

  const data = [
    { name: 'Cumulative Cost', value: totalCost },
    { name: 'Cumulative Savings', value: totalSaving },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost And Savings</CardTitle>
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

export default CostAndSavings;
