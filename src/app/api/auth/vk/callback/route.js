import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'


export async function GET(request) {
    const { searchParams } = request.nextUrl
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    const error = searchParams.get('error')
    
    // Обработка ошибок от VK
    if (error) {
        console.error('VK OAuth Error:', error, searchParams.get('error_description'))
        
    }
    else {



            // Валидация state (защита от CSRF)
            const cookieStore = await cookies(); // Next.js 15+. Для v13/14: const cookieStore = cookies()
            const savedState = cookieStore.get('oauth_state')?.value;
            // Сразу удаляем куку после прочтения (одноразовая)
            cookieStore.set('oauth_state', '', { maxAge: 0, path: '/' });
            if (savedState && state == savedState){
                    let oauthData = {
                        client_id: process.env.VK_APP_ID,
                        client_secret: process.env.VK_APP_SECRET,
                        code: code,
                        redirect_uri: `${process.env.BASE_URL}${process.env.VK_AUTH_CALLBACK_URL}`
                    } 
                    // Обмен code → токены (новый эндпоинт VK ID)
                    const tokenRes = await fetch(process.env.VK_TOKEN_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(oauthData),
                
                    })
                    const { access_token, refresh_token, expires_in, user_id, state, scope } = await tokenRes.json()
                    // Получаем дополнительные данные пользователя (опционально, но рекомендуется)
                    // Используем access_token для запроса к VK ID API
                    const userInfoRes = await fetch(process.env.VK_USER_INFO_URL, {
                        headers: { Authorization: `Bearer ${access_token}` }
                        });
                    const userInfo = userInfoRes.ok ? await userInfoRes.json() : {}
                    // Регистрируем/обновляем пользователя в БД
                    const expressRes = await fetch(`${process.env.EXPRESS_API_URL}/api/auth/vk-register`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            vkId: String(user_id),
                            email: userInfo.email || null,
                            firstName: userInfo.first_name || null,
                            lastName: userInfo.last_name || null,
                            // photoUrl: userInfo.photo_url || null,    
                        }),
                                    
                    })

   
            };
    };
};