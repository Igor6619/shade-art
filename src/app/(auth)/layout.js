'use client';

import "./globals_auth_page.css";


export default function RootLayout({ children, header, footer }) {
  return (
    <html lang="en" >
      <body>
          <main className="auth-page">
           
            <div>
               {children}
            </div>
           
          </main>  
          
      </body>
    </html>
  );
}
