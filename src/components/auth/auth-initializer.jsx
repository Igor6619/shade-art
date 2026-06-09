'use client'


import { useEffect } from 'react';
import { useStore } from '@/stores/index.js';

export default function AuthInitializer({ initialUser }) {
  const setUser = useStore((state) => state.setUser);
  const setIsLogined = useStore((state) => state.setIsLogined);
  const setIsInitialized = useStore((state) => state.setIsInitialized);
  const isInitialized = useStore((state) => state.isInitialized);

  useEffect(() => {
    // Инициализируем store данными с сервера
    
    if (!isInitialized) {
      if (initialUser) {
        setUser(initialUser);
        setIsLogined(true);
      }
      setIsInitialized(true);
    }
  }, [initialUser, setUser, setIsLogined, setIsInitialized, isInitialized]);

  return null; // Ничего не рендерим
}