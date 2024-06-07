import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import useAuthStore from "../store/useAuthStore";


const PrioritySite = () => {
  const {controlsData} = useAuthStore();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>📍 Priority Site</CardTitle>
      </CardHeader>

      <CardContent>
      {controlsData && controlsData.site}
      </CardContent>
    </Card>
  );
};

export default PrioritySite;
