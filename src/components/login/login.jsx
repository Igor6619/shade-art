'use client'

import { useState } from "react";
import styles from './login.module.css'
import { useStore } from "@/stores/index.js";
import { useRouter } from "next/navigation"; // 1. Импортируем useRouter


export default function LoginForm(){

    let [login, setLogin] = useState();
    let [password, setPassword] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let authLoginAction = useStore((state) => state.login);
    const router = useRouter();

    async function doLogin(e){
        console.log('входим!!!')
        e.preventDefault();
        setError('');
        setLoading(true);
       try{
        await authLoginAction(login, password);
        // Очищаем поля формы
        setLogin('');
        setPassword('');
        // Перенаправляем на главную страницу
        // Используем replace вместо push, чтобы пользователь не мог 
        // нажать кнопку "Назад" в браузере и вернуться на страницу логина
        router.replace('/'); 
       } catch(err){
            // Обрабатываем ошибку, если логин/пароль неверные или сеть недоступна
            console.error("Ошибка входа:", err);
            setError('Неверный логин или пароль'); 
            // Пароль можно очистить и при ошибке для безопасности
            setPassword('');
       } finally {
            // 6. Снимаем флаг загрузки в любом случае (успех или ошибка)
            setLoading(false);
        }
        
        


        
    }

    return <>
    
        <form className={styles.loginForm}>
            <section className={styles.sectionFormFields}>
                <input className={`${styles.formField} ${styles.sectionFormFieldsItem}`} 
                    type="text" name="login" 
                    onChange={(e)=>setLogin(e.target.value)} placeholder="Login" 
                    required 
                    disabled={loading}/>
                <input className={`${styles.formField} ${styles.sectionFormFieldsItem}`} 
                    type="password" 
                    name="password" 
                    onChange={(e)=>setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                    disabled={loading}/>
            </section>  
            <section className={styles.sectionBtns}>
                <button className={`${styles.formField} ${styles.sectionBtnsItem}`} 
                        type="submit" 
                        onClick={doLogin} 
                        disabled={loading}>Войти</button>
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