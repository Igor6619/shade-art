// proxy.js (в корне проекта, рядом с app/ или pages/)
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { getSecretKey } from '@/utils/jwt/_function.js';
import { roles } from '@/config/config.js';


// // Вспомогательная функция валидации токена
// async function verifyToken(token) {
//   try {
//     const { payload } = await jwtVerify(token, JWT_SECRET);
//     return { valid: true, payload: payload };
//   } catch {
//     return { valid: false, payload: null };
//   }
// }

export const config = {
  matcher: [
     /*
     * Перехватывает все страницы сайта, КРОМЕ:
     * - api (внутренние роуты Next.js)
     * - _next/static (статические файлы стилей и скриптов)
     * - _next/image (оптимизированные картинки)
     * - favicon.ico, sitemap.xml, robots.txt (служебные файлы в корне)
     * - Все файлы с расширениями (например, .png, .jpg, .svg)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};




export async function proxy(request) {
  const { pathname } = request.nextUrl; 
  const currentPath = pathname + request.nextUrl.search;
  const cookieName = process.env.SESSION_NAME_COOKIE || 'session';
  const session_id = request.cookies.get(cookieName)?.value;
  // Проверяем, нужна ли строгая авторизация на этой странице
  const isProtected = (
    pathname.startsWith('/что-то там') ||
    pathname.startsWith('/admin')
  ) 
  // Вспомогательная функция для редиректа на страницу входа
  const redirectToLogin = () => {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', currentPath); // Чтобы вернуться после входа
    return NextResponse.redirect(loginUrl);
  };

  // Вспомогательная функция для сборки ответа с кастомными заголовками пользователя
  const proceedWithUser = (userId, role, name) => {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', userId);
    requestHeaders.set('x-user-role', role);
    requestHeaders.set('x-user-name', encodeURIComponent(name));// имя на русском ниже по коду
    return NextResponse.next({ request: { headers: requestHeaders } });
  };
  
  // 1. Если куки нет вообще
  if (!session_id) {
    if (isProtected) return redirectToLogin();
    return proceedWithUser('null', 'guest', 'Гость');
  }
  
  // 2. Если кука есть — проверяем её на бэкенде FastAPI
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';
    
    const response = await fetch(`${backendUrl}/auth/api/me`, {
      method: 'GET',
      headers: {
        'Cookie': `${cookieName}=${session_id}`,
      },
      cache: 'no-store', 
    });

    // Если сессия просрочена/удалена (FastAPI вернул ошибку 401/403)
    if (!response.ok) {
      if (isProtected) return redirectToLogin();
      return proceedWithUser('null', 'guest', 'Гость');
    }

    const user = await response.json();

    // Проверяем права доступа для админки
    if (currentPath.startsWith('/admin') && user.role !== roles.ADMIN) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Успешный проброс данных авторизованного пользователя
    return proceedWithUser(
      String(user.user_id), 
      user.role, 
      user.first_name || 'Пользователь'
    );

  } catch (error) {
    console.error('Ошибка бэкенда при проверке сессии:', error);
    if (isProtected) return redirectToLogin();
    return proceedWithUser('null', 'guest', 'Гость');
  }
}
  

