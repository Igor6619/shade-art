'use client'

import InputAsideRight from '@/components/header/input-aside-right.jsx'
import styles from './header.module.css'
import { useState } from 'react'

export default function InputSection(){
    let [visibleInputAsideRight, setVisibleInputAsideRight] = useState(false)

   

    return <>
    <div className={styles.inputSection}>
        <div className={styles.inputBtn} onClick={() => setVisibleInputAsideRight(true)}>Вход</div>
        <InputAsideRight visible={visibleInputAsideRight} hideInputAsideRight={() => setVisibleInputAsideRight(false)}/>

    </div>
   


    </>
}