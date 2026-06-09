import InputSection from '@/components/header/input-section.jsx'
import UserSection from '@/components/header/user-section.jsx';
import styles from './header.module.css'
import { getMe } from '@/utils/jwt/function.js';




export default async function Header(){
    
    const user = await getMe();
    const isLoggedIn = user.role !== false;
    
    
    
    console.log('user:', user)

    // Двойное отрицание нужно для того что-бы 
    // даже непустая строка была boalen а если этого не сделать 
    // react выведет эту строку
    // const isLoggedIn = !!user.id;


    return <>
    <header className={styles.header}>
       
       <div className={styles.header__title}>ddddd</div>
       <div className={styles.header__contacts}>контакты</div>
       <div className={styles.header__input}>
            { isLoggedIn ? <UserSection user={user} /> : <InputSection/>}
       </div>
    </header>
    </>
}