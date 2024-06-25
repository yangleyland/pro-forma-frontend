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
// function formatCurrency(value) {
//   return `$${Math.abs(Math.round(value)).toLocaleString("en-US")}`;
// }

const formatCurrency = (value) => {
  if (value === 0) {
    return "-";
  }
  const absValue = Math.abs(value)
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value < 0 ? `-$${absValue}` : `$${absValue}`;
};

const CashFlow = () => {
  const { annualCostBenefit } = useYearOverYear();
  const [year, setYear] = useState(2040); // Default year is 2040

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const val = annualCostBenefit[year] ?? annualCostBenefit[2040];
  console.log(val);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>💸 Cash Flow</CardTitle>
        <CardDescription className="">All Sites</CardDescription>
      </CardHeader>

      <CardContent className="">
        <div className="flex mb-2 justify-center items-center">
          <p>Estimated Cash Flow By</p>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="w-24 ml-2 border rounded p-1 flex-1"
          />
        </div>

        <p
          className={
            val < 0
              ? "text-red-500 font-semibold"
              : "text-green-500 font-semibold"
          }
        >
          {val && formatCurrency(val)}
        </p>
      </CardContent>
    </Card>
  );
};

export default CashFlow;
