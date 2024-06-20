import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  Bar,
  Cell,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import useYearOverYear from "../../store/useYearOverYear";
import useAuthStore from "../../store/useAuthStore";
import useAllSitesYearOverYear from "../../store/useAllSitesYearOverYear";
import useCityInfo from "../../store/useCityInfo";

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
  const { cityInfo } = useCityInfo();
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

  minValue = Math.floor(minValue / 50000) * 50000;
  maxValue = Math.ceil(maxValue / 50000) * 50000;
  minValue =
    cityInfo && cityInfo.cost_benefit_min
      ? cityInfo.cost_benefit_min
      : minValue;
  maxValue =
    cityInfo && cityInfo.cost_benefit_max
      ? cityInfo.cost_benefit_max
      : maxValue;

  const getBarColor = (value) => (value >= 0 ? "#6a9e66" : "#e57373");

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
          <ComposedChart data={data} margin={{ left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              tickFormatter={formatAsCurrency}
              domain={[minValue, maxValue]}
            >
              <Label
                value="Cost Benefit ($)"
                angle={-90}
                offset={-40}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <Tooltip formatter={formatAsCurrency} />
            <Legend />

            <Bar dataKey="annualCostBenefit" fill="#6a9e66">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry.annualCostBenefit)}
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="cumulativeCostBenefit"
              stroke="#88a37f"
              name="Cumulative Cost Benefit ($)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CostBenefitChart;
