import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import useYears from "../../store/useYears";
import useProFormaCalcs from "../../store/useProFormaCalcs";

const GHGReductions = () => {
  const { END_YEAR } = useYears();
  const { ghgReductions } = useProFormaCalcs();
return (
    <Card className="h-1/2">
        <CardHeader>
            <CardTitle>🌳 GHG Reductions</CardTitle>
            <CardDescription>City Hall/City Plaza</CardDescription>
        </CardHeader>

        <CardContent>
            {ghgReductions[END_YEAR-1]&&ghgReductions[END_YEAR-1].toFixed(2)} metric tons of carbon dioxide-equivalent (MTCO2e)
        </CardContent>
    </Card>
);
};

export default GHGReductions;
