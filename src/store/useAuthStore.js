import { create } from "zustand";
// import { createClient } from '@supabase/supabase-js';

import supabase from "../supabaseClient";
import useProFormaCalcs from "./useProFormaCalcs";

const useAuthStore = create((set, get) => ({
  user: null,
  controlsData: null,
  loading: false,
  data: [],
  message: "",

  //setting controls
  setControlsData: (controls) => {
    set({ controlsData: controls });
    const { setYearSums } = useProFormaCalcs.getState();
    //not sure if this is good enough
    setYearSums(get().data, controls);
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
    } catch (error) {
      set({ message: `Login error: ${error.message}` });
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
      set({ user: null, data: [] });
    } catch (error) {
      set({ message: `Logout error: ${error.message}` });
    } finally {
      set({ loading: false });
    }
  },

  getUser: () => supabase.auth.getUser(),

  // Fetch user data
  fetchData: async (userId) => {
    try {
      const response = await fetch(`http://localhost:3002/api/fleet/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      set({ data: jsonData });

      // set({ user: userId });
      // Fetch controls data
      const controlsResponse = await fetch(
        `http://localhost:3002/api/controls/${userId}`
      );
      if (!controlsResponse.ok) {
        throw new Error("Failed to fetch controls data");
      }

      const controls = await controlsResponse.json();
      get().setControlsData(controls.data);


    } catch (error) {
      set({ message: `Error: ${error.message}` });
    }
  },

  // Initialize auth state from Supabase session
  initializeAuth: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      set({ user: session.user });
      await useAuthStore.getState().fetchData(session.user.id); // Fetch data after initializing auth
    }
  },
}));

export default useAuthStore;
