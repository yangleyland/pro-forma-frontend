import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import useAuthStore from "../../store/useAuthStore";

const ElectrificationScenario = () => {
    const { controlsData } = useAuthStore();
    const electrificationScenarioDescriptions ={
        "All Vehicles":"All vehicles are electrified",
        "Medium- and Heavy-Duty Vehicles Only":"Only Medium and Heavy Duty vehicles are electrified",
        "Whole Fleet Electrification Excluding Exemptions":"Light-Duty, Medium-Duty, and Heavy-Duty Vehicles including vehicles without an EV replacement option currently on market",
    }
    
  return (
    <Card className="h-1/2">
      <CardHeader>
        <CardTitle>🔋 Electrification Scenario</CardTitle>
      </CardHeader>

      <CardContent>
      {controlsData && electrificationScenarioDescriptions[controlsData.electrification_scenario]}
      </CardContent>
    </Card>
  );
};

export default ElectrificationScenario;
