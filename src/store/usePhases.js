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
  calcInstallCost: (type, phase) => {
    const { installationCosts } = useChargerCosts.getState();
    const matchingCost = installationCosts.find(
      (cost) => cost.ports_installed === phase[type]
    );
    if (matchingCost) {
      return matchingCost[type] * phase[type];
    } else {
      return installationCosts[installationCosts.length - 1][type] * phase[type];
    }
  },

  calculateCosts: (phases) => {
    const { chargerCosts, installationCosts, setChargerCost, setInstallCost } =
      useChargerCosts.getState();
    const phaseCosts = phases.map((phase, index) => {
      const cost =
        phase.port_less_than_10_kw * chargerCosts["port_less_than_10_kw"] +
        phase.port_10_20_kw * chargerCosts["port_10_20_kw"] +
        phase.port_25_kw * chargerCosts["port_25_kw"] +
        phase.port_180_200_kw * chargerCosts["port_180_200_kw"];
      let installCost = 0;
      installCost =
        get().calcInstallCost("port_less_than_10_kw", phase) +
        get().calcInstallCost("port_10_20_kw", phase) +
        get().calcInstallCost("port_25_kw", phase) +
        get().calcInstallCost("port_180_200_kw", phase);
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
