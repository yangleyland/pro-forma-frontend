import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";

const Controls = () => {
  const { controlsData, setControlsData, user } = useAuthStore();
  const [electrificationScenario, setElectrificationScenario] = useState("");
  const [site, setSite] = useState("");
  const [incentives, setIncentives] = useState(false);
  const [iraIncentives, setIraIncentives] = useState(false);

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

    } catch (error) {
      console.error(`Error updating control: ${error.message}`);
    }
  };

  const handleElectrificationScenarioChange = (e) => {
    const newValue = e.target.value;
    setElectrificationScenario(newValue);
    updateControl("electrification_scenario", newValue);
  };

  const handleSiteChange = (e) => {
    const newValue = e.target.value;
    setSite(newValue);
    updateControl("site", newValue);
  };

  const handleIncentivesChange = (e) => {
    const newValue = e.target.checked;
    setIncentives(newValue);
    updateControl("incentives", newValue);
    // Call additional function here
  };

  const handleIraIncentivesChange = (e) => {
    const newValue = e.target.checked;
    setIraIncentives(newValue);
    updateControl("ira_incentives", newValue);
  };


  return (
    <div>
      <h2>Controls</h2>

      <div>
        <label>Electrification Scenario:</label>
        <select
          value={electrificationScenario}
          onChange={handleElectrificationScenarioChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          {electrificationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Site to Display on Dashboard:</label>
        <select value={site} onChange={handleSiteChange}>
          <option value="" disabled>
            Select a site
          </option>
          {siteOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Turn on Incentives?</label>
        <input
          type="checkbox"
          checked={incentives}
          onChange={handleIncentivesChange}
        />
      </div>

      <div>
        <label>Turn on Inflation Reduction Act Incentives?</label>
        <input
          type="checkbox"
          checked={iraIncentives}
          onChange={handleIraIncentivesChange}
        />
      </div>
    </div>
  );
};

export default Controls;
