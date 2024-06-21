import { create } from "zustand";
import useAuthStore from "./useAuthStore";

const useCityInfo = create((set,get) => ({
    cityInfo: {},
    fetchCityInfo: async () => {
        try {
            const { user } = useAuthStore.getState();
            if (!user) return;
            const response = await fetch(
                `${process.env.REACT_APP_API_ROUTE}api/city-info/${user.id}`
            );
            const data = await response.json();
            set({ cityInfo: data[0] });
        } catch (error) {
            console.error("Error fetching city info:", error);
        }
    }
}));

export default useCityInfo;