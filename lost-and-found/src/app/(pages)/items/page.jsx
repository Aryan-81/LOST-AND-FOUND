'use client';
import { useState } from 'react';


import Nav from '@/components/Nav';
import Card1 from '@/components/cards/Card1';
import data from './Litm.json';
import styles from './page.module.css';
import PopMenu from '@/components/pop_up_menu';

 
export default function Items() {
    const [formData, setFormData] = useState({ filter: 'All items' });
    const options = ['All items', 'lost Items', 'found Items']; // Array of options

    const handleChange = (event) => {
        setFormData({ ...formData, filter: event.target.value });
    };

    const filteredData = data
        .filter(item => {
            if (formData.filter === 'All items') return true;
            if (formData.filter === 'lost Items' && item.staus.toLowerCase() === 'lost') return true;
            if (formData.filter === 'found Items' && item.staus.toLowerCase() === 'found') return true;
            return false;
        })
        .sort((a, b) => new Date(b.uploadDate.split('-').reverse().join('-')) - new Date(a.uploadDate.split('-').reverse().join('-')));

    return (
        <main className={styles.container}>
            <Nav></Nav>
            <div className={styles.popMenu}><PopMenu></PopMenu></div>
            <div className={styles.items}>
                <div className={styles.customRadioHolder}>
                    {options.map((option, index) => (
                        <div className={styles.radioButton} key={option}>
                            <input
                                className={styles.customRadioInput}
                                type="radio"
                                id={`cCB${index + 1}`}
                                name="filter"
                                value={option}
                                checked={formData.filter === option}
                                onChange={handleChange}
                            />
                            <label className={styles.customRadioWrapper} htmlFor={`cCB${index + 1}`}>
                                <div className={styles.customRadio}>
                                    <div className={styles.inner}>{option}</div>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                <div className={styles.listCtr}>
                    {filteredData.map((item, index) => (
                        <Card1
                            key={index} // Provide a unique key for each element
                            obj={item.obj}
                            usr={item.staus}
                            usrid={`by ${item.usr}`}
                            description={item.description}
                        />
                    ))}
                </div>
            </div>

        </main>
    )
}
