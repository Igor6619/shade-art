

export const metadata = {
  title: "Искусство затенения",
  description: "Шьем шторы по индивидуальным заказам.  А так же домашний текстиль. Услуги стирки штор, химчистки штор, чистка мебели.",
};

export default function RootLayout({children}) {
  return (
    <html lang="en" >
      <body>
          
          <main >
            <div className='container'>
               {children}
            </div>
          </main>  
         
        
      
      </body>
    </html>
  );
}
