import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useYearOverYear from "../../store/useYearOverYear";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";

const Controls = () => {
  const { controlsData, setControlsData, user, data } = useAuthStore();
  const [electrificationScenario, setElectrificationScenario] = useState("");
  const [site, setSite] = useState("");
  const [incentives, setIncentives] = useState(false);
  const [iraIncentives, setIraIncentives] = useState(false);
  const [electrificationOptions, setElectrificationOptions] = useState([]);
  const [siteOptions, setSiteOptions] = useState([]);

  const initialLoad = useRef(true);

  useEffect(() => {
    if (data && data[0] && data[0].electrification_scenario) {
      const options = Object.keys(data[0].electrification_scenario);
      setElectrificationOptions(options);
    }
  }, [data]);

  useEffect(() => {
    if (controlsData) {
      console.log(controlsData)
      setElectrificationScenario(controlsData["electrification_scenario"]);
      const tempSites = ["All Sites", ...controlsData.domiciles];
      setSite(controlsData["site"]);
      setSiteOptions(tempSites || "");
      setIncentives(controlsData.incentives || false);
      setIraIncentives(controlsData.ira_incentives || false);

      initialLoad.current = false;
    }
  }, [controlsData, electrificationOptions]);

  const updateControl = async (attribute, value) => {
    if (value === "" || value === null) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/controls/${user.id}`,
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
      setControlsData(result.data);
      
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
                <Label>Federal Incentives</Label>
                <Switch
                  
                  checked={iraIncentives}
                  onCheckedChange={handleIraIncentivesChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label>State/Local Incentives</Label>
                <Switch
                  checked={incentives}
                  onCheckedChange={handleIncentivesChange}
                />
              </div>
            </div>
          </form>
          
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Controls;
