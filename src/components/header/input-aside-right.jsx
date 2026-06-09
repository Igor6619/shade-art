'use client'

import { useState } from 'react'
import LoginForm from '@/components/login/login.jsx'
import RegistrationForm from '@/components/registration/registration.jsx'
import styles from './header.module.css'


export default function InputAsideRight({visible, hideInputAsideRight}){
    
    let [login, setLogin] = useState(true)

    function internalHideInputAsideRight(){
        setLogin(true);
        hideInputAsideRight();
    }

    return <>
   
        <aside className={`${styles.inputAsideRight}  ${!visible ? styles.inputAsideRight_hidden : ''}`.trim()}>
            
                
            <div className={styles.btnInputAsideRightHide} onClick={internalHideInputAsideRight}></div> 
            <div className={styles.asideContent}>   
                <div className={styles.sectionBtns}>
                    <div className={`${styles.sectionBtnsItem} ${login?styles.sectionBtnsItemActive:''}`.trim()} onClick={()=>setLogin(true)}>Вход</div>
                    <div className={`${styles.sectionBtnsItem} ${!login?styles.sectionBtnsItemActive:''}`.trim()} onClick={()=>setLogin(false)}>Регистрация</div>
                </div>
                <div className={styles.sectionForms}>
                    {login?<LoginForm />:<RegistrationForm />}
                </div>
            </div> 
            
            

            
        </aside>
        
    
    </>
}