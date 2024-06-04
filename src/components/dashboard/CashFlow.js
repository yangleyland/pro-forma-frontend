import React from "react";
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
  return `$${Math.abs(value).toLocaleString('en-US')}`;
}
const CashFlow = () => {
  const { cumulativeCostBenefit } = useYearOverYear();
  const val = cumulativeCostBenefit[2040];
  return (
    <Card className="h-1/2">
      <CardHeader>
        <CardTitle>💸 Cash Flow</CardTitle>
        <CardDescription>Estimated Cash Flow By INSERTYEAR</CardDescription>
      </CardHeader>

      <CardContent className="text-red-600">{formatCurrency(val)}</CardContent>
    </Card>
  );
};

export default CashFlow;
