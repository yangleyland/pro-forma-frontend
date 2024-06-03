import { create } from "zustand";
import useChargerCosts from "./useChargerCosts";

const usePhases = create((set, get) => ({
  phases: [],
  addPhase: (phase) => set((state) => ({ phases: [...state.phases, phase] })),
  removePhase: (phaseId) =>
    set((state) => ({
      phases: state.phases.filter((phase) => phase.id !== phaseId),
    })),
  setPhases: (phases) => set({ phases }),
  fetchPhases: async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/phases/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch phases");
      }
      const phases = await response.json();

      get().calculateCosts(phases);
    } catch (error) {
      console.error(error);
    }
  },
  calculateCosts: (phases) => {
    const { chargerCosts, installationCosts,setChargerCost,setInstallCost } = useChargerCosts.getState();
    const phaseCosts = phases.map((phase, index) => {
      const cost = phase.ports * chargerCosts["Level 2 (10-20 kW)"];
      let installCost = 0;
      const installationCount = phase.ports;
      const matchingCost = installationCosts.find(
        (cost) => cost.ports_installed === installationCount
      );
      if (matchingCost) {
        installCost = matchingCost["cost_per_port_10-20_kW_L2"];
      } else {
        installCost =
          installationCosts[installationCosts.length - 1][
            "cost_per_port_10-20_kW_L2"
          ];
      }
      installCost *= phase.ports;
      return {
        ...phase,
        cost,
        installCost,
      };
    });
    set({ phases: phaseCosts });
  },
}));

export default usePhases;
