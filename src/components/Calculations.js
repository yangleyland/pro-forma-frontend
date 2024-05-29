// src/components/Calculations.js
import React, { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

function Calculations() {
  const { user, initializeAuth, data, loading } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in</div>;
  }

  // Define the years range
  const years = Array.from({ length: 17 }, (_, i) => 2024 + i);

  // Calculate sums for each year
  const calculateYearSums = (field) => {
    return years.reduce((acc, year) => {
      const yearTotal = data
        .filter((item) => item["Replacement Year"] === year)
        .filter(
          (item) =>
            item["Electrification Scenario"] ===
            "Medium- and Heavy-Duty Vehicles Only"
        )
        .reduce((sum, item) => sum + item[field], 0);
      acc[year] = yearTotal;
      return acc;
    }, {});
  };

  //sums with range
  const calculateYearSumsWithinRange = (field) => {
    return years.reduce((acc, year) => {
      const yearTotal = data
        .filter(
          (item) =>
            item["Replacement Year"] <= year && item["End of life"] > year
        )
        .filter(
          (item) =>
            item["Electrification Scenario"] ===
            "Medium- and Heavy-Duty Vehicles Only"
        )
        .reduce((sum, item) => {
            const value = parseFloat(item[field] || 0);
            console.log(`Adding ${value} for year ${year} to ${field}`);
            return sum + value;
          }, 0);
      acc[year] = yearTotal;
      return acc;
    }, {});
  };

  const evPurchaseCostSums = calculateYearSums(
    "EV Purchase Cost pre-incentive"
  );
  const defaultReplacementAllocationSums = calculateYearSums(
    "Default Replacement Allocation"
  );
  const EVAnnualMaintenanceCost = calculateYearSumsWithinRange(
    "EV Annual Maintenance Costs"
  );
  const existingVehicleAnnualMaintenanceCost = calculateYearSumsWithinRange(
    "Existing Vehicle Annual Maintenance"
  );
  const EVAnnualChargingCosts = calculateYearSumsWithinRange(
    "EV Annual Charging Costs"
  );
  const existingVehicleAnnualFuelCosts = calculateYearSumsWithinRange(
    "Existing Vehicle Annual Fuel Costs"
  );

  const HVIP = calculateYearSums(
    "HVIP, PG&E EV Fleet Program, and Other Incentives"
  );
  const IRA = calculateYearSums("IRA Incentives");

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
        </tbody>
      </table>
    </div>
  );
}

export default Calculations;
