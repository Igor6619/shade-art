'use client'

import { useState } from 'react'
import UserNavMenu from '@/components/header/user-nav-menu.jsx'
import AdminNavMenu from '@/components/header/admin-nav-menu.jsx'
import styles from './header.module.css'
import { roles } from '@/config/config.js'


export default function UserAsideRight({visible, hideUserAsideRight, user}){
    
    // Проверяем, является ли пользователь администратором
    const isAdmin = user?.role === roles.ADMIN;
    console.log('user.role: ', user?.role)
    

    return <>
   
        <aside className={`${styles.userAsideRight}  ${!visible ? styles.userAsideRightHidden : ''}`.trim()}>
            <div className={styles.btnInputAsideRightHide} onClick={hideUserAsideRight}></div>
            <div className={styles.asideContent}>
                <UserNavMenu/>
                {isAdmin && (
                    <div className={styles.sectionAdminNavMenu}>
                        <AdminNavMenu/>
                    </div>
                )}
                
                
            </div>    
                
             
           

            
        </aside>
        
    
    </>
}