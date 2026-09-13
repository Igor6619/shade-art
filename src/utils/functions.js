import { headers } from 'next/headers';
import { roles } from '@/config/config';

export async function getMe() {
  const headersList = await headers();
  
  const id = headersList.get('x-user-id');
    // Если ID нет, значит пользователь не авторизован
  if (!id) return null; 
  let rawName = headersList.get('x-user-name');
  return {
    id: id,
    role: headersList.get('x-user-role') || roles.USER,
    // Обязательно декодируем имя, чтобы не было ошибки ByteString
    name: rawName ? decodeURIComponent(rawName) : '', 
  };
}


