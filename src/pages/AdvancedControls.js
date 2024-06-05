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

function AdvancedControls() {
  const economicsRef = useRef(null);
  const softwareCostsRef = useRef(null);
  const { user } = useAuthStore();
  const { fetchAdvancedCalcs } = useAdvancedCalc();
  const { initYearOverYear } = useYearOverYear();
  const { setYearSums } = useProFormaCalcs();

  const handleSubmit = async () => {
    const economicsData = new FormData(economicsRef.current);
    const softwareCostsData = new FormData(softwareCostsRef.current);
    console.log("economics data", economicsData);
    const data = {};
    economicsData.forEach((value, key) => {
      data[key] = value;
    });
    softwareCostsData.forEach((value, key) => {
      data[key] = value;
    });
    data["id"] = user.id;
    console.log(data);
    try {
      const response = await fetch(
        "http://localhost:3002/api/advancedcontrols",
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
      console.log("API response:", result);
      await fetchAdvancedCalcs(user.id);
      setYearSums();
      initYearOverYear();
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Advanced Controls
      </h1>
      <div className="flex flex-col w-1/4 gap-5">
        <Button className="w-full" onClick={handleSubmit}>
          Save
        </Button>
        <Economics ref={economicsRef} />
        <SoftwareCosts ref={softwareCostsRef} />
      </div>
    </div>
  );
}

export default AdvancedControls;
