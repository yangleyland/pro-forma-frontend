import React, { useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useYearOverYear from "../../store/useYearOverYear";
import useAuthStore from "../../store/useAuthStore";
import useAllSitesYearOverYear from "../../store/useAllSitesYearOverYear";

const formatAsCurrency = (value) => {
  const absValue = Math.abs(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value < 0 ? `-$${absValue}` : `$${absValue}`;
};

const transformData = (annualCostBenefit, cumulativeCostBenefit) => {
  const data = [];

  Object.keys(annualCostBenefit).forEach((year) => {
    data.push({
      year: parseInt(year, 10),
      annualCostBenefit: parseInt(annualCostBenefit[year]),
      cumulativeCostBenefit: parseInt(cumulativeCostBenefit[year]),
    });
  });

  return data;
};

const CostBenefitChart = () => {
  const { annualCostBenefit, cumulativeCostBenefit } = useYearOverYear();
  const {
    annualCostBenefit: allSitesAnnualCostBenefit,
    cumulativeCostBenefit: allSitesCumulativeCostBenefit,
  } = useAllSitesYearOverYear();
  const { controlsData } = useAuthStore();
  const data = transformData(annualCostBenefit, cumulativeCostBenefit);

  const allSitesAnnualCostBenefitValues = Object.values(
    allSitesAnnualCostBenefit
  ).map((value) => parseInt(value, 10));
  const allSitesCumulativeCostBenefitValues = Object.values(
    allSitesCumulativeCostBenefit
  ).map((value) => parseInt(value, 10));

  const minAnnualValue = Math.min(...allSitesAnnualCostBenefitValues);
  const maxAnnualValue = Math.max(...allSitesAnnualCostBenefitValues);

  const minCumulativeValue = Math.min(...allSitesCumulativeCostBenefitValues);
  const maxCumulativeValue = Math.max(...allSitesCumulativeCostBenefitValues);

  let minValue = Math.min(minAnnualValue, minCumulativeValue);
  let maxValue = Math.max(maxAnnualValue, maxCumulativeValue);

  const diff = maxValue - minValue;
  minValue -= diff * 0.1;
  maxValue += diff * 0.1;

  minValue = (Math.ceil(minValue / 100000) * 100000);
  maxValue = (Math.ceil(maxValue / 100000) * 100000);


  useEffect(() => {
    console.log(minValue, maxValue);
  }, [minValue, maxValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Cost Benefit Analysis
          <span className="text-xl text-gray-600">
            {" "}
            - {controlsData && controlsData.site}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ left: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              tickFormatter={formatAsCurrency}
              domain={[minValue, maxValue]}
            />
            <Tooltip formatter={formatAsCurrency} />
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
