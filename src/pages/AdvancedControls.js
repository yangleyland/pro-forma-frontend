// src/pages/AdvancedControls.js
import React from "react";
import { useRef } from "react";
import Economics from "../components/advanced-controls/Economics";
import SoftwareCosts from "../components/advanced-controls/SoftwareCosts";
import { Button } from "../components/ui/button";

function AdvancedControls() {
  const economicsRef = useRef(null);
  const softwareCostsRef = useRef(null);


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
    console.log(data);
    // Perform API call with the combined data
    // const response = await fetch('/your-api-endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });

    // const result = await response.json();
    // console.log(result);
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Advanced Controls
      </h1>
      <div className="flex flex-col w-1/4 gap-5">
        <Economics ref={economicsRef} />
        <SoftwareCosts ref={softwareCostsRef} />
        <Button className="w-full mb-5" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default AdvancedControls;
