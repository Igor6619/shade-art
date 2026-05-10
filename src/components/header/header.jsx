import InputSection from '@/components/header/input-section.jsx'
import styles from './header.module.css'


export default function Header(){
    

    return <>
    <header className={styles.header}>
       
       <div className={styles.header__title}>ddddd</div>
       <div className={styles.header__contacts}>контакты</div>
       <div className={styles.header__input}>
            <InputSection /> 
       </div>
    </header>
    </>
}