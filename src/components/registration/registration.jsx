'use client'

import { useState } from "react";
import styles from './registration.module.css';
import { useRouter } from "next/navigation"; // 1. Импортируем useRouter



export default function RegistrationForm(){

    let [login, setLogin] = useState();
    let [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function doReset(){
        setError('');
    }

    async function doRegistration(e){
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return; // Прерываем выполнение функции, запрос на сервер не уйдет
        }
        setLoading(true);

        let formData = new FormData();  
        formData.append('login', login);
        formData.append('password', password);
        formData.append('confirmation_password', confirmPassword)
        console.log('!!!!!!!!!!!!!!!: ', process.env.NEXT_PUBLIC_EXPRESS_API_REGISTRATION_URL )
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_EXPRESS_API_REGISTRATION_URL}`, {
                method: 'POST',
                body: formData  
            });
            const data = await response.json();
            // Проверяем статус ответа
            if (!response.ok) {
                // Если бэкенд вернул ошибку (400, 500 и т.д.)
                throw new Error(data.message || 'Ошибка регистрации');
            }
            
            // Если всё успешно
            console.log('Регистрация успешна:', data);
            // Полная перезагрузка страницы
            window.location.href = '/';
        } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message || 'Ошибка соединения с сервером');
        } finally {
            setLoading(false);
        }
    }

    return <>
    
    <form className={styles.registrationForm}>
        <section className={styles.sectionFormFields}>
            <input className={styles.formField} type="text" name="login" onChange={(e)=>setLogin(e.target.value)} placeholder="Логин" required disabled={loading}/>
            <input className={styles.formField} type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Пароль" required disabled={loading}/>
            <input className={styles.formField} type="password" name="confirmation_password" onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Пароль ещё раз" required disabled={loading}/>
        </section>
        
        <div className={styles.sectionBtns}>
            <button className={`${styles.formField} ${styles.sectionBtnsItem}`} type="submit" onClick={doRegistration} disabled={loading}>Зарегистрироваться</button>
            <button className={`${styles.formField} ${styles.sectionBtnsItem}`} type="reset" onClick={doReset} disabled={loading}>Отмена</button>
        </div>
        <section>
            {error}
        </section>
       
    </form>
    </>
}