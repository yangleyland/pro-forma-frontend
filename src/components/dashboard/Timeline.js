import React, { useEffect, useState } from "react";
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
import useYears from "../../store/useYears";
import useYearOverYear from "../../store/useYearOverYear";
import useProFormaCalcs from "../../store/useProFormaCalcs";
import useAuthStore from "../../store/useAuthStore";



function formatCurrency(value) {
  if (value === 0) {
    return "$-";
  }
  return `$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

const Timeline = () => {
  const { END_YEAR } = useYears();
  const { vehicleCounts, totalVehicles } = useProFormaCalcs();
  const {
    numberOfNewPorts,
    chargerIncentives,
    netPresentValue,
    totalCosts,
    chargerNetworkAndManagementCosts,
    chargerMaintenanceCosts,
  } = useYearOverYear();
  const { data } = useAuthStore();
  const { controlsData } = useAuthStore();

  const [vehiclesElectrified, setVehiclesElectrified] = useState("");
  const [totalCount, setTotalCount] = useState("");
  const [portSum,setPortSum] = useState("");
  const [incentiveSum,setIncentiveSum] = useState("");
  const [capitalCosts,setCapitalCosts] = useState("");

  useEffect(() => {
    if (vehicleCounts) {
      setVehiclesElectrified(vehicleCounts[END_YEAR]);
    }
  }, [vehicleCounts]);
  useEffect(() => {
    if (totalVehicles) {
      setTotalCount(totalVehicles);
    }
  }, [totalVehicles]);

  const calculateSum = (values) => {
    return Object.values(values).reduce((acc, curr) => acc + curr, 0);
  };

  useEffect(() => {
    if (numberOfNewPorts) {
      const sum = calculateSum(numberOfNewPorts);
      setPortSum(sum);
    }
  }, [numberOfNewPorts]);

  useEffect(() => {
    if (chargerIncentives) {
      const sum = calculateSum(chargerIncentives);
      setIncentiveSum(sum);
    }
  }, [chargerIncentives]);


  useEffect(() => {
    if (totalCosts) {
      const sum = calculateSum(totalCosts) - calculateSum(chargerNetworkAndManagementCosts) - calculateSum(chargerMaintenanceCosts);
      setCapitalCosts(sum);
    }
  }, [totalCosts]);


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>⏱ Electrification Timeline</CardTitle>
        <CardDescription>{controlsData && controlsData.site}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col">
        <div className="flex w-full justify-center gap-2 items-center">
          <p className="flex-1 text-xl font-bold text-right">
            {vehiclesElectrified}/{totalVehicles}
          </p>
          <p className="flex-[2_2_0%] text-bold">vehicles electrified</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-start">
          <p className="flex-1  text-xl font-bold text-right">{portSum}</p>
          <p className="flex-[2_2_0%] text-bold">ports installed</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-start">
          <p className="flex-1 text-xl font-bold text-right">{formatCurrency(incentiveSum)}</p>
          <p className="flex-[2_2_0%] text-bold">total charger incentive value</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-start">
          <p className="flex-1  text-xl font-bold text-right">{formatCurrency(netPresentValue)}</p>
          <p className="flex-[2_2_0%] text-bold">Net Present Value</p>
        </div>
        <div className="flex w-full justify-center gap-2 items-start">
          <p className="flex-1  text-xl font-bold text-right">{formatCurrency(capitalCosts)}</p>
          <p className="flex-[2_2_0%] text-bold">Total Capital Costs</p>
        </div>
        {/* <div className="flex w-full justify-center gap-2 items-center">
          <p className="flex-1  text-xl font-bold text-right">$10,000</p>
          <p className="flex-[2_2_0%] text-bold">Cost of Carbon Abatement</p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default Timeline;
