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
} from "../ui/card";
import useYearOverYear from "../../store/useYearOverYear";
import useAuthStore from "../../store/useAuthStore";

function formatAsCurrency(value) {
  return `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const transformData = (annualCostBenefit, cumulativeCostBenefit) => {
  const data = [];

  Object.keys(annualCostBenefit).forEach(year => {
    data.push({
      year: parseInt(year, 10),
      annualCostBenefit:parseInt(annualCostBenefit[year]),
      cumulativeCostBenefit: parseInt(cumulativeCostBenefit[year])
    });
  });

  return data;
};

const CostBenefitChart = () => {
  const { annualCostBenefit, cumulativeCostBenefit } = useYearOverYear();
  const {controlsData} = useAuthStore();
  const data = transformData(annualCostBenefit, cumulativeCostBenefit);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Benefit Analysis<span className="text-xl text-gray-600"> - {controlsData && controlsData.site}</span></CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip  formatter={formatAsCurrency}/>
            <Legend />
            <Line
              type="monotone"
              dataKey="cumulativeCostBenefit"
              stroke="#88a37f"
              name="Cumulative Cost Benefit"
            />
            <Line
              type="monotone"
              dataKey="annualCostBenefit"
              stroke="#6a7b9e"
              name="Annual Cost Benefit"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostBenefitChart;
