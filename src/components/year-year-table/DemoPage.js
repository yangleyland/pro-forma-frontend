import { Payment, columns } from "./Columns"
import { DataTable } from "./DataTable"
import useYearOverYear from "../../store/useYearOverYear"

export default function DemoPage() {
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
      estimatedElectricVehicles["title"] = "Estimated Electric Vehicles";
      costOfElectricVehicles["title"] = "Cost of Electric Vehicles";
      defaultVehicleReplacementFundAllocation["title"] = "Default Vehicle Replacement Fund Allocation";
      estimatedEVMaintenanceCosts["title"] = "Estimated EV Maintenance Costs";
      electricVehicleChargingCosts["title"] = "Electric Vehicle Charging Costs";
      existingVehicleMaintenanceCosts["title"] = "Existing Vehicle Maintenance Costs";
      existingVehicleAnnualFuelCost["title"] = "Existing Vehicle Annual Fuel Cost";
      numberOfNewPorts["title"] = "Number of New Ports";
      loanAmount["title"] = "Loan Amount";
      loanPrincipalRemaining["title"] = "Loan Principal Remaining";
      loanAnnualInterest["title"] = "Loan Annual Interest";
      loanAnnualPayments["title"] = "Loan Annual Payments";
      chargerInstallCosts["title"] = "Charger Install Costs";
      trenchingCosts["title"] = "Trenching Costs";
      upgradeCostUtility["title"] = "Infrastructure Upgrade Cost (utility)";
    upgradeCostCustomer["title"] = "Infrastructure Upgrade Cost (customer)";
    procurementManagementCost["title"] = "Procurement Management Cost";
    chargerIncentives["title"] = "Charger Incentives";

      chargerPurchaseCosts["title"] = "Charger Purchase Costs";
      chargerMaintenanceCosts["title"] = "Charger Maintenance Costs";
      chargerNetworkAndManagementCosts["title"] = "Charger Network and Management Costs";
      chargeMangementSavings["title"] = "Charge Management Savings";
      totalVehicleCosts["title"] = "Total Vehicle Costs";
      totalVehicleSavings["title"] = "Total Vehicle Savings";
      totalChargingInfrastructureCosts["title"] = "Total Charging Infrastructure Costs";
      totalChargingInfrastructureSavings["title"] = "Total Charging Infrastructure Savings";
      totalCosts["title"] = "Total Costs";
      totalSavings["title"] = "Total Savings";
      annualCostBenefit["title"] = "Annual Cost Benefit";
      cumulativeCostBenefit["title"] = "Cumulative Cost Benefit";
      const data = [
        estimatedElectricVehicles,
        numberOfNewPorts,

        costOfElectricVehicles,
        estimatedEVMaintenanceCosts,
        electricVehicleChargingCosts,
        defaultVehicleReplacementFundAllocation,
        existingVehicleMaintenanceCosts,
        existingVehicleAnnualFuelCost,

        chargerPurchaseCosts,
        chargerInstallCosts,
        trenchingCosts,
        upgradeCostUtility,
        upgradeCostCustomer,
        procurementManagementCost,
        
        
        chargerMaintenanceCosts,
        chargerNetworkAndManagementCosts,
        chargeMangementSavings,
        chargerIncentives,

        loanAmount,
        loanPrincipalRemaining,
        loanAnnualInterest,
        loanAnnualPayments,

        totalVehicleCosts,
        totalVehicleSavings,
        totalChargingInfrastructureCosts,
        totalChargingInfrastructureSavings,
        totalCosts,
        totalSavings,
        annualCostBenefit,
        cumulativeCostBenefit,
      ];
    console.log(data);
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
