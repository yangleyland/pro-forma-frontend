import { Payment, createColumns } from "./Columns";
import { DataTable } from "./DataTable";
import useYearOverYear from "../../store/useYearOverYear";

// Function to format values as currency
const formatAsCurrency = (value) => {
  const absValue = Math.abs(value).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return value < 0 ? `-$${absValue}` : `$${absValue}`;
};

// Function to format the entire object
const formatElectricVehicles = (data) => {
  const formattedData = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (key === "title") {
        formattedData[key] = data[key]; // Do not format if the key is "title"
      } else {
        formattedData[key] = formatAsCurrency(data[key]);
      }
    }
  }
  return formattedData;
};

export default function DemoPage() {
  const columns = createColumns();
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
    capitalPlanningFunding,
    chargerInstallCosts,
    trenchingCosts,
    upgradeCostUtility,
    upgradeCostCustomer,
    procurementManagementCost,
    chargerIncentives,
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

  const createDataWithTitles = (data, title) => ({ ...data, title });

  const data = [
    createDataWithTitles(estimatedElectricVehicles, "Estimated Electric Vehicles"),
    createDataWithTitles(numberOfNewPorts, "Number of New Ports"),
    formatElectricVehicles(createDataWithTitles(costOfElectricVehicles, "Cost of Electric Vehicles")),
    formatElectricVehicles(createDataWithTitles(estimatedEVMaintenanceCosts, "Estimated EV Maintenance Costs")),
    formatElectricVehicles(createDataWithTitles(electricVehicleChargingCosts, "Electric Vehicle Charging Costs")),
    formatElectricVehicles(createDataWithTitles(defaultVehicleReplacementFundAllocation, "Default Vehicle Replacement Fund Allocation")),
    formatElectricVehicles(createDataWithTitles(existingVehicleMaintenanceCosts, "Existing Vehicle Maintenance Costs")),
    formatElectricVehicles(createDataWithTitles(existingVehicleAnnualFuelCost, "Existing Vehicle Annual Fuel Cost")),
    formatElectricVehicles(createDataWithTitles(chargerPurchaseCosts, "Charger Purchase Costs")),
    formatElectricVehicles(createDataWithTitles(chargerInstallCosts, "Charger Install Costs")),
    formatElectricVehicles(createDataWithTitles(trenchingCosts, "Trenching Costs")),
    formatElectricVehicles(createDataWithTitles(upgradeCostUtility, "Infrastructure Upgrade Cost (utility)")),
    formatElectricVehicles(createDataWithTitles(upgradeCostCustomer, "Infrastructure Upgrade Cost (customer)")),
    formatElectricVehicles(createDataWithTitles(procurementManagementCost, "Procurement Management Cost")),
    formatElectricVehicles(createDataWithTitles(chargerMaintenanceCosts, "Charger Maintenance Costs")),
    formatElectricVehicles(createDataWithTitles(chargerNetworkAndManagementCosts, "Charger Network and Management Costs")),
    formatElectricVehicles(createDataWithTitles(chargeMangementSavings, "Charge Management Savings")),
    formatElectricVehicles(createDataWithTitles(chargerIncentives, "Charger Incentives")),
    formatElectricVehicles(createDataWithTitles(capitalPlanningFunding, "Capital Planning Funding")),
    formatElectricVehicles(createDataWithTitles(loanAmount, "Loan Amount")),
    formatElectricVehicles(createDataWithTitles(loanPrincipalRemaining, "Loan Principal Remaining")),
    formatElectricVehicles(createDataWithTitles(loanAnnualInterest, "Loan Annual Interest")),
    formatElectricVehicles(createDataWithTitles(loanAnnualPayments, "Loan Annual Payments")),
    formatElectricVehicles(createDataWithTitles(totalVehicleCosts, "Total Vehicle Costs")),
    formatElectricVehicles(createDataWithTitles(totalVehicleSavings, "Total Vehicle Savings")),
    formatElectricVehicles(createDataWithTitles(totalChargingInfrastructureCosts, "Total Charging Infrastructure Costs")),
    formatElectricVehicles(createDataWithTitles(totalChargingInfrastructureSavings, "Total Charging Infrastructure Savings")),
    formatElectricVehicles(createDataWithTitles(totalCosts, "Tota Annual Costs")),
    formatElectricVehicles(createDataWithTitles(totalSavings, "Total Annual Savings")),
    formatElectricVehicles(createDataWithTitles(annualCostBenefit, "Annual Cost Benefit")),
    formatElectricVehicles(createDataWithTitles(cumulativeCostBenefit, "Cumulative Cost Benefit")),
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
