'use client'

import UserAsideRight from '@/components/header/user-aside-right.jsx'
import styles from './header.module.css'
import { useState } from 'react'

export default function UserSection({user}){
    let [visibleUserAsideRight, setVisibleUserAsideRight] = useState(false)


    return <>
    <div className={styles.userSection}>


    </div>
       <div className={styles.inputBtn} onClick={() => setVisibleUserAsideRight(true)}>Здравствуйте, {user.fullname}!</div>
       <UserAsideRight visible={visibleUserAsideRight} hideUserAsideRight={() => setVisibleUserAsideRight(false)}/> 
    </>
}