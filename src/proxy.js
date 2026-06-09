// proxy.js (в корне проекта, рядом с app/ или pages/)
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getSecretKey } from '@/utils/jwt/function.js';


const JWT_SECRET = getSecretKey();

// Вспомогательная функция валидации токена
async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { valid: true, payload: payload };
  } catch {
    return { valid: false, payload: null };
  }
}

export async function proxy(request) {
  const { pathname } = request.nextUrl;  
  //ВСЕГДА пытаемся прочитать и проверить токен
  const token = request.cookies.get('jwt')?.value;
  const { valid, payload } = await verifyToken(token);
  const requestHeaders = new Headers(request.headers);
  if (valid && payload){
     requestHeaders.set('user-id', payload.sub || payload._id);
     requestHeaders.set('user-role', payload.role || 'user');   
  }
  
  
  
  if (pathname.startsWith('/admin')) {

    if (!valid || !payload) {
      // Нет токена или невалиден — редирект на главную
      return NextResponse.redirect(new URL('/', request.url));
    }

    const userRole = payload.role;
    if (userRole !== 100) {
      // Токен валиден, но роль не admin — доступ запрещен
      return NextResponse.redirect(new URL('/', request.url));
      // Или на страницу 403:
      // return NextResponse.redirect(new URL('/forbidden', request.url));
    }
    // Пробрасываем обогащенные headers дальше
    return NextResponse.next({
      request: { headers: requestHeaders }
    });
    
  }
  
  // Пробрасываем обогащенные headers дальше
  return NextResponse.next({
    request: { headers: requestHeaders }
  });
 
}
