'use client'
// свойства ткани  

import { useState, useEffect } from 'react';
import Modal from "@/components/ui/modal/modal"


export default function ShadeTypes(){
    return <>
    <h1>Разновидности материала </h1>
    <button onClick={openModal}>Добавить материал</button>
    <Modal isOpen={isModalAddOpen} onClose={closeModal} level={0}>
           <div className='modalTitle'>Добавление характеристики штор</div> 
           <div className='modalContent'>
                       <section className='sectionFormFieldsInColumn'>
                           <input className='formField sectionFormFieldsInColumnItem' 
                               type="text" 
                               name="characteristic-name" 
                               onChange={(e)=>setCharacteristicName(e.target.value)} 
                               placeholder="Название характеристики" 
                               disabled={isLoading}/>
                           <textarea className='formField sectionFormFieldsInColumnItem' 
                               name="characteristic-short-description"
                               maxLength={500}
                               rows={4}
                               onChange={(e)=>setCharacteristicShortDescription(e.target.value)} 
                               placeholder="Опишите характеристику..." 
                               disabled={isLoading}/>
                       </section>  
                       <section className='sectionBtnsInRow'>
                           <button className='sectionBtnsInRowItem' 
                                   onClick={handleAddCharacteristic}
                                   disabled={isLoading}>
                                   Добавить
                            </button>
                       </section>
                       
                       
            </div>
            <div>
                {errors.length > 0 && (
                    <ul className='sectionErrors'>
                        {errors.map((err, i)=>{
                            return <li key={i}>{err}</li>
                            })
                        }
                    </ul>
                )}
            </div>
            
        </Modal>
</>
}

