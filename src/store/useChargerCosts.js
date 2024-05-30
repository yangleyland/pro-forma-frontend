import { create } from "zustand";

const useChargerCosts = create((set,get) => ({
  chargerCosts: {
    "Level 2 (<10 kW)": 1925,
    "Level 2 (10-20 kW)": 2500,
    "DC Fast (25 kW)": 7495,
    "Very High Power (180 - 200 kW)": 83500,
  },
  installationCosts: [
    {
      ports_installed: 1,
      "cost_per_port_<10_kW": 43224,
      "cost_per_port_10-20_kW_L2": 27475,
      cost_per_port_25_kW_DCFC: null,
      "cost_per_port_180-200_kW_DCFC": null,
    },
    {
      ports_installed: 2,
      "cost_per_port_<10_kW": 21914,
      "cost_per_port_10-20_kW_L2": 27475,
      cost_per_port_25_kW_DCFC: 35254,
      "cost_per_port_180-200_kW_DCFC": 35254,
    },
    {
      ports_installed: 3,
      "cost_per_port_<10_kW": 27017,
      "cost_per_port_10-20_kW_L2": 25975,
      cost_per_port_25_kW_DCFC: null,
      "cost_per_port_180-200_kW_DCFC": null,
    },
    {
      ports_installed: 4,
      "cost_per_port_<10_kW": 20414,
      "cost_per_port_10-20_kW_L2": 25975,
      cost_per_port_25_kW_DCFC: 33754,
      "cost_per_port_180-200_kW_DCFC": 33754,
    },
    {
      ports_installed: 5,
      "cost_per_port_<10_kW": 23776,
      "cost_per_port_10-20_kW_L2": 25475,
      cost_per_port_25_kW_DCFC: null,
      "cost_per_port_180-200_kW_DCFC": null,
    },
    {
      ports_installed: 6,
      "cost_per_port_<10_kW": 19914,
      "cost_per_port_10-20_kW_L2": 25475,
      cost_per_port_25_kW_DCFC: 33254,
      "cost_per_port_180-200_kW_DCFC": 33254,
    },
  ],
  chargerCost: [],
  installationCost:[],
  setChargerCost: (cost) => set({ chargerCost: cost }),
  setInstallCost: (cost) => set({ installationCost: cost }),
}));

export default useChargerCosts;
