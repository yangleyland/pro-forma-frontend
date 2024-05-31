import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import useYearOverYear from "../store/useYearOverYear";

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
      const {initYearOverYear}=useYearOverYear.getState();
      initYearOverYear();

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
      <div>
        <label>Phases:</label>
        <input type="text" value={phase1} onChange={handlePhase1Change} />
        <input type="text" value={phase2} onChange={handlePhase2Change} />
        <input type="text" value={phase3} onChange={handlePhase3Change} />
      </div>
    </div>
  );
};

export default Controls;
