import { create } from "zustand";
import useProFormaCalcs from "./useProFormaCalcs";
import useAuthStore from "./useAuthStore";
import usePhases from "./usePhases";
import useAdvancedCalc from "./useAdvancedCalc";
import useChargerCosts from "./useChargerCosts";

const YEARS = Array.from({ length: 17 }, (_, i) => 2024 + i);

const useYearOverYear = create((set, get) => ({
  estimatedElectricVehicles: {},
  costOfElectricVehicles: {},
  defaultVehicleReplacementFundAllocation: {},
  estimatedEVMaintenanceCosts: {},
  electricVehicleChargingCosts: {},
  existingVehicleMaintenanceCosts: {},
  existingVehicleAnnualFuelCost: {},
  numberOfNewPorts: {},
  loanAmount: {},
  loanPrincipalRemaining: {},
  loanAnnualInterest: {},
  loanAnnualPayments: {},
  chargerPurchaseCosts: {},
  chargerInstallCosts: {},
  setCostOfElectricVehicles: () => {
    const { evPurchaseCostSums, HVIP, IRA } = useProFormaCalcs.getState();
    const { controlsData } = useAuthStore.getState();

    console.log(controlsData);
    const costOfElectricVehicles = YEARS.reduce((acc, year) => {
      acc[year] = evPurchaseCostSums[year];
      if (controlsData.incentives) {
        acc[year] -= IRA[year];
        acc[year] -= HVIP[year];
      } else if (controlsData.ira_incentives) {
        acc[year] -= IRA[year];
      }

      return acc;
    }, {});
    console.log(costOfElectricVehicles);
    set({ costOfElectricVehicles });
  },
  setDefaultVehicleReplacementFundAllocation: () => {
    const { defaultReplacementAllocationSums } = useProFormaCalcs.getState();
    const defaultVehicleReplacementFundAllocation = YEARS.reduce(
      (acc, year) => {
        acc[year] = defaultReplacementAllocationSums[year];
        return acc;
      },
      {}
    );
    set({ defaultVehicleReplacementFundAllocation });
  },
  setEstimatedEVMaintenanceCosts: () => {
    const { EVAnnualMaintenanceCost } = useProFormaCalcs.getState();
    const { controlsData } = useAuthStore.getState();

    const estimatedEVMaintenanceCosts = YEARS.reduce((acc, year) => {
      if (year >= controlsData.phase1) {
        acc[year] = EVAnnualMaintenanceCost[year];
      } else {
        acc[year] = 0;
      }

      return acc;
    }, {});
    set({ estimatedEVMaintenanceCosts });
  },
  setElectricVehicleChargingCost: () => {
    const { EVAnnualChargingCosts } = useProFormaCalcs.getState();
    const { controlsData } = useAuthStore.getState();
    const electricVehicleChargingCosts = YEARS.reduce((acc, year) => {
      if (year >= controlsData.phase1) {
        acc[year] = EVAnnualChargingCosts[year];
      } else {
        acc[year] = 0;
      }

      return acc;
    }, {});
    set({ electricVehicleChargingCosts });
  },
  setExistingVehicleMaintenanceCosts: () => {
    const { existingVehicleAnnualMaintenanceCost } =
      useProFormaCalcs.getState();
    const { controlsData } = useAuthStore.getState();
    const existingVehicleMaintenanceCosts = YEARS.reduce((acc, year) => {
      if (year >= controlsData.phase1) {
        acc[year] = existingVehicleAnnualMaintenanceCost[year];
      } else {
        acc[year] = 0;
      }

      return acc;
    }, {});
    set({ existingVehicleMaintenanceCosts });
  },
  setExistingVehicleFuelCosts: () => {
    const { existingVehicleAnnualFuelCosts } = useProFormaCalcs.getState();
    const { controlsData } = useAuthStore.getState();
    const fuelCost = YEARS.reduce((acc, year) => {
      if (year >= controlsData.phase1) {
        acc[year] = existingVehicleAnnualFuelCosts[year];
      } else {
        acc[year] = 0;
      }

      return acc;
    }, {});
    set({ existingVehicleAnnualFuelCost: fuelCost });
  },
  setEstimatedElectricVehicles: () => {
    const { vehicleCounts } = useProFormaCalcs.getState();
    const { controlsData } = useAuthStore.getState();
    const estimatedElectricVehicles = YEARS.reduce((acc, year) => {
      if (year >= controlsData.phase1) {
        acc[year] = vehicleCounts[year];
      } else {
        acc[year] = -1;
      }

      return acc;
    }, {});
    set({ estimatedElectricVehicles });
  },
  setNumberOfNewPorts: () => {
    const { phases } = usePhases.getState();
    const numberOfNewPorts = YEARS.reduce((acc, year) => {
      acc[year] = 0;
      phases
        .filter((phase) => phase.year === year)
        .forEach((phase) => {
          acc[year] += phase.ports;
        });

      return acc;
    }, {});
    console.log("new ports", numberOfNewPorts);
    set({ numberOfNewPorts });
  },
  setLoanAmount: () => {
    const { phases } = usePhases.getState();
    const loanAmount = YEARS.reduce((acc, year) => {
      acc[year] = 0;
      phases
        .filter((phase) => phase.year === year)
        .forEach((phase) => {
          acc[year] += phase.loan_amount;
        });

      return acc;
    }, {});
    console.log("loan amount", loanAmount);
    set({ loanAmount });
  },
  setChargerPurchaseAmount: () => {
    const { phases } = usePhases.getState();
    console.log("phases", phases);
    const chargerPurchaseCosts = YEARS.reduce((acc, year) => {
        acc[year] = 0;
        phases
          .filter((phase) => phase.year === year)
          .forEach((phase) => {
            acc[year] += phase.cost;
          });
  
        return acc;
    }, {});
    set({ chargerPurchaseCosts });
  },
  setChargerInstallCosts: () => {
    const { phases } = usePhases.getState();
    console.log("phases", phases);
    const chargerInstallCosts = YEARS.reduce((acc, year) => {
        acc[year] = 0;
        phases
          .filter((phase) => phase.year === year)
          .forEach((phase) => {
            acc[year] += phase.installCost;
          });
  
        return acc;
    }, {});
    set({ chargerInstallCosts });
  },
  setPrincipalRemaining: () => {
    const { advancedCalcs} = useAdvancedCalc.getState();
    console.log("advancedCalcs", advancedCalcs);

    const { loanAmount } = get();
    let curYear = 2024;
    let loanPrincipalRemaining = {};
    let loanAnnualInterest = {};
    let loanAnnualPayments = {};
    let curLoanAmount = 0;
    loanPrincipalRemaining[curYear - 1] = 0;
    loanAnnualInterest[curYear - 1] = 0;
    loanAnnualPayments[curYear - 1] = 0;
    while (curYear <= 2040) {
      curLoanAmount += loanAmount[curYear];
      loanPrincipalRemaining[curYear] =
        loanAmount[curYear] +
        loanPrincipalRemaining[curYear - 1] +
        loanAnnualInterest[curYear - 1] -
        loanAnnualPayments[curYear - 1];
      loanAnnualInterest[curYear] = loanPrincipalRemaining[curYear] * advancedCalcs.infrastructure_loan_interest_rate;
      loanAnnualPayments[curYear] = curLoanAmount / advancedCalcs.infrastructure_loan_term +loanAnnualInterest[curYear];
      curYear++;
    }
    console.log("loan principal remaining", loanPrincipalRemaining);
    set({loanPrincipalRemaining, loanAnnualInterest, loanAnnualPayments})
  },
  initYearOverYear: () => {
    get().setCostOfElectricVehicles();
    get().setDefaultVehicleReplacementFundAllocation();
    get().setEstimatedEVMaintenanceCosts();
    get().setElectricVehicleChargingCost();
    get().setExistingVehicleMaintenanceCosts();
    get().setExistingVehicleFuelCosts();
    get().setEstimatedElectricVehicles();
    get().setNumberOfNewPorts();
    get().setLoanAmount();
    get().setPrincipalRemaining();
    get().setChargerPurchaseAmount();
    get().setChargerInstallCosts();
  },
}));

export default useYearOverYear;
