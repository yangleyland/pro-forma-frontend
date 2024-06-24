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

      <CardContent className ="flex">
        <p><span className="text-lg font-semibold">{ghgReductions[END_YEAR - 1] && Math.floor(ghgReductions[END_YEAR - 1])}</span> {controlsData && (
          <span>
            MTCO<sub>2</sub>e
          </span>
        )}</p>
        
      </CardContent>
    </Card>
  );
};

export default GHGReductions;
