"use client";

import styles from './Button1.module.css';
import { useRouter } from 'next/navigation';

export default function Button1({ text, href }) {
    const router = useRouter();
    const buttontxt = text ? text : 'Button1';

    const handleClick = () => {
        if (href) {
            router.push(href);
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
