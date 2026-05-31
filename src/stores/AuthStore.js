import { create } from 'zustand';


export const useAuthStore = create((set) => ({
  // Начальное состояние
  user:null,
  isLogined: false,
  isLogining: false,
  error: null,


  // Действия — обычные функции
  login: async (login, password)=>{
    //Сбрасываем ошибку
    set({ isLogining: true, error: null });
    
    try {
      // 2. Fetch-запрос к Express-бэкенду
      const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_API_LOGIN_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // ⚠️ JSON
        body: JSON.stringify({ login: login, password: password }),
        credentials: 'include', // Важно: отправляем/получаем cookies
      });
      const data = await response.json();
      // 3. Обработка ошибок бэкенда
      if (!response.ok) {
        throw new Error(data.message || 'Ошибка входа');
      }
      // Бэкенд уже установил httpOnly cookie с JWT через Set-Cookie заголовок.
      // Обновляем состояние: пользователь вошёл (shallow merge)
      set({
        user: data.user,      // { id, name, роли... }
        isLogined: true,
        isLogining: false,
        error: null,
      });

    } catch (err){
        // 5. Обработка сетевых/других ошибок
      set({
        error: err.message || 'Не удалось подключиться к серверу',
        isLogining: false,
      });
    }
  },

  // Действие: выход из системы
  logout: async () => {
    set({ isLogining: true });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      // Бэкенд удаляет cookie с токеном
      if (response.ok) {
        // Полная замена состояния при логауте (очищаем всё)
        set({ user: null, isLogined: false, isLogining: false, error: null }, true);
        return true;
      }
      throw new Error('Ошибка при выходе');
    } catch {
      set({ isLogining: false });
      return false;
    }
  },

  // Вспомогательное действие: очистить ошибку
  clearError: () => set({ error: null }),
}));

