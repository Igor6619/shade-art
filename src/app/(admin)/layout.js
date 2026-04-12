'use client';
import "./globals_admin.css";
import Menu from '@/components/admin/menu/menu.jsx'


export default function RootLayout({ children, header, footer }) {
  return (
    <html lang="en" >
      <body>
          <main className="admin-page">
            <aside>
              <Menu/>
            </aside>
            <div>
               {children}
            </div>
           
          </main>  
          
      </body>
    </html>
  );
}
