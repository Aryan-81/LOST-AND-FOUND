'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function Form() {
    const [formData, setFormData] = useState({
        itemStatus: 'lost',
        objectName: '',
        description: '',
        lastSeen: '',
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add(styles['drop-zone--over']);
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove(styles['drop-zone--over']);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove(styles['drop-zone--over']);
        if (e.dataTransfer.files.length) {
            setFormData({
                ...formData,
                photo: e.dataTransfer.files[0],
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission logic here
    };

    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };
    const handleNext = () => {
        if ('/items') {
            window.location.href = '/items';
        }
        else{
            return;
        }
    };


    

    const thumbnail = formData.photo ? URL.createObjectURL(formData.photo) : null;

    return (
        <div className={styles.container}>
            <button className={styles.back} onClick={handleBack} >Back</button>
            <button className={styles.next} onClick={handleNext} >ur Items</button>
            <h1 className={styles.title}>Lost and Found Object Form</h1>
            <form onSubmit={handleSubmit} className={styles.form}>


                <div className={styles.formGroup}>
                    <label className={styles.label}>Item status:</label>
                    <div className={styles.radioGroup}>
                        {['lost', 'found'].map((status) => (
                            <div className={styles.radioButton} key={status}>
                                <input
                                    type="radio"
                                    id={status}
                                    name="itemStatus"
                                    value={status}
                                    checked={formData.itemStatus === status}
                                    onChange={handleChange}
                                />
                                <label htmlFor={status} className={styles.radioLabel}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.grpLay1}>
                    <div className={styles.formGroup}>
                        <label htmlFor="object-name" className={styles.label}>Object name:</label>
                        <input
                            type="text"
                            id="object-name"
                            name="objectName"
                            value={formData.objectName}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="last-seen" className={styles.label}>Last seen (date/location):</label>
                        <input
                            type="text"
                            id="last-seen"
                            name="lastSeen"
                            value={formData.lastSeen}
                            onChange={handleChange}
                            className={styles.input}
                        />
                    </div>
                </div>


                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={styles.textarea}
                    />
                </div>

                <div className={`${styles.formGroup}`}>
                    <div
                        className={`${styles['drop-zone']} ${formData.photo ? styles['drop-zone--has-file'] : ''}`}
                        onClick={() => document.querySelector(`.${styles['drop-zone__input']}`).click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {!thumbnail && (
                            <span className={styles['drop-zone__prompt']}>
                                Drop file here or click to upload
                            </span>
                        )}
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                            className={styles['drop-zone__input']}
                        />
                        {thumbnail && (
                            <div
                                className={styles['drop-zone__thumb']}
                                style={{ backgroundImage: `url(${thumbnail})` }}
                                data-label={formData.photo.name}
                            />
                        )}
                    </div>
                </div>


                <button type="submit" className={styles.button}>Submit</button>
            </form>
        </div>
    );
}
