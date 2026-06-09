// app/api/me/route.js
import { NextResponse } from 'next/server';


export async function GET(request) {
  // Middleware уже проверил токен и добавил эти заголовки!
  const userId = request.headers.get('user-id');
  const userRole = request.headers.get('user-role');
  console.log(request)

  return NextResponse.json(
    { 
      id: userId, 
      role: userRole || 'user' 
    },
    { 
      status: 200,
      // ВАЖНО: отключаем кэширование!
      // По умолчанию Next.js может кэшировать GET-запросы
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      }
    }
  );
}