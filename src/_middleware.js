import { NextResponse } from 'next/server';
import { redirectToHome } from '@/utils/redirect-to/functions.js'
import { jwtVerify, SignJWT } from 'jose';



// Карта маршрутов → разрешённые роли
const ROUTE_ROLES = {
  '/': ['user', 'admin', 'moderator'],
  '/admin': ['admin']
};

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token')?.value
    // Публичные маршруты, которые не требуют авторизации
    const publicPaths = ['/'];
    if (publicPaths.includes(pathname)) {
        return NextResponse.next();
    }
    // Если токена нет перенаправляем на главную страницу
    if (!token) {
        return redirectToHome(req);
    }

    try {
        // Здесь можно добавить проверку JWT и ролей
        // const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // const userRole = decoded.role

         if (ROUTE_ROLES[pathname]) {
            allowedRoles = ROUTE_ROLES[pathname];
        } else {
            // Проверка вложенных маршрутов (например /admin/settings)
            for (const [route, roles] of Object.entries(ROUTE_ROLES)) {
                if (pathname.startsWith(route + '/')) {
                    allowedRoles = roles;
                    break;
                }
            
            }
        }
        // Если роль не подходит - на главную
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return redirectToHome(req);
        }



    
    }   catch (err){
                // Невалидный токен - на главную
            return redirectToHome(req);
        }
}
