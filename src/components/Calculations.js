// src/components/Calculations.js
import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useProFormaCalcs from "../store/useProFormaCalcs";

function Calculations() {
  const {  loading } = useAuthStore();


  const years = Array.from({ length: 17 }, (_, i) => 2024 + i);

  const {
    evPurchaseCostSums,
    defaultReplacementAllocationSums,
    EVAnnualMaintenanceCost,
    existingVehicleAnnualMaintenanceCost,
    EVAnnualChargingCosts,
    existingVehicleAnnualFuelCosts,
    HVIP,
    IRA,
    vehicleCounts,
  } = useProFormaCalcs();



  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h1>Calculations</h1>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            {years.map((year) => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Electric Vehicle Purchase Cost</td>
            {years.map((year) => (
              <td key={year}>{evPurchaseCostSums[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Default Replacement Allocation</td>
            {years.map((year) => (
              <td key={year}>{defaultReplacementAllocationSums[year]}</td>
            ))}
          </tr>
          <tr>
            <td>EV Annual Maintenance Cost</td>
            {years.map((year) => (
              <td key={year}>{EVAnnualMaintenanceCost[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Existing Vehicle Annual Maintenance Cost</td>
            {years.map((year) => (
              <td key={year}>{existingVehicleAnnualMaintenanceCost[year]}</td>
            ))}
          </tr>
          <tr>
            <td>EV Annual Charging Cost</td>
            {years.map((year) => (
              <td key={year}>{EVAnnualChargingCosts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Existing Vehicle Annual Fuel Costs</td>
            {years.map((year) => (
              <td key={year}>{existingVehicleAnnualFuelCosts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>HVIP</td>
            {years.map((year) => (
              <td key={year}>{HVIP[year]}</td>
            ))}
          </tr>
          <tr>
            <td>IRA</td>
            {years.map((year) => (
              <td key={year}>{IRA[year]}</td>
            ))}
          </tr>
          <tr>
            <td>IRA</td>
            {years.map((year) => (
              <td key={year}>{vehicleCounts[year]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Calculations;
