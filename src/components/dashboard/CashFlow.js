import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import useYearOverYear from "../../store/useYearOverYear";
function formatCurrency(value) {
  return `$${Math.abs(Math.round(value)).toLocaleString("en-US")}`;
}
const CashFlow = () => {
  const { cumulativeCostBenefit } = useYearOverYear();
  const [year, setYear] = useState(2040); // Default year is 2040

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const val = cumulativeCostBenefit[year] ?? cumulativeCostBenefit[2040];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>💸 Cash Flow</CardTitle>
        <CardDescription className="flex flex-col items-center">
          Estimated Cash Flow By
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="ml-2 border rounded p-1"
          />
        </CardDescription>
      </CardHeader>

      <CardContent className="text-red-600">{val && formatCurrency(val)}</CardContent>
    </Card>
  );
};

export default CashFlow;
