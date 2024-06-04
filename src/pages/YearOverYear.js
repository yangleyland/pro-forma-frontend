import React from "react";
import { useEffect } from "react";
import useChargerCosts from "../store/useChargerCosts";
import usePhases from "../store/usePhases";
import useAuthStore from "../store/useAuthStore";
import useProFormaCalcs from "../store/useProFormaCalcs";
import useYearOverYear from "../store/useYearOverYear";
import useYears from "../store/useYears";
import DemoPage from "../components/table/page.js";

const YearOverYear = () => {
  const { user } = useAuthStore();
  const { YEARS } = useYears();
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
    loanAnnualPayments,
    chargerInstallCosts,
    chargerPurchaseCosts,
    chargerMaintenanceCosts,
    chargerNetworkAndManagementCosts,
    chargeMangementSavings,
    totalVehicleCosts,
    totalVehicleSavings,
    totalChargingInfrastructureCosts,
    totalChargingInfrastructureSavings,
    totalCosts,
    totalSavings,
    annualCostBenefit,
    cumulativeCostBenefit,
  } = useYearOverYear();

  const rows = [
    { label: "Estimated Electric Vehicles", data: estimatedElectricVehicles },
    { label: "Number of New Ports", data: numberOfNewPorts },
    { label: "Electric Vehicle Purchase Cost", data: costOfElectricVehicles },
    {
      label: "Estimated EV Maintenance Cost",
      data: estimatedEVMaintenanceCosts,
    },
    {
      label: "Electric Vehicle Charging Costs",
      data: electricVehicleChargingCosts,
    },
    {
      label: "Default Vehicle Replacement Fund Allocation",
      data: defaultVehicleReplacementFundAllocation,
    },
    {
      label: "Existing Vehicle Maintenance Cost",
      data: existingVehicleMaintenanceCosts,
    },
    {
      label: "Existing Vehicle Annual Fuel Cost",
      data: existingVehicleAnnualFuelCost,
    },
    { label: "Loan Amount", data: loanAmount },
    { label: "Loan Principal Remaining", data: loanPrincipalRemaining },
    { label: "Loan Annual Interest", data: loanAnnualInterest },
    { label: "Charger Purchase Costs", data: chargerPurchaseCosts },
    { label: "Charger Install Costs", data: chargerInstallCosts },
    { label: "Loan Annual Payments", data: loanAnnualPayments },
    { label: "Charger Maintenance Costs", data: chargerMaintenanceCosts },
    {
      label: "Charger Network And Management Costs",
      data: chargerNetworkAndManagementCosts,
    },
    { label: "Charge Management Savings", data: chargeMangementSavings },
    { label: "Total Vehicle Costs", data: totalVehicleCosts },
    { label: "Total Vehicle Savings", data: totalVehicleSavings },
    {
      label: "Total Charging Infrastructure Costs",
      data: totalChargingInfrastructureCosts,
    },
    {
      label: "Total Charging Infrastructure Savings",
      data: totalChargingInfrastructureSavings,
    },
    { label: "Total Costs", data: totalCosts },
    { label: "Total Savings", data: totalSavings },
    { label: "Annual Cost Benefit", data: annualCostBenefit },
    { label: "Cumulative Cost Benefit", data: cumulativeCostBenefit },
  ];

  if (!user) {
    return <div>Please log in</div>;
  }
  return (
    <div>
      <DemoPage/>
      <h1 className="scroll-m-20 text-4xl font-bold tracking-normal lg:text-5xl text-optonygreen mb-4">
        Year-Over-Year
      </h1>

      <h2>Vehicles</h2>
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
};

export default YearOverYear;
