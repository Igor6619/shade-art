import "./globals.css";
import { getMe } from "@/utils/jwt/function.js";
import AuthInitializer from  '@/components/auth/auth-initializer.jsx'

export const metadata = {
  title: "Искусство затенения",
  description: "Шьем шторы по индивидуальным заказам.  А так же домашний текстиль. Услуги стирки штор, химчистки штор, чистка мебели.",
};

export default async function RootLayout({ children, header, footer }) {
  
  const user = await getMe();
 
  return (
    <html lang="ru" >
      
      <body>
          <AuthInitializer initialUser={user}/>
          <header>
            <div className='container'>
              {header}
            </div>
           
          </header>
          <main >
            <div className='container'>
               {children}
            </div>
           
          </main>  
          <footer>
            <div className='container'>
              {footer}
            </div>
          </footer>
        
      
      </body>
    </html>
  );
}
