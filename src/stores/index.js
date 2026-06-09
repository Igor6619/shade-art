import { create } from 'zustand';
import { authStore } from '@/stores/AuthStore.js';


export const useStore = create((set, get, api) => ({
  ...authStore(set, get, api),

  // Общий флаг инициализации для всего приложения
  isInitialized: false,
  setIsInitialized: (value) => set({ isInitialized: value })
}));