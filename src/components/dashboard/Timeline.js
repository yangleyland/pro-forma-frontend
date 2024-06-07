import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const Timeline = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>⏱ Electrification Timeline</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col">
        <div className="flex w-full justify-center gap-2 items-center">
          <p className="flex-1 text-xl font-bold text-right">23/23</p>
          <p className="flex-[2_2_0%] text-bold">vehicles electrified</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-center">
          <p className="flex-1  text-xl font-bold text-right">12</p>
          <p className="flex-[2_2_0%] text-bold">ports</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-center">
          <p className="flex-1  text-xl font-bold text-right">$60,000</p>
          <p className="flex-[2_2_0%] text-bold">charger incentive value</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-center">
          <p className="flex-1  text-xl font-bold text-right">$320,000</p>
          <p className="flex-[2_2_0%] text-bold">Net Present Value</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-center">
        <p className="flex-1  text-xl font-bold text-right">$1,320,000</p>
          <p className="flex-[2_2_0%] text-bold">Total Capital Costs</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-center">
        <p className="flex-1  text-xl font-bold text-right">$10,000</p>
          <p className="flex-[2_2_0%] text-bold">Cost of Carbon Abatement</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Timeline;
