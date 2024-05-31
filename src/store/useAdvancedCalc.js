import { create } from "zustand";

const useAdvancedCalc = create((set, get) => ({
  advancedCalcs: [],
  fetchAdvancedCalcs: async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/advancedcontrols/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch phases");
      }
      const advancedCalcs = await response.json();
      set({advancedCalcs});

    } catch (error) {
    }
  },
}));

export default useAdvancedCalc;
