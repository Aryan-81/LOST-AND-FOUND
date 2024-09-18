import styles from './PopMenu.module.css'
import Link from 'next/link'

export default function PopMenu() {
    return (
        <div className={styles.wrapper}>
            <input type='checkbox' />
            <div className={styles.fab}></div>
            <div className={styles.fac}>
                <Link href='/form' className={styles.far}>ur</Link>
                <Link href='/form' className={styles.fas}>add</Link>
            </div>
        </div>
    )
}