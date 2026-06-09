'use client';

import { useState } from 'react';
import styles from './menu.module.css'
import Link from 'next/link';

export default function Menu(){
    
    return <>
        <h1>Menu</h1>
        <ul>
            <li className={`${styles.hasChildren}`} >
                Сервисы 
                <ul>
                    <li>
                        Пошив штор
                        <ul>
                            <li>
                                <Link href="/admin/services/shade_making/shade_types/">
                                    Разновидности штор
                                </Link>
                            </li>
                            <li>Портфолио</li>
                        </ul>
                    </li>
                    <li>
                        Подбор ткани
                        <ul>
                            <li>Разновидности ткани</li>
                        </ul>
                    </li>
                </ul>
            </li>
            
        </ul>

    </>
    
}

