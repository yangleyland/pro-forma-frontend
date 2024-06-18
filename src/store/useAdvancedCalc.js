import { create } from "zustand";

const useAdvancedCalc = create((set, get) => ({
  advancedCalcs: [],
  fetchAdvancedCalcs: async (userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/advancedcontrols/${userId}`
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
