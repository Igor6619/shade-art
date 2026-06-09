'use client'

import { useState } from 'react'
import styles from './header.module.css'
import { useStore } from '@/stores/index.js'

export default function UserNavMenu({}){
        
    const logout = useStore((state)=>state.logout)

    const handleLogout = async ()=>{
        
        try {
            let status = await logout();
            if (status){
                // Опционально: редирект после успешного выхода
                window.location.href = '/';
            }
            
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        } 

    } 


    return <>
    <div>Меню пользователя</div>
    <ul className={styles.asideUserMenu}>
        <li className={styles.asideUserMenuItem}>
            <div className={styles.asideUserMenuLink} onClick={handleLogout}>
                Выйти        
            </div>  
        </li>
    </ul>
    
    </>
}