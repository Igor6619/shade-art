'use client'

import { useState } from 'react'
import styles from './header.module.css'
import Link from 'next/link'

export default function AdminNavMenu({}){
    return <>
    <ul className={styles.adminNavMenu}>
        <li>
            <Link href="/admin" className={styles.adminNavMenuLink}>
                    Администрирование
            </Link>
        </li>
    </ul>
    
    </>
}