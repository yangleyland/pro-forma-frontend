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

const YearOverYear = () => {
  const [siteOptions, setSiteOptions] = useState([]);
  const [site, setSite] = useState("");
  const { controlsData, setControlsData, user, data, fetchData } =
    useAuthStore();

  useEffect(() => {
    if (user) {
      fetchData(user.id);
    }
  }, [fetchData, user]);

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
      <div className="flex mb-5">
        <h1 className=" scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
          Year Over Year
        </h1>
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
