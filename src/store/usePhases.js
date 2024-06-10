import { create } from "zustand";
import useChargerCosts from "./useChargerCosts";
import useAuthStore from "./useAuthStore";

const usePhases = create((set, get) => ({
  phases: [],
  filteredPhases: [],
  addPhase: async (phase) => {
    try {
      console.log("phase", phase);
      const response = await fetch("http://localhost:3002/api/phases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(phase),
      });
      if (!response.ok) {
        throw new Error("Failed to add phase");
      }
      const newPhase = await response.json();
      set((state) => ({ phases: [...state.phases, newPhase] }));
    } catch (error) {
      console.error(error);
    }
  },
  removePhase: (phaseId) =>
    set((state) => ({
      phases: state.phases.filter((phase) => phase.id !== phaseId),
    })),
  fetchPhases: async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/phases/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch phases");
      }
      const phases = await response.json();
      await get().calculateCosts(phases);
    } catch (error) {
      console.error(error);
    }
  },
  calcInstallCost: (type, phase) => {
    const { installationCosts } = useChargerCosts.getState();
    const matchingCost = installationCosts.find(
      (cost) => cost.ports_installed === phase[type]
    );
    if (matchingCost) {
      return matchingCost[type] * phase[type];
    } else {
      return (
        installationCosts[installationCosts.length - 1][type] * phase[type]
      );
    }
  },

  divideByTwo: (num) => Math.ceil(num / 2),

  calculateCosts: async (phases) => {
    const { controlsData } = useAuthStore.getState();
    const { fetchChargerCost } = useChargerCosts.getState();
    const { divideByTwo } = get();
    await fetchChargerCost();
    const { chargerCosts } = useChargerCosts.getState();
    console.log("chargerCosts", chargerCosts);
    if (!chargerCosts) return;

    const phaseCosts = phases.map((phase, index) => {
      const cost =
        //round these calculations
        divideByTwo(phase.port_less_than_10_kw) *
          chargerCosts["cost_less_than_10_kw"] +
        divideByTwo(phase.port_10_20_kw) * chargerCosts["cost_10_20_kw"] +
        divideByTwo(phase.port_25_kw) * chargerCosts["cost_25_kw"] +
        divideByTwo(phase.port_180_200_kw) * chargerCosts["cost_180_200_kw"];
      let installCost = 0;
      installCost =
        divideByTwo(phase.port_less_than_10_kw) *
          chargerCosts["install_less_than_10_kw"] +
        divideByTwo(phase.port_10_20_kw) * chargerCosts["install_10_20_kw"] +
        divideByTwo(phase.port_25_kw) * chargerCosts["install_25_kw"] +
        divideByTwo(phase.port_180_200_kw) * chargerCosts["install_180_200_kw"];
      return {
        ...phase,
        cost,
        installCost,
      };
    });
    const sortedPhases = phaseCosts.sort((a, b) => a.id - b.id);

    if (controlsData) {
      const filteredPhases = sortedPhases.filter(
        (phase) =>
          phase.site === controlsData.site || controlsData.site === "All Sites"
      );
      // console.log("filteredPhases", filteredPhases);
      set({ filteredPhases });
    }
    set({ phases: sortedPhases });
  },
}));

export default usePhases;
