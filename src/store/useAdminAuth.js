import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAdminAuth = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
    }),
    {
      name: 'admin-auth', // name of the item in storage
    }
  )
);



export default useAdminAuth;
