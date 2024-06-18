import { create } from "zustand";
import useYears from "./useYears";
import useAuthStore from "./useAuthStore";
import useAdvancedCalc from "./useAdvancedCalc";
import useYearOverYear from "./useYearOverYear";

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
  totalVehicles: 0,
  annualkwh: {},
  ghgReductions: {},

  setYearSums: () => {
    const { data, controlsData } = useAuthStore.getState();
    const { advancedCalcs } = useAdvancedCalc.getState();
    const { START_YEAR,CURRENT_YEAR } = useYears.getState();

    const inflationRate = advancedCalcs.inflation
      ? 1 + advancedCalcs.inflation_escalation_rate
      : 1;
    const electricityInflation = 1 + advancedCalcs.electricity_escalation_rate;
    const gasolineInflation = 1 + advancedCalcs.gasoline_escalation_rate;
    const controls = controlsData;
    const calculateYearSums = (field) => {
      return useYears.getState().YEARS.reduce((acc, year) => {
        const yearTotal = data
          .filter((item) => item["Replacement Year"] === year)
          .filter((item) => {
            return item.electrification_scenario[
              controls["electrification_scenario"]
            ];
          })
          .filter((item) => {
            return (
              item["Simplified Domicile"] === controls["site"] ||
              controls["site"] === "All Sites"
            );
          })
          .reduce((sum, item) => {
            const value = item[field];
            return sum + value;
          }, 0);
        let res = yearTotal;
        if (
          field === "EV Purchase Cost pre-incentive" ||
          field === "Default Replacement Allocation"
        ) {
          res *= Math.pow(inflationRate, year - CURRENT_YEAR);
        }
        acc[year] = res;
        return acc;
      }, {});
    };

    const countVehicles = () => {
      let yearCount = 0;
      return useYears.getState().YEARS.reduce((acc, year) => {
        const yearTotal = data
          .filter((item) => item["Replacement Year"] === year)
          .filter((item) => {
            return item.electrification_scenario[
              controls["electrification_scenario"]
            ];
          })
          .filter((item) => {
            return (
              item["Simplified Domicile"] === controls["site"] ||
              controls["site"] === "All Sites"
            );
          })
          .reduce((sum, item) => sum + 1, 0);
        yearCount += yearTotal;
        acc[year] = yearCount;
        return acc;
      }, {});
    };
    const countVehiclesBySite = () => {
      let siteCounts = 0;
      data.forEach((item) => {
        const site = item["Simplified Domicile"];
        if (site === controls["site"] || controls["site"] === "All Sites") {
          siteCounts++;
        }
      });
      return siteCounts;
    };

    const calculateYearSumsWithinRange = (field) => {
      return useYears.getState().YEARS.reduce((acc, year) => {
        const yearTotal = data
          .filter(
            (item) =>
              item["Replacement Year"] <= year && item["End of life"] > year
          )
          .filter((item) => {
            return (
              item["Simplified Domicile"] === controls["site"] ||
              controls["site"] === "All Sites"
            );
          })
          .filter((item) => {
            return item.electrification_scenario[
              controls["electrification_scenario"]
            ];
          })
          .reduce((sum, item) => {
            const value = item[field];

            return sum + value;
          }, 0);
        let res = yearTotal;
        if (
          field === "EV Annual Maintenance Costs" ||
          field === "Existing Vehicle Annual Maintenance"
        ) {
          res *= Math.pow(inflationRate, year - CURRENT_YEAR);
        }
        if (field === "EV Annual Charging Costs") {
          res *= Math.pow(electricityInflation, year - CURRENT_YEAR);
        }
        if (field === "Existing Vehicle Annual Fuel Costs") {
          res *= Math.pow(gasolineInflation, year - CURRENT_YEAR);
        }
        acc[year] = res;
        return acc;
      }, {});
    };
    const calculateYearSumsGreaterThan = (field) => {
      return useYears.getState().YEARS.reduce((acc, year) => {
        const yearTotal = data
          .filter((item) => item["Replacement Year"] <= year)
          .filter((item) => {
            return item.electrification_scenario[
              controls["electrification_scenario"]
            ];
          })
          .filter((item) => {
            return (
              item["Simplified Domicile"] === controls["site"] ||
              controls["site"] === "All Sites"
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

    const annualkwh = calculateYearSumsGreaterThan("Annual KWh");
    const ghgReductions = calculateYearSumsGreaterThan("ghg");

    const totalVehicles = countVehiclesBySite();

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
      totalVehicles,
      annualkwh,
      ghgReductions,
    });


    const { initYearOverYear } = useYearOverYear.getState();
    initYearOverYear();
  },
}));

export default useProFormaCalcs;
