import styles from './Button1.module.css'

export default function Button1({text}) {
    const buttontxt = text? text: 'Button1';
    return(
        <button className={styles.button1}>{buttontxt}</button>
    )
}