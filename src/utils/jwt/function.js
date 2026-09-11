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
  const cookieName = process.env.AUTH_COOKIE_NAME || 'access_token';
  // Читаем токен напрямую из HttpOnly куки
  const token = cookieStore.get(cookieName)?.value;
  // Если токена нет — пользователь гость
  if (!token) {

    const payload = {
      user_id: null,
      role: false,
      first_name: 'Гость'
    }
    return payload
  }
  // Проверяем токен
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      user_id: payload.user_id || payload._id,
      role: payload.role || roles.guest,
      first_name: payload.first_name
    };
  } catch (error) {
    // Токен невалиден или протух — возвращаем гостя
    console.log('Токен невалиден:', error.message);
    return {
      user_id: null,
      role: false,
      first_name: 'Гость'
    };
  }


}