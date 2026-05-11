'use client'

import { useState } from "react";
import styles from './login.module.css'


export default function LoginForm(){

    let [login, setLogin] = useState();
    let [password, setPassword] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function doLogin(e){
        e.preventDefault();
        setError('');
        setLoading(true);

        let formData = new FormData();  
        formData.append('login', login);
        formData.append('password', password);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
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
    
    <form className={styles.loginForm}>
        <section className={styles.sectionFormFields}>
            <input className={`${styles.formField} ${styles.sectionFormFieldsItem}`} type="text" name="login" onChange={(e)=>setLogin(e.target.value)} placeholder="Email/Tel" required disabled={loading}/>
            <input className={`${styles.formField} ${styles.sectionFormFieldsItem}`} type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required disabled={loading}/>
        </section>  
        <section className={styles.sectionBtns}>
            <button className={`${styles.formField} ${styles.sectionBtnsItem}`} type="submit" onClick={doLogin} disabled={loading}>Войти</button>
        </section>
        
        <div className={styles.socnetsAuth}>
            <div className="socnetsAuthTitle">Войди через:</div>
            <div className={styles.socnetsAuthLinks}>
                <a href="/api/auth/vk" className={`${styles.socnetsAuthLink} ${styles.socnetsAuthLinkVk}`}></a>
            </div>
        </div>
    </form>
    </>
}