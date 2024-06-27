// src/pages/AdvancedControls.js
import React from "react";
import { useRef } from "react";
import Economics from "../components/advanced-controls/Economics";
import SoftwareCosts from "../components/advanced-controls/SoftwareCosts";
import { Button } from "../components/ui/button";
import useAuthStore from "../store/useAuthStore";
import useAdvancedCalc from "../store/useAdvancedCalc";
import useYearOverYear from "../store/useYearOverYear";
import useProFormaCalcs from "../store/useProFormaCalcs";
import ResetButton from "../components/ResetButton";
import { Card } from "../components/ui/card";
import CostBenefitChart from "../components/dashboard/CostBenefitChart";
import CostAndSavings from "../components/dashboard/CostAndSavings";

function AdvancedControls() {
  const economicsRef = useRef(null);
  const softwareCostsRef = useRef(null);
  const { user } = useAuthStore();
  const { fetchAdvancedCalcs } = useAdvancedCalc();

  const handleSubmit = async () => {
    const economicsData = new FormData(economicsRef.current);
    const softwareCostsData = new FormData(softwareCostsRef.current);
    const data = {};

    economicsData.forEach((value, key) => {
      data[key] = value;
    });
    softwareCostsData.forEach((value, key) => {
      data[key] = value;
    });
    data["id"] = user.id;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/advancedcontrols`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      await fetchAdvancedCalcs(user.id);
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div>
      <div className="flex lg:flex-col lg:mb-4">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4 mr-9 lg:mr-0">
          Advanced Controls
        </h1>
        <ResetButton tableName="advanced controls" />
        
      </div>
      <div className="w-full flex flex-row-reverse lg:flex-col-reverse">
        
        <div className="w-1/2 flex flex-col gap-10 lg:w-full">
          <CostBenefitChart />
          <CostAndSavings />
        </div>
        <div className="w-1/2 flex flex-col items-center pb-16 lg:w-full">
          <div className="flex flex-col gap-5 lg:w-full">
            <Button className="w-full" onClick={handleSubmit}>
              Apply Changes
            </Button>
            <Card className="flex flex-col items-center">
              <Economics update={handleSubmit} ref={economicsRef} />
              <SoftwareCosts update={handleSubmit} ref={softwareCostsRef} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedControls;
