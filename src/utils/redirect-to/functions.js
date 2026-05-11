import { NextResponse } from "next/server";


// Функция перенаправления на главную страницу
export function redirectToHome(req) {
    const homeUrl = new URL('/', req.url);
    const response = NextResponse.redirect(homeUrl);
    // Опционально: удалить невалидный токен
    response.cookies.delete('token');
    return response;
}