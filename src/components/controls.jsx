'use client'


import { useAuthStore } from "@/stores/AuthStore";

export default function Controls() {
  // Получаем только действие — компонент не перерендерится при изменении bears
  const increasePopulation = useAuthStore((state) => state.increasePopulation);
  const removeAllBears = useAuthStore((state)=> state.removeAllBears);
  return <>
    <button onClick={removeAllBears}>удалить всех медведей</button>
    <button onClick={increasePopulation}>Добавить медведя</button>
  </>
}