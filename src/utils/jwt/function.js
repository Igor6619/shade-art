import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { roles } from '@/config/config.js';


export function getSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET не определен!');
  return new TextEncoder().encode(secret);
}

export async function getMe(){
  const cookieStore = await cookies();
  // Читаем токен напрямую из HttpOnly куки
  const token = cookieStore.get('jwt')?.value;
  // Если токена нет — пользователь гость
  if (!token) {

    const payload = {
      _id: null,
      role: false,
      fullname: 'Гость'
    }
    return payload
  }
  // Проверяем токен
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      _id: payload.sub || payload._id,
      role: payload.role || roles.guest,
      fullname: payload.fullname
    };
  } catch (error) {
    // Токен невалиден или протух — возвращаем гостя
    console.log('Токен невалиден:', error.message);
    return {
      _id: null,
      role: false,
      fullname: 'Гость'
    };
  }


}