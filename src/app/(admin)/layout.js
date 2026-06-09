import Menu from "@/components/admin/menu/menu.jsx";
import "./globals_admin.css";



export const metadata = {
  title: "Панель администрирования",
};




export default function RootLayout({ children, header, footer }) {
  

  return (
    <html lang="en" >
      <body>
          <main className="adminPage">
            <aside className="adminAsideMenu">
              <Menu />
            </aside>
            <div className="adminContentPage">
               {children}
            </div>
           
          </main>  
          
      </body>
    </html>
  );
}
