// src/store/usePageStore.js

import {create} from 'zustand';

const usePageStore = create((set) => ({
  currentPage: '/',
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default usePageStore;