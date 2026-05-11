'use client';

import Menu from "@/components/admin/menu/menu.jsx";
import "./globals_admin.css";




export default function RootLayout({ children, header, footer }) {
  return (
    <html lang="en" >
      <body>
          <main className="adminPage">
            <aside className="adminPageAsideMenu">
              <Menu />
            </aside>
            <div>
               {children}
            </div>
           
          </main>  
          
      </body>
    </html>
  );
}
