export const profileStore = (set, get, api) => ({
    // Начальное состояние
    profileData: null,
    profileLoading: false,
    profileError: null,

    getProfile: async () => {
        // Сбрасываем все данные профиля
        set({ 
                profileData: null, 
                profileLoading: true, 
                profileError: null 
        });
        try {
            // 2. Достаем user_id из соседнего authStore слайса через get()
            // Добавляем опциональную цепочку ?. на случай, если пользователь еще не авторизован
            const userId = get().user?.id; 
            
            if (!userId) {
                throw new Error("Пользователь не авторизован или ID отсутствует");
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_PROFILE}?user_id=${userId}`);
            if (response.ok) {
                    // Парсим ОДИН раз прямо здесь, никакой .clone() не нужен
                    const data = await response.json(); 
                    set({ profileData: data, profileLoading: false });
                    return true; // Возвращаем статус успеха
            } else {
                set({ profileLoading: false, profileError: `Ошибка: ${response.status}` });
                return false; // Запрос не удался
            }

        } catch (error){
            
        }
    }
        
})
  