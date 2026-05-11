'use client'

import { useState } from "react";
import styles from './registration.module.css'



export default function RegistrationForm(){

    let [login, setLogin] = useState();
    let [password, setPassword] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function doRegistration(e){
        e.preventDefault();
        setError('');
        setLoading(true);

        let formData = new FormData();  
        formData.append('login', login);
        formData.append('password', password);
        console.log('!!!!!!!!!!!!!!!: ', process.env.NEXT_PUBLIC_EXPRESS_API_REGISTRATION_URL )
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_API_REGISTRATION_URL}`, {
                method: 'POST',
                body: formData  
            });
        } catch (еrror) {
            console.log('Server connection error')
        } finally {
            setLoading(false);
        }
    }

    return <>
    
    <form className={styles.registrationForm}>
        <section className={styles.sectionFormFields}>
            <input className={styles.formField} type="text" name="login" onChange={(e)=>setLogin(e.target.value)} placeholder="Email" required disabled={loading}/>
            <input className={styles.formField} type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Пароль" required disabled={loading}/>
            <input className={styles.formField} type="password" name="confirmation_password" onChange={(e)=>setPassword(e.target.value)} placeholder="Пароль ещё раз" required disabled={loading}/>
        </section>
        
        <div className={styles.sectionBtns}>
            <button className={`${styles.formField} ${styles.sectionBtnsItem}`} type="submit" onClick={doRegistration} disabled={loading}>Зарегистрироваться</button>
            <button className={`${styles.formField} ${styles.sectionBtnsItem}`} type="reset" disabled={loading}>Отмена</button>
        </div>
       
    </form>
    </>
}