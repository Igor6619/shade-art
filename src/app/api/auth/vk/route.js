import { NextResponse } from "next/server"

export async function GET(request) {
    console.log('Get запрос к VK Oauth')
    const state = crypto.randomUUID()
    const cookieStore = await cookies()
    cookieStore.set('oauth_state', state, {
        httpOnly: true,              //  Не видна клиентскому JS
        sameSite: 'lax',             //  Разрешает редирект с внешнего домена (VK)
        path: '/',                   //  Доступна на всех путях приложения
        maxAge: 600                  //  10 минут жизни (достаточно для входа)
    })
    let vkAppID = process.env.VK_APP_ID
    let objSearchParams = {
        'response_type': 'code',
        'client_id': vkAppID,
        'state': state,
        'redirect_uri': `${process.env.BASE_URL}${process.env.VK_AUTH_CALLBACK_URL}`,
        'scope': 'vkid.personal_info vkid.email phone',
    }

    let searchParams = new URLSearchParams(objSearchParams);
    let url = new URL(`${process.env.VK_AUTH_URL}?${searchParams.toString()}`);

    return NextResponse.redirect(url.toString())
}