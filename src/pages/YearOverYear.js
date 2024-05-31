import React from "react";
import { useEffect } from "react";
import useChargerCosts from "../store/useChargerCosts";
import usePhases from "../store/usePhases";
import useAuthStore from "../store/useAuthStore";
import useProFormaCalcs from "../store/useProFormaCalcs";
import useYearOverYear from "../store/useYearOverYear";

const YearOverYear = () => {
  const { user, controlsData } = useAuthStore();
  const { phases } = usePhases();
  const {
    estimatedElectricVehicles,
    costOfElectricVehicles,
    defaultVehicleReplacementFundAllocation,
    estimatedEVMaintenanceCosts,
    electricVehicleChargingCosts,
    existingVehicleMaintenanceCosts,
    existingVehicleAnnualFuelCost,
    numberOfNewPorts,
    loanAmount,
    loanPrincipalRemaining,
    loanAnnualInterest,
    loanAnnualPayments,chargerInstallCosts,chargerPurchaseCosts
  } = useYearOverYear();

  const years = Array.from({ length: 17 }, (_, i) => 2024 + i);

  if (!user) {
    return <div>Please log in</div>;
  }
  return (
    <div>
      <h1>Year Over Year Page</h1>
      <h2>Vehicles</h2>
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
            <td>Estimated Electric Vehicles</td>
            {years.map((year) => (
              <td key={year}>{estimatedElectricVehicles[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Number of New Ports</td>
            {years.map((year) => (
              <td key={year}>{numberOfNewPorts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Electric Vehicle Purchase Cost</td>
            {years.map((year) => (
              <td key={year}>{costOfElectricVehicles[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Estimated EV Maintenance Cost</td>
            {years.map((year) => (
              <td key={year}>{estimatedEVMaintenanceCosts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Electric Vehicle Charging Costs</td>
            {years.map((year) => (
              <td key={year}>{electricVehicleChargingCosts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Default Vehicle Replacement Fund Allocation</td>
            {years.map((year) => (
              <td key={year}>
                {defaultVehicleReplacementFundAllocation[year]}
              </td>
            ))}
          </tr>
          <tr>
            <td>Existing Vehicle Maintenance Cost</td>
            {years.map((year) => (
              <td key={year}>{existingVehicleMaintenanceCosts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Existing Vehicle Annual Fuel Cost</td>
            {years.map((year) => (
              <td key={year}>{existingVehicleAnnualFuelCost[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Loan Amount</td>
            {years.map((year) => (
              <td key={year}>{loanAmount[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Loan Principal Remaining</td>
            {years.map((year) => (
              <td key={year}>{loanPrincipalRemaining[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Loan Annual Interest</td>
            {years.map((year) => (
              <td key={year}>{loanAnnualInterest[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Charger Purchase Costs</td>
            {years.map((year) => (
              <td key={year}>{chargerPurchaseCosts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Charger Install Costs</td>
            {years.map((year) => (
              <td key={year}>{chargerInstallCosts[year]}</td>
            ))}
          </tr>
          <tr>
            <td>Loan Annual Payments</td>
            {years.map((year) => (
              <td key={year}>{loanAnnualPayments[year]}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <h2>Charging Infrastructure</h2>
    </div>
  );
};

export default YearOverYear;
