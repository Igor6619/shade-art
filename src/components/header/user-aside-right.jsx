'use client'

import { useState } from 'react'
import UserNavMenu from '@/components/header/user-nav-menu.jsx'
import AdminNavMenu from '@/components/header/admin-nav-menu.jsx'
import styles from './header.module.css'


export default function UserAsideRight({visible, hideUserAsideRight}){
    
    

    

    return <>
   
        <aside className={`${styles.userAsideRight}  ${!visible ? styles.userAsideRightHidden : ''}`.trim()}>
           
                <div className={styles.btnInputAsideRightHide} onClick={hideUserAsideRight}></div>
                 <div className={styles.asideContent}>
                    <UserNavMenu/>
                    <div className={styles.sectionAdminNavMenu}>
                        <AdminNavMenu/>
                    </div>
                    
                </div>    
                
             
           

            
        </aside>
        
    
    </>
}