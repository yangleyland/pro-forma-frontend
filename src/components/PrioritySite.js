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
    <Card className="h-full relative">
      <CardHeader>
        <CardTitle>📍 Selected Site</CardTitle>
      </CardHeader>

      <CardContent className="h-3/4 absolute bottom-0 w-full text-xl font-semibold flex items-center justify-center">
      {controlsData && controlsData.site}
      </CardContent>
    </Card>
  );
};

export default PrioritySite;
