import { create } from "zustand";
// import { createClient } from '@supabase/supabase-js';

import supabase from "../supabaseClient";
import useProFormaCalcs from "./useProFormaCalcs";
import useYearOverYear from "./useYearOverYear";
import useAdvancedCalc from "./useAdvancedCalc";
import useAllSitesCalcs from "./useAllSitesCalcs";
import useAllSitesYearOverYear from "./useAllSitesYearOverYear";
import usePhases from "./usePhases";

const useAuthStore = create((set, get) => ({
  user: null,
  controlsData: null,
  loading: true,
  data: [],
  message: "",

  //setting controls
  setData: (newData) => set({ data: newData }),
  updateData: (newData) => {
    const currentData = get().data;
    const updatedData = currentData.map(item => {
      if (item.equipment_id === newData.equipment_id) {
        return newData;
      }
      return item;
    });
    set({ data: updatedData });
  },
  setControlsData: (controls) => {

    const uniqueDomiciles = [...new Set(get().data.map(item => item["Simplified Domicile"]))];
    controls.domiciles=uniqueDomiciles;
    set({ controlsData: controls});

    set({ controlsData: controls });
    const { setYearSums } = useProFormaCalcs.getState();
    setYearSums();
    const { setYearSums: setYearSumsAllSites } = useAllSitesCalcs.getState();
    setYearSumsAllSites();



  },

  // Log in function
  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({ user: data.user });
      await useAuthStore.getState().fetchData(data.user.id); // Fetch data after login
      return true;
    } catch (error) {
      set({ message: `Login error: ${error.message}` });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  // Log out function
  logout: async () => {
    set({ loading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log("Logged out successfully");
      set({ user: null, data: [] });
    } catch (error) {
      set({ message: `Logout error: ${error.message}` });
    } finally {
      set({ loading: false });
    }
  },


  isLoggedIn: () => {
    const user = useAuthStore.getState().user;
    return user !== null;
  },

  // Fetch user data
  fetchData: async (userId) => {
    set({ loading: true });
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ROUTE}api/fleet/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const sortedJson = jsonData.sort((a, b) => a.equipment_id - b.equipment_id);
      set({ data: sortedJson });

      // set({ user: userId });
      // Fetch controls data
      const controlsResponse = await fetch(
        `${process.env.REACT_APP_API_ROUTE}api/controls/${userId}`
      );
      if (!controlsResponse.ok) {
        throw new Error("Failed to fetch controls data");
      }

      

      const {fetchAdvancedCalcs} = useAdvancedCalc.getState();
      await fetchAdvancedCalcs(userId);
      const controls = await controlsResponse.json();
      get().setControlsData(controls.data);

      const {fetchPhases}=usePhases.getState();
      await fetchPhases(userId);


      

    } catch (error) {
      set({ message: `Error: ${error.message}` });
    } finally{
      set({ loading: false });
    }
    
  },

  // Initialize auth state from Supabase session
  initializeAuth: async () => {
    set({ loading: true });
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      set({ user: session.user });
      await useAuthStore.getState().fetchData(session.user.id); // Fetch data after initializing auth
      
    }
    set({ loading: false });
  },
}));

export default useAuthStore;
