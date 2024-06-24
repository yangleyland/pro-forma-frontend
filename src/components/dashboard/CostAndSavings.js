// src/ComparisonBarChart.js
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useYearOverYear from "../../store/useYearOverYear";
import useAuthStore from "../../store/useAuthStore";
import useAllSitesYearOverYear from "../../store/useAllSitesYearOverYear";
import useCityInfo from "../../store/useCityInfo";

function formatAsCurrency(value) {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const CostAndSavings = () => {
  const { totalCosts, totalSavings } = useYearOverYear();
  const { controlsData } = useAuthStore();
  const { totalCosts: allSitesTotalCosts, totalSavings: allSitesTotalSavings } =
    useAllSitesYearOverYear();
  const { cityInfo } = useCityInfo();

  const [totalCost, setTotalCost] = useState(0);
  const [totalSaving, setTotalSaving] = useState(0);

  const sumValues = (data) => {
    let sum = 0;
    for (const year in data) {
      if (year === "title") {
        continue;
      }
      sum += data[year];
    }
    return sum;
  };

  useEffect(() => {
    setTotalCost(sumValues(totalCosts));
    setTotalSaving(sumValues(totalSavings));
  }, [totalCosts, totalSavings]);

  const allSitesTotalCostsSum = sumValues(allSitesTotalCosts);
  const allSitesTotalSavingsSum = sumValues(allSitesTotalSavings);

  const data = [
    {
      name: "Cumulative Values",
      cost: parseInt(totalCost),
      savings: parseInt(totalSaving),
    },
  ];

  let maxValue =
    Math.ceil(
      Math.max(allSitesTotalCostsSum, allSitesTotalSavingsSum) / 100000
    ) * 100000;
  maxValue =
    cityInfo && cityInfo.cost_savings_max
      ? cityInfo.cost_savings_max
      : maxValue;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Costs And Savings
          <span className="text-xl text-gray-600">
            {" "}
            - {controlsData && controlsData.site}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={false} />
            <YAxis domain={[0, maxValue]} tickFormatter={formatAsCurrency} />
            <Tooltip formatter={formatAsCurrency} />
            <Legend />
            <Bar dataKey="cost" fill="#6a7b9e" name="Cumulative Cost ($)">
              <LabelList
                dataKey="cost"
                position="top"
                formatter={formatAsCurrency}
              />
            </Bar>
            <Bar dataKey="savings" fill="#88a37f" name="Cumulative Savings ($)">
              <LabelList
                dataKey="savings"
                position="top"
                formatter={formatAsCurrency}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostAndSavings;
