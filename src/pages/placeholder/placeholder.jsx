import Image from 'next/image'

import {listServices} from '@/data/services.js'
import ItemListServices from '@/components/item-list-services/item-list-services.jsx'
import styles from './placeholder.module.css'



export default function Placeholder(){

    let renderedListServices = listServices.map(
                                                (service, idx) =>
                                                <ItemListServices key={idx} service={service}/>
                                                )
    
    let goToVkUrl = process.env.GO_TO_VK_URL;

    
  

    return (        
        <section className={styles.placeholder}>
      
            <ul className={styles.listServices}>
               {renderedListServices}
            </ul>

            <div className={styles.placeholderMessage}>
                <div className={styles.placeholderMessage__title}><b>Скоро открытие!</b></div>
                <div className={styles.placeholderMessage__text}>Разработчики пишут код, чтобы этот сайт стал лучшим. Процесс идёт полным ходом!</div>
                <div className={styles.placeholderMessage__call}>
                    <div className={styles.call__title}>
                        Не пропустите запуск — подпишитесь на наши новости в соцсетях:
                    </div>
                    <div className={styles.call__socnets}>
                        <div className={styles.socnetsVk}>
                            <a 
                                href={goToVkUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.socnetsVkLink}
                            >
                               
                            </a>
                        </div>
                    </div>
                </div> 
                <div className={styles.placeholderMessage__call}>
                    <div className={styles.call__title}>
                       Если у вас есть срочные вопросы, свяжитесь с нами:
                    </div>
                    <div className={styles.call__socnets}>
                        8-922-181-51-27
                    </div>
                </div> 
           </div>
        </section>
    )
}