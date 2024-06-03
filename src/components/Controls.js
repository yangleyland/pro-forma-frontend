import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useYearOverYear from "../store/useYearOverYear";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

const Controls = () => {
  const { controlsData, setControlsData, user } = useAuthStore();
  const [electrificationScenario, setElectrificationScenario] = useState("");
  const [site, setSite] = useState("");
  const [incentives, setIncentives] = useState(false);
  const [iraIncentives, setIraIncentives] = useState(false);
  const [phase1, setPhase1] = useState("");
  const [phase2, setPhase2] = useState("");
  const [phase3, setPhase3] = useState("");

  const initialLoad = useRef(true);

  const electrificationOptions = [
    "All Vehicles",
    "Medium- and Heavy-Duty Vehicles Only",
    "Whole Fleet Electrification Excluding Exemptions",
  ];

  const siteOptions = ["Site 1", "Site 2", "Site 3"];

  useEffect(() => {
    if (controlsData) {
      setElectrificationScenario(
        controlsData["electrification_scenario"] || ""
      );
      setSite(controlsData.site || "");
      setIncentives(controlsData.incentives || false);
      setIraIncentives(controlsData.ira_incentives || false);
      setPhase1(controlsData.phase1 || "");
      setPhase2(controlsData.phase2 || "");
      setPhase3(controlsData.phase3 || "");

      initialLoad.current = false;
    }
  }, [controlsData]);

  const updateControl = async (attribute, value) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/controls/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attribute, value }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Control updated successfully:", result);
      setControlsData(result.data);
      const { initYearOverYear } = useYearOverYear.getState();
      initYearOverYear();
    } catch (error) {
      console.error(`Error updating control: ${error.message}`);
    }
  };

  const handleElectrificationScenarioChange = (str) => {
    const newValue = str;
    setElectrificationScenario(newValue);
    updateControl("electrification_scenario", newValue);
  };

  const handleSiteChange = (str) => {
    const newValue = str;
    setSite(newValue);
    updateControl("site", newValue);
  };

  const handleIncentivesChange = (checked) => {
    const newValue = checked;
    setIncentives(newValue);
    updateControl("incentives", newValue);
    // Call additional function here
  };

  const handleIraIncentivesChange = (checked) => {
    const newValue = checked;
    setIraIncentives(newValue);
    updateControl("ira_incentives", newValue);
  };
  const handlePhase1Change = (e) => {
    const newValue = e.target.value;
    setPhase1(newValue);
    updateControl("phase1", newValue);
  };
  const handlePhase2Change = (e) => {
    const newValue = e.target.value;
    setPhase2(newValue);
    updateControl("phase2", newValue);
  };
  const handlePhase3Change = (e) => {
    const newValue = e.target.value;
    setPhase3(newValue);
    updateControl("phase3", newValue);
  };

  return (

      <Card className="h-full">
        <CardHeader>
          <CardTitle>Controls</CardTitle>
          <CardDescription>Modify basic controls of your fleet</CardDescription>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label>Electrification Scenario:</Label>
                  <Select
                    value={electrificationScenario}
                    onValueChange={handleElectrificationScenarioChange}
                  >
                    <SelectTrigger id="electrification-scenario">
                      <SelectValue placeholder="Select scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      {electrificationOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Site to Display</Label>
                  <Select value={site} onValueChange={handleSiteChange}>
                    <SelectTrigger id="site">
                      <SelectValue placeholder="Select site" />
                    </SelectTrigger>
                    <SelectContent>
                      {siteOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Turn on Incentives</Label>
                  <Switch
                    checked={incentives}
                    onCheckedChange={handleIncentivesChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label>Turn on IRA Incentives</Label>
                  <Switch
                    checked={iraIncentives}
                    onCheckedChange={handleIraIncentivesChange}
                  />
                </div>
              </div>
            </form>
          </CardContent>
        </CardHeader>
              {/* <div>
        <label>Phases:</label>
        <input type="text" value={phase1} onChange={handlePhase1Change} />
        <input type="text" value={phase2} onChange={handlePhase2Change} />
        <input type="text" value={phase3} onChange={handlePhase3Change} />
      </div> */}
      </Card>

  );
};

export default Controls;
