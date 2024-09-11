"use client";

import styles from './Button1.module.css';

export default function Button1({ text, href }) {
    const buttontxt = text ? text : 'Button1';

    const handleClick = () => {
        if (href) {
            window.location.href = href;
        }
        else{
            return;
        }
    };

    return (
        <button className={styles.button1} onClick={handleClick}>
            {buttontxt}
        </button>
    );
}
