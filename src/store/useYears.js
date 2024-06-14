// store.js
import {create} from 'zustand';

const currentYear = new Date().getFullYear();


const useStore = create((set) => ({
  START_YEAR: currentYear,
  END_YEAR: 2050,
  YEARS: [],

  initializeYears: () => {
    set((state) => {
      const years = [];
      for (let year = state.START_YEAR; year <= state.END_YEAR; year++) {
        years.push(year);
      }
      return { YEARS: years };
    });
  },
}));

export default useStore;
