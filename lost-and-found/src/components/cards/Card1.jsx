'use client';
import { useState } from 'react';


import styles from './Card1.module.css'
import DetailsCard from '../DetailsCard'

export default function Card1({ obj, usr, usrid, description, objid }) {
    const [checked, setchecked] = useState('');
    
    const handleSelection = () => {
        setchecked('checked'); 
    };
    const handlehide = () => {
        setchecked(''); 
    };


    return (
        <div className={styles.card}>
            <input type='radio' className={styles.ratio}
                name="items"
                value='checked'
                checked={checked === 'checked'} 
                onChange={handleSelection}
            />

            <div className={styles.bar}></div>
            <div className={styles.card_form}></div>
            <div className={styles.card_data}>
                <div className={styles.data}>
                    <div className={styles.text}>
                        <label className={styles.text_m}>{obj || 'lost_obj'}</label>
                        <div className={`${styles.cube} ${styles.text_s}`}>
                            <label className={`${styles.side} ${styles.front}`}>{usr || 'usr_name'}</label>
                            <label className={`${styles.side} ${styles.top}`}>{usrid || 'usr_id'}</label>
                        </div>
                    </div>
                </div>
                <hr style={{ position: 'relative', width: '1px', height: '90%' }} />
                <label className={styles.text_d} style={{ margin: 'auto 0' }}>
                    {description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Unum nescio,quo modo possit, si luxuriosus sit, finitas cupiditates habere.'}
                </label>
            </div>

            <div className={styles.showDetail}>
                <div className={styles.details}>
                <button className={styles.hidebutton} onClick={handlehide}>hide</button>
                    <DetailsCard
                        obj={obj}
                        usrid={usrid}
                        description={description}
                        usr={usr}

                    />
                    </div>

            </div>
        </div>
    )
}
