import React from "react";
import CityInfoGrid from "../components/city-info-grid/CityInfoGrid";
import ChargerInfoForm from "../components/ChargerInfoForm";

const SetInfo = () => {
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Set City Information
      </h1>
      <div className="flex gap-9">
        <CityInfoGrid />
        <ChargerInfoForm />
      </div>
    </div>
  );
};

export default SetInfo;
