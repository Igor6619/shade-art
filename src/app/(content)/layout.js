import "./globals.css";

export const metadata = {
  title: "Искусство затенения",
  description: "Шьем шторы по индивидуальным заказам.  А так же домашний текстиль. Услуги стирки штор, химчистки штор, чистка мебели.",
};

export default function RootLayout({ children, header, footer }) {
  return (
    <html lang="en" >
      <body>
          <header>
            <div className='container'>
              
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
