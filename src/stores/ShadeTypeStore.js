export const shadeCharacteristicStore = create((set, get) => ({
    listTypes: [],
    isLoading: false,
    
    getListShadeTypes: async () => {
        set({ isLoading: true })
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/${process.env.NEXT_PUBLIC_EXPRESS_API_GET_LIST_SHADE_CHARACTERISTICS_URL}`)
            const data = await response.json()
            set({ listCharacteristic: data })
        } catch (err) {
            console.error(err)
        } finally {
            set({ isLoading: false })
        }
    },

    // 1. Принимаем formData в качестве параметра
    addShadeType: async (formData) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/${process.env.NEXT_PUBLIC_EXPRESS_API_ADD_SHADE_CHARACTERISTIC_URL}`,
                {
                    method: 'POST', // Обычно для добавления используется POST
                    body: formData  // 2. Передаем объект FormData напрямую в body
                }
            )

            if (!response.ok) {
                throw new Error('Ошибка при добавлении характеристики')
            }

            // 3. После успешного добавления обновляем список в UI
            // Можно вызвать метод из этого же стора через get()
            await get().getListCharacteristics()
            
        } catch (err) {
            console.error(err)
        }
    }
}))
