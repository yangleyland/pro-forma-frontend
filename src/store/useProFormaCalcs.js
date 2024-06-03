import { create } from "zustand";
import useYears from './useYears';


// Create Zustand store
const useProFormaCalcs = create((set) => ({
  evPurchaseCostSums: {},
  defaultReplacementAllocationSums: {},
  EVAnnualMaintenanceCost: {},
  existingVehicleAnnualMaintenanceCost: {},
  EVAnnualChargingCosts: {},
  existingVehicleAnnualFuelCosts: {},
  HVIP: {},
  IRA: {},
  vehicleCounts: {},
  setYearSums: (data, controls) => {
    const calculateYearSums = (field) => {
      return useYears.getState().YEARS.reduce((acc, year) => {
        const yearTotal = data
          .filter((item) => item["Replacement Year"] === year)
          .filter((item) => {
            if (controls["electrification_scenario"] === "All Vehicles") {
              return true; // Include all items if scenario is "All Vehicles"
            }
            if (
              controls["electrification_scenario"] ===
              "Whole Fleet Electrification Excluding Exemptions"
            ) {
              return item["Exclude?"] === "No";
            }
            return (
              item["Electrification Scenario"] ===
              "Medium- and Heavy-Duty Vehicles Only"
            );
          })
          .reduce((sum, item) => sum + item[field], 0);
        acc[year] = yearTotal;
        return acc;
      }, {});
    };

    const countVehicles = () => {
      let yearCount = 0;
      return useYears.getState().YEARS.reduce((acc, year) => {
        const yearTotal = data
          .filter((item) => item["Replacement Year"] === year)
          .filter((item) => {
            if (controls["electrification_scenario"] === "All Vehicles") {
              return true; // Include all items if scenario is "All Vehicles"
            }
            if (
              controls["electrification_scenario"] ===
              "Whole Fleet Electrification Excluding Exemptions"
            ) {
              return item["Exclude?"] === "No";
            }
            return (
              item["Electrification Scenario"] ===
              "Medium- and Heavy-Duty Vehicles Only"
            );
          })
          .reduce((sum, item) => sum + 1, 0);
        yearCount += yearTotal;
        acc[year] = yearCount;
        return acc;
      }, {});
    };

    const calculateYearSumsWithinRange = (field) => {
      return useYears.getState().YEARS.reduce((acc, year) => {
        const yearTotal = data
          .filter(
            (item) =>
              item["Replacement Year"] <= year && item["End of life"] > year
          )
          .filter((item) => {
            if (controls["electrification_scenario"] === "All Vehicles") {
              return true; // Include all items if scenario is "All Vehicles"
            }
            if (
              controls["electrification_scenario"] ===
              "Whole Fleet Electrification Excluding Exemptions"
            ) {
              return item["Exclude?"] === "No";
            }
            return (
              item["Electrification Scenario"] ===
              "Medium- and Heavy-Duty Vehicles Only"
            );
          })
          .reduce((sum, item) => {
            const value = parseFloat(item[field] || 0);
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
    const vehicleCounts = countVehicles();

    set({
      evPurchaseCostSums,
      defaultReplacementAllocationSums,
      EVAnnualMaintenanceCost,
      existingVehicleAnnualMaintenanceCost,
      EVAnnualChargingCosts,
      existingVehicleAnnualFuelCosts,
      HVIP,
      IRA,
      vehicleCounts,
    });
  },
}));

export default useProFormaCalcs;
