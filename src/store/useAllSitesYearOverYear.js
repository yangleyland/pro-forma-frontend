import { create } from "zustand";
import useAllSitesCalcs from "./useAllSitesCalcs";
import useAuthStore from "./useAuthStore";
import usePhases from "./usePhases";
import useAdvancedCalc from "./useAdvancedCalc";
import useYears from "./useYears";

const useYearOverYear = create((set, get) => {
  return {
    estimatedElectricVehicles: {},
    costOfElectricVehicles: {},
    defaultVehicleReplacementFundAllocation: {},
    estimatedEVMaintenanceCosts: {},
    electricVehicleChargingCosts: {},
    existingVehicleMaintenanceCosts: {},
    existingVehicleAnnualFuelCost: {},
    numberOfNewPorts: {},

    loanAmount: {},
    capitalPlanningFunding: {},
    loanPrincipalRemaining: {},
    loanAnnualInterest: {},
    loanAnnualPayments: {},
    chargerPurchaseCosts: {},
    chargerInstallCosts: {},
    trenchingCosts: {},
    upgradeCostUtility: {},
    upgradeCostCustomer: {},
    procurementManagementCost: {},
    estimatedPublicWorksEngineeringCosts: {},
    chargerMaintenanceCosts: {},
    chargerNetworkAndManagementCosts: {},
    chargeMangementSavings: {},
    chargerIncentives: {},

    totalVehicleCosts: {},
    totalVehicleSavings: {},
    totalChargingInfrastructureCosts: {},
    totalChargingInfrastructureSavings: {},
    totalInfrastructureCostPreLoan: {},
    totalCosts: {},
    totalSavings: {},
    totalCapitalCosts: {},
    annualCostBenefit: {},
    cumulativeCostBenefit: {},
    netPresentValue: 0,

    setCostOfElectricVehicles: () => {
      const { evPurchaseCostSums, HVIP, IRA } = useAllSitesCalcs.getState();
      const { controlsData } = useAuthStore.getState();

      const costOfElectricVehicles = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] = evPurchaseCostSums[year];
          if (controlsData.incentives) {
            acc[year] -= HVIP[year];
          }
          if (controlsData.ira_incentives) {
            acc[year] -= IRA[year];
          }

          return acc;
        }, {});
      set({ costOfElectricVehicles });
    },
    setDefaultVehicleReplacementFundAllocation: () => {
      const { defaultReplacementAllocationSums } = useAllSitesCalcs.getState();
      const defaultVehicleReplacementFundAllocation = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] = defaultReplacementAllocationSums[year];
          return acc;
        }, {});
      set({ defaultVehicleReplacementFundAllocation });
    },
    setEstimatedEVMaintenanceCosts: () => {
      const { EVAnnualMaintenanceCost } = useAllSitesCalcs.getState();
      const { filteredPhases } = usePhases.getState();
      const min = Math.min(...filteredPhases.map((phase) => phase.year));

      const estimatedEVMaintenanceCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          if (year >= min) {
            acc[year] = EVAnnualMaintenanceCost[year];
          } else {
            acc[year] = 0;
          }

          return acc;
        }, {});
      set({ estimatedEVMaintenanceCosts });
    },
    setElectricVehicleChargingCost: () => {
      const { EVAnnualChargingCosts } = useAllSitesCalcs.getState();

      const { filteredPhases } = usePhases.getState();
      const min = Math.min(...filteredPhases.map((phase) => phase.year));
      const electricVehicleChargingCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          if (year >= min) {
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
        useAllSitesCalcs.getState();
      const { filteredPhases } = usePhases.getState();
      const min = Math.min(...filteredPhases.map((phase) => phase.year));
      const existingVehicleMaintenanceCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          if (year >= min) {
            acc[year] = existingVehicleAnnualMaintenanceCost[year];
          } else {
            acc[year] = 0;
          }

          return acc;
        }, {});
      set({ existingVehicleMaintenanceCosts });
    },
    setExistingVehicleFuelCosts: () => {
      const { existingVehicleAnnualFuelCosts } = useAllSitesCalcs.getState();
      const { filteredPhases } = usePhases.getState();
      const min = Math.min(...filteredPhases.map((phase) => phase.year));
      const fuelCost = useYears.getState().YEARS.reduce((acc, year) => {
        if (year >= min) {
          acc[year] = existingVehicleAnnualFuelCosts[year];
        } else {
          acc[year] = 0;
        }

        return acc;
      }, {});
      set({ existingVehicleAnnualFuelCost: fuelCost });
    },
    setEstimatedElectricVehicles: () => {
      const { vehicleCounts } = useAllSitesCalcs.getState();
      const { filteredPhases } = usePhases.getState();
      const min = Math.min(...filteredPhases.map((phase) => phase.year));
      const estimatedElectricVehicles = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          // if (year >= min) {
          //   acc[year] = vehicleCounts[year];
          // } else {
          //   acc[year] = -1;
          // }
          acc[year] = vehicleCounts[year];
          return acc;
        }, {});
      set({ estimatedElectricVehicles });
    },
    setNumberOfNewPorts: () => {
      const { filteredPhases } = usePhases.getState();
      const numberOfNewPorts = useYears.getState().YEARS.reduce((acc, year) => {
        acc[year] = 0;
        filteredPhases
          .filter((phase) => phase.year === year)
          .forEach((phase) => {
            acc[year] +=
              phase.port_less_than_10_kw +
              phase.port_10_20_kw +
              phase.port_25_kw +
              phase.port_180_200_kw;
          });

        return acc;
      }, {});
      set({ numberOfNewPorts });
    },
    setLoanAmount: () => {
      const { filteredPhases } = usePhases.getState();
      const loanAmount = useYears.getState().YEARS.reduce((acc, year) => {
        acc[year] = 0;
        filteredPhases
          .filter((phase) => phase.year === year)
          .forEach((phase) => {
            acc[year] += phase.loan_amount;
          });

        return acc;
      }, {});
      set({ loanAmount });
    },
    setChargerPurchaseAmount: () => {
      const { filteredPhases } = usePhases.getState();
      const chargerPurchaseCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] = 0;
          filteredPhases
            .filter((phase) => phase.year === year)
            .forEach((phase) => {
              acc[year] += phase.cost;
            });

          return acc;
        }, {});
      set({ chargerPurchaseCosts });
    },
    setChargerInstallCosts: () => {
      const { filteredPhases } = usePhases.getState();
      const chargerInstallCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] = 0;
          filteredPhases
            .filter((phase) => phase.year === year)
            .forEach((phase) => {
              acc[year] += phase.installCost;
            });

          return acc;
        }, {});
      set({ chargerInstallCosts });
    },
    sumCostsByYear: (accessor) => {
      const { filteredPhases } = usePhases.getState();
      const { controlsData } = useAuthStore.getState();
      const costs = useYears.getState().YEARS.reduce((acc, year) => {
        acc[year] = 0;
        filteredPhases
          .filter((phase) => phase.year === year)
          .forEach((phase) => {
            acc[year] += phase[accessor];
          });

        return acc;
      }, {});
      return costs;
    },

    setPrincipalRemaining: () => {
      const { advancedCalcs } = useAdvancedCalc.getState();

      const { loanAmount } = get();
      let curYear = useYears.getState().START_YEAR;
      let loanPrincipalRemaining = {};
      let loanAnnualInterest = {};
      let loanAnnualPayments = {};
      let curLoanAmount = 0;
      loanPrincipalRemaining[curYear - 1] = 0;
      loanAnnualInterest[curYear - 1] = 0;
      loanAnnualPayments[curYear - 1] = 0;
      while (curYear <= useYears.getState().END_YEAR) {
        curLoanAmount += loanAmount[curYear];
        if (loanAmount[curYear - advancedCalcs.infrastructure_loan_term]) {
          curLoanAmount -=
            loanAmount[curYear - advancedCalcs.infrastructure_loan_term];
        }
        loanPrincipalRemaining[curYear] =
          loanAmount[curYear] +
          loanPrincipalRemaining[curYear - 1] +
          loanAnnualInterest[curYear - 1] -
          loanAnnualPayments[curYear - 1];
        loanAnnualInterest[curYear] =
          loanPrincipalRemaining[curYear] *
          (advancedCalcs.infrastructure_loan_interest_rate/100);
        loanAnnualPayments[curYear] =
          curLoanAmount / advancedCalcs.infrastructure_loan_term +
          loanAnnualInterest[curYear];
        curYear++;
      }
      set({ loanPrincipalRemaining, loanAnnualInterest, loanAnnualPayments });
    },
    setChargerMaintenanceCosts: () => {
      const { advancedCalcs } = useAdvancedCalc.getState();
      let costs = 0;
      const chargerMaintenanceCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          costs +=
            (get().numberOfNewPorts[year] / 2) *
            advancedCalcs.maintenance_costs_annual_per_station;
          acc[year] = costs;
          return acc;
        }, {});
      set({ chargerMaintenanceCosts });
    },
    setChargerNetworkAndManagementCosts: () => {
      const { advancedCalcs } = useAdvancedCalc.getState();
      let costs = 0;
      const chargerNetworkAndManagementCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          costs +=
            (get().numberOfNewPorts[year] / 2) *
            (advancedCalcs.charger_network_costs +
              advancedCalcs.charge_management_subscription_costs);
          acc[year] = costs;
          return acc;
        }, {});
      set({ chargerNetworkAndManagementCosts });
    },
    setChargeMangementSavings: () => {
      const { advancedCalcs } = useAdvancedCalc.getState();
      const { vehicleCounts } = useAllSitesCalcs.getState();

      const chargeMangementSavings = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          if (advancedCalcs.charging_optimization) {
            acc[year] =
              vehicleCounts[year] * advancedCalcs.charging_optimization_savings;
          } else {
            acc[year] = 0;
          }

          return acc;
        }, {});
      set({ chargeMangementSavings });
    },
    setTotalVehicleCosts: () => {
      const {
        costOfElectricVehicles,
        estimatedEVMaintenanceCosts,
        electricVehicleChargingCosts,
      } = get();
      const totalVehicleCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] =
            costOfElectricVehicles[year] +
            estimatedEVMaintenanceCosts[year] +
            electricVehicleChargingCosts[year];

          return acc;
        }, {});
      set({ totalVehicleCosts });
    },
    setTotalVehicleSavings: () => {
      const {
        defaultVehicleReplacementFundAllocation,
        existingVehicleMaintenanceCosts,
        existingVehicleAnnualFuelCost,
      } = get();
      const totalVehicleSavings = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] =
            defaultVehicleReplacementFundAllocation[year] +
            existingVehicleMaintenanceCosts[year] +
            existingVehicleAnnualFuelCost[year];

          return acc;
        }, {});
      set({ totalVehicleSavings });
    },
    setTotalChargingInfrastructureCosts: () => {
      const {
        chargerPurchaseCosts,
        chargerInstallCosts,
        loanAmount,
        loanAnnualPayments,
        chargerMaintenanceCosts,
        chargerNetworkAndManagementCosts,
        trenchingCosts,
        upgradeCostUtility,
        upgradeCostCustomer,
        procurementManagementCost,
        estimatedPublicWorksEngineeringCosts,
        capitalPlanningFunding,
      } = get();
      const totalChargingInfrastructureCosts = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] =
            loanAnnualPayments[year] +
            chargerMaintenanceCosts[year] +
            chargerNetworkAndManagementCosts[year] +
            chargerPurchaseCosts[year] +
            chargerInstallCosts[year] +
            trenchingCosts[year] +
            upgradeCostUtility[year] +
            upgradeCostCustomer[year] +
            estimatedPublicWorksEngineeringCosts[year] +
            procurementManagementCost[year] -
            loanAmount[year] -
            capitalPlanningFunding[year];

          return acc;
        }, {});
      set({ totalChargingInfrastructureCosts });
    },
    setTotalInfrastructureCostPreLoan: () => {
      const {
        totalChargingInfrastructureCosts,loanAmount,capitalPlanningFunding
      } = get();
      const totalInfrastructureCostPreLoan = useYears
      .getState()
      .YEARS.reduce((acc, year) => {
        acc[year] =
        totalChargingInfrastructureCosts[year] +
          loanAmount[year] +
          capitalPlanningFunding[year];

        return acc;
      }, {});
    set({ totalInfrastructureCostPreLoan });
    },
    setTotalChargingInfrastructureSavings: () => {
      const { chargeMangementSavings, chargerIncentives } = get();
      const totalChargingInfrastructureSavings = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] = chargeMangementSavings[year] + chargerIncentives[year];
          return acc;
        }, {});
      set({ totalChargingInfrastructureSavings });
    },
    setTotalCosts: () => {
      const { totalVehicleCosts, totalChargingInfrastructureCosts } = get();
      const totalCosts = useYears.getState().YEARS.reduce((acc, year) => {
        acc[year] =
          totalVehicleCosts[year] + totalChargingInfrastructureCosts[year];
        return acc;
      }, {});
      set({ totalCosts });
    },
    setTotalSavings: () => {
      const { totalVehicleSavings, totalChargingInfrastructureSavings } = get();
      const totalSavings = useYears.getState().YEARS.reduce((acc, year) => {
        acc[year] =
          totalVehicleSavings[year] + totalChargingInfrastructureSavings[year];
        return acc;
      }, {});
      set({ totalSavings });
    },
    setAnnualCostBenefit: () => {
      const { totalCosts, totalSavings } = get();
      const annualCostBenefit = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] = totalSavings[year] - totalCosts[year];
          return acc;
        }, {});
      set({ annualCostBenefit });
    },
    setCumulativeCostBenefit: () => {
      const { annualCostBenefit } = get();
      const cumulativeCostBenefit = useYears
        .getState()
        .YEARS.reduce((acc, year) => {
          acc[year] = annualCostBenefit[year] + (acc[year - 1] || 0);
          return acc;
        }, {});
      set({ cumulativeCostBenefit });
    },

    setNetPresentValue: () => {
      const { annualCostBenefit } = get();
      const { advancedCalcs } = useAdvancedCalc.getState();
      const netPresentValue = useYears.getState().YEARS.reduce((acc, year) => {
        acc +=
          annualCostBenefit[year] /
          Math.pow(
            1 + (advancedCalcs.discount_rate_npv/100),
            year - useYears.getState().START_YEAR
          );
        return acc;
      }, 0);
      set({ netPresentValue });
    },
    setTotalCapitalCosts: () => {
      const {
      costOfElectricVehicles,
      chargerPurchaseCosts,
      chargerInstallCosts,
      trenchingCosts,
      upgradeCostUtility,
      upgradeCostCustomer,
      procurementManagementCost,
      estimatedPublicWorksEngineeringCosts
      } = get();
      const totalCapitalCosts = useYears
      .getState()
      .YEARS.reduce((acc, year) => {
        acc[year] =
        costOfElectricVehicles[year] +
        chargerPurchaseCosts[year] +
        chargerInstallCosts[year] +
        trenchingCosts[year] +
        upgradeCostUtility[year] +
        upgradeCostCustomer[year] +
        procurementManagementCost[year] +
        estimatedPublicWorksEngineeringCosts[year];
        return acc;
      }, {});
      set({ totalCapitalCosts });
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
      const trenchingCosts = get().sumCostsByYear("trenching_costs");
      set({ trenchingCosts });
      const upgradeCostUtility = get().sumCostsByYear("upgrade_cost_utility");
      set({ upgradeCostUtility });
      const upgradeCostCustomer = get().sumCostsByYear("upgrade_cost_customer");
      set({ upgradeCostCustomer });
      const procurementManagementCost = get().sumCostsByYear(
        "procurement_management_cost"
      );
      set({ procurementManagementCost });
      const estimatedPublicWorksEngineeringCosts = get().sumCostsByYear(
        "estimated_public_works_engineering_costs"
      );
      set({ estimatedPublicWorksEngineeringCosts });
      const chargerIncentives = get().sumCostsByYear("incentives");
      set({ chargerIncentives });
      const capitalPlanningFunding = get().sumCostsByYear(
        "capital_planning_funding"
      );
      set({ capitalPlanningFunding });

      get().setChargerMaintenanceCosts();
      get().setChargerNetworkAndManagementCosts();
      get().setChargeMangementSavings();
      get().setTotalVehicleCosts();
      get().setTotalVehicleSavings();
      get().setTotalChargingInfrastructureCosts();
      get().setTotalInfrastructureCostPreLoan();
      get().setTotalChargingInfrastructureSavings();
      get().setTotalCosts();
      get().setTotalSavings();
      get().setAnnualCostBenefit();
      get().setCumulativeCostBenefit();
      get().setNetPresentValue();
      get().setTotalCapitalCosts();
    },
  };
});

export default useYearOverYear;
