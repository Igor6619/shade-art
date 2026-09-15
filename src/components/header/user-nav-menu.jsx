'use client'

import { useState } from 'react'
import styles from './header.module.css'
import { useStore } from '@/stores/index.js'

export default function UserNavMenu({}){
        
    const user = useStore((state)=>state.user)
    const logout = useStore((state)=>state.logout)
    const getProfile = useStore((state)=>state.getProfile)
    const profileData = useStore((state)=>state.profileData) 


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

    const handleGetProfile = async ()=>{
        try {
            console.log('Получаем профиль пользователя')
            let profile = await getProfile();

            if (!profile){
                window.location.href = '/';
            } else {
                // здесь внутри метода именно (let profile = await getProfile(); 
                // для актуальных значений... )
                console.log('profileData: ', profile)
            }

        } catch (error) {
            console.error('Ошибка в getProfile стора:', error);
            
        } 
    } 

    return <>
    <div>Меню пользователя</div>
    <ul className={styles.asideUserMenu}>
        <li className={styles.asideUserMenuItem}>
            <div className={styles.asideUserMenuLink} onClick={handleGetProfile}>
                Профиль        
            </div>  
        </li>
        <li className={styles.asideUserMenuItem}>
            <div className={styles.asideUserMenuLink} onClick={handleLogout}>
                Выйти        
            </div>  
        </li>
    </ul>
    
    </>
}