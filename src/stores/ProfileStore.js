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
            // 2. Достаем user_id из Store  через get()
            // Добавляем опциональную цепочку ?. на случай, если пользователь еще не авторизован
            const userId = get().user?.id; 
            
            if (!userId) {
                throw new Error("Пользователь не авторизован или ID отсутствует");
            }
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_PROFILE}/${userId}`);
            if (response.ok) {
                    const data = await response.json();
                    set({ profileData: data, profileLoading: false });
                    // console.log('profileData: ', profileData)
                    return data; // Возвращаем статус успеха
            } else {
                set({ profileLoading: false, profileError: `Ошибка: ${response.status}` });
                return null; // Запрос не удался
            }

        } catch (error){
            
        }
    }
        
})
  