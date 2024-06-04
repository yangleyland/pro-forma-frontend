import { create } from "zustand";

const useChargerCosts = create((set,get) => ({
  chargerCosts: {
    "port_less_than_10_kw": 1925,
    "port_10_20_kw": 2500,
    "port_25_kw": 7495,
    "port_180_200_kw": 83500,
  },
  installationCosts: [
    {
      ports_installed: 1,
      "port_less_than_10_kw": 43224,
      "port_10_20_kw": 27475,
      "port_25_kw": 0,
      "port_180_200_kw": 0,
    },
    {
      ports_installed: 2,
      "port_less_than_10_kw": 21914,
      "port_10_20_kw": 27475,
      "port_25_kw": 35254,
      "port_180_200_kw": 35254,
    },
    {
      ports_installed: 3,
      "port_less_than_10_kw": 27017,
      "port_10_20_kw": 25975,
      "port_25_kw": 0,
      "port_180_200_kw": 0,
    },
    {
      ports_installed: 4,
      "port_less_than_10_kw": 20414,
      "port_10_20_kw": 25975,
      "port_25_kw": 33754,
      "port_180_200_kw": 33754,
    },
    {
      ports_installed: 5,
      "port_less_than_10_kw": 23776,
      "port_10_20_kw": 25475,
      "port_25_kw": 0,
      "port_180_200_kw": 0,
    },
    {
      ports_installed: 6,
      "port_less_than_10_kw": 19914,
      "port_10_20_kw": 25475,
      "port_25_kw": 33254,
      "port_180_200_kw": 33254,
    },
  ],
  chargerCost: [],
  installationCost:[],
  setChargerCost: (cost) => set({ chargerCost: cost }),
  setInstallCost: (cost) => set({ installationCost: cost }),
}));

export default useChargerCosts;
