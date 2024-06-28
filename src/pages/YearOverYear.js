import React, { useEffect, useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useYearOverYear from "../store/useYearOverYear";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import YearGrid from "../components/year-grid/YearGrid";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";
import usePhases from "../store/usePhases"

const YearOverYear = () => {
  const [siteOptions, setSiteOptions] = useState([]);
  const [site, setSite] = useState("");
  const { controlsData, setControlsData, user, data, fetchData } =
    useAuthStore();
  const {filteredPhases} = usePhases();
  const {estimatedElectricVehicles} = useYearOverYear();
  const [error,setError]=useState(false);

  useEffect(() => {
    
    const min = Math.min(...filteredPhases.map((phase) => phase.year));
    const hasError = Object.keys(estimatedElectricVehicles).some((year) => {
      return year < min && estimatedElectricVehicles[year] > 0;
    });
    setError(hasError);
  }, [filteredPhases, estimatedElectricVehicles]);

  useEffect(() => {
    if (controlsData) {
      const tempSites = ["All Sites", ...controlsData.domiciles];
      setSite(controlsData["site"] || "");
      setSiteOptions(tempSites || "");
    }
  }, [controlsData, data]);

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

  const handleSiteChange = (str) => {
    const newValue = str;
    setSite(newValue);
    updateControl("site", newValue);
  };

  if (!user) {
    return <div>Please log in</div>;
  }


  return (
    <div className="h-full">
      <div className="flex justify-between mb-5">
        <h1 className=" scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4 font-franklin tracking-wide">
          Year Over Year
        </h1>
        {error&&<Alert className="ml-4 w-200" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            There are vehicles electrified before charging stations
          </AlertDescription>
        </Alert>}
        <div className="pl-5  flex flex-col space-y-1.5">
          <Label>Selected Site</Label>
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
      </div>
      <YearGrid />
    </div>
  );
};

export default YearOverYear;
