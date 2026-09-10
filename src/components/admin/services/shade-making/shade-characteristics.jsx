'use client'

import { useState, useEffect } from 'react';
import Modal from "@/components/ui/modal/modal"


export default function ShadeCharacteristics(){
    const [listCharacteristics, setListCharacteristics] = useState([])
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isModalAddCharacteristicOpen, setIsModalAddCharacteristicOpen] = useState(false);
    const [characteristicName, setCharacteristicName] = useState();
    const [characteristicShortDescription, setCharacteristicShortDescription] = useState()

    const openModal = () => setIsModalAddCharacteristicOpen(true);
    const closeModal = () => {
        setCharacteristicName('');
        setCharacteristicShortDescription('');
        setIsModalAddCharacteristicOpen(false);
        setIsLoading(false);
    };

    const API_GET_LIST_CHARACTERISTICS_URL = `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/${process.env.NEXT_PUBLIC_EXPRESS_API_GET_LIST_SHADE_CHARACTERISTICS_URL}`;    
    const API_ADD_CHARACTERISTIC_URL = `${process.env.NEXT_PUBLIC_EXPRESS_BASE_URL}/${process.env.NEXT_PUBLIC_EXPRESS_API_ADD_SHADE_CHARACTERISTIC_URL}`;    

    useEffect(()=>{
        const fetchCharacteristics = async () => {
            try {
                const response = await fetch(API_GET_LIST_CHARACTERISTICS_URL); // Или ваш конкретный URL для GET-запроса
                if (response.ok) {
                    const result = await response.json();
                    // Предполагаем, что бэкенд возвращает массив в свойстве data или напрямую
                    setListCharacteristics(result.data); 
                }
            } catch (e) {
                console.error('Не удалось загрузить изначальный список характеристик:', e);
            }
        };
    
        fetchCharacteristics();
    }, [])
    
    let renderedListCharacteristics = listCharacteristics.map((characteristic)=>{
        return <li key={characteristic._id}>{characteristic.title}</li>
    })

    const handleAddCharacteristic = async (e) =>{
        setIsLoading(true);
        setErrors([]);
        const localErrors = []
        //Ручная валидация
        if (!characteristicName?.trim()){
            localErrors.push('Название характеристики обязательно для заполнения');
        }
        if (!characteristicShortDescription?.trim()) {
            localErrors.push('Опишите характеристику перед добавлением');
        }
        
        if (localErrors.length > 0) {
            setErrors(localErrors); 
            setIsLoading(false);    
            return;                 
        }
        
        setIsLoading(true);

        const formData = {
            title: characteristicName,
            shortDescription: characteristicShortDescription
        };

        try{
            const response = await fetch(API_ADD_CHARACTERISTIC_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok){
                let result = await response.json()
                let newCharacteristic = result.data
                setListCharacteristics(listCharacteristics => [newCharacteristic, ...listCharacteristics])
                setIsModalAddCharacteristicOpen(false)
            }
            


        } catch (e){
            setErrors(e.message || 'Не удалось отправить данные');
        } finally {
            setIsLoading(false);
        }
    }
    
    
    return <>
    <h1>Характеристики штор</h1>
    <button onClick={openModal}>Добавить характеристику</button>
    <ul>
        {renderedListCharacteristics}
    </ul>
    
    <Modal isOpen={isModalAddCharacteristicOpen} onClose={closeModal} level={0}>
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
