// src/components/Calculations.js
import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import useProFormaCalcs from "../store/useProFormaCalcs";
import useYears from "../store/useYears";

function Calculations() {
  const {  loading } = useAuthStore();
  const {YEARS} = useYears();


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

  const rows = [
    { label: "Electric Vehicle Purchase Cost", data: evPurchaseCostSums },
    { label: "Default Replacement Allocation", data: defaultReplacementAllocationSums },
    { label: "EV Annual Maintenance Cost", data: EVAnnualMaintenanceCost },
    { label: "Existing Vehicle Annual Maintenance Cost", data: existingVehicleAnnualMaintenanceCost },
    { label: "EV Annual Charging Cost", data: EVAnnualChargingCosts },
    { label: "Existing Vehicle Annual Fuel Costs", data: existingVehicleAnnualFuelCosts },
    { label: "HVIP", data: HVIP },
    { label: "IRA", data: IRA },
    { label: "Vehicle Counts", data: vehicleCounts }
  ];

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
            {YEARS.map((year) => (
              <th key={year}>{year}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {rows.map((row) => (
      <tr key={row.label}>
        <td>{row.label}</td>
        {YEARS.map((year) => (
          <td key={year}>{Math.round(row.data[year])}</td>
        ))}
      </tr>
    ))}
        </tbody>
      </table>
    </div>
  );
}

export default Calculations;
