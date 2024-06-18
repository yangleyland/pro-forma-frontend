// store.js
import {create} from 'zustand';
import useAuthStore from './useAuthStore';
import usePhases from './usePhases';

const currentYear = new Date().getFullYear();


const useStore = create((set,get) => ({
  START_YEAR: currentYear,
  END_YEAR: 2050,
  CURRENT_YEAR: currentYear,
  YEARS: [],

  initializeYears: () => {
    const {data} = useAuthStore.getState();
    const {phases} = usePhases.getState();
    const minPhaseYear = Math.min(...phases.map(phase => phase.year));
    const minReplacementYear = Math.min(...data.map(item => item["Replacement Year"]));
    const totalMin = Math.min(minPhaseYear,minReplacementYear);
    set({START_YEAR: totalMin});
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
