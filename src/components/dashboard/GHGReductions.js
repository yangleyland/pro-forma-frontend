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
import useAuthStore from "../../store/useAuthStore";

const GHGReductions = () => {
  const { END_YEAR } = useYears();
  const { ghgReductions } = useProFormaCalcs();
  const { controlsData } = useAuthStore();
return (
    <Card className="h-full">
        <CardHeader>
            <CardTitle>🌳 GHG Reductions</CardTitle>
            <CardDescription>{controlsData && controlsData.site}</CardDescription>
        </CardHeader>

        <CardContent>
            {ghgReductions[END_YEAR-1]&&ghgReductions[END_YEAR-1].toFixed(2)} {controlsData && "MTCO2e"}
        </CardContent>
    </Card>
);
};

export default GHGReductions;
