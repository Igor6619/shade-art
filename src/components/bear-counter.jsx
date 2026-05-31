'use client'


import { useAuthStore } from "@/stores/AuthStore";


export default function BearCounter() {
  // Подписываемся на значение bears через селектор
  const bears = useAuthStore((state) => state.bears);
  return <h1>{bears} медведей вокруг</h1>;
}